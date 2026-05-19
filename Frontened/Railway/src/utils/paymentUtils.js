import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Load Razorpay script
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Initialize Razorpay Payment
export const initiatePayment = async (bookingType, bookingData, userDetails, onSuccess, onFailure) => {
  try {
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    
    if (!scriptLoaded) {
      toast.error('Failed to load payment gateway. Please refresh and try again.');
      return;
    }

    // Create order
    const response = await axiosInstance.post('/payments/create-order', {
      bookingType,
      bookingData
    });

    const { orderId, amount, currency, bookingId, bookingReference, keyId } = response.data;

    // Razorpay options
    const options = {
      key: keyId,
      amount: amount,
      currency: currency,
      name: 'RailSync',
      description: `${bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} Booking`,
      order_id: orderId,
      prefill: {
        name: userDetails.name || bookingData.passengers?.[0]?.name,
        email: bookingData.contactEmail || userDetails.email,
        contact: bookingData.contactPhone || userDetails.phone
      },
      theme: {
        color: '#008BD0'
      },
      handler: async function (response) {
        try {
          // Verify payment
          const verifyResponse = await axiosInstance.post('/payments/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId
          });

          if (verifyResponse.data.success) {
            toast.success(`Booking confirmed! Your ${bookingType} booking reference: ${bookingReference}`);
            onSuccess && onSuccess({
              ...verifyResponse.data,
              bookingReference,
              bookingId
            });
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          toast.error('Payment verification failed. Please contact support.');
          onFailure && onFailure(error);
        }
      },
      modal: {
        ondismiss: function() {
          toast.error('Payment cancelled');
          onFailure && onFailure({ message: 'Payment cancelled by user' });
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    
    razorpay.on('payment.failed', async function (response) {
      console.error('Payment failed:', response.error);
      
      // Record failure
      try {
        await axiosInstance.post('/payments/failure', {
          razorpay_order_id: orderId,
          error: response.error
        });
      } catch (err) {
        console.error('Failed to record payment failure:', err);
      }
      
      toast.error(`Payment failed: ${response.error.description}`);
      onFailure && onFailure(response.error);
    });

    razorpay.open();

  } catch (error) {
    console.error('Payment initiation error:', error);
    toast.error(error.response?.data?.error || 'Failed to initiate payment');
    onFailure && onFailure(error);
  }
};