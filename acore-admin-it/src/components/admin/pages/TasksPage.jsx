// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import './TasksPage.css';

// const TasksPage = ({ employeesData, currentUser }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [viewMode, setViewMode] = useState('list');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedClient, setSelectedClient] = useState(null);
  
//   const [filters, setFilters] = useState({
//     projectName: '',
//     status: '',
//     clientId: '',
//     dateRange: { start: '', end: '' }
//   });

//   // Ref for the content wrapper
//   const contentRef = useRef(null);

//   // ✅ SAMPLE TASKS DATA
//   const sampleTasks = useMemo(() => [
//     {
//       id: 1,
//       title: 'Server Configuration',
//       project: 'IT Infrastructure Upgrade',
//       projectId: 3,
//       users: ['John Smith', 'Michael Brown'],
//       userIds: [1, 3],
//       clients: ['Rahul Sharma', 'Jacob Collins'],
//       clientIds: [101, 102],
//       status: 'Testing Phase',
//       priority: 'Medium',
//       startDate: '2024-11-17',
//       dueDate: '2024-12-22',
//       description: 'Configure server settings and optimize performance',
//       progress: 85
//     },
//     {
//       id: 2,
//       title: 'Survey Distribution',
//       project: 'Customer Satisfaction Improvement',
//       projectId: 25,
//       users: ['John Smith', 'Sneha Sharma'],
//       userIds: [1, 5],
//       clients: ['Emily Taylor'],
//       clientIds: [103],
//       status: 'Blocked',
//       priority: 'Low',
//       startDate: '2024-03-06',
//       dueDate: '2024-03-15',
//       description: 'Distribute customer satisfaction surveys',
//       progress: 30
//     },
//     {
//       id: 3,
//       title: 'Homepage Design',
//       project: 'Website Redesign',
//       projectId: 1,
//       users: ['John Smith'],
//       userIds: [1],
//       clients: ['James Anderson'],
//       clientIds: [104],
//       status: 'In Progress',
//       priority: 'High',
//       startDate: '2024-02-25',
//       dueDate: '2024-03-30',
//       description: 'Design new homepage layout',
//       progress: 65
//     },
//     {
//       id: 4,
//       title: 'Prototype Testing',
//       project: 'Product Packaging Redesign',
//       projectId: 22,
//       users: ['John Smith', 'Nisha Kapoor'],
//       userIds: [1, 6],
//       clients: ['James Anderson', 'Jacob Collins'],
//       clientIds: [104, 102],
//       status: 'Testing Phase',
//       priority: 'High',
//       startDate: '2024-03-13',
//       dueDate: '2024-09-14',
//       description: 'Test new packaging prototypes',
//       progress: 90
//     },
//     {
//       id: 5,
//       title: 'Database Migration',
//       project: 'System Upgrade',
//       projectId: 5,
//       users: ['David Taylor', 'Amanda Miller'],
//       userIds: [7, 8],
//       clients: ['Global Enterprises'],
//       clientIds: [105],
//       status: 'In Progress',
//       priority: 'High',
//       startDate: '2024-04-01',
//       dueDate: '2024-06-30',
//       description: 'Migrate database to new server',
//       progress: 50
//     },
//     {
//       id: 6,
//       title: 'API Integration',
//       project: 'Mobile App Development',
//       projectId: 2,
//       users: ['Michael Brown', 'Sarah Davis'],
//       userIds: [3, 4],
//       clients: ['XYZ Tech Solutions'],
//       clientIds: [106],
//       status: 'Planning',
//       priority: 'Medium',
//       startDate: '2024-03-20',
//       dueDate: '2024-05-15',
//       description: 'Integrate third-party APIs',
//       progress: 20
//     }
//   ], []);

//   // ✅ SAMPLE EMPLOYEES DATA
//   const employees = useMemo(() => employeesData || [
//     { id: 1, name: 'John Smith', role: 'Developer', email: 'john@acoreit.com', avatar: 'JS' },
//     { id: 2, name: 'Emily Johnson', role: 'Designer', email: 'emily@acoreit.com', avatar: 'EJ' },
//     { id: 3, name: 'Michael Brown', role: 'Manager', email: 'michael@acoreit.com', avatar: 'MB' },
//     { id: 4, name: 'Sarah Davis', role: 'Analyst', email: 'sarah@acoreit.com', avatar: 'SD' },
//     { id: 5, name: 'Sneha Sharma', role: 'Developer', email: 'sneha@acoreit.com', avatar: 'SS' },
//     { id: 6, name: 'Nisha Kapoor', role: 'Designer', email: 'nisha@acoreit.com', avatar: 'NK' },
//     { id: 7, name: 'David Taylor', role: 'Developer', email: 'david@acoreit.com', avatar: 'DT' },
//     { id: 8, name: 'Amanda Miller', role: 'Tester', email: 'amanda@acoreit.com', avatar: 'AM' }
//   ], [employeesData]);

//   // ✅ SAMPLE CLIENTS DATA
//   const clients = useMemo(() => [
//     { id: 101, name: 'Rahul Sharma', company: 'Sharma Enterprises', email: 'rahul@sharma.com', phone: '+1 (555) 123-4567' },
//     { id: 102, name: 'Jacob Collins', company: 'Collins Corp', email: 'jacob@collins.com', phone: '+1 (555) 987-6543' },
//     { id: 103, name: 'Emily Taylor', company: 'Taylor & Co', email: 'emily@taylor.com', phone: '+1 (555) 456-7890' },
//     { id: 104, name: 'James Anderson', company: 'Anderson Solutions', email: 'james@anderson.com', phone: '+1 (555) 321-6547' },
//     { id: 105, name: 'Global Enterprises', company: 'Global Enterprises', email: 'contact@global.com', phone: '+1 (555) 654-3210' },
//     { id: 106, name: 'XYZ Tech Solutions', company: 'XYZ Tech', email: 'info@xyztech.com', phone: '+1 (555) 789-0123' }
//   ], []);

//   // ✅ FETCH DATA
//   useEffect(() => {
//     setLoading(true);
    
//     const timer = setTimeout(() => {
//       setTasks(sampleTasks);
//       setFilteredTasks(sampleTasks);
//       setLoading(false);
//     }, 800);
    
//     return () => clearTimeout(timer);
//   }, [sampleTasks]);

//   // ✅ APPLY FILTERS
//   useEffect(() => {
//     const applyFilters = () => {
//       let result = [...tasks];
      
//       // Project name filter
//       if (filters.projectName) {
//         const searchTerm = filters.projectName.toLowerCase();
//         result = result.filter(task => 
//           task.project.toLowerCase().includes(searchTerm) ||
//           task.title.toLowerCase().includes(searchTerm)
//         );
//       }
      
//       // Status filter
//       if (filters.status) {
//         result = result.filter(task => task.status === filters.status);
//       }
      
//       // Client filter
//       if (filters.clientId) {
//         result = result.filter(task => 
//           task.clients.some(client => 
//             client.toLowerCase().includes(filters.clientId.toLowerCase())
//           )
//         );
//       }
      
//       // Date range filter
//       if (filters.dateRange.start && filters.dateRange.end) {
//         result = result.filter(task => {
//           const dueDate = new Date(task.dueDate);
//           const start = new Date(filters.dateRange.start);
//           const end = new Date(filters.dateRange.end);
//           return dueDate >= start && dueDate <= end;
//         });
//       }
      
//       setFilteredTasks(result);
//     };
    
//     const timer = setTimeout(applyFilters, 300);
//     return () => clearTimeout(timer);
//   }, [filters, tasks]);

//   // ✅ FILTER HANDLERS
//   const handleFilterChange = useCallback((name, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   }, []);

//   const handleDateRangeChange = useCallback((start, end) => {
//     setFilters(prev => ({
//       ...prev,
//       dateRange: { start, end }
//     }));
//   }, []);

//   const handleClearFilters = useCallback(() => {
//     setFilters({
//       projectName: '',
//       status: '',
//       clientId: '',
//       dateRange: { start: '', end: '' }
//     });
//   }, []);

//   // ✅ CREATE NEW TASK
//   const handleCreateTask = useCallback((taskData) => {
//     const newTask = {
//       id: tasks.length + 1,
//       ...taskData,
//       progress: 0,
//       users: taskData.assignedUsers.map(userId => 
//         employees.find(e => e.id === userId)?.name || 'Unknown'
//       ),
//       userIds: taskData.assignedUsers,
//       clients: taskData.selectedClients.map(clientId =>
//         clients.find(c => c.id === clientId)?.name || 'Unknown'
//       ),
//       clientIds: taskData.selectedClients
//     };
    
//     setTasks(prev => [newTask, ...prev]);
//     setShowCreateForm(false);
//   }, [tasks, employees, clients]);

//   // ✅ DELETE TASK
//   const handleDeleteTask = useCallback((taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       setTasks(prev => prev.filter(task => task.id !== taskId));
//     }
//   }, []);

//   // ✅ EXPORT TO CSV
//   const handleExportCSV = useCallback(() => {
//     const headers = ['Task', 'Project', 'Status', 'Priority', 'Due Date', 'Progress'];
//     const csvContent = [
//       headers.join(','),
//       ...filteredTasks.map(task => [
//         `"${task.title}"`,
//         `"${task.project}"`,
//         task.status,
//         task.priority,
//         task.dueDate,
//         `${task.progress}%`
//       ].join(','))
//     ].join('\n');
    
//     // Create and download CSV
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `tasks_${new Date().toISOString().split('T')[0]}.csv`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   }, [filteredTasks]);

//   // ✅ FORMAT DATE
//   const formatDate = useCallback((dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   }, []);

//   // ✅ GET STATUS COLOR
//   const getStatusColor = useCallback((status) => {
//     const statusColors = {
//       'Testing Phase': '#3b82f6',
//       'In Progress': '#10b981',
//       'Completed': '#059669',
//       'Blocked': '#ef4444',
//       'Planning': '#8b5cf6',
//       'On Hold': '#f59e0b',
//       'Delayed': '#f97316',
//       'Pending': '#64748b',
//       'Cancelled': '#6b7280'
//     };
//     return statusColors[status] || '#94a3b8';
//   }, []);

//   // ✅ GET PRIORITY COLOR
//   const getPriorityColor = useCallback((priority) => {
//     const priorityColors = {
//       'High': '#ef4444',
//       'Medium': '#f59e0b',
//       'Low': '#10b981'
//     };
//     return priorityColors[priority] || '#94a3b8';
//   }, []);

//   // ✅ GET USER INITIALS
//   const getUserInitials = useCallback((userName) => {
//     return userName.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
//   }, []);

//   // ✅ STATUS OPTIONS
//   const statusOptions = useMemo(() => [
//     '', 'In Progress', 'Testing Phase', 'Completed', 'Blocked', 
//     'Planning', 'On Hold', 'Delayed', 'Pending', 'Cancelled'
//   ], []);

//   // ✅ CALCULATE STATS
//   const stats = useMemo(() => ({
//     total: tasks.length,
//     inProgress: tasks.filter(t => t.status === 'In Progress').length,
//     completed: tasks.filter(t => t.status === 'Completed').length,
//     highPriority: tasks.filter(t => t.priority === 'High').length,
//     overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length,
//     avgProgress: Math.round(tasks.reduce((acc, t) => acc + t.progress, 0) / tasks.length) || 0
//   }), [tasks]);

//   // ✅ HANDLE USER CLICK
//   const handleUserClick = useCallback((userName) => {
//     const user = employees.find(e => e.name === userName);
//     if (user) {
//       setSelectedUser(user);
//       // You can show user details modal or navigate
//       console.log('User clicked:', user);
//     }
//   }, [employees]);

//   // ✅ HANDLE CLIENT CLICK
//   const handleClientClick = useCallback((clientName) => {
//     const client = clients.find(c => c.name === clientName);
//     if (client) {
//       setSelectedClient(client);
//       // You can show client details modal or navigate
//       console.log('Client clicked:', client);
//     }
//   }, [clients]);

//   // ✅ CLOSE USER/CLIENT DETAILS
//   const handleCloseDetails = useCallback(() => {
//     setSelectedUser(null);
//     setSelectedClient(null);
//   }, []);

//   return (
//     <div className="tasks-page-container">
//       {/* Header */}
//       <div className="tasks-page-header">
//         <div className="header-content">
//           <div className="header-left">
//             <div className="header-icon">📋</div>
//             <div className="header-title">
//               <h1>Tasks Management</h1>
//               <p>
//                 Track and manage all tasks • Total: 
//                 <span className="count-badge">{tasks.length} Tasks</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="tasks-main-content" ref={contentRef}>
//         {/* Action Bar */}
//         <div className="tasks-action-bar">
//           <button 
//             className="create-task-btn"
//             onClick={() => setShowCreateForm(true)}
//           >
//             <span className="btn-icon">+</span>
//             Create New Task
//           </button>

//           <div className="tasks-view-toggle">
//             <button 
//               className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
//               onClick={() => setViewMode('list')}
//             >
//               <span className="view-toggle-icon">📋</span>
//               List View
//             </button>
//             <button 
//               className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
//               onClick={() => setViewMode('grid')}
//             >
//               <span className="view-toggle-icon">🔲</span>
//               Grid View
//             </button>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <div className="tasks-filters-section">
//           <div className="filters-title">
//             <span>Filters</span>
//             {Object.values(filters).some(filter => filter !== '') && (
//               <button 
//                 onClick={handleClearFilters}
//                 className="clear-all-filters-btn"
//               >
//                 Clear All
//               </button>
//             )}
//           </div>
//           <div className="filters-row">
//             <div className="filter-group">
//               <label>Search Tasks/Projects</label>
//               <div className="search-wrapper">
//                 <input
//                   type="text"
//                   placeholder="Search tasks or projects..."
//                   value={filters.projectName}
//                   onChange={(e) => handleFilterChange('projectName', e.target.value)}
//                   className="filter-input"
//                 />
//                 <span className="search-icon">🔍</span>
//               </div>
//             </div>
            
//             <div className="filter-group">
//               <label>Status</label>
//               <select
//                 value={filters.status}
//                 onChange={(e) => handleFilterChange('status', e.target.value)}
//                 className="filter-select"
//               >
//                 <option value="">All Status</option>
//                 {statusOptions.slice(1).map(status => (
//                   <option key={status} value={status}>
//                     {status}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="filter-group">
//               <label>Due Date Range</label>
//               <div className="date-range-wrapper">
//                 <input
//                   type="date"
//                   value={filters.dateRange.start}
//                   onChange={(e) => handleDateRangeChange(e.target.value, filters.dateRange.end)}
//                   className="date-input"
//                   placeholder="Start Date"
//                 />
//                 <span className="date-separator">to</span>
//                 <input
//                   type="date"
//                   value={filters.dateRange.end}
//                   onChange={(e) => handleDateRangeChange(filters.dateRange.start, e.target.value)}
//                   className="date-input"
//                   placeholder="End Date"
//                 />
//               </div>
//             </div>
            
//             <button 
//               className="clear-filters-btn"
//               onClick={handleClearFilters}
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>

//         {/* Results Info */}
//         <div className="results-info">
//           <span className="results-count">
//             Showing {filteredTasks.length} of {tasks.length} tasks
//           </span>
//           {/* <button 
//             className="export-csv-btn"
//             onClick={handleExportCSV}
//             title="Export to CSV"
//           >
//             <span className="export-icon">📊</span>
//             Export CSV
//           </button> */}
//         </div>

//         {/* Tasks Table/Grid */}
//         {loading ? (
//           <div className="tasks-loading-container">
//             <div className="tasks-loading-spinner"></div>
//             <p className="tasks-loading-text">Loading tasks...</p>
//           </div>
//         ) : viewMode === 'list' ? (
//           <div className="tasks-table-container">
//             <table className="tasks-table">
//               <thead>
//                 <tr>
//                   <th>Task</th>
//                   <th>Project</th>
//                   <th>Users</th>
//                   <th>Clients</th>
//                   <th>Status</th>
//                   <th>Priority</th>
//                   <th>Due Date</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTasks.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-data">
//                       <div className="no-tasks-found">
//                         <span className="no-data-icon">📋</span>
//                         <h4>No tasks found</h4>
//                         <p>Try adjusting your filters or create a new task</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredTasks.map((task) => (
//                     <tr key={task.id}>
//                       <td>
//                         <div className="task-title-cell">
//                           <div className="task-title">{task.title}</div>
//                           <div className="task-description">{task.description}</div>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="project-cell">{task.project}</div>
//                       </td>
//                       <td>
//                         <div className="users-cell">
//                           {task.users.slice(0, 3).map((user, index) => (
//                             <span 
//                               key={index} 
//                               className="user-avatar" 
//                               title={user}
//                               onClick={() => handleUserClick(user)}
//                             >
//                               {getUserInitials(user)}
//                             </span>
//                           ))}
//                           {task.users.length > 3 && (
//                             <span className="user-more" title={`+${task.users.length - 3} more`}>
//                               +{task.users.length - 3}
//                             </span>
//                           )}
//                         </div>
//                       </td>
//                       <td>
//                         <div className="clients-cell">
//                           {task.clients.map((client, index) => (
//                             <span 
//                               key={index} 
//                               className="client-tag"
//                               onClick={() => handleClientClick(client)}
//                             >
//                               {client.split(' ')[0]}
//                             </span>
//                           ))}
//                         </div>
//                       </td>
//                       <td>
//                         <span 
//                           className="status-badge"
//                           style={{ 
//                             backgroundColor: `${getStatusColor(task.status)}20`,
//                             color: getStatusColor(task.status),
//                             borderColor: getStatusColor(task.status)
//                           }}
//                         >
//                           {task.status}
//                         </span>
//                       </td>
//                       <td>
//                         <span 
//                           className="priority-badge"
//                           style={{ color: getPriorityColor(task.priority) }}
//                         >
//                           {task.priority}
//                         </span>
//                       </td>
//                       <td>
//                         <div className={`due-date ${new Date(task.dueDate) < new Date() ? 'overdue' : ''}`}>
//                           {formatDate(task.dueDate)}
//                         </div>
//                       </td>
//                       <td>
//                         <div className="action-buttons">
//                           <button 
//                             className="action-btn view-btn" 
//                             title="View Details"
//                             onClick={() => console.log('View task', task.id)}
//                           >
//                             👁️
//                           </button>
//                           <button 
//                             className="action-btn edit-btn" 
//                             title="Edit Task"
//                             onClick={() => console.log('Edit task', task.id)}
//                           >
//                             ✏️
//                           </button>
//                           {currentUser?.role === 'admin' && (
//                             <button 
//                               className="action-btn delete-btn" 
//                               title="Delete Task"
//                               onClick={() => handleDeleteTask(task.id)}
//                             >
//                               🗑️
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="tasks-grid-container">
//             <div className="tasks-grid">
//               {filteredTasks.length === 0 ? (
//                 <div className="no-tasks-grid">
//                   <span className="no-data-icon">📋</span>
//                   <h4>No tasks found</h4>
//                   <p>Try adjusting your filters or create a new task</p>
//                 </div>
//               ) : (
//                 filteredTasks.map((task) => (
//                   <div key={task.id} className="task-card">
//                     <div className="task-card-header">
//                       <h4 className="task-title">{task.title}</h4>
//                       <span 
//                         className="task-priority"
//                         style={{ color: getPriorityColor(task.priority) }}
//                       >
//                         {task.priority}
//                       </span>
//                     </div>
                    
//                     <div className="task-project">
//                       <span className="project-icon">📁</span>
//                       {task.project}
//                     </div>
                    
//                     <div className="task-description">
//                       {task.description}
//                     </div>
                    
//                     <div className="task-users">
//                       <div className="users-list">
//                         {task.users.map((user, index) => (
//                           <span 
//                             key={index} 
//                             className="user-avatar-small"
//                             title={user}
//                             onClick={() => handleUserClick(user)}
//                           >
//                             {getUserInitials(user)}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
                    
//                     <div className="task-clients">
//                       {task.clients.map((client, index) => (
//                         <span 
//                           key={index} 
//                           className="client-tag-small"
//                           onClick={() => handleClientClick(client)}
//                         >
//                           {client}
//                         </span>
//                       ))}
//                     </div>
                    
//                     <div className="task-status-row">
//                       <span 
//                         className="status-badge"
//                         style={{ 
//                           backgroundColor: `${getStatusColor(task.status)}20`,
//                           color: getStatusColor(task.status)
//                         }}
//                       >
//                         {task.status}
//                       </span>
//                       <div className={`due-date ${new Date(task.dueDate) < new Date() ? 'overdue' : ''}`}>
//                         {formatDate(task.dueDate)}
//                       </div>
//                     </div>
                    
//                     <div className="task-actions">
//                       <button className="view-btn">View</button>
//                       <button className="edit-btn">Edit</button>
//                       {currentUser?.role === 'admin' && (
//                         <button 
//                           className="delete-btn"
//                           onClick={() => handleDeleteTask(task.id)}
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         )}

//         {/* Stats Footer */}
//         <div className="tasks-stats-footer">
//           <div className="stats-grid">
//             <div className="stat-item">
//               <div className="stat-value">{stats.inProgress}</div>
//               <div className="stat-label">In Progress</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">{stats.completed}</div>
//               <div className="stat-label">Completed</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">{stats.highPriority}</div>
//               <div className="stat-label">High Priority</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">{stats.avgProgress}%</div>
//               <div className="stat-label">Avg Progress</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">{stats.overdue}</div>
//               <div className="stat-label">Overdue</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">{stats.total}</div>
//               <div className="stat-label">Total Tasks</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Create Task Form Modal */}
//       {showCreateForm && (
//         <CreateTaskForm
//           employees={employees}
//           clients={clients}
//           onCreate={handleCreateTask}
//           onClose={() => setShowCreateForm(false)}
//         />
//       )}
//     </div>
//   );
// };

// // ✅ CREATE TASK FORM COMPONENT
// // const CreateTaskForm = ({ employees, clients, onCreate, onClose }) => {
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     description: '',
// //     project: '',
// //     status: 'Planning',
// //     priority: 'Medium',
// //     startDate: '',
// //     dueDate: '',
// //     assignedUsers: [],
// //     selectedClients: []
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleMultiSelect = (name, value) => {
// //     setFormData(prev => {
// //       const currentValues = [...prev[name]];
// //       const index = currentValues.indexOf(value);
      
// //       if (index === -1) {
// //         currentValues.push(value);
// //       } else {
// //         currentValues.splice(index, 1);
// //       }
      
// //       return { ...prev, [name]: currentValues };
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
    
// //     // Validate required fields
// //     if (!formData.title || !formData.project || formData.assignedUsers.length === 0) {
// //       alert('Please fill in all required fields');
// //       return;
// //     }
    
// //     onCreate(formData);
// //   };

// //   return (
// //     <div className="create-task-overlay">
// //       <div className="">
// //         <div className="create-task-header">
// //           <h2>Create New Task</h2>
// //           <button onClick={onClose}>✕</button>
// //         </div>
        
// //         <form className="create-task-form" onSubmit={handleSubmit}>
// //           <div className="form-group">
// //             <label>Task Title *</label>
// //             <input
// //               type="text"
// //               name="title"
// //               value={formData.title}
// //               onChange={handleInputChange}
// //               placeholder="Enter task title"
// //               required
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>Description</label>
// //             <textarea
// //               name="description"
// //               value={formData.description}
// //               onChange={handleInputChange}
// //               placeholder="Enter task description"
// //               rows="3"
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>Project Name *</label>
// //             <input
// //               type="text"
// //               name="project"
// //               value={formData.project}
// //               onChange={handleInputChange}
// //               placeholder="Enter project name"
// //               required
// //             />
// //           </div>
          
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Status</label>
// //               <select
// //                 name="status"
// //                 value={formData.status}
// //                 onChange={handleInputChange}
// //               >
// //                 <option value="Planning">Planning</option>
// //                 <option value="In Progress">In Progress</option>
// //                 <option value="Testing Phase">Testing Phase</option>
// //                 <option value="Completed">Completed</option>
// //                 <option value="Blocked">Blocked</option>
// //                 <option value="On Hold">On Hold</option>
// //               </select>
// //             </div>
            
// //             <div className="form-group">
// //               <label>Priority</label>
// //               <select
// //                 name="priority"
// //                 value={formData.priority}
// //                 onChange={handleInputChange}
// //               >
// //                 <option value="Low">Low</option>
// //                 <option value="Medium">Medium</option>
// //                 <option value="High">High</option>
// //               </select>
// //             </div>
// //           </div>
          
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Start Date</label>
// //               <input
// //                 type="date"
// //                 name="startDate"
// //                 value={formData.startDate}
// //                 onChange={handleInputChange}
// //               />
// //             </div>
            
// //             <div className="form-group">
// //               <label>Due Date</label>
// //               <input
// //                 type="date"
// //                 name="dueDate"
// //                 value={formData.dueDate}
// //                 onChange={handleInputChange}
// //               />
// //             </div>
// //           </div>
          
// //           {/* Assign Users Dropdown */}
// //           <div className="form-group">
// //             <label>Assign to Users *</label>
// //             <div className="multi-select-dropdown">
// //               <div className="selected-users">
// //                 {formData.assignedUsers.map(userId => {
// //                   const user = employees.find(e => e.id === userId);
// //                   return user ? (
// //                     <span key={userId} className="selected-tag">
// //                       {user.name}
// //                       <button
// //                         type="button"
// //                         onClick={() => handleMultiSelect('assignedUsers', userId)}
// //                         className="remove-tag"
// //                       >
// //                         ✕
// //                       </button>
// //                     </span>
// //                   ) : null;
// //                 })}
// //               </div>
// //               <select
// //                 className="multi-select"
// //                 onChange={(e) => {
// //                   if (e.target.value) {
// //                     handleMultiSelect('assignedUsers', parseInt(e.target.value));
// //                     e.target.value = '';
// //                   }
// //                 }}
// //               >
// //                 <option value="">Select users to assign...</option>
// //                 {employees.map(employee => (
// //                   <option 
// //                     key={employee.id} 
// //                     value={employee.id}
// //                     disabled={formData.assignedUsers.includes(employee.id)}
// //                   >
// //                     {employee.name} - {employee.role}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>
          
// //           {/* Assign Clients Dropdown */}
// //           <div className="form-group">
// //             <label>Assign to Clients</label>
// //             <div className="multi-select-dropdown">
// //               <div className="selected-users">
// //                 {formData.selectedClients.map(clientId => {
// //                   const client = clients.find(c => c.id === clientId);
// //                   return client ? (
// //                     <span key={clientId} className="selected-tag">
// //                       {client.name}
// //                       <button
// //                         type="button"
// //                         onClick={() => handleMultiSelect('selectedClients', clientId)}
// //                         className="remove-tag"
// //                       >
// //                         ✕
// //                       </button>
// //                     </span>
// //                   ) : null;
// //                 })}
// //               </div>
// //               <select
// //                 className="multi-select"
// //                 onChange={(e) => {
// //                   if (e.target.value) {
// //                     handleMultiSelect('selectedClients', parseInt(e.target.value));
// //                     e.target.value = '';
// //                   }
// //                 }}
// //               >
// //                 <option value="">Select clients...</option>
// //                 {clients.map(client => (
// //                   <option 
// //                     key={client.id} 
// //                     value={client.id}
// //                     disabled={formData.selectedClients.includes(client.id)}
// //                   >
// //                     {client.name} - {client.company}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>
          
// //           <div className="form-actions">
// //             <button 
// //               type="button"
// //               className="cancel-btn"
// //               onClick={onClose}
// //             >
// //               Cancel
// //             </button>
// //             <button 
// //               type="submit"
// //               className="submit-btn"
// //             >
// //               Create Task
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };



// const CreateTaskForm = ({ employees, onCreate, onClose }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     project: '',
//     status: 'Planning',
//     priority: 'Medium',
//     startDate: '',
//     dueDate: '',
//     assignedUsers: []
//   });

//   // ✅ STATIC PROJECTS DATA WITH EMPLOYEES
//   const projects = [
//     { id: 1, name: 'IT Infrastructure Upgrade', employees: [1, 3] }, // John Smith, Michael Brown
//     { id: 2, name: 'Customer Satisfaction Improvement', employees: [1, 5] }, // John Smith, Sneha Sharma
//     { id: 3, name: 'Website Redesign', employees: [1] }, // John Smith
//     { id: 4, name: 'Product Packaging Redesign', employees: [1, 6] }, // John Smith, Nisha Kapoor
//     { id: 5, name: 'System Upgrade', employees: [7, 8] }, // David Taylor, Amanda Miller
//     { id: 6, name: 'Mobile App Development', employees: [3, 4] }, // Michael Brown, Sarah Davis
//   ];

//   // ✅ WHEN PROJECT CHANGES, AUTO-FILL EMPLOYEES
//   const handleProjectChange = (e) => {
//     const selectedProjectName = e.target.value;
//     setFormData(prev => ({ ...prev, project: selectedProjectName }));
    
//     // Find the selected project
//     const selectedProject = projects.find(p => p.name === selectedProjectName);
    
//     if (selectedProject) {
//       // Auto-fill assigned users based on project
//       setFormData(prev => ({ 
//         ...prev, 
//         assignedUsers: [...selectedProject.employees] 
//       }));
//     } else {
//       // If no project selected, clear assigned users
//       setFormData(prev => ({ ...prev, assignedUsers: [] }));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     // If project is being changed, use special handler
//     if (name === 'project') {
//       handleProjectChange(e);
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleMultiSelect = (name, value) => {
//     setFormData(prev => {
//       const currentValues = [...prev[name]];
//       const index = currentValues.indexOf(value);
      
//       if (index === -1) {
//         currentValues.push(value);
//       } else {
//         currentValues.splice(index, 1);
//       }
      
//       return { ...prev, [name]: currentValues };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate required fields
//     if (!formData.title || !formData.project || formData.assignedUsers.length === 0) {
//       alert('Please fill in all required fields');
//       return;
//     }
    
//     // Create task data WITHOUT clients
//     const taskData = {
//       ...formData,
//       selectedClients: [] // Empty array for clients
//     };
    
//     onCreate(taskData);
//   };

//   return (
//     <div className="create-task-overlay">
//       <div className="create-task-modal">
//         <div className="create-task-header">
//           <h2>Create New Task</h2>
//           <button onClick={onClose}>✕</button>
//         </div>
        
//         <form className="create-task-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Task Title *</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               placeholder="Enter task title"
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               placeholder="Enter task description"
//               rows="3"
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Project Name *</label>
//             <select
//               name="project"
//               value={formData.project}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select Project</option>
//               {projects.map(project => (
//                 <option key={project.id} value={project.name}>
//                   {project.name}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label>Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//               >
//                 <option value="Planning">Planning</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Testing Phase">Testing Phase</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Blocked">Blocked</option>
//                 <option value="On Hold">On Hold</option>
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label>Priority</label>
//               <select
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleInputChange}
//               >
//                 <option value="Low">Low</option>
//                 <option value="Medium">Medium</option>
//                 <option value="High">High</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label>Start Date</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleInputChange}
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Due Date</label>
//               <input
//                 type="date"
//                 name="dueDate"
//                 value={formData.dueDate}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
          
//           {/* Assign Users Dropdown - Auto-filled based on project */}
//           <div className="form-group">
//             <label>Assign to Users *</label>
//             <div className="multi-select-dropdown">
//               <div className="selected-users">
//                 {formData.assignedUsers.length > 0 ? (
//                   formData.assignedUsers.map(userId => {
//                     const user = employees.find(e => e.id === userId);
//                     return user ? (
//                       <span key={userId} className="selected-tag">
//                         {user.name}
//                         <button
//                           type="button"
//                           onClick={() => handleMultiSelect('assignedUsers', userId)}
//                           className="remove-tag"
//                         >
//                           ✕
//                         </button>
//                       </span>
//                     ) : null;
//                   })
//                 ) : (
//                   <span className="no-users-selected">
//                     {formData.project 
//                       ? `No employees found for "${formData.project}"`
//                       : "Select a project to auto-fill employees"}
//                   </span>
//                 )}
//               </div>
              
//               <div className="auto-fill-info">
//                 {formData.project && formData.assignedUsers.length > 0 && (
//                   <div className="auto-fill-message">
//                      {/* {formData.assignedUsers.length} employee(s)  "{formData.project}" */}
//                   </div>
//                 )}
//               </div>
              
//               <select
//                 className="multi-select"
//                 onChange={(e) => {
//                   if (e.target.value) {
//                     handleMultiSelect('assignedUsers', parseInt(e.target.value));
//                     e.target.value = '';
//                   }
//                 }}
//               >
//                 <option value="">Add more users...</option>
//                 {employees.map(employee => (
//                   <option 
//                     key={employee.id} 
//                     value={employee.id}
//                     disabled={formData.assignedUsers.includes(employee.id)}
//                   >
//                     {employee.name} - {employee.role}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="helper-text">
//               {formData.project 
//                 ? `Employees from "${formData.project}" are auto-selected. You can add/remove.`
//                 : "Select a project first to auto-fill assigned users."}
//             </div>
//           </div>
          
//           <div className="form-actions">
//             <button 
//               type="button"
//               className="cancel-btn"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit"
//               className="submit-btn"
//             >
//               Create Task
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TasksPage;







import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTaskStatus, deleteTask } from '../../../redux/slices/tasksSlice';
import './TasksPage.css';

const TasksPage = ({ employeesData, currentUser }) => {
  const dispatch = useDispatch();
  
  // ✅ REDUX STATE से data लें
  const { tasks: tasksFromAPI, loading, error } = useSelector(state => state.tasks);
  
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  
  const [filters, setFilters] = useState({
    projectName: '',
    status: '',
    clientId: '',
    dateRange: { start: '', end: '' }
  });

  // Ref for the content wrapper
  const contentRef = useRef(null);

  // ✅ STATIC DATA हटाएं - सब API से आएगा
  // ❌ REMOVE: const sampleTasks = useMemo(() => [...], []);
  // ❌ REMOVE: const employees = useMemo(() => employeesData || [...], [employeesData]);
  // ❌ REMOVE: const clients = useMemo(() => [...], []);

  // ✅ FETCH DATA FROM API
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // ✅ API DATA को filteredTasks में update करें
  useEffect(() => {
    if (tasksFromAPI && tasksFromAPI.length > 0) {
      setFilteredTasks(tasksFromAPI);
    } else {
      setFilteredTasks([]);
    }
  }, [tasksFromAPI]);

  // ✅ APPLY FILTERS (API data पर)
  useEffect(() => {
    const applyFilters = () => {
      if (!tasksFromAPI) return;
      
      let result = [...tasksFromAPI];
      
      // Project name filter
      if (filters.projectName) {
        const searchTerm = filters.projectName.toLowerCase();
        result = result.filter(task => 
          (task.project && task.project.toLowerCase().includes(searchTerm)) ||
          (task.title && task.title.toLowerCase().includes(searchTerm))
        );
      }
      
      // Status filter
      if (filters.status) {
        result = result.filter(task => task.status === filters.status);
      }
      
      // Client filter
      if (filters.clientId) {
        result = result.filter(task => 
          task.clients && task.clients.some(client => 
            typeof client === 'string' ? 
            client.toLowerCase().includes(filters.clientId.toLowerCase()) :
            client.name && client.name.toLowerCase().includes(filters.clientId.toLowerCase())
          )
        );
      }
      
      // Date range filter
      if (filters.dateRange.start && filters.dateRange.end) {
        result = result.filter(task => {
          if (!task.dueDate) return true;
          const dueDate = new Date(task.dueDate);
          const start = new Date(filters.dateRange.start);
          const end = new Date(filters.dateRange.end);
          return dueDate >= start && dueDate <= end;
        });
      }
      
      setFilteredTasks(result);
    };
    
    const timer = setTimeout(applyFilters, 300);
    return () => clearTimeout(timer);
  }, [filters, tasksFromAPI]);

  // ✅ FILTER HANDLERS
  const handleFilterChange = useCallback((name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleDateRangeChange = useCallback((start, end) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { start, end }
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      projectName: '',
      status: '',
      clientId: '',
      dateRange: { start: '', end: '' }
    });
  }, []);

  // ✅ CREATE NEW TASK WITH API
  const handleCreateTask = async (taskData) => {
    try {
      const result = await dispatch(createTask(taskData));
      if (result?.payload) {
        alert("Task Created Successfully");
        setShowCreateForm(false);
        // Refresh tasks
        dispatch(fetchTasks());
      } else {
        alert("Task Create Failed");
      }
    } catch (err) {
      alert("Error creating task: " + err.message);
    }
  };

  // ✅ DELETE TASK WITH API
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const result = await dispatch(deleteTask(taskId));
        if (result?.payload) {
          alert("Task Deleted Successfully");
          // Refresh tasks
          dispatch(fetchTasks());
        } else {
          alert("Delete Failed");
        }
      } catch (err) {
        alert("Error deleting task: " + err.message);
      }
    }
  };

  // ✅ VIEW TASK DETAILS
  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  // ✅ UPDATE TASK STATUS
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const result = await dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
      if (result?.payload) {
        alert("Status Updated Successfully");
        dispatch(fetchTasks());
      }
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  // ✅ EXPORT TO CSV
  const handleExportCSV = useCallback(() => {
    if (!filteredTasks || filteredTasks.length === 0) {
      alert("No tasks to export");
      return;
    }
    
    const headers = ['Task', 'Project', 'Status', 'Priority', 'Due Date', 'Progress'];
    const csvContent = [
      headers.join(','),
      ...filteredTasks.map(task => [
        `"${task.title || ''}"`,
        `"${task.project || ''}"`,
        task.status || '',
        task.priority || '',
        task.dueDate || '',
        `${task.progress || 0}%`
      ].join(','))
    ].join('\n');
    
    // Create and download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, [filteredTasks]);

  // ✅ FORMAT DATE
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  // ✅ GET STATUS COLOR
  const getStatusColor = useCallback((status) => {
    const statusColors = {
      'Testing Phase': '#3b82f6',
      'In Progress': '#10b981',
      'Completed': '#059669',
      'Blocked': '#ef4444',
      'Planning': '#8b5cf6',
      'On Hold': '#f59e0b',
      'Delayed': '#f97316',
      'Pending': '#64748b',
      'Cancelled': '#6b7280'
    };
    return statusColors[status] || '#94a3b8';
  }, []);

  // ✅ GET PRIORITY COLOR
  const getPriorityColor = useCallback((priority) => {
    const priorityColors = {
      'High': '#ef4444',
      'Medium': '#f59e0b',
      'Low': '#10b981'
    };
    return priorityColors[priority] || '#94a3b8';
  }, []);

  // ✅ GET USER INITIALS
  const getUserInitials = useCallback((userName) => {
    if (!userName) return 'NA';
    return userName.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  }, []);

  // ✅ STATUS OPTIONS
  const statusOptions = useMemo(() => [
    '', 'In Progress', 'Testing Phase', 'Completed', 'Blocked', 
    'Planning', 'On Hold', 'Delayed', 'Pending', 'Cancelled'
  ], []);

  // ✅ CALCULATE STATS (API data से)
  const stats = useMemo(() => {
    const tasks = tasksFromAPI || [];
    return {
      total: tasks.length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      completed: tasks.filter(t => t.status === 'Completed').length,
      highPriority: tasks.filter(t => t.priority === 'High').length,
      overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length,
      avgProgress: Math.round(tasks.reduce((acc, t) => acc + (t.progress || 0), 0) / tasks.length) || 0
    };
  }, [tasksFromAPI]);

  // ✅ HANDLE USER CLICK
  const handleUserClick = useCallback((userName) => {
    // employeesData prop से employee ढूंढें
    const user = employeesData?.find(e => e.name === userName);
    if (user) {
      setSelectedUser(user);
    } else {
      console.log('User not found:', userName);
    }
  }, [employeesData]);

  // ✅ HANDLE CLIENT CLICK
  const handleClientClick = useCallback((clientName) => {
    // API से clients data आएगा, अभी के लिए console.log
    console.log('Client clicked:', clientName);
    // Future में: API से client details fetch करें
  }, []);

  // ✅ CLOSE USER/CLIENT DETAILS
  const handleCloseDetails = useCallback(() => {
    setSelectedUser(null);
    setSelectedClient(null);
    setSelectedTask(null);
  }, []);

  // Loading और Error states
  if (loading && !tasksFromAPI) {
    return (
      <div className="tasks-page-container">
        <div className="tasks-loading-container">
          <div className="tasks-loading-spinner"></div>
          <p className="tasks-loading-text">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tasks-page-container">
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <h4>Error Loading Tasks</h4>
          <p>{error}</p>
          <button onClick={() => dispatch(fetchTasks())}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-page-container">
      {/* Header */}
      <div className="tasks-page-header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-icon">📋</div>
            <div className="header-title">
              <h1>Tasks Management</h1>
              <p>
                Track and manage all tasks • Total: 
                <span className="count-badge">{tasksFromAPI?.length || 0} Tasks</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="tasks-main-content" ref={contentRef}>
        {/* Action Bar */}
        <div className="tasks-action-bar">
          <button 
            className="create-task-btn"
            onClick={() => setShowCreateForm(true)}
          >
            <span className="btn-icon">+</span>
            Create New Task
          </button>

          <div className="tasks-view-toggle">
            <button 
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <span className="view-toggle-icon">📋</span>
              List View
            </button>
            <button 
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <span className="view-toggle-icon">🔲</span>
              Grid View
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="tasks-filters-section">
          <div className="filters-title">
            <span>Filters</span>
            {Object.values(filters).some(filter => filter !== '') && (
              <button 
                onClick={handleClearFilters}
                className="clear-all-filters-btn"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="filters-row">
            <div className="filter-group">
              <label>Search Tasks/Projects</label>
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search tasks or projects..."
                  value={filters.projectName}
                  onChange={(e) => handleFilterChange('projectName', e.target.value)}
                  className="filter-input"
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>
            
            <div className="filter-group">
              <label>Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="filter-select"
              >
                <option value="">All Status</option>
                {statusOptions.slice(1).map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Due Date Range</label>
              <div className="date-range-wrapper">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateRangeChange(e.target.value, filters.dateRange.end)}
                  className="date-input"
                  placeholder="Start Date"
                />
                <span className="date-separator">to</span>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange(filters.dateRange.start, e.target.value)}
                  className="date-input"
                  placeholder="End Date"
                />
              </div>
            </div>
            
            <button 
              className="clear-filters-btn"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <span className="results-count">
            Showing {filteredTasks.length} of {tasksFromAPI?.length || 0} tasks
          </span>
          <button 
            className="export-csv-btn"
            onClick={handleExportCSV}
            title="Export to CSV"
            disabled={!filteredTasks || filteredTasks.length === 0}
          >
            <span className="export-icon">📊</span>
            Export CSV
          </button>
        </div>

        {/* Tasks Table/Grid */}
        {viewMode === 'list' ? (
          <div className="tasks-table-container">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Users</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!filteredTasks || filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">
                      <div className="no-tasks-found">
                        <span className="no-data-icon">📋</span>
                        <h4>No tasks found</h4>
                        <p>Try adjusting your filters or create a new task</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <tr key={task._id || task.id}>
                      <td>
                        <div className="task-title-cell">
                          <div className="task-title">{task.title || 'Untitled Task'}</div>
                          <div className="task-description">{task.description || 'No description'}</div>
                        </div>
                      </td>
                      <td>
                        <div className="project-cell">{task.project || 'No Project'}</div>
                      </td>
                      <td>
                        <div className="users-cell">
                          {/* API data structure के according adjust करें */}
                          {task.assignedUsers && task.assignedUsers.slice(0, 3).map((user, index) => (
                            <span 
                              key={index} 
                              className="user-avatar" 
                              title={typeof user === 'object' ? user.name : user}
                              onClick={() => handleUserClick(typeof user === 'object' ? user.name : user)}
                            >
                              {getUserInitials(typeof user === 'object' ? user.name : user)}
                            </span>
                          ))}
                          {task.assignedUsers && task.assignedUsers.length > 3 && (
                            <span className="user-more" title={`+${task.assignedUsers.length - 3} more`}>
                              +{task.assignedUsers.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: `${getStatusColor(task.status)}20`,
                            color: getStatusColor(task.status),
                            borderColor: getStatusColor(task.status)
                          }}
                        >
                          {task.status || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <span 
                          className="priority-badge"
                          style={{ color: getPriorityColor(task.priority) }}
                        >
                          {task.priority || 'Medium'}
                        </span>
                      </td>
                      <td>
                        <div className={`due-date ${new Date(task.dueDate) < new Date() && task.status !== 'Completed' ? 'overdue' : ''}`}>
                          {formatDate(task.dueDate)}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn view-btn" 
                            title="View Details"
                            onClick={() => handleViewTask(task)}
                          >
                            👁️
                          </button>
                          <button 
                            className="action-btn edit-btn" 
                            title="Edit Task"
                            onClick={() => console.log('Edit task', task._id || task.id)}
                          >
                            ✏️
                          </button>
                          {currentUser?.role === 'admin' && (
                            <button 
                              className="action-btn delete-btn" 
                              title="Delete Task"
                              onClick={() => handleDeleteTask(task._id || task.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="tasks-grid-container">
            <div className="tasks-grid">
              {!filteredTasks || filteredTasks.length === 0 ? (
                <div className="no-tasks-grid">
                  <span className="no-data-icon">📋</span>
                  <h4>No tasks found</h4>
                  <p>Try adjusting your filters or create a new task</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task._id || task.id} className="task-card">
                    <div className="task-card-header">
                      <h4 className="task-title">{task.title || 'Untitled Task'}</h4>
                      <span 
                        className="task-priority"
                        style={{ color: getPriorityColor(task.priority) }}
                      >
                        {task.priority || 'Medium'}
                      </span>
                    </div>
                    
                    <div className="task-project">
                      <span className="project-icon">📁</span>
                      {task.project || 'No Project'}
                    </div>
                    
                    <div className="task-description">
                      {task.description || 'No description available'}
                    </div>
                    
                    <div className="task-users">
                      <div className="users-list">
                        {task.assignedUsers && task.assignedUsers.map((user, index) => (
                          <span 
                            key={index} 
                            className="user-avatar-small"
                            title={typeof user === 'object' ? user.name : user}
                            onClick={() => handleUserClick(typeof user === 'object' ? user.name : user)}
                          >
                            {getUserInitials(typeof user === 'object' ? user.name : user)}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="task-status-row">
                      <span 
                        className="status-badge"
                        style={{ 
                          backgroundColor: `${getStatusColor(task.status)}20`,
                          color: getStatusColor(task.status)
                        }}
                      >
                        {task.status || 'Pending'}
                      </span>
                      <div className={`due-date ${new Date(task.dueDate) < new Date() && task.status !== 'Completed' ? 'overdue' : ''}`}>
                        {formatDate(task.dueDate)}
                      </div>
                    </div>
                    
                    <div className="task-actions">
                      <button className="view-btn" onClick={() => handleViewTask(task)}>View</button>
                      <button className="edit-btn">Edit</button>
                      {currentUser?.role === 'admin' && (
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteTask(task._id || task.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="tasks-stats-footer">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{stats.inProgress}</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.highPriority}</div>
              <div className="stat-label">High Priority</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.avgProgress}%</div>
              <div className="stat-label">Avg Progress</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.overdue}</div>
              <div className="stat-label">Overdue</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Task Form Modal */}
      {showCreateForm && (
        <CreateTaskForm
          employees={employeesData || []}
          onCreate={handleCreateTask}
          onClose={() => setShowCreateForm(false)}
        />
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onStatusUpdate={handleUpdateStatus}
        />
      )}

      {/* Employee Details Modal */}
      {selectedUser && (
        <EmployeeDetailsModal
          employee={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

// ✅ CREATE TASK FORM COMPONENT (Updated)
const CreateTaskForm = ({ employees, onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    status: 'Planning',
    priority: 'Medium',
    startDate: '',
    dueDate: '',
    assignedUsers: []
  });

  const projects = [
    { id: 1, name: 'IT Infrastructure Upgrade', employees: [1, 3] },
    { id: 2, name: 'Customer Satisfaction Improvement', employees: [1, 5] },
    { id: 3, name: 'Website Redesign', employees: [1] },
    { id: 4, name: 'Product Packaging Redesign', employees: [1, 6] },
    { id: 5, name: 'System Upgrade', employees: [7, 8] },
    { id: 6, name: 'Mobile App Development', employees: [3, 4] },
  ];

  const handleProjectChange = (e) => {
    const selectedProjectName = e.target.value;
    setFormData(prev => ({ ...prev, project: selectedProjectName }));
    
    const selectedProject = projects.find(p => p.name === selectedProjectName);
    
    if (selectedProject) {
      setFormData(prev => ({ 
        ...prev, 
        assignedUsers: [...selectedProject.employees] 
      }));
    } else {
      setFormData(prev => ({ ...prev, assignedUsers: [] }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'project') {
      handleProjectChange(e);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => {
      const currentValues = [...prev[name]];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }
      
      return { ...prev, [name]: currentValues };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.project || formData.assignedUsers.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    const taskData = {
      ...formData,
      assignedUsers: formData.assignedUsers.map(id => ({
        userId: id,
        name: employees.find(e => e.id === id)?.name || 'Unknown'
      }))
    };
    
    onCreate(taskData);
  };

  return (
    <div className="create-task-overlay">
      <div className="create-task-modal">
        <div className="create-task-header">
          <h2>Create New Task</h2>
          <button onClick={onClose}>✕</button>
        </div>
        
        <form className="create-task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>Project Name *</label>
            <select
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Testing Phase">Testing Phase</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Assign to Users *</label>
            <div className="multi-select-dropdown">
              <div className="selected-users">
                {formData.assignedUsers.length > 0 ? (
                  formData.assignedUsers.map(userId => {
                    const user = employees.find(e => e.id === userId);
                    return user ? (
                      <span key={userId} className="selected-tag">
                        {user.name}
                        <button
                          type="button"
                          onClick={() => handleMultiSelect('assignedUsers', userId)}
                          className="remove-tag"
                        >
                          ✕
                        </button>
                      </span>
                    ) : null;
                  })
                ) : (
                  <span className="no-users-selected">
                    {formData.project 
                      ? `No employees found for "${formData.project}"`
                      : "Select a project to auto-fill employees"}
                  </span>
                )}
              </div>
              
              <select
                className="multi-select"
                onChange={(e) => {
                  if (e.target.value) {
                    handleMultiSelect('assignedUsers', parseInt(e.target.value));
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Add more users...</option>
                {employees.map(employee => (
                  <option 
                    key={employee.id} 
                    value={employee.id}
                    disabled={formData.assignedUsers.includes(employee.id)}
                  >
                    {employee.name} - {employee.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="helper-text">
              {formData.project 
                ? `Employees from "${formData.project}" are auto-selected. You can add/remove.`
                : "Select a project first to auto-fill assigned users."}
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="submit-btn"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ TASK DETAILS MODAL COMPONENT
const TaskDetailsModal = ({ task, onClose, onStatusUpdate }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [newStatus, setNewStatus] = useState(task.status || 'Pending');

  const handleStatusUpdate = () => {
    if (newStatus !== task.status) {
      onStatusUpdate(task._id || task.id, newStatus);
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content task-details-modal">
        <div className="modal-header">
          <h2>Task Details</h2>
          <button onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>
        
        <div className="modal-body">
          {activeTab === 'details' ? (
            <div className="task-details">
              <div className="detail-row">
                <span className="detail-label">Title:</span>
                <span className="detail-value">{task.title}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Project:</span>
                <span className="detail-value">{task.project}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{task.description || 'No description'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Testing Phase">Testing Phase</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              <div className="detail-row">
                <span className="detail-label">Priority:</span>
                <span className="detail-value">{task.priority}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Due Date:</span>
                <span className="detail-value">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Progress:</span>
                <span className="detail-value">{task.progress || 0}%</span>
              </div>
              
              <div className="assigned-users-section">
                <h4>Assigned Users</h4>
                <div className="users-list">
                  {task.assignedUsers && task.assignedUsers.map((user, index) => (
                    <div key={index} className="user-item">
                      <span className="user-avatar">
                        {user.name ? user.name.split(' ').map(n => n.charAt(0)).join('') : 'NA'}
                      </span>
                      <span className="user-name">{user.name || 'Unknown User'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="activity-log">
              <p>Activity log will be displayed here</p>
              {/* Future: Add activity timeline from API */}
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          {newStatus !== task.status && (
            <button className="btn-primary" onClick={handleStatusUpdate}>
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ EMPLOYEE DETAILS MODAL COMPONENT
const EmployeeDetailsModal = ({ employee, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content employee-details-modal">
        <div className="modal-header">
          <h2>Employee Details</h2>
          <button onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-body">
          <div className="employee-header">
            <div className="employee-avatar-large">
              {employee.name.split(' ').map(n => n.charAt(0)).join('')}
            </div>
            <div className="employee-info">
              <h3>{employee.name}</h3>
              <p className="employee-role">{employee.role}</p>
              <p className="employee-email">{employee.email}</p>
            </div>
          </div>
          
          <div className="employee-details">
            <div className="detail-section">
              <h4>Contact Information</h4>
              <div className="detail-row">
                <span className="detail-label">Employee ID:</span>
                <span className="detail-value">{employee.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{employee.department || 'Not specified'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{employee.phone || 'Not available'}</span>
              </div>
            </div>
            
            <div className="detail-section">
              <h4>Assigned Tasks</h4>
              <p>Total tasks assigned: {employee.taskCount || 0}</p>
              {/* Future: Show specific tasks assigned to this employee */}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;


