import mongoose from 'mongoose';

const tourBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: String, required: true, unique: true },

  tourPackage: {
    name: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true }
  },

  travelDate: { type: Date, required: true },
  numberOfTravelers: { type: Number, required: true },

  travelers: [{
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true }
  }],

  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },

  isCoolieOpted: { type: Boolean, default: false },
  trolleyCount: { type: Number, default: 0 },

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

export const TourBooking = mongoose.model('TourBooking', tourBookingSchema);