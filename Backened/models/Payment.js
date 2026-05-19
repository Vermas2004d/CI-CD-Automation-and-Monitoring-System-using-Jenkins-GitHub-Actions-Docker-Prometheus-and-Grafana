import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  razorpayOrderId: { type: String, required: true, unique: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  
  bookingType: { 
    type: String, 
    enum: ['ticket', 'tatkal', 'royal', 'tour', 'food'],
    required: true 
  },
  bookingId: { type: mongoose.Schema.Types.ObjectId, required: true },
  bookingReference: { type: String },
  
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  
  status: { 
    type: String, 
    enum: ['created', 'pending', 'success', 'failed'],
    default: 'created'
  },
  
  paymentMethod: String,
  failureReason: String,
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Payment = mongoose.model('Payment', paymentSchema);