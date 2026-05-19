import express from 'express';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications
} from '../controllers/notificationController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router(); 

router.use(verifyJWT);

router.get('/', getNotifications);
router.patch('/:notificationId/read', markAsRead);
router.patch('/read-all', markAllAsRead);
router.delete('/:notificationId', deleteNotification);
router.delete('/', clearAllNotifications);

export default router;