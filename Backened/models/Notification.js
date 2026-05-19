import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  type: { 
    type: String, 
    enum: ['booking', 'payment', 'cancellation', 'reminder', 'update'],
    required: true 
  },
  
  title: { type: String, required: true },
  message: { type: String, required: true },
  
  bookingType: { 
    type: String, 
    enum: ['ticket', 'tatkal', 'royal', 'tour', 'food']
  },
  bookingId: { type: mongoose.Schema.Types.ObjectId },
  bookingReference: String,
  
  isRead: { type: Boolean, default: false },
  
  metadata: { type: mongoose.Schema.Types.Mixed },
  
  createdAt: { type: Date, default: Date.now }
});

export const Notification = mongoose.model('Notification', notificationSchema);