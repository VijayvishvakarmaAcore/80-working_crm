// ============= STATIC AUTHORIZED USERS DATABASE =============
export const AUTHORIZED_USERS = [
  { id: 'HR001', password: 'hr@123', name: 'Priya Sharma', role: 'HR', department: 'Human Resources' },
  { id: 'HR002', password: 'hr@456', name: 'Amit Kumar', role: 'HR', department: 'Human Resources' },
  { id: 'BOSS001', password: 'boss@123', name: 'Rajesh Patel', role: 'Boss', department: 'Management' },
  { id: 'BOSS002', password: 'boss@456', name: 'Sunita Gupta', role: 'Boss', department: 'Management' }
];

// ============= STATIC EMPLOYEES DATA =============
export const EMPLOYEES_DATA = [
  { id: 1, empId: 'EMP001', name: 'Rahul Verma', role: 'Senior Developer', department: 'Engineering', status: 'Active', email: 'rahul@acore.com', phone: '9876543210', joinDate: '2023-01-15', todayHours: 8.2, weekHours: 42.5, monthHours: 168, lastActive: '2 mins ago' },
  { id: 2, empId: 'EMP002', name: 'Anjali Singh', role: 'UI/UX Designer', department: 'Design', status: 'Active', email: 'anjali@acore.com', phone: '9876543211', joinDate: '2023-03-20', todayHours: 7.8, weekHours: 39.2, monthHours: 158, lastActive: '5 mins ago' },
  { id: 3, empId: 'EMP003', name: 'Vikram Malhotra', role: 'Project Manager', department: 'Management', status: 'On Leave', email: 'vikram@acore.com', phone: '9876543212', joinDate: '2022-06-10', todayHours: 0, weekHours: 32.5, monthHours: 145, lastActive: '2 days ago' },
  { id: 4, empId: 'EMP004', name: 'Sneha Reddy', role: 'Backend Developer', department: 'Engineering', status: 'Active', email: 'sneha@acore.com', phone: '9876543213', joinDate: '2023-08-05', todayHours: 8.5, weekHours: 41.8, monthHours: 172, lastActive: '1 min ago' },
  { id: 5, empId: 'EMP005', name: 'Arjun Mehta', role: 'DevOps Engineer', department: 'Engineering', status: 'Active', email: 'arjun@acore.com', phone: '9876543214', joinDate: '2023-02-28', todayHours: 7.9, weekHours: 40.1, monthHours: 165, lastActive: '10 mins ago' },
  { id: 6, empId: 'EMP006', name: 'Kavya Nair', role: 'QA Engineer', department: 'Quality', status: 'Active', email: 'kavya@acore.com', phone: '9876543215', joinDate: '2023-05-12', todayHours: 8.1, weekHours: 38.9, monthHours: 162, lastActive: '3 mins ago' },
  { id: 7, empId: 'EMP007', name: 'Manish Joshi', role: 'Frontend Developer', department: 'Engineering', status: 'Inactive', email: 'manish@acore.com', phone: '9876543216', joinDate: '2023-09-01', todayHours: 6.2, weekHours: 35.5, monthHours: 148, lastActive: '1 hour ago' },
  { id: 8, empId: 'EMP008', name: 'Pooja Desai', role: 'HR Manager', department: 'HR', status: 'Active', email: 'pooja@acore.com', phone: '9876543217', joinDate: '2022-11-20', todayHours: 8.3, weekHours: 41.2, monthHours: 169, lastActive: '4 mins ago' }
];

// ============= ATTENDANCE DATA =============
export const ATTENDANCE_DATA = [
  { date: '2024-12-13', empId: 'EMP001', checkIn: '09:15 AM', checkOut: '06:30 PM', totalHours: 8.25, status: 'Present' },
  { date: '2024-12-13', empId: 'EMP002', checkIn: '09:00 AM', checkOut: '06:15 PM', totalHours: 8.25, status: 'Present' },
  { date: '2024-12-13', empId: 'EMP004', checkIn: '08:45 AM', checkOut: '06:45 PM', totalHours: 9.0, status: 'Present' },
  { date: '2024-12-12', empId: 'EMP001', checkIn: '09:30 AM', checkOut: '06:45 PM', totalHours: 8.25, status: 'Present' },
  { date: '2024-12-12', empId: 'EMP003', checkIn: '-', checkOut: '-', totalHours: 0, status: 'Absent' },
];

// ============= LIVE TRACKING DATA =============
export const LIVE_TRACKING_DATA = [
  { empId: 'EMP001', name: 'Rahul Verma', currentActivity: 'Coding', appName: 'VS Code', duration: '45 mins', status: 'Productive', screenshot: '✅' },
  { empId: 'EMP002', name: 'Anjali Singh', currentActivity: 'Designing', appName: 'Figma', duration: '32 mins', status: 'Productive', screenshot: '✅' },
  { empId: 'EMP004', name: 'Sneha Reddy', currentActivity: 'Meeting', appName: 'Zoom', duration: '18 mins', status: 'Meeting', screenshot: '✅' },
  { empId: 'EMP005', name: 'Arjun Mehta', currentActivity: 'Break', appName: 'Chrome - YouTube', duration: '12 mins', status: 'Break', screenshot: '⚠️' },
  { empId: 'EMP006', name: 'Kavya Nair', currentActivity: 'Testing', appName: 'Postman', duration: '28 mins', status: 'Productive', screenshot: '✅' }
];

// ============= REPORTS DATA =============
export const WEEKLY_REPORT = {
  weekRange: 'Dec 7 - Dec 13, 2024',
  totalHours: 1250,
  avgHoursPerEmployee: 7.8,
  topPerformers: [
    { name: 'Sneha Reddy', hours: 43.2, productivity: 96 },
    { name: 'Rahul Verma', hours: 42.5, productivity: 94 },
    { name: 'Arjun Mehta', hours: 41.8, productivity: 92 }
  ],
  departmentStats: [
    { dept: 'Engineering', employees: 4, avgHours: 8.1, productivity: 93 },
    { dept: 'Design', employees: 1, avgHours: 7.8, productivity: 89 },
    { dept: 'Quality', employees: 1, avgHours: 7.9, productivity: 91 }
  ]
};

export const MONTHLY_REPORT = {
  month: 'November 2024',
  totalHours: 5280,
  totalDays: 22,
  avgHoursPerDay: 7.6,
  attendance: { present: 165, absent: 11, leaves: 8 },
  productivity: 91
};

// ============= SUMMARY DATA =============
export const getSummaryData = (employees) => {
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const onLeave = employees.filter(e => e.status === 'On Leave').length;
  const totalHours = employees.reduce((sum, e) => sum + e.todayHours, 0);
  const avgHours = (totalHours / employees.length).toFixed(1);

  return {
    totalEmployees: employees.length,
    activeNow: activeEmployees,
    onLeave: onLeave,
    avgHours: avgHours,
    totalHoursToday: totalHours.toFixed(1)
  };
};