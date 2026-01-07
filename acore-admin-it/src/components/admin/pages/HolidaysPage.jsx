// import React, { useState } from "react";

// const HolidaysPage = () => {
//   const [holidays, setHolidays] = useState([
//     {
//       id: 1,
//       title: "Republic Day",
//       date: "2025-01-26",
//       type: "Public Holiday",
//       status: "Active"
//     },
//     {
//       id: 2,
//       title: "Company Annual Day",
//       date: "2025-03-20",
//       type: "Company Event",
//       status: "Inactive"
//     }
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [form, setForm] = useState({
//     title: "",
//     date: "",
//     type: "Public Holiday",
//     status: "Active"
//   });

//   const openAddModal = () => {
//     setEditing(null);
//     setForm({
//       title: "",
//       date: "",
//       type: "Public Holiday",
//       status: "Active"
//     });
//     setShowModal(true);
//   };

//   const openEditModal = (item) => {
//     setEditing(item);
//     setForm(item);
//     setShowModal(true);
//   };

//   const saveHoliday = () => {
//     if (!form.title || !form.date) {
//       alert("Title & Date Required!");
//       return;
//     }

//     if (editing) {
//       setHolidays(
//         holidays.map((h) => (h.id === editing.id ? form : h))
//       );
//     } else {
//       setHolidays([...holidays, { ...form, id: Date.now() }]);
//     }

//     setShowModal(false);
//   };

//   const deleteHoliday = (id) => {
//     if (window.confirm("Are you sure?")) {
//       setHolidays(holidays.filter((h) => h.id !== id));
//     }
//   };

//   const toggleStatus = (id) => {
//     setHolidays(
//       holidays.map((h) =>
//         h.id === id
//           ? { ...h, status: h.status === "Active" ? "Inactive" : "Active" }
//           : h
//       )
//     );
//   };

//   return (
//     <div className="page-content">

//       <div className="page-header">
//         <div>
//           <h2 className="page-title">🎉 Holidays & Events</h2>
//           <p className="page-subtitle">
//             Manage company holidays & special events
//           </p>
//         </div>

//         <button className="btn-primary" onClick={openAddModal}>
//           ➕ Add Holiday / Event
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="summary-cards">
//         <div className="card">
//           <div className="card-icon">📅</div>
//           <h3>Total Holidays</h3>
//           <p className="card-value">{holidays.length}</p>
//         </div>

//         <div className="card card-success">
//           <div className="card-icon">✅</div>
//           <h3>Active</h3>
//           <p className="card-value">
//             {holidays.filter((h) => h.status === "Active").length}
//           </p>
//         </div>

//         <div className="card card-danger">
//           <div className="card-icon">⛔</div>
//           <h3>Inactive</h3>
//           <p className="card-value">
//             {holidays.filter((h) => h.status === "Inactive").length}
//           </p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-container">
//         <div className="table-header">
//           <h3>📋 Holiday & Events List</h3>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {holidays.map((h) => (
//               <tr key={h.id}>
//                 <td><strong style={{color:"white"}}>{h.title}</strong></td>
//                 <td>{h.date}</td>
//                 <td style={{color:"#94a3b8"}}>{h.type}</td>

//                 <td>
//                   <span className={`status-badge ${h.status === "Active" ? "present" : "absent"}`}>
//                     {h.status}
//                   </span>
//                 </td>

//                 <td>
//                   <div className="action-buttons">
//                     <button className="btn-small btn-success" onClick={() => toggleStatus(h.id)}>
//                       🔄 Toggle
//                     </button>

//                     <button className="btn-small btn-warning" onClick={() => openEditModal(h)}>
//                       ✏️ Edit
//                     </button>

//                     <button className="btn-small btn-danger" onClick={() => deleteHoliday(h.id)}>
//                       🗑 Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {holidays.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center">
//                   ❌ No Holidays Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h3>{editing ? "✏️ Edit Holiday" : "➕ Add Holiday"}</h3>

//             <input
//               className="input-box"
//               placeholder="Holiday Title"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />

//             <input
//               className="input-box"
//               type="date"
//               value={form.date}
//               onChange={(e) => setForm({ ...form, date: e.target.value })}
//             />

//             <select
//               className="input-box"
//               value={form.type}
//               onChange={(e) => setForm({ ...form, type: e.target.value })}
//             >
//               <option>Public Holiday</option>
//               <option>Company Event</option>
//               <option>Optional Holiday</option>
//             </select>

//             <div className="modal-actions">
//               <button className="btn-primary" onClick={saveHoliday}>
//                 💾 Save
//               </button>

//               <button className="btn-danger" onClick={() => setShowModal(false)}>
//                 ❌ Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default HolidaysPage;




// import React, { useState } from "react";

// const HolidaysPage = () => {
//   const [holidays, setHolidays] = useState([
//     {
//       id: 1,
//       title: "Republic Day",
//       date: "2025-01-26",
//       type: "Public Holiday",
//       status: "Active",
//       description: "National holiday celebrating the adoption of the Constitution of India",
//       color: "#ef4444"
//     },
//     {
//       id: 2,
//       title: "Company Annual Day",
//       date: "2025-03-20",
//       type: "Company Event",
//       status: "Inactive",
//       description: "Annual company celebration and awards ceremony",
//       color: "#3b82f6"
//     },
//     {
//       id: 3,
//       title: "Diwali",
//       date: "2025-10-23",
//       type: "Public Holiday",
//       status: "Active",
//       description: "Festival of lights, major Hindu festival",
//       color: "#f59e0b"
//     },
//     {
//       id: 4,
//       title: "Year-End Break",
//       date: "2025-12-25",
//       type: "Optional Holiday",
//       status: "Active",
//       description: "Christmas holiday - office closed",
//       color: "#10b981"
//     },
//     {
//       id: 5,
//       title: "Independence Day",
//       date: "2025-08-15",
//       type: "Public Holiday",
//       status: "Active",
//       description: "Celebrating India's independence from British rule",
//       color: "#ef4444"
//     },
//     {
//       id: 6,
//       title: "Team Building Event",
//       date: "2025-04-12",
//       type: "Company Event",
//       status: "Active",
//       description: "Quarterly team building activities",
//       color: "#8b5cf6"
//     },
//     {
//       id: 7,
//       title: "Maha Shivaratri",
//       date: "2025-02-26",
//       type: "Optional Holiday",
//       status: "Inactive",
//       description: "Hindu festival dedicated to Lord Shiva",
//       color: "#10b981"
//     }
//   ]);

//   const [search, setSearch] = useState("");
//   const [filterType, setFilterType] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [viewMode, setViewMode] = useState("table"); // 'table' or 'calendar'
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [showDetails, setShowDetails] = useState(null);

//   const [form, setForm] = useState({
//     title: "",
//     date: new Date().toISOString().split('T')[0],
//     type: "Public Holiday",
//     status: "Active",
//     description: "",
//     color: "#3b82f6"
//   });

//   const typeColors = {
//     "Public Holiday": "#ef4444",
//     "Company Event": "#3b82f6",
//     "Optional Holiday": "#10b981"
//   };

//   const monthNames = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   // Generate calendar days
//   const getCalendarDays = () => {
//     const firstDay = new Date(selectedYear, selectedMonth, 1);
//     const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDay = firstDay.getDay();

//     const days = [];
//     const holidaysThisMonth = holidays.filter(h => {
//       const holidayDate = new Date(h.date);
//       return holidayDate.getMonth() === selectedMonth && 
//              holidayDate.getFullYear() === selectedYear;
//     });

//     // Previous month days
//     for (let i = 0; i < startingDay; i++) {
//       days.push({
//         day: "",
//         isCurrentMonth: false,
//         holidays: []
//       });
//     }

//     // Current month days
//     for (let day = 1; day <= daysInMonth; day++) {
//       const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//       const dayHolidays = holidaysThisMonth.filter(h => h.date === dateStr);
      
//       days.push({
//         day,
//         isCurrentMonth: true,
//         date: dateStr,
//         holidays: dayHolidays
//       });
//     }

//     return days;
//   };

//   const openAddModal = () => {
//     setEditing(null);
//     setForm({
//       title: "",
//       date: new Date().toISOString().split('T')[0],
//       type: "Public Holiday",
//       status: "Active",
//       description: "",
//       color: typeColors["Public Holiday"]
//     });
//     setShowModal(true);
//   };

//   const openEditModal = (item) => {
//     setEditing(item);
//     setForm({ ...item });
//     setShowModal(true);
//   };

//   const saveHoliday = () => {
//     if (!form.title.trim()) {
//       alert("Holiday Title Required");
//       return;
//     }
//     if (!form.date) {
//       alert("Date Required");
//       return;
//     }

//     // Auto-assign color based on type
//     const color = typeColors[form.type] || "#3b82f6";

//     const holidayData = {
//       ...form,
//       color
//     };

//     if (editing) {
//       setHolidays(holidays.map(h => h.id === editing.id ? holidayData : h));
//     } else {
//       setHolidays([{ ...holidayData, id: Date.now() }, ...holidays]);
//     }

//     setShowModal(false);
//   };

//   const deleteHoliday = (id) => {
//     if (window.confirm("Are you sure you want to delete this holiday?")) {
//       setHolidays(holidays.filter(h => h.id !== id));
//     }
//   };

//   const toggleStatus = (id) => {
//     setHolidays(
//       holidays.map(h =>
//         h.id === id
//           ? { ...h, status: h.status === "Active" ? "Inactive" : "Active" }
//           : h
//       )
//     );
//   };

//   const filtered = holidays
//     .filter(h =>
//       h.title.toLowerCase().includes(search.toLowerCase()) ||
//       h.description.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter(h => filterType === "All" ? true : h.type === filterType)
//     .filter(h => filterStatus === "All" ? true : h.status === filterStatus)
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   // Statistics
//   const stats = {
//     total: holidays.length,
//     active: holidays.filter(h => h.status === "Active").length,
//     inactive: holidays.filter(h => h.status === "Inactive").length,
//     publicHolidays: holidays.filter(h => h.type === "Public Holiday").length,
//     companyEvents: holidays.filter(h => h.type === "Company Event").length,
//     optional: holidays.filter(h => h.type === "Optional Holiday").length,
//     upcoming: holidays.filter(h => 
//       new Date(h.date) >= new Date() && h.status === "Active"
//     ).length
//   };

//   return (
//     <div className="dashboard-container">
//       {/* HEADER */}
//       <header className="dashboard-header">
//         <div className="header-left">
//           <h1 className="page-title">🎉 Holidays & Events Calendar</h1>
//           <p className="page-subtitle">
//             Manage company holidays, events, and special occasions
//           </p>
//         </div>

//         <div className="header-right">
//           <div className="view-toggle">
//             <button 
//               className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
//               onClick={() => setViewMode('table')}
//             >
//               📋 Table
//             </button>
//             <button 
//               className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
//               onClick={() => setViewMode('calendar')}
//             >
//               📅 Calendar
//             </button>
//           </div>
//           <button className="btn-primary" onClick={openAddModal}>
//             <span className="btn-icon">+</span> Add Holiday
//           </button>
//         </div>
//       </header>

//       {/* STATS CARDS */}
//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon">📅</div>
//           <div className="stat-content">
//             <h3>Total Holidays</h3>
//             <p className="stat-value">{stats.total}</p>
//             <p className="stat-change">{stats.upcoming} upcoming</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon active">✅</div>
//           <div className="stat-content">
//             <h3>Active</h3>
//             <p className="stat-value">{stats.active}</p>
//             <p className="stat-change">{Math.round((stats.active/stats.total)*100)}% of total</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon upcoming">⏳</div>
//           <div className="stat-content">
//             <h3>Upcoming</h3>
//             <p className="stat-value">{stats.upcoming}</p>
//             <p className="stat-change">Next 365 days</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon types">🎪</div>
//           <div className="stat-content">
//             <h3>Types</h3>
//             <p className="stat-value">3</p>
//             <p className="stat-change">Public/Company/Optional</p>
//           </div>
//         </div>
//       </div>

//       {/* FILTER BAR */}
//       <div className="filters-section">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search holidays by title or description..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="search-input"
//           />
//           <span className="search-icon">🔍</span>
//         </div>

//         <div className="filter-controls">
//           <select
//             className="filter-select"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//           >
//             <option value="All">All Types</option>
//             <option value="Public Holiday">Public Holiday</option>
//             <option value="Company Event">Company Event</option>
//             <option value="Optional Holiday">Optional Holiday</option>
//           </select>

//           <select
//             className="filter-select"
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           >
//             <option value="All">All Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

//           <button 
//             className="btn-secondary"
//             onClick={() => {
//               setSearch("");
//               setFilterType("All");
//               setFilterStatus("All");
//             }}
//           >
//             🔄 Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* CALENDAR VIEW */}
//       {viewMode === "calendar" && (
//         <div className="calendar-section">
//           <div className="calendar-header">
//             <div className="calendar-nav">
//               <button 
//                 className="calendar-nav-btn"
//                 onClick={() => {
//                   if (selectedMonth === 0) {
//                     setSelectedMonth(11);
//                     setSelectedYear(selectedYear - 1);
//                   } else {
//                     setSelectedMonth(selectedMonth - 1);
//                   }
//                 }}
//               >
//                 ◀
//               </button>
//               <h3 className="calendar-title">
//                 {monthNames[selectedMonth]} {selectedYear}
//               </h3>
//               <button 
//                 className="calendar-nav-btn"
//                 onClick={() => {
//                   if (selectedMonth === 11) {
//                     setSelectedMonth(0);
//                     setSelectedYear(selectedYear + 1);
//                   } else {
//                     setSelectedMonth(selectedMonth + 1);
//                   }
//                 }}
//               >
//                 ▶
//               </button>
//             </div>
//             <div className="calendar-legend">
//               <div className="legend-item">
//                 <span className="legend-dot" style={{background: "#ef4444"}}></span>
//                 <span>Public Holiday</span>
//               </div>
//               <div className="legend-item">
//                 <span className="legend-dot" style={{background: "#3b82f6"}}></span>
//                 <span>Company Event</span>
//               </div>
//               <div className="legend-item">
//                 <span className="legend-dot" style={{background: "#10b981"}}></span>
//                 <span>Optional Holiday</span>
//               </div>
//             </div>
//           </div>

//           <div className="calendar-grid">
//             {dayNames.map(day => (
//               <div key={day} className="calendar-day-header">
//                 {day}
//               </div>
//             ))}
            
//             {getCalendarDays().map((dayInfo, index) => (
//               <div 
//                 key={index} 
//                 className={`calendar-day ${dayInfo.isCurrentMonth ? '' : 'other-month'} ${
//                   dayInfo.date === new Date().toISOString().split('T')[0] ? 'today' : ''
//                 }`}
//               >
//                 <div className="day-number">{dayInfo.day}</div>
//                 <div className="day-events">
//                   {dayInfo.holidays.slice(0, 2).map(holiday => (
//                     <div 
//                       key={holiday.id}
//                       className="calendar-event"
//                       style={{background: holiday.color}}
//                       onClick={() => setShowDetails(holiday)}
//                     >
//                       {holiday.title}
//                     </div>
//                   ))}
//                   {dayInfo.holidays.length > 2 && (
//                     <div className="more-events">
//                       +{dayInfo.holidays.length - 2} more
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* TABLE VIEW */}
//       {viewMode === "table" && (
//         <div className="table-section">
//           <div className="table-header">
//             <h3>📋 Holiday & Events List</h3>
//             <div className="table-summary">
//               Showing {filtered.length} of {holidays.length} holidays
//             </div>
//           </div>

//           {filtered.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">📭</div>
//               <h3>No holidays found</h3>
//               <p>Try adjusting your filters or add a new holiday</p>
//               <button className="btn-primary" onClick={openAddModal}>
//                 + Add Holiday
//               </button>
//             </div>
//           ) : (
//             <div className="data-table-container">
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Holiday</th>
//                     <th>Date</th>
//                     <th>Type</th>
//                     <th>Status</th>
//                     <th>Days Until</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.map(h => {
//                     const daysUntil = Math.ceil(
//                       (new Date(h.date) - new Date()) / (1000 * 60 * 60 * 24)
//                     );
                    
//                     return (
//                       <tr key={h.id}>
//                         <td>
//                           <div className="holiday-info">
//                             <div 
//                               className="holiday-color" 
//                               style={{background: h.color}}
//                             ></div>
//                             <div>
//                               <strong className="holiday-title">{h.title}</strong>
//                               <p className="holiday-description">{h.description}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="date-cell">
//                             <div className="date-display">{h.date}</div>
//                             <div className="day-name">
//                               {new Date(h.date).toLocaleDateString('en-US', { weekday: 'long' })}
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <span 
//                             className="type-badge"
//                             style={{
//                               background: `${h.color}20`,
//                               color: h.color,
//                               border: `1px solid ${h.color}40`
//                             }}
//                           >
//                             {h.type}
//                           </span>
//                         </td>
//                         <td>
//                           <span className={`status-badge ${h.status === "Active" ? "active" : "inactive"}`}>
//                             {h.status}
//                           </span>
//                         </td>
//                         <td>
//                           <div className="days-count">
//                             {daysUntil > 0 ? (
//                               <span className="days-until">{daysUntil} days</span>
//                             ) : daysUntil === 0 ? (
//                               <span className="days-today">Today</span>
//                             ) : (
//                               <span className="days-past">Past</span>
//                             )}
//                           </div>
//                         </td>
//                         <td>
//                           <div className="table-actions">
//                             <button
//                               className="icon-btn preview"
//                               onClick={() => setShowDetails(h)}
//                               title="Preview"
//                             >
//                               👁️
//                             </button>
//                             <button
//                               className="icon-btn edit"
//                               onClick={() => openEditModal(h)}
//                               title="Edit"
//                             >
//                               ✏️
//                             </button>
//                             <button
//                               className="icon-btn toggle"
//                               onClick={() => toggleStatus(h.id)}
//                               title="Toggle Status"
//                             >
//                               {h.status === "Active" ? "⛔" : "✅"}
//                             </button>
//                             <button
//                               className="icon-btn delete"
//                               onClick={() => deleteHoliday(h.id)}
//                               title="Delete"
//                             >
//                               🗑️
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {/* TYPE DISTRIBUTION */}
//       <div className="distribution-section">
//         <h3>Holiday Type Distribution</h3>
//         <div className="type-distribution">
//           <div className="type-item">
//             <div className="type-header">
//               <span className="type-dot" style={{background: "#ef4444"}}></span>
//               <span className="type-name">Public Holiday</span>
//             </div>
//             <div className="type-count">{stats.publicHolidays}</div>
//           </div>
//           <div className="type-item">
//             <div className="type-header">
//               <span className="type-dot" style={{background: "#3b82f6"}}></span>
//               <span className="type-name">Company Event</span>
//             </div>
//             <div className="type-count">{stats.companyEvents}</div>
//           </div>
//           <div className="type-item">
//             <div className="type-header">
//               <span className="type-dot" style={{background: "#10b981"}}></span>
//               <span className="type-name">Optional Holiday</span>
//             </div>
//             <div className="type-count">{stats.optional}</div>
//           </div>
//         </div>
//       </div>

//       {/* DETAILS MODAL */}
//       {showDetails && (
//         <div className="modal-overlay" onClick={() => setShowDetails(null)}>
//           <div className="modal-box details-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3>🎉 Holiday Details</h3>
//               <button className="close-btn" onClick={() => setShowDetails(null)}>✕</button>
//             </div>
//             <div className="details-content">
//               <div className="details-header">
//                 <div 
//                   className="details-color" 
//                   style={{background: showDetails.color}}
//                 ></div>
//                 <h2 className="details-title">{showDetails.title}</h2>
//               </div>
              
//               <div className="details-grid">
//                 <div className="detail-item">
//                   <span className="detail-label">Date:</span>
//                   <span className="detail-value">
//                     {showDetails.date} ({new Date(showDetails.date).toLocaleDateString('en-US', { weekday: 'long' })})
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Type:</span>
//                   <span className="detail-value">
//                     <span 
//                       className="type-badge"
//                       style={{
//                         background: `${showDetails.color}20`,
//                         color: showDetails.color
//                       }}
//                     >
//                       {showDetails.type}
//                     </span>
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Status:</span>
//                   <span className={`detail-value status-badge ${showDetails.status === "Active" ? "active" : "inactive"}`}>
//                     {showDetails.status}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">Days Until:</span>
//                   <span className="detail-value">
//                     {Math.ceil((new Date(showDetails.date) - new Date()) / (1000 * 60 * 60 * 24))} days
//                   </span>
//                 </div>
//               </div>
              
//               <div className="detail-item full-width">
//                 <span className="detail-label">Description:</span>
//                 <p className="detail-value description">{showDetails.description}</p>
//               </div>
              
//               <div className="modal-actions">
//                 <button className="btn-primary" onClick={() => {
//                   setShowDetails(null);
//                   openEditModal(showDetails);
//                 }}>
//                   ✏️ Edit Holiday
//                 </button>
//                 <button className="btn-secondary" onClick={() => setShowDetails(null)}>
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ADD/EDIT MODAL */}
//       {showModal && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal-box" onClick={e => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3>{editing ? "✏️ Edit Holiday" : "➕ Add Holiday"}</h3>
//               <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
//             </div>

//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Title *</label>
//                 <input
//                   className="form-input"
//                   placeholder="Enter holiday title"
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Date *</label>
//                 <input
//                   className="form-input"
//                   type="date"
//                   value={form.date}
//                   onChange={(e) => setForm({ ...form, date: e.target.value })}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Type</label>
//                 <select
//                   className="form-input"
//                   value={form.type}
//                   onChange={(e) => {
//                     const type = e.target.value;
//                     setForm({ 
//                       ...form, 
//                       type,
//                       color: typeColors[type] || "#3b82f6"
//                     });
//                   }}
//                 >
//                   <option value="Public Holiday">Public Holiday</option>
//                   <option value="Company Event">Company Event</option>
//                   <option value="Optional Holiday">Optional Holiday</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Status</label>
//                 <select
//                   className="form-input"
//                   value={form.status}
//                   onChange={(e) => setForm({ ...form, status: e.target.value })}
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Description</label>
//               <textarea
//                 className="form-input"
//                 placeholder="Enter holiday description"
//                 rows={3}
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//               />
//             </div>

//             <div className="form-group">
//               <label>Color</label>
//               <div className="color-picker">
//                 {Object.entries(typeColors).map(([type, color]) => (
//                   <button
//                     key={type}
//                     className={`color-option ${form.color === color ? 'selected' : ''}`}
//                     style={{background: color}}
//                     onClick={() => {
//                       setForm({ 
//                         ...form, 
//                         color,
//                         type: form.type === type ? form.type : type
//                       });
//                     }}
//                     title={type}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="modal-actions">
//               <button className="btn-primary" onClick={saveHoliday}>
//                 💾 {editing ? "Update" : "Save"} Holiday
//               </button>
//               <button className="btn-secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .dashboard-container {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
//           color: white;
//           padding: 24px;
//         }

//         /* Header */
//         .dashboard-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 32px;
//           flex-wrap: wrap;
//           gap: 16px;
//         }

//         .header-left {
//           flex: 1;
//         }

//         .header-right {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .page-title {
//           font-size: 28px;
//           font-weight: 700;
//           margin: 0;
//           background: linear-gradient(90deg, #f59e0b, #ef4444);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .page-subtitle {
//           color: #94a3b8;
//           margin-top: 8px;
//         }

//         /* Buttons */
//         .btn-primary {
//           background: linear-gradient(90deg, #f59e0b, #ef4444);
//           color: white;
//           border: none;
//           padding: 12px 24px;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           transition: transform 0.2s;
//         }

//         .btn-primary:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
//         }

//         .btn-secondary {
//           background: #334155;
//           color: white;
//           border: 1px solid #475569;
//           padding: 10px 20px;
//           border-radius: 6px;
//           font-weight: 500;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           transition: background 0.2s;
//         }

//         .btn-secondary:hover {
//           background: #475569;
//         }

//         /* Stats Cards */
//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 20px;
//           margin-bottom: 32px;
//         }

//         .stat-card {
//           background: rgba(30, 41, 59, 0.8);
//           border: 1px solid #334155;
//           border-radius: 12px;
//           padding: 20px;
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           transition: transform 0.2s;
//         }

//         .stat-card:hover {
//           transform: translateY(-4px);
//           border-color: #f59e0b;
//         }

//         .stat-icon {
//           width: 48px;
//           height: 48px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 24px;
//         }

//         .stat-icon.active { background: rgba(34, 197, 94, 0.2); }
//         .stat-icon.upcoming { background: rgba(245, 158, 11, 0.2); }
//         .stat-icon.types { background: rgba(139, 92, 246, 0.2); }

//         .stat-content h3 {
//           margin: 0;
//           font-size: 14px;
//           color: #94a3b8;
//           font-weight: 500;
//         }

//         .stat-value {
//           margin: 4px 0;
//           font-size: 28px;
//           font-weight: 700;
//         }

//         .stat-change {
//           margin: 0;
//           font-size: 12px;
//           color: #10b981;
//         }

//         /* Filters */
//         .filters-section {
//           background: rgba(30, 41, 59, 0.8);
//           border: 1px solid #334155;
//           border-radius: 12px;
//           padding: 20px;
//           margin-bottom: 24px;
//           display: flex;
//           gap: 16px;
//           align-items: center;
//           flex-wrap: wrap;
//         }

//         .search-box {
//           position: relative;
//           flex: 1;
//           min-width: 300px;
//         }

//         .search-input {
//           width: 100%;
//           padding: 12px 16px 12px 44px;
//           background: #0f172a;
//           border: 1px solid #334155;
//           border-radius: 8px;
//           color: white;
//           font-size: 14px;
//         }

//         .search-icon {
//           position: absolute;
//           left: 16px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #94a3b8;
//         }

//         .filter-controls {
//           display: flex;
//           gap: 12px;
//           flex-wrap: wrap;
//         }

//         .filter-select {
//           padding: 10px 16px;
//           background: #0f172a;
//           border: 1px solid #334155;
//           border-radius: 6px;
//           color: white;
//           font-size: 14px;
//           min-width: 140px;
//         }

//         /* View Toggle */
//         .view-toggle {
//           display: flex;
//           gap: 8px;
//           background: #1e293b;
//           border: 1px solid #334155;
//           border-radius: 8px;
//           padding: 4px;
//         }

//         .view-btn {
//           padding: 8px 16px;
//           background: transparent;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           color: #94a3b8;
//           font-weight: 500;
//           transition: all 0.2s;
//         }

//         .view-btn.active {
//           background: #334155;
//           color: white;
//         }

//         /* Calendar */
//         .calendar-section {
//           background: rgba(30, 41, 59, 0.8);
//           border: 1px solid #334155;
//           border-radius: 12px;
//           padding: 24px;
//           margin-bottom: 24px;
//         }

//         .calendar-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 24px;
//           flex-wrap: wrap;
//           gap: 16px;
//         }

//         .calendar-nav {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .calendar-nav-btn {
//           background: #0f172a;
//           border: 1px solid #334155;
//           color: white;
//           width: 36px;
//           height: 36px;
//           border-radius: 6px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 18px;
//         }

//         .calendar-nav-btn:hover {
//           background: #334155;
//         }

//         .calendar-title {
//           margin: 0;
//           font-size: 20px;
//           font-weight: 600;
//           min-width: 200px;
//           text-align: center;
//         }

//         .calendar-legend {
//           display: flex;
//           gap: 24px;
//           flex-wrap: wrap;
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

//         .calendar-grid {
//           display: grid;
//           grid-template-columns: repeat(7, 1fr);
//           gap: 1px;
//           background: #334155;
//           border: 1px solid #334155;
//           border-radius: 8px;
//           overflow: hidden;
//         }

//         .calendar-day-header {
//           background: #1e293b;
//           padding: 12px;
//           text-align: center;
//           font-weight: 600;
//           font-size: 14px;
//           border-bottom: 1px solid #334155;
//         }

//         .calendar-day {
//           background: #0f172a;
//           min-height: 120px;
//           padding: 8px;
//           position: relative;
//           border: 1px solid #334155;
//         }

//         .calendar-day.other-month {
//           background: rgba(15, 23, 42, 0.4);
//         }

//         .calendar-day.today {
//           background: rgba(59, 130, 246, 0.1);
//           border-color: #3b82f6;
//         }

//         .day-number {
//           font-weight: 600;
//           margin-bottom: 8px;
//         }

//         .day-events {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .calendar-event {
//           padding: 4px 8px;
//           border-radius: 4px;
//           font-size: 11px;
//           cursor: pointer;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           transition: transform 0.2s;
//         }

//         .calendar-event:hover {
//           transform: translateY(-2px);
//         }

//         .more-events {
//           font-size: 10px;
//           color: #94a3b8;
//           cursor: pointer;
//         }

//         /* Table Section */
//         .table-section {
//           background: rgba(30, 41, 59, 0.8);
//           border: 1px solid #334155;
//           border-radius: 12px;
//           margin-bottom: 24px;
//           overflow: hidden;
//         }

//         .table-header {
//           padding: 24px;
//           border-bottom: 1px solid #334155;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .table-header h3 {
//           margin: 0;
//           font-size: 18px;
//           font-weight: 600;
//         }

//         .table-summary {
//           color: #94a3b8;
//           font-size: 14px;
//         }

//         .data-table-container {
//           overflow-x: auto;
//         }

//         .data-table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         .data-table th {
//           text-align: left;
//           padding: 16px;
//           background: rgba(15, 23, 42, 0.8);
//           color: #94a3b8;
//           font-weight: 600;
//           font-size: 14px;
//           border-bottom: 1px solid #334155;
//         }

//         .data-table td {
//           padding: 16px;
//           border-bottom: 1px solid #334155;
//         }

//         .data-table tr:hover {
//           background: rgba(30, 41, 59, 0.4);
//         }

//         /* Holiday Info */
//         .holiday-info {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//         }

//         .holiday-color {
//           width: 4px;
//           height: 40px;
//           border-radius: 2px;
//           flex-shrink: 0;
//         }

//         .holiday-title {
//           display: block;
//           margin-bottom: 4px;
//           font-size: 14px;
//         }

//         .holiday-description {
//           margin: 0;
//           font-size: 12px;
//           color: #94a3b8;
//           line-height: 1.4;
//         }

//         /* Date Cell */
//         .date-cell {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .date-display {
//           font-weight: 500;
//         }

//         .day-name {
//           font-size: 12px;
//           color: #94a3b8;
//         }

//         /* Type Badge */
//         .type-badge {
//           padding: 4px 12px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 500;
//           display: inline-block;
//         }

//         /* Status Badge */
//         .status-badge {
//           padding: 6px 12px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 600;
//           display: inline-block;
//         }

//         .status-badge.active {
//           background: rgba(34, 197, 94, 0.2);
//           color: #22c55e;
//           border: 1px solid rgba(34, 197, 94, 0.4);
//         }

//         .status-badge.inactive {
//           background: rgba(239, 68, 68, 0.2);
//           color: #ef4444;
//           border: 1px solid rgba(239, 68, 68, 0.4);
//         }

//         /* Days Count */
//         .days-count {
//           font-size: 14px;
//           font-weight: 500;
//         }

//         .days-until {
//           color: #10b981;
//         }

//         .days-today {
//           color: #f59e0b;
//           font-weight: 600;
//         }

//         .days-past {
//           color: #94a3b8;
//         }

//         /* Table Actions */
//         .table-actions {
//           display: flex;
//           gap: 8px;
//         }

//         .icon-btn {
//           width: 32px;
//           height: 32px;
//           border-radius: 6px;
//           border: 1px solid #334155;
//           background: transparent;
//           color: white;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.2s;
//         }

//         .icon-btn:hover {
//           transform: translateY(-2px);
//         }

//         .icon-btn.preview:hover {
//           background: rgba(59, 130, 246, 0.2);
//           border-color: #3b82f6;
//         }

//         .icon-btn.edit:hover {
//           background: rgba(245, 158, 11, 0.2);
//           border-color: #f59e0b;
//         }

//         .icon-btn.toggle:hover {
//           background: rgba(34, 197, 94, 0.2);
//           border-color: #22c55e;
//         }

//         .icon-btn.delete:hover {
//           background: rgba(239, 68, 68, 0.2);
//           border-color: #ef4444;
//         }

//         /* Distribution Section */
//         .distribution-section {
//           background: rgba(30, 41, 59, 0.8);
//           border: 1px solid #334155;
//           border-radius: 12px;
//           padding: 24px;
//         }

//         .distribution-section h3 {
//           margin: 0 0 20px 0;
//           font-size: 16px;
//           font-weight: 600;
//         }

//         .type-distribution {
//           display: flex;
//           gap: 24px;
//           flex-wrap: wrap;
//         }

//         .type-item {
//           flex: 1;
//           min-width: 200px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 16px;
//           background: rgba(15, 23, 42, 0.4);
//           border-radius: 8px;
//           border: 1px solid #334155;
//         }

//         .type-header {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .type-dot {
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//         }

//         .type-name {
//           font-weight: 500;
//         }

//         .type-count {
//           font-size: 24px;
//           font-weight: 700;
//         }

//         /* Empty State */
//         .empty-state {
//           text-align: center;
//           padding: 60px 20px;
//         }

//         .empty-icon {
//           font-size: 64px;
//           margin-bottom: 20px;
//           opacity: 0.5;
//         }

//         .empty-state h3 {
//           margin: 0 0 8px 0;
//           font-size: 20px;
//         }

//         .empty-state p {
//           color: #94a3b8;
//           margin-bottom: 24px;
//         }

//         /* Modal */
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.8);
//           backdrop-filter: blur(4px);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//           padding: 20px;
//         }

//         .modal-box {
//           background: #1e293b;
//           border: 1px solid #334155;
//           border-radius: 16px;
//           width: 100%;
//           max-width: 600px;
//           max-height: 90vh;
//           overflow-y: auto;
//         }

//         .details-modal {
//           max-width: 500px;
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 24px;
//           border-bottom: 1px solid #334155;
//         }

//         .modal-header h3 {
//           margin: 0;
//           font-size: 20px;
//         }

//         .close-btn {
//           background: none;
//           border: none;
//           color: #94a3b8;
//           font-size: 24px;
//           cursor: pointer;
//           padding: 0;
//           width: 32px;
//           height: 32px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 6px;
//         }

//         .close-btn:hover {
//           background: #334155;
//           color: white;
//         }

//         /* Details Content */
//         .details-content {
//           padding: 24px;
//         }

//         .details-header {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           margin-bottom: 24px;
//         }

//         .details-color {
//           width: 8px;
//           height: 40px;
//           border-radius: 4px;
//           flex-shrink: 0;
//         }

//         .details-title {
//           margin: 0;
//           font-size: 24px;
//         }

//         .details-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 16px;
//           margin-bottom: 24px;
//         }

//         .detail-item {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .detail-item.full-width {
//           grid-column: 1 / -1;
//         }

//         .detail-label {
//           font-size: 12px;
//           color: #94a3b8;
//           font-weight: 500;
//         }

//         .detail-value {
//           font-size: 14px;
//         }

//         .detail-value.description {
//           margin: 0;
//           line-height: 1.6;
//           color: #e2e8f0;
//           padding: 12px;
//           background: rgba(15, 23, 42, 0.4);
//           border-radius: 8px;
//           border: 1px solid #334155;
//         }

//         /* Form */
//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 16px;
//           padding: 24px 24px 0;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           color: #e2e8f0;
//         }

//         .form-input {
//           width: 100%;
//           padding: 12px 16px;
//           background: #0f172a;
//           border: 1px solid #334155;
//           border-radius: 8px;
//           color: white;
//           font-size: 14px;
//         }

//         .form-input:focus {
//           outline: none;
//           border-color: #f59e0b;
//         }

//         /* Color Picker */
//         .color-picker {
//           display: flex;
//           gap: 12px;
//         }

//         .color-option {
//           width: 32px;
//           height: 32px;
//           border-radius: 6px;
//           border: 2px solid transparent;
//           cursor: pointer;
//           transition: transform 0.2s;
//         }

//         .color-option:hover {
//           transform: scale(1.1);
//         }

//         .color-option.selected {
//           border-color: white;
//           box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
//         }

//         .modal-actions {
//           padding: 24px;
//           border-top: 1px solid #334155;
//           display: flex;
//           justify-content: flex-end;
//           gap: 12px;
//         }

//         /* Responsive Design */
//         @media (max-width: 768px) {
//           .dashboard-container {
//             padding: 16px;
//           }
          
//           .dashboard-header {
//             flex-direction: column;
//             align-items: stretch;
//           }
          
//           .header-right {
//             justify-content: space-between;
//           }
          
//           .stats-grid,
//           .form-grid,
//           .details-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .filters-section {
//             flex-direction: column;
//           }
          
//           .search-box {
//             min-width: 100%;
//           }
          
//           .calendar-grid {
//             grid-template-columns: repeat(7, 1fr);
//             font-size: 12px;
//           }
          
//           .calendar-day {
//             min-height: 80px;
//           }
          
//           .type-distribution {
//             flex-direction: column;
//           }
          
//           .type-item {
//             min-width: 100%;
//           }
//         }

//         @media (max-width: 480px) {
//           .calendar-day-header {
//             font-size: 11px;
//             padding: 8px 4px;
//           }
          
//           .calendar-day {
//             min-height: 60px;
//             padding: 4px;
//           }
          
//           .calendar-event {
//             font-size: 9px;
//             padding: 2px 4px;
//           }
          
//           .table-actions {
//             flex-wrap: wrap;
//           }
          
//           .modal-actions {
//             flex-direction: column;
//           }
          
//           .btn-primary,
//           .btn-secondary {
//             width: 100%;
//             justify-content: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HolidaysPage;





import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchHolidays,
  createHoliday,
  deleteHoliday,
  clearMessages
} from "../../../redux/slices/holidaysSlice";

const HolidaysPage = () => {
  const dispatch = useDispatch();
  const { list: holidays, loading, error, successMessage } = useSelector(
    (state) => state.holidays
  );

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'calendar'
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const [form, setForm] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    type: "Public Holiday",
    status: "Active",
    description: "",
    color: "#3b82f6"
  });

  const typeColors = {
    "Public Holiday": "#ef4444",
    "Company Event": "#3b82f6",
    "Optional Holiday": "#10b981"
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Fetch holidays on component mount
  useEffect(() => {
    dispatch(fetchHolidays());
  }, [dispatch]);

  // Auto-clear messages after 5 seconds
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  // Generate calendar days
  const getCalendarDays = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    const holidaysThisMonth = holidays.filter(h => {
      const holidayDate = new Date(h.date);
      return holidayDate.getMonth() === selectedMonth && 
             holidayDate.getFullYear() === selectedYear;
    });

    // Previous month days
    for (let i = 0; i < startingDay; i++) {
      days.push({
        day: "",
        isCurrentMonth: false,
        holidays: []
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayHolidays = holidaysThisMonth.filter(h => h.date === dateStr);
      
      days.push({
        day,
        isCurrentMonth: true,
        date: dateStr,
        holidays: dayHolidays
      });
    }

    return days;
  };

  // Open modal for adding new holiday
  const openAddModal = () => {
    setEditing(null);
    setForm({
      title: "",
      date: new Date().toISOString().split('T')[0],
      type: "Public Holiday",
      status: "Active",
      description: "",
      color: typeColors["Public Holiday"]
    });
    setShowModal(true);
  };

  // Open modal for editing holiday
  const openEditModal = (item) => {
    setEditing(item);
    setForm({ 
      ...item,
      // Ensure date is in YYYY-MM-DD format
      date: item.date ? item.date.split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  // Save holiday (create or update)
  const saveHoliday = async () => {
    if (!form.title.trim()) {
      alert("Holiday Title Required");
      return;
    }
    if (!form.date) {
      alert("Date Required");
      return;
    }

    // Auto-assign color based on type
    const color = typeColors[form.type] || "#3b82f6";

    const holidayData = {
      title: form.title,
      date: form.date,
      type: form.type,
      status: form.status,
      description: form.description,
      color: color
    };

    try {
      if (editing) {
        // For edit, we'll create a new one and delete old (or implement update API)
        await dispatch(createHoliday(holidayData)).unwrap();
        await dispatch(deleteHoliday(editing._id || editing.id)).unwrap();
        alert("Holiday updated successfully!");
      } else {
        await dispatch(createHoliday(holidayData)).unwrap();
      }
      
      setShowModal(false);
      // Refresh holidays list
      dispatch(fetchHolidays());
    } catch (error) {
      alert(`Failed to save holiday: ${error}`);
    }
  };

  // Delete holiday
  const handleDeleteHoliday = async (id) => {
    if (window.confirm("Are you sure you want to delete this holiday?")) {
      try {
        await dispatch(deleteHoliday(id)).unwrap();
        alert("Holiday deleted successfully!");
      } catch (error) {
        alert(`Failed to delete holiday: ${error}`);
      }
    }
  };

  // Toggle holiday status
  const toggleStatus = async (holiday) => {
    const newStatus = holiday.status === "Active" ? "Inactive" : "Active";
    
    try {
      await dispatch(createHoliday({
        ...holiday,
        status: newStatus
      })).unwrap();
      
      // If it was an update, delete old one
      if (holiday._id) {
        await dispatch(deleteHoliday(holiday._id)).unwrap();
      }
      
      // Refresh list
      dispatch(fetchHolidays());
    } catch (error) {
      alert(`Failed to update status: ${error}`);
    }
  };

  // Filter holidays based on search, type, and status
  const filtered = holidays
    .filter(h =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      (h.description && h.description.toLowerCase().includes(search.toLowerCase()))
    )
    .filter(h => filterType === "All" ? true : h.type === filterType)
    .filter(h => filterStatus === "All" ? true : h.status === filterStatus)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Statistics
  const stats = {
    total: holidays.length,
    active: holidays.filter(h => h.status === "Active").length,
    inactive: holidays.filter(h => h.status === "Inactive").length,
    publicHolidays: holidays.filter(h => h.type === "Public Holiday").length,
    companyEvents: holidays.filter(h => h.type === "Company Event").length,
    optional: holidays.filter(h => h.type === "Optional Holiday").length,
    upcoming: holidays.filter(h => {
      const holidayDate = new Date(h.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return holidayDate >= today && h.status === "Active";
    }).length
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Calculate days until holiday
  const calculateDaysUntil = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const holidayDate = new Date(dateString);
    holidayDate.setHours(0, 0, 0, 0);
    const diffTime = holidayDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="dashboard-container">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="alert alert-success">
          ✅ {successMessage}
        </div>
      )}
      
      {error && (
        <div className="alert alert-error">
          ❌ {error.message || "An error occurred"}
        </div>
      )}

      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="page-title">🎉 Holidays & Events Calendar</h1>
          <p className="page-subtitle">
            Manage company holidays, events, and special occasions
          </p>
        </div>

        <div className="header-right">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              disabled={loading}
            >
              📋 Table
            </button>
            <button 
              className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
              disabled={loading}
            >
              📅 Calendar
            </button>
          </div>
          <button 
            className="btn-primary" 
            onClick={openAddModal}
            disabled={loading}
          >
            <span className="btn-icon">+</span> Add Holiday
          </button>
        </div>
      </header>

      {/* Loading State */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading holidays...</p>
        </div>
      )}

      {/* STATS CARDS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Total Holidays</h3>
            <p className="stat-value">{stats.total}</p>
            <p className="stat-change">{stats.upcoming} upcoming</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">✅</div>
          <div className="stat-content">
            <h3>Active</h3>
            <p className="stat-value">{stats.active}</p>
            <p className="stat-change">{stats.total > 0 ? Math.round((stats.active/stats.total)*100) : 0}% of total</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon upcoming">⏳</div>
          <div className="stat-content">
            <h3>Upcoming</h3>
            <p className="stat-value">{stats.upcoming}</p>
            <p className="stat-change">Next 365 days</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon types">🎪</div>
          <div className="stat-content">
            <h3>Types</h3>
            <p className="stat-value">3</p>
            <p className="stat-change">Public/Company/Optional</p>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search holidays by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            disabled={loading}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            disabled={loading}
          >
            <option value="All">All Types</option>
            <option value="Public Holiday">Public Holiday</option>
            <option value="Company Event">Company Event</option>
            <option value="Optional Holiday">Optional Holiday</option>
          </select>

          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            disabled={loading}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button 
            className="btn-secondary"
            onClick={() => {
              setSearch("");
              setFilterType("All");
              setFilterStatus("All");
            }}
            disabled={loading}
          >
            🔄 Clear Filters
          </button>
        </div>
      </div>

      {/* CALENDAR VIEW */}
      {viewMode === "calendar" && (
        <div className="calendar-section">
          <div className="calendar-header">
            <div className="calendar-nav">
              <button 
                className="calendar-nav-btn"
                onClick={() => {
                  if (selectedMonth === 0) {
                    setSelectedMonth(11);
                    setSelectedYear(selectedYear - 1);
                  } else {
                    setSelectedMonth(selectedMonth - 1);
                  }
                }}
                disabled={loading}
              >
                ◀
              </button>
              <h3 className="calendar-title">
                {monthNames[selectedMonth]} {selectedYear}
              </h3>
              <button 
                className="calendar-nav-btn"
                onClick={() => {
                  if (selectedMonth === 11) {
                    setSelectedMonth(0);
                    setSelectedYear(selectedYear + 1);
                  } else {
                    setSelectedMonth(selectedMonth + 1);
                  }
                }}
                disabled={loading}
              >
                ▶
              </button>
            </div>
            <div className="calendar-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{background: "#ef4444"}}></span>
                <span>Public Holiday</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{background: "#3b82f6"}}></span>
                <span>Company Event</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{background: "#10b981"}}></span>
                <span>Optional Holiday</span>
              </div>
            </div>
          </div>

          <div className="calendar-grid">
            {dayNames.map(day => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
            
            {getCalendarDays().map((dayInfo, index) => (
              <div 
                key={index} 
                className={`calendar-day ${dayInfo.isCurrentMonth ? '' : 'other-month'} ${
                  dayInfo.date === new Date().toISOString().split('T')[0] ? 'today' : ''
                }`}
              >
                <div className="day-number">{dayInfo.day}</div>
                <div className="day-events">
                  {dayInfo.holidays.slice(0, 2).map(holiday => (
                    <div 
                      key={holiday._id || holiday.id}
                      className="calendar-event"
                      style={{background: holiday.color}}
                      onClick={() => setShowDetails(holiday)}
                    >
                      {holiday.title}
                    </div>
                  ))}
                  {dayInfo.holidays.length > 2 && (
                    <div className="more-events">
                      +{dayInfo.holidays.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <div className="table-section">
          <div className="table-header">
            <h3>📋 Holiday & Events List</h3>
            <div className="table-summary">
              Showing {filtered.length} of {holidays.length} holidays
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No holidays found</h3>
              <p>Try adjusting your filters or add a new holiday</p>
              <button className="btn-primary" onClick={openAddModal}>
                + Add Holiday
              </button>
            </div>
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Holiday</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Days Until</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(h => {
                    const daysUntil = calculateDaysUntil(h.date);
                    
                    return (
                      <tr key={h._id || h.id}>
                        <td>
                          <div className="holiday-info">
                            <div 
                              className="holiday-color" 
                              style={{background: h.color || typeColors[h.type] || "#3b82f6"}}
                            ></div>
                            <div>
                              <strong className="holiday-title">{h.title}</strong>
                              <p className="holiday-description">{h.description || "No description"}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="date-cell">
                            <div className="date-display">{formatDate(h.date)}</div>
                            <div className="day-name">
                              {new Date(h.date).toLocaleDateString('en-US', { weekday: 'long' })}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span 
                            className="type-badge"
                            style={{
                              background: `${h.color || typeColors[h.type] || "#3b82f6"}20`,
                              color: h.color || typeColors[h.type] || "#3b82f6",
                              border: `1px solid ${h.color || typeColors[h.type] || "#3b82f6"}40`
                            }}
                          >
                            {h.type}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${h.status === "Active" ? "active" : "inactive"}`}>
                            {h.status}
                          </span>
                        </td>
                        <td>
                          <div className="days-count">
                            {daysUntil > 0 ? (
                              <span className="days-until">{daysUntil} days</span>
                            ) : daysUntil === 0 ? (
                              <span className="days-today">Today</span>
                            ) : (
                              <span className="days-past">Past</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="icon-btn preview"
                              onClick={() => setShowDetails(h)}
                              title="Preview"
                              disabled={loading}
                            >
                              👁️
                            </button>
                            <button
                              className="icon-btn edit"
                              onClick={() => openEditModal(h)}
                              title="Edit"
                              disabled={loading}
                            >
                              ✏️
                            </button>
                            <button
                              className="icon-btn toggle"
                              onClick={() => toggleStatus(h)}
                              title="Toggle Status"
                              disabled={loading}
                            >
                              {h.status === "Active" ? "⛔" : "✅"}
                            </button>
                            <button
                              className="icon-btn delete"
                              onClick={() => handleDeleteHoliday(h._id || h.id)}
                              title="Delete"
                              disabled={loading}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TYPE DISTRIBUTION */}
      <div className="distribution-section">
        <h3>Holiday Type Distribution</h3>
        <div className="type-distribution">
          <div className="type-item">
            <div className="type-header">
              <span className="type-dot" style={{background: "#ef4444"}}></span>
              <span className="type-name">Public Holiday</span>
            </div>
            <div className="type-count">{stats.publicHolidays}</div>
          </div>
          <div className="type-item">
            <div className="type-header">
              <span className="type-dot" style={{background: "#3b82f6"}}></span>
              <span className="type-name">Company Event</span>
            </div>
            <div className="type-count">{stats.companyEvents}</div>
          </div>
          <div className="type-item">
            <div className="type-header">
              <span className="type-dot" style={{background: "#10b981"}}></span>
              <span className="type-name">Optional Holiday</span>
            </div>
            <div className="type-count">{stats.optional}</div>
          </div>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {showDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(null)}>
          <div className="modal-box details-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎉 Holiday Details</h3>
              <button className="close-btn" onClick={() => setShowDetails(null)}>✕</button>
            </div>
            <div className="details-content">
              <div className="details-header">
                <div 
                  className="details-color" 
                  style={{background: showDetails.color || typeColors[showDetails.type] || "#3b82f6"}}
                ></div>
                <h2 className="details-title">{showDetails.title}</h2>
              </div>
              
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">
                    {formatDate(showDetails.date)} ({new Date(showDetails.date).toLocaleDateString('en-US', { weekday: 'long' })})
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">
                    <span 
                      className="type-badge"
                      style={{
                        background: `${showDetails.color || typeColors[showDetails.type] || "#3b82f6"}20`,
                        color: showDetails.color || typeColors[showDetails.type] || "#3b82f6"
                      }}
                    >
                      {showDetails.type}
                    </span>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status-badge ${showDetails.status === "Active" ? "active" : "inactive"}`}>
                    {showDetails.status}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Days Until:</span>
                  <span className="detail-value">
                    {calculateDaysUntil(showDetails.date)} days
                  </span>
                </div>
              </div>
              
              <div className="detail-item full-width">
                <span className="detail-label">Description:</span>
                <p className="detail-value description">{showDetails.description || "No description available"}</p>
              </div>
              
              <div className="modal-actions">
                <button className="btn-primary" onClick={() => {
                  setShowDetails(null);
                  openEditModal(showDetails);
                }}>
                  ✏️ Edit Holiday
                </button>
                <button className="btn-secondary" onClick={() => setShowDetails(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? "✏️ Edit Holiday" : "➕ Add Holiday"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Title *</label>
                <input
                  className="form-input"
                  placeholder="Enter holiday title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  className="form-input"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  className="form-input"
                  value={form.type}
                  onChange={(e) => {
                    const type = e.target.value;
                    setForm({ 
                      ...form, 
                      type,
                      color: typeColors[type] || "#3b82f6"
                    });
                  }}
                  disabled={loading}
                >
                  <option value="Public Holiday">Public Holiday</option>
                  <option value="Company Event">Company Event</option>
                  <option value="Optional Holiday">Optional Holiday</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-input"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  disabled={loading}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-input"
                placeholder="Enter holiday description"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <div className="color-picker">
                {Object.entries(typeColors).map(([type, color]) => (
                  <button
                    key={type}
                    type="button"
                    className={`color-option ${form.color === color ? 'selected' : ''}`}
                    style={{background: color}}
                    onClick={() => {
                      setForm({ 
                        ...form, 
                        color,
                        type: form.type === type ? form.type : type
                      });
                    }}
                    title={type}
                    disabled={loading}
                  />
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn-primary" 
                onClick={saveHoliday}
                disabled={loading}
              >
                {loading ? "Saving..." : editing ? "💾 Update Holiday" : "💾 Save Holiday"}
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          padding: 24px;
          position: relative;
        }

        /* Alerts */
        .alert {
          padding: 12px 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-weight: 500;
          animation: slideIn 0.3s ease;
        }

        .alert-success {
          background: rgba(34, 197, 94, 0.2);
          border: 1px solid rgba(34, 197, 94, 0.4);
          color: #22c55e;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #ef4444;
        }

        /* Loading Overlay */
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left-color: #f59e0b;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Header */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .header-left {
          flex: 1;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(90deg, #f59e0b, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          color: #94a3b8;
          margin-top: 8px;
        }

        /* Buttons */
        .btn-primary {
          background: linear-gradient(90deg, #f59e0b, #ef4444);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #334155;
          color: white;
          border: 1px solid #475569;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #475569;
        }

        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Stats Cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: #f59e0b;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-icon.active { background: rgba(34, 197, 94, 0.2); }
        .stat-icon.upcoming { background: rgba(245, 158, 11, 0.2); }
        .stat-icon.types { background: rgba(139, 92, 246, 0.2); }

        .stat-content h3 {
          margin: 0;
          font-size: 14px;
          color: #94a3b8;
          font-weight: 500;
        }

        .stat-value {
          margin: 4px 0;
          font-size: 28px;
          font-weight: 700;
        }

        .stat-change {
          margin: 0;
          font-size: 12px;
          color: #10b981;
        }

        /* Filters */
        .filters-section {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          color: white;
          font-size: 14px;
        }

        .search-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .filter-controls {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-select {
          padding: 10px 16px;
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 6px;
          color: white;
          font-size: 14px;
          min-width: 140px;
        }

        .filter-select:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* View Toggle */
        .view-toggle {
          display: flex;
          gap: 8px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 4px;
        }

        .view-btn {
          padding: 8px 16px;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          color: #94a3b8;
          font-weight: 500;
          transition: all 0.2s;
        }

        .view-btn.active {
          background: #334155;
          color: white;
        }

        .view-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Calendar */
        .calendar-section {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .calendar-nav {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .calendar-nav-btn {
          background: #0f172a;
          border: 1px solid #334155;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .calendar-nav-btn:hover:not(:disabled) {
          background: #334155;
        }

        .calendar-nav-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .calendar-title {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          min-width: 200px;
          text-align: center;
        }

        .calendar-legend {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #94a3b8;
        }

        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background: #334155;
          border: 1px solid #334155;
          border-radius: 8px;
          overflow: hidden;
        }

        .calendar-day-header {
          background: #1e293b;
          padding: 12px;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 1px solid #334155;
        }

        .calendar-day {
          background: #0f172a;
          min-height: 120px;
          padding: 8px;
          position: relative;
          border: 1px solid #334155;
        }

        .calendar-day.other-month {
          background: rgba(15, 23, 42, 0.4);
        }

        .calendar-day.today {
          background: rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
        }

        .day-number {
          font-weight: 600;
          margin-bottom: 8px;
        }

        .day-events {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .calendar-event {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: transform 0.2s;
        }

        .calendar-event:hover {
          transform: translateY(-2px);
        }

        .more-events {
          font-size: 10px;
          color: #94a3b8;
          cursor: pointer;
        }

        /* Table Section */
        .table-section {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .table-header {
          padding: 24px;
          border-bottom: 1px solid #334155;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .table-summary {
          color: #94a3b8;
          font-size: 14px;
        }

        .data-table-container {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          text-align: left;
          padding: 16px;
          background: rgba(15, 23, 42, 0.8);
          color: #94a3b8;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 1px solid #334155;
        }

        .data-table td {
          padding: 16px;
          border-bottom: 1px solid #334155;
        }

        .data-table tr:hover {
          background: rgba(30, 41, 59, 0.4);
        }

        /* Holiday Info */
        .holiday-info {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .holiday-color {
          width: 4px;
          height: 40px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .holiday-title {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .holiday-description {
          margin: 0;
          font-size: 12px;
          color: #94a3b8;
          line-height: 1.4;
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Date Cell */
        .date-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .date-display {
          font-weight: 500;
        }

        .day-name {
          font-size: 12px;
          color: #94a3b8;
        }

        /* Type Badge */
        .type-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }

        /* Status Badge */
        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .status-badge.active {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.4);
        }

        .status-badge.inactive {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.4);
        }

        /* Days Count */
        .days-count {
          font-size: 14px;
          font-weight: 500;
        }

        .days-until {
          color: #10b981;
        }

        .days-today {
          color: #f59e0b;
          font-weight: 600;
        }

        .days-past {
          color: #94a3b8;
        }

        /* Table Actions */
        .table-actions {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #334155;
          background: transparent;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .icon-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .icon-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .icon-btn.preview:hover:not(:disabled) {
          background: rgba(59, 130, 246, 0.2);
          border-color: #3b82f6;
        }

        .icon-btn.edit:hover:not(:disabled) {
          background: rgba(245, 158, 11, 0.2);
          border-color: #f59e0b;
        }

        .icon-btn.toggle:hover:not(:disabled) {
          background: rgba(34, 197, 94, 0.2);
          border-color: #22c55e;
        }

        .icon-btn.delete:hover:not(:disabled) {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
        }

        /* Distribution Section */
        .distribution-section {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 24px;
        }

        .distribution-section h3 {
          margin: 0 0 20px 0;
          font-size: 16px;
          font-weight: 600;
        }

        .type-distribution {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .type-item {
          flex: 1;
          min-width: 200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: rgba(15, 23, 42, 0.4);
          border-radius: 8px;
          border: 1px solid #334155;
        }

        .type-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .type-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .type-name {
          font-weight: 500;
        }

        .type-count {
          font-size: 24px;
          font-weight: 700;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .empty-state h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
        }

        .empty-state p {
          color: #94a3b8;
          margin-bottom: 24px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-box {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .details-modal {
          max-width: 500px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #334155;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 20px;
        }

        .close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }

        .close-btn:hover {
          background: #334155;
          color: white;
        }

        /* Details Content */
        .details-content {
          padding: 24px;
        }

        .details-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .details-color {
          width: 8px;
          height: 40px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .details-title {
          margin: 0;
          font-size: 24px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-item.full-width {
          grid-column: 1 / -1;
        }

        .detail-label {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 500;
        }

        .detail-value {
          font-size: 14px;
        }

        .detail-value.description {
          margin: 0;
          line-height: 1.6;
          color: #e2e8f0;
          padding: 12px;
          background: rgba(15, 23, 42, 0.4);
          border-radius: 8px;
          border: 1px solid #334155;
        }

        /* Form */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          padding: 24px 24px 0;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #e2e8f0;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          color: white;
          font-size: 14px;
        }

        .form-input:focus {
          outline: none;
          border-color: #f59e0b;
        }

        .form-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Color Picker */
        .color-picker {
          display: flex;
          gap: 12px;
        }

        .color-option {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .color-option:hover:not(:disabled) {
          transform: scale(1.1);
        }

        .color-option:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .color-option.selected {
          border-color: white;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
        }

        .modal-actions {
          padding: 24px;
          border-top: 1px solid #334155;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 16px;
          }
          
          .dashboard-header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .header-right {
            justify-content: space-between;
          }
          
          .stats-grid,
          .form-grid,
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .filters-section {
            flex-direction: column;
          }
          
          .search-box {
            min-width: 100%;
          }
          
          .calendar-grid {
            grid-template-columns: repeat(7, 1fr);
            font-size: 12px;
          }
          
          .calendar-day {
            min-height: 80px;
          }
          
          .type-distribution {
            flex-direction: column;
          }
          
          .type-item {
            min-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .calendar-day-header {
            font-size: 11px;
            padding: 8px 4px;
          }
          
          .calendar-day {
            min-height: 60px;
            padding: 4px;
          }
          
          .calendar-event {
            font-size: 9px;
            padding: 2px 4px;
          }
          
          .table-actions {
            flex-wrap: wrap;
          }
          
          .modal-actions {
            flex-direction: column;
          }
          
          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default HolidaysPage;