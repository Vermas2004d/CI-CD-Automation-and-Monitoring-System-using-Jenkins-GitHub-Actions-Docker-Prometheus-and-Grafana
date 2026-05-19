import mongoose from "mongoose";

const ticketBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pnr: {
    type: String,
    required: true,
    unique: true,
  },

  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  trainNumber: {
    type: String,
    required: true,
  },
  trainName: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  quota: {
    type: String,
    required: true,
  },
  passengers: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      gender: { type: String, required: true },
      berthPreference: { type: String, required: true },
      seatNumber: String,
      status: { type: String, default: "Confirmed" },
    },
  ],
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  isCoolieOpted: {
    type: Boolean,
    default: false,
  },
  trolleyCount: {
    type: Number,
    default: 0,
  },

  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  basefare: {
    type: Number,
    required: true,
  },
  gst: {
    type: Number,
    required: true,
  },

  bookingStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Failed"],
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const TicketBooking = mongoose.model('TicketBooking', ticketBookingSchema);