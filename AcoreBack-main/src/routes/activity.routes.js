// import express from 'express';
// import ActivityLog from '../models/ActivityLog.js';
// import DailySummary from '../models/DailySummary.js';
// import protectRoute from '../middlewares/authMiddleware.js'; 

// const router = express.Router();

// // ✅ 1. Save activity data from Electron
// router.post('/save-activity', protectRoute, async (req, res) => {
//   try {
//     const {
//       employeeId,
//       activityType,
//       applicationName,
//       windowTitle,
//       mouseActivity,
//       keyboardActivity,
//       screenshot,
//       metadata
//     } = req.body;

//     // Save to ActivityLog
//     const activity = new ActivityLog({
//       employeeId,
//       activityType,
//       applicationName,
//       windowTitle,
//       mouseActivity,
//       keyboardActivity,
//       screenshot,
//       metadata,
//       timestamp: new Date()
//     });

//     await activity.save();

//     // Update DailySummary
//     await updateDailySummary(employeeId);

//     res.status(200).json({ success: true, message: 'Activity saved' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ✅ 2. Get real-time activities for admin
// router.get('/realtime-activities', protectRoute, async (req, res) => {
//   try {
//     const { department, limit = 50 } = req.query;
    
//     const query = {};
//     if (department && department !== 'all') {
//       query['employee.department'] = department;
//     }

//     // Get last 5 minutes activities
//     const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

//     const activities = await ActivityLog.aggregate([
//       {
//         $match: {
//           timestamp: { $gte: fiveMinutesAgo },
//           activityType: { $in: ['mouse_move', 'key_press', 'app_switch'] }
//         }
//       },
//       {
//         $sort: { timestamp: -1 }
//       },
//       {
//         $group: {
//           _id: "$employeeId",
//           lastActivity: { $first: "$activityType" },
//           lastApp: { $first: "$applicationName" },
//           lastWindow: { $first: "$windowTitle" },
//           lastTimestamp: { $first: "$timestamp" },
//           totalActivities: { $sum: 1 }
//         }
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "_id",
//           foreignField: "_id",
//           as: "employee"
//         }
//       },
//       {
//         $unwind: "$employee"
//       },
//       {
//         $project: {
//           _id: 0,
//           employeeId: "$_id",
//           name: "$employee.name",
//           email: "$employee.email",
//           department: "$employee.department",
//           lastActivity: 1,
//           lastApp: 1,
//           lastWindow: 1,
//           lastTimestamp: 1,
//           totalActivities: 1,
//           status: {
//             $cond: {
//               if: { $gt: [new Date(), { $add: ["$lastTimestamp", 60000] }] },
//               then: "idle",
//               else: "active"
//             }
//           }
//         }
//       },
//       {
//         $limit: parseInt(limit)
//       }
//     ]);

//     res.status(200).json({ success: true, activities });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ✅ 3. Get daily summaries for admin
// router.get('/daily-summaries', protectRoute, async (req, res) => {
//   try {
//     const { date, page = 1, limit = 20 } = req.query;
    
//     const query = {};
//     if (date) {
//       const selectedDate = new Date(date);
//       selectedDate.setHours(0, 0, 0, 0);
//       query.date = selectedDate;
//     }

//     const summaries = await DailySummary.find(query)
//       .populate('employeeId', 'name email department designation')
//       .sort({ date: -1 })
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));

//     const total = await DailySummary.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       summaries,
//       pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ✅ 4. Get employee activity timeline
// router.get('/employee-timeline/:employeeId', protectRoute, async (req, res) => {
//   try {
//     const { employeeId } = req.params;
//     const { date } = req.query;

//     const startDate = date ? new Date(date) : new Date();
//     startDate.setHours(0, 0, 0, 0);
//     const endDate = new Date(startDate);
//     endDate.setHours(23, 59, 59, 999);

//     const activities = await ActivityLog.find({
//       employeeId,
//       timestamp: { $gte: startDate, $lte: endDate }
//     })
//     .sort({ timestamp: 1 })
//     .select('activityType applicationName windowTitle timestamp mouseActivity keyboardActivity')
//     .limit(1000);

//     res.status(200).json({ success: true, activities });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ✅ 5. Get application usage statistics
// router.get('/app-usage', protectRoute, async (req, res) => {
//   try {
//     const { startDate, endDate, department } = req.query;

//     const matchQuery = {};
//     if (startDate && endDate) {
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       end.setHours(23, 59, 59, 999);
//       matchQuery.timestamp = { $gte: start, $lte: end };
//     }

//     if (department && department !== 'all') {
//       matchQuery['employee.department'] = department;
//     }

//     const appUsage = await ActivityLog.aggregate([
//       {
//         $match: {
//           ...matchQuery,
//           applicationName: { $exists: true, $ne: null }
//         }
//       },
//       {
//         $group: {
//           _id: "$applicationName",
//           totalTime: { $sum: 1 }, // Each activity record = 5 seconds approx
//           users: { $addToSet: "$employeeId" }
//         }
//       },
//       {
//         $project: {
//           application: "$_id",
//           totalTime: { $multiply: ["$totalTime", 5] }, // Convert to seconds
//           userCount: { $size: "$users" },
//           _id: 0
//         }
//       },
//       {
//         $sort: { totalTime: -1 }
//       },
//       {
//         $limit: 10
//       }
//     ]);

//     res.status(200).json({ success: true, appUsage });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Helper function to update daily summary
// async function updateDailySummary(employeeId) {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const startOfDay = new Date(today);
//     const endOfDay = new Date(today);
//     endOfDay.setHours(23, 59, 59, 999);

//     // Get today's activities
//     const activities = await ActivityLog.find({
//       employeeId,
//       timestamp: { $gte: startOfDay, $lte: endOfDay }
//     });

//     // Calculate statistics
//     const mouseActivities = activities.reduce((sum, a) => sum + (a.mouseActivity || 0), 0);
//     const keyboardActivities = activities.reduce((sum, a) => sum + (a.keyboardActivity || 0), 0);
    
//     // Group by application
//     const appGroups = {};
//     activities.forEach(activity => {
//       if (activity.applicationName) {
//         if (!appGroups[activity.applicationName]) {
//           appGroups[activity.applicationName] = {
//             name: activity.applicationName,
//             count: 0,
//             windowTitles: new Set()
//           };
//         }
//         appGroups[activity.applicationName].count++;
//         if (activity.windowTitle) {
//           appGroups[activity.applicationName].windowTitles.add(activity.windowTitle);
//         }
//       }
//     });

//     // Update or create daily summary
//     let summary = await DailySummary.findOne({
//       employeeId,
//       date: today
//     });

//     if (!summary) {
//       summary = new DailySummary({
//         employeeId,
//         date: today
//       });
//     }

//     summary.mouseActivities = mouseActivities;
//     summary.keyboardActivities = keyboardActivities;
//     summary.applicationsUsed = Object.values(appGroups).map(app => ({
//       name: app.name,
//       usageCount: app.count,
//       sampleWindows: Array.from(app.windowTitles).slice(0, 3)
//     }));

//     await summary.save();
//   } catch (error) {
//     console.error('Error updating daily summary:', error);
//   }
// }

// export default router;





import express from 'express';
import ActivityLog from '../models/ActivityLog.js';
import DailySummary from '../models/DailySummary.js';
import User from '../models/user.model.js';
import protectRoute from '../middlewares/authMiddleware.js';

const router = express.Router();

// ========== HELPER FUNCTIONS ==========

// Update daily summary
async function updateDailySummary(employeeId, activityData = null) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfDay = new Date(today);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    // Get or create daily summary
    let summary = await DailySummary.findOne({
      employeeId,
      date: today
    });

    if (!summary) {
      summary = new DailySummary({
        employeeId,
        date: today
      });
    }

    // If activity data provided (for real-time updates)
    if (activityData) {
      const { activityType, applicationName, mouseActivity = 0, keyboardActivity = 0 } = activityData;

      // Update counters based on activity type
      switch (activityType) {
        case 'mouse_move':
          summary.mouseActivities += mouseActivity || 1;
          break;
        case 'key_press':
          summary.keyboardActivities += keyboardActivity || 1;
          break;
        case 'app_switch':
          summary.appSwitches += 1;
          break;
        case 'punch_in':
          summary.punchInTime = new Date();
          break;
        case 'punch_out':
          summary.punchOutTime = new Date();
          // Calculate total active time
          if (summary.punchInTime) {
            const activeMs = new Date() - summary.punchInTime;
            summary.totalActiveSeconds = Math.floor(activeMs / 1000);
            
            // Calculate productivity score (simplified)
            summary.productivityScore = Math.min(
              100,
              Math.floor((summary.mouseActivities + summary.keyboardActivities) / 100)
            );
          }
          break;
      }

      // Update applications used
      if (applicationName && activityType !== 'idle_start' && activityType !== 'idle_end') {
        const appIndex = summary.applicationsUsed.findIndex(app => app.name === applicationName);
        
        if (appIndex >= 0) {
          summary.applicationsUsed[appIndex].usageSeconds += 5; // 5 seconds per activity
        } else {
          summary.applicationsUsed.push({
            name: applicationName,
            usageSeconds: 5,
            usagePercentage: 0,
            windowTitles: []
          });
        }
      }
    } else {
      // Recalculate from all activities for the day
      const activities = await ActivityLog.find({
        employeeId,
        timestamp: { $gte: startOfDay, $lte: endOfDay }
      });

      // Calculate totals
      summary.mouseActivities = activities
        .filter(a => a.activityType === 'mouse_move')
        .reduce((sum, a) => sum + (a.mouseActivity || 0), 0);

      summary.keyboardActivities = activities
        .filter(a => a.activityType === 'key_press')
        .reduce((sum, a) => sum + (a.keyboardActivity || 0), 0);

      summary.appSwitches = activities
        .filter(a => a.activityType === 'app_switch')
        .length;

      // Group applications
      const appMap = new Map();
      activities.forEach(activity => {
        if (activity.applicationName) {
          if (!appMap.has(activity.applicationName)) {
            appMap.set(activity.applicationName, {
              name: activity.applicationName,
              usageSeconds: 0,
              windowTitles: new Set()
            });
          }
          const app = appMap.get(activity.applicationName);
          app.usageSeconds += 5;
          if (activity.windowTitle) {
            app.windowTitles.add(activity.windowTitle);
          }
        }
      });

      summary.applicationsUsed = Array.from(appMap.values()).map(app => ({
        ...app,
        windowTitles: Array.from(app.windowTitles).slice(0, 5),
        usagePercentage: 0
      }));

      // Calculate total active time
      const punchIn = activities.find(a => a.activityType === 'punch_in');
      const punchOut = activities.find(a => a.activityType === 'punch_out');
      
      if (punchIn && punchOut) {
        summary.punchInTime = punchIn.timestamp;
        summary.punchOutTime = punchOut.timestamp;
        const activeMs = new Date(punchOut.timestamp) - new Date(punchIn.timestamp);
        summary.totalActiveSeconds = Math.floor(activeMs / 1000);
      }

      // Calculate productivity
      const totalActivities = summary.mouseActivities + summary.keyboardActivities;
      summary.productivityScore = Math.min(100, Math.floor(totalActivities / 20));
    }

    // Calculate percentages for applications
    const totalAppSeconds = summary.applicationsUsed.reduce((sum, app) => sum + app.usageSeconds, 0);
    summary.applicationsUsed.forEach(app => {
      app.usagePercentage = totalAppSeconds > 0 
        ? Math.round((app.usageSeconds / totalAppSeconds) * 100) 
        : 0;
    });

    await summary.save();
    return summary;
  } catch (error) {
    console.error('Error updating daily summary:', error);
    throw error;
  }
}

// Get active employee sessions
async function getActiveSessions() {
  try {
    // Find employees who punched in today but not punched out
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const activeEmployees = await DailySummary.aggregate([
      {
        $match: {
          date: { $gte: today },
          punchInTime: { $exists: true },
          $or: [
            { punchOutTime: { $exists: false } },
            { punchOutTime: null }
          ]
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'employee'
        }
      },
      {
        $unwind: '$employee'
      },
      {
        $project: {
          _id: 0,
          employeeId: '$employeeId',
          name: '$employee.name',
          email: '$employee.email',
          department: '$employee.department',
          designation: '$employee.designation',
          punchInTime: 1,
          punchOutTime: 1,
          totalActiveSeconds: 1,
          mouseActivities: 1,
          keyboardActivities: 1,
          productivityScore: 1
        }
      }
    ]);

    return activeEmployees;
  } catch (error) {
    console.error('Error getting active sessions:', error);
    return [];
  }
}

// ========== ROUTES ==========

// 1. Save activity from Electron (with WebSocket broadcast)
router.post('/save-activity', protectRoute, async (req, res) => {
  try {
    const io = req.app.get('io');
    const {
      employeeId,
      activityType,
      applicationName,
      windowTitle,
      mouseActivity = 0,
      keyboardActivity = 0,
      screenshot,
      metadata,
      sessionId
    } = req.body;

    // Validate required fields
    if (!employeeId || !activityType) {
      return res.status(400).json({ 
        success: false, 
        error: 'employeeId and activityType are required' 
      });
    }

    // Create activity log
    const activity = new ActivityLog({
      employeeId,
      activityType,
      applicationName,
      windowTitle,
      mouseActivity,
      keyboardActivity,
      screenshot,
      metadata,
      sessionId,
      timestamp: new Date(),
      isActive: activityType !== 'punch_out'
    });

    await activity.save();

    // Update daily summary
    const updatedSummary = await updateDailySummary(employeeId, {
      activityType,
      applicationName,
      mouseActivity,
      keyboardActivity
    });

    // Broadcast to WebSocket for real-time updates
    if (io) {
      const employee = await User.findById(employeeId).select('name email department designation');
      
      // Emit to admin room
      io.to('admin-room').emit('activity-update', {
        type: 'activity',
        data: {
          employeeId,
          employeeName: employee?.name,
          employeeEmail: employee?.email,
          department: employee?.department,
          activityType,
          applicationName,
          windowTitle,
          mouseActivity,
          keyboardActivity,
          timestamp: activity.timestamp,
          isActive: activity.isActive
        }
      });

      // Emit to specific employee room
      io.to(`employee-${employeeId}`).emit('activity-recorded', {
        type: activityType,
        timestamp: activity.timestamp
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Activity saved successfully',
      activityId: activity._id 
    });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// 2. Get real-time activities for admin dashboard
router.get('/realtime-activities', protectRoute, async (req, res) => {
  try {
    const { department = 'all', limit = 50 } = req.query;
    
    // Get active sessions first
    const activeSessions = await getActiveSessions();
    
    // Filter by department if needed
    let filteredSessions = activeSessions;
    if (department && department !== 'all') {
      filteredSessions = activeSessions.filter(s => s.department === department);
    }

    // Get recent activities for each active employee
    const realtimeData = await Promise.all(
      filteredSessions.map(async (session) => {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        
        const recentActivities = await ActivityLog.find({
          employeeId: session.employeeId,
          timestamp: { $gte: fiveMinutesAgo },
          activityType: { 
            $in: ['mouse_move', 'key_press', 'app_switch', 'window_focus'] 
          }
        })
        .sort({ timestamp: -1 })
        .limit(10);

        // Calculate current status
        const lastActivity = recentActivities[0];
        const isActive = lastActivity 
          ? (new Date() - new Date(lastActivity.timestamp)) < 60000 
          : false;

        // Calculate activity counts
        const mouseCount = recentActivities
          .filter(a => a.activityType === 'mouse_move')
          .reduce((sum, a) => sum + (a.mouseActivity || 1), 0);
        
        const keyboardCount = recentActivities
          .filter(a => a.activityType === 'key_press')
          .reduce((sum, a) => sum + (a.keyboardActivity || 1), 0);

        // Get current application
        const currentApp = lastActivity?.applicationName || 'Unknown';

        return {
          ...session,
          status: isActive ? 'active' : 'idle',
          currentApp,
          mouseActivity: mouseCount,
          keyboardActivity: keyboardCount,
          totalActivities: recentActivities.length,
          lastActivityTime: lastActivity?.timestamp,
          isTracking: true
        };
      })
    );

    // Also include employees who are not active but have recent activity
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    
    const recentEmployees = await ActivityLog.aggregate([
      {
        $match: {
          timestamp: { $gte: thirtyMinutesAgo }
        }
      },
      {
        $group: {
          _id: "$employeeId",
          lastActivity: { $last: "$$ROOT" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "employee"
        }
      },
      {
        $unwind: "$employee"
      },
      {
        $project: {
          employeeId: "$_id",
          name: "$employee.name",
          email: "$employee.email",
          department: "$employee.department",
          designation: "$employee.designation",
          lastActivityType: "$lastActivity.activityType",
          lastApp: "$lastActivity.applicationName",
          lastTimestamp: "$lastActivity.timestamp"
        }
      }
    ]);

    // Merge data
    const allEmployees = [...realtimeData];
    
    recentEmployees.forEach(emp => {
      if (!allEmployees.some(e => e.employeeId.toString() === emp.employeeId.toString())) {
        const lastActive = new Date(emp.lastTimestamp);
        const minutesSince = Math.floor((new Date() - lastActive) / 60000);
        
        allEmployees.push({
          ...emp,
          status: minutesSince < 5 ? 'active' : 'offline',
          currentApp: emp.lastApp || 'Unknown',
          mouseActivity: 0,
          keyboardActivity: 0,
          totalActivities: 0,
          lastActivityTime: emp.lastTimestamp,
          isTracking: minutesSince < 30 // Consider tracking if active in last 30 minutes
        });
      }
    });

    // Apply department filter again
    let finalData = allEmployees;
    if (department && department !== 'all') {
      finalData = allEmployees.filter(e => e.department === department);
    }

    // Limit results
    finalData = finalData.slice(0, parseInt(limit));

    res.status(200).json({ 
      success: true, 
      activities: finalData,
      total: finalData.length,
      activeCount: finalData.filter(e => e.status === 'active').length,
      idleCount: finalData.filter(e => e.status === 'idle').length,
      offlineCount: finalData.filter(e => e.status === 'offline').length
    });
  } catch (error) {
    console.error('Error fetching realtime activities:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// 3. Get all employees status (simplified)
router.get('/all-employees-status', protectRoute, async (req, res) => {
  try {
    const { department = 'all' } = req.query;
    
    // Get all employees
    const query = { role: 'employee' };
    if (department && department !== 'all') {
      query.department = department;
    }
    
    const employees = await User.find(query)
      .select('_id name email department designation avatar');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const statuses = await Promise.all(
      employees.map(async (employee) => {
        // Check if punched in today
        const dailySummary = await DailySummary.findOne({
          employeeId: employee._id,
          date: { $gte: today }
        });
        
        // Get last activity
        const lastActivity = await ActivityLog.findOne({
          employeeId: employee._id
        })
        .sort({ timestamp: -1 });
        
        // Determine status
        let status = 'offline';
        let isTracking = false;
        let currentApp = 'Not available';
        
        if (dailySummary && dailySummary.punchInTime && !dailySummary.punchOutTime) {
          isTracking = true;
          
          if (lastActivity) {
            const minutesSince = Math.floor((new Date() - lastActivity.timestamp) / 60000);
            status = minutesSince < 2 ? 'active' : 'idle';
            currentApp = lastActivity.applicationName || 'Unknown';
          } else {
            status = 'idle';
          }
        } else if (lastActivity) {
          const minutesSince = Math.floor((new Date() - lastActivity.timestamp) / 60000);
          status = minutesSince < 5 ? 'active' : 'offline';
          currentApp = lastActivity.applicationName || 'Unknown';
        }
        
        return {
          employeeId: employee._id,
          name: employee.name,
          email: employee.email,
          department: employee.department,
          designation: employee.designation,
          avatar: employee.avatar,
          status,
          currentApp,
          lastActivityTime: lastActivity?.timestamp,
          isTracking,
          punchInTime: dailySummary?.punchInTime,
          punchOutTime: dailySummary?.punchOutTime,
          productivityScore: dailySummary?.productivityScore || 0
        };
      })
    );
    
    // Calculate statistics
    const totalEmployees = statuses.length;
    const activeEmployees = statuses.filter(e => e.status === 'active').length;
    const idleEmployees = statuses.filter(e => e.status === 'idle').length;
    const trackingEmployees = statuses.filter(e => e.isTracking).length;
    
    res.status(200).json({
      success: true,
      employees: statuses,
      statistics: {
        totalEmployees,
        activeEmployees,
        idleEmployees,
        trackingEmployees,
        offlineEmployees: totalEmployees - activeEmployees - idleEmployees
      }
    });
  } catch (error) {
    console.error('Error fetching employee statuses:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 4. Get employee activity timeline
router.get('/employee-timeline/:employeeId', protectRoute, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { date, limit = 100 } = req.query;
    
    const query = { employeeId };
    
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);
      query.timestamp = { $gte: startDate, $lte: endDate };
    }
    
    const activities = await ActivityLog.find(query)
      .sort({ timestamp: 1 })
      .limit(parseInt(limit))
      .select('activityType applicationName windowTitle timestamp mouseActivity keyboardActivity metadata');
    
    // Group activities by hour for timeline view
    const timeline = [];
    let currentHour = null;
    let hourActivities = [];
    
    activities.forEach(activity => {
      const hour = new Date(activity.timestamp).getHours();
      
      if (currentHour !== hour) {
        if (hourActivities.length > 0) {
          timeline.push({
            hour: currentHour,
            activities: [...hourActivities],
            totalActivities: hourActivities.length,
            mouseCount: hourActivities.reduce((sum, a) => sum + (a.mouseActivity || 0), 0),
            keyboardCount: hourActivities.reduce((sum, a) => sum + (a.keyboardActivity || 0), 0)
          });
        }
        currentHour = hour;
        hourActivities = [];
      }
      
      hourActivities.push(activity);
    });
    
    // Add last hour
    if (hourActivities.length > 0) {
      timeline.push({
        hour: currentHour,
        activities: hourActivities,
        totalActivities: hourActivities.length,
        mouseCount: hourActivities.reduce((sum, a) => sum + (a.mouseActivity || 0), 0),
        keyboardCount: hourActivities.reduce((sum, a) => sum + (a.keyboardActivity || 0), 0)
      });
    }
    
    res.status(200).json({
      success: true,
      activities,
      timeline,
      totalActivities: activities.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Get application usage statistics
router.get('/app-usage', protectRoute, async (req, res) => {
  try {
    const { startDate, endDate, department, limit = 10 } = req.query;
    
    const matchQuery = {};
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      matchQuery.timestamp = { $gte: start, $lte: end };
    }
    
    if (department && department !== 'all') {
      matchQuery['employee.department'] = department;
    }
    
    const appUsage = await ActivityLog.aggregate([
      {
        $match: {
          ...matchQuery,
          applicationName: { $exists: true, $ne: null, $ne: '' }
        }
      },
      {
        $group: {
          _id: {
            application: "$applicationName",
            employeeId: "$employeeId"
          },
          usageCount: { $sum: 1 },
          lastUsed: { $max: "$timestamp" }
        }
      },
      {
        $group: {
          _id: "$_id.application",
          totalUsage: { $sum: "$usageCount" },
          uniqueUsers: { $addToSet: "$_id.employeeId" },
          lastUsed: { $max: "$lastUsed" }
        }
      },
      {
        $project: {
          application: "$_id",
          totalUsage: 1,
          usageTime: { $multiply: ["$totalUsage", 5] }, // 5 seconds per activity
          userCount: { $size: "$uniqueUsers" },
          lastUsed: 1,
          _id: 0
        }
      },
      {
        $sort: { totalUsage: -1 }
      },
      {
        $limit: parseInt(limit)
      }
    ]);
    
    // Calculate percentages
    const totalUsage = appUsage.reduce((sum, app) => sum + app.totalUsage, 0);
    appUsage.forEach(app => {
      app.usagePercentage = totalUsage > 0 
        ? Math.round((app.totalUsage / totalUsage) * 100) 
        : 0;
    });
    
    res.status(200).json({
      success: true,
      appUsage,
      totalApps: appUsage.length,
      totalUsage
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Start tracking session
router.post('/start-tracking', protectRoute, async (req, res) => {
  try {
    const { employeeId } = req.body;
    const io = req.app.get('io');
    
    // Create punch in activity
    const activity = new ActivityLog({
      employeeId,
      activityType: 'punch_in',
      timestamp: new Date(),
      isActive: true,
      sessionId: `session_${Date.now()}_${employeeId}`
    });
    
    await activity.save();
    
    // Update daily summary
    await updateDailySummary(employeeId, { activityType: 'punch_in' });
    
    // Broadcast to WebSocket
    if (io) {
      const employee = await User.findById(employeeId).select('name email department');
      
      io.to('admin-room').emit('tracking-update', {
        type: 'tracking_started',
        data: {
          employeeId,
          employeeName: employee?.name,
          department: employee?.department,
          timestamp: activity.timestamp
        }
      });
      
      io.to(`employee-${employeeId}`).emit('tracking-started', {
        sessionId: activity.sessionId,
        timestamp: activity.timestamp
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Tracking started successfully',
      sessionId: activity.sessionId,
      timestamp: activity.timestamp
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Stop tracking session
router.post('/stop-tracking', protectRoute, async (req, res) => {
  try {
    const { employeeId, sessionId } = req.body;
    const io = req.app.get('io');
    
    // Create punch out activity
    const activity = new ActivityLog({
      employeeId,
      activityType: 'punch_out',
      timestamp: new Date(),
      isActive: false,
      sessionId
    });
    
    await activity.save();
    
    // Update daily summary
    await updateDailySummary(employeeId, { activityType: 'punch_out' });
    
    // Mark all activities in session as inactive
    await ActivityLog.updateMany(
      { employeeId, sessionId, isActive: true },
      { $set: { isActive: false } }
    );
    
    // Broadcast to WebSocket
    if (io) {
      const employee = await User.findById(employeeId).select('name email department');
      const dailySummary = await DailySummary.findOne({
        employeeId,
        date: { $gte: new Date().setHours(0, 0, 0, 0) }
      });
      
      io.to('admin-room').emit('tracking-update', {
        type: 'tracking_stopped',
        data: {
          employeeId,
          employeeName: employee?.name,
          department: employee?.department,
          timestamp: activity.timestamp,
          totalActiveSeconds: dailySummary?.totalActiveSeconds || 0,
          productivityScore: dailySummary?.productivityScore || 0
        }
      });
      
      io.to(`employee-${employeeId}`).emit('tracking-stopped', {
        timestamp: activity.timestamp
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Tracking stopped successfully',
      timestamp: activity.timestamp
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 8. Get employee productivity report
router.get('/productivity-report/:employeeId', protectRoute, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { days = 30 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    
    const summaries = await DailySummary.find({
      employeeId,
      date: { $gte: startDate }
    })
    .sort({ date: -1 });
    
    // Calculate statistics
    const totalDays = summaries.length;
    const presentDays = summaries.filter(s => s.attendanceStatus === 'present').length;
    const totalActiveHours = summaries.reduce((sum, s) => sum + (s.totalActiveSeconds || 0), 0) / 3600;
    const avgProductivity = totalDays > 0 
      ? summaries.reduce((sum, s) => sum + (s.productivityScore || 0), 0) / totalDays 
      : 0;
    
    // Weekly breakdown
    const weeklyData = [];
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const weekSummaries = summaries.filter(s => 
        s.date >= weekStart && s.date <= weekEnd
      );
      
      weeklyData.push({
        week: i + 1,
        startDate: weekStart.toISOString().split('T')[0],
        endDate: weekEnd.toISOString().split('T')[0],
        daysPresent: weekSummaries.filter(s => s.attendanceStatus === 'present').length,
        totalHours: weekSummaries.reduce((sum, s) => sum + (s.totalActiveSeconds || 0), 0) / 3600,
        avgProductivity: weekSummaries.length > 0 
          ? weekSummaries.reduce((sum, s) => sum + (s.productivityScore || 0), 0) / weekSummaries.length 
          : 0
      });
    }
    
    res.status(200).json({
      success: true,
      report: {
        employeeId,
        periodDays: parseInt(days),
        totalDays,
        presentDays,
        absentDays: totalDays - presentDays,
        attendanceRate: totalDays > 0 ? (presentDays / totalDays) * 100 : 0,
        totalActiveHours: totalActiveHours.toFixed(1),
        avgDailyHours: totalDays > 0 ? (totalActiveHours / totalDays).toFixed(1) : 0,
        avgProductivity: avgProductivity.toFixed(1),
        weeklyBreakdown: weeklyData,
        dailySummaries: summaries.slice(0, 14) // Last 14 days
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 9. WebSocket endpoint for admin to join room
router.post('/join-admin-room', protectRoute, async (req, res) => {
  try {
    const io = req.app.get('io');
    const { adminId } = req.body;
    
    if (io) {
      // In real implementation, you would get socket from req
      // This is a simplified version
      res.status(200).json({
        success: true,
        message: 'Admin room joined'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'WebSocket not available'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;