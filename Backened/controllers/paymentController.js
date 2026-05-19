import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Payment } from '../models/Payment.js';
import { TicketBooking } from '../models/TicketBooking.js';
import { TatkalBooking } from '../models/TatkalBooking.js';
import { RoyalBooking } from '../models/RoyalBooking.js';
import { TourBooking } from '../models/TourBooking.js';
import { FoodOrder } from '../models/FoodOrder.js';
import { Notification } from '../models/Notification.js';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Helper: Get booking model
const getBookingModel = (bookingType) => {
  const models = {
    ticket: TicketBooking,
    tatkal: TatkalBooking,
    royal: RoyalBooking,
    tour: TourBooking,
    food: FoodOrder
  };
  return models[bookingType];
};

// Helper: Generate unique booking references
const generateBookingReference = (bookingType) => {
  const prefix = {
    ticket: 'PNR',
    tatkal: 'TKT',
    royal: 'RYL',
    tour: 'TUR',
    food: 'FO'
  };
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix[bookingType]}${timestamp}${random}`;
};

// Helper: Create notification
const createNotification = async (userId, bookingType, title, message, bookingId, bookingReference) => {
  try {
    await Notification.create({
      userId,
      type: 'booking',
      title,
      message,
      bookingType,
      bookingId,
      bookingReference
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};

// CREATE RAZORPAY ORDER
export const createOrder = async (req, res) => {
  try {
    const { bookingType, bookingData } = req.body;
    const userId = req.user._id;

    if (!['ticket', 'tatkal', 'royal', 'tour', 'food'].includes(bookingType)) {
      return res.status(400).json({ error: 'Invalid booking type' });
    }

    const bookingReference = generateBookingReference(bookingType);
    
    if (bookingType === 'ticket' || bookingType === 'tatkal') {
      bookingData.pnr = bookingReference;
    } else if (bookingType === 'food') {
      bookingData.orderId = bookingReference;
    } else {
      bookingData.bookingId = bookingReference;
    }

    const BookingModel = getBookingModel(bookingType);
    const booking = await BookingModel.create({
      ...bookingData,
      userId,
      bookingStatus: 'Pending'
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(Math.min(bookingData.totalAmount, 100000) * 100), //converts it into 1lakh max limit for test mode
      currency: 'INR',
      receipt: `${bookingType}_${booking._id}`,
      notes: {
        bookingType,
        bookingId: booking._id.toString(),
        bookingReference
      }
    });

    const payment = await Payment.create({
      userId,
      razorpayOrderId: razorpayOrder.id,
      bookingType,
      bookingId: booking._id,
      bookingReference,
      amount: bookingData.totalAmount,
      status: 'created'
    });

    booking.paymentId = payment._id;
    await booking.save();

    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      bookingId: booking._id,
      bookingReference,
      keyId: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to create order' 
    });
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId
    } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payment signature'
      });
    }

    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment record not found'
      });
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = 'success';
    await payment.save();

    const BookingModel = getBookingModel(payment.bookingType);
    const booking = await BookingModel.findById(payment.bookingId);
    
    if (booking) {
      booking.bookingStatus = 'Confirmed';
      await booking.save();

      await createNotification(
        payment.userId,
        payment.bookingType,
        'Booking Confirmed! 🎉',
        `Your ${payment.bookingType} booking ${payment.bookingReference} has been confirmed successfully.`,
        payment.bookingId,
        payment.bookingReference
      );
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      bookingReference: payment.bookingReference,
      bookingStatus: 'Confirmed'
    });

  } catch (error) {
    console.error('Verify Payment Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Payment verification failed'
    });
  }
};

// HANDLE PAYMENT FAILURE
export const handlePaymentFailure = async (req, res) => {
  try {
    const { razorpay_order_id, error } = req.body;

    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    
    if (payment) {
      payment.status = 'failed';
      payment.failureReason = error?.description || 'Payment failed';
      await payment.save();

      const BookingModel = getBookingModel(payment.bookingType);
      await BookingModel.findByIdAndUpdate(payment.bookingId, {
        bookingStatus: 'Failed'
      });

      await createNotification(
        payment.userId,
        payment.bookingType,
        'Payment Failed',
        `Payment for booking ${payment.bookingReference} has failed. Please try again.`,
        payment.bookingId,
        payment.bookingReference
      );
    }

    res.status(200).json({
      success: true,
      message: 'Payment failure recorded'
    });

  } catch (error) {
    console.error('Handle Failure Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// GET BOOKING HISTORY
export const getBookingHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type, status, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;
    
    let bookings = [];
    
    const types = type ? [type] : ['ticket', 'tatkal', 'royal', 'tour', 'food'];
    
    for (const bookingType of types) {
      const BookingModel = getBookingModel(bookingType);
      let query = { userId };
      
      if (status) {
        query.bookingStatus = status;
      }
      
      const items = await BookingModel
        .find(query)
        .populate('paymentId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
      
      bookings.push(...items.map(item => ({
        ...item.toObject(),
        type: bookingType
      })));
    }

    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      bookings: bookings.slice(0, limit),
      total: bookings.length,
      page: parseInt(page),
      totalPages: Math.ceil(bookings.length / limit)
    });

  } catch (error) {
    console.error('Get Booking History Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// GET BOOKING DETAILS
export const getBookingDetails = async (req, res) => {
  try {
    const { bookingId, type } = req.params;
    const userId = req.user._id;

    const BookingModel = getBookingModel(type);
    const booking = await BookingModel
      .findOne({ _id: bookingId, userId })
      .populate('paymentId');

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      booking: {
        ...booking.toObject(),
        type
      }
    });

  } catch (error) {
    console.error('Get Booking Details Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId, type } = req.params;
    const userId = req.user._id;

    const BookingModel = getBookingModel(type);
    const booking = await BookingModel.findOne({ _id: bookingId, userId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    if (booking.bookingStatus === 'Cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Booking already cancelled'
      });
    }

    booking.bookingStatus = 'Cancelled';
    booking.updatedAt = Date.now();
    await booking.save();

    const bookingRef = booking.pnr || booking.bookingId || booking.orderId;
    await createNotification(
      userId,
      type,
      'Booking Cancelled',
      `Your ${type} booking ${bookingRef} has been cancelled successfully.`,
      bookingId,
      bookingRef
    );

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });

  } catch (error) {
    console.error('Cancel Booking Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};