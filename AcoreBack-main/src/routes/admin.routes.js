
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import User from "../models/user.model.js"

import { 
    getOverallStatus, 
    getDepartmentDistribution, 

    getTodayActivityStatus, 

    getWeeklyTargetAnalysis,
    getEmployeeManagementSummary,
    getAllEmployees,
    getEmployeesWithAverages,
    getAttendanceOverview,
    getAttendanceStatusChart,
    getAttendanceByDept,
    getDetailedAttendanceList,
    getWeeklySummaryStats,
    getWeeklyTrendData,
    getWeeklyDetailedReport,
    getMonthlyAttendanceOverview,
    getRegisteredClients,
    updateSpecificPermission
} from "../controllers/admin.controller.js"
import { hrCompleteRegistration } from '../controllers/user.controller.js';
import { hasPermission } from '../middlewares/permissionMiddleware.js';
import { createCompanySettings, deleteCompany, getCompanySettings, updateCompanySettings } from '../controllers/company.controller.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';
import { getMonthlyProjectOverview, getWeeklyProjectOverview } from '../controllers/project.controller.js';

const router = express.Router();
const ADMIN_ROLES = ['admin', 'hr', 'manager']; 
// const auth = [protect, requireRole(ADMIN_ROLES)]; // Define common middleware


router.get('/dashboard/overall-status', protect, getOverallStatus);


router.get('/dashboard/department-distribution', protect, hasPermission('view_reports'),getDepartmentDistribution);


// router.get('/dashboard/weekly-hours',  getWeeklyHoursAnalysis);

// router.get('/dashboard/weekly',  getWeeklyBreakdownAnalysis);

router.get('/dashboard/weekly-target-analysis',protect,  getWeeklyTargetAnalysis);


router.get('/dashboard/activity-status',protect,  getTodayActivityStatus);

router.get('/dashboard/employee-management-summary',protect,  getEmployeeManagementSummary);

router.get('/employees',protect, hasPermission('view_reports'),getAllEmployees);

router.get('/employees/performance-summary',protect,  getEmployeesWithAverages);

// Get list of users waiting for HR
router.get("/pending-onboarding",  async (req, res) => {
    const pending = await User.find({ onboardingStatus: 'pending' });
    res.json({ data: pending });
});

// Complete the registration
router.put("/complete-onboarding/:userId", hrCompleteRegistration);

//  client list 
router.get("/clients",protect, getRegisteredClients);

// gerant and revoke permission 

router.patch(
    '/permissions/:userId', 
    protect, 
    hasPermission('manage_permissions'), 
    updateSpecificPermission
);

//  attendence daashboard route 

router.get('/attendance/overview',  getAttendanceOverview);
router.get('/attendance/status-chart',  getAttendanceStatusChart);
router.get('/attendance/department-stats',  getAttendanceByDept);
router.get('/attendance/list',  getDetailedAttendanceList);


router.get('/attendance/weekly-stats', protect, getWeeklySummaryStats);
router.get('/attendance/weekly-trends', protect, getWeeklyTrendData);
router.get('/attendance/weekly-report', protect, getWeeklyDetailedReport);


router.get('/attendance/monthly-overview', protect, getMonthlyAttendanceOverview);



//  company setting 



 router.route('/company/settings')
 .get(protect, getCompanySettings)
    .post(
        protect, 
        authorize('admin'), 
        uploadMiddleware.single('logo'), 
        createCompanySettings
    )
    .put(
        protect, 
        authorize('admin'), 
        uploadMiddleware.single('logo'), 
        updateCompanySettings
    )
.delete(protect, authorize('admin'), deleteCompany);



// get employee managment 

// Get Weekly Stats
router.get("/overview/weekly/:userId", protect, getWeeklyProjectOverview);

// Get Monthly Stats
router.get("/overview/monthly/:userId", protect, getMonthlyProjectOverview);


export default router;