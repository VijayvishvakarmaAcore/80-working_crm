import express from 'express';
import { protect } from '../middlewares/authMiddleware.js'; 


import { 
    createDailySchedule,     
    createMonthlySchedule,   
    getEmployeeSchedule, 
    updateSchedule 
} from '../controllers/schedule.controller.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();
const SCHEDULING_ROLES = ['admin', 'hr', 'manager'];


router.post('/daily', protect,authorize(SCHEDULING_ROLES), createDailySchedule);

router.post('/monthly', protect,authorize(SCHEDULING_ROLES),  createMonthlySchedule);


router.put('/:scheduleId', protect, authorize("admin"), updateSchedule);

router.get('/employee/:employeeId', protect, getEmployeeSchedule);


export default router;