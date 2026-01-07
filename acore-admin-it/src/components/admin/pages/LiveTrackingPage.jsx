// import React, { useState, useEffect } from 'react';

// const LiveTrackingPage = ({ trackingData }) => {
//   const [time, setTime] = useState(new Date());
//   const [autoRefresh, setAutoRefresh] = useState(true);
//   const [filterStatus, setFilterStatus] = useState('All');

//   // Update time every second for live feel
//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Auto-refresh tracking data
//   useEffect(() => {
//     if (!autoRefresh) return;
    
//     const refreshTimer = setInterval(() => {
//       // Simulate data refresh
//       console.log('Refreshing tracking data...');
//     }, 30000); // Refresh every 30 seconds
    
//     return () => clearInterval(refreshTimer);
//   }, [autoRefresh]);

//   const filteredData = trackingData.filter(track => {
//     if (filterStatus === 'All') return true;
//     return track.status === filterStatus;
//   });

//   // Statistics
//   const totalTracked = trackingData.length;
//   const productiveCount = trackingData.filter(t => t.status === 'Productive').length;
//   const meetingCount = trackingData.filter(t => t.status === 'Meeting').length;
//   const breakCount = trackingData.filter(t => t.status === 'Break').length;

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'Productive': return '✅';
//       case 'Meeting': return '📅';
//       case 'Break': return '☕';
//       default: return '⏸️';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'Productive': return '#10b981';
//       case 'Meeting': return '#3b82f6';
//       case 'Break': return '#f59e0b';
//       default: return '#94a3b8';
//     }
//   };

//   const getAppIcon = (appName) => {
//     if (appName.includes('VS Code')) return '💻';
//     if (appName.includes('Figma')) return '🎨';
//     if (appName.includes('Zoom')) return '📹';
//     if (appName.includes('Chrome')) return '🌐';
//     if (appName.includes('Postman')) return '📡';
//     return '🖥️';
//   };

//   return (
//     <div className="page-content">
//       <div className="page-header">
//         <div>
//           <h2 className="page-title">📡 Live Tracking</h2>
//           <p className="page-subtitle">
//             Real-time monitoring • Last updated: {time.toLocaleTimeString()}
//           </p>
//         </div>
//         <div className="tracking-controls">
//           <div className="auto-refresh-toggle">
//             <span className="toggle-label">Auto Refresh</span>
//             <label className="switch">
//               <input 
//                 type="checkbox" 
//                 checked={autoRefresh}
//                 onChange={(e) => setAutoRefresh(e.target.checked)}
//               />
//               <span className="slider"></span>
//             </label>
//           </div>
//           <button className="btn-refresh" onClick={() => console.log('Manual refresh')}>
//             🔄 Refresh Now
//           </button>
//         </div>
//       </div>

//       {/* Info Banner */}
//       <div className="info-banner">
//         <span>🔌</span>
//         <div>
//           <strong>Electron IPC Integration Ready</strong>
//           <p>This module receives real-time data from desktop tracking agents</p>
//         </div>
//       </div>

//       {/* Statistics Cards */}
//       <div className="summary-cards">
//         <div className="card">
//           <div className="card-icon">👁️</div>
//           <h3>Currently Tracked</h3>
//           <p className="card-value">{totalTracked}</p>
//           <p className="card-trend">Active sessions</p>
//         </div>
//         <div className="card">
//           <div className="card-icon">✅</div>
//           <h3>Productive</h3>
//           <p className="card-value">{productiveCount}</p>
//           <p className="card-trend">Working efficiently</p>
//         </div>
//         <div className="card card-info">
//           <div className="card-icon">📅</div>
//           <h3>In Meetings</h3>
//           <p className="card-value">{meetingCount}</p>
//           <p className="card-trend">Scheduled meetings</p>
//         </div>
//         <div className="card card-warning">
//           <div className="card-icon">☕</div>
//           <h3>On Break</h3>
//           <p className="card-value">{breakCount}</p>
//           <p className="card-trend">Taking breaks</p>
//         </div>
//       </div>

//       {/* Activity Distribution Chart */}
//       <div className="charts-section">
//         <div className="chart-box">
//           <h3>📊 Activity Distribution</h3>
//           <div className="activity-distribution">
//             <div className="distribution-chart">
//               <div className="chart-circle" style={{
//                 background: `conic-gradient(
//                   #10b981 0% ${(productiveCount / totalTracked) * 100}%,
//                   #3b82f6 ${(productiveCount / totalTracked) * 100}% ${((productiveCount + meetingCount) / totalTracked) * 100}%,
//                   #f59e0b ${((productiveCount + meetingCount) / totalTracked) * 100}% 100%
//                 )`
//               }}>
//                 <div className="chart-center">
//                   <span className="chart-total">{totalTracked}</span>
//                   <span className="chart-label">Active</span>
//                 </div>
//               </div>
//               <div className="chart-legend">
//                 <div className="legend-item">
//                   <span className="legend-dot" style={{ background: '#10b981' }}></span>
//                   <span>Productive ({productiveCount})</span>
//                 </div>
//                 <div className="legend-item">
//                   <span className="legend-dot" style={{ background: '#3b82f6' }}></span>
//                   <span>Meetings ({meetingCount})</span>
//                 </div>
//                 <div className="legend-item">
//                   <span className="legend-dot" style={{ background: '#f59e0b' }}></span>
//                   <span>Break ({breakCount})</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="chart-box">
//           <h3>⏰ Peak Activity Times</h3>
//           <div className="peak-activity">
//             <div className="time-slots">
//               {[
//                 { time: '9-10 AM', activity: 85, color: '#10b981' },
//                 { time: '10-11 AM', activity: 92, color: '#10b981' },
//                 { time: '11-12 PM', activity: 78, color: '#3b82f6' },
//                 { time: '12-1 PM', activity: 45, color: '#f59e0b' },
//                 { time: '1-2 PM', activity: 88, color: '#10b981' },
//                 { time: '2-3 PM', activity: 95, color: '#10b981' },
//                 { time: '3-4 PM', activity: 82, color: '#10b981' },
//                 { time: '4-5 PM', activity: 76, color: '#3b82f6' },
//               ].map((slot, index) => (
//                 <div key={index} className="time-slot">
//                   <div className="slot-time">{slot.time}</div>
//                   <div className="slot-bar-container">
//                     <div 
//                       className="slot-bar" 
//                       style={{
//                         width: `${slot.activity}%`,
//                         background: slot.color
//                       }}
//                       title={`${slot.activity}% activity`}
//                     ></div>
//                   </div>
//                   <div className="slot-value">{slot.activity}%</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filters-row">
//         <div className="search-container">
//           <input 
//             type="text" 
//             className="search-input" 
//             placeholder="🔍 Search by name or application..."
//           />
//         </div>
//         <div className="filter-group">
//           <select 
//             className="filter-select" 
//             value={filterStatus} 
//             onChange={(e) => setFilterStatus(e.target.value)}
//           >
//             <option value="All">All Activities</option>
//             <option value="Productive">Productive</option>
//             <option value="Meeting">Meetings</option>
//             <option value="Break">Break</option>
//           </select>
//           <button className="btn-icon" title="View Screenshots">
//             📸 View Screenshots
//           </button>
//           <button className="btn-icon" title="Export Data">
//             📥 Export
//           </button>
//         </div>
//       </div>

//       {/* Live Tracking Grid */}
//       <div className="tracking-grid">
//         {filteredData.map((track, index) => (
//           <div key={index} className="tracking-card">
//             <div className="tracking-header">
//               <div className="employee-info">
//                 <div className="employee-avatar" style={{ background: getStatusColor(track.status) }}>
//                   {track.name[0]}
//                 </div>
//                 <div>
//                   <strong>{track.name}</strong>
//                   <p>{track.empId}</p>
//                 </div>
//               </div>
//               <span 
//                 className="status-badge" 
//                 style={{ 
//                   background: `${getStatusColor(track.status)}20`,
//                   color: getStatusColor(track.status)
//                 }}
//               >
//                 {getStatusIcon(track.status)} {track.status}
//               </span>
//             </div>
            
//             <div className="tracking-body">
//               <div className="tracking-info">
//                 <span className="info-label">🎯 Current Activity:</span>
//                 <strong className="info-value">{track.currentActivity}</strong>
//               </div>
//               <div className="tracking-info">
//                 <span className="info-label">💻 Application:</span>
//                 <div className="app-info">
//                   <span className="app-icon">{getAppIcon(track.appName)}</span>
//                   <strong className="info-value">{track.appName}</strong>
//                 </div>
//               </div>
//               <div className="tracking-info">
//                 <span className="info-label">⏱️ Duration:</span>
//                 <strong className="info-value time-duration">{track.duration}</strong>
//               </div>
//               <div className="tracking-info">
//                 <span className="info-label">📸 Screenshot:</span>
//                 <span className={`screenshot-status ${track.screenshot === '✅' ? 'available' : 'warning'}`}>
//                   {track.screenshot} {track.screenshot === '✅' ? 'Available' : 'Manual Review'}
//                 </span>
//               </div>
//             </div>

//             <div className="tracking-footer">
//               <div className="time-indicator">
//                 <span className="time-icon">🕐</span>
//                 <span className="time-text">Active for {track.duration}</span>
//               </div>
//               <div className="action-buttons">
//                 <button className="btn-icon-small" title="View Details">
//                   👁️
//                 </button>
//                 <button className="btn-icon-small" title="Take Screenshot">
//                   📷
//                 </button>
//                 <button className="btn-icon-small" title="Send Message">
//                   💬
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Live Updates Panel */}
//       <div className="live-updates">
//         <h3>🔄 Live Updates</h3>
//         <div className="updates-list">
//           <div className="update-item new">
//             <span className="update-icon">🆕</span>
//             <div className="update-content">
//               <strong>Rahul Verma</strong> started working on "User Authentication Module"
//               <span className="update-time">2 mins ago</span>
//             </div>
//           </div>
//           <div className="update-item">
//             <span className="update-icon">📊</span>
//             <div className="update-content">
//               <strong>Anjali Singh</strong> opened Figma for design work
//               <span className="update-time">5 mins ago</span>
//             </div>
//           </div>
//           <div className="update-item">
//             <span className="update-icon">📅</span>
//             <div className="update-content">
//               <strong>Sneha Reddy</strong> joined team meeting on Zoom
//               <span className="update-time">10 mins ago</span>
//             </div>
//           </div>
//           <div className="update-item">
//             <span className="update-icon">☕</span>
//             <div className="update-content">
//               <strong>Arjun Mehta</strong> is taking a break
//               <span className="update-time">12 mins ago</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .page-subtitle {
//           color: #94a3b8;
//           font-size: 14px;
//           margin-top: 4px;
//         }
        
//         .tracking-controls {
//           display: flex;
//           align-items: center;
//           gap: 20px;
//         }
        
//         .auto-refresh-toggle {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
        
//         .toggle-label {
//           font-size: 14px;
//           color: #94a3b8;
//         }
        
//         .switch {
//           position: relative;
//           display: inline-block;
//           width: 50px;
//           height: 24px;
//         }
        
//         .switch input {
//           opacity: 0;
//           width: 0;
//           height: 0;
//         }
        
//         .slider {
//           position: absolute;
//           cursor: pointer;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: #334155;
//           transition: .4s;
//           border-radius: 24px;
//         }
        
//         .slider:before {
//           position: absolute;
//           content: "";
//           height: 16px;
//           width: 16px;
//           left: 4px;
//           bottom: 4px;
//           background-color: white;
//           transition: .4s;
//           border-radius: 50%;
//         }
        
//         input:checked + .slider {
//           background-color: #10b981;
//         }
        
//         input:checked + .slider:before {
//           transform: translateX(26px);
//         }
        
//         .btn-refresh {
//           background: rgba(59, 130, 246, 0.1);
//           color: #3b82f6;
//           border: 1px solid rgba(59, 130, 246, 0.3);
//           padding: 8px 16px;
//           border-radius: 6px;
//           cursor: pointer;
//           font-size: 14px;
//           transition: all 0.2s;
//         }
        
//         .btn-refresh:hover {
//           background: rgba(59, 130, 246, 0.2);
//         }
        
//         .card-trend {
//           font-size: 12px;
//           color: #94a3b8;
//           margin-top: 4px;
//         }
        
//         .activity-distribution {
//           display: flex;
//           justify-content: center;
//           margin-top: 20px;
//         }
        
//         .distribution-chart {
//           display: flex;
//           align-items: center;
//           gap: 40px;
//         }
        
//         .chart-circle {
//           width: 150px;
//           height: 150px;
//           border-radius: 50%;
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .chart-center {
//           width: 100px;
//           height: 100px;
//           background: #1e293b;
//           border-radius: 50%;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .chart-total {
//           font-size: 28px;
//           font-weight: 700;
//           color: #f1f5f9;
//         }
        
//         .chart-label {
//           font-size: 12px;
//           color: #94a3b8;
//         }
        
//         .chart-legend {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }
        
//         .legend-item {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 14px;
//           color: #94a3b8;
//         }
        
//         .legend-dot {
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//         }
        
//         .peak-activity {
//           margin-top: 20px;
//         }
        
//         .time-slots {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }
        
//         .time-slot {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }
        
//         .slot-time {
//           width: 60px;
//           font-size: 12px;
//           color: #94a3b8;
//         }
        
//         .slot-bar-container {
//           flex: 1;
//           height: 20px;
//           background: #334155;
//           border-radius: 10px;
//           overflow: hidden;
//         }
        
//         .slot-bar {
//           height: 100%;
//           border-radius: 10px;
//           transition: width 0.3s ease;
//         }
        
//         .slot-value {
//           width: 40px;
//           text-align: right;
//           font-size: 12px;
//           font-weight: 600;
//           color: #f1f5f9;
//         }
        
//         .employee-avatar {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 600;
//           color: white;
//           flex-shrink: 0;
//         }
        
//         .employee-info {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }
        
//         .app-info {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
        
//         .app-icon {
//           font-size: 18px;
//         }
        
//         .info-label {
//           color: #94a3b8;
//           font-size: 13px;
//           min-width: 120px;
//         }
        
//         .info-value {
//           color: #f1f5f9;
//           font-size: 14px;
//         }
        
//         .time-duration {
//           color: #3b82f6;
//           font-weight: 600;
//         }
        
//         .screenshot-status {
//           font-size: 13px;
//           font-weight: 500;
//           padding: 2px 8px;
//           border-radius: 12px;
//         }
        
//         .screenshot-status.available {
//           background: rgba(16, 185, 129, 0.2);
//           color: #10b981;
//         }
        
//         .screenshot-status.warning {
//           background: rgba(245, 158, 11, 0.2);
//           color: #f59e0b;
//         }
        
//         .tracking-footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-top: 16px;
//           padding-top: 12px;
//           border-top: 1px solid #334155;
//         }
        
//         .time-indicator {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           font-size: 13px;
//           color: #94a3b8;
//         }
        
//         .time-icon {
//           font-size: 14px;
//         }
        
//         .action-buttons {
//           display: flex;
//           gap: 8px;
//         }
        
//         .btn-icon-small {
//           background: transparent;
//           border: none;
//           cursor: pointer;
//           font-size: 16px;
//           padding: 4px;
//           opacity: 0.7;
//           transition: opacity 0.2s;
//           color: #94a3b8;
//         }
        
//         .btn-icon-small:hover {
//           opacity: 1;
//           color: #f1f5f9;
//         }
        
//         .live-updates {
//           background: #1e293b;
//           padding: 20px;
//           border-radius: 8px;
//           border: 1px solid #334155;
//           margin-top: 24px;
//         }
        
//         .updates-list {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//           margin-top: 16px;
//         }
        
//         .update-item {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//           padding: 12px;
//           background: #334155;
//           border-radius: 6px;
//           border-left: 3px solid #3b82f6;
//         }
        
//         .update-item.new {
//           border-left-color: #10b981;
//           background: rgba(16, 185, 129, 0.1);
//         }
        
//         .update-icon {
//           font-size: 18px;
//           flex-shrink: 0;
//         }
        
//         .update-content {
//           flex: 1;
//           font-size: 14px;
//           color: #f1f5f9;
//         }
        
//         .update-content strong {
//           color: #3b82f6;
//         }
        
//         .update-time {
//           display: block;
//           font-size: 12px;
//           color: #94a3b8;
//           margin-top: 4px;
//         }
        
//         @media (max-width: 768px) {
//           .tracking-controls {
//             flex-direction: column;
//             align-items: stretch;
//             gap: 12px;
//           }
          
//           .distribution-chart {
//             flex-direction: column;
//             gap: 20px;
//           }
          
//           .tracking-card {
//             padding: 12px;
//           }
          
//           .tracking-info {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 4px;
//           }
          
//           .info-label {
//             min-width: auto;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LiveTrackingPage;



// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// const LiveTrackingPage = () => {
//   // ================= STATE MANAGEMENT =================
//   const [time, setTime] = useState(new Date());
//   const [autoRefresh, setAutoRefresh] = useState(true);
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [showUpdates, setShowUpdates] = useState(true);
//   const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  
//   // ================= MOCK DATA (Replace with Redux/API) =================
//   const employees = [
//     {
//       id: 'EMP001',
//       name: 'Rahul Sharma',
//       empId: 'EMP001',
//       department: 'Engineering',
//       role: 'Frontend Developer',
//       status: 'ACTIVE',
//       workSeconds: 14400, // 4 hours
//       idleSeconds: 1800, // 30 minutes
//       punchInTime: '2024-01-03T09:00:00.000Z',
//       currentActivity: 'Working on Dashboard UI',
//       appName: 'VS Code',
//       lastActive: '2 mins ago',
//       productivity: 85,
//       meetingSeconds: 1800,
//       breakSeconds: 900,
//       email: 'rahul@company.com',
//       phone: '+91 9876543210'
//     },
//     {
//       id: 'EMP002',
//       name: 'Priya Patel',
//       empId: 'EMP002',
//       department: 'Design',
//       role: 'UI/UX Designer',
//       status: 'MEETING',
//       workSeconds: 10800, // 3 hours
//       idleSeconds: 1200, // 20 minutes
//       punchInTime: '2024-01-03T09:30:00.000Z',
//       currentActivity: 'Client Presentation',
//       appName: 'Zoom',
//       lastActive: '5 mins ago',
//       productivity: 78,
//       meetingSeconds: 3600,
//       breakSeconds: 600
//     },
//     {
//       id: 'EMP003',
//       name: 'Amit Kumar',
//       empId: 'EMP003',
//       department: 'Engineering',
//       role: 'Backend Developer',
//       status: 'ACTIVE',
//       workSeconds: 18000, // 5 hours
//       idleSeconds: 900, // 15 minutes
//       punchInTime: '2024-01-03T08:45:00.000Z',
//       currentActivity: 'API Development',
//       appName: 'Postman',
//       lastActive: 'Just now',
//       productivity: 92,
//       meetingSeconds: 900,
//       breakSeconds: 1200
//     },
//     {
//       id: 'EMP004',
//       name: 'Neha Singh',
//       empId: 'EMP004',
//       department: 'HR',
//       role: 'HR Manager',
//       status: 'BREAK',
//       workSeconds: 12600, // 3.5 hours
//       idleSeconds: 2400, // 40 minutes
//       punchInTime: '2024-01-03T09:15:00.000Z',
//       currentActivity: 'Lunch Break',
//       appName: '',
//       lastActive: '15 mins ago',
//       productivity: 65,
//       meetingSeconds: 2400,
//       breakSeconds: 1800
//     },
//     {
//       id: 'EMP005',
//       name: 'Sanjay Verma',
//       empId: 'EMP005',
//       department: 'Sales',
//       role: 'Sales Executive',
//       status: 'IDLE',
//       workSeconds: 9000, // 2.5 hours
//       idleSeconds: 3600, // 1 hour
//       punchInTime: '2024-01-03T10:00:00.000Z',
//       currentActivity: 'Checking Emails',
//       appName: 'Gmail',
//       lastActive: '8 mins ago',
//       productivity: 45,
//       meetingSeconds: 1800,
//       breakSeconds: 900
//     },
//     {
//       id: 'EMP006',
//       name: 'Anjali Reddy',
//       empId: 'EMP006',
//       department: 'Engineering',
//       role: 'Full Stack Developer',
//       status: 'ACTIVE',
//       workSeconds: 16200, // 4.5 hours
//       idleSeconds: 1200, // 20 minutes
//       punchInTime: '2024-01-03T08:30:00.000Z',
//       currentActivity: 'Bug Fixing',
//       appName: 'VS Code',
//       lastActive: '1 min ago',
//       productivity: 88,
//       meetingSeconds: 0,
//       breakSeconds: 600
//     }
//   ];

//   const activityHistory = [
//     { time: '09:00 AM', app: 'VS Code', activity: 'Started working on login page', duration: 1800 },
//     { time: '09:30 AM', app: 'Slack', activity: 'Team standup meeting', duration: 900 },
//     { time: '10:00 AM', app: 'VS Code', activity: 'Fixed authentication bug', duration: 2700 },
//     { time: '10:45 AM', app: 'Zoom', activity: 'Client demo meeting', duration: 1800 },
//     { time: '11:15 AM', app: 'VS Code', activity: 'Code review', duration: 2100 },
//     { time: '12:00 PM', app: 'Chrome', activity: 'Research and documentation', duration: 1800 }
//   ];

//   // ================= USE EFFECTS =================
  
//   // Update time every second
//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Auto-refresh tracking data
//   useEffect(() => {
//     if (!autoRefresh) return;
    
//     const refreshTimer = setInterval(() => {
//       console.log('Auto-refreshing tracking data...');
//       // Add your refresh logic here
//     }, 30000); // Refresh every 30 seconds
    
//     return () => clearInterval(refreshTimer);
//   }, [autoRefresh]);

//   // Initialize real-time updates
//   useEffect(() => {
//     const mockUpdates = [
//       { id: 1, type: 'punch_in', employeeName: 'Rahul Sharma', message: 'punched in', timestamp: new Date(Date.now() - 120000).toISOString() },
//       { id: 2, type: 'status_change', employeeName: 'Priya Patel', message: 'joined a meeting', timestamp: new Date(Date.now() - 300000).toISOString() },
//       { id: 3, type: 'activity', employeeName: 'Amit Kumar', message: 'started working on API', timestamp: new Date(Date.now() - 180000).toISOString() },
//       { id: 4, type: 'break', employeeName: 'Neha Singh', message: 'went on break', timestamp: new Date(Date.now() - 720000).toISOString() },
//       { id: 5, type: 'app_change', employeeName: 'Sanjay Verma', message: 'switched to email', timestamp: new Date(Date.now() - 480000).toISOString() }
//     ];
//     setRealTimeUpdates(mockUpdates);
//   }, []);

//   // ================= HELPER FUNCTIONS =================
  
//   const filteredEmployees = employees.filter(employee => {
//     const matchesSearch = 
//       searchQuery === '' ||
//       employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (employee.currentActivity && employee.currentActivity.toLowerCase().includes(searchQuery.toLowerCase()));
    
//     const matchesStatus = 
//       filterStatus === 'All' || 
//       employee.status === filterStatus;
    
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'ACTIVE': return '✅';
//       case 'IDLE': return '😴';
//       case 'MEETING': return '📅';
//       case 'BREAK': return '☕';
//       case 'OFFLINE': return '🔴';
//       default: return '⏸️';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'ACTIVE': return '#10b981';
//       case 'IDLE': return '#f59e0b';
//       case 'MEETING': return '#3b82f6';
//       case 'BREAK': return '#ef4444';
//       case 'OFFLINE': return '#94a3b8';
//       default: return '#94a3b8';
//     }
//   };

//   const getAppIcon = (appName) => {
//     if (!appName) return '🖥️';
//     const app = appName.toLowerCase();
//     if (app.includes('chrome') || app.includes('browser')) return '🌐';
//     if (app.includes('vscode') || app.includes('code')) return '💻';
//     if (app.includes('figma')) return '🎨';
//     if (app.includes('zoom') || app.includes('meet')) return '📹';
//     if (app.includes('outlook') || app.includes('gmail')) return '📧';
//     if (app.includes('slack') || app.includes('teams')) return '💬';
//     if (app.includes('postman')) return '📡';
//     if (app.includes('excel') || app.includes('sheet')) return '📊';
//     if (app.includes('word') || app.includes('docs')) return '📝';
//     return '🖥️';
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds || seconds === 0) return '0m';
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
    
//     if (hours > 0) {
//       return `${hours}h ${minutes}m`;
//     }
//     return `${minutes}m`;
//   };

//   const calculateProductivity = (employee) => {
//     const workSeconds = employee.workSeconds || 0;
//     const idleSeconds = employee.idleSeconds || 0;
//     const total = workSeconds + idleSeconds;
    
//     if (total === 0) return 0;
//     return Math.round((workSeconds / total) * 100);
//   };

//   const getUpdateIcon = (type) => {
//     switch(type) {
//       case 'punch_in': return '👤';
//       case 'punch_out': return '🚪';
//       case 'status_change': return '🔄';
//       case 'app_change': return '💻';
//       case 'activity': return '🎯';
//       case 'meeting': return '📅';
//       case 'break': return '☕';
//       default: return '📢';
//     }
//   };

//   const getUpdateColor = (type) => {
//     switch(type) {
//       case 'punch_in': return '#10b981';
//       case 'punch_out': return '#ef4444';
//       case 'status_change': return '#3b82f6';
//       case 'app_change': return '#8b5cf6';
//       case 'activity': return '#f59e0b';
//       default: return '#94a3b8';
//     }
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return 'Just now';
//     const now = new Date();
//     const updateTime = new Date(timestamp);
//     const diffMs = now - updateTime;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     return `${Math.floor(diffHours / 24)}d ago`;
//   };

//   const statusStats = {
//     total: employees.length,
//     working: employees.filter(e => e.status === 'ACTIVE').length,
//     idle: employees.filter(e => e.status === 'IDLE').length,
//     meeting: employees.filter(e => e.status === 'MEETING').length,
//     break: employees.filter(e => e.status === 'BREAK').length,
//     offline: employees.filter(e => e.status === 'OFFLINE').length,
//   };

//   const activityData = [
//     { time: '9 AM', activity: 85 },
//     { time: '10 AM', activity: 92 },
//     { time: '11 AM', activity: 78 },
//     { time: '12 PM', activity: 45 },
//     { time: '1 PM', activity: 88 },
//     { time: '2 PM', activity: 95 },
//     { time: '3 PM', activity: 82 },
//     { time: '4 PM', activity: 76 },
//     { time: '5 PM', activity: 65 },
//   ];

//   const statusData = [
//     { name: 'Working', value: statusStats.working, color: '#10b981' },
//     { name: 'Idle', value: statusStats.idle, color: '#f59e0b' },
//     { name: 'Meeting', value: statusStats.meeting, color: '#3b82f6' },
//     { name: 'Break', value: statusStats.break, color: '#ef4444' },
//     { name: 'Offline', value: statusStats.offline, color: '#94a3b8' },
//   ];

//   // ================= RENDER FUNCTIONS =================
  
//   const renderStatusDistributionChart = () => {
//     const total = statusData.reduce((sum, item) => sum + item.value, 0);
//     const percentages = statusData.map(item => ({
//       ...item,
//       percentage: total > 0 ? Math.round((item.value / total) * 100) : 0
//     }));

//     return (
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '30px',
//         flexWrap: 'wrap'
//       }}>
//         <div style={{
//           width: '150px',
//           height: '150px',
//           borderRadius: '50%',
//           background: `conic-gradient(${percentages.map((item, index) => 
//             `${item.color} ${index === 0 ? '0%' : percentages.slice(0, index).reduce((a, b) => a + b.percentage, 0) + '%'} ` +
//             `${percentages.slice(0, index + 1).reduce((a, b) => a + b.percentage, 0)}%`
//           ).join(', ')})`,
//           position: 'relative',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}>
//           <div style={{
//             width: '100px',
//             height: '100px',
//             background: '#1e293b',
//             borderRadius: '50%',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             <span style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>{total}</span>
//             <span style={{ fontSize: '12px', color: '#94a3b8' }}>Employees</span>
//           </div>
//         </div>
        
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '12px'
//         }}>
//           {percentages.map((item, index) => (
//             <div key={index} style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               fontSize: '14px',
//               color: '#94a3b8'
//             }}>
//               <div style={{
//                 width: '12px',
//                 height: '12px',
//                 borderRadius: '50%',
//                 background: item.color
//               }}></div>
//               <span>{item.name} ({item.value})</span>
//               <span style={{ marginLeft: 'auto', color: '#f1f5f9' }}>{item.percentage}%</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderActivityTimeline = () => {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '12px',
//         marginTop: '10px'
//       }}>
//         {activityData.map((slot, index) => (
//           <div key={index} style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px'
//           }}>
//             <div style={{
//               width: '60px',
//               fontSize: '12px',
//               color: '#94a3b8'
//             }}>{slot.time}</div>
//             <div style={{
//               flex: 1,
//               height: '20px',
//               background: '#334155',
//               borderRadius: '10px',
//               overflow: 'hidden'
//             }}>
//               <div style={{
//                 width: `${slot.activity}%`,
//                 height: '100%',
//                 background: slot.activity > 70 ? '#10b981' : slot.activity > 40 ? '#3b82f6' : '#f59e0b',
//                 borderRadius: '10px',
//                 transition: 'width 0.3s ease'
//               }}></div>
//             </div>
//             <div style={{
//               width: '40px',
//               textAlign: 'right',
//               fontSize: '12px',
//               fontWeight: '600',
//               color: '#f1f5f9'
//             }}>{slot.activity}%</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderEmployeeCard = (employee) => {
//     const productivity = calculateProductivity(employee);
    
//     return (
//       <div 
//         key={employee.id}
//         className="employee-card"
//         onClick={() => {
//           setSelectedEmployee(employee);
//           setShowDetailModal(true);
//         }}
//         style={{
//           background: '#0f172a',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155',
//           cursor: 'pointer',
//           transition: 'all 0.2s',
//           position: 'relative',
//           overflow: 'hidden'
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = 'translateY(-4px)';
//           e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
//           e.currentTarget.style.borderColor = '#3b82f6';
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = 'translateY(0)';
//           e.currentTarget.style.boxShadow = 'none';
//           e.currentTarget.style.borderColor = '#334155';
//         }}
//       >
//         {/* Top gradient bar */}
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)'
//         }}></div>

//         {/* Card Header */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'flex-start',
//           marginBottom: '20px',
//           gap: '12px'
//         }}>
//           <div style={{ position: 'relative' }}>
//             <div style={{
//               width: '60px',
//               height: '60px',
//               borderRadius: '50%',
//               background: getStatusColor(employee.status),
//               border: `3px solid ${getStatusColor(employee.status)}50`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '24px',
//               fontWeight: '600',
//               color: 'white'
//             }}>
//               {employee.name.charAt(0)}
//             </div>
//             <div style={{
//               position: 'absolute',
//               bottom: 0,
//               right: 0,
//               width: '14px',
//               height: '14px',
//               borderRadius: '50%',
//               background: getStatusColor(employee.status),
//               border: '2px solid #0f172a'
//             }}></div>
//           </div>
          
//           <div style={{ flex: 1 }}>
//             <h4 style={{
//               fontSize: '18px',
//               fontWeight: '600',
//               margin: '0 0 4px 0',
//               color: '#f1f5f9'
//             }}>{employee.name}</h4>
//             <p style={{
//               color: '#94a3b8',
//               fontSize: '12px',
//               margin: '0 0 8px 0'
//             }}>{employee.empId}</p>
//             <div>
//               <span style={{
//                 background: 'rgba(59, 130, 246, 0.2)',
//                 color: '#3b82f6',
//                 padding: '4px 8px',
//                 borderRadius: '12px',
//                 fontSize: '12px',
//                 fontWeight: '500'
//               }}>{employee.department || 'Engineering'}</span>
//             </div>
//           </div>
          
//           <div style={{
//             padding: '6px 12px',
//             borderRadius: '20px',
//             fontSize: '12px',
//             fontWeight: '500',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '4px',
//             whiteSpace: 'nowrap',
//             background: `${getStatusColor(employee.status)}20`,
//             color: getStatusColor(employee.status)
//           }}>
//             {getStatusIcon(employee.status)} {employee.status}
//           </div>
//         </div>
        
//         {/* Card Body */}
//         <div style={{ marginBottom: '20px' }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Current Activity:</span>
//             <span style={{ color: '#f1f5f9', fontWeight: '500', textAlign: 'right', flex: 1 }}>
//               {employee.currentActivity || 'No activity'}
//             </span>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Application:</span>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: '500' }}>
//               <span style={{ fontSize: '16px' }}>{getAppIcon(employee.appName)}</span>
//               <span>{employee.appName || 'Not available'}</span>
//             </div>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Active Time:</span>
//             <span style={{ color: '#10b981', fontWeight: '600' }}>
//               {formatDuration(employee.workSeconds)}
//             </span>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Idle Time:</span>
//             <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//               {formatDuration(employee.idleSeconds)}
//             </span>
//           </div>
          
//           <div style={{ marginTop: '16px' }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '8px',
//               fontSize: '14px'
//             }}>
//               <span style={{ color: '#94a3b8' }}>Productivity:</span>
//               <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>{productivity}%</span>
//             </div>
//             <div style={{
//               height: '8px',
//               borderRadius: '4px',
//               background: '#334155',
//               overflow: 'hidden',
//               position: 'relative'
//             }}>
//               <div style={{
//                 height: '100%',
//                 borderRadius: '4px',
//                 width: `${productivity}%`,
//                 background: productivity > 70 ? '#10b981' : 
//                          productivity > 40 ? '#f59e0b' : '#ef4444',
//                 transition: 'width 0.3s ease'
//               }}></div>
//             </div>
//           </div>
//         </div>
        
//         {/* Card Footer */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           paddingTop: '16px',
//           borderTop: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '4px'
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
//               <span style={{ color: '#94a3b8' }}>Punch In:</span>
//               <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//                 {employee.punchInTime ? 
//                   new Date(employee.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
//                   'Not punched'
//                 }
//               </span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
//               <span style={{ color: '#94a3b8' }}>Today:</span>
//               <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//                 {formatDuration(employee.workSeconds + employee.idleSeconds)}
//               </span>
//             </div>
//           </div>
          
//           <button 
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedEmployee(employee);
//               setShowDetailModal(true);
//             }}
//             style={{
//               background: 'transparent',
//               color: '#3b82f6',
//               border: '1px solid #3b82f6',
//               padding: '6px 12px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '12px',
//               fontWeight: '500',
//               transition: 'all 0.2s'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//             }}
//           >
//             View Details →
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderEmployeeDetailModal = () => {
//     if (!selectedEmployee || !showDetailModal) return null;
    
//     const productivityScore = calculateProductivity(selectedEmployee);
    
//     return (
//       <div 
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.8)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000,
//           padding: '20px',
//           backdropFilter: 'blur(4px)'
//         }}
//         onClick={() => setShowDetailModal(false)}
//       >
//         <div 
//           style={{
//             background: '#0f172a',
//             borderRadius: '16px',
//             width: '100%',
//             maxWidth: '900px',
//             maxHeight: '90vh',
//             overflowY: 'auto',
//             border: '1px solid #334155',
//             boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Modal Header */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '24px',
//             borderBottom: '1px solid #334155',
//             position: 'sticky',
//             top: 0,
//             background: '#0f172a',
//             zIndex: 10,
//             borderRadius: '16px 16px 0 0'
//           }}>
//             <div>
//               <h2 style={{ margin: 0, fontSize: '24px', color: '#f1f5f9' }}>
//                 {selectedEmployee.name}'s Activity Details
//               </h2>
//               <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>
//                 Employee ID: {selectedEmployee.empId}
//               </p>
//             </div>
//             <button 
//               onClick={() => setShowDetailModal(false)}
//               style={{
//                 background: 'transparent',
//                 border: 'none',
//                 color: '#94a3b8',
//                 fontSize: '24px',
//                 cursor: 'pointer',
//                 width: '40px',
//                 height: '40px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: '8px',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               ✕
//             </button>
//           </div>

//           {/* Modal Body */}
//           <div style={{ padding: '24px' }}>
//             {/* Employee Overview */}
//             <div style={{
//               background: '#1e293b',
//               borderRadius: '12px',
//               padding: '24px',
//               marginBottom: '24px',
//               border: '1px solid #334155'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '20px',
//                 marginBottom: '24px',
//                 flexWrap: 'wrap'
//               }}>
//                 <div style={{
//                   width: '80px',
//                   height: '80px',
//                   borderRadius: '50%',
//                   background: getStatusColor(selectedEmployee.status),
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: '32px',
//                   fontWeight: '600',
//                   color: 'white',
//                   flexShrink: 0
//                 }}>
//                   {selectedEmployee.name.charAt(0)}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <h3 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#f1f5f9' }}>
//                     {selectedEmployee.name}
//                   </h3>
//                   <p style={{ color: '#3b82f6', fontWeight: '500', margin: '0 0 4px 0' }}>
//                     {selectedEmployee.role || 'Software Engineer'}
//                   </p>
//                   <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
//                     {selectedEmployee.department || 'Engineering Department'}
//                   </p>
//                 </div>
//                 <div style={{
//                   padding: '12px 20px',
//                   borderRadius: '24px',
//                   fontSize: '16px',
//                   fontWeight: '600',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   whiteSpace: 'nowrap',
//                   background: `${getStatusColor(selectedEmployee.status)}20`,
//                   color: getStatusColor(selectedEmployee.status)
//                 }}>
//                   {getStatusIcon(selectedEmployee.status)} {selectedEmployee.status}
//                 </div>
//               </div>

//               {/* Stats Grid */}
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//                 gap: '16px'
//               }}>
//                 <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
//                   <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Punch In</div>
//                   <div style={{ fontSize: '20px', fontWeight: '700', color: '#f1f5f9' }}>
//                     {selectedEmployee.punchInTime ? 
//                       new Date(selectedEmployee.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
//                       '--:--'
//                     }
//                   </div>
//                 </div>
//                 <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
//                   <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Active Time</div>
//                   <div style={{ fontSize: '20px', fontWeight: '700', color: '#10b981' }}>
//                     {formatDuration(selectedEmployee.workSeconds)}
//                   </div>
//                 </div>
//                 <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
//                   <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Idle Time</div>
//                   <div style={{ fontSize: '20px', fontWeight: '700', color: '#f59e0b' }}>
//                     {formatDuration(selectedEmployee.idleSeconds)}
//                   </div>
//                 </div>
//                 <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
//                   <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Productivity</div>
//                   <div style={{ fontSize: '20px', fontWeight: '700', color: productivityScore > 70 ? '#10b981' : '#f59e0b' }}>
//                     {productivityScore}%
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Current Activity */}
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>🎯 Current Activity</h3>
//               <div style={{
//                 background: '#1e293b',
//                 borderRadius: '12px',
//                 padding: '20px',
//                 border: '1px solid #334155'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginBottom: '20px',
//                   flexWrap: 'wrap',
//                   gap: '12px'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                     <span style={{ fontSize: '32px' }}>{getAppIcon(selectedEmployee.appName)}</span>
//                     <div>
//                       <strong style={{ display: 'block', color: '#f1f5f9', fontSize: '14px', marginBottom: '4px' }}>
//                         {selectedEmployee.appName || 'Unknown Application'}
//                       </strong>
//                       <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>
//                         {selectedEmployee.currentActivity || 'No active task'}
//                       </p>
//                     </div>
//                   </div>
//                   <span style={{
//                     background: 'rgba(59, 130, 246, 0.2)',
//                     color: '#3b82f6',
//                     padding: '8px 16px',
//                     borderRadius: '20px',
//                     fontWeight: '600',
//                     fontSize: '14px'
//                   }}>
//                     {formatDuration(selectedEmployee.workSeconds + selectedEmployee.idleSeconds)}
//                   </span>
//                 </div>
//                 <div style={{ marginTop: '20px' }}>
//                   <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
//                     <div style={{
//                       height: '100%',
//                       borderRadius: '4px',
//                       width: `${Math.min(productivityScore, 100)}%`,
//                       background: getStatusColor(selectedEmployee.status),
//                       transition: 'width 0.3s ease'
//                     }}></div>
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
//                     <span>Start</span>
//                     <span>Now</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Time Breakdown */}
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>⏱️ Today's Time Breakdown</h3>
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '12px'
//               }}>
//                 {[
//                   { label: 'Active Work', value: selectedEmployee.workSeconds, color: '#10b981' },
//                   { label: 'Idle Time', value: selectedEmployee.idleSeconds, color: '#f59e0b' },
//                   { label: 'Meetings', value: selectedEmployee.meetingSeconds || 0, color: '#3b82f6' },
//                   { label: 'Breaks', value: selectedEmployee.breakSeconds || 0, color: '#ef4444' }
//                 ].map((item, index) => {
//                   const total = selectedEmployee.workSeconds + selectedEmployee.idleSeconds + 
//                               (selectedEmployee.meetingSeconds || 0) + (selectedEmployee.breakSeconds || 0);
//                   const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
                  
//                   return (
//                     <div key={index} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '16px',
//                       flexWrap: 'wrap'
//                     }}>
//                       <div style={{ width: '120px', color: '#94a3b8', fontSize: '14px' }}>{item.label}</div>
//                       <div style={{ flex: 1, height: '12px', background: '#334155', borderRadius: '6px', overflow: 'hidden' }}>
//                         <div style={{
//                           height: '100%',
//                           borderRadius: '6px',
//                           width: `${percentage}%`,
//                           background: item.color,
//                           transition: 'width 0.3s ease'
//                         }}></div>
//                       </div>
//                       <div style={{ width: '80px', textAlign: 'right', fontWeight: '600', color: '#f1f5f9', fontSize: '14px' }}>
//                         {formatDuration(item.value)}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Activity History */}
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>📋 Recent Activity History</h3>
//               <div style={{
//                 background: '#1e293b',
//                 borderRadius: '12px',
//                 border: '1px solid #334155',
//                 maxHeight: '300px',
//                 overflowY: 'auto'
//               }}>
//                 {activityHistory.length > 0 ? (
//                   activityHistory.map((activity, index) => (
//                     <div key={index} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       padding: '16px',
//                       borderBottom: '1px solid #334155',
//                       transition: 'background 0.2s',
//                       cursor: 'pointer'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = 'transparent';
//                     }}>
//                       <div style={{ width: '80px', color: '#94a3b8', fontSize: '12px', fontWeight: '500' }}>
//                         {activity.time}
//                       </div>
//                       <div style={{ width: '40px', fontSize: '20px', textAlign: 'center' }}>
//                         {getAppIcon(activity.app)}
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <strong style={{ display: 'block', color: '#f1f5f9', fontSize: '14px', marginBottom: '4px' }}>
//                           {activity.app}
//                         </strong>
//                         <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>{activity.activity}</p>
//                       </div>
//                       <div style={{ width: '80px', textAlign: 'right', color: '#3b82f6', fontWeight: '600', fontSize: '14px' }}>
//                         {formatDuration(activity.duration)}
//                       </div>
//                       <div style={{ width: '40px', textAlign: 'center', fontSize: '20px', color: getStatusColor('ACTIVE') }}>
//                         {getStatusIcon('ACTIVE')}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
//                     No activity history available
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Performance Metrics */}
//             <div>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>📊 Performance Metrics</h3>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//                 gap: '16px'
//               }}>
//                 {[
//                   { icon: '🎯', title: 'Productivity Score', value: `${productivityScore}%`, subtitle: "Today's performance" },
//                   { icon: '📅', title: 'Attendance Rate', value: '95%', subtitle: 'This month' },
//                   { icon: '⏱️', title: 'Avg. Active Hours', value: '7h 30m', subtitle: 'Last 30 days' },
//                   { icon: '📈', title: 'Avg. Productivity', value: '78%', subtitle: 'Monthly average' }
//                 ].map((metric, index) => (
//                   <div key={index} style={{
//                     background: '#1e293b',
//                     borderRadius: '12px',
//                     padding: '20px',
//                     border: '1px solid #334155',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '16px'
//                   }}>
//                     <div style={{ fontSize: '32px', opacity: 0.9 }}>{metric.icon}</div>
//                     <div>
//                       <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#94a3b8' }}>{metric.title}</h4>
//                       <p style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 4px 0' }}>
//                         {metric.value}
//                       </p>
//                       <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>{metric.subtitle}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '24px',
//             borderTop: '1px solid #334155',
//             background: '#0f172a',
//             borderRadius: '0 0 16px 16px',
//             position: 'sticky',
//             bottom: 0,
//             flexWrap: 'wrap',
//             gap: '16px'
//           }}>
//             <button 
//               onClick={() => setShowDetailModal(false)}
//               style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               Close
//             </button>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
//               <button style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}>
//                 💬 Message
//               </button>
//               <button style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}>
//                 📷 Screenshots
//               </button>
//               <button style={{
//                 background: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 transition: 'background 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#2563eb';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = '#3b82f6';
//               }}>
//                 Export Details
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderRealTimeUpdates = () => {
//     return (
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '20px',
//         marginTop: '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: showUpdates ? '16px' : '0'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <h3 style={{ margin: 0, fontSize: '18px', color: '#f1f5f9' }}>🔄 Real-time Updates</h3>
//             <span style={{
//               background: '#3b82f6',
//               color: 'white',
//               fontSize: '12px',
//               fontWeight: '600',
//               padding: '2px 8px',
//               borderRadius: '12px',
//               minWidth: '20px',
//               textAlign: 'center'
//             }}>
//               {realTimeUpdates.length}
//             </span>
//           </div>
//           <button 
//             onClick={() => setShowUpdates(!showUpdates)}
//             style={{
//               background: 'transparent',
//               color: '#94a3b8',
//               border: '1px solid #334155',
//               padding: '6px 12px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '12px',
//               fontWeight: '500',
//               transition: 'all 0.2s'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#334155';
//               e.currentTarget.style.color = '#f1f5f9';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#94a3b8';
//             }}
//           >
//             {showUpdates ? 'Hide' : 'Show'} Updates
//           </button>
//         </div>

//         {showUpdates && (
//           <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
//             {realTimeUpdates.length > 0 ? (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                 {realTimeUpdates.map((update) => (
//                   <div 
//                     key={update.id}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'flex-start',
//                       gap: '12px',
//                       padding: '12px',
//                       background: 'rgba(255, 255, 255, 0.05)',
//                       borderRadius: '8px',
//                       borderLeft: `3px solid ${getUpdateColor(update.type)}`,
//                       transition: 'background 0.2s'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                     }}
//                   >
//                     <div style={{ fontSize: '20px', flexShrink: 0, color: getUpdateColor(update.type) }}>
//                       {getUpdateIcon(update.type)}
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <div style={{ color: '#f1f5f9', fontSize: '14px', lineHeight: '1.4', marginBottom: '4px' }}>
//                         <strong style={{ color: '#3b82f6' }}>{update.employeeName}</strong> {update.message}
//                       </div>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
//                         <span>{formatTime(update.timestamp)}</span>
//                         <span>{update.type.replace('_', ' ')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div style={{ textAlign: 'center', padding: '40px 20px' }}>
//                 <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
//                 <p style={{ color: '#94a3b8', margin: '0 0 8px 0' }}>No recent updates</p>
//                 <small style={{ color: '#64748b', fontSize: '12px' }}>Updates will appear here in real-time</small>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // ================= MAIN RENDER =================
  
//   return (
//     <div style={{
//       padding: '20px',
//       background: '#0f172a',
//       minHeight: '100vh',
//       color: '#f1f5f9'
//     }}>
//       {/* Dashboard Header */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: '24px',
//         flexWrap: 'wrap',
//         gap: '20px'
//       }}>
//         <div style={{ flex: 1, minWidth: '300px' }}>
//           <h1 style={{
//             fontSize: '28px',
//             fontWeight: '700',
//             color: '#f1f5f9',
//             margin: '0 0 8px 0',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px'
//           }}>
//             <span style={{ fontSize: '32px' }}>📡</span>
//             Employee Tracking Dashboard
//           </h1>
//           <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
//             Real-time monitoring • {filteredEmployees.length} employees online • 
//             Last updated: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//           </p>
//         </div>
        
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '16px',
//             flexWrap: 'wrap'
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#94a3b8' }}>
//                 <input 
//                   type="checkbox" 
//                   checked={autoRefresh}
//                   onChange={(e) => setAutoRefresh(e.target.checked)}
//                   style={{ display: 'none' }}
//                 />
//                 <div style={{
//                   width: '18px',
//                   height: '18px',
//                   border: '2px solid #475569',
//                   borderRadius: '4px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   transition: 'all 0.2s'
//                 }}>
//                   {autoRefresh && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
//                 </div>
//                 <span>Auto Refresh (30s)</span>
//               </label>
//             </div>
            
//             <div style={{ display: 'flex', background: '#1e293b', borderRadius: '8px', padding: '4px' }}>
//               <button 
//                 style={{
//                   padding: '6px 12px',
//                   border: 'none',
//                   background: viewMode === 'grid' ? '#334155' : 'transparent',
//                   color: viewMode === 'grid' ? '#f1f5f9' : '#94a3b8',
//                   cursor: 'pointer',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   transition: 'all 0.2s'
//                 }}
//                 onClick={() => setViewMode('grid')}
//               >
//                 ▦ Grid
//               </button>
//               <button 
//                 style={{
//                   padding: '6px 12px',
//                   border: 'none',
//                   background: viewMode === 'list' ? '#334155' : 'transparent',
//                   color: viewMode === 'list' ? '#f1f5f9' : '#94a3b8',
//                   cursor: 'pointer',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   transition: 'all 0.2s'
//                 }}
//                 onClick={() => setViewMode('list')}
//               >
//                 ≡ List
//               </button>
//             </div>
            
//             <button 
//               style={{
//                 background: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 padding: '8px 16px',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'background 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#2563eb';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = '#3b82f6';
//               }}
//               onClick={() => console.log('Manual refresh')}
//             >
//               <span>🔄</span>
//               Refresh Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//         gap: '20px',
//         marginBottom: '24px'
//       }}>
//         {[
//           { icon: '👥', value: statusStats.total, label: 'Total Employees', trend: `${employees.filter(e => e.status !== 'OFFLINE').length} online`, color: '#8b5cf6' },
//           { icon: '✅', value: statusStats.working, label: 'Productive', trend: 'Active now', color: '#10b981' },
//           { icon: '😴', value: statusStats.idle, label: 'Idle', trend: 'Need attention', color: '#f59e0b' },
//           { icon: '📊', value: '78%', label: 'Avg Productivity', trend: '+2% from yesterday', color: '#3b82f6' }
//         ].map((stat, index) => (
//           <div key={index} style={{
//             background: '#1e293b',
//             borderRadius: '12px',
//             padding: '20px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '16px',
//             border: '1px solid #334155',
//             borderLeft: `4px solid ${stat.color}`,
//             transition: 'transform 0.2s, box-shadow 0.2s'
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = 'translateY(-2px)';
//             e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = 'translateY(0)';
//             e.currentTarget.style.boxShadow = 'none';
//           }}>
//             <div style={{ fontSize: '32px', opacity: 0.9 }}>{stat.icon}</div>
//             <div style={{ flex: 1 }}>
//               <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 4px 0', color: '#f1f5f9' }}>
//                 {stat.value}
//               </h3>
//               <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 8px 0' }}>{stat.label}</p>
//               <div style={{ fontSize: '12px', color: stat.color }}>{stat.trend}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filters & Search */}
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '20px',
//         marginBottom: '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{ position: 'relative', marginBottom: '16px' }}>
//           <span style={{
//             position: 'absolute',
//             left: '16px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: '#94a3b8',
//             fontSize: '18px'
//           }}>🔍</span>
//           <input 
//             type="text" 
//             style={{
//               width: '100%',
//               padding: '12px 48px 12px 48px',
//               background: '#0f172a',
//               border: '1px solid #334155',
//               borderRadius: '8px',
//               color: '#f1f5f9',
//               fontSize: '14px',
//               transition: 'border-color 0.2s'
//             }}
//             placeholder="Search employees by name, ID, department, or activity..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onFocus={(e) => {
//               e.target.style.borderColor = '#3b82f6';
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = '#334155';
//             }}
//           />
//           {searchQuery && (
//             <button 
//               style={{
//                 position: 'absolute',
//                 right: '16px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: 'transparent',
//                 border: 'none',
//                 color: '#94a3b8',
//                 cursor: 'pointer',
//                 fontSize: '18px',
//                 padding: 0,
//                 width: '24px',
//                 height: '24px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//               onClick={() => setSearchQuery('')}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               ✕
//             </button>
//           )}
//         </div>
        
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '16px',
//           flexWrap: 'wrap'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <label style={{ color: '#94a3b8', fontSize: '14px', whiteSpace: 'nowrap' }}>Status Filter:</label>
//             <select 
//               style={{
//                 padding: '8px 12px',
//                 background: '#0f172a',
//                 border: '1px solid #334155',
//                 borderRadius: '6px',
//                 color: '#f1f5f9',
//                 fontSize: '14px',
//                 minWidth: '150px',
//                 cursor: 'pointer'
//               }}
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="All">All Status</option>
//               <option value="ACTIVE">Working ✅</option>
//               <option value="IDLE">Idle 😴</option>
//               <option value="MEETING">Meeting 📅</option>
//               <option value="BREAK">Break ☕</option>
//               <option value="OFFLINE">Offline 🔴</option>
//             </select>
//           </div>
          
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <label style={{ color: '#94a3b8', fontSize: '14px', whiteSpace: 'nowrap' }}>Sort By:</label>
//             <select style={{
//               padding: '8px 12px',
//               background: '#0f172a',
//               border: '1px solid #334155',
//               borderRadius: '6px',
//               color: '#f1f5f9',
//               fontSize: '14px',
//               minWidth: '150px',
//               cursor: 'pointer'
//             }}>
//               <option value="name">Name A-Z</option>
//               <option value="productivity">Productivity</option>
//               <option value="time">Active Time</option>
//               <option value="status">Status</option>
//             </select>
//           </div>
          
//           <button 
//             style={{
//               background: 'transparent',
//               color: '#94a3b8',
//               border: '1px solid #334155',
//               padding: '8px 16px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               transition: 'all 0.2s',
//               marginLeft: 'auto'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#334155';
//               e.currentTarget.style.color = '#f1f5f9';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#94a3b8';
//             }}
//           >
//             <span>📥</span>
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
//         gap: '20px',
//         marginBottom: '24px'
//       }}>
//         {/* Activity Timeline */}
//         <div style={{
//           background: '#1e293b',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <h3 style={{ fontSize: '18px', margin: 0, color: '#f1f5f9' }}>📈 Activity Timeline (Today)</h3>
//             <span style={{ color: '#94a3b8', fontSize: '12px' }}>Peak productive hours</span>
//           </div>
//           {renderActivityTimeline()}
//         </div>
        
//         {/* Status Distribution */}
//         <div style={{
//           background: '#1e293b',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <h3 style={{ fontSize: '18px', margin: 0, color: '#f1f5f9' }}>📊 Status Distribution</h3>
//             <span style={{ color: '#94a3b8', fontSize: '12px' }}>Current employee status</span>
//           </div>
//           {renderStatusDistributionChart()}
//         </div>
//       </div>

//       {/* Employees Section */}
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{ marginBottom: '20px' }}>
//           <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#f1f5f9' }}>👥 Employee Tracking</h2>
//           <span style={{ color: '#94a3b8', fontSize: '14px' }}>
//             {filteredEmployees.length} employees found • {filterStatus !== 'All' ? `Filtered by: ${filterStatus}` : 'Showing all statuses'}
//           </span>
//         </div>
        
//         {/* Employees Grid */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(350px, 1fr))' : '1fr',
//           gap: '20px'
//         }}>
//           {filteredEmployees.length > 0 ? (
//             filteredEmployees.map(renderEmployeeCard)
//           ) : (
//             <div style={{ textAlign: 'center', padding: '60px 20px' }}>
//               <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>🔍</div>
//               <h3 style={{ fontSize: '20px', color: '#f1f5f9', margin: '0 0 8px 0' }}>No employees found</h3>
//               <p style={{ color: '#94a3b8', margin: '0 0 20px 0' }}>Try adjusting your search or filter criteria</p>
//               <button 
//                 style={{
//                   background: '#3b82f6',
//                   color: 'white',
//                   border: 'none',
//                   padding: '10px 20px',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500'
//                 }}
//                 onClick={() => {
//                   setSearchQuery('');
//                   setFilterStatus('All');
//                 }}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Real-time Updates */}
//       {renderRealTimeUpdates()}

//       {/* Employee Detail Modal */}
//       {renderEmployeeDetailModal()}
//     </div>
//   );
// };

// export default LiveTrackingPage;




// aaaaaaaddddddddddddddddddddddddddddddd  upper vala sahi he working 


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// const LiveTrackingPage = () => {
//   // ================= STATE MANAGEMENT =================
//   const [time, setTime] = useState(new Date());
//   const [autoRefresh, setAutoRefresh] = useState(true);
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [showUpdates, setShowUpdates] = useState(true);
//   const [realTimeUpdates, setRealTimeUpdates] = useState([]);

//   // ================= RESPONSIVE HOOK =================
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const isSmallMobile = windowWidth < 480;

//   // ================= MOCK DATA (Replace with Redux/API) =================
//   const employees = [
//     {
//       id: 'EMP001',
//       name: 'Rahul Sharma',
//       empId: 'EMP001',
//       department: 'Engineering',
//       role: 'Frontend Developer',
//       status: 'ACTIVE',
//       workSeconds: 14400,
//       idleSeconds: 1800,
//       punchInTime: '2024-01-03T09:00:00.000Z',
//       currentActivity: 'Working on Dashboard UI',
//       appName: 'VS Code',
//       lastActive: '2 mins ago',
//       productivity: 85,
//       meetingSeconds: 1800,
//       breakSeconds: 900,
//       email: 'rahul@company.com',
//       phone: '+91 9876543210'
//     },
//     {
//       id: 'EMP002',
//       name: 'Priya Patel',
//       empId: 'EMP002',
//       department: 'Design',
//       role: 'UI/UX Designer',
//       status: 'MEETING',
//       workSeconds: 10800,
//       idleSeconds: 1200,
//       punchInTime: '2024-01-03T09:30:00.000Z',
//       currentActivity: 'Client Presentation',
//       appName: 'Zoom',
//       lastActive: '5 mins ago',
//       productivity: 78,
//       meetingSeconds: 3600,
//       breakSeconds: 600
//     },
//     {
//       id: 'EMP003',
//       name: 'Amit Kumar',
//       empId: 'EMP003',
//       department: 'Engineering',
//       role: 'Backend Developer',
//       status: 'ACTIVE',
//       workSeconds: 18000,
//       idleSeconds: 900,
//       punchInTime: '2024-01-03T08:45:00.000Z',
//       currentActivity: 'API Development',
//       appName: 'Postman',
//       lastActive: 'Just now',
//       productivity: 92,
//       meetingSeconds: 900,
//       breakSeconds: 1200
//     },
//     {
//       id: 'EMP004',
//       name: 'Neha Singh',
//       empId: 'EMP004',
//       department: 'HR',
//       role: 'HR Manager',
//       status: 'BREAK',
//       workSeconds: 12600,
//       idleSeconds: 2400,
//       punchInTime: '2024-01-03T09:15:00.000Z',
//       currentActivity: 'Lunch Break',
//       appName: '',
//       lastActive: '15 mins ago',
//       productivity: 65,
//       meetingSeconds: 2400,
//       breakSeconds: 1800
//     },
//     {
//       id: 'EMP005',
//       name: 'Sanjay Verma',
//       empId: 'EMP005',
//       department: 'Sales',
//       role: 'Sales Executive',
//       status: 'IDLE',
//       workSeconds: 9000,
//       idleSeconds: 3600,
//       punchInTime: '2024-01-03T10:00:00.000Z',
//       currentActivity: 'Checking Emails',
//       appName: 'Gmail',
//       lastActive: '8 mins ago',
//       productivity: 45,
//       meetingSeconds: 1800,
//       breakSeconds: 900
//     },
//     {
//       id: 'EMP006',
//       name: 'Anjali Reddy',
//       empId: 'EMP006',
//       department: 'Engineering',
//       role: 'Full Stack Developer',
//       status: 'ACTIVE',
//       workSeconds: 16200,
//       idleSeconds: 1200,
//       punchInTime: '2024-01-03T08:30:00.000Z',
//       currentActivity: 'Bug Fixing',
//       appName: 'VS Code',
//       lastActive: '1 min ago',
//       productivity: 88,
//       meetingSeconds: 0,
//       breakSeconds: 600
//     }
//   ];

//   const activityHistory = [
//     { time: '09:00 AM', app: 'VS Code', activity: 'Started working on login page', duration: 1800 },
//     { time: '09:30 AM', app: 'Slack', activity: 'Team standup meeting', duration: 900 },
//     { time: '10:00 AM', app: 'VS Code', activity: 'Fixed authentication bug', duration: 2700 },
//     { time: '10:45 AM', app: 'Zoom', activity: 'Client demo meeting', duration: 1800 },
//     { time: '11:15 AM', app: 'VS Code', activity: 'Code review', duration: 2100 },
//     { time: '12:00 PM', app: 'Chrome', activity: 'Research and documentation', duration: 1800 }
//   ];

//   // ================= USE EFFECTS =================
//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     if (!autoRefresh) return;
//     const refreshTimer = setInterval(() => {
//       console.log('Auto-refreshing tracking data...');
//     }, 30000);
//     return () => clearInterval(refreshTimer);
//   }, [autoRefresh]);

//   useEffect(() => {
//     const mockUpdates = [
//       { id: 1, type: 'punch_in', employeeName: 'Rahul Sharma', message: 'punched in', timestamp: new Date(Date.now() - 120000).toISOString() },
//       { id: 2, type: 'status_change', employeeName: 'Priya Patel', message: 'joined a meeting', timestamp: new Date(Date.now() - 300000).toISOString() },
//       { id: 3, type: 'activity', employeeName: 'Amit Kumar', message: 'started working on API', timestamp: new Date(Date.now() - 180000).toISOString() },
//       { id: 4, type: 'break', employeeName: 'Neha Singh', message: 'went on break', timestamp: new Date(Date.now() - 720000).toISOString() },
//       { id: 5, type: 'app_change', employeeName: 'Sanjay Verma', message: 'switched to email', timestamp: new Date(Date.now() - 480000).toISOString() }
//     ];
//     setRealTimeUpdates(mockUpdates);
//   }, []);

//   // ================= HELPER FUNCTIONS =================
//   const filteredEmployees = employees.filter(employee => {
//     const matchesSearch =
//       searchQuery === '' ||
//       employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (employee.currentActivity && employee.currentActivity.toLowerCase().includes(searchQuery.toLowerCase()));
//     const matchesStatus = filterStatus === 'All' || employee.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'ACTIVE': return '✅';
//       case 'IDLE': return '😴';
//       case 'MEETING': return '📅';
//       case 'BREAK': return '☕';
//       case 'OFFLINE': return '🔴';
//       default: return '⏸️';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'ACTIVE': return '#10b981';
//       case 'IDLE': return '#f59e0b';
//       case 'MEETING': return '#3b82f6';
//       case 'BREAK': return '#ef4444';
//       case 'OFFLINE': return '#94a3b8';
//       default: return '#94a3b8';
//     }
//   };

//   const getAppIcon = (appName) => {
//     if (!appName) return '🖥️';
//     const app = appName.toLowerCase();
//     if (app.includes('chrome') || app.includes('browser')) return '🌐';
//     if (app.includes('vscode') || app.includes('code')) return '💻';
//     if (app.includes('figma')) return '🎨';
//     if (app.includes('zoom') || app.includes('meet')) return '📹';
//     if (app.includes('outlook') || app.includes('gmail')) return '📧';
//     if (app.includes('slack') || app.includes('teams')) return '💬';
//     if (app.includes('postman')) return '📡';
//     if (app.includes('excel') || app.includes('sheet')) return '📊';
//     if (app.includes('word') || app.includes('docs')) return '📝';
//     return '🖥️';
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds || seconds === 0) return '0m';
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     if (hours > 0) return `${hours}h ${minutes}m`;
//     return `${minutes}m`;
//   };

//   const calculateProductivity = (employee) => {
//     const workSeconds = employee.workSeconds || 0;
//     const idleSeconds = employee.idleSeconds || 0;
//     const total = workSeconds + idleSeconds;
//     if (total === 0) return 0;
//     return Math.round((workSeconds / total) * 100);
//   };

//   const getUpdateIcon = (type) => {
//     switch (type) {
//       case 'punch_in': return '👤';
//       case 'punch_out': return '🚪';
//       case 'status_change': return '🔄';
//       case 'app_change': return '💻';
//       case 'activity': return '🎯';
//       case 'meeting': return '📅';
//       case 'break': return '☕';
//       default: return '📢';
//     }
//   };

//   const getUpdateColor = (type) => {
//     switch (type) {
//       case 'punch_in': return '#10b981';
//       case 'punch_out': return '#ef4444';
//       case 'status_change': return '#3b82f6';
//       case 'app_change': return '#8b5cf6';
//       case 'activity': return '#f59e0b';
//       default: return '#94a3b8';
//     }
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return 'Just now';
//     const now = new Date();
//     const updateTime = new Date(timestamp);
//     const diffMs = now - updateTime;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     return `${Math.floor(diffHours / 24)}d ago`;
//   };

//   const statusStats = {
//     total: employees.length,
//     working: employees.filter(e => e.status === 'ACTIVE').length,
//     idle: employees.filter(e => e.status === 'IDLE').length,
//     meeting: employees.filter(e => e.status === 'MEETING').length,
//     break: employees.filter(e => e.status === 'BREAK').length,
//     offline: employees.filter(e => e.status === 'OFFLINE').length,
//   };

//   const activityData = [
//     { time: '9 AM', activity: 85 },
//     { time: '10 AM', activity: 92 },
//     { time: '11 AM', activity: 78 },
//     { time: '12 PM', activity: 45 },
//     { time: '1 PM', activity: 88 },
//     { time: '2 PM', activity: 95 },
//     { time: '3 PM', activity: 82 },
//     { time: '4 PM', activity: 76 },
//     { time: '5 PM', activity: 65 },
//   ];

//   const statusData = [
//     { name: 'Working', value: statusStats.working, color: '#10b981' },
//     { name: 'Idle', value: statusStats.idle, color: '#f59e0b' },
//     { name: 'Meeting', value: statusStats.meeting, color: '#3b82f6' },
//     { name: 'Break', value: statusStats.break, color: '#ef4444' },
//     { name: 'Offline', value: statusStats.offline, color: '#94a3b8' },
//   ];

//   // ================= RENDER FUNCTIONS =================
//   const renderStatusDistributionChart = () => {
//     const total = statusData.reduce((sum, item) => sum + item.value, 0);
//     const percentages = statusData.map(item => ({
//       ...item,
//       percentage: total > 0 ? Math.round((item.value / total) * 100) : 0
//     }));
//     return (
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '30px',
//         flexWrap: 'wrap'
//       }}>
//         <div style={{
//           width: '150px',
//           height: '150px',
//           borderRadius: '50%',
//           background: `conic-gradient(${percentages.map((item, index) =>
//             `${item.color} ${index === 0 ? '0%' : percentages.slice(0, index).reduce((a, b) => a + b.percentage, 0) + '%'} ` +
//             `${percentages.slice(0, index + 1).reduce((a, b) => a + b.percentage, 0)}%`
//           ).join(', ')})`,
//           position: 'relative',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}>
//           <div style={{
//             width: '100px',
//             height: '100px',
//             background: '#1e293b',
//             borderRadius: '50%',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             <span style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>{total}</span>
//             <span style={{ fontSize: '12px', color: '#94a3b8' }}>Employees</span>
//           </div>
//         </div>
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '12px'
//         }}>
//           {percentages.map((item, index) => (
//             <div key={index} style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               fontSize: '14px',
//               color: '#94a3b8'
//             }}>
//               <div style={{
//                 width: '12px',
//                 height: '12px',
//                 borderRadius: '50%',
//                 background: item.color
//               }}></div>
//               <span>{item.name} ({item.value})</span>
//               <span style={{ marginLeft: 'auto', color: '#f1f5f9' }}>{item.percentage}%</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderActivityTimeline = () => {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '12px',
//         marginTop: '10px'
//       }}>
//         {activityData.map((slot, index) => (
//           <div key={index} style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px'
//           }}>
//             <div style={{
//               width: '60px',
//               fontSize: '12px',
//               color: '#94a3b8'
//             }}>{slot.time}</div>
//             <div style={{
//               flex: 1,
//               height: '20px',
//               background: '#334155',
//               borderRadius: '10px',
//               overflow: 'hidden'
//             }}>
//               <div style={{
//                 width: `${slot.activity}%`,
//                 height: '100%',
//                 background: slot.activity > 70 ? '#10b981' : slot.activity > 40 ? '#3b82f6' : '#f59e0b',
//                 borderRadius: '10px',
//                 transition: 'width 0.3s ease'
//               }}></div>
//             </div>
//             <div style={{
//               width: '40px',
//               textAlign: 'right',
//               fontSize: '12px',
//               fontWeight: '600',
//               color: '#f1f5f9'
//             }}>{slot.activity}%</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderEmployeeCard = (employee) => {
//     const productivity = calculateProductivity(employee);
//     return (
//       <div
//         key={employee.id}
//         className="employee-card"
//         onClick={() => {
//           setSelectedEmployee(employee);
//           setShowDetailModal(true);
//         }}
//         style={{
//           background: '#0f172a',
//           borderRadius: '12px',
//           padding: isMobile ? '16px' : '20px',
//           border: '1px solid #334155',
//           cursor: 'pointer',
//           transition: 'all 0.2s',
//           position: 'relative',
//           overflow: 'hidden'
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = 'translateY(-4px)';
//           e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
//           e.currentTarget.style.borderColor = '#3b82f6';
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = 'translateY(0)';
//           e.currentTarget.style.boxShadow = 'none';
//           e.currentTarget.style.borderColor = '#334155';
//         }}
//       >
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)'
//         }}></div>
//         <div style={{
//           display: 'flex',
//           alignItems: 'flex-start',
//           marginBottom: '20px',
//           gap: '12px'
//         }}>
//           <div style={{ position: 'relative' }}>
//             <div style={{
//               width: '60px',
//               height: '60px',
//               borderRadius: '50%',
//               background: getStatusColor(employee.status),
//               border: `3px solid ${getStatusColor(employee.status)}50`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '24px',
//               fontWeight: '600',
//               color: 'white'
//             }}>
//               {employee.name.charAt(0)}
//             </div>
//             <div style={{
//               position: 'absolute',
//               bottom: 0,
//               right: 0,
//               width: '14px',
//               height: '14px',
//               borderRadius: '50%',
//               background: getStatusColor(employee.status),
//               border: '2px solid #0f172a'
//             }}></div>
//           </div>
//           <div style={{ flex: 1 }}>
//             <h4 style={{
//               fontSize: isSmallMobile ? '16px' : '18px',
//               fontWeight: '600',
//               margin: '0 0 4px 0',
//               color: '#f1f5f9'
//             }}>{employee.name}</h4>
//             <p style={{
//               color: '#94a3b8',
//               fontSize: '12px',
//               margin: '0 0 8px 0'
//             }}>{employee.empId}</p>
//             <div>
//               <span style={{
//                 background: 'rgba(59, 130, 246, 0.2)',
//                 color: '#3b82f6',
//                 padding: '4px 8px',
//                 borderRadius: '12px',
//                 fontSize: '12px',
//                 fontWeight: '500'
//               }}>{employee.department || 'Engineering'}</span>
//             </div>
//           </div>
//           <div style={{
//             padding: '6px 12px',
//             borderRadius: '20px',
//             fontSize: '12px',
//             fontWeight: '500',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '4px',
//             whiteSpace: 'nowrap',
//             background: `${getStatusColor(employee.status)}20`,
//             color: getStatusColor(employee.status)
//           }}>
//             {getStatusIcon(employee.status)} {employee.status}
//           </div>
//         </div>
//         <div style={{ marginBottom: '20px' }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px',
//             flexWrap: isMobile ? 'wrap' : 'nowrap'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: isMobile ? 'auto' : '120px', flex: isMobile ? 1 : 'none' }}>Current Activity:</span>
//             <span style={{ color: '#f1f5f9', fontWeight: '500', textAlign: 'right', flex: 1 }}>{employee.currentActivity || 'No activity'}</span>
//           </div>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px',
//             flexWrap: isMobile ? 'wrap' : 'nowrap'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: isMobile ? 'auto' : '120px', flex: isMobile ? 1 : 'none' }}>Application:</span>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: '500' }}>
//               <span style={{ fontSize: '16px' }}>{getAppIcon(employee.appName)}</span>
//               <span>{employee.appName || 'Not available'}</span>
//             </div>
//           </div>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: isMobile ? 'auto' : '120px' }}>Active Time:</span>
//             <span style={{ color: '#10b981', fontWeight: '600' }}>{formatDuration(employee.workSeconds)}</span>
//           </div>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: isMobile ? 'auto' : '120px' }}>Idle Time:</span>
//             <span style={{ color: '#f1f5f9', fontWeight: '500' }}>{formatDuration(employee.idleSeconds)}</span>
//           </div>
//           <div style={{ marginTop: '16px' }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '8px',
//               fontSize: '14px'
//             }}>
//               <span style={{ color: '#94a3b8' }}>Productivity:</span>
//               <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>{productivity}%</span>
//             </div>
//             <div style={{
//               height: '8px',
//               borderRadius: '4px',
//               background: '#334155',
//               overflow: 'hidden',
//               position: 'relative'
//             }}>
//               <div style={{
//                 height: '100%',
//                 borderRadius: '4px',
//                 width: `${productivity}%`,
//                 background: productivity > 70 ? '#10b981' :
//                   productivity > 40 ? '#f59e0b' : '#ef4444',
//                 transition: 'width 0.3s ease'
//               }}></div>
//             </div>
//           </div>
//         </div>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: isMobile ? 'flex-start' : 'center',
//           paddingTop: '16px',
//           borderTop: '1px solid #334155',
//           flexDirection: isMobile ? 'column' : 'row',
//           gap: isMobile ? '12px' : '0'
//         }}>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
//               <span style={{ color: '#94a3b8' }}>Punch In:</span>
//               <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//                 {employee.punchInTime ?
//                   new Date(employee.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
//                   'Not punched'}
//               </span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
//               <span style={{ color: '#94a3b8' }}>Today:</span>
//               <span style={{ color: '#f1f5f9', fontWeight: '500' }}>{formatDuration(employee.workSeconds + employee.idleSeconds)}</span>
//             </div>
//           </div>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedEmployee(employee);
//               setShowDetailModal(true);
//             }}
//             style={{
//               background: 'transparent',
//               color: '#3b82f6',
//               border: '1px solid #3b82f6',
//               padding: '6px 12px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '12px',
//               fontWeight: '500',
//               transition: 'all 0.2s',
//               alignSelf: isMobile ? 'flex-start' : 'auto'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//             }}
//           >
//             View Details →
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderEmployeeDetailModal = () => {
//     if (!selectedEmployee || !showDetailModal) return null;
//     const productivityScore = calculateProductivity(selectedEmployee);
//     return (
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.8)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000,
//           padding: '20px',
//           backdropFilter: 'blur(4px)'
//         }}
//         onClick={() => setShowDetailModal(false)}
//       >
//         <div
//           style={{
//             background: '#0f172a',
//             borderRadius: '16px',
//             width: '100%',
//             maxWidth: isMobile ? '95%' : '900px',
//             maxHeight: '90vh',
//             overflowY: 'auto',
//             border: '1px solid #334155',
//             boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: isMobile ? '16px' : '24px',
//             borderBottom: '1px solid #334155',
//             position: 'sticky',
//             top: 0,
//             background: '#0f172a',
//             zIndex: 10,
//             borderRadius: '16px 16px 0 0'
//           }}>
//             <div>
//               <h2 style={{ margin: 0, fontSize: isMobile ? '20px' : '24px', color: '#f1f5f9' }}>
//                 {selectedEmployee.name}'s Activity Details
//               </h2>
//               <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>
//                 Employee ID: {selectedEmployee.empId}
//               </p>
//             </div>
//             <button
//               onClick={() => setShowDetailModal(false)}
//               style={{
//                 background: 'transparent',
//                 border: 'none',
//                 color: '#94a3b8',
//                 fontSize: '24px',
//                 cursor: 'pointer',
//                 width: '40px',
//                 height: '40px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: '8px',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               ✕
//             </button>
//           </div>
//           <div style={{ padding: isMobile ? '16px' : '24px' }}>
//             <div style={{
//               background: '#1e293b',
//               borderRadius: '12px',
//               padding: isMobile ? '16px' : '24px',
//               marginBottom: '24px',
//               border: '1px solid #334155'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '20px',
//                 marginBottom: '24px',
//                 flexWrap: 'wrap'
//               }}>
//                 <div style={{
//                   width: '80px',
//                   height: '80px',
//                   borderRadius: '50%',
//                   background: getStatusColor(selectedEmployee.status),
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: '32px',
//                   fontWeight: '600',
//                   color: 'white',
//                   flexShrink: 0
//                 }}>
//                   {selectedEmployee.name.charAt(0)}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <h3 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#f1f5f9' }}>
//                     {selectedEmployee.name}
//                   </h3>
//                   <p style={{ color: '#3b82f6', fontWeight: '500', margin: '0 0 4px 0' }}>
//                     {selectedEmployee.role || 'Software Engineer'}
//                   </p>
//                   <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
//                     {selectedEmployee.department || 'Engineering Department'}
//                   </p>
//                 </div>
//                 <div style={{
//                   padding: '12px 20px',
//                   borderRadius: '24px',
//                   fontSize: '16px',
//                   fontWeight: '600',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   whiteSpace: 'nowrap',
//                   background: `${getStatusColor(selectedEmployee.status)}20`,
//                   color: getStatusColor(selectedEmployee.status),
//                   alignSelf: isMobile ? 'flex-start' : 'auto'
//                 }}>
//                   {getStatusIcon(selectedEmployee.status)} {selectedEmployee.status}
//                 </div>
//               </div>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(150px, 1fr))',
//                 gap: '16px'
//               }}>
//                 {[
//                   { label: 'Punch In', value: selectedEmployee.punchInTime ? new Date(selectedEmployee.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--', color: '#f1f5f9' },
//                   { label: 'Active Time', value: formatDuration(selectedEmployee.workSeconds), color: '#10b981' },
//                   { label: 'Idle Time', value: formatDuration(selectedEmployee.idleSeconds), color: '#f59e0b' },
//                   { label: 'Productivity', value: `${productivityScore}%`, color: productivityScore > 70 ? '#10b981' : '#f59e0b' }
//                 ].map((item, index) => (
//                   <div key={index} style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
//                     <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>{item.label}</div>
//                     <div style={{ fontSize: '20px', fontWeight: '700', color: item.color }}>{item.value}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>🎯 Current Activity</h3>
//               <div style={{
//                 background: '#1e293b',
//                 borderRadius: '12px',
//                 padding: isMobile ? '16px' : '20px',
//                 border: '1px solid #334155'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginBottom: '20px',
//                   flexWrap: 'wrap',
//                   gap: '12px'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                     <span style={{ fontSize: '32px' }}>{getAppIcon(selectedEmployee.appName)}</span>
//                     <div>
//                       <strong style={{ display: 'block', color: '#f1f5f9', fontSize: '14px', marginBottom: '4px' }}>
//                         {selectedEmployee.appName || 'Unknown Application'}
//                       </strong>
//                       <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>
//                         {selectedEmployee.currentActivity || 'No active task'}
//                       </p>
//                     </div>
//                   </div>
//                   <span style={{
//                     background: 'rgba(59, 130, 246, 0.2)',
//                     color: '#3b82f6',
//                     padding: '8px 16px',
//                     borderRadius: '20px',
//                     fontWeight: '600',
//                     fontSize: '14px'
//                   }}>
//                     {formatDuration(selectedEmployee.workSeconds + selectedEmployee.idleSeconds)}
//                   </span>
//                 </div>
//                 <div style={{ marginTop: '20px' }}>
//                   <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
//                     <div style={{
//                       height: '100%',
//                       borderRadius: '4px',
//                       width: `${Math.min(productivityScore, 100)}%`,
//                       background: getStatusColor(selectedEmployee.status),
//                       transition: 'width 0.3s ease'
//                     }}></div>
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
//                     <span>Start</span>
//                     <span>Now</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>⏱️ Today's Time Breakdown</h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                 {[
//                   { label: 'Active Work', value: selectedEmployee.workSeconds, color: '#10b981' },
//                   { label: 'Idle Time', value: selectedEmployee.idleSeconds, color: '#f59e0b' },
//                   { label: 'Meetings', value: selectedEmployee.meetingSeconds || 0, color: '#3b82f6' },
//                   { label: 'Breaks', value: selectedEmployee.breakSeconds || 0, color: '#ef4444' }
//                 ].map((item, index) => {
//                   const total = selectedEmployee.workSeconds + selectedEmployee.idleSeconds +
//                     (selectedEmployee.meetingSeconds || 0) + (selectedEmployee.breakSeconds || 0);
//                   const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
//                   return (
//                     <div key={index} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '16px',
//                       flexWrap: 'wrap'
//                     }}>
//                       <div style={{ width: isMobile ? '100px' : '120px', color: '#94a3b8', fontSize: '14px' }}>{item.label}</div>
//                       <div style={{ flex: 1, height: '12px', background: '#334155', borderRadius: '6px', overflow: 'hidden' }}>
//                         <div style={{
//                           height: '100%',
//                           borderRadius: '6px',
//                           width: `${percentage}%`,
//                           background: item.color,
//                           transition: 'width 0.3s ease'
//                         }}></div>
//                       </div>
//                       <div style={{ width: '80px', textAlign: 'right', fontWeight: '600', color: '#f1f5f9', fontSize: '14px' }}>
//                         {formatDuration(item.value)}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>📋 Recent Activity History</h3>
//               <div style={{
//                 background: '#1e293b',
//                 borderRadius: '12px',
//                 border: '1px solid #334155',
//                 maxHeight: '300px',
//                 overflowY: 'auto'
//               }}>
//                 {activityHistory.length > 0 ? (
//                   activityHistory.map((activity, index) => (
//                     <div key={index} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       padding: '16px',
//                       borderBottom: '1px solid #334155',
//                       transition: 'background 0.2s',
//                       cursor: 'pointer'
//                     }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = 'transparent';
//                       }}>
//                       <div style={{ width: '80px', color: '#94a3b8', fontSize: '12px', fontWeight: '500' }}>
//                         {activity.time}
//                       </div>
//                       <div style={{ width: '40px', fontSize: '20px', textAlign: 'center' }}>
//                         {getAppIcon(activity.app)}
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <strong style={{ display: 'block', color: '#f1f5f9', fontSize: '14px', marginBottom: '4px' }}>
//                           {activity.app}
//                         </strong>
//                         <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>{activity.activity}</p>
//                       </div>
//                       <div style={{ width: '80px', textAlign: 'right', color: '#3b82f6', fontWeight: '600', fontSize: '14px' }}>
//                         {formatDuration(activity.duration)}
//                       </div>
//                       <div style={{ width: '40px', textAlign: 'center', fontSize: '20px', color: getStatusColor('ACTIVE') }}>
//                         {getStatusIcon('ACTIVE')}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
//                     No activity history available
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>📊 Performance Metrics</h3>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
//                 gap: '16px'
//               }}>
//                 {[
//                   { icon: '🎯', title: 'Productivity Score', value: `${productivityScore}%`, subtitle: "Today's performance" },
//                   { icon: '📅', title: 'Attendance Rate', value: '95%', subtitle: 'This month' },
//                   { icon: '⏱️', title: 'Avg. Active Hours', value: '7h 30m', subtitle: 'Last 30 days' },
//                   { icon: '📈', title: 'Avg. Productivity', value: '78%', subtitle: 'Monthly average' }
//                 ].map((metric, index) => (
//                   <div key={index} style={{
//                     background: '#1e293b',
//                     borderRadius: '12px',
//                     padding: isMobile ? '16px' : '20px',
//                     border: '1px solid #334155',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '16px'
//                   }}>
//                     <div style={{ fontSize: '32px', opacity: 0.9 }}>{metric.icon}</div>
//                     <div>
//                       <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#94a3b8' }}>{metric.title}</h4>
//                       <p style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 4px 0' }}>
//                         {metric.value}
//                       </p>
//                       <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>{metric.subtitle}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div style={{
//             display: 'flex',
//             justifyContent: isMobile ? 'center' : 'space-between',
//             alignItems: 'center',
//             padding: isMobile ? '16px' : '24px',
//             borderTop: '1px solid #334155',
//             background: '#0f172a',
//             borderRadius: '0 0 16px 16px',
//             position: 'sticky',
//             bottom: 0,
//             flexWrap: 'wrap',
//             gap: '16px'
//           }}>
//             <button
//               onClick={() => setShowDetailModal(false)}
//               style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               Close
//             </button>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
//               <button style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.2s'
//               }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = '#334155';
//                   e.currentTarget.style.color = '#f1f5f9';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = 'transparent';
//                   e.currentTarget.style.color = '#94a3b8';
//                 }}>
//                 💬 Message
//               </button>
//               <button style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.2s'
//               }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = '#334155';
//                   e.currentTarget.style.color = '#f1f5f9';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = 'transparent';
//                   e.currentTarget.style.color = '#94a3b8';
//                 }}>
//                 📷 Screenshots
//               </button>
//               <button style={{
//                 background: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 transition: 'background 0.2s'
//               }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = '#2563eb';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = '#3b82f6';
//                 }}>
//                 Export Details
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderRealTimeUpdates = () => {
//     return (
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '20px',
//         marginTop: '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: showUpdates ? '16px' : '0',
//           flexWrap: 'wrap',
//           gap: '12px'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <h3 style={{ margin: 0, fontSize: '18px', color: '#f1f5f9' }}>🔄 Real-time Updates</h3>
//             <span style={{
//               background: '#3b82f6',
//               color: 'white',
//               fontSize: '12px',
//               fontWeight: '600',
//               padding: '2px 8px',
//               borderRadius: '12px',
//               minWidth: '20px',
//               textAlign: 'center'
//             }}>
//               {realTimeUpdates.length}
//             </span>
//           </div>
//           <button
//             onClick={() => setShowUpdates(!showUpdates)}
//             style={{
//               background: 'transparent',
//               color: '#94a3b8',
//               border: '1px solid #334155',
//               padding: '6px 12px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '12px',
//               fontWeight: '500',
//               transition: 'all 0.2s'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#334155';
//               e.currentTarget.style.color = '#f1f5f9';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#94a3b8';
//             }}
//           >
//             {showUpdates ? 'Hide' : 'Show'} Updates
//           </button>
//         </div>
//         {showUpdates && (
//           <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
//             {realTimeUpdates.length > 0 ? (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                 {realTimeUpdates.map((update) => (
//                   <div
//                     key={update.id}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'flex-start',
//                       gap: '12px',
//                       padding: '12px',
//                       background: 'rgba(255, 255, 255, 0.05)',
//                       borderRadius: '8px',
//                       borderLeft: `3px solid ${getUpdateColor(update.type)}`,
//                       transition: 'background 0.2s'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                     }}
//                   >
//                     <div style={{ fontSize: '20px', flexShrink: 0, color: getUpdateColor(update.type) }}>
//                       {getUpdateIcon(update.type)}
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <div style={{ color: '#f1f5f9', fontSize: '14px', lineHeight: '1.4', marginBottom: '4px' }}>
//                         <strong style={{ color: '#3b82f6' }}>{update.employeeName}</strong> {update.message}
//                       </div>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', flexWrap: 'wrap', gap: '8px' }}>
//                         <span>{formatTime(update.timestamp)}</span>
//                         <span>{update.type.replace('_', ' ')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div style={{ textAlign: 'center', padding: '40px 20px' }}>
//                 <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
//                 <p style={{ color: '#94a3b8', margin: '0 0 8px 0' }}>No recent updates</p>
//                 <small style={{ color: '#64748b', fontSize: '12px' }}>Updates will appear here in real-time</small>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // ================= MAIN RENDER =================
//   return (
//     <div style={{
//       padding: isMobile ? '16px' : '20px',
//       background: '#0f172a',
//       minHeight: '100vh',
//       color: '#f1f5f9'
//     }}>
//       {/* Dashboard Header */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: '24px',
//         flexWrap: 'wrap',
//         gap: '20px'
//       }}>
//         <div style={{ flex: 1, minWidth: '280px' }}>
//           <h1 style={{
//             fontSize: isMobile ? '24px' : '28px',
//             fontWeight: '700',
//             color: '#f1f5f9',
//             margin: '0 0 8px 0',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             flexWrap: 'wrap'
//           }}>
//             <span style={{ fontSize: isMobile ? '26px' : '32px' }}>📡</span>
//             Employee Tracking Dashboard
//           </h1>
//           <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
//             Real-time monitoring • {filteredEmployees.length} employees online •
//             Last updated: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//           </p>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#94a3b8' }}>
//                 <input
//                   type="checkbox"
//                   checked={autoRefresh}
//                   onChange={(e) => setAutoRefresh(e.target.checked)}
//                   style={{ display: 'none' }}
//                 />
//                 <div style={{
//                   width: '18px',
//                   height: '18px',
//                   border: '2px solid #475569',
//                   borderRadius: '4px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   transition: 'all 0.2s'
//                 }}>
//                   {autoRefresh && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
//                 </div>
//                 <span>Auto Refresh (30s)</span>
//               </label>
//             </div>
//             <div style={{ display: 'flex', background: '#1e293b', borderRadius: '8px', padding: '4px' }}>
//               <button
//                 style={{
//                   padding: '6px 12px',
//                   border: 'none',
//                   background: viewMode === 'grid' ? '#334155' : 'transparent',
//                   color: viewMode === 'grid' ? '#f1f5f9' : '#94a3b8',
//                   cursor: 'pointer',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   transition: 'all 0.2s'
//                 }}
//                 onClick={() => setViewMode('grid')}
//               >
//                 ▦ Grid
//               </button>
//               <button
//                 style={{
//                   padding: '6px 12px',
//                   border: 'none',
//                   background: viewMode === 'list' ? '#334155' : 'transparent',
//                   color: viewMode === 'list' ? '#f1f5f9' : '#94a3b8',
//                   cursor: 'pointer',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   transition: 'all 0.2s'
//                 }}
//                 onClick={() => setViewMode('list')}
//               >
//                 ≡ List
//               </button>
//             </div>
//             <button
//               style={{
//                 background: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 padding: '8px 16px',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'background 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#2563eb';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = '#3b82f6';
//               }}
//               onClick={() => console.log('Manual refresh')}
//             >
//               <span>🔄</span>
//               Refresh Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
//         gap: '20px',
//         marginBottom: '24px'
//       }}>
//         {[
//           { icon: '👥', value: statusStats.total, label: 'Total Employees', trend: `${employees.filter(e => e.status !== 'OFFLINE').length} online`, color: '#8b5cf6' },
//           { icon: '✅', value: statusStats.working, label: 'Productive', trend: 'Active now', color: '#10b981' },
//           { icon: '😴', value: statusStats.idle, label: 'Idle', trend: 'Need attention', color: '#f59e0b' },
//           { icon: '📊', value: '78%', label: 'Avg Productivity', trend: '+2% from yesterday', color: '#3b82f6' }
//         ].map((stat, index) => (
//           <div key={index} style={{
//             background: '#1e293b',
//             borderRadius: '12px',
//             padding: '20px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '16px',
//             border: '1px solid #334155',
//             borderLeft: `4px solid ${stat.color}`,
//             transition: 'transform 0.2s, box-shadow 0.2s'
//           }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'translateY(-2px)';
//               e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}>
//             <div style={{ fontSize: '32px', opacity: 0.9 }}>{stat.icon}</div>
//             <div style={{ flex: 1 }}>
//               <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 4px 0', color: '#f1f5f9' }}>
//                 {stat.value}
//               </h3>
//               <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 8px 0' }}>{stat.label}</p>
//               <div style={{ fontSize: '12px', color: stat.color }}>{stat.trend}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filters & Search */}
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '20px',
//         marginBottom: '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{ position: 'relative', marginBottom: '16px' }}>
//           <span style={{
//             position: 'absolute',
//             left: '16px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: '#94a3b8',
//             fontSize: '18px'
//           }}>🔍</span>
//           <input
//             type="text"
//             style={{
//               width: '100%',
//               padding: '12px 48px 12px 48px',
//               background: '#0f172a',
//               border: '1px solid #334155',
//               borderRadius: '8px',
//               color: '#f1f5f9',
//               fontSize: '14px',
//               transition: 'border-color 0.2s'
//             }}
//             placeholder="Search employees..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; }}
//             onBlur={(e) => { e.target.style.borderColor = '#334155'; }}
//           />
//           {searchQuery && (
//             <button
//               style={{
//                 position: 'absolute',
//                 right: '16px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: 'transparent',
//                 border: 'none',
//                 color: '#94a3b8',
//                 cursor: 'pointer',
//                 fontSize: '18px',
//                 padding: 0,
//                 width: '24px',
//                 height: '24px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//               onClick={() => setSearchQuery('')}
//               onMouseEnter={(e) => { e.currentTarget.style.color = '#f1f5f9'; }}
//               onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
//             >
//               ✕
//             </button>
//           )}
//         </div>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '16px',
//           flexWrap: 'wrap'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <label style={{ color: '#94a3b8', fontSize: '14px', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>Status Filter:</label>
//             <select
//               style={{
//                 padding: '8px 12px',
//                 background: '#0f172a',
//                 border: '1px solid #334155',
//                 borderRadius: '6px',
//                 color: '#f1f5f9',
//                 fontSize: '14px',
//                 minWidth: isMobile ? '120px' : '150px',
//                 cursor: 'pointer'
//               }}
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="All">All Status</option>
//               <option value="ACTIVE">Working ✅</option>
//               <option value="IDLE">Idle 😴</option>
//               <option value="MEETING">Meeting 📅</option>
//               <option value="BREAK">Break ☕</option>
//               <option value="OFFLINE">Offline 🔴</option>
//             </select>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <label style={{ color: '#94a3b8', fontSize: '14px', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>Sort By:</label>
//             <select style={{
//               padding: '8px 12px',
//               background: '#0f172a',
//               border: '1px solid #334155',
//               borderRadius: '6px',
//               color: '#f1f5f9',
//               fontSize: '14px',
//               minWidth: isMobile ? '120px' : '150px',
//               cursor: 'pointer'
//             }}>
//               <option value="name">Name A-Z</option>
//               <option value="productivity">Productivity</option>
//               <option value="time">Active Time</option>
//               <option value="status">Status</option>
//             </select>
//           </div>
//           <button
//             style={{
//               background: 'transparent',
//               color: '#94a3b8',
//               border: '1px solid #334155',
//               padding: '8px 16px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               transition: 'all 0.2s',
//               marginLeft: isMobile ? '0' : 'auto',
//               marginTop: isMobile ? '10px' : '0'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#334155';
//               e.currentTarget.style.color = '#f1f5f9';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#94a3b8';
//             }}
//           >
//             <span>📥</span>
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
//         gap: '20px',
//         marginBottom: '24px'
//       }}>
//         <div style={{
//           background: '#1e293b',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <h3 style={{ fontSize: '18px', margin: 0, color: '#f1f5f9' }}>📈 Activity Timeline (Today)</h3>
//             <span style={{ color: '#94a3b8', fontSize: '12px' }}>Peak productive hours</span>
//           </div>
//           {renderActivityTimeline()}
//         </div>
//         <div style={{
//           background: '#1e293b',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <h3 style={{ fontSize: '18px', margin: 0, color: '#f1f5f9' }}>📊 Status Distribution</h3>
//             <span style={{ color: '#94a3b8', fontSize: '12px' }}>Current employee status</span>
//           </div>
//           {renderStatusDistributionChart()}
//         </div>
//       </div>

//       {/* Employees Section */}
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: isMobile ? '16px' : '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{ marginBottom: '20px' }}>
//           <h2 style={{ fontSize: isMobile ? '20px' : '24px', margin: '0 0 8px 0', color: '#f1f5f9' }}>👥 Employee Tracking</h2>
//           <span style={{ color: '#94a3b8', fontSize: '14px' }}>
//             {filteredEmployees.length} employees found • {filterStatus !== 'All' ? `Filtered by: ${filterStatus}` : 'Showing all statuses'}
//           </span>
//         </div>
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: viewMode === 'grid' 
//             ? (isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))')
//             : '1fr',
//           gap: '20px'
//         }}>
//           {filteredEmployees.length > 0 ? (
//             filteredEmployees.map(renderEmployeeCard)
//           ) : (
//             <div style={{ textAlign: 'center', padding: '60px 20px' }}>
//               <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>🔍</div>
//               <h3 style={{ fontSize: '20px', color: '#f1f5f9', margin: '0 0 8px 0' }}>No employees found</h3>
//               <p style={{ color: '#94a3b8', margin: '0 0 20px 0' }}>Try adjusting your search or filter criteria</p>
//               <button
//                 style={{
//                   background: '#3b82f6',
//                   color: 'white',
//                   border: 'none',
//                   padding: '10px 20px',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500'
//                 }}
//                 onClick={() => {
//                   setSearchQuery('');
//                   setFilterStatus('All');
//                 }}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Real-time Updates */}
//       {renderRealTimeUpdates()}

//       {/* Employee Detail Modal */}
//       {renderEmployeeDetailModal()}
//     </div>
//   );
// };

// export default LiveTrackingPage;




// ++++++++++++++++++++++++++++88888888888888+8888888888888888888+8888888888888885





// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchEmployees, fetchActivityStatus } from "../../../redux/slices/adminEmployeesSlice";

// const LiveTrackingPage = () => {
//   // ================= REDUX =================
//   const dispatch = useDispatch();
//   const {
//     employees: reduxEmployees,
//     employeesLoading,
//     employeesError,
//     activitySummary,
//     activityList,
//     activityLoading,
//     activityError
//   } = useSelector(state => state.adminEmployees);

//   // ================= STATE MANAGEMENT =================
//   const [time, setTime] = useState(new Date());
//   const [autoRefresh, setAutoRefresh] = useState(true);
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [showUpdates, setShowUpdates] = useState(true);
//   const [realTimeUpdates, setRealTimeUpdates] = useState([]);

//   // ================= RESPONSIVE HOOK =================
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const isSmallMobile = windowWidth < 480;

//   // ================= USE EFFECTS =================
//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     // Initial data fetch
//     dispatch(fetchEmployees());
//     dispatch(fetchActivityStatus());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!autoRefresh) return;
    
//     const refreshTimer = setInterval(() => {
//       console.log('Auto-refreshing tracking data...');
//       dispatch(fetchEmployees());
//       dispatch(fetchActivityStatus());
//     }, 30000);
    
//     return () => clearInterval(refreshTimer);
//   }, [autoRefresh, dispatch]);

//   useEffect(() => {
//     // Process real-time updates from activity data
//     if (activityList && activityList.length > 0) {
//       const updates = activityList.slice(0, 5).map((activity, index) => ({
//         id: index + 1,
//         type: activity.type || 'activity',
//         employeeName: activity.employeeName || 'Employee',
//         message: activity.message || 'updated activity',
//         timestamp: activity.timestamp || new Date().toISOString()
//       }));
//       setRealTimeUpdates(updates);
//     } else {
//       // Fallback mock updates if API data is not available
//       const mockUpdates = [
//         { id: 1, type: 'punch_in', employeeName: 'Rahul Sharma', message: 'punched in', timestamp: new Date(Date.now() - 120000).toISOString() },
//         { id: 2, type: 'status_change', employeeName: 'Priya Patel', message: 'joined a meeting', timestamp: new Date(Date.now() - 300000).toISOString() },
//         { id: 3, type: 'activity', employeeName: 'Amit Kumar', message: 'started working on API', timestamp: new Date(Date.now() - 180000).toISOString() },
//         { id: 4, type: 'break', employeeName: 'Neha Singh', message: 'went on break', timestamp: new Date(Date.now() - 720000).toISOString() },
//         { id: 5, type: 'app_change', employeeName: 'Sanjay Verma', message: 'switched to email', timestamp: new Date(Date.now() - 480000).toISOString() }
//       ];
//       setRealTimeUpdates(mockUpdates);
//     }
//   }, [activityList]);

//   // ================= HELPER FUNCTIONS =================
//   // Transform API data to match component structure
//   const transformEmployeeData = (employee) => {
//     return {
//       id: employee._id || employee.id || `EMP${Math.random().toString(36).substr(2, 9)}`,
//       name: employee.name || employee.fullName || 'Unknown Employee',
//       empId: employee.employeeId || employee.empId || employee.id || 'N/A',
//       department: employee.department || 'General',
//       role: employee.role || employee.position || 'Employee',
//       status: employee.status?.toUpperCase() || employee.currentStatus?.toUpperCase() || 'OFFLINE',
//       workSeconds: employee.activeTime || employee.workSeconds || 0,
//       idleSeconds: employee.idleTime || employee.idleSeconds || 0,
//       punchInTime: employee.checkInTime || employee.punchInTime || null,
//       currentActivity: employee.currentTask || employee.activity || 'No activity',
//       appName: employee.application || employee.currentApp || '',
//       lastActive: employee.lastActive || 'Just now',
//       productivity: employee.productivityScore || employee.efficiency || 0,
//       meetingSeconds: employee.meetingTime || 0,
//       breakSeconds: employee.breakTime || 0,
//       email: employee.email || '',
//       phone: employee.phone || employee.contact || ''
//     };
//   };

//   // Use API data if available, otherwise use mock data
//   const employees = reduxEmployees && reduxEmployees.length > 0 
//     ? reduxEmployees.map(transformEmployeeData)
//     : [
//         {
//           id: 'EMP001',
//           name: 'Rahul Sharma',
//           empId: 'EMP001',
//           department: 'Engineering',
//           role: 'Frontend Developer',
//           status: 'ACTIVE',
//           workSeconds: 14400,
//           idleSeconds: 1800,
//           punchInTime: '2024-01-03T09:00:00.000Z',
//           currentActivity: 'Working on Dashboard UI',
//           appName: 'VS Code',
//           lastActive: '2 mins ago',
//           productivity: 85,
//           meetingSeconds: 1800,
//           breakSeconds: 900,
//           email: 'rahul@company.com',
//           phone: '+91 9876543210'
//         },
//         {
//           id: 'EMP002',
//           name: 'Priya Patel',
//           empId: 'EMP002',
//           department: 'Design',
//           role: 'UI/UX Designer',
//           status: 'MEETING',
//           workSeconds: 10800,
//           idleSeconds: 1200,
//           punchInTime: '2024-01-03T09:30:00.000Z',
//           currentActivity: 'Client Presentation',
//           appName: 'Zoom',
//           lastActive: '5 mins ago',
//           productivity: 78,
//           meetingSeconds: 3600,
//           breakSeconds: 600
//         },
//         {
//           id: 'EMP003',
//           name: 'Amit Kumar',
//           empId: 'EMP003',
//           department: 'Engineering',
//           role: 'Backend Developer',
//           status: 'ACTIVE',
//           workSeconds: 18000,
//           idleSeconds: 900,
//           punchInTime: '2024-01-03T08:45:00.000Z',
//           currentActivity: 'API Development',
//           appName: 'Postman',
//           lastActive: 'Just now',
//           productivity: 92,
//           meetingSeconds: 900,
//           breakSeconds: 1200
//         }
//       ];

//   const filteredEmployees = employees.filter(employee => {
//     const matchesSearch =
//       searchQuery === '' ||
//       employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (employee.currentActivity && employee.currentActivity.toLowerCase().includes(searchQuery.toLowerCase()));
//     const matchesStatus = filterStatus === 'All' || employee.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'ACTIVE': return '✅';
//       case 'IDLE': return '😴';
//       case 'MEETING': return '📅';
//       case 'BREAK': return '☕';
//       case 'OFFLINE': return '🔴';
//       default: return '⏸️';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'ACTIVE': return '#10b981';
//       case 'IDLE': return '#f59e0b';
//       case 'MEETING': return '#3b82f6';
//       case 'BREAK': return '#ef4444';
//       case 'OFFLINE': return '#94a3b8';
//       default: return '#94a3b8';
//     }
//   };

//   const getAppIcon = (appName) => {
//     if (!appName) return '🖥️';
//     const app = appName.toLowerCase();
//     if (app.includes('chrome') || app.includes('browser')) return '🌐';
//     if (app.includes('vscode') || app.includes('code')) return '💻';
//     if (app.includes('figma')) return '🎨';
//     if (app.includes('zoom') || app.includes('meet')) return '📹';
//     if (app.includes('outlook') || app.includes('gmail')) return '📧';
//     if (app.includes('slack') || app.includes('teams')) return '💬';
//     if (app.includes('postman')) return '📡';
//     if (app.includes('excel') || app.includes('sheet')) return '📊';
//     if (app.includes('word') || app.includes('docs')) return '📝';
//     return '🖥️';
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds || seconds === 0) return '0m';
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     if (hours > 0) return `${hours}h ${minutes}m`;
//     return `${minutes}m`;
//   };

//   const calculateProductivity = (employee) => {
//     const workSeconds = employee.workSeconds || 0;
//     const idleSeconds = employee.idleSeconds || 0;
//     const total = workSeconds + idleSeconds;
//     if (total === 0) return 0;
//     return Math.round((workSeconds / total) * 100);
//   };

//   const getUpdateIcon = (type) => {
//     switch (type) {
//       case 'punch_in': return '👤';
//       case 'punch_out': return '🚪';
//       case 'status_change': return '🔄';
//       case 'app_change': return '💻';
//       case 'activity': return '🎯';
//       case 'meeting': return '📅';
//       case 'break': return '☕';
//       default: return '📢';
//     }
//   };

//   const getUpdateColor = (type) => {
//     switch (type) {
//       case 'punch_in': return '#10b981';
//       case 'punch_out': return '#ef4444';
//       case 'status_change': return '#3b82f6';
//       case 'app_change': return '#8b5cf6';
//       case 'activity': return '#f59e0b';
//       default: return '#94a3b8';
//     }
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return 'Just now';
//     const now = new Date();
//     const updateTime = new Date(timestamp);
//     const diffMs = now - updateTime;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     return `${Math.floor(diffHours / 24)}d ago`;
//   };

//   // Use activitySummary from API if available, otherwise calculate from employees
//   const statusStats = activitySummary ? {
//     total: activitySummary.totalEmployees || employees.length,
//     working: activitySummary.activeEmployees || employees.filter(e => e.status === 'ACTIVE').length,
//     idle: activitySummary.idleEmployees || employees.filter(e => e.status === 'IDLE').length,
//     meeting: activitySummary.inMeetingEmployees || employees.filter(e => e.status === 'MEETING').length,
//     break: activitySummary.onBreakEmployees || employees.filter(e => e.status === 'BREAK').length,
//     offline: activitySummary.offlineEmployees || employees.filter(e => e.status === 'OFFLINE').length,
//   } : {
//     total: employees.length,
//     working: employees.filter(e => e.status === 'ACTIVE').length,
//     idle: employees.filter(e => e.status === 'IDLE').length,
//     meeting: employees.filter(e => e.status === 'MEETING').length,
//     break: employees.filter(e => e.status === 'BREAK').length,
//     offline: employees.filter(e => e.status === 'OFFLINE').length,
//   };

//   // Activity history from API or mock data
//   const activityHistory = activityList && activityList.length > 0 ? activityList : [
//     { time: '09:00 AM', app: 'VS Code', activity: 'Started working on login page', duration: 1800 },
//     { time: '09:30 AM', app: 'Slack', activity: 'Team standup meeting', duration: 900 },
//     { time: '10:00 AM', app: 'VS Code', activity: 'Fixed authentication bug', duration: 2700 },
//     { time: '10:45 AM', app: 'Zoom', activity: 'Client demo meeting', duration: 1800 },
//     { time: '11:15 AM', app: 'VS Code', activity: 'Code review', duration: 2100 },
//     { time: '12:00 PM', app: 'Chrome', activity: 'Research and documentation', duration: 1800 }
//   ];

//   const activityData = [
//     { time: '9 AM', activity: 85 },
//     { time: '10 AM', activity: 92 },
//     { time: '11 AM', activity: 78 },
//     { time: '12 PM', activity: 45 },
//     { time: '1 PM', activity: 88 },
//     { time: '2 PM', activity: 95 },
//     { time: '3 PM', activity: 82 },
//     { time: '4 PM', activity: 76 },
//     { time: '5 PM', activity: 65 },
//   ];

//   const statusData = [
//     { name: 'Working', value: statusStats.working, color: '#10b981' },
//     { name: 'Idle', value: statusStats.idle, color: '#f59e0b' },
//     { name: 'Meeting', value: statusStats.meeting, color: '#3b82f6' },
//     { name: 'Break', value: statusStats.break, color: '#ef4444' },
//     { name: 'Offline', value: statusStats.offline, color: '#94a3b8' },
//   ];

//   // ================= RENDER FUNCTIONS =================
//   const renderStatusDistributionChart = () => {
//     const total = statusData.reduce((sum, item) => sum + item.value, 0);
//     const percentages = statusData.map(item => ({
//       ...item,
//       percentage: total > 0 ? Math.round((item.value / total) * 100) : 0
//     }));
//     return (
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '30px',
//         flexWrap: 'wrap'
//       }}>
//         <div style={{
//           width: '150px',
//           height: '150px',
//           borderRadius: '50%',
//           background: `conic-gradient(${percentages.map((item, index) =>
//             `${item.color} ${index === 0 ? '0%' : percentages.slice(0, index).reduce((a, b) => a + b.percentage, 0) + '%'} ` +
//             `${percentages.slice(0, index + 1).reduce((a, b) => a + b.percentage, 0)}%`
//           ).join(', ')})`,
//           position: 'relative',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}>
//           <div style={{
//             width: '100px',
//             height: '100px',
//             background: '#1e293b',
//             borderRadius: '50%',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             <span style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>{total}</span>
//             <span style={{ fontSize: '12px', color: '#94a3b8' }}>Employees</span>
//           </div>
//         </div>
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '12px'
//         }}>
//           {percentages.map((item, index) => (
//             <div key={index} style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               fontSize: '14px',
//               color: '#94a3b8'
//             }}>
//               <div style={{
//                 width: '12px',
//                 height: '12px',
//                 borderRadius: '50%',
//                 background: item.color
//               }}></div>
//               <span>{item.name} ({item.value})</span>
//               <span style={{ marginLeft: 'auto', color: '#f1f5f9' }}>{item.percentage}%</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderActivityTimeline = () => {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '12px',
//         marginTop: '10px'
//       }}>
//         {activityData.map((slot, index) => (
//           <div key={index} style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px'
//           }}>
//             <div style={{
//               width: '60px',
//               fontSize: '12px',
//               color: '#94a3b8'
//             }}>{slot.time}</div>
//             <div style={{
//               flex: 1,
//               height: '20px',
//               background: '#334155',
//               borderRadius: '10px',
//               overflow: 'hidden'
//             }}>
//               <div style={{
//                 width: `${slot.activity}%`,
//                 height: '100%',
//                 background: slot.activity > 70 ? '#10b981' : slot.activity > 40 ? '#3b82f6' : '#f59e0b',
//                 borderRadius: '10px',
//                 transition: 'width 0.3s ease'
//               }}></div>
//             </div>
//             <div style={{
//               width: '40px',
//               textAlign: 'right',
//               fontSize: '12px',
//               fontWeight: '600',
//               color: '#f1f5f9'
//             }}>{slot.activity}%</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderEmployeeCard = (employee) => {
//     const productivity = calculateProductivity(employee);
//     return (
//       <div
//         key={employee.id}
//         className="employee-card"
//         onClick={() => {
//           setSelectedEmployee(employee);
//           setShowDetailModal(true);
//         }}
//         style={{
//           background: '#0f172a',
//           borderRadius: '12px',
//           padding: isMobile ? '16px' : '20px',
//           border: '1px solid #334155',
//           cursor: 'pointer',
//           transition: 'all 0.2s',
//           position: 'relative',
//           overflow: 'hidden'
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = 'translateY(-4px)';
//           e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
//           e.currentTarget.style.borderColor = '#3b82f6';
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = 'translateY(0)';
//           e.currentTarget.style.boxShadow = 'none';
//           e.currentTarget.style.borderColor = '#334155';
//         }}
//       >
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)'
//         }}></div>
//         <div style={{
//           display: 'flex',
//           alignItems: 'flex-start',
//           marginBottom: '20px',
//           gap: '12px'
//         }}>
//           <div style={{ position: 'relative' }}>
//             <div style={{
//               width: '60px',
//               height: '60px',
//               borderRadius: '50%',
//               background: getStatusColor(employee.status),
//               border: `3px solid ${getStatusColor(employee.status)}50`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '24px',
//               fontWeight: '600',
//               color: 'white'
//             }}>
//               {employee.name.charAt(0)}
//             </div>
//             <div style={{
//               position: 'absolute',
//               bottom: 0,
//               right: 0,
//               width: '14px',
//               height: '14px',
//               borderRadius: '50%',
//               background: getStatusColor(employee.status),
//               border: '2px solid #0f172a'
//             }}></div>
//           </div>
//           <div style={{ flex: 1 }}>
//             <h4 style={{
//               fontSize: isSmallMobile ? '16px' : '18px',
//               fontWeight: '600',
//               margin: '0 0 4px 0',
//               color: '#f1f5f9'
//             }}>{employee.name}</h4>
//             <p style={{
//               color: '#94a3b8',
//               fontSize: '12px',
//               margin: '0 0 8px 0'
//             }}>{employee.empId}</p>
//             <div>
//               <span style={{
//                 background: 'rgba(59, 130, 246, 0.2)',
//                 color: '#3b82f6',
//                 padding: '4px 8px',
//                 borderRadius: '12px',
//                 fontSize: '12px',
//                 fontWeight: '500'
//               }}>{employee.department || 'Engineering'}</span>
//             </div>
//           </div>
//           <div style={{
//             padding: '6px 12px',
//             borderRadius: '20px',
//             fontSize: '12px',
//             fontWeight: '500',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '4px',
//             whiteSpace: 'nowrap',
//             background: `${getStatusColor(employee.status)}20`,
//             color: getStatusColor(employee.status)
//           }}>
//             {getStatusIcon(employee.status)} {employee.status}
//           </div>
//         </div>
//         <div style={{ marginBottom: '20px' }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px',
//             flexWrap: isMobile ? 'wrap' : 'nowrap'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: isMobile ? 'auto' : '120px', flex: isMobile ? 1 : 'none' }}>Current Activity:</span>
//             <span style={{ color: '#f1f5f9', fontWeight: '500', textAlign: 'right', flex: 1 }}>{employee.currentActivity || 'No activity'}</span>
//           </div>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px',
//             flexWrap: isMobile ? 'wrap' : 'nowrap'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: isMobile ? 'auto' : '120px', flex: isMobile ? 1 : 'none' }}>Application:</span>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: '500' }}>
//               <span style={{ fontSize: '16px' }}>{getAppIcon(employee.appName)}</span>
//               <span>{employee.appName || 'Not available'}</span>
//             </div>
//           </div>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: isMobile ? 'auto' : '120px' }}>Active Time:</span>
//             <span style={{ color: '#10b981', fontWeight: '600' }}>{formatDuration(employee.workSeconds)}</span>
//           </div>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: isMobile ? 'auto' : '120px' }}>Idle Time:</span>
//             <span style={{ color: '#f1f5f9', fontWeight: '500' }}>{formatDuration(employee.idleSeconds)}</span>
//           </div>
//           <div style={{ marginTop: '16px' }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '8px',
//               fontSize: '14px'
//             }}>
//               <span style={{ color: '#94a3b8' }}>Productivity:</span>
//               <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>{productivity}%</span>
//             </div>
//             <div style={{
//               height: '8px',
//               borderRadius: '4px',
//               background: '#334155',
//               overflow: 'hidden',
//               position: 'relative'
//             }}>
//               <div style={{
//                 height: '100%',
//                 borderRadius: '4px',
//                 width: `${productivity}%`,
//                 background: productivity > 70 ? '#10b981' :
//                   productivity > 40 ? '#f59e0b' : '#ef4444',
//                 transition: 'width 0.3s ease'
//               }}></div>
//             </div>
//           </div>
//         </div>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: isMobile ? 'flex-start' : 'center',
//           paddingTop: '16px',
//           borderTop: '1px solid #334155',
//           flexDirection: isMobile ? 'column' : 'row',
//           gap: isMobile ? '12px' : '0'
//         }}>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
//               <span style={{ color: '#94a3b8' }}>Punch In:</span>
//               <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//                 {employee.punchInTime ?
//                   new Date(employee.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
//                   'Not punched'}
//               </span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
//               <span style={{ color: '#94a3b8' }}>Today:</span>
//               <span style={{ color: '#f1f5f9', fontWeight: '500' }}>{formatDuration(employee.workSeconds + employee.idleSeconds)}</span>
//             </div>
//           </div>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedEmployee(employee);
//               setShowDetailModal(true);
//             }}
//             style={{
//               background: 'transparent',
//               color: '#3b82f6',
//               border: '1px solid #3b82f6',
//               padding: '6px 12px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '12px',
//               fontWeight: '500',
//               transition: 'all 0.2s',
//               alignSelf: isMobile ? 'flex-start' : 'auto'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//             }}
//           >
//             View Details →
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderEmployeeDetailModal = () => {
//     if (!selectedEmployee || !showDetailModal) return null;
//     const productivityScore = calculateProductivity(selectedEmployee);
//     return (
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.8)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000,
//           padding: '20px',
//           backdropFilter: 'blur(4px)'
//         }}
//         onClick={() => setShowDetailModal(false)}
//       >
//         <div
//           style={{
//             background: '#0f172a',
//             borderRadius: '16px',
//             width: '100%',
//             maxWidth: isMobile ? '95%' : '900px',
//             maxHeight: '90vh',
//             overflowY: 'auto',
//             border: '1px solid #334155',
//             boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: isMobile ? '16px' : '24px',
//             borderBottom: '1px solid #334155',
//             position: 'sticky',
//             top: 0,
//             background: '#0f172a',
//             zIndex: 10,
//             borderRadius: '16px 16px 0 0'
//           }}>
//             <div>
//               <h2 style={{ margin: 0, fontSize: isMobile ? '20px' : '24px', color: '#f1f5f9' }}>
//                 {selectedEmployee.name}'s Activity Details
//               </h2>
//               <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>
//                 Employee ID: {selectedEmployee.empId}
//               </p>
//             </div>
//             <button
//               onClick={() => setShowDetailModal(false)}
//               style={{
//                 background: 'transparent',
//                 border: 'none',
//                 color: '#94a3b8',
//                 fontSize: '24px',
//                 cursor: 'pointer',
//                 width: '40px',
//                 height: '40px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: '8px',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               ✕
//             </button>
//           </div>
//           <div style={{ padding: isMobile ? '16px' : '24px' }}>
//             <div style={{
//               background: '#1e293b',
//               borderRadius: '12px',
//               padding: isMobile ? '16px' : '24px',
//               marginBottom: '24px',
//               border: '1px solid #334155'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '20px',
//                 marginBottom: '24px',
//                 flexWrap: 'wrap'
//               }}>
//                 <div style={{
//                   width: '80px',
//                   height: '80px',
//                   borderRadius: '50%',
//                   background: getStatusColor(selectedEmployee.status),
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: '32px',
//                   fontWeight: '600',
//                   color: 'white',
//                   flexShrink: 0
//                 }}>
//                   {selectedEmployee.name.charAt(0)}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <h3 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#f1f5f9' }}>
//                     {selectedEmployee.name}
//                   </h3>
//                   <p style={{ color: '#3b82f6', fontWeight: '500', margin: '0 0 4px 0' }}>
//                     {selectedEmployee.role || 'Software Engineer'}
//                   </p>
//                   <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
//                     {selectedEmployee.department || 'Engineering Department'}
//                   </p>
//                 </div>
//                 <div style={{
//                   padding: '12px 20px',
//                   borderRadius: '24px',
//                   fontSize: '16px',
//                   fontWeight: '600',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   whiteSpace: 'nowrap',
//                   background: `${getStatusColor(selectedEmployee.status)}20`,
//                   color: getStatusColor(selectedEmployee.status),
//                   alignSelf: isMobile ? 'flex-start' : 'auto'
//                 }}>
//                   {getStatusIcon(selectedEmployee.status)} {selectedEmployee.status}
//                 </div>
//               </div>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(150px, 1fr))',
//                 gap: '16px'
//               }}>
//                 {[
//                   { label: 'Punch In', value: selectedEmployee.punchInTime ? new Date(selectedEmployee.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--', color: '#f1f5f9' },
//                   { label: 'Active Time', value: formatDuration(selectedEmployee.workSeconds), color: '#10b981' },
//                   { label: 'Idle Time', value: formatDuration(selectedEmployee.idleSeconds), color: '#f59e0b' },
//                   { label: 'Productivity', value: `${productivityScore}%`, color: productivityScore > 70 ? '#10b981' : '#f59e0b' }
//                 ].map((item, index) => (
//                   <div key={index} style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
//                     <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>{item.label}</div>
//                     <div style={{ fontSize: '20px', fontWeight: '700', color: item.color }}>{item.value}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>🎯 Current Activity</h3>
//               <div style={{
//                 background: '#1e293b',
//                 borderRadius: '12px',
//                 padding: isMobile ? '16px' : '20px',
//                 border: '1px solid #334155'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginBottom: '20px',
//                   flexWrap: 'wrap',
//                   gap: '12px'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                     <span style={{ fontSize: '32px' }}>{getAppIcon(selectedEmployee.appName)}</span>
//                     <div>
//                       <strong style={{ display: 'block', color: '#f1f5f9', fontSize: '14px', marginBottom: '4px' }}>
//                         {selectedEmployee.appName || 'Unknown Application'}
//                       </strong>
//                       <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>
//                         {selectedEmployee.currentActivity || 'No active task'}
//                       </p>
//                     </div>
//                   </div>
//                   <span style={{
//                     background: 'rgba(59, 130, 246, 0.2)',
//                     color: '#3b82f6',
//                     padding: '8px 16px',
//                     borderRadius: '20px',
//                     fontWeight: '600',
//                     fontSize: '14px'
//                   }}>
//                     {formatDuration(selectedEmployee.workSeconds + selectedEmployee.idleSeconds)}
//                   </span>
//                 </div>
//                 <div style={{ marginTop: '20px' }}>
//                   <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
//                     <div style={{
//                       height: '100%',
//                       borderRadius: '4px',
//                       width: `${Math.min(productivityScore, 100)}%`,
//                       background: getStatusColor(selectedEmployee.status),
//                       transition: 'width 0.3s ease'
//                     }}></div>
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
//                     <span>Start</span>
//                     <span>Now</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>⏱️ Today's Time Breakdown</h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                 {[
//                   { label: 'Active Work', value: selectedEmployee.workSeconds, color: '#10b981' },
//                   { label: 'Idle Time', value: selectedEmployee.idleSeconds, color: '#f59e0b' },
//                   { label: 'Meetings', value: selectedEmployee.meetingSeconds || 0, color: '#3b82f6' },
//                   { label: 'Breaks', value: selectedEmployee.breakSeconds || 0, color: '#ef4444' }
//                 ].map((item, index) => {
//                   const total = selectedEmployee.workSeconds + selectedEmployee.idleSeconds +
//                     (selectedEmployee.meetingSeconds || 0) + (selectedEmployee.breakSeconds || 0);
//                   const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
//                   return (
//                     <div key={index} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '16px',
//                       flexWrap: 'wrap'
//                     }}>
//                       <div style={{ width: isMobile ? '100px' : '120px', color: '#94a3b8', fontSize: '14px' }}>{item.label}</div>
//                       <div style={{ flex: 1, height: '12px', background: '#334155', borderRadius: '6px', overflow: 'hidden' }}>
//                         <div style={{
//                           height: '100%',
//                           borderRadius: '6px',
//                           width: `${percentage}%`,
//                           background: item.color,
//                           transition: 'width 0.3s ease'
//                         }}></div>
//                       </div>
//                       <div style={{ width: '80px', textAlign: 'right', fontWeight: '600', color: '#f1f5f9', fontSize: '14px' }}>
//                         {formatDuration(item.value)}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>📋 Recent Activity History</h3>
//               <div style={{
//                 background: '#1e293b',
//                 borderRadius: '12px',
//                 border: '1px solid #334155',
//                 maxHeight: '300px',
//                 overflowY: 'auto'
//               }}>
//                 {activityHistory.length > 0 ? (
//                   activityHistory.map((activity, index) => (
//                     <div key={index} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       padding: '16px',
//                       borderBottom: '1px solid #334155',
//                       transition: 'background 0.2s',
//                       cursor: 'pointer'
//                     }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = 'transparent';
//                       }}>
//                       <div style={{ width: '80px', color: '#94a3b8', fontSize: '12px', fontWeight: '500' }}>
//                         {activity.time}
//                       </div>
//                       <div style={{ width: '40px', fontSize: '20px', textAlign: 'center' }}>
//                         {getAppIcon(activity.app)}
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <strong style={{ display: 'block', color: '#f1f5f9', fontSize: '14px', marginBottom: '4px' }}>
//                           {activity.app}
//                         </strong>
//                         <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>{activity.activity}</p>
//                       </div>
//                       <div style={{ width: '80px', textAlign: 'right', color: '#3b82f6', fontWeight: '600', fontSize: '14px' }}>
//                         {formatDuration(activity.duration)}
//                       </div>
//                       <div style={{ width: '40px', textAlign: 'center', fontSize: '20px', color: getStatusColor('ACTIVE') }}>
//                         {getStatusIcon('ACTIVE')}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
//                     No activity history available
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>📊 Performance Metrics</h3>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
//                 gap: '16px'
//               }}>
//                 {[
//                   { icon: '🎯', title: 'Productivity Score', value: `${productivityScore}%`, subtitle: "Today's performance" },
//                   { icon: '📅', title: 'Attendance Rate', value: '95%', subtitle: 'This month' },
//                   { icon: '⏱️', title: 'Avg. Active Hours', value: '7h 30m', subtitle: 'Last 30 days' },
//                   { icon: '📈', title: 'Avg. Productivity', value: '78%', subtitle: 'Monthly average' }
//                 ].map((metric, index) => (
//                   <div key={index} style={{
//                     background: '#1e293b',
//                     borderRadius: '12px',
//                     padding: isMobile ? '16px' : '20px',
//                     border: '1px solid #334155',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '16px'
//                   }}>
//                     <div style={{ fontSize: '32px', opacity: 0.9 }}>{metric.icon}</div>
//                     <div>
//                       <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#94a3b8' }}>{metric.title}</h4>
//                       <p style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 4px 0' }}>
//                         {metric.value}
//                       </p>
//                       <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>{metric.subtitle}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div style={{
//             display: 'flex',
//             justifyContent: isMobile ? 'center' : 'space-between',
//             alignItems: 'center',
//             padding: isMobile ? '16px' : '24px',
//             borderTop: '1px solid #334155',
//             background: '#0f172a',
//             borderRadius: '0 0 16px 16px',
//             position: 'sticky',
//             bottom: 0,
//             flexWrap: 'wrap',
//             gap: '16px'
//           }}>
//             <button
//               onClick={() => setShowDetailModal(false)}
//               style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               Close
//             </button>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
//               <button style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.2s'
//               }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = '#334155';
//                   e.currentTarget.style.color = '#f1f5f9';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = 'transparent';
//                   e.currentTarget.style.color = '#94a3b8';
//                 }}>
//                 💬 Message
//               </button>
//               <button style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.2s'
//               }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = '#334155';
//                   e.currentTarget.style.color = '#f1f5f9';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = 'transparent';
//                   e.currentTarget.style.color = '#94a3b8';
//                 }}>
//                 📷 Screenshots
//               </button>
//               <button style={{
//                 background: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 transition: 'background 0.2s'
//               }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = '#2563eb';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = '#3b82f6';
//                 }}>
//                 Export Details
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderRealTimeUpdates = () => {
//     return (
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '20px',
//         marginTop: '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: showUpdates ? '16px' : '0',
//           flexWrap: 'wrap',
//           gap: '12px'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <h3 style={{ margin: 0, fontSize: '18px', color: '#f1f5f9' }}>🔄 Real-time Updates</h3>
//             <span style={{
//               background: '#3b82f6',
//               color: 'white',
//               fontSize: '12px',
//               fontWeight: '600',
//               padding: '2px 8px',
//               borderRadius: '12px',
//               minWidth: '20px',
//               textAlign: 'center'
//             }}>
//               {realTimeUpdates.length}
//             </span>
//           </div>
//           <button
//             onClick={() => setShowUpdates(!showUpdates)}
//             style={{
//               background: 'transparent',
//               color: '#94a3b8',
//               border: '1px solid #334155',
//               padding: '6px 12px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '12px',
//               fontWeight: '500',
//               transition: 'all 0.2s'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#334155';
//               e.currentTarget.style.color = '#f1f5f9';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#94a3b8';
//             }}
//           >
//             {showUpdates ? 'Hide' : 'Show'} Updates
//           </button>
//         </div>
//         {showUpdates && (
//           <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
//             {realTimeUpdates.length > 0 ? (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                 {realTimeUpdates.map((update) => (
//                   <div
//                     key={update.id}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'flex-start',
//                       gap: '12px',
//                       padding: '12px',
//                       background: 'rgba(255, 255, 255, 0.05)',
//                       borderRadius: '8px',
//                       borderLeft: `3px solid ${getUpdateColor(update.type)}`,
//                       transition: 'background 0.2s'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                     }}
//                   >
//                     <div style={{ fontSize: '20px', flexShrink: 0, color: getUpdateColor(update.type) }}>
//                       {getUpdateIcon(update.type)}
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <div style={{ color: '#f1f5f9', fontSize: '14px', lineHeight: '1.4', marginBottom: '4px' }}>
//                         <strong style={{ color: '#3b82f6' }}>{update.employeeName}</strong> {update.message}
//                       </div>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', flexWrap: 'wrap', gap: '8px' }}>
//                         <span>{formatTime(update.timestamp)}</span>
//                         <span>{update.type.replace('_', ' ')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div style={{ textAlign: 'center', padding: '40px 20px' }}>
//                 <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
//                 <p style={{ color: '#94a3b8', margin: '0 0 8px 0' }}>No recent updates</p>
//                 <small style={{ color: '#64748b', fontSize: '12px' }}>Updates will appear here in real-time</small>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // ================= LOADING STATE =================
//   if (employeesLoading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         background: '#0f172a',
//         color: '#f1f5f9'
//       }}>
//         <div style={{ textAlign: 'center' }}>
//           <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
//           <h3>Loading Employee Data...</h3>
//           <p>Please wait while we fetch the latest tracking information</p>
//         </div>
//       </div>
//     );
//   }

//   // ================= ERROR STATE =================
//   if (employeesError) {
//     return (
//       <div style={{
//         padding: '20px',
//         background: '#0f172a',
//         minHeight: '100vh',
//         color: '#f1f5f9'
//       }}>
//         <div style={{
//           background: '#1e293b',
//           borderRadius: '12px',
//           padding: '40px',
//           textAlign: 'center',
//           border: '1px solid #ef4444'
//         }}>
//           <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚠️</div>
//           <h2 style={{ color: '#ef4444' }}>Error Loading Data</h2>
//           <p style={{ color: '#94a3b8', marginBottom: '20px' }}>{employeesError}</p>
//           <button
//             style={{
//               background: '#3b82f6',
//               color: 'white',
//               border: 'none',
//               padding: '10px 20px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '500'
//             }}
//             onClick={() => {
//               dispatch(fetchEmployees());
//               dispatch(fetchActivityStatus());
//             }}
//           >
//             Retry Loading Data
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ================= MAIN RENDER =================
//   return (
//     <div style={{
//       padding: isMobile ? '16px' : '20px',
//       background: '#0f172a',
//       minHeight: '100vh',
//       color: '#f1f5f9'
//     }}>
//       {/* Dashboard Header */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: '24px',
//         flexWrap: 'wrap',
//         gap: '20px'
//       }}>
//         <div style={{ flex: 1, minWidth: '280px' }}>
//           <h1 style={{
//             fontSize: isMobile ? '24px' : '28px',
//             fontWeight: '700',
//             color: '#f1f5f9',
//             margin: '0 0 8px 0',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             flexWrap: 'wrap'
//           }}>
//             <span style={{ fontSize: isMobile ? '26px' : '32px' }}>📡</span>
//             Employee Tracking Dashboard
//           </h1>
//           <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
//             Real-time monitoring • {filteredEmployees.length} employees online •
//             Last updated: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//             {activityLoading && ' • Refreshing...'}
//           </p>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#94a3b8' }}>
//                 <input
//                   type="checkbox"
//                   checked={autoRefresh}
//                   onChange={(e) => setAutoRefresh(e.target.checked)}
//                   style={{ display: 'none' }}
//                 />
//                 <div style={{
//                   width: '18px',
//                   height: '18px',
//                   border: '2px solid #475569',
//                   borderRadius: '4px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   transition: 'all 0.2s'
//                 }}>
//                   {autoRefresh && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
//                 </div>
//                 <span>Auto Refresh (30s)</span>
//               </label>
//             </div>
//             <div style={{ display: 'flex', background: '#1e293b', borderRadius: '8px', padding: '4px' }}>
//               <button
//                 style={{
//                   padding: '6px 12px',
//                   border: 'none',
//                   background: viewMode === 'grid' ? '#334155' : 'transparent',
//                   color: viewMode === 'grid' ? '#f1f5f9' : '#94a3b8',
//                   cursor: 'pointer',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   transition: 'all 0.2s'
//                 }}
//                 onClick={() => setViewMode('grid')}
//               >
//                 ▦ Grid
//               </button>
//               <button
//                 style={{
//                   padding: '6px 12px',
//                   border: 'none',
//                   background: viewMode === 'list' ? '#334155' : 'transparent',
//                   color: viewMode === 'list' ? '#f1f5f9' : '#94a3b8',
//                   cursor: 'pointer',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   transition: 'all 0.2s'
//                 }}
//                 onClick={() => setViewMode('list')}
//               >
//                 ≡ List
//               </button>
//             </div>
//             <button
//               style={{
//                 background: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 padding: '8px 16px',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'background 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#2563eb';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = '#3b82f6';
//               }}
//               onClick={() => {
//                 dispatch(fetchEmployees());
//                 dispatch(fetchActivityStatus());
//               }}
//             >
//               <span>🔄</span>
//               Refresh Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
//         gap: '20px',
//         marginBottom: '24px'
//       }}>
//         {[
//           { icon: '👥', value: statusStats.total, label: 'Total Employees', trend: `${employees.filter(e => e.status !== 'OFFLINE').length} online`, color: '#8b5cf6' },
//           { icon: '✅', value: statusStats.working, label: 'Productive', trend: 'Active now', color: '#10b981' },
//           { icon: '😴', value: statusStats.idle, label: 'Idle', trend: 'Need attention', color: '#f59e0b' },
//           { icon: '📊', value: '78%', label: 'Avg Productivity', trend: '+2% from yesterday', color: '#3b82f6' }
//         ].map((stat, index) => (
//           <div key={index} style={{
//             background: '#1e293b',
//             borderRadius: '12px',
//             padding: '20px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '16px',
//             border: '1px solid #334155',
//             borderLeft: `4px solid ${stat.color}`,
//             transition: 'transform 0.2s, box-shadow 0.2s'
//           }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'translateY(-2px)';
//               e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}>
//             <div style={{ fontSize: '32px', opacity: 0.9 }}>{stat.icon}</div>
//             <div style={{ flex: 1 }}>
//               <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 4px 0', color: '#f1f5f9' }}>
//                 {stat.value}
//               </h3>
//               <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 8px 0' }}>{stat.label}</p>
//               <div style={{ fontSize: '12px', color: stat.color }}>{stat.trend}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filters & Search */}
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '20px',
//         marginBottom: '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{ position: 'relative', marginBottom: '16px' }}>
//           <span style={{
//             position: 'absolute',
//             left: '16px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: '#94a3b8',
//             fontSize: '18px'
//           }}>🔍</span>
//           <input
//             type="text"
//             style={{
//               width: '100%',
//               padding: '12px 48px 12px 48px',
//               background: '#0f172a',
//               border: '1px solid #334155',
//               borderRadius: '8px',
//               color: '#f1f5f9',
//               fontSize: '14px',
//               transition: 'border-color 0.2s'
//             }}
//             placeholder="Search employees..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; }}
//             onBlur={(e) => { e.target.style.borderColor = '#334155'; }}
//           />
//           {searchQuery && (
//             <button
//               style={{
//                 position: 'absolute',
//                 right: '16px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: 'transparent',
//                 border: 'none',
//                 color: '#94a3b8',
//                 cursor: 'pointer',
//                 fontSize: '18px',
//                 padding: 0,
//                 width: '24px',
//                 height: '24px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//               onClick={() => setSearchQuery('')}
//               onMouseEnter={(e) => { e.currentTarget.style.color = '#f1f5f9'; }}
//               onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
//             >
//               ✕
//             </button>
//           )}
//         </div>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '16px',
//           flexWrap: 'wrap'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <label style={{ color: '#94a3b8', fontSize: '14px', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>Status Filter:</label>
//             <select
//               style={{
//                 padding: '8px 12px',
//                 background: '#0f172a',
//                 border: '1px solid #334155',
//                 borderRadius: '6px',
//                 color: '#f1f5f9',
//                 fontSize: '14px',
//                 minWidth: isMobile ? '120px' : '150px',
//                 cursor: 'pointer'
//               }}
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="All">All Status</option>
//               <option value="ACTIVE">Working ✅</option>
//               <option value="IDLE">Idle 😴</option>
//               <option value="MEETING">Meeting 📅</option>
//               <option value="BREAK">Break ☕</option>
//               <option value="OFFLINE">Offline 🔴</option>
//             </select>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <label style={{ color: '#94a3b8', fontSize: '14px', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>Sort By:</label>
//             <select style={{
//               padding: '8px 12px',
//               background: '#0f172a',
//               border: '1px solid #334155',
//               borderRadius: '6px',
//               color: '#f1f5f9',
//               fontSize: '14px',
//               minWidth: isMobile ? '120px' : '150px',
//               cursor: 'pointer'
//             }}>
//               <option value="name">Name A-Z</option>
//               <option value="productivity">Productivity</option>
//               <option value="time">Active Time</option>
//               <option value="status">Status</option>
//             </select>
//           </div>
//           <button
//             style={{
//               background: 'transparent',
//               color: '#94a3b8',
//               border: '1px solid #334155',
//               padding: '8px 16px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               transition: 'all 0.2s',
//               marginLeft: isMobile ? '0' : 'auto',
//               marginTop: isMobile ? '10px' : '0'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#334155';
//               e.currentTarget.style.color = '#f1f5f9';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#94a3b8';
//             }}
//           >
//             <span>📥</span>
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
//         gap: '20px',
//         marginBottom: '24px'
//       }}>
//         <div style={{
//           background: '#1e293b',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <h3 style={{ fontSize: '18px', margin: 0, color: '#f1f5f9' }}>📈 Activity Timeline (Today)</h3>
//             <span style={{ color: '#94a3b8', fontSize: '12px' }}>Peak productive hours</span>
//           </div>
//           {renderActivityTimeline()}
//         </div>
//         <div style={{
//           background: '#1e293b',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <h3 style={{ fontSize: '18px', margin: 0, color: '#f1f5f9' }}>📊 Status Distribution</h3>
//             <span style={{ color: '#94a3b8', fontSize: '12px' }}>Current employee status</span>
//           </div>
//           {renderStatusDistributionChart()}
//         </div>
//       </div>

//       {/* Employees Section */}
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: isMobile ? '16px' : '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{ marginBottom: '20px' }}>
//           <h2 style={{ fontSize: isMobile ? '20px' : '24px', margin: '0 0 8px 0', color: '#f1f5f9' }}>👥 Employee Tracking</h2>
//           <span style={{ color: '#94a3b8', fontSize: '14px' }}>
//             {filteredEmployees.length} employees found • {filterStatus !== 'All' ? `Filtered by: ${filterStatus}` : 'Showing all statuses'}
//             {employeesLoading && ' • Loading...'}
//           </span>
//         </div>
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: viewMode === 'grid' 
//             ? (isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))')
//             : '1fr',
//           gap: '20px'
//         }}>
//           {filteredEmployees.length > 0 ? (
//             filteredEmployees.map(renderEmployeeCard)
//           ) : (
//             <div style={{ textAlign: 'center', padding: '60px 20px' }}>
//               <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>🔍</div>
//               <h3 style={{ fontSize: '20px', color: '#f1f5f9', margin: '0 0 8px 0' }}>No employees found</h3>
//               <p style={{ color: '#94a3b8', margin: '0 0 20px 0' }}>Try adjusting your search or filter criteria</p>
//               <button
//                 style={{
//                   background: '#3b82f6',
//                   color: 'white',
//                   border: 'none',
//                   padding: '10px 20px',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500'
//                 }}
//                 onClick={() => {
//                   setSearchQuery('');
//                   setFilterStatus('All');
//                 }}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Real-time Updates */}
//       {renderRealTimeUpdates()}

//       {/* Employee Detail Modal */}
//       {renderEmployeeDetailModal()}
//     </div>
//   );
// };

// export default LiveTrackingPage;







// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchLiveEmployees } from '../../../redux/slices/liveTrackingSlice';
// import socketClient from '../../../services/socketClient';


// const LiveTrackingPage = () => {
//   // ================= STATE MANAGEMENT =================
//   const [time, setTime] = useState(new Date());
//   const [autoRefresh, setAutoRefresh] = useState(true);
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [showUpdates, setShowUpdates] = useState(true);
//   const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  
//   // ================= REDUX =================
//   const dispatch = useDispatch();
//   const { employees: reduxEmployees, loading, error } = useSelector(state => state.adminLiveTracking);
  
//   // Transform redux employees to match UI structure
//   const employees = reduxEmployees.map(emp => ({
//     id: emp.employeeId || emp.id,
//     name: emp.name || 'Unknown Employee',
//     empId: emp.employeeId || emp.empId || 'N/A',
//     department: emp.department || 'Engineering',
//     role: emp.role || 'Employee',
//     status: emp.status || 'OFFLINE',
//     workSeconds: emp.workSeconds || 0,
//     idleSeconds: emp.idleSeconds || 0,
//     punchInTime: emp.startAt || emp.punchInTime,
//     lastActiveAt: emp.lastActiveAt,
//     // Default values for UI compatibility
//     currentActivity: emp.currentActivity || 'Working on tasks',
//     appName: emp.appName || 'VS Code',
//     lastActive: emp.lastActive || 'Just now',
//     productivity: emp.productivity || Math.round((emp.workSeconds / (emp.workSeconds + emp.idleSeconds || 1)) * 100) || 85,
//     meetingSeconds: emp.meetingSeconds || 0,
//     breakSeconds: emp.breakSeconds || 0,
//     email: emp.email || '',
//     phone: emp.phone || ''
//   }));

//   const activityHistory = [
//     { time: '09:00 AM', app: 'VS Code', activity: 'Started working on login page', duration: 1800 },
//     { time: '09:30 AM', app: 'Slack', activity: 'Team standup meeting', duration: 900 },
//     { time: '10:00 AM', app: 'VS Code', activity: 'Fixed authentication bug', duration: 2700 },
//     { time: '10:45 AM', app: 'Zoom', activity: 'Client demo meeting', duration: 1800 },
//     { time: '11:15 AM', app: 'VS Code', activity: 'Code review', duration: 2100 },
//     { time: '12:00 PM', app: 'Chrome', activity: 'Research and documentation', duration: 1800 }
//   ];

//   // ================= USE EFFECTS =================

// // useEffect(() => {
// //   dispatch(fetchLiveEmployees());
// // }, [dispatch]);


// //   useEffect(() => {
// //   socketClient.initialize(dispatch);

// //   return () => {
// //     socketClient.disconnect();
// //   };
// // }, [dispatch]);

  
// //   // Update time every second
// //   useEffect(() => {
// //     const timer = setInterval(() => setTime(new Date()), 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // Fetch data on mount
// //   useEffect(() => {
// //     dispatch(fetchLiveEmployees());
// //   }, [dispatch]);

// //   // Auto-refresh tracking data
// //   useEffect(() => {
// //     if (!autoRefresh) return;
    
// //     const refreshTimer = setInterval(() => {
// //       console.log('Auto-refreshing tracking data...');
// //       dispatch(fetchLiveEmployees());
// //     }, 30000); // Refresh every 30 seconds
    
// //     return () => clearInterval(refreshTimer);
// //   }, [autoRefresh, dispatch]);

//   // Initialize real-time updates
//   // useEffect(() => {
//   //   const mockUpdates = [
//   //     { id: 1, type: 'punch_in', employeeName: 'Rahul Sharma', message: 'punched in', timestamp: new Date(Date.now() - 120000).toISOString() },
//   //     { id: 2, type: 'status_change', employeeName: 'Priya Patel', message: 'joined a meeting', timestamp: new Date(Date.now() - 300000).toISOString() },
//   //     { id: 3, type: 'activity', employeeName: 'Amit Kumar', message: 'started working on API', timestamp: new Date(Date.now() - 180000).toISOString() },
//   //     { id: 4, type: 'break', employeeName: 'Neha Singh', message: 'went on break', timestamp: new Date(Date.now() - 720000).toISOString() },
//   //     { id: 5, type: 'app_change', employeeName: 'Sanjay Verma', message: 'switched to email', timestamp: new Date(Date.now() - 480000).toISOString() }
//   //   ];
//   //   setRealTimeUpdates(mockUpdates);
//   // }, []);



//   // ================= FIXED USE EFFECTS =================

// // 1️⃣ Initialize socket connection ONCE on mount
// useEffect(() => {
//   console.log("🔌 Initializing socket connection...");
//   socketClient.initialize(dispatch);

//   return () => {
//     console.log("🔌 Cleaning up socket connection...");
//     socketClient.disconnect();
//   };
// }, [dispatch]);

// // 2️⃣ Fetch initial data on mount
// useEffect(() => {
//   console.log("📥 Fetching initial live employees data...");
//   dispatch(fetchLiveEmployees());
// }, [dispatch]);

// // 3️⃣ Update time every second
// useEffect(() => {
//   const timer = setInterval(() => setTime(new Date()), 1000);
//   return () => clearInterval(timer);
// }, []);

// // 4️⃣ Auto-refresh data every 30 seconds
// useEffect(() => {
//   if (!autoRefresh) return;
  
//   const refreshTimer = setInterval(() => {
//     console.log("🔄 Auto-refreshing tracking data...");
//     dispatch(fetchLiveEmployees());
//   }, 30000); // 30 seconds
  
//   return () => clearInterval(refreshTimer);
// }, [autoRefresh, dispatch]);

// // 5️⃣ Log employee changes for debugging
// useEffect(() => {
//   console.log("👥 Current employees:", employees.length, employees);
// }, [employees]);

//   // ================= HELPER FUNCTIONS =================
  
//   const filteredEmployees = employees.filter(employee => {
//     const matchesSearch = 
//       searchQuery === '' ||
//       employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (employee.currentActivity && employee.currentActivity.toLowerCase().includes(searchQuery.toLowerCase()));
    
//     const matchesStatus = 
//       filterStatus === 'All' || 
//       employee.status === filterStatus;
    
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'ACTIVE': return '✅';
//       case 'IDLE': return '😴';
//       case 'MEETING': return '📅';
//       case 'BREAK': return '☕';
//       case 'OFFLINE': return '🔴';
//       default: return '⏸️';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'ACTIVE': return '#10b981';
//       case 'IDLE': return '#f59e0b';
//       case 'MEETING': return '#3b82f6';
//       case 'BREAK': return '#ef4444';
//       case 'OFFLINE': return '#94a3b8';
//       default: return '#94a3b8';
//     }
//   };

//   const getAppIcon = (appName) => {
//     if (!appName) return '🖥️';
//     const app = appName.toLowerCase();
//     if (app.includes('chrome') || app.includes('browser')) return '🌐';
//     if (app.includes('vscode') || app.includes('code')) return '💻';
//     if (app.includes('figma')) return '🎨';
//     if (app.includes('zoom') || app.includes('meet')) return '📹';
//     if (app.includes('outlook') || app.includes('gmail')) return '📧';
//     if (app.includes('slack') || app.includes('teams')) return '💬';
//     if (app.includes('postman')) return '📡';
//     if (app.includes('excel') || app.includes('sheet')) return '📊';
//     if (app.includes('word') || app.includes('docs')) return '📝';
//     return '🖥️';
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds || seconds === 0) return '0m';
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
    
//     if (hours > 0) {
//       return `${hours}h ${minutes}m`;
//     }
//     return `${minutes}m`;
//   };

//   const calculateProductivity = (employee) => {
//     const workSeconds = employee.workSeconds || 0;
//     const idleSeconds = employee.idleSeconds || 0;
//     const total = workSeconds + idleSeconds;
    
//     if (total === 0) return 0;
//     return Math.round((workSeconds / total) * 100);
//   };

//   const getUpdateIcon = (type) => {
//     switch(type) {
//       case 'punch_in': return '👤';
//       case 'punch_out': return '🚪';
//       case 'status_change': return '🔄';
//       case 'app_change': return '💻';
//       case 'activity': return '🎯';
//       case 'meeting': return '📅';
//       case 'break': return '☕';
//       default: return '📢';
//     }
//   };

//   const getUpdateColor = (type) => {
//     switch(type) {
//       case 'punch_in': return '#10b981';
//       case 'punch_out': return '#ef4444';
//       case 'status_change': return '#3b82f6';
//       case 'app_change': return '#8b5cf6';
//       case 'activity': return '#f59e0b';
//       default: return '#94a3b8';
//     }
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return 'Just now';
//     const now = new Date();
//     const updateTime = new Date(timestamp);
//     const diffMs = now - updateTime;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     return `${Math.floor(diffHours / 24)}d ago`;
//   };

//   const statusStats = {
//     total: employees.length,
//     working: employees.filter(e => e.status === 'ACTIVE').length,
//     idle: employees.filter(e => e.status === 'IDLE').length,
//     meeting: employees.filter(e => e.status === 'MEETING').length,
//     break: employees.filter(e => e.status === 'BREAK').length,
//     offline: employees.filter(e => e.status === 'OFFLINE').length,
//   };

//   const activityData = [
//     { time: '9 AM', activity: 85 },
//     { time: '10 AM', activity: 92 },
//     { time: '11 AM', activity: 78 },
//     { time: '12 PM', activity: 45 },
//     { time: '1 PM', activity: 88 },
//     { time: '2 PM', activity: 95 },
//     { time: '3 PM', activity: 82 },
//     { time: '4 PM', activity: 76 },
//     { time: '5 PM', activity: 65 },
//   ];

//   const statusData = [
//     { name: 'Working', value: statusStats.working, color: '#10b981' },
//     { name: 'Idle', value: statusStats.idle, color: '#f59e0b' },
//     { name: 'Meeting', value: statusStats.meeting, color: '#3b82f6' },
//     { name: 'Break', value: statusStats.break, color: '#ef4444' },
//     { name: 'Offline', value: statusStats.offline, color: '#94a3b8' },
//   ];

//   // ================= RENDER FUNCTIONS =================
  
//   const renderStatusDistributionChart = () => {
//     const total = statusData.reduce((sum, item) => sum + item.value, 0);
//     const percentages = statusData.map(item => ({
//       ...item,
//       percentage: total > 0 ? Math.round((item.value / total) * 100) : 0
//     }));

//     return (
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '30px',
//         flexWrap: 'wrap'
//       }}>
//         <div style={{
//           width: '150px',
//           height: '150px',
//           borderRadius: '50%',
//           background: `conic-gradient(${percentages.map((item, index) => 
//             `${item.color} ${index === 0 ? '0%' : percentages.slice(0, index).reduce((a, b) => a + b.percentage, 0) + '%'} ` +
//             `${percentages.slice(0, index + 1).reduce((a, b) => a + b.percentage, 0)}%`
//           ).join(', ')})`,
//           position: 'relative',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}>
//           <div style={{
//             width: '100px',
//             height: '100px',
//             background: '#1e293b',
//             borderRadius: '50%',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             <span style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>{total}</span>
//             <span style={{ fontSize: '12px', color: '#94a3b8' }}>Employees</span>
//           </div>
//         </div>
        
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '12px'
//         }}>
//           {percentages.map((item, index) => (
//             <div key={index} style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               fontSize: '14px',
//               color: '#94a3b8'
//             }}>
//               <div style={{
//                 width: '12px',
//                 height: '12px',
//                 borderRadius: '50%',
//                 background: item.color
//               }}></div>
//               <span>{item.name} ({item.value})</span>
//               <span style={{ marginLeft: 'auto', color: '#f1f5f9' }}>{item.percentage}%</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderActivityTimeline = () => {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '12px',
//         marginTop: '10px'
//       }}>
//         {activityData.map((slot, index) => (
//           <div key={index} style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px'
//           }}>
//             <div style={{
//               width: '60px',
//               fontSize: '12px',
//               color: '#94a3b8'
//             }}>{slot.time}</div>
//             <div style={{
//               flex: 1,
//               height: '20px',
//               background: '#334155',
//               borderRadius: '10px',
//               overflow: 'hidden'
//             }}>
//               <div style={{
//                 width: `${slot.activity}%`,
//                 height: '100%',
//                 background: slot.activity > 70 ? '#10b981' : slot.activity > 40 ? '#3b82f6' : '#f59e0b',
//                 borderRadius: '10px',
//                 transition: 'width 0.3s ease'
//               }}></div>
//             </div>
//             <div style={{
//               width: '40px',
//               textAlign: 'right',
//               fontSize: '12px',
//               fontWeight: '600',
//               color: '#f1f5f9'
//             }}>{slot.activity}%</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderEmployeeCard = (employee) => {
//     const productivity = calculateProductivity(employee);
    
//     return (
//       <div 
//         key={employee.id}
//         className="employee-card"
//         onClick={() => {
//           setSelectedEmployee(employee);
//           setShowDetailModal(true);
//         }}
//         style={{
//           background: '#0f172a',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155',
//           cursor: 'pointer',
//           transition: 'all 0.2s',
//           position: 'relative',
//           overflow: 'hidden'
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = 'translateY(-4px)';
//           e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
//           e.currentTarget.style.borderColor = '#3b82f6';
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = 'translateY(0)';
//           e.currentTarget.style.boxShadow = 'none';
//           e.currentTarget.style.borderColor = '#334155';
//         }}
//       >
//         {/* Top gradient bar */}
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)'
//         }}></div>

//         {/* Card Header */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'flex-start',
//           marginBottom: '20px',
//           gap: '12px'
//         }}>
//           <div style={{ position: 'relative' }}>
//             <div style={{
//               width: '60px',
//               height: '60px',
//               borderRadius: '50%',
//               background: getStatusColor(employee.status),
//               border: `3px solid ${getStatusColor(employee.status)}50`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '24px',
//               fontWeight: '600',
//               color: 'white'
//             }}>
//               {employee.name.charAt(0)}
//             </div>
//             <div style={{
//               position: 'absolute',
//               bottom: 0,
//               right: 0,
//               width: '14px',
//               height: '14px',
//               borderRadius: '50%',
//               background: getStatusColor(employee.status),
//               border: '2px solid #0f172a'
//             }}></div>
//           </div>
          
//           <div style={{ flex: 1 }}>
//             <h4 style={{
//               fontSize: '18px',
//               fontWeight: '600',
//               margin: '0 0 4px 0',
//               color: '#f1f5f9'
//             }}>{employee.name}</h4>
//             <p style={{
//               color: '#94a3b8',
//               fontSize: '12px',
//               margin: '0 0 8px 0'
//             }}>{employee.empId}</p>
//             <div>
//               <span style={{
//                 background: 'rgba(59, 130, 246, 0.2)',
//                 color: '#3b82f6',
//                 padding: '4px 8px',
//                 borderRadius: '12px',
//                 fontSize: '12px',
//                 fontWeight: '500'
//               }}>{employee.department || 'Engineering'}</span>
//             </div>
//           </div>
          
//           <div style={{
//             padding: '6px 12px',
//             borderRadius: '20px',
//             fontSize: '12px',
//             fontWeight: '500',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '4px',
//             whiteSpace: 'nowrap',
//             background: `${getStatusColor(employee.status)}20`,
//             color: getStatusColor(employee.status)
//           }}>
//             {getStatusIcon(employee.status)} {employee.status}
//           </div>
//         </div>
        
//         {/* Card Body */}
//         <div style={{ marginBottom: '20px' }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Current Activity:</span>
//             <span style={{ color: '#f1f5f9', fontWeight: '500', textAlign: 'right', flex: 1 }}>
//               {employee.currentActivity || 'No activity'}
//             </span>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Application:</span>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: '500' }}>
//               <span style={{ fontSize: '16px' }}>{getAppIcon(employee.appName)}</span>
//               <span>{employee.appName || 'Not available'}</span>
//             </div>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Active Time:</span>
//             <span style={{ color: '#10b981', fontWeight: '600' }}>
//               {formatDuration(employee.workSeconds)}
//             </span>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Idle Time:</span>
//             <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//               {formatDuration(employee.idleSeconds)}
//             </span>
//           </div>
          
//           <div style={{ marginTop: '16px' }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '8px',
//               fontSize: '14px'
//             }}>
//               <span style={{ color: '#94a3b8' }}>Productivity:</span>
//               <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>{productivity}%</span>
//             </div>
//             <div style={{
//               height: '8px',
//               borderRadius: '4px',
//               background: '#334155',
//               overflow: 'hidden',
//               position: 'relative'
//             }}>
//               <div style={{
//                 height: '100%',
//                 borderRadius: '4px',
//                 width: `${productivity}%`,
//                 background: productivity > 70 ? '#10b981' : 
//                          productivity > 40 ? '#f59e0b' : '#ef4444',
//                 transition: 'width 0.3s ease'
//               }}></div>
//             </div>
//           </div>
//         </div>
        
//         {/* Card Footer */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           paddingTop: '16px',
//           borderTop: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '4px'
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
//               <span style={{ color: '#94a3b8' }}>Punch In:</span>
//               <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//                 {employee.punchInTime ? 
//                   new Date(employee.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
//                   'Not punched'
//                 }
//               </span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
//               <span style={{ color: '#94a3b8' }}>Today:</span>
//               <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//                 {formatDuration(employee.workSeconds + employee.idleSeconds)}
//               </span>
//             </div>
//           </div>
          
//           <button 
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedEmployee(employee);
//               setShowDetailModal(true);
//             }}
//             style={{
//               background: 'transparent',
//               color: '#3b82f6',
//               border: '1px solid #3b82f6',
//               padding: '6px 12px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '12px',
//               fontWeight: '500',
//               transition: 'all 0.2s'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//             }}
//           >
//             View Details →
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderEmployeeDetailModal = () => {
//     if (!selectedEmployee || !showDetailModal) return null;
    
//     const productivityScore = calculateProductivity(selectedEmployee);
    
//     return (
//       <div 
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.8)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000,
//           padding: '20px',
//           backdropFilter: 'blur(4px)'
//         }}
//         onClick={() => setShowDetailModal(false)}
//       >
//         <div 
//           style={{
//             background: '#0f172a',
//             borderRadius: '16px',
//             width: '100%',
//             maxWidth: '900px',
//             maxHeight: '90vh',
//             overflowY: 'auto',
//             border: '1px solid #334155',
//             boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Modal Header */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '24px',
//             borderBottom: '1px solid #334155',
//             position: 'sticky',
//             top: 0,
//             background: '#0f172a',
//             zIndex: 10,
//             borderRadius: '16px 16px 0 0'
//           }}>
//             <div>
//               <h2 style={{ margin: 0, fontSize: '24px', color: '#f1f5f9' }}>
//                 {selectedEmployee.name}'s Activity Details
//               </h2>
//               <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>
//                 Employee ID: {selectedEmployee.empId}
//               </p>
//             </div>
//             <button 
//               onClick={() => setShowDetailModal(false)}
//               style={{
//                 background: 'transparent',
//                 border: 'none',
//                 color: '#94a3b8',
//                 fontSize: '24px',
//                 cursor: 'pointer',
//                 width: '40px',
//                 height: '40px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: '8px',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               ✕
//             </button>
//           </div>

//           {/* Modal Body */}
//           <div style={{ padding: '24px' }}>
//             {/* Employee Overview */}
//             <div style={{
//               background: '#1e293b',
//               borderRadius: '12px',
//               padding: '24px',
//               marginBottom: '24px',
//               border: '1px solid #334155'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '20px',
//                 marginBottom: '24px',
//                 flexWrap: 'wrap'
//               }}>
//                 <div style={{
//                   width: '80px',
//                   height: '80px',
//                   borderRadius: '50%',
//                   background: getStatusColor(selectedEmployee.status),
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: '32px',
//                   fontWeight: '600',
//                   color: 'white',
//                   flexShrink: 0
//                 }}>
//                   {selectedEmployee.name.charAt(0)}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <h3 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#f1f5f9' }}>
//                     {selectedEmployee.name}
//                   </h3>
//                   <p style={{ color: '#3b82f6', fontWeight: '500', margin: '0 0 4px 0' }}>
//                     {selectedEmployee.role || 'Software Engineer'}
//                   </p>
//                   <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
//                     {selectedEmployee.department || 'Engineering Department'}
//                   </p>
//                 </div>
//                 <div style={{
//                   padding: '12px 20px',
//                   borderRadius: '24px',
//                   fontSize: '16px',
//                   fontWeight: '600',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   whiteSpace: 'nowrap',
//                   background: `${getStatusColor(selectedEmployee.status)}20`,
//                   color: getStatusColor(selectedEmployee.status)
//                 }}>
//                   {getStatusIcon(selectedEmployee.status)} {selectedEmployee.status}
//                 </div>
//               </div>

//               {/* Stats Grid */}
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//                 gap: '16px'
//               }}>
//                 <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
//                   <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Punch In</div>
//                   <div style={{ fontSize: '20px', fontWeight: '700', color: '#f1f5f9' }}>
//                     {selectedEmployee.punchInTime ? 
//                       new Date(selectedEmployee.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
//                       '--:--'
//                     }
//                   </div>
//                 </div>
//                 <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
//                   <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Active Time</div>
//                   <div style={{ fontSize: '20px', fontWeight: '700', color: '#10b981' }}>
//                     {formatDuration(selectedEmployee.workSeconds)}
//                   </div>
//                 </div>
//                 <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
//                   <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Idle Time</div>
//                   <div style={{ fontSize: '20px', fontWeight: '700', color: '#f59e0b' }}>
//                     {formatDuration(selectedEmployee.idleSeconds)}
//                   </div>
//                 </div>
//                 <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
//                   <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Productivity</div>
//                   <div style={{ fontSize: '20px', fontWeight: '700', color: productivityScore > 70 ? '#10b981' : '#f59e0b' }}>
//                     {productivityScore}%
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Current Activity */}
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>🎯 Current Activity</h3>
//               <div style={{
//                 background: '#1e293b',
//                 borderRadius: '12px',
//                 padding: '20px',
//                 border: '1px solid #334155'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginBottom: '20px',
//                   flexWrap: 'wrap',
//                   gap: '12px'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//                     <span style={{ fontSize: '32px' }}>{getAppIcon(selectedEmployee.appName)}</span>
//                     <div>
//                       <strong style={{ display: 'block', color: '#f1f5f9', fontSize: '14px', marginBottom: '4px' }}>
//                         {selectedEmployee.appName || 'Unknown Application'}
//                       </strong>
//                       <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>
//                         {selectedEmployee.currentActivity || 'No active task'}
//                       </p>
//                     </div>
//                   </div>
//                   <span style={{
//                     background: 'rgba(59, 130, 246, 0.2)',
//                     color: '#3b82f6',
//                     padding: '8px 16px',
//                     borderRadius: '20px',
//                     fontWeight: '600',
//                     fontSize: '14px'
//                   }}>
//                     {formatDuration(selectedEmployee.workSeconds + selectedEmployee.idleSeconds)}
//                   </span>
//                 </div>
//                 <div style={{ marginTop: '20px' }}>
//                   <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
//                     <div style={{
//                       height: '100%',
//                       borderRadius: '4px',
//                       width: `${Math.min(productivityScore, 100)}%`,
//                       background: getStatusColor(selectedEmployee.status),
//                       transition: 'width 0.3s ease'
//                     }}></div>
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
//                     <span>Start</span>
//                     <span>Now</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Time Breakdown */}
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>⏱️ Today's Time Breakdown</h3>
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '12px'
//               }}>
//                 {[
//                   { label: 'Active Work', value: selectedEmployee.workSeconds, color: '#10b981' },
//                   { label: 'Idle Time', value: selectedEmployee.idleSeconds, color: '#f59e0b' },
//                   { label: 'Meetings', value: selectedEmployee.meetingSeconds || 0, color: '#3b82f6' },
//                   { label: 'Breaks', value: selectedEmployee.breakSeconds || 0, color: '#ef4444' }
//                 ].map((item, index) => {
//                   const total = selectedEmployee.workSeconds + selectedEmployee.idleSeconds + 
//                               (selectedEmployee.meetingSeconds || 0) + (selectedEmployee.breakSeconds || 0);
//                   const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
                  
//                   return (
//                     <div key={index} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '16px',
//                       flexWrap: 'wrap'
//                     }}>
//                       <div style={{ width: '120px', color: '#94a3b8', fontSize: '14px' }}>{item.label}</div>
//                       <div style={{ flex: 1, height: '12px', background: '#334155', borderRadius: '6px', overflow: 'hidden' }}>
//                         <div style={{
//                           height: '100%',
//                           borderRadius: '6px',
//                           width: `${percentage}%`,
//                           background: item.color,
//                           transition: 'width 0.3s ease'
//                         }}></div>
//                       </div>
//                       <div style={{ width: '80px', textAlign: 'right', fontWeight: '600', color: '#f1f5f9', fontSize: '14px' }}>
//                         {formatDuration(item.value)}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Activity History */}
//             <div style={{ marginBottom: '24px' }}>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>📋 Recent Activity History</h3>
//               <div style={{
//                 background: '#1e293b',
//                 borderRadius: '12px',
//                 border: '1px solid #334155',
//                 maxHeight: '300px',
//                 overflowY: 'auto'
//               }}>
//                 {activityHistory.length > 0 ? (
//                   activityHistory.map((activity, index) => (
//                     <div key={index} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       padding: '16px',
//                       borderBottom: '1px solid #334155',
//                       transition: 'background 0.2s',
//                       cursor: 'pointer'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = 'transparent';
//                     }}>
//                       <div style={{ width: '80px', color: '#94a3b8', fontSize: '12px', fontWeight: '500' }}>
//                         {activity.time}
//                       </div>
//                       <div style={{ width: '40px', fontSize: '20px', textAlign: 'center' }}>
//                         {getAppIcon(activity.app)}
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <strong style={{ display: 'block', color: '#f1f5f9', fontSize: '14px', marginBottom: '4px' }}>
//                           {activity.app}
//                         </strong>
//                         <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>{activity.activity}</p>
//                       </div>
//                       <div style={{ width: '80px', textAlign: 'right', color: '#3b82f6', fontWeight: '600', fontSize: '14px' }}>
//                         {formatDuration(activity.duration)}
//                       </div>
//                       <div style={{ width: '40px', textAlign: 'center', fontSize: '20px', color: getStatusColor('ACTIVE') }}>
//                         {getStatusIcon('ACTIVE')}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
//                     No activity history available
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Performance Metrics */}
//             <div>
//               <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>📊 Performance Metrics</h3>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//                 gap: '16px'
//               }}>
//                 {[
//                   { icon: '🎯', title: 'Productivity Score', value: `${productivityScore}%`, subtitle: "Today's performance" },
//                   { icon: '📅', title: 'Attendance Rate', value: '95%', subtitle: 'This month' },
//                   { icon: '⏱️', title: 'Avg. Active Hours', value: '7h 30m', subtitle: 'Last 30 days' },
//                   { icon: '📈', title: 'Avg. Productivity', value: '78%', subtitle: 'Monthly average' }
//                 ].map((metric, index) => (
//                   <div key={index} style={{
//                     background: '#1e293b',
//                     borderRadius: '12px',
//                     padding: '20px',
//                     border: '1px solid #334155',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '16px'
//                   }}>
//                     <div style={{ fontSize: '32px', opacity: 0.9 }}>{metric.icon}</div>
//                     <div>
//                       <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#94a3b8' }}>{metric.title}</h4>
//                       <p style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 4px 0' }}>
//                         {metric.value}
//                       </p>
//                       <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>{metric.subtitle}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '24px',
//             borderTop: '1px solid #334155',
//             background: '#0f172a',
//             borderRadius: '0 0 16px 16px',
//             position: 'sticky',
//             bottom: 0,
//             flexWrap: 'wrap',
//             gap: '16px'
//           }}>
//             <button 
//               onClick={() => setShowDetailModal(false)}
//               style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               Close
//             </button>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
//               <button style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}>
//                 💬 Message
//               </button>
//               <button style={{
//                 background: 'transparent',
//                 color: '#94a3b8',
//                 border: '1px solid #334155',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}>
//                 📷 Screenshots
//               </button>
//               <button style={{
//                 background: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 transition: 'background 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#2563eb';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = '#3b82f6';
//               }}>
//                 Export Details
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderRealTimeUpdates = () => {
//     return (
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '20px',
//         marginTop: '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: showUpdates ? '16px' : '0'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <h3 style={{ margin: 0, fontSize: '18px', color: '#f1f5f9' }}>🔄 Real-time Updates</h3>
//             <span style={{
//               background: '#3b82f6',
//               color: 'white',
//               fontSize: '12px',
//               fontWeight: '600',
//               padding: '2px 8px',
//               borderRadius: '12px',
//               minWidth: '20px',
//               textAlign: 'center'
//             }}>
//               {realTimeUpdates.length}
//             </span>
//           </div>
//           <button 
//             onClick={() => setShowUpdates(!showUpdates)}
//             style={{
//               background: 'transparent',
//               color: '#94a3b8',
//               border: '1px solid #334155',
//               padding: '6px 12px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '12px',
//               fontWeight: '500',
//               transition: 'all 0.2s'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#334155';
//               e.currentTarget.style.color = '#f1f5f9';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#94a3b8';
//             }}
//           >
//             {showUpdates ? 'Hide' : 'Show'} Updates
//           </button>
//         </div>

//         {showUpdates && (
//           <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
//             {realTimeUpdates.length > 0 ? (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                 {realTimeUpdates.map((update) => (
//                   <div 
//                     key={update.id}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'flex-start',
//                       gap: '12px',
//                       padding: '12px',
//                       background: 'rgba(255, 255, 255, 0.05)',
//                       borderRadius: '8px',
//                       borderLeft: `3px solid ${getUpdateColor(update.type)}`,
//                       transition: 'background 0.2s'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                     }}
//                   >
//                     <div style={{ fontSize: '20px', flexShrink: 0, color: getUpdateColor(update.type) }}>
//                       {getUpdateIcon(update.type)}
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <div style={{ color: '#f1f5f9', fontSize: '14px', lineHeight: '1.4', marginBottom: '4px' }}>
//                         <strong style={{ color: '#3b82f6' }}>{update.employeeName}</strong> {update.message}
//                       </div>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
//                         <span>{formatTime(update.timestamp)}</span>
//                         <span>{update.type.replace('_', ' ')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div style={{ textAlign: 'center', padding: '40px 20px' }}>
//                 <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
//                 <p style={{ color: '#94a3b8', margin: '0 0 8px 0' }}>No recent updates</p>
//                 <small style={{ color: '#64748b', fontSize: '12px' }}>Updates will appear here in real-time</small>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // ================= MAIN RENDER =================
  
//   return (
//     <div style={{
//       padding: '20px',
//       background: '#0f172a',
//       minHeight: '100vh',
//       color: '#f1f5f9'
//     }}>
//       {/* Loading State */}
//       {loading && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.7)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 9999
//         }}>
//           <div style={{
//             background: '#1e293b',
//             padding: '30px',
//             borderRadius: '12px',
//             textAlign: 'center',
//             border: '1px solid #334155'
//           }}>
//             <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
//             <h3 style={{ color: '#f1f5f9', marginBottom: '8px' }}>Loading Live Data</h3>
//             <p style={{ color: '#94a3b8' }}>Fetching real-time employee tracking data...</p>
//           </div>
//         </div>
//       )}

//       {/* Error State */}
//       {error && (
//         <div style={{
//           background: '#ef4444',
//           color: 'white',
//           padding: '16px',
//           borderRadius: '8px',
//           marginBottom: '20px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <span>⚠️ Error: {error}</span>
//           <button 
//             onClick={() => dispatch(fetchLiveEmployees())}
//             style={{
//               background: 'white',
//               color: '#ef4444',
//               border: 'none',
//               padding: '8px 16px',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontWeight: '600'
//             }}
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Dashboard Header */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: '24px',
//         flexWrap: 'wrap',
//         gap: '20px'
//       }}>
//         <div style={{ flex: 1, minWidth: '300px' }}>
//           <h1 style={{
//             fontSize: '28px',
//             fontWeight: '700',
//             color: '#f1f5f9',
//             margin: '0 0 8px 0',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px'
//           }}>
//             <span style={{ fontSize: '32px' }}>📡</span>
//             Employee Tracking Dashboard
//           </h1>
//           <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
//             Real-time monitoring • {filteredEmployees.length} employees online • 
//             Last updated: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//           </p>
//         </div>
        
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '16px',
//             flexWrap: 'wrap'
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#94a3b8' }}>
//                 <input 
//                   type="checkbox" 
//                   checked={autoRefresh}
//                   onChange={(e) => setAutoRefresh(e.target.checked)}
//                   style={{ display: 'none' }}
//                 />
//                 <div style={{
//                   width: '18px',
//                   height: '18px',
//                   border: '2px solid #475569',
//                   borderRadius: '4px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   transition: 'all 0.2s'
//                 }}>
//                   {autoRefresh && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
//                 </div>
//                 <span>Auto Refresh (30s)</span>
//               </label>
//             </div>
            
//             <div style={{ display: 'flex', background: '#1e293b', borderRadius: '8px', padding: '4px' }}>
//               <button 
//                 style={{
//                   padding: '6px 12px',
//                   border: 'none',
//                   background: viewMode === 'grid' ? '#334155' : 'transparent',
//                   color: viewMode === 'grid' ? '#f1f5f9' : '#94a3b8',
//                   cursor: 'pointer',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   transition: 'all 0.2s'
//                 }}
//                 onClick={() => setViewMode('grid')}
//               >
//                 ▦ Grid
//               </button>
//               <button 
//                 style={{
//                   padding: '6px 12px',
//                   border: 'none',
//                   background: viewMode === 'list' ? '#334155' : 'transparent',
//                   color: viewMode === 'list' ? '#f1f5f9' : '#94a3b8',
//                   cursor: 'pointer',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   transition: 'all 0.2s'
//                 }}
//                 onClick={() => setViewMode('list')}
//               >
//                 ≡ List
//               </button>
//             </div>
            
//             <button 
//               style={{
//                 background: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 padding: '8px 16px',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 transition: 'background 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#2563eb';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = '#3b82f6';
//               }}
//               onClick={() => dispatch(fetchLiveEmployees())}
//             >
//               <span>🔄</span>
//               Refresh Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//         gap: '20px',
//         marginBottom: '24px'
//       }}>
//         {[
//           { icon: '👥', value: statusStats.total, label: 'Total Employees', trend: `${employees.filter(e => e.status !== 'OFFLINE').length} online`, color: '#8b5cf6' },
//           { icon: '✅', value: statusStats.working, label: 'Productive', trend: 'Active now', color: '#10b981' },
//           { icon: '😴', value: statusStats.idle, label: 'Idle', trend: 'Need attention', color: '#f59e0b' },
//           { icon: '📊', value: '78%', label: 'Avg Productivity', trend: '+2% from yesterday', color: '#3b82f6' }
//         ].map((stat, index) => (
//           <div key={index} style={{
//             background: '#1e293b',
//             borderRadius: '12px',
//             padding: '20px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '16px',
//             border: '1px solid #334155',
//             borderLeft: `4px solid ${stat.color}`,
//             transition: 'transform 0.2s, box-shadow 0.2s'
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = 'translateY(-2px)';
//             e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = 'translateY(0)';
//             e.currentTarget.style.boxShadow = 'none';
//           }}>
//             <div style={{ fontSize: '32px', opacity: 0.9 }}>{stat.icon}</div>
//             <div style={{ flex: 1 }}>
//               <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 4px 0', color: '#f1f5f9' }}>
//                 {stat.value}
//               </h3>
//               <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 8px 0' }}>{stat.label}</p>
//               <div style={{ fontSize: '12px', color: stat.color }}>{stat.trend}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filters & Search */}
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '20px',
//         marginBottom: '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{ position: 'relative', marginBottom: '16px' }}>
//           <span style={{
//             position: 'absolute',
//             left: '16px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: '#94a3b8',
//             fontSize: '18px'
//           }}>🔍</span>
//           <input 
//             type="text" 
//             style={{
//               width: '100%',
//               padding: '12px 48px 12px 48px',
//               background: '#0f172a',
//               border: '1px solid #334155',
//               borderRadius: '8px',
//               color: '#f1f5f9',
//               fontSize: '14px',
//               transition: 'border-color 0.2s'
//             }}
//             placeholder="Search employees by name, ID, department, or activity..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onFocus={(e) => {
//               e.target.style.borderColor = '#3b82f6';
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = '#334155';
//             }}
//           />
//           {searchQuery && (
//             <button 
//               style={{
//                 position: 'absolute',
//                 right: '16px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: 'transparent',
//                 border: 'none',
//                 color: '#94a3b8',
//                 cursor: 'pointer',
//                 fontSize: '18px',
//                 padding: 0,
//                 width: '24px',
//                 height: '24px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//               onClick={() => setSearchQuery('')}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               ✕
//             </button>
//           )}
//         </div>
        
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '16px',
//           flexWrap: 'wrap'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <label style={{ color: '#94a3b8', fontSize: '14px', whiteSpace: 'nowrap' }}>Status Filter:</label>
//             <select 
//               style={{
//                 padding: '8px 12px',
//                 background: '#0f172a',
//                 border: '1px solid #334155',
//                 borderRadius: '6px',
//                 color: '#f1f5f9',
//                 fontSize: '14px',
//                 minWidth: '150px',
//                 cursor: 'pointer'
//               }}
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="All">All Status</option>
//               <option value="ACTIVE">Working ✅</option>
//               <option value="IDLE">Idle 😴</option>
//               <option value="MEETING">Meeting 📅</option>
//               <option value="BREAK">Break ☕</option>
//               <option value="OFFLINE">Offline 🔴</option>
//             </select>
//           </div>
          
//           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <label style={{ color: '#94a3b8', fontSize: '14px', whiteSpace: 'nowrap' }}>Sort By:</label>
//             <select style={{
//               padding: '8px 12px',
//               background: '#0f172a',
//               border: '1px solid #334155',
//               borderRadius: '6px',
//               color: '#f1f5f9',
//               fontSize: '14px',
//               minWidth: '150px',
//               cursor: 'pointer'
//             }}>
//               <option value="name">Name A-Z</option>
//               <option value="productivity">Productivity</option>
//               <option value="time">Active Time</option>
//               <option value="status">Status</option>
//             </select>
//           </div>
          
//           <button 
//             style={{
//               background: 'transparent',
//               color: '#94a3b8',
//               border: '1px solid #334155',
//               padding: '8px 16px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               transition: 'all 0.2s',
//               marginLeft: 'auto'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = '#334155';
//               e.currentTarget.style.color = '#f1f5f9';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#94a3b8';
//             }}
//           >
//             <span>📥</span>
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
//         gap: '20px',
//         marginBottom: '24px'
//       }}>
//         {/* Activity Timeline */}
//         <div style={{
//           background: '#1e293b',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <h3 style={{ fontSize: '18px', margin: 0, color: '#f1f5f9' }}>📈 Activity Timeline (Today)</h3>
//             <span style={{ color: '#94a3b8', fontSize: '12px' }}>Peak productive hours</span>
//           </div>
//           {renderActivityTimeline()}
//         </div>
        
//         {/* Status Distribution */}
//         <div style={{
//           background: '#1e293b',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <h3 style={{ fontSize: '18px', margin: 0, color: '#f1f5f9' }}>📊 Status Distribution</h3>
//             <span style={{ color: '#94a3b8', fontSize: '12px' }}>Current employee status</span>
//           </div>
//           {renderStatusDistributionChart()}
//         </div>
//       </div>

//       {/* Employees Section */}
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '24px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{ marginBottom: '20px' }}>
//           <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#f1f5f9' }}>👥 Employee Tracking</h2>
//           <span style={{ color: '#94a3b8', fontSize: '14px' }}>
//             {filteredEmployees.length} employees found • {filterStatus !== 'All' ? `Filtered by: ${filterStatus}` : 'Showing all statuses'}
//           </span>
//         </div>
        
//         {/* Employees Grid */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(350px, 1fr))' : '1fr',
//           gap: '20px'
//         }}>
//           {filteredEmployees.length > 0 ? (
//             filteredEmployees.map(renderEmployeeCard)
//           ) : (
//             <div style={{ textAlign: 'center', padding: '60px 20px' }}>
//               <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>🔍</div>
//               <h3 style={{ fontSize: '20px', color: '#f1f5f9', margin: '0 0 8px 0' }}>No employees found</h3>
//               <p style={{ color: '#94a3b8', margin: '0 0 20px 0' }}>Try adjusting your search or filter criteria</p>
//               <button 
//                 style={{
//                   background: '#3b82f6',
//                   color: 'white',
//                   border: 'none',
//                   padding: '10px 20px',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500'
//                 }}
//                 onClick={() => {
//                   setSearchQuery('');
//                   setFilterStatus('All');
//                 }}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Real-time Updates */}
//       {renderRealTimeUpdates()}

//       {/* Employee Detail Modal */}
//       {renderEmployeeDetailModal()}
//     </div>
//   );
// };

// export default LiveTrackingPage;






// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchLiveEmployees } from '../../../redux/slices/liveTrackingSlice';
// import socketClient from '../../../services/socketClient';

// const LiveTrackingPage = () => {
//   // ================= STATE MANAGEMENT =================
//   const [time, setTime] = useState(new Date());
//   const [autoRefresh, setAutoRefresh] = useState(true);
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [viewMode, setViewMode] = useState('grid');
//   const [showUpdates, setShowUpdates] = useState(true);
//   const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  
//   // ================= REDUX =================
//   const dispatch = useDispatch();
  
//   // ✅ FIXED: Correct selector with proper path
//   const { employees: reduxEmployees, loading, error } = useSelector(
//     (state) => state.adminLiveTracking || { employees: [], loading: false, error: null }
//   );
  
//   // ✅ FIXED: Always ensure it's an array with fallback
//   const safeReduxEmployees = Array.isArray(reduxEmployees) ? reduxEmployees : [];
  
//   // Transform redux employees to match UI structure
//   const employees = safeReduxEmployees.map(emp => ({
//     id: emp.employeeId || emp.id,
//     name: emp.name || 'Unknown Employee',
//     empId: emp.empId || emp.empCode || emp.employeeId || 'N/A',
//     department: emp.department || 'Engineering',
//     role: emp.role || 'Employee',
//     status: emp.status || 'WORKING',
//     workSeconds: emp.workSeconds || 0,
//     idleSeconds: emp.idleSeconds || 0,
//     punchInTime: emp.startAt || emp.punchInTime,
//     lastActiveAt: emp.lastActiveAt,
//     currentActivity: emp.currentActivity || 'Working on tasks',
//     appName: emp.appName || 'System',
//     lastActive: emp.lastActive || 'Just now',
//     productivity: emp.productivity || Math.round((emp.workSeconds / (emp.workSeconds + emp.idleSeconds || 1)) * 100) || 85,
//     meetingSeconds: emp.meetingSeconds || 0,
//     breakSeconds: emp.breakSeconds || 0,
//     email: emp.email || '',
//     phone: emp.phone || ''
//   }));

//   console.log('🔍 Debug - Redux State:', {
//     reduxEmployees,
//     length: safeReduxEmployees.length,
//     isArray: Array.isArray(reduxEmployees),
//     employees: employees.length
//   });

//   // Activity history for detailed view
//   const activityHistory = [
//     { time: '09:00 AM', app: 'VS Code', activity: 'Started working on login page', duration: 1800 },
//     { time: '09:30 AM', app: 'Slack', activity: 'Team standup meeting', duration: 900 },
//     { time: '10:00 AM', app: 'VS Code', activity: 'Fixed authentication bug', duration: 2700 },
//     { time: '10:45 AM', app: 'Zoom', activity: 'Client demo meeting', duration: 1800 },
//     { time: '11:15 AM', app: 'VS Code', activity: 'Code review', duration: 2100 },
//     { time: '12:00 PM', app: 'Chrome', activity: 'Research and documentation', duration: 1800 }
//   ];

//   // ================= USE EFFECTS =================

//   // 1️⃣ Initialize socket connection ONCE on mount
//   useEffect(() => {
//     console.log("🔌 Initializing socket connection...");
//     socketClient.initialize(dispatch);

//     return () => {
//       console.log("🔌 Cleaning up socket connection...");
//       socketClient.disconnect();
//     };
//   }, [dispatch]);

//   // 2️⃣ Fetch initial data on mount
//   useEffect(() => {
//     console.log("📥 Fetching initial live employees data...");
//     dispatch(fetchLiveEmployees());
//   }, [dispatch]);

//   // 3️⃣ Update time every second
//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // 4️⃣ Auto-refresh data every 30 seconds
//   useEffect(() => {
//     if (!autoRefresh) return;
    
//     const refreshTimer = setInterval(() => {
//       console.log("🔄 Auto-refreshing tracking data...");
//       dispatch(fetchLiveEmployees());
//     }, 30000);
    
//     return () => clearInterval(refreshTimer);
//   }, [autoRefresh, dispatch]);

//   // ================= HELPER FUNCTIONS =================
  
//   const filteredEmployees = employees.filter(employee => {
//     const matchesSearch = 
//       searchQuery === '' ||
//       employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (employee.currentActivity && employee.currentActivity.toLowerCase().includes(searchQuery.toLowerCase()));
    
//     const matchesStatus = 
//       filterStatus === 'All' || 
//       employee.status === filterStatus;
    
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'ACTIVE': 
//       case 'WORKING': return '✅';
//       case 'IDLE': return '😴';
//       case 'MEETING': return '📅';
//       case 'BREAK': return '☕';
//       case 'OFFLINE': return '🔴';
//       default: return '⏸️';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'ACTIVE':
//       case 'WORKING': return '#10b981';
//       case 'IDLE': return '#f59e0b';
//       case 'MEETING': return '#3b82f6';
//       case 'BREAK': return '#ef4444';
//       case 'OFFLINE': return '#94a3b8';
//       default: return '#94a3b8';
//     }
//   };

//   const getAppIcon = (appName) => {
//     if (!appName) return '🖥️';
//     const app = appName.toLowerCase();
//     if (app.includes('chrome') || app.includes('browser')) return '🌐';
//     if (app.includes('vscode') || app.includes('code')) return '💻';
//     if (app.includes('figma')) return '🎨';
//     if (app.includes('zoom') || app.includes('meet')) return '📹';
//     if (app.includes('outlook') || app.includes('gmail')) return '📧';
//     if (app.includes('slack') || app.includes('teams')) return '💬';
//     if (app.includes('postman')) return '📡';
//     if (app.includes('excel') || app.includes('sheet')) return '📊';
//     if (app.includes('word') || app.includes('docs')) return '📝';
//     return '🖥️';
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds || seconds === 0) return '0m';
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
    
//     if (hours > 0) {
//       return `${hours}h ${minutes}m`;
//     }
//     return `${minutes}m`;
//   };

//   const calculateProductivity = (employee) => {
//     const workSeconds = employee.workSeconds || 0;
//     const idleSeconds = employee.idleSeconds || 0;
//     const total = workSeconds + idleSeconds;
    
//     if (total === 0) return 0;
//     return Math.round((workSeconds / total) * 100);
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return 'Just now';
//     const now = new Date();
//     const updateTime = new Date(timestamp);
//     const diffMs = now - updateTime;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     return `${Math.floor(diffHours / 24)}d ago`;
//   };

//   const statusStats = {
//     total: employees.length,
//     working: employees.filter(e => e.status === 'ACTIVE' || e.status === 'WORKING').length,
//     idle: employees.filter(e => e.status === 'IDLE').length,
//     meeting: employees.filter(e => e.status === 'MEETING').length,
//     break: employees.filter(e => e.status === 'BREAK').length,
//     offline: employees.filter(e => e.status === 'OFFLINE').length,
//   };

//   // ================= RENDER FUNCTIONS =================
  
//   const renderStatusDistributionChart = () => {
//     const statusData = [
//       { name: 'Working', value: statusStats.working, color: '#10b981' },
//       { name: 'Idle', value: statusStats.idle, color: '#f59e0b' },
//       { name: 'Meeting', value: statusStats.meeting, color: '#3b82f6' },
//       { name: 'Break', value: statusStats.break, color: '#ef4444' },
//       { name: 'Offline', value: statusStats.offline, color: '#94a3b8' },
//     ];

//     const total = statusData.reduce((sum, item) => sum + item.value, 0);
//     if (total === 0) {
//       return (
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: '30px',
//           flexWrap: 'wrap'
//         }}>
//           <div style={{
//             width: '150px',
//             height: '150px',
//             borderRadius: '50%',
//             background: '#1e293b',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'column'
//           }}>
//             <span style={{ fontSize: '24px', fontWeight: '700', color: '#94a3b8' }}>0</span>
//             <span style={{ fontSize: '12px', color: '#64748b' }}>No Employees</span>
//           </div>
//         </div>
//       );
//     }

//     const percentages = statusData.map(item => ({
//       ...item,
//       percentage: Math.round((item.value / total) * 100)
//     }));

//     let cumulative = 0;
//     const gradientParts = percentages.map(item => {
//       const start = cumulative;
//       cumulative += item.percentage;
//       return `${item.color} ${start}% ${cumulative}%`;
//     });

//     return (
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '30px',
//         flexWrap: 'wrap'
//       }}>
//         <div style={{
//           width: '150px',
//           height: '150px',
//           borderRadius: '50%',
//           background: `conic-gradient(${gradientParts.join(', ')})`,
//           position: 'relative',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}>
//           <div style={{
//             width: '100px',
//             height: '100px',
//             background: '#1e293b',
//             borderRadius: '50%',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             <span style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>{total}</span>
//             <span style={{ fontSize: '12px', color: '#94a3b8' }}>Employees</span>
//           </div>
//         </div>
        
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '12px'
//         }}>
//           {percentages.map((item, index) => (
//             <div key={index} style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               fontSize: '14px',
//               color: '#94a3b8'
//             }}>
//               <div style={{
//                 width: '12px',
//                 height: '12px',
//                 borderRadius: '50%',
//                 background: item.color
//               }}></div>
//               <span>{item.name} ({item.value})</span>
//               <span style={{ marginLeft: 'auto', color: '#f1f5f9' }}>{item.percentage}%</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderEmployeeCard = (employee) => {
//     const productivity = calculateProductivity(employee);
    
//     return (
//       <div 
//         key={employee.id}
//         className="employee-card"
//         onClick={() => {
//           setSelectedEmployee(employee);
//           setShowDetailModal(true);
//         }}
//         style={{
//           background: '#0f172a',
//           borderRadius: '12px',
//           padding: '20px',
//           border: '1px solid #334155',
//           cursor: 'pointer',
//           transition: 'all 0.2s',
//           position: 'relative',
//           overflow: 'hidden'
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = 'translateY(-4px)';
//           e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
//           e.currentTarget.style.borderColor = '#3b82f6';
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = 'translateY(0)';
//           e.currentTarget.style.boxShadow = 'none';
//           e.currentTarget.style.borderColor = '#334155';
//         }}
//       >
//         {/* Top gradient bar */}
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)'
//         }}></div>

//         {/* Card Header */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'flex-start',
//           marginBottom: '20px',
//           gap: '12px'
//         }}>
//           <div style={{ position: 'relative' }}>
//             <div style={{
//               width: '60px',
//               height: '60px',
//               borderRadius: '50%',
//               background: getStatusColor(employee.status),
//               border: `3px solid ${getStatusColor(employee.status)}50`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '24px',
//               fontWeight: '600',
//               color: 'white'
//             }}>
//               {employee.name.charAt(0)}
//             </div>
//             <div style={{
//               position: 'absolute',
//               bottom: 0,
//               right: 0,
//               width: '14px',
//               height: '14px',
//               borderRadius: '50%',
//               background: getStatusColor(employee.status),
//               border: '2px solid #0f172a'
//             }}></div>
//           </div>
          
//           <div style={{ flex: 1 }}>
//             <h4 style={{
//               fontSize: '18px',
//               fontWeight: '600',
//               margin: '0 0 4px 0',
//               color: '#f1f5f9'
//             }}>{employee.name}</h4>
//             <p style={{
//               color: '#94a3b8',
//               fontSize: '12px',
//               margin: '0 0 8px 0'
//             }}>{employee.empId}</p>
//             <div>
//               <span style={{
//                 background: 'rgba(59, 130, 246, 0.2)',
//                 color: '#3b82f6',
//                 padding: '4px 8px',
//                 borderRadius: '12px',
//                 fontSize: '12px',
//                 fontWeight: '500'
//               }}>{employee.department || 'Engineering'}</span>
//             </div>
//           </div>
          
//           <div style={{
//             padding: '6px 12px',
//             borderRadius: '20px',
//             fontSize: '12px',
//             fontWeight: '500',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '4px',
//             whiteSpace: 'nowrap',
//             background: `${getStatusColor(employee.status)}20`,
//             color: getStatusColor(employee.status)
//           }}>
//             {getStatusIcon(employee.status)} {employee.status}
//           </div>
//         </div>
        
//         {/* Card Body */}
//         <div style={{ marginBottom: '20px' }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Current Activity:</span>
//             <span style={{ color: '#f1f5f9', fontWeight: '500', textAlign: 'right', flex: 1 }}>
//               {employee.currentActivity || 'No activity'}
//             </span>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Application:</span>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: '500' }}>
//               <span style={{ fontSize: '16px' }}>{getAppIcon(employee.appName)}</span>
//               <span>{employee.appName || 'Not available'}</span>
//             </div>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Active Time:</span>
//             <span style={{ color: '#10b981', fontWeight: '600' }}>
//               {formatDuration(employee.workSeconds)}
//             </span>
//           </div>
          
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '12px',
//             fontSize: '14px'
//           }}>
//             <span style={{ color: '#94a3b8', minWidth: '120px' }}>Idle Time:</span>
//             <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//               {formatDuration(employee.idleSeconds)}
//             </span>
//           </div>
          
//           <div style={{ marginTop: '16px' }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '8px',
//               fontSize: '14px'
//             }}>
//               <span style={{ color: '#94a3b8' }}>Productivity:</span>
//               <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>{productivity}%</span>
//             </div>
//             <div style={{
//               height: '8px',
//               borderRadius: '4px',
//               background: '#334155',
//               overflow: 'hidden',
//               position: 'relative'
//             }}>
//               <div style={{
//                 height: '100%',
//                 borderRadius: '4px',
//                 width: `${productivity}%`,
//                 background: productivity > 70 ? '#10b981' : 
//                          productivity > 40 ? '#f59e0b' : '#ef4444',
//                 transition: 'width 0.3s ease'
//               }}></div>
//             </div>
//           </div>
//         </div>
        
//         {/* Card Footer */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           paddingTop: '16px',
//           borderTop: '1px solid #334155'
//         }}>
//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '4px'
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
//               <span style={{ color: '#94a3b8' }}>Punch In:</span>
//               <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//                 {employee.punchInTime ? 
//                   new Date(employee.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
//                   'Not punched'
//                 }
//               </span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
//               <span style={{ color: '#94a3b8' }}>Today:</span>
//               <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
//                 {formatDuration(employee.workSeconds + employee.idleSeconds)}
//               </span>
//             </div>
//           </div>
          
//           <button 
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedEmployee(employee);
//               setShowDetailModal(true);
//             }}
//             style={{
//               background: 'transparent',
//               color: '#3b82f6',
//               border: '1px solid #3b82f6',
//               padding: '6px 12px',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '12px',
//               fontWeight: '500',
//               transition: 'all 0.2s'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent';
//             }}
//           >
//             View Details →
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderEmployeeDetailModal = () => {
//     if (!selectedEmployee || !showDetailModal) return null;
    
//     const productivityScore = calculateProductivity(selectedEmployee);
    
//     return (
//       <div 
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.8)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000,
//           padding: '20px',
//           backdropFilter: 'blur(4px)'
//         }}
//         onClick={() => setShowDetailModal(false)}
//       >
//         <div 
//           style={{
//             background: '#0f172a',
//             borderRadius: '16px',
//             width: '100%',
//             maxWidth: '900px',
//             maxHeight: '90vh',
//             overflowY: 'auto',
//             border: '1px solid #334155',
//             boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Modal Header */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '24px',
//             borderBottom: '1px solid #334155',
//             position: 'sticky',
//             top: 0,
//             background: '#0f172a',
//             zIndex: 10,
//             borderRadius: '16px 16px 0 0'
//           }}>
//             <div>
//               <h2 style={{ margin: 0, fontSize: '24px', color: '#f1f5f9' }}>
//                 {selectedEmployee.name}'s Activity Details
//               </h2>
//               <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>
//                 Employee ID: {selectedEmployee.empId}
//               </p>
//             </div>
//             <button 
//               onClick={() => setShowDetailModal(false)}
//               style={{
//                 background: 'transparent',
//                 border: 'none',
//                 color: '#94a3b8',
//                 fontSize: '24px',
//                 cursor: 'pointer',
//                 width: '40px',
//                 height: '40px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: '8px',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#334155';
//                 e.currentTarget.style.color = '#f1f5f9';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = '#94a3b8';
//               }}
//             >
//               ✕
//             </button>
//           </div>

//           {/* Modal Body */}
//           <div style={{ padding: '24px' }}>
//             {/* Employee Overview */}
//             <div style={{
//               background: '#1e293b',
//               borderRadius: '12px',
//               padding: '24px',
//               marginBottom: '24px',
//               border: '1px solid #334155'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '20px',
//                 marginBottom: '24px',
//                 flexWrap: 'wrap'
//               }}>
//                 <div style={{
//                   width: '80px',
//                   height: '80px',
//                   borderRadius: '50%',
//                   background: getStatusColor(selectedEmployee.status),
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: '32px',
//                   fontWeight: '600',
//                   color: 'white',
//                   flexShrink: 0
//                 }}>
//                   {selectedEmployee.name.charAt(0)}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <h3 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#f1f5f9' }}>
//                     {selectedEmployee.name}
//                   </h3>
//                   <p style={{ color: '#3b82f6', fontWeight: '500', margin: '0 0 4px 0' }}>
//                     {selectedEmployee.role || 'Software Engineer'}
//                   </p>
//                   <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
//                     {selectedEmployee.department || 'Engineering Department'}
//                   </p>
//                 </div>
//                 <div style={{
//                   padding: '12px 20px',
//                   borderRadius: '24px',
//                   fontSize: '16px',
//                   fontWeight: '600',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   whiteSpace: 'nowrap',
//                   background: `${getStatusColor(selectedEmployee.status)}20`,
//                   color: getStatusColor(selectedEmployee.status)
//                 }}>
//                   {getStatusIcon(selectedEmployee.status)} {selectedEmployee.status}
//                 </div>
//               </div>

//               {/* Stats Grid */}
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//                 gap: '20px',
//                 marginBottom: '24px'
//               }}>
//                 <div style={{
//                   background: 'rgba(16, 185, 129, 0.1)',
//                   padding: '16px',
//                   borderRadius: '8px',
//                   border: '1px solid rgba(16, 185, 129, 0.2)'
//                 }}>
//                   <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Active Time</div>
//                   <div style={{ fontSize: '24px', fontWeight: '600', color: '#10b981' }}>
//                     {formatDuration(selectedEmployee.workSeconds)}
//                   </div>
//                 </div>
                
//                 <div style={{
//                   background: 'rgba(245, 158, 11, 0.1)',
//                   padding: '16px',
//                   borderRadius: '8px',
//                   border: '1px solid rgba(245, 158, 11, 0.2)'
//                 }}>
//                   <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Idle Time</div>
//                   <div style={{ fontSize: '24px', fontWeight: '600', color: '#f59e0b' }}>
//                     {formatDuration(selectedEmployee.idleSeconds)}
//                   </div>
//                 </div>
                
//                 <div style={{
//                   background: 'rgba(59, 130, 246, 0.1)',
//                   padding: '16px',
//                   borderRadius: '8px',
//                   border: '1px solid rgba(59, 130, 246, 0.2)'
//                 }}>
//                   <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Productivity</div>
//                   <div style={{ fontSize: '24px', fontWeight: '600', color: '#3b82f6' }}>
//                     {productivityScore}%
//                   </div>
//                 </div>
                
//                 <div style={{
//                   background: 'rgba(139, 92, 246, 0.1)',
//                   padding: '16px',
//                   borderRadius: '8px',
//                   border: '1px solid rgba(139, 92, 246, 0.2)'
//                 }}>
//                   <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Total Today</div>
//                   <div style={{ fontSize: '24px', fontWeight: '600', color: '#8b5cf6' }}>
//                     {formatDuration(selectedEmployee.workSeconds + selectedEmployee.idleSeconds)}
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Info */}
//               <div style={{
//                 display: 'flex',
//                 gap: '20px',
//                 flexWrap: 'wrap',
//                 fontSize: '14px'
//               }}>
//                 {selectedEmployee.email && (
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
//                     <span>📧</span>
//                     <span>{selectedEmployee.email}</span>
//                   </div>
//                 )}
//                 {selectedEmployee.phone && (
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
//                     <span>📱</span>
//                     <span>{selectedEmployee.phone}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Activity Timeline */}
//             <div style={{
//               background: '#1e293b',
//               borderRadius: '12px',
//               padding: '24px',
//               marginBottom: '24px',
//               border: '1px solid #334155'
//             }}>
//               <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#f1f5f9' }}>
//                 Today's Activity Timeline
//               </h3>
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '16px'
//               }}>
//                 {activityHistory.map((activity, index) => (
//                   <div key={index} style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '12px 16px',
//                     background: '#0f172a',
//                     borderRadius: '8px',
//                     borderLeft: `4px solid ${getStatusColor('WORKING')}`
//                   }}>
//                     <div style={{
//                       minWidth: '80px',
//                       fontSize: '14px',
//                       fontWeight: '600',
//                       color: '#3b82f6'
//                     }}>
//                       {activity.time}
//                     </div>
//                     <div style={{
//                       marginLeft: '20px',
//                       fontSize: '16px',
//                       color: '#f1f5f9',
//                       flex: 1
//                     }}>
//                       {activity.activity}
//                     </div>
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '8px',
//                       fontSize: '14px',
//                       color: '#94a3b8'
//                     }}>
//                       <span>{getAppIcon(activity.app)}</span>
//                       <span>{activity.app}</span>
//                       <span style={{ marginLeft: '12px' }}>
//                         ({formatDuration(activity.duration)})
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Productivity Chart */}
//             <div style={{
//               background: '#1e293b',
//               borderRadius: '12px',
//               padding: '24px',
//               border: '1px solid #334155'
//             }}>
//               <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#f1f5f9' }}>
//                 Hourly Productivity
//               </h3>
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '12px',
//                 marginTop: '10px'
//               }}>
//                 {Array.from({ length: 9 }, (_, i) => {
//                   const hour = 9 + i;
//                   const timeLabel = hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
//                   const activityLevel = Math.floor(Math.random() * 30) + 70; // Random data
                  
//                   return (
//                     <div key={i} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '12px'
//                     }}>
//                       <div style={{
//                         width: '60px',
//                         fontSize: '12px',
//                         color: '#94a3b8'
//                       }}>{timeLabel}</div>
//                       <div style={{
//                         flex: 1,
//                         height: '20px',
//                         background: '#334155',
//                         borderRadius: '10px',
//                         overflow: 'hidden'
//                       }}>
//                         <div style={{
//                           width: `${activityLevel}%`,
//                           height: '100%',
//                           background: activityLevel > 70 ? '#10b981' : activityLevel > 40 ? '#3b82f6' : '#f59e0b',
//                           borderRadius: '10px',
//                           transition: 'width 0.3s ease'
//                         }}></div>
//                       </div>
//                       <div style={{
//                         width: '40px',
//                         textAlign: 'right',
//                         fontSize: '12px',
//                         fontWeight: '600',
//                         color: '#f1f5f9'
//                       }}>{activityLevel}%</div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div style={{
//             padding: '20px 24px',
//             borderTop: '1px solid #334155',
//             display: 'flex',
//             justifyContent: 'flex-end',
//             gap: '12px'
//           }}>
//             <button
//               onClick={() => setShowDetailModal(false)}
//               style={{
//                 background: '#334155',
//                 color: '#f1f5f9',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#475569';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = '#334155';
//               }}
//             >
//               Close
//             </button>
//             <button
//               style={{
//                 background: '#3b82f6',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 transition: 'all 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = '#2563eb';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = '#3b82f6';
//               }}
//             >
//               Export Report
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ================= MAIN RENDER =================
  
//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '500px',
//         background: '#0f172a',
//         color: '#f1f5f9'
//       }}>
//         <div style={{
//           textAlign: 'center',
//           padding: '40px',
//           borderRadius: '12px',
//           background: '#1e293b',
//           border: '1px solid #334155'
//         }}>
//           <div style={{
//             width: '50px',
//             height: '50px',
//             border: '3px solid #334155',
//             borderTopColor: '#3b82f6',
//             borderRadius: '50%',
//             animation: 'spin 1s linear infinite',
//             margin: '0 auto 20px'
//           }}></div>
//           <h3 style={{ margin: '0 0 10px 0', color: '#f1f5f9' }}>
//             Loading Live Tracking Data...
//           </h3>
//           <p style={{ color: '#94a3b8' }}>
//             Fetching real-time employee activities
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '500px',
//         background: '#0f172a',
//         color: '#f1f5f9'
//       }}>
//         <div style={{
//           textAlign: 'center',
//           padding: '40px',
//           borderRadius: '12px',
//           background: '#1e293b',
//           border: '1px solid #ef4444',
//           maxWidth: '500px'
//         }}>
//           <div style={{
//             fontSize: '48px',
//             marginBottom: '20px',
//             color: '#ef4444'
//           }}>
//             ⚠️
//           </div>
//           <h3 style={{ margin: '0 0 10px 0', color: '#f1f5f9' }}>
//             Error Loading Data
//           </h3>
//           <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
//             {error}
//           </p>
//           <button
//             onClick={() => dispatch(fetchLiveEmployees())}
//             style={{
//               background: '#3b82f6',
//               color: 'white',
//               border: 'none',
//               padding: '10px 20px',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '500'
//             }}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       padding: '24px',
//       background: '#0f172a',
//       minHeight: '100vh',
//       color: '#f1f5f9'
//     }}>
//       {/* Header */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '32px',
//         flexWrap: 'wrap',
//         gap: '20px'
//       }}>
//         <div>
//           <h1 style={{
//             fontSize: '32px',
//             fontWeight: '700',
//             margin: '0 0 8px 0',
//             color: '#f1f5f9',
//             background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent'
//           }}>
//             Live Employee Tracking
//           </h1>
//           <p style={{ color: '#94a3b8', margin: 0 }}>
//             Real-time monitoring of employee activities and productivity
//           </p>
//         </div>
        
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '16px',
//           flexWrap: 'wrap'
//         }}>
//           <div style={{
//             padding: '8px 16px',
//             background: '#1e293b',
//             borderRadius: '8px',
//             fontSize: '14px',
//             color: '#94a3b8',
//             border: '1px solid #334155'
//           }}>
//             <span style={{ marginRight: '8px' }}>🕐</span>
//             {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
//           </div>
          
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}>
//             <button
//               onClick={() => setAutoRefresh(!autoRefresh)}
//               style={{
//                 padding: '8px 16px',
//                 background: autoRefresh ? '#3b82f6' : '#334155',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}
//             >
//               {autoRefresh ? '🔄 Auto Refresh ON' : '⏸️ Auto Refresh OFF'}
//             </button>
            
//             <button
//               onClick={() => {
//                 console.log("🔄 Manual refresh triggered");
//                 dispatch(fetchLiveEmployees());
//               }}
//               style={{
//                 padding: '8px 16px',
//                 background: 'transparent',
//                 color: '#3b82f6',
//                 border: '1px solid #3b82f6',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}
//             >
//               🔄 Refresh Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//         gap: '20px',
//         marginBottom: '32px'
//       }}>
//         <div style={{
//           background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
//           padding: '24px',
//           borderRadius: '12px',
//           border: '1px solid rgba(139, 92, 246, 0.3)'
//         }}>
//           <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '8px' }}>
//             Total Employees
//           </div>
//           <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>
//             {statusStats.total}
//           </div>
//           <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
//             Currently tracked
//           </div>
//         </div>
        
//         <div style={{
//           background: 'linear-gradient(135deg, #10b981, #059669)',
//           padding: '24px',
//           borderRadius: '12px',
//           border: '1px solid rgba(16, 185, 129, 0.3)'
//         }}>
//           <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '8px' }}>
//             Active Now
//           </div>
//           <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>
//             {statusStats.working}
//           </div>
//           <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
//             Working productively
//           </div>
//         </div>
        
//         <div style={{
//           background: 'linear-gradient(135deg, #f59e0b, #d97706)',
//           padding: '24px',
//           borderRadius: '12px',
//           border: '1px solid rgba(245, 158, 11, 0.3)'
//         }}>
//           <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '8px' }}>
//             Idle
//           </div>
//           <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>
//             {statusStats.idle}
//           </div>
//           <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
//             May need attention
//           </div>
//         </div>
        
//         <div style={{
//           background: 'linear-gradient(135deg, #ef4444, #dc2626)',
//           padding: '24px',
//           borderRadius: '12px',
//           border: '1px solid rgba(239, 68, 68, 0.3)'
//         }}>
//           <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '8px' }}>
//             On Break
//           </div>
//           <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>
//             {statusStats.break}
//           </div>
//           <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
//             Scheduled breaks
//           </div>
//         </div>
//       </div>

//       {/* Controls Section */}
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '24px',
//         marginBottom: '32px',
//         border: '1px solid #334155'
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '24px',
//           flexWrap: 'wrap',
//           gap: '20px'
//         }}>
//           <div style={{ flex: 1 }}>
//             <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#f1f5f9' }}>
//               Search & Filter
//             </h3>
//             <div style={{
//               display: 'flex',
//               gap: '16px',
//               flexWrap: 'wrap',
//               alignItems: 'center'
//             }}>
//               <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
//                 <input
//                   type="text"
//                   placeholder="Search by name, ID, department, or activity..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   style={{
//                     width: '100%',
//                     padding: '12px 16px 12px 44px',
//                     background: '#0f172a',
//                     border: '1px solid #334155',
//                     borderRadius: '8px',
//                     color: '#f1f5f9',
//                     fontSize: '14px',
//                     outline: 'none'
//                   }}
//                 />
//                 <div style={{
//                   position: 'absolute',
//                   left: '16px',
//                   top: '50%',
//                   transform: 'translateY(-50%)',
//                   color: '#94a3b8'
//                 }}>
//                   🔍
//                 </div>
//               </div>
              
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 style={{
//                   padding: '12px 16px',
//                   background: '#0f172a',
//                   border: '1px solid #334155',
//                   borderRadius: '8px',
//                   color: '#f1f5f9',
//                   fontSize: '14px',
//                   minWidth: '150px',
//                   outline: 'none'
//                 }}
//               >
//                 <option value="All">All Status</option>
//                 <option value="WORKING">Working</option>
//                 <option value="IDLE">Idle</option>
//                 <option value="MEETING">Meeting</option>
//                 <option value="BREAK">Break</option>
//                 <option value="OFFLINE">Offline</option>
//               </select>
              
//               <div style={{
//                 display: 'flex',
//                 gap: '8px',
//                 background: '#0f172a',
//                 padding: '4px',
//                 borderRadius: '8px',
//                 border: '1px solid #334155'
//               }}>
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   style={{
//                     padding: '8px 16px',
//                     background: viewMode === 'grid' ? '#3b82f6' : 'transparent',
//                     color: viewMode === 'grid' ? 'white' : '#94a3b8',
//                     border: 'none',
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     fontWeight: '500',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px'
//                   }}
//                 >
//                   ⏹️ Grid
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   style={{
//                     padding: '8px 16px',
//                     background: viewMode === 'list' ? '#3b82f6' : 'transparent',
//                     color: viewMode === 'list' ? 'white' : '#94a3b8',
//                     border: 'none',
//                     borderRadius: '6px',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     fontWeight: '500',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px'
//                   }}
//                 >
//                   📋 List
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           <div>
//             <button
//               onClick={() => setShowUpdates(!showUpdates)}
//               style={{
//                 padding: '10px 20px',
//                 background: showUpdates ? '#3b82f6' : '#334155',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}
//             >
//               {showUpdates ? '📡 Hide Updates' : '📡 Show Updates'}
//             </button>
//           </div>
//         </div>
        
//         {/* Status Distribution */}
//         <div style={{
//           padding: '20px',
//           background: '#0f172a',
//           borderRadius: '8px',
//           border: '1px solid #334155'
//         }}>
//           <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#f1f5f9' }}>
//             Employee Status Distribution
//           </h4>
//           {renderStatusDistributionChart()}
//         </div>
//       </div>

//       {/* Employees Grid/List */}
//       <div style={{ marginBottom: '32px' }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '20px'
//         }}>
//           <h2 style={{ margin: 0, fontSize: '20px', color: '#f1f5f9' }}>
//             Live Employees ({filteredEmployees.length})
//           </h2>
//           <div style={{ fontSize: '14px', color: '#94a3b8' }}>
//             {employees.length === 0 ? 'No employees currently tracked' : 
//              `Showing ${filteredEmployees.length} of ${employees.length} employees`}
//           </div>
//         </div>
        
//         {filteredEmployees.length === 0 ? (
//           <div style={{
//             textAlign: 'center',
//             padding: '60px 20px',
//             background: '#1e293b',
//             borderRadius: '12px',
//             border: '1px solid #334155'
//           }}>
//             <div style={{ fontSize: '48px', marginBottom: '20px', color: '#94a3b8' }}>
//               👥
//             </div>
//             <h3 style={{ margin: '0 0 10px 0', color: '#f1f5f9' }}>
//               {searchQuery ? 'No matching employees found' : 'No employees currently active'}
//             </h3>
//             <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto 20px' }}>
//               {searchQuery ? 
//                 'Try adjusting your search or filter criteria' : 
//                 'Employees will appear here when they start their work session'}
//             </p>
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 style={{
//                   background: '#3b82f6',
//                   color: 'white',
//                   border: 'none',
//                   padding: '10px 20px',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500'
//                 }}
//               >
//                 Clear Search
//               </button>
//             )}
//           </div>
//         ) : viewMode === 'grid' ? (
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
//             gap: '24px'
//           }}>
//             {filteredEmployees.map(employee => renderEmployeeCard(employee))}
//           </div>
//         ) : (
//           <div style={{
//             background: '#1e293b',
//             borderRadius: '12px',
//             overflow: 'hidden',
//             border: '1px solid #334155'
//           }}>
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr style={{ background: '#0f172a' }}>
//                   <th style={{
//                     padding: '16px',
//                     textAlign: 'left',
//                     color: '#94a3b8',
//                     fontWeight: '500',
//                     fontSize: '14px',
//                     borderBottom: '1px solid #334155'
//                   }}>Employee</th>
//                   <th style={{
//                     padding: '16px',
//                     textAlign: 'left',
//                     color: '#94a3b8',
//                     fontWeight: '500',
//                     fontSize: '14px',
//                     borderBottom: '1px solid #334155'
//                   }}>Department</th>
//                   <th style={{
//                     padding: '16px',
//                     textAlign: 'left',
//                     color: '#94a3b8',
//                     fontWeight: '500',
//                     fontSize: '14px',
//                     borderBottom: '1px solid #334155'
//                   }}>Status</th>
//                   <th style={{
//                     padding: '16px',
//                     textAlign: 'left',
//                     color: '#94a3b8',
//                     fontWeight: '500',
//                     fontSize: '14px',
//                     borderBottom: '1px solid #334155'
//                   }}>Active Time</th>
//                   <th style={{
//                     padding: '16px',
//                     textAlign: 'left',
//                     color: '#94a3b8',
//                     fontWeight: '500',
//                     fontSize: '14px',
//                     borderBottom: '1px solid #334155'
//                   }}>Productivity</th>
//                   <th style={{
//                     padding: '16px',
//                     textAlign: 'left',
//                     color: '#94a3b8',
//                     fontWeight: '500',
//                     fontSize: '14px',
//                     borderBottom: '1px solid #334155'
//                   }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredEmployees.map(employee => {
//                   const productivity = calculateProductivity(employee);
//                   return (
//                     <tr 
//                       key={employee.id}
//                       style={{
//                         cursor: 'pointer',
//                         transition: 'background 0.2s',
//                         borderBottom: '1px solid #334155'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = '#0f172a';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = 'transparent';
//                       }}
//                       onClick={() => {
//                         setSelectedEmployee(employee);
//                         setShowDetailModal(true);
//                       }}
//                     >
//                       <td style={{ padding: '16px' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                           <div style={{
//                             width: '40px',
//                             height: '40px',
//                             borderRadius: '50%',
//                             background: getStatusColor(employee.status),
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             fontSize: '16px',
//                             fontWeight: '600',
//                             color: 'white'
//                           }}>
//                             {employee.name.charAt(0)}
//                           </div>
//                           <div>
//                             <div style={{ color: '#f1f5f9', fontWeight: '500' }}>
//                               {employee.name}
//                             </div>
//                             <div style={{ color: '#94a3b8', fontSize: '12px' }}>
//                               {employee.empId}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td style={{ padding: '16px', color: '#f1f5f9' }}>
//                         {employee.department}
//                       </td>
//                       <td style={{ padding: '16px' }}>
//                         <div style={{
//                           display: 'inline-flex',
//                           alignItems: 'center',
//                           gap: '6px',
//                           padding: '6px 12px',
//                           borderRadius: '20px',
//                           fontSize: '12px',
//                           fontWeight: '500',
//                           background: `${getStatusColor(employee.status)}20`,
//                           color: getStatusColor(employee.status)
//                         }}>
//                           {getStatusIcon(employee.status)} {employee.status}
//                         </div>
//                       </td>
//                       <td style={{ padding: '16px', color: '#f1f5f9', fontWeight: '500' }}>
//                         {formatDuration(employee.workSeconds)}
//                       </td>
//                       <td style={{ padding: '16px' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                           <div style={{
//                             flex: 1,
//                             height: '6px',
//                             background: '#334155',
//                             borderRadius: '3px',
//                             overflow: 'hidden'
//                           }}>
//                             <div style={{
//                               width: `${productivity}%`,
//                               height: '100%',
//                               background: productivity > 70 ? '#10b981' : 
//                                        productivity > 40 ? '#f59e0b' : '#ef4444',
//                               borderRadius: '3px'
//                             }}></div>
//                           </div>
//                           <span style={{ color: '#94a3b8', fontSize: '14px', minWidth: '40px' }}>
//                             {productivity}%
//                           </span>
//                         </div>
//                       </td>
//                       <td style={{ padding: '16px' }}>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedEmployee(employee);
//                             setShowDetailModal(true);
//                           }}
//                           style={{
//                             background: 'transparent',
//                             color: '#3b82f6',
//                             border: '1px solid #3b82f6',
//                             padding: '6px 12px',
//                             borderRadius: '6px',
//                             cursor: 'pointer',
//                             fontSize: '12px',
//                             fontWeight: '500'
//                           }}
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Footer Info */}
//       <div style={{
//         background: '#1e293b',
//         borderRadius: '12px',
//         padding: '20px',
//         border: '1px solid #334155',
//         fontSize: '14px',
//         color: '#94a3b8'
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <div>
//             <span style={{ marginRight: '16px' }}>📡 Socket: {socketClient.isConnected() ? '🟢 Connected' : '🔴 Disconnected'}</span>
//             <span>🔄 Auto-refresh: {autoRefresh ? 'ON (30s)' : 'OFF'}</span>
//           </div>
//           <div>
//             <span>Last updated: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
//           </div>
//         </div>
//       </div>

//       {/* Employee Detail Modal */}
//       {renderEmployeeDetailModal()}
//     </div>
//   );
// };

// export default LiveTrackingPage;








import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminLiveTracking } from '../../../redux/slices/adminLiveTrackingSlice';
import { 
  initAdminLiveTrackingService, 
  disconnectAdminLiveTrackingService 
} from '../../../services/adminLiveTracking.service';

const LiveTrackingPage = () => {
  // ================= REDUX CONNECTION =================
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector(state => state.adminLiveTracking);
  
  // ================= STATE MANAGEMENT =================
  const [time, setTime] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showUpdates, setShowUpdates] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  
  // ================= USE EFFECTS =================
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Redux data and socket connection
  useEffect(() => {
    // Fetch initial data
    dispatch(fetchAdminLiveTracking());
    
    // Initialize socket service
    initAdminLiveTrackingService(dispatch);
    
    return () => {
      // Cleanup socket connection
      disconnectAdminLiveTrackingService();
    };
  }, [dispatch]);

  // Auto-refresh tracking data
  useEffect(() => {
    if (!autoRefresh) return;
    
    const refreshTimer = setInterval(() => {
      dispatch(fetchAdminLiveTracking());
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(refreshTimer);
  }, [autoRefresh, dispatch]);

  // Initialize real-time updates
  useEffect(() => {
    const mockUpdates = [
      { id: 1, type: 'punch_in', employeeName: 'Rahul Sharma', message: 'punched in', timestamp: new Date(Date.now() - 120000).toISOString() },
      { id: 2, type: 'status_change', employeeName: 'Priya Patel', message: 'joined a meeting', timestamp: new Date(Date.now() - 300000).toISOString() },
      { id: 3, type: 'activity', employeeName: 'Amit Kumar', message: 'started working on API', timestamp: new Date(Date.now() - 180000).toISOString() },
      { id: 4, type: 'break', employeeName: 'Neha Singh', message: 'went on break', timestamp: new Date(Date.now() - 720000).toISOString() },
      { id: 5, type: 'app_change', employeeName: 'Sanjay Verma', message: 'switched to email', timestamp: new Date(Date.now() - 480000).toISOString() }
    ];
    setRealTimeUpdates(mockUpdates);
  }, []);

  // ================= HELPER FUNCTIONS =================
  
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      searchQuery === '' ||
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (employee.department && employee.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (employee.currentActivity && employee.currentActivity.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = 
      filterStatus === 'All' || 
      employee.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'ACTIVE': return '✅';
      case 'IDLE': return '😴';
      case 'MEETING': return '📅';
      case 'BREAK': return '☕';
      case 'OFFLINE': return '🔴';
      default: return '⏸️';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return '#10b981';
      case 'IDLE': return '#f59e0b';
      case 'MEETING': return '#3b82f6';
      case 'BREAK': return '#ef4444';
      case 'OFFLINE': return '#94a3b8';
      default: return '#94a3b8';
    }
  };

  const getAppIcon = (appName) => {
    if (!appName) return '🖥️';
    const app = appName.toLowerCase();
    if (app.includes('chrome') || app.includes('browser')) return '🌐';
    if (app.includes('vscode') || app.includes('code')) return '💻';
    if (app.includes('figma')) return '🎨';
    if (app.includes('zoom') || app.includes('meet')) return '📹';
    if (app.includes('outlook') || app.includes('gmail')) return '📧';
    if (app.includes('slack') || app.includes('teams')) return '💬';
    if (app.includes('postman')) return '📡';
    if (app.includes('excel') || app.includes('sheet')) return '📊';
    if (app.includes('word') || app.includes('docs')) return '📝';
    return '🖥️';
  };

  const formatDuration = (seconds) => {
    if (!seconds || seconds === 0) return '0m';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const calculateProductivity = (employee) => {
    const workSeconds = employee.workSeconds || 0;
    const idleSeconds = employee.idleSeconds || 0;
    const total = workSeconds + idleSeconds;
    
    if (total === 0) return 0;
    return Math.round((workSeconds / total) * 100);
  };

  const getUpdateIcon = (type) => {
    switch(type) {
      case 'punch_in': return '👤';
      case 'punch_out': return '🚪';
      case 'status_change': return '🔄';
      case 'app_change': return '💻';
      case 'activity': return '🎯';
      case 'meeting': return '📅';
      case 'break': return '☕';
      default: return '📢';
    }
  };

  const getUpdateColor = (type) => {
    switch(type) {
      case 'punch_in': return '#10b981';
      case 'punch_out': return '#ef4444';
      case 'status_change': return '#3b82f6';
      case 'app_change': return '#8b5cf6';
      case 'activity': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    const now = new Date();
    const updateTime = new Date(timestamp);
    const diffMs = now - updateTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const statusStats = {
    total: employees.length,
    working: employees.filter(e => e.status === 'ACTIVE').length,
    idle: employees.filter(e => e.status === 'IDLE').length,
    meeting: employees.filter(e => e.status === 'MEETING').length,
    break: employees.filter(e => e.status === 'BREAK').length,
    offline: employees.filter(e => e.status === 'OFFLINE').length,
  };

  const activityData = [
    { time: '9 AM', activity: 85 },
    { time: '10 AM', activity: 92 },
    { time: '11 AM', activity: 78 },
    { time: '12 PM', activity: 45 },
    { time: '1 PM', activity: 88 },
    { time: '2 PM', activity: 95 },
    { time: '3 PM', activity: 82 },
    { time: '4 PM', activity: 76 },
    { time: '5 PM', activity: 65 },
  ];

  const statusData = [
    { name: 'Working', value: statusStats.working, color: '#10b981' },
    { name: 'Idle', value: statusStats.idle, color: '#f59e0b' },
    { name: 'Meeting', value: statusStats.meeting, color: '#3b82f6' },
    { name: 'Break', value: statusStats.break, color: '#ef4444' },
    { name: 'Offline', value: statusStats.offline, color: '#94a3b8' },
  ];

  // ================= RENDER FUNCTIONS =================
  
  const renderStatusDistributionChart = () => {
    const total = statusData.reduce((sum, item) => sum + item.value, 0);
    const percentages = statusData.map(item => ({
      ...item,
      percentage: total > 0 ? Math.round((item.value / total) * 100) : 0
    }));

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: `conic-gradient(${percentages.map((item, index) => 
            `${item.color} ${index === 0 ? '0%' : percentages.slice(0, index).reduce((a, b) => a + b.percentage, 0) + '%'} ` +
            `${percentages.slice(0, index + 1).reduce((a, b) => a + b.percentage, 0)}%`
          ).join(', ')})`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: '#1e293b',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9' }}>{total}</span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Employees</span>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {percentages.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#94a3b8'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: item.color
              }}></div>
              <span>{item.name} ({item.value})</span>
              <span style={{ marginLeft: 'auto', color: '#f1f5f9' }}>{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderActivityTimeline = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '10px'
      }}>
        {activityData.map((slot, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '60px',
              fontSize: '12px',
              color: '#94a3b8'
            }}>{slot.time}</div>
            <div style={{
              flex: 1,
              height: '20px',
              background: '#334155',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${slot.activity}%`,
                height: '100%',
                background: slot.activity > 70 ? '#10b981' : slot.activity > 40 ? '#3b82f6' : '#f59e0b',
                borderRadius: '10px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <div style={{
              width: '40px',
              textAlign: 'right',
              fontSize: '12px',
              fontWeight: '600',
              color: '#f1f5f9'
            }}>{slot.activity}%</div>
          </div>
        ))}
      </div>
    );
  };

  const renderEmployeeCard = (employee) => {
    const productivity = calculateProductivity(employee);
    
    return (
      <div 
        key={employee.employeeId}
        className="employee-card"
        onClick={() => {
          setSelectedEmployee(employee);
          setShowDetailModal(true);
        }}
        style={{
          background: '#0f172a',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #334155',
          cursor: 'pointer',
          transition: 'all 0.2s',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
          e.currentTarget.style.borderColor = '#3b82f6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = '#334155';
        }}
      >
        {/* Top gradient bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)'
        }}></div>

        {/* Card Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '20px',
          gap: '12px'
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: getStatusColor(employee.status),
              border: `3px solid ${getStatusColor(employee.status)}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: '600',
              color: 'white'
            }}>
              {employee.name.charAt(0)}
            </div>
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: getStatusColor(employee.status),
              border: '2px solid #0f172a'
            }}></div>
          </div>
          
          <div style={{ flex: 1 }}>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 4px 0',
              color: '#f1f5f9'
            }}>{employee.name}</h4>
            <p style={{
              color: '#94a3b8',
              fontSize: '12px',
              margin: '0 0 8px 0'
            }}>{employee.employeeId}</p>
            <div>
              <span style={{
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#3b82f6',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>{employee.department || 'Engineering'}</span>
            </div>
          </div>
          
          <div style={{
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            background: `${getStatusColor(employee.status)}20`,
            color: getStatusColor(employee.status)
          }}>
            {getStatusIcon(employee.status)} {employee.status}
          </div>
        </div>
        
        {/* Card Body */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#94a3b8', minWidth: '120px' }}>Current Activity:</span>
            <span style={{ color: '#f1f5f9', fontWeight: '500', textAlign: 'right', flex: 1 }}>
              {employee.currentActivity || 'No activity'}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#94a3b8', minWidth: '120px' }}>Application:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f1f5f9', fontWeight: '500' }}>
              <span style={{ fontSize: '16px' }}>{getAppIcon(employee.appName)}</span>
              <span>{employee.appName || 'Not available'}</span>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#94a3b8', minWidth: '120px' }}>Active Time:</span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>
              {formatDuration(employee.workSeconds)}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            fontSize: '14px'
          }}>
            <span style={{ color: '#94a3b8', minWidth: '120px' }}>Idle Time:</span>
            <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
              {formatDuration(employee.idleSeconds)}
            </span>
          </div>
          
          <div style={{ marginTop: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              <span style={{ color: '#94a3b8' }}>Productivity:</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>{productivity}%</span>
            </div>
            <div style={{
              height: '8px',
              borderRadius: '4px',
              background: '#334155',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                height: '100%',
                borderRadius: '4px',
                width: `${productivity}%`,
                background: productivity > 70 ? '#10b981' : 
                         productivity > 40 ? '#f59e0b' : '#ef4444',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>
        </div>
        
        {/* Card Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '16px',
          borderTop: '1px solid #334155'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
              <span style={{ color: '#94a3b8' }}>Punch In:</span>
              <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
                {employee.startAt ? 
                  new Date(employee.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
                  'Not punched'
                }
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
              <span style={{ color: '#94a3b8' }}>Today:</span>
              <span style={{ color: '#f1f5f9', fontWeight: '500' }}>
                {formatDuration((employee.workSeconds || 0) + (employee.idleSeconds || 0))}
              </span>
            </div>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEmployee(employee);
              setShowDetailModal(true);
            }}
            style={{
              background: 'transparent',
              color: '#3b82f6',
              border: '1px solid #3b82f6',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            View Details →
          </button>
        </div>
      </div>
    );
  };

  const renderEmployeeDetailModal = () => {
    if (!selectedEmployee || !showDetailModal) return null;
    
    const productivityScore = calculateProductivity(selectedEmployee);
    
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          backdropFilter: 'blur(4px)'
        }}
        onClick={() => setShowDetailModal(false)}
      >
        <div 
          style={{
            background: '#0f172a',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid #334155',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            borderBottom: '1px solid #334155',
            position: 'sticky',
            top: 0,
            background: '#0f172a',
            zIndex: 10,
            borderRadius: '16px 16px 0 0'
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#f1f5f9' }}>
                {selectedEmployee.name}'s Activity Details
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>
                Employee ID: {selectedEmployee.employeeId}
              </p>
            </div>
            <button 
              onClick={() => setShowDetailModal(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '24px',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#334155';
                e.currentTarget.style.color = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              ✕
            </button>
          </div>

          {/* Modal Body */}
          <div style={{ padding: '24px' }}>
            {/* Employee Overview */}
            <div style={{
              background: '#1e293b',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid #334155'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '24px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: getStatusColor(selectedEmployee.status),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: '600',
                  color: 'white',
                  flexShrink: 0
                }}>
                  {selectedEmployee.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#f1f5f9' }}>
                    {selectedEmployee.name}
                  </h3>
                  <p style={{ color: '#3b82f6', fontWeight: '500', margin: '0 0 4px 0' }}>
                    {selectedEmployee.role || 'Software Engineer'}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
                    {selectedEmployee.department || 'Engineering Department'}
                  </p>
                </div>
                <div style={{
                  padding: '12px 20px',
                  borderRadius: '24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  background: `${getStatusColor(selectedEmployee.status)}20`,
                  color: getStatusColor(selectedEmployee.status)
                }}>
                  {getStatusIcon(selectedEmployee.status)} {selectedEmployee.status}
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px'
              }}>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Punch In</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#f1f5f9' }}>
                    {selectedEmployee.startAt ? 
                      new Date(selectedEmployee.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
                      '--:--'
                    }
                  </div>
                </div>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Active Time</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#10b981' }}>
                    {formatDuration(selectedEmployee.workSeconds)}
                  </div>
                </div>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Idle Time</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#f59e0b' }}>
                    {formatDuration(selectedEmployee.idleSeconds)}
                  </div>
                </div>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Productivity</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: productivityScore > 70 ? '#10b981' : '#f59e0b' }}>
                    {productivityScore}%
                  </div>
                </div>
              </div>
            </div>

            {/* Current Activity */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>🎯 Current Activity</h3>
              <div style={{
                background: '#1e293b',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #334155'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '32px' }}>{getAppIcon(selectedEmployee.appName)}</span>
                    <div>
                      <strong style={{ display: 'block', color: '#f1f5f9', fontSize: '14px', marginBottom: '4px' }}>
                        {selectedEmployee.appName || 'Unknown Application'}
                      </strong>
                      <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>
                        {selectedEmployee.currentActivity || 'No active task'}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#3b82f6',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    {formatDuration((selectedEmployee.workSeconds || 0) + (selectedEmployee.idleSeconds || 0))}
                  </span>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{
                      height: '100%',
                      borderRadius: '4px',
                      width: `${Math.min(productivityScore, 100)}%`,
                      background: getStatusColor(selectedEmployee.status),
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                    <span>Start</span>
                    <span>Now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Breakdown */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>⏱️ Today's Time Breakdown</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {[
                  { label: 'Active Work', value: selectedEmployee.workSeconds || 0, color: '#10b981' },
                  { label: 'Idle Time', value: selectedEmployee.idleSeconds || 0, color: '#f59e0b' },
                  { label: 'Meetings', value: selectedEmployee.meetingSeconds || 0, color: '#3b82f6' },
                  { label: 'Breaks', value: selectedEmployee.breakSeconds || 0, color: '#ef4444' }
                ].map((item, index) => {
                  const total = (selectedEmployee.workSeconds || 0) + (selectedEmployee.idleSeconds || 0) + 
                              (selectedEmployee.meetingSeconds || 0) + (selectedEmployee.breakSeconds || 0);
                  const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
                  
                  return (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ width: '120px', color: '#94a3b8', fontSize: '14px' }}>{item.label}</div>
                      <div style={{ flex: 1, height: '12px', background: '#334155', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          borderRadius: '6px',
                          width: `${percentage}%`,
                          background: item.color,
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                      <div style={{ width: '80px', textAlign: 'right', fontWeight: '600', color: '#f1f5f9', fontSize: '14px' }}>
                        {formatDuration(item.value)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity History - Placeholder */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>📋 Recent Activity History</h3>
              <div style={{
                background: '#1e293b',
                borderRadius: '12px',
                border: '1px solid #334155',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  Activity history will be populated from API data
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 style={{ fontSize: '18px', color: '#f1f5f9', margin: '0 0 16px 0' }}>📊 Performance Metrics</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {[
                  { icon: '🎯', title: 'Productivity Score', value: `${productivityScore}%`, subtitle: "Today's performance" },
                  { icon: '📅', title: 'Attendance Rate', value: '95%', subtitle: 'This month' },
                  { icon: '⏱️', title: 'Avg. Active Hours', value: '7h 30m', subtitle: 'Last 30 days' },
                  { icon: '📈', title: 'Avg. Productivity', value: '78%', subtitle: 'Monthly average' }
                ].map((metric, index) => (
                  <div key={index} style={{
                    background: '#1e293b',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{ fontSize: '32px', opacity: 0.9 }}>{metric.icon}</div>
                    <div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#94a3b8' }}>{metric.title}</h4>
                      <p style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 4px 0' }}>
                        {metric.value}
                      </p>
                      <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>{metric.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            borderTop: '1px solid #334155',
            background: '#0f172a',
            borderRadius: '0 0 16px 16px',
            position: 'sticky',
            bottom: 0,
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <button 
              onClick={() => setShowDetailModal(false)}
              style={{
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid #334155',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#334155';
                e.currentTarget.style.color = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              Close
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button style={{
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid #334155',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#334155';
                e.currentTarget.style.color = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#94a3b8';
              }}>
                💬 Message
              </button>
              <button style={{
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid #334155',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#334155';
                e.currentTarget.style.color = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#94a3b8';
              }}>
                📷 Screenshots
              </button>
              <button style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3b82f6';
              }}>
                Export Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRealTimeUpdates = () => {
    return (
      <div style={{
        background: '#1e293b',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '24px',
        border: '1px solid #334155'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: showUpdates ? '16px' : '0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#f1f5f9' }}>🔄 Real-time Updates</h3>
            <span style={{
              background: '#3b82f6',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600',
              padding: '2px 8px',
              borderRadius: '12px',
              minWidth: '20px',
              textAlign: 'center'
            }}>
              {realTimeUpdates.length}
            </span>
          </div>
          <button 
            onClick={() => setShowUpdates(!showUpdates)}
            style={{
              background: 'transparent',
              color: '#94a3b8',
              border: '1px solid #334155',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#334155';
              e.currentTarget.style.color = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            {showUpdates ? 'Hide' : 'Show'} Updates
          </button>
        </div>

        {showUpdates && (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {realTimeUpdates.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {realTimeUpdates.map((update) => (
                  <div 
                    key={update.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      borderLeft: `3px solid ${getUpdateColor(update.type)}`,
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    <div style={{ fontSize: '20px', flexShrink: 0, color: getUpdateColor(update.type) }}>
                      {getUpdateIcon(update.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#f1f5f9', fontSize: '14px', lineHeight: '1.4', marginBottom: '4px' }}>
                        <strong style={{ color: '#3b82f6' }}>{update.employeeName}</strong> {update.message}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                        <span>{formatTime(update.timestamp)}</span>
                        <span>{update.type.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
                <p style={{ color: '#94a3b8', margin: '0 0 8px 0' }}>No recent updates</p>
                <small style={{ color: '#64748b', fontSize: '12px' }}>Updates will appear here in real-time</small>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ================= LOADING STATE =================
  if (loading && employees.length === 0) {
    return (
      <div style={{
        padding: '20px',
        background: '#0f172a',
        minHeight: '100vh',
        color: '#f1f5f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <h2 style={{ color: '#f1f5f9' }}>Loading Employee Data...</h2>
          <p style={{ color: '#94a3b8' }}>Fetching real-time tracking information</p>
        </div>
      </div>
    );
  }

  // ================= MAIN RENDER =================
  
  return (
    <div style={{
      padding: '20px',
      background: '#0f172a',
      minHeight: '100vh',
      color: '#f1f5f9'
    }}>
      {/* Dashboard Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#f1f5f9',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '32px' }}>📡</span>
            Employee Tracking Dashboard
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            Real-time monitoring • {filteredEmployees.length} employees online • 
            Last updated: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#94a3b8' }}>
                <input 
                  type="checkbox" 
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  style={{ display: 'none' }}
                />
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid #475569',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}>
                  {autoRefresh && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                </div>
                <span>Auto Refresh (30s)</span>
              </label>
            </div>
            
            <div style={{ display: 'flex', background: '#1e293b', borderRadius: '8px', padding: '4px' }}>
              <button 
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  background: viewMode === 'grid' ? '#334155' : 'transparent',
                  color: viewMode === 'grid' ? '#f1f5f9' : '#94a3b8',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onClick={() => setViewMode('grid')}
              >
                ▦ Grid
              </button>
              <button 
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  background: viewMode === 'list' ? '#334155' : 'transparent',
                  color: viewMode === 'list' ? '#f1f5f9' : '#94a3b8',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onClick={() => setViewMode('list')}
              >
                ≡ List
              </button>
            </div>
            
            <button 
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3b82f6';
              }}
              onClick={() => dispatch(fetchAdminLiveTracking())}
            >
              <span>🔄</span>
              Refresh Now
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {[
          { icon: '👥', value: statusStats.total, label: 'Total Employees', trend: `${employees.filter(e => e.status !== 'OFFLINE').length} online`, color: '#8b5cf6' },
          { icon: '✅', value: statusStats.working, label: 'Productive', trend: 'Active now', color: '#10b981' },
          { icon: '😴', value: statusStats.idle, label: 'Idle', trend: 'Need attention', color: '#f59e0b' },
          { icon: '📊', value: '78%', label: 'Avg Productivity', trend: '+2% from yesterday', color: '#3b82f6' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: '#1e293b',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            border: '1px solid #334155',
            borderLeft: `4px solid ${stat.color}`,
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '32px', opacity: 0.9 }}>{stat.icon}</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 4px 0', color: '#f1f5f9' }}>
                {stat.value}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 8px 0' }}>{stat.label}</p>
              <div style={{ fontSize: '12px', color: stat.color }}>{stat.trend}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div style={{
        background: '#1e293b',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        border: '1px solid #334155'
      }}>
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <span style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8',
            fontSize: '18px'
          }}>🔍</span>
          <input 
            type="text" 
            style={{
              width: '100%',
              padding: '12px 48px 12px 48px',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '14px',
              transition: 'border-color 0.2s'
            }}
            placeholder="Search employees by name, ID, department, or activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#334155';
            }}
          />
          {searchQuery && (
            <button 
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '18px',
                padding: 0,
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => setSearchQuery('')}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              ✕
            </button>
          )}
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ color: '#94a3b8', fontSize: '14px', whiteSpace: 'nowrap' }}>Status Filter:</label>
            <select 
              style={{
                padding: '8px 12px',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '6px',
                color: '#f1f5f9',
                fontSize: '14px',
                minWidth: '150px',
                cursor: 'pointer'
              }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="ACTIVE">Working ✅</option>
              <option value="IDLE">Idle 😴</option>
              <option value="MEETING">Meeting 📅</option>
              <option value="BREAK">Break ☕</option>
              <option value="OFFLINE">Offline 🔴</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ color: '#94a3b8', fontSize: '14px', whiteSpace: 'nowrap' }}>Sort By:</label>
            <select style={{
              padding: '8px 12px',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '6px',
              color: '#f1f5f9',
              fontSize: '14px',
              minWidth: '150px',
              cursor: 'pointer'
            }}>
              <option value="name">Name A-Z</option>
              <option value="productivity">Productivity</option>
              <option value="time">Active Time</option>
              <option value="status">Status</option>
            </select>
          </div>
          
          <button 
            style={{
              background: 'transparent',
              color: '#94a3b8',
              border: '1px solid #334155',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              marginLeft: 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#334155';
              e.currentTarget.style.color = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            <span>📥</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* Activity Timeline */}
        <div style={{
          background: '#1e293b',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #334155'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '18px', margin: 0, color: '#f1f5f9' }}>📈 Activity Timeline (Today)</h3>
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>Peak productive hours</span>
          </div>
          {renderActivityTimeline()}
        </div>
        
        {/* Status Distribution */}
        <div style={{
          background: '#1e293b',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #334155'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '18px', margin: 0, color: '#f1f5f9' }}>📊 Status Distribution</h3>
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>Current employee status</span>
          </div>
          {renderStatusDistributionChart()}
        </div>
      </div>

      {/* Employees Section */}
      <div style={{
        background: '#1e293b',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #334155'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#f1f5f9' }}>👥 Employee Tracking</h2>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>
            {filteredEmployees.length} employees found • {filterStatus !== 'All' ? `Filtered by: ${filterStatus}` : 'Showing all statuses'}
          </span>
        </div>
        
        {/* Employees Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(350px, 1fr))' : '1fr',
          gap: '20px'
        }}>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(renderEmployeeCard)
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>🔍</div>
              <h3 style={{ fontSize: '20px', color: '#f1f5f9', margin: '0 0 8px 0' }}>No employees found</h3>
              <p style={{ color: '#94a3b8', margin: '0 0 20px 0' }}>Try adjusting your search or filter criteria</p>
              <button 
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Updates */}
      {renderRealTimeUpdates()}

      {/* Employee Detail Modal */}
      {renderEmployeeDetailModal()}
    </div>
  );
};

export default LiveTrackingPage;