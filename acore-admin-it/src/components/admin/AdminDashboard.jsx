import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import LiveTrackingPage from './pages/LiveTrackingPage';
import AttendancePage from './pages/AttendancePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ProjectsPage from './pages/ProjectsPage';
import
 { 
  AUTHORIZED_USERS, 
  EMPLOYEES_DATA, 
  ATTENDANCE_DATA, 
  LIVE_TRACKING_DATA,
  WEEKLY_REPORT,
  MONTHLY_REPORT 
} from '../../utils/constants';
import './AdminDashboard.css';
import TasksPage from './pages/TasksPage';
import UserManagementPage from './pages/UserManagementPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import HolidaysPage from "./pages/HolidaysPage";
import LeavesPage from "./pages/LeavesPage";
import SalaryAdminPage from "./pages/SalaryAdminPage";
import CelebrationAdminPage from "./pages/CelebrationAdminPage";
import AdminRegisterEmployee from "./pages/AdminRegisterEmployee";
import GithubAdminDashboard from './pages/GithubAdminDashboard';









// App.js में initial employees data
const initialEmployees = [
  {
    id: 1,
    empId: 'EMP001',
    name: 'John Doe',
    role: 'Software Developer',
    department: 'Engineering',
    email: 'john@acore.com',
    phone: '9876543210',
    status: 'Active',
    todayHours: 8,
    weekHours: 40,
    monthHours: 160,
    lastActive: '2 hours ago',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    empId: 'EMP002',
    name: 'Jane Smith',
    role: 'UI/UX Designer',
    department: 'Design',
    email: 'jane@acore.com',
    phone: '9876543211',
    status: 'Active',
    todayHours: 7.5,
    weekHours: 35,
    monthHours: 140,
    lastActive: 'Just now',
    joinDate: '2023-02-20'
  },
 
];




const AdminDashboard = ({ userRole, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user] = useState({
    name: 'Admin User',
    role: userRole || 'Admin',
    department: 'Administration'
  });

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardPage employees={EMPLOYEES_DATA} />;
      case 'employees':
        return <EmployeesPage employees={EMPLOYEES_DATA} />;
      case 'tracking':
        return <LiveTrackingPage trackingData={LIVE_TRACKING_DATA} />;
      case 'attendance':
        return <AttendancePage attendance={ATTENDANCE_DATA} employees={EMPLOYEES_DATA} />;
      case 'projects': 
        return <ProjectsPage />;
        case 'tasks':
          return <TasksPage/>
      case 'announcements':
         return <AnnouncementsPage />;

        case "holidays":
          return <HolidaysPage />;

          case 'leaves':
  return <LeavesPage />;
  case "salary":
  return <SalaryAdminPage />;
  case "celebration":
  return <CelebrationAdminPage />;
  case "employee-register":
 return <AdminRegisterEmployee />;

 case "github":
 return <GithubAdminDashboard/>
 



  




           case 'user-management':
        return <UserManagementPage />;
      case 'reports-weekly':
        return <ReportsPage reportType="weekly" reportData={WEEKLY_REPORT} />;
      case 'reports-monthly':
        return <ReportsPage reportType="monthly" reportData={MONTHLY_REPORT} />;
      case 'settings-general':
        return <SettingsPage section="general" users={AUTHORIZED_USERS} />;
      case 'settings-users':
        return <SettingsPage section="users" users={AUTHORIZED_USERS} />;
      default:
        return <DashboardPage employees={EMPLOYEES_DATA} />;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar role={userRole} currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="main-content">
        <Topbar user={user} onLogout={onLogout} />
        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;