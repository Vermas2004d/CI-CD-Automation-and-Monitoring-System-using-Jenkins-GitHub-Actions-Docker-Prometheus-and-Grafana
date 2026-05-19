import express from 'express';
import {
  createOrder,
  verifyPayment,
  handlePaymentFailure,
  getBookingHistory,
  getBookingDetails,
  cancelBooking
} from '../controllers/paymentController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(verifyJWT);

// Payment routes
router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.post('/failure', handlePaymentFailure);

// Booking routes
router.get('/bookings', getBookingHistory);
router.get('/bookings/:type/:bookingId', getBookingDetails);
router.patch('/bookings/:type/:bookingId/cancel', cancelBooking);

export default router;