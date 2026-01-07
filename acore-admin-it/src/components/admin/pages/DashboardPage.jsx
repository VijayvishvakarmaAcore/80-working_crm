// import React, { useState, useEffect } from 'react';
// import { getSummaryData } from '../../../utils/constants'; 
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAdminDashboard } from "../../../redux/slices/adminDashboardSlice";



// const DashboardPage = ({ employees }) => {
//   const dispatch = useDispatch();

// const { loading, overall, department, activity, weekly } =
//   useSelector(state => state.adminDashboard);

// useEffect(() => {
//   dispatch(fetchAdminDashboard());
// }, []);

//   // const summary = getSummaryData(employees);

//   const summary = {
//   totalEmployees: overall?.totalEmployees || 0
// };

//   const [time, setTime] = useState(new Date());
  
//   // Update time every minute
//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   // Graph data for department distribution
// const departmentData = department?.map(item => ({
//   name: item.department,
//   value: item.totalEmployees,
//   color: "#3b82f6"
// }));


//   // Weekly hours data for graph
//   // const weeklyHoursData = [
//   //   { day: 'Mon', hours: 42, target: 40 },
//   //   { day: 'Tue', hours: 38, target: 40 },
//   //   { day: 'Wed', hours: 45, target: 40 },
//   //   { day: 'Thu', hours: 41, target: 40 },
//   //   { day: 'Fri', hours: 39, target: 40 },
//   //   { day: 'Sat', hours: 22, target: 20 },
//   //   { day: 'Sun', hours: 0, target: 0 }
//   // ];


//   const weeklyHoursData = weekly?.data?.map(d => ({
//   day: d.day,
//   hours: d.actualHours,
//   target: d.targetHours
// })) || [];

//   const maxHours = Math.max(...weeklyHoursData.map(d => Math.max(d.hours, d.target))) + 5;

//   return (
//     <div className="page-content">
//       <div className="page-header">
//         <div>
//           <h2 className="page-title">📊 Dashboard Overview</h2>
//           <p className="page-subtitle">Welcome back! Today is {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//         </div>
//         <div className="current-time">
//           <span className="time-icon">🕐</span>
//           <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//         </div>
//       </div>
      
//       {/* Summary Cards */}
//       <div className="summary-cards">
//         <div className="card">
//           <div className="card-icon">👥</div>
//           <h3>Total Employees</h3>
//           <p className="card-value">{overall?.totalEmployees}</p>
//           <p className="card-trend">↗️ 12% from last month</p>
//         </div>
//         <div className="card">
//           <div className="card-icon">✅</div>
//           <h3>Active Now</h3>
//           <p className="card-value">{overall?.activeNow}</p>
//           <p className="card-trend">🟢 All systems operational</p>
//         </div>
//         <div className="card card-warning">
//           <div className="card-icon">🏖️</div>
//           <h3>On Leave</h3>
//           <p className="card-value">{overall?.onLeave}</p>
//           <p className="card-trend">🟡 Normal leave pattern</p>
//         </div>
//         <div className="card card-info">
//           <div className="card-icon">⏱️</div>
//           <h3>Avg Hours/Day</h3>
//           <p className="card-value">{overall?.avgHoursPerDay}h</p>
//           <p className="card-trend">↗️ 0.5h from yesterday</p>
//         </div>
//         <div className="card card-primary">
//           <div className="card-icon">📈</div>
//           <h3>Total Hours Today</h3>
//           <p className="card-value">{overall?.totalHoursToday}h</p>
//           <p className="card-trend">📊 92% of target achieved</p>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="charts-section">
//         {/* Department Distribution Chart */}
//         <div className="">
//           <div className="chart-header">
//             <h3>📊 Department-wise Distribution</h3>
//             <span className="chart-subtitle">Employee count by department</span>
//           </div>
//           <div className="dept-stats">
//             {departmentData.map((dept, index) => (
//               <div key={index} className="dept-item">
//                 <div className="dept-bar-container">
//                   <div 
//                     className="dept-bar" 
//                    style={{
//   width: `${
//     departmentData.length
//       ? (dept.value / Math.max(...departmentData.map(d => d.value))) * 80
//       : 0
//   }%`,
//   background: dept.color
// }}

//                   ></div>
//                   <div className="dept-value">{dept.value}</div>
//                 </div>
//                 <span className="dept-name">{dept.name}</span>
//                 <span className="dept-percentage">
//                   {/* {Math.round((dept.value / summary.totalEmployees) * 100)}% */}
//                   {overall?.totalEmployees
//                   ? Math.round((dept.value / overall.totalEmployees) * 100)
//                     : 0
//                   }%

//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Weekly Hours Graph */}
//         <div className="">
//           <div className="chart-header">
//             <h3>📈 Weekly Hours Analysis</h3>
//             <span className="chart-subtitle">Actual vs Target hours this week</span>
//           </div>
//           <div className="weekly-hours-graph">
//             <div className="graph-y-axis">
//               {[0, 10, 20, 30, 40, 50].map((value) => (
//                 <div key={value} className="y-label">{value}h</div>
//               ))}
//             </div>
//             <div className="graph-bars">
//               {weeklyHoursData.map((day, index) => (
//                 <div key={index} className="bar-group">
//                   <div className="bar-container">
//                     <div 
//                       className="bar bar-target" 
//                       style={{ height: `${(day.target / maxHours) * 100}%` }}
//                       title={`Target: ${day.target}h`}
//                     ></div>
//                     <div 
//                       className="bar bar-actual" 
//                       style={{ 
//                         height: `${(day.hours / maxHours) * 100}%`,
//                         background: day.hours >= day.target ? '#10b981' : '#f59e0b'
//                       }}
//                       title={`Actual: ${day.hours}h`}
//                     ></div>
//                   </div>
//                   <div className="bar-label">{day.day}</div>
//                   <div className="bar-value">
//                     {day.hours >= day.target ? '✅' : '⚠️'} {day.hours}h
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="graph-legend">
//             <div className="legend-item">
//               <span className="legend-color" style={{ background: '#3b82f6' }}></span>
//               <span>Target Hours</span>
//             </div>
//             <div className="legend-item">
//               <span className="legend-color" style={{ background: '#10b981' }}></span>
//               <span>Actual Hours (Met)</span>
//             </div>
//             <div className="legend-item">
//               <span className="legend-color" style={{ background: '#f59e0b' }}></span>
//               <span>Actual Hours (Below)</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Activity Status Cards */}
//       <div className="charts-section">
//         {/* <div className="chart-box">
//           <h3>🎯 Today's Activity Status</h3>
//           <div className="activity-stats">
//             <div className="activity-item">
//               <div className="activity-circle" style={{background: '#10b981'}}>✅</div>
//               <div>
//                 <strong>Active & Productive</strong>
//                 <p>{summary.activeNow} employees working efficiently</p>
//               </div>
//               <span className="activity-percentage">85%</span>
//             </div>
//             <div className="activity-item">
//               <div className="activity-circle" style={{background: '#f59e0b'}}>☕</div>
//               <div>
//                 <strong>On Break</strong>
//                 <p>Currently on scheduled breaks</p>
//               </div>
//               <span className="activity-percentage">8%</span>
//             </div>
//             <div className="activity-item">
//               <div className="activity-circle" style={{background: '#ef4444'}}>⏸️</div>
//               <div>
//                 <strong>Inactive</strong>
//                 <p>1 employee not active today</p>
//               </div>
//               <span className="activity-percentage">7%</span>
//             </div>
//           </div>
//         </div> */}

//         {/* Productivity Meter */}
//         {/* <div className="">
//           <h3>⚡ Overall Productivity</h3>
//           <div className="productivity-meter">
//             <div className="meter-container">
//               <div className="meter-circle">
//                 <div className="meter-value">92%</div>
//                 <div className="meter-label">Productivity</div>
//               </div>
//               <div className="meter-progress"></div>
//             </div>
//             <div className="productivity-details">
//               <div className="detail-item">
//                 <span className="detail-label">Coding/Development</span>
//                 <span className="detail-value">45%</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Meetings</span>
//                 <span className="detail-value">20%</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Design & Planning</span>
//                 <span className="detail-value">18%</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Testing & QA</span>
//                 <span className="detail-value">12%</span>
//               </div>
//               <div className="detail-item">
//                 <span className="detail-label">Break/Idle</span>
//                 <span className="detail-value">5%</span>
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </div>

//       {/* Recent Activity */}
//       <div className="recent-activity">
//         <div className="activity-header">
//           <h3>🕒 Recent Activity</h3>
//           <button className="btn-view-all">View All →</button>
//         </div>
//         <div className="activity-list">
//           {employees.slice(0, 5).map(emp => (
//             <div key={emp.id} className="activity-log">
//               <div className="activity-avatar" style={{ 
//                 background: emp.department === 'Engineering' ? '#3b82f6' : 
//                            emp.department === 'Design' ? '#10b981' : 
//                            emp.department === 'Management' ? '#ef4444' : '#8b5cf6'
//               }}>
//                 {emp.name[0]}
//               </div>
//               <div className="activity-details">
//                 <div className="activity-main">
//                   <strong>{emp.name}</strong>
//                   <span className={`activity-status ${emp.status.toLowerCase().replace(' ', '-')}`}>
//                     {emp.status}
//                   </span>
//                 </div>
//                 <p>{emp.role} • {emp.department} • Last active: {emp.lastActive}</p>
//               </div>
//               <div className="activity-hours">
//                 <div className="hours-today">{emp.todayHours}h today</div>
//                 <div className="hours-week">{emp.weekHours}h this week</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         .page-subtitle {
//           color: #94a3b8;
//           font-size: 14px;
//           margin-top: 4px;
//         }
        
//         .current-time {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           background: rgba(59, 130, 246, 0.1);
//           padding: 8px 16px;
//           border-radius: 20px;
//           font-size: 14px;
//           color: #3b82f6;
//         }
        
//         .time-icon {
//           font-size: 16px;
//         }
        
//         .card-trend {
//           font-size: 12px;
//           color: #94a3b8;
//           margin-top: 4px;
//         }
        
//         .chart-header {
//           margin-bottom: 20px;
//         }
        
//         .chart-subtitle {
//           color: #94a3b8;
//           font-size: 13px;
//           display: block;
//           margin-top: 4px;
//         }
        
//         .dept-bar-container {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
        
//         .dept-value {
//           min-width: 20px;
//           text-align: right;
//           font-size: 14px;
//           font-weight: 600;
//           color: #f1f5f9;
//         }
        
//         .dept-percentage {
//           min-width: 40px;
//           text-align: right;
//           font-size: 13px;
//           color: #94a3b8;
//         }
        
//         .weekly-hours-graph {
//           display: flex;
//           gap: 16px;
//           height: 200px;
//           margin-top: 20px;
//         }
        
//         .graph-y-axis {
//           display: flex;
//           flex-direction: column-reverse;
//           justify-content: space-between;
//           padding-bottom: 24px;
//         }
        
//         .y-label {
//           font-size: 11px;
//           color: #94a3b8;
//         }
        
//         .graph-bars {
//           flex: 1;
//           display: flex;
//           justify-content: space-around;
//           align-items: flex-end;
//           padding-bottom: 24px;
//         }
        
//         .bar-group {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 8px;
//           width: 40px;
//         }
        
//         .bar-container {
//           flex: 1;
//           width: 30px;
//           position: relative;
//           display: flex;
//           align-items: flex-end;
//         }
        
//         .bar {
//           width: 100%;
//           position: absolute;
//           bottom: 0;
//           border-radius: 4px 4px 0 0;
//           transition: height 0.3s ease;
//         }
        
//         .bar-target {
//           background: #3b82f6;
//           opacity: 0.3;
//           height: 50%;
//         }
        
//         .bar-actual {
//           background: #10b981;
//           z-index: 2;
//           width: 70%;
//           left: 15%;
//         }
        
//         .bar-label {
//           font-size: 12px;
//           color: #94a3b8;
//         }
        
//         .bar-value {
//           font-size: 11px;
//           color: #f1f5f9;
//           background: rgba(30, 41, 59, 0.8);
//           padding: 2px 6px;
//           border-radius: 4px;
//         }
        
//         .graph-legend {
//           display: flex;
//           gap: 16px;
//           margin-top: 20px;
//           flex-wrap: wrap;
//         }
        
//         .legend-item {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           font-size: 12px;
//           color: #94a3b8;
//         }
        
//         .legend-color {
//           width: 12px;
//           height: 12px;
//           border-radius: 2px;
//         }
        
//         .activity-percentage {
//           font-size: 18px;
//           font-weight: 600;
//           color: #f1f5f9;
//         }
        
//         .productivity-meter {
//           display: flex;
//           align-items: center;
//           gap: 30px;
//           margin-top: 20px;
//         }
        
//         .meter-container {
//           position: relative;
//           width: 120px;
//           height: 120px;
//         }
        
//         .meter-circle {
//           width: 100%;
//           height: 100%;
//           border-radius: 50%;
//           background: conic-gradient(#10b981 0% 92%, #334155 92% 100%);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           position: relative;
//         }
        
//         .meter-circle::before {
//           content: '';
//           position: absolute;
//           width: 80px;
//           height: 80px;
//           background: #1e293b;
//           border-radius: 50%;
//         }
        
//         .meter-value {
//           font-size: 24px;
//           font-weight: 700;
//           color: #10b981;
//           position: relative;
//           z-index: 1;
//         }
        
//         .meter-label {
//           font-size: 12px;
//           color: #94a3b8;
//           position: relative;
//           z-index: 1;
//         }
        
//         .productivity-details {
//           flex: 1;
//         }
        
//         .detail-item {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 8px;
//           padding-bottom: 8px;
//           border-bottom: 1px solid #334155;
//         }
        
//         .detail-label {
//           font-size: 13px;
//           color: #94a3b8;
//         }
        
//         .detail-value {
//           font-size: 13px;
//           font-weight: 600;
//           color: #f1f5f9;
//         }
        
//         .activity-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 16px;
//         }
        
//         .btn-view-all {
//           background: transparent;
//           border: 1px solid #334155;
//           color: #3b82f6;
//           padding: 6px 12px;
//           border-radius: 6px;
//           font-size: 13px;
//           cursor: pointer;
//           transition: all 0.2s;
//         }
        
//         .btn-view-all:hover {
//           background: rgba(59, 130, 246, 0.1);
//         }
        
//         .activity-main {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           margin-bottom: 4px;
//         }
        
//         .activity-status {
//           font-size: 11px;
//           padding: 2px 8px;
//           border-radius: 10px;
//           font-weight: 500;
//         }
        
//         .activity-status.active {
//           background: rgba(16, 185, 129, 0.2);
//           color: #10b981;
//         }
        
//         .activity-status.inactive {
//           background: rgba(239, 68, 68, 0.2);
//           color: #ef4444;
//         }
        
//         .activity-status.on-leave {
//           background: rgba(245, 158, 11, 0.2);
//           color: #f59e0b;
//         }
        
//         .activity-hours {
//           display: flex;
//           flex-direction: column;
//           align-items: flex-end;
//           gap: 4px;
//         }
        
//         .hours-today {
//           font-size: 14px;
//           font-weight: 600;
//           color: #f1f5f9;
//         }
        
//         .hours-week {
//           font-size: 12px;
//           color: #94a3b8;
//         }
        
//         @media (max-width: 768px) {
//           .productivity-meter {
//             flex-direction: column;
//             gap: 20px;
//           }
          
//           .activity-log {
//             flex-direction: column;
//             gap: 12px;
//             text-align: center;
//           }
          
//           .activity-hours {
//             align-items: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DashboardPage;




// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAdminDashboard } from "../../../redux/slices/adminDashboardSlice";
// import { 
//   fetchEmployeePerformance, 
//   clearPerformance,
//   setRange 
// } from "../../../redux/slices/employeePerformanceSlice";

// const DashboardPage = ({ employees }) => {
//   const dispatch = useDispatch();
//   const [time, setTime] = useState(new Date());
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [showPerformanceModal, setShowPerformanceModal] = useState(false);

//   const { loading, overall, department, activity, weekly } =
//     useSelector(state => state.adminDashboard);

//   const { 
//     loading: perfLoading, 
//     employee: perfEmployee, 
//     performance, 
//     range,
//     error: perfError 
//   } = useSelector(state => state.employeePerformance);

//   useEffect(() => {
//     dispatch(fetchAdminDashboard());
//   }, [dispatch]);

//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   // Handle employee click to show performance
//   const handleEmployeeClick = (employeeId) => {
//     setSelectedEmployee(employeeId);
//     setShowPerformanceModal(true);
//     dispatch(fetchEmployeePerformance({ employeeId, range: 'day' }));
//   };

//   // Handle range change
//   const handleRangeChange = (newRange) => {
//     dispatch(setRange(newRange));
//     if (selectedEmployee) {
//       dispatch(fetchEmployeePerformance({ employeeId: selectedEmployee, range: newRange }));
//     }
//   };

//   // Close modal
//   const closeModal = () => {
//     setShowPerformanceModal(false);
//     setSelectedEmployee(null);
//     dispatch(clearPerformance());
//   };

//   const summary = {
//     totalEmployees: overall?.totalEmployees || 0
//   };

//   const departmentData = department?.map(item => ({
//     name: item.department,
//     value: item.totalEmployees,
//     color: "#3b82f6"
//   })) || [];

//   const weeklyHoursData = weekly?.data?.map(d => ({
//     day: d.day,
//     hours: d.actualHours,
//     target: d.targetHours
//   })) || [];

//   const maxHours = weeklyHoursData.length > 0 
//     ? Math.max(...weeklyHoursData.map(d => Math.max(d.hours, d.target))) + 5 
//     : 50;

//   return (
//     <div className="page-content">
//       <div className="page-header">
//         <div>
//           <h2 className="page-title">📊 Dashboard Overview</h2>
//           <p className="page-subtitle">Welcome back! Today is {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//         </div>
//         <div className="current-time">
//           <span className="time-icon">🕐</span>
//           <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//         </div>
//       </div>
      
//       {/* Summary Cards */}
//       <div className="summary-cards">
//         <div className="card">
//           <div className="card-icon">👥</div>
//           <h3>Total Employees</h3>
//           <p className="card-value">{overall?.totalEmployees || 0}</p>
//           <p className="card-trend">↗️ 12% from last month</p>
//         </div>
//         <div className="card">
//           <div className="card-icon">✅</div>
//           <h3>Active Now</h3>
//           <p className="card-value">{overall?.activeNow || 0}</p>
//           <p className="card-trend">🟢 All systems operational</p>
//         </div>
//         <div className="card card-warning">
//           <div className="card-icon">🏖️</div>
//           <h3>On Leave</h3>
//           <p className="card-value">{overall?.onLeave || 0}</p>
//           <p className="card-trend">🟡 Normal leave pattern</p>
//         </div>
//         <div className="card card-info">
//           <div className="card-icon">⏱️</div>
//           <h3>Avg Hours/Day</h3>
//           <p className="card-value">{overall?.avgHoursPerDay || 0}h</p>
//           <p className="card-trend">↗️ 0.5h from yesterday</p>
//         </div>
//         <div className="card card-primary">
//           <div className="card-icon">📈</div>
//           <h3>Total Hours Today</h3>
//           <p className="card-value">{overall?.totalHoursToday || 0}h</p>
//           <p className="card-trend">📊 92% of target achieved</p>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="charts-section">
//         {/* Department Distribution Chart */}
//         <div className="chart-box">
//           <div className="chart-header">
//             <h3>📊 Department-wise Distribution</h3>
//             <span className="chart-subtitle">Employee count by department</span>
//           </div>
//           <div className="dept-stats">
//             {departmentData.map((dept, index) => (
//               <div key={index} className="dept-item">
//                 <div className="dept-bar-container">
//                   <div 
//                     className="dept-bar" 
//                     style={{
//                       width: `${
//                         departmentData.length
//                           ? (dept.value / Math.max(...departmentData.map(d => d.value))) * 80
//                           : 0
//                       }%`,
//                       background: dept.color
//                     }}
//                   ></div>
//                   <div className="dept-value">{dept.value}</div>
//                 </div>
//                 <span className="dept-name">{dept.name}</span>
//                 <span className="dept-percentage">
//                   {overall?.totalEmployees
//                     ? Math.round((dept.value / overall.totalEmployees) * 100)
//                     : 0
//                   }%
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Weekly Hours Graph */}
//         <div className="chart-box">
//           <div className="chart-header">
//             <h3>📈 Weekly Hours Analysis</h3>
//             <span className="chart-subtitle">Actual vs Target hours this week</span>
//           </div>
//           <div className="weekly-hours-graph">
//             <div className="graph-y-axis">
//               {[0, 10, 20, 30, 40, 50].map((value) => (
//                 <div key={value} className="y-label">{value}h</div>
//               ))}
//             </div>
//             <div className="graph-bars">
//               {weeklyHoursData.map((day, index) => (
//                 <div key={index} className="bar-group">
//                   <div className="bar-container">
//                     <div 
//                       className="bar bar-target" 
//                       style={{ height: `${(day.target / maxHours) * 100}%` }}
//                       title={`Target: ${day.target}h`}
//                     ></div>
//                     <div 
//                       className="bar bar-actual" 
//                       style={{ 
//                         height: `${(day.hours / maxHours) * 100}%`,
//                         background: day.hours >= day.target ? '#10b981' : '#f59e0b'
//                       }}
//                       title={`Actual: ${day.hours}h`}
//                     ></div>
//                   </div>
//                   <div className="bar-label">{day.day}</div>
//                   <div className="bar-value">
//                     {day.hours >= day.target ? '✅' : '⚠️'} {day.hours}h
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="graph-legend">
//             <div className="legend-item">
//               <span className="legend-color" style={{ background: '#3b82f6' }}></span>
//               <span>Target Hours</span>
//             </div>
//             <div className="legend-item">
//               <span className="legend-color" style={{ background: '#10b981' }}></span>
//               <span>Actual Hours (Met)</span>
//             </div>
//             <div className="legend-item">
//               <span className="legend-color" style={{ background: '#f59e0b' }}></span>
//               <span>Actual Hours (Below)</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity with Click to View Performance */}
//       <div className="recent-activity">
//         <div className="activity-header">
//           <h3>🕒 Employee Activity - Click to View Performance</h3>
//           <button className="btn-view-all">View All →</button>
//         </div>
//         <div className="activity-list">
//           {activity?.employees?.map(emp => (
//             <div 
//               key={emp.id} 
//               className="activity-log clickable"
//               onClick={() => handleEmployeeClick(emp._id)}
//             >
//               <div className="activity-avatar" style={{ 
//                 background: emp.department === 'Engineering' ? '#3b82f6' : 
//                            emp.department === 'Design' ? '#10b981' : 
//                            emp.department === 'Management' ? '#ef4444' : '#8b5cf6'
//               }}>
//                 {emp.name?.[0] || 'E'}
//               </div>
//               <div className="activity-details">
//                 <div className="activity-main">
//                   <strong>{emp.name}</strong>
//                   <span className={`activity-status ${emp.status?.toLowerCase().replace(' ', '-')}`}>
//                     {emp.status}
//                   </span>
//                 </div>
//                 <p>{emp.role} • {emp.department} • Last active: {emp.lastActive}</p>
//               </div>
//               <div className="activity-hours">
//                 <div className="hours-today">{emp.todayHours || 0}h today</div>
//                 <div className="hours-week">{emp.weekHours || 0}h this week</div>
//               </div>
//             </div>
//           )) || employees?.slice(0, 5).map(emp => (
//             <div 
//               key={emp.id} 
//               className="activity-log clickable"
//               onClick={() => handleEmployeeClick(emp.id)}
//             >
//               <div className="activity-avatar" style={{ 
//                 background: emp.department === 'Engineering' ? '#3b82f6' : 
//                            emp.department === 'Design' ? '#10b981' : 
//                            emp.department === 'Management' ? '#ef4444' : '#8b5cf6'
//               }}>
//                 {emp.name[0]}
//               </div>
//               <div className="activity-details">
//                 <div className="activity-main">
//                   <strong>{emp.name}</strong>
//                   <span className={`activity-status ${emp.status.toLowerCase().replace(' ', '-')}`}>
//                     {emp.status}
//                   </span>
//                 </div>
//                 <p>{emp.role} • {emp.department} • Last active: {emp.lastActive}</p>
//               </div>
//               <div className="activity-hours">
//                 <div className="hours-today">{emp.todayHours}h today</div>
//                 <div className="hours-week">{emp.weekHours}h this week</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Performance Modal */}
//       {showPerformanceModal && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <div>
//                 <h2>📊 Employee Performance</h2>
//                 {perfEmployee && (
//                   <p className="modal-subtitle">{perfEmployee.name} • {perfEmployee.email}</p>
//                 )}
//               </div>
//               <button className="modal-close" onClick={closeModal}>✕</button>
//             </div>

//             {/* Range Selector */}
//             <div className="range-selector">
//               <button 
//                 className={`range-btn ${range === 'day' ? 'active' : ''}`}
//                 onClick={() => handleRangeChange('day')}
//               >
//                 Daily
//               </button>
//               <button 
//                 className={`range-btn ${range === 'week' ? 'active' : ''}`}
//                 onClick={() => handleRangeChange('week')}
//               >
//                 Weekly
//               </button>
//               <button 
//                 className={`range-btn ${range === 'month' ? 'active' : ''}`}
//                 onClick={() => handleRangeChange('month')}
//               >
//                 Monthly
//               </button>
//             </div>

//             {perfLoading ? (
//               <div className="loading-state">
//                 <div className="spinner"></div>
//                 <p>Loading performance data...</p>
//               </div>
//             ) : perfError ? (
//               <div className="error-state">
//                 <p>❌ {perfError}</p>
//               </div>
//             ) : performance ? (
//               <div className="performance-content">
//                 {/* Summary Stats */}
//                 <div className="perf-summary">
//                   <div className="perf-card">
//                     <div className="perf-icon">⏱️</div>
//                     <div>
//                       <div className="perf-label">Total Hours</div>
//                       <div className="perf-value">{performance.totalHours || 0}h</div>
//                     </div>
//                   </div>
//                   <div className="perf-card">
//                     <div className="perf-icon">📅</div>
//                     <div>
//                       <div className="perf-label">Active Days</div>
//                       <div className="perf-value">{performance.activeDays || 0}</div>
//                     </div>
//                   </div>
//                   <div className="perf-card">
//                     <div className="perf-icon">📈</div>
//                     <div>
//                       <div className="perf-label">Avg Hours/Day</div>
//                       <div className="perf-value">{performance.avgHoursPerDay || 0}h</div>
//                     </div>
//                   </div>
//                   <div className="perf-card">
//                     <div className="perf-icon">🎯</div>
//                     <div>
//                       <div className="perf-label">Target Achievement</div>
//                       <div className="perf-value">{performance.targetAchievement || 0}%</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Day-wise Breakdown */}
//                 {range === 'day' && performance.dayDetails && (
//                   <div className="day-breakdown">
//                     <h3>📆 Today's Activity Breakdown</h3>
//                     <div className="timeline">
//                       {performance.dayDetails.map((activity, idx) => (
//                         <div key={idx} className="timeline-item">
//                           <div className="timeline-time">{activity.time}</div>
//                           <div className="timeline-dot"></div>
//                           <div className="timeline-content">
//                             <strong>{activity.activity}</strong>
//                             <p>{activity.duration} - {activity.description}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Weekly Breakdown */}
//                 {range === 'week' && performance.weeklyData && (
//                   <div className="weekly-breakdown">
//                     <h3>📅 Weekly Performance</h3>
//                     <div className="weekly-chart">
//                       {performance.weeklyData.map((day, idx) => (
//                         <div key={idx} className="weekly-day">
//                           <div className="day-name">{day.day}</div>
//                           <div className="day-bar-wrapper">
//                             <div 
//                               className="day-bar"
//                               style={{
//                                 height: `${(day.hours / 10) * 100}%`,
//                                 background: day.hours >= day.target ? '#10b981' : '#f59e0b'
//                               }}
//                             >
//                               <span className="bar-hours">{day.hours}h</span>
//                             </div>
//                           </div>
//                           <div className="day-status">
//                             {day.hours >= day.target ? '✅' : '⚠️'}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Monthly Breakdown */}
//                 {range === 'month' && performance.monthlyData && (
//                   <div className="monthly-breakdown">
//                     <h3>📊 Monthly Performance</h3>
//                     <div className="monthly-grid">
//                       {performance.monthlyData.map((week, idx) => (
//                         <div key={idx} className="month-week">
//                           <h4>Week {week.week}</h4>
//                           <div className="week-stats">
//                             <div className="stat-item">
//                               <span className="stat-label">Total Hours:</span>
//                               <span className="stat-value">{week.totalHours}h</span>
//                             </div>
//                             <div className="stat-item">
//                               <span className="stat-label">Avg/Day:</span>
//                               <span className="stat-value">{week.avgPerDay}h</span>
//                             </div>
//                             <div className="stat-item">
//                               <span className="stat-label">Active Days:</span>
//                               <span className="stat-value">{week.activeDays}</span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <p>No performance data available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style>{`
//         .page-subtitle {
//           color: #94a3b8;
//           font-size: 14px;
//           margin-top: 4px;
//         }
        
//         .current-time {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           background: rgba(59, 130, 246, 0.1);
//           padding: 8px 16px;
//           border-radius: 20px;
//           font-size: 14px;
//           color: #3b82f6;
//         }
        
//         .clickable {
//           cursor: pointer;
//           transition: all 0.2s ease;
//         }
        
//         .clickable:hover {
//           transform: translateX(4px);
//           background: rgba(59, 130, 246, 0.05);
//         }

//         /* Modal Styles */
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.7);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//           padding: 20px;
//         }

//         .modal-content {
//           background: #1e293b;
//           border-radius: 16px;
//           width: 100%;
//           max-width: 900px;
//           max-height: 90vh;
//           overflow-y: auto;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           padding: 24px;
//           border-bottom: 1px solid #334155;
//         }

//         .modal-subtitle {
//           color: #94a3b8;
//           font-size: 14px;
//           margin-top: 4px;
//         }

//         .modal-close {
//           background: transparent;
//           border: none;
//           color: #94a3b8;
//           font-size: 24px;
//           cursor: pointer;
//           width: 32px;
//           height: 32px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 8px;
//           transition: all 0.2s;
//         }

//         .modal-close:hover {
//           background: rgba(239, 68, 68, 0.2);
//           color: #ef4444;
//         }

//         .range-selector {
//           display: flex;
//           gap: 8px;
//           padding: 16px 24px;
//           background: #0f172a;
//         }

//         .range-btn {
//           flex: 1;
//           padding: 10px 20px;
//           border: 1px solid #334155;
//           background: transparent;
//           color: #94a3b8;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.2s;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         .range-btn:hover {
//           background: rgba(59, 130, 246, 0.1);
//           border-color: #3b82f6;
//           color: #3b82f6;
//         }

//         .range-btn.active {
//           background: #3b82f6;
//           border-color: #3b82f6;
//           color: white;
//         }

//         .performance-content {
//           padding: 24px;
//         }

//         .perf-summary {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 16px;
//           margin-bottom: 32px;
//         }

//         .perf-card {
//           background: #0f172a;
//           padding: 20px;
//           border-radius: 12px;
//           display: flex;
//           gap: 16px;
//           align-items: center;
//           border: 1px solid #334155;
//         }

//         .perf-icon {
//           font-size: 32px;
//         }

//         .perf-label {
//           color: #94a3b8;
//           font-size: 13px;
//           margin-bottom: 4px;
//         }

//         .perf-value {
//           color: #f1f5f9;
//           font-size: 24px;
//           font-weight: 700;
//         }

//         /* Timeline for Daily View */
//         .day-breakdown {
//           margin-top: 24px;
//         }

//         .day-breakdown h3 {
//           margin-bottom: 20px;
//           color: #f1f5f9;
//         }

//         .timeline {
//           position: relative;
//           padding-left: 40px;
//         }

//         .timeline-item {
//           position: relative;
//           padding-bottom: 24px;
//           display: flex;
//           gap: 16px;
//         }

//         .timeline-time {
//           position: absolute;
//           left: -40px;
//           color: #64748b;
//           font-size: 12px;
//           width: 50px;
//         }

//         .timeline-dot {
//           width: 12px;
//           height: 12px;
//           background: #3b82f6;
//           border-radius: 50%;
//           position: absolute;
//           left: -6px;
//           top: 4px;
//         }

//         .timeline-dot::before {
//           content: '';
//           position: absolute;
//           width: 2px;
//           height: 100%;
//           background: #334155;
//           left: 5px;
//           top: 12px;
//         }

//         .timeline-item:last-child .timeline-dot::before {
//           display: none;
//         }

//         .timeline-content {
//           flex: 1;
//           background: #0f172a;
//           padding: 16px;
//           border-radius: 8px;
//           border: 1px solid #334155;
//         }

//         .timeline-content strong {
//           color: #f1f5f9;
//           display: block;
//           margin-bottom: 4px;
//         }

//         .timeline-content p {
//           color: #94a3b8;
//           font-size: 13px;
//         }

//         /* Weekly Chart */
//         .weekly-breakdown {
//           margin-top: 24px;
//         }

//         .weekly-breakdown h3 {
//           margin-bottom: 20px;
//           color: #f1f5f9;
//         }

//         .weekly-chart {
//           display: flex;
//           gap: 16px;
//           justify-content: space-around;
//           align-items: flex-end;
//           height: 250px;
//           background: #0f172a;
//           padding: 20px;
//           border-radius: 12px;
//           border: 1px solid #334155;
//         }

//         .weekly-day {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 8px;
//           flex: 1;
//         }

//         .day-name {
//           color: #94a3b8;
//           font-size: 12px;
//           font-weight: 600;
//         }

//         .day-bar-wrapper {
//           width: 100%;
//           height: 180px;
//           display: flex;
//           align-items: flex-end;
//           justify-content: center;
//         }

//         .day-bar {
//           width: 40px;
//           border-radius: 8px 8px 0 0;
//           transition: all 0.3s ease;
//           position: relative;
//           display: flex;
//           align-items: flex-start;
//           justify-content: center;
//           padding-top: 8px;
//         }

//         .bar-hours {
//           color: white;
//           font-size: 12px;
//           font-weight: 600;
//         }

//         .day-status {
//           font-size: 16px;
//         }

//         /* Monthly Grid */
//         .monthly-breakdown {
//           margin-top: 24px;
//         }

//         .monthly-breakdown h3 {
//           margin-bottom: 20px;
//           color: #f1f5f9;
//         }

//         .monthly-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 16px;
//         }

//         .month-week {
//           background: #0f172a;
//           padding: 20px;
//           border-radius: 12px;
//           border: 1px solid #334155;
//         }

//         .month-week h4 {
//           color: #f1f5f9;
//           margin-bottom: 16px;
//           font-size: 16px;
//         }

//         .week-stats {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }

//         .stat-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding-bottom: 12px;
//           border-bottom: 1px solid #334155;
//         }

//         .stat-item:last-child {
//           border-bottom: none;
//           padding-bottom: 0;
//         }

//         .stat-label {
//           color: #94a3b8;
//           font-size: 13px;
//         }

//         .stat-value {
//           color: #f1f5f9;
//           font-weight: 600;
//           font-size: 15px;
//         }

//         .loading-state, .error-state, .empty-state {
//           padding: 60px 24px;
//           text-align: center;
//           color: #94a3b8;
//         }

//         .spinner {
//           width: 40px;
//           height: 40px;
//           border: 4px solid #334155;
//           border-top-color: #3b82f6;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           margin: 0 auto 16px;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }

//         /* Existing styles */
//         .card-trend {
//           font-size: 12px;
//           color: #94a3b8;
//           margin-top: 4px;
//         }
        
//         .chart-header {
//           margin-bottom: 20px;
//         }
        
//         .chart-subtitle {
//           color: #94a3b8;
//           font-size: 13px;
//           display: block;
//           margin-top: 4px;
//         }
        
//         .dept-bar-container {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
        
//         .dept-value {
//           min-width: 20px;
//           text-align: right;
//           font-size: 14px;
//           font-weight: 600;
//           color: #f1f5f9;
//         }
        
//         .dept-percentage {
//           min-width: 40px;
//           text-align: right;
//           font-size: 13px;
//           color: #94a3b8;
//         }
        
//         .weekly-hours-graph {
//           display: flex;
//           gap: 16px;
//           height: 200px;
//           margin-top: 20px;
//         }
        
//         .graph-y-axis {
//           display: flex;
//           flex-direction: column-reverse;
//           justify-content: space-between;
//           padding-bottom: 24px;
//         }
        
//         .y-label {
//           font-size: 11px;
//           color: #94a3b8;
//         }
        
//         .graph-bars {
//           flex: 1;
//           display: flex;
//           justify-content: space-around;
//           align-items: flex-end;
//           padding-bottom: 24px;
//         }
        
//         .bar-group {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 8px;
//           width: 40px;
//         }
        
//         .bar-container {
//           flex: 1;
//           width: 30px;
//           position: relative;
//           display: flex;
//           align-items: flex-end;
//         }
        
//         .bar {
//           width: 100%;
//           position: absolute;
//           bottom: 0;
//           border-radius: 4px 4px 0 0;
//           transition: height 0.3s ease;
//           // ... existing code ...

//         .bar {
//           width: 100%;
//           position: absolute;
//           bottom: 0;
//           border-radius: 4px 4px 0 0;
//           transition: height 0.3s ease;
//         }
        
//         .bar-target {
//           background: #3b82f6;
//           z-index: 1;
//           opacity: 0.7;
//         }
        
//         .bar-actual {
//           z-index: 2;
//         }
        
//         .bar-label {
//           font-size: 11px;
//           color: #94a3b8;
//           white-space: nowrap;
//         }
        
//         .bar-value {
//           font-size: 11px;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         }
        
//         /* Responsive adjustments */
//         @media (max-width: 1200px) {
//           .summary-cards {
//             grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           }
          
//           .charts-section {
//             flex-direction: column;
//             gap: 24px;
//           }
          
//           .weekly-hours-graph {
//             flex-direction: column;
//             height: auto;
//             min-height: 250px;
//           }
          
//           .graph-y-axis {
//             flex-direction: row;
//             width: 100%;
//             height: auto;
//             padding-bottom: 0;
//             margin-bottom: 16px;
//           }
          
//           .graph-y-axis .y-label {
//             display: inline-block;
//             margin-right: 12px;
//           }
          
//           .graph-bars {
//             flex-direction: row;
//             align-items: flex-end;
//             height: 160px;
//             padding-bottom: 0;
//           }
          
//           .bar-group {
//             width: 50px;
//           }
//         }
        
//         @media (max-width: 768px) {
//           .summary-cards {
//             grid-template-columns: repeat(2, 1fr);
//           }
          
//           .dept-item {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 8px;
//           }
          
//           .dept-bar-container {
//             width: 100%;
//           }
          
//           .dept-bar {
//             width: 100% !important;
//           }
          
//           .dept-value, .dept-percentage {
//             text-align: left;
//             min-width: auto;
//           }
          
//           .bar-group {
//             width: 60px;
//           }
          
//           .bar-label {
//             font-size: 10px;
//           }
//         }
        
//         @media (max-width: 480px) {
//           .summary-cards {
//             grid-template-columns: 1fr;
//           }
          
//           .page-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 12px;
//           }
          
//           .charts-section {
//             gap: 16px;
//           }
          
//           .chart-box {
//             padding: 16px;
//           }
          
//           .bar-group {
//             width: 50px;
//           }
          
//           .activity-log {
//             flex-direction: column;
//             gap: 12px;
//             padding: 12px;
//           }
          
//           .activity-details, .activity-hours {
//             width: 10; /* Remove width constraint */
//           }
          
//           .activity-hours {
//             display: flex;
//             justify-content: space-between;
//           }
//         }
        
//         /* Modal responsive adjustments */
//         @media (max-width: 768px) {
//           .modal-content {
//             margin: 10px;
//           }
          
//           .perf-summary {
//             grid-template-columns: 1fr;
//           }
          
//           .weekly-chart {
//             flex-wrap: wrap;
//             height: auto;
//             padding: 16px;
//           }
          
//           .weekly-day {
//             margin-bottom: 20px;
//           }
          
//           .day-bar-wrapper {
//             height: 120px;
//           }
//         }
        
//         @media (max-width: 480px) {
//           .range-selector {
//             flex-wrap: wrap;
//           }
          
//           .range-btn {
//             flex: 0 0 48%;
//           }
//         }
        
//         /* Existing styles */
//         .card-trend {
//           font-size: 12px;
//           color: #94a3b8;
//           margin-top: 4px;
//         }
        
//         .chart-header {
//           margin-bottom: 20px;
//         }
        
//         .chart-subtitle {
//           color: #94a3b8;
//           font-size: 13px;
//           display: block;
//           margin-top: 4px;
//         }
        
//         .dept-stats {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }
        
//         .dept-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 16px;
//         }
        
//         .dept-bar-container {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
        
//         .dept-bar {
//           height: 20px;
//           min-width: 40px;
//           max-width: 200px;
//           border-radius: 4px;
//         }
        
//         .dept-value {
//           min-width: 20px;
//           text-align: right;
//           font-size: 14px;
//           font-weight: 600;
//           color: #f1f5f9;
//         }
        
//         .dept-percentage {
//           min-width: 40px;
//           text-align: right;
//           font-size: 13px;
//           color: #94a3b8;
//         }
        
//         .weekly-hours-graph {
//           display: flex;
//           gap: 16px;
//           height: 200px;
//           margin-top: 20px;
//         }
        
//         .graph-y-axis {
//           display: flex;
//           flex-direction: column-reverse;
//           justify-content: space-between;
//           padding-bottom: 24px;
//         }
        
//         .y-label {
//           font-size: 11px;
//           color: #94a3b8;
//         }
        
//         .graph-bars {
//           flex: 1;
//           display: flex;
//           justify-content: space-around;
//           align-items: flex-end;
//           padding-bottom: 24px;
//         }
        
//         .bar-group {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 8px;
//           width: 40px;
//         }
        
//         .bar-container {
//           flex: 1;
//           width: 30px;
//           position: relative;
//           display: flex;
//           align-items: flex-end;
//         }
        
//         /* Completed bar styles */
//         .bar-target {
//           background: #3b82f6;
//           opacity: 0.7;
//           z-index: 1;
//         }
        
//         .bar-actual {
//           z-index: 2;
//         }
        
//         .graph-legend {
//           display: flex;
//           gap: 16px;
//           margin-top: 16px;
//           flex-wrap: wrap;
//         }
        
//         .legend-item {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           font-size: 12px;
//           color: #94a3b8;
//         }
        
//         .legend-color {
//           width: 16px;
//           height: 16px;
//           border-radius: 4px;
//         }
        
//         /* Activity list */
//         .recent-activity {
//           margin-top: 24px;
//         }
        
//         .activity-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 16px;
//         }
        
//         .btn-view-all {
//           background: transparent;
//           border: 1px solid #3b82f6;
//           color: #3b82f6;
//           padding: 6px 12px;
//           border-radius: 6px;
//           font-size: 13px;
//           cursor: pointer;
//           transition: all 0.2s;
//         }
        
//         .btn-view-all:hover {
//           background: rgba(59, 130, 246, 0.1);
//         }
        
//         .activity-list {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }
        
//         .activity-log {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           padding: 16px;
//           border-radius: 12px;
//           background: #0f172a;
//           border: 1px solid #334155;
//         }
        
//         .activity-avatar {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-weight: 600;
//           flex-shrink: 0;
//         }
        
//         .activity-details {
//           flex: 1;
//           min-width: 0;
//         }
        
//         .activity-main {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 4px;
//         }
        
//         .activity-status {
//           padding: 2px 8px;
//           border-radius: 12px;
//           font-size: 12px;
//           font-weight: 500;
//         }
        
//         .activity-status.active {
//           background: rgba(16, 185, 129, 0.2);
//           color: #10b981;
//         }
        
//         .activity-status.away {
//           background: rgba(234, 179, 8, 0.2);
//           color: #eab308;
//         }
        
//         .activity-status.offline {
//           background: rgba(239, 68, 68, 0.2);
//           color: #ef4444;
//         }
        
//         .activity-details p {
//           color: #94a3b8;
//           font-size: 13px;
//           margin: 0;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
        
//         .activity-hours {
//           display: flex;
//           flex-direction: column;
//           align-items: flex-end;
//           min-width: 100px;
//         }
        
//         .hours-today, .hours-week {
//           font-size: 13px;
//           color: #f1f5f9;
//           font-weight: 500;
//         }
        
//         .hours-week {
//           color: #94a3b8;
//         }
        
//         /* Page layout */
//         .page-content {
//           padding: 24px;
//         }
        
//         .page-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 24px;
//           flex-wrap: wrap;
//           gap: 16px;
//         }
        
//         .summary-cards {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 16px;
//           margin-bottom: 24px;
//         }
        
//         .card {
//           background: #0f172a;
//           border: 1px solid #334155;
//           border-radius: 12px;
//           padding: 20px;
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }
        
//         .card-icon {
//           font-size: 24px;
//           align-self: flex-start;
//         }
        
//         .card h3 {
//           margin: 0;
//           color: #f1f5f9;
//           font-size: 16px;
//           font-weight: 600;
//         }
        
//         .card-value {
//           font-size: 24px;
//           font-weight: 700;
//           color: #f1f5f9;
//           margin: 0;
//         }
        
//         .charts-section {
//           display: flex;
//           gap: 24px;
//           margin-bottom: 24px;
//           flex-wrap: wrap;
//         }
        
//         .chart-box {
//           flex: 1;
//           min-width: 300px;
//           background: #0f172a;
//           border: 1px solid #334155;
//           border-radius: 12px;
//           padding: 20px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DashboardPage;




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardSummary } from "../../../redux/slices/adminDashboardSummarySlice";
import { fetchEmployees } from "../../../redux/slices/adminEmployeesSlice";
import { 
  fetchEmployeePerformance, 
  clearPerformance,
  setRange 
} from "../../../redux/slices/employeePerformanceSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  
  const [time, setTime] = useState(new Date());
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  
  const authState = useSelector(state => state.auth);
  const currentUser = authState?.user || null;
  
  const summaryState = useSelector(state => state.adminDashboardSummary);
  const { 
    loading: summaryLoading, 
    error: summaryError, 
    summary: dashboardSummary 
  } = summaryState || {};
  
  const employeesState = useSelector(state => state.adminEmployees);
  const { 
    employees = [], 
    loading: employeesLoading,
    error: employeesError
  } = employeesState || {};
  
  const performanceState = useSelector(state => state.employeePerformance);
  const { 
    loading: perfLoading, 
    employee: perfEmployee, 
    performance, 
    range = 'day',
    error: perfError 
  } = performanceState || {};
  
  useEffect(() => {
    dispatch(fetchDashboardSummary());
    dispatch(fetchEmployees());
  }, [dispatch]);
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  const handleEmployeeClick = (employeeId) => {
    if (!employeeId) return;
    dispatch(clearPerformance());
    setSelectedEmployeeId(employeeId);
    setShowPerformanceModal(true);
    dispatch(fetchEmployeePerformance({ 
      employeeId, 
      range: 'day' 
    }));
  };
  
  const handleRangeChange = (newRange) => {
    dispatch(setRange(newRange));
    if (selectedEmployeeId) {
      dispatch(fetchEmployeePerformance({ 
        employeeId: selectedEmployeeId, 
        range: newRange 
      }));
    }
  };
  
  const closeModal = () => {
    setShowPerformanceModal(false);
    setSelectedEmployeeId(null);
    dispatch(clearPerformance());
  };
  
  if (employeesLoading || summaryLoading) {
    return (
      <div className="page-content">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
        <style>{`
          .page-content {
            padding: 24px;
            min-height: 100vh;
            background: #0f172a;
          }
          .loading-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 400px;
            color: #94a3b8;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #334155;
            border-top-color: #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  
  if (employeesError || summaryError) {
    return (
      <div className="page-content">
        <div className="error-state">
          <p>❌ {employeesError || summaryError}</p>
          <button 
            className="retry-btn"
            onClick={() => {
              dispatch(fetchDashboardSummary());
              dispatch(fetchEmployees());
            }}
          >
            Retry
          </button>
        </div>
        <style>{`
          .page-content {
            padding: 24px;
            min-height: 100vh;
            background: #0f172a;
          }
          .error-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 400px;
            color: #ef4444;
            text-align: center;
          }
          .retry-btn {
            margin-top: 16px;
            padding: 8px 20px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2 className="page-title">📊 Dashboard Overview</h2>
          <p className="page-subtitle">Welcome back! Today is {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="current-time">
          <span className="time-icon">🕐</span>
          <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      
      <div className="summary-cards">
        <div className="card">
          <div className="card-icon">👥</div>
          <h3>Total Employees</h3>
          <p className="card-value">
            {/* {dashboardSummary?.totalEmployees || 0} */}
            {employees?.length || 0}
            </p>
        </div>
        
        <div className="card">
          <div className="card-icon">✅</div>
          <h3>Active Today</h3>
          <p className="card-value">{dashboardSummary?.activeEmployees || 0}</p>
        </div>
        
        <div className="card">
          <div className="card-icon">❌</div>
          <h3>Absent Today</h3>
          <p className="card-value">{dashboardSummary?.absentEmployees || 0}</p>
        </div>
        
        <div className="card">
          <div className="card-icon">⏱️</div>
          <h3>Avg Hours Today</h3>
          <p className="card-value">{dashboardSummary?.avgHoursToday || 0}h</p>
        </div>
      </div>
      
      <div className="employees-section">
        <div className="section-header">
          <h3>👥 All Employees</h3>
          <div className="total-count">{employees.length} employees</div>
        </div>
        
        {employees.length === 0 ? (
          <div className="empty-state">
            <p>No employees found</p>
          </div>
        ) : (
          <div className="employees-grid">
            {employees.map(emp => (
              <div 
                key={emp._id} 
                className="employee-card clickable"
                onClick={() => handleEmployeeClick(emp._id)}
              >
                <div className="employee-avatar">
                  {emp.name?.[0]?.toUpperCase() || 'E'}
                </div>
                <div className="employee-details">
                  <h4 className="employee-name">{emp.name || 'Unknown'}</h4>
                  <p className="employee-role">{emp.role || 'No role'}</p>
                  <p className="employee-department">{emp.department || 'No department'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showPerformanceModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>📊 Employee Performance</h2>
                {perfEmployee && (
                  <p className="modal-subtitle">{perfEmployee.name} • {perfEmployee.email}</p>
                )}
              </div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            
            <div className="range-selector">
              <button 
                className={`range-btn ${range === 'day' ? 'active' : ''}`}
                onClick={() => handleRangeChange('day')}
              >
                Daily
              </button>
              <button 
                className={`range-btn ${range === 'week' ? 'active' : ''}`}
                onClick={() => handleRangeChange('week')}
              >
                Weekly
              </button>
              <button 
                className={`range-btn ${range === 'month' ? 'active' : ''}`}
                onClick={() => handleRangeChange('month')}
              >
                Monthly
              </button>
              <button 
                className={`range-btn ${range === 'year' ? 'active' : ''}`}
                onClick={() => handleRangeChange('year')}
              >
                Yearly
              </button>
            </div>
            
            {perfLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading performance data...</p>
              </div>
            ) : perfError ? (
              <div className="error-state">
                <p>❌ {perfError}</p>
              </div>
            ) : performance ? (
              <div className="performance-content">
                <div className="perf-summary">
                  <div className="perf-card">
                    <div className="perf-icon">⏱️</div>
                    <div>
                      <div className="perf-label">Total Hours</div>
                      <div className="perf-value">{performance.totalHours || 0}h</div>
                    </div>
                  </div>
                  <div className="perf-card">
                    <div className="perf-icon">📅</div>
                    <div>
                      <div className="perf-label">Active Days</div>
                      <div className="perf-value">{performance.activeDays || 0}</div>
                    </div>
                  </div>
                  <div className="perf-card">
                    <div className="perf-icon">📈</div>
                    <div>
                      <div className="perf-label">Avg Hours/Day</div>
                      <div className="perf-value">{performance.avgHoursPerDay || 0}h</div>
                    </div>
                  </div>
                  <div className="perf-card">
                    <div className="perf-icon">🎯</div>
                    <div>
                      <div className="perf-label">Target Achievement</div>
                      <div className="perf-value">{performance.targetAchievement || 0}%</div>
                    </div>
                  </div>
                </div>
                
                {performance.data && (
                  <div className="performance-data">
                    <h3>Performance Data</h3>
                    <pre className="data-raw">
                      {JSON.stringify(performance.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <p>No performance data available</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        .page-content {
          padding: 24px;
          min-height: 100vh;
          background: #0f172a;
          color: #f1f5f9;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .page-title {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #f1f5f9;
        }
        
        .page-subtitle {
          margin: 8px 0 0 0;
          color: #94a3b8;
          font-size: 14px;
        }
        
        .current-time {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(59, 130, 246, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          color: #3b82f6;
        }
        
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .card-icon {
          font-size: 28px;
        }
        
        .card h3 {
          margin: 0;
          color: #94a3b8;
          font-size: 16px;
          font-weight: 500;
        }
        
        .card-value {
          font-size: 32px;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0;
        }
        
        .employees-section {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 40px;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .section-header h3 {
          margin: 0;
          font-size: 20px;
          color: #f1f5f9;
        }
        
        .total-count {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .employees-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        
        .employee-card {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s ease;
        }
        
        .employee-card.clickable {
          cursor: pointer;
        }
        
        .employee-card.clickable:hover {
          transform: translateY(-4px);
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .employee-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .employee-name {
          margin: 0 0 8px 0;
          font-size: 18px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .employee-role {
          margin: 0 0 4px 0;
          color: #94a3b8;
          font-size: 14px;
        }
        
        .employee-department {
          margin: 0 0 12px 0;
          color: #64748b;
          font-size: 13px;
        }
        
        .empty-state {
          padding: 40px;
          text-align: center;
          color: #64748b;
          background: #0f172a;
          border-radius: 12px;
          border: 1px solid #334155;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          background: #1e293b;
          border-radius: 16px;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px;
          border-bottom: 1px solid #334155;
        }
        
        .modal-header h2 {
          margin: 0;
          color: #f1f5f9;
          font-size: 24px;
        }
        
        .modal-subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin: 4px 0 0 0;
        }
        
        .modal-close {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 24px;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s;
        }
        
        .modal-close:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .range-selector {
          display: flex;
          gap: 8px;
          padding: 16px 24px;
          background: #0f172a;
        }
        
        .range-btn {
          flex: 1;
          padding: 10px 20px;
          border: 1px solid #334155;
          background: transparent;
          color: #94a3b8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 500;
        }
        
        .range-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
          color: #3b82f6;
        }
        
        .range-btn.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }
        
        .performance-content {
          padding: 24px;
        }
        
        .perf-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        
        .perf-card {
          background: #0f172a;
          padding: 20px;
          border-radius: 12px;
          display: flex;
          gap: 16px;
          align-items: center;
          border: 1px solid #334155;
        }
        
        .perf-icon {
          font-size: 32px;
        }
        
        .perf-label {
          color: #94a3b8;
          font-size: 13px;
          margin-bottom: 4px;
        }
        
        .perf-value {
          color: #f1f5f9;
          font-size: 24px;
          font-weight: 700;
        }
        
        .performance-data {
          margin-top: 24px;
        }
        
        .performance-data h3 {
          color: #f1f5f9;
          margin-bottom: 16px;
        }
        
        .data-raw {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 16px;
          color: #94a3b8;
          font-size: 13px;
          overflow-x: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        @media (max-width: 768px) {
          .summary-cards {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .employees-grid {
            grid-template-columns: 1fr;
          }
          
          .range-selector {
            flex-wrap: wrap;
          }
          
          .range-btn {
            flex: 0 0 calc(50% - 4px);
          }
          
          .perf-summary {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .summary-cards {
            grid-template-columns: 1fr;
          }
          
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;