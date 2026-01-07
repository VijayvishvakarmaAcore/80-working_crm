import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

import {
    createTask, getProjectTasks, getTaskDetails, updateTask, deleteTask,
    updateTaskStatus, assignTask, getUserTasks
} from '../controllers/task.controller.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);

router.get('/:id', protect, getTaskDetails);

router.put('/:id', protect, updateTask);

router.delete('/:id', protect, deleteTask);

router.get('/project/:id', protect, getProjectTasks);

router.get('/user/:id', protect, getUserTasks);

router.put('/:id/status', protect, updateTaskStatus);

router.put('/:id/assign', protect, assignTask);

export default router;