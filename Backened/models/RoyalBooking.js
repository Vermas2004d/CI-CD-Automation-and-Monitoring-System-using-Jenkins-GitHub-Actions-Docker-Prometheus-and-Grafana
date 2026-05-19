import mongoose from 'mongoose';

const royalBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: String, required: true, unique: true },
  
  trainName: { type: String, required: true },
  route: { type: String, required: true },
  duration: { type: String, required: true },
  departureDate: { type: Date, required: true },
  
  package: {
    type: { type: String, required: true },
    price: { type: Number, required: true },
    inclusions: [String]
  },
  
  passengers: [{
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    cabinNumber: String
  }],
  
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  
  specialRequests: String,
  
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  totalAmount: { type: Number, required: true },
  
  bookingStatus: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Failed'],
    default: 'Pending'
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const RoyalBooking = mongoose.model('RoyalBooking', royalBookingSchema);