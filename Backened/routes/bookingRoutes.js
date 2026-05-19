import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getBookingHistory } from '../controllers/paymentController.js';

const router = express.Router();

router.use(verifyJWT);

// Use the robust getBookingHistory controller which handles all booking types
router.get('/', getBookingHistory);

export default router;