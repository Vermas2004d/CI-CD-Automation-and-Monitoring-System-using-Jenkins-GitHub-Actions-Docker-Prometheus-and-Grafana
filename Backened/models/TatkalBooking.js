import mongoose from "mongoose";

const tatkalBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pnr: { type: String, required: true, unique: true },

  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  trainNumber: { type: String, required: true },
  trainName: { type: String, required: true },
  class: { type: String, required: true },

  passengers: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      gender: { type: String, required: true },
      seatNumber: String,
    },
  ],

  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },

  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  totalAmount: { type: Number, required: true },
  tatkalCharge: { type: Number, required: true },

  bookingStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Failed"],
    default: "Pending",
  },

  isTatkal: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const TatkalBooking = mongoose.model(
  "TatkalBooking",
  tatkalBookingSchema
);
