import mongoose from 'mongoose';

const foodOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: String, required: true, unique: true },
  
  pnr: { type: String, required: true },
  trainNumber: { type: String, required: true },
  trainName: String,
  
  deliveryDetails: {
    stationCode: { type: String, required: true },
    stationName: { type: String, required: true },
    coach: { type: String, required: true },
    seat: { type: String, required: true },
    deliveryTime: { type: Date, required: true }
  },
  
  items: [{
    name: { type: String, required: true },
    restaurant: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    customization: String
  }],
  
  contactPhone: { type: String, required: true },
  
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  
  subtotal: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  gst: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  
  orderStatus: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled', 'Failed'],
    default: 'Pending'
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const FoodOrder = mongoose.model('FoodOrder', foodOrderSchema);