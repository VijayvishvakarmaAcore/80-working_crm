


import express from "express";
import dotenv from "dotenv";
import { createServer } from 'http'; 
import { Server } from 'socket.io'; 
import cors from "cors"

import userRoutes from "./routes/user.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import salaryRoutes from "./routes/salary.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";
import celebrationRoutes from "./routes/celebration.routes.js";
import holidayRoutes from "./routes/holiday.routes.js";
import exceptionRoutes from "./routes/exception.routes.js";
import projectRoutes from './routes/project.routes.js';
import taskRoutes from './routes/task.routes.js';
import cookieParser from "cookie-parser";
import scheduleRoutes from "./routes/schedule.routes.js";
import notificationRoutes from "./routes/notification.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import { startAllSchedulers } from "./utils/autoLeave.js";

import adminAttendanceRoutes from "./routes/adminAttendanceRoutes.js";
import workSessionRoutes from "./routes/workSession.routes.js";
import adminLiveTrackingRoutes from "./routes/adminLiveTracking.routes.js";
import adminPerformanceRoutes from "./routes/adminPerformance.routes.js";
import adminDashboardSummaryRoutes from "./routes/adminDashboardSummary.routes.js";
import githubRoutes from "./routes/github.routes.js";
import adminGithubRoutes from "./routes/adminGithub.routes.js";


const app = express();

dotenv.config();


const httpServer = createServer(app); 
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    },
    pingInterval: 10000, 
    pingTimeout: 5000,
});

export { io }; 

io.on('connection', (socket) => {
    console.log(`Socket user connected: ${socket.id}`);

    socket.on('register', (employeeId) => {
        socket.join(employeeId); 
        console.log(`Socket client registered for room: ${employeeId}`);
    });

    socket.on('disconnect', () => {
        console.log('Socket user disconnected');
    });
});


app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"*",
    credentials:true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}))

// --- ROUTES ---
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/admin/attendance", adminAttendanceRoutes);

app.use("/api/leaves", leaveRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/celebrations", celebrationRoutes);
app.use("/api/holidays", holidayRoutes);
app.use("/api/exceptions", exceptionRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/notifications", notificationRoutes); 
app.use("/api/admin/", adminRoutes);

app.use("/api/work-session", workSessionRoutes);

app.use("/api/admin", adminLiveTrackingRoutes);

app.use("/api/admin", adminPerformanceRoutes);
app.use("/api/admin", adminDashboardSummaryRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/admin/github", adminGithubRoutes); 

startAllSchedulers();





const port = process.env.PORT || 5000;
export { httpServer, port };