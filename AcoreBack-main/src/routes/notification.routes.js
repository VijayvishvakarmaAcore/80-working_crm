import express from 'express';
import { protect } from '../middlewares/authMiddleware.js'; 
import { getNotifications, markAsRead, deleteNotification, sendAdHocNotification } from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/:employeeId', protect, getNotifications);

router.put('/read/:id', protect, markAsRead);

router.delete('/:id', protect, deleteNotification);

router.post('/create-manual', protect, sendAdHocNotification);

export default router;