// import React, { useState, useEffect, useMemo } from 'react';
// import './ProjectsPage.css';

// const ProjectsPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
  
//   const [filters, setFilters] = useState({
//     status: '',
//     priority: '',
//     search: ''
//   });

//   // Complete sample data with all required fields
//   const sampleProjects = useMemo(() => [
//     {
//       id: 1,
//       title: 'Customer Satisfaction Improvement',
//       description: 'Implement strategies to enhance customer satisfaction and loyalty',
//       status: 'Needs Review',
//       priority: 'medium',
//       startDate: '2024-11-16',
//       endDate: '2025-05-31',
//       daysRemaining: -200, // Deadline missed
//       deadlineMissed: true,
//       totalTasks: 8,
//       completedTasks: 4,
//       inProgressTasks: 2,
//       delayedTasks: 2,
//       comments: 5,
//       progress: 50,
//       client: {
//         id: 25,
//         name: 'Emily Thompson',
//         initial: 'ET',
//         avatarColor: '#3b82f6'
//       },
//       users: [
//         { id: 1, name: 'Main Admin', initial: 'MA', avatarColor: '#10b981', tasksCompleted: 3, tasksPending: 1 },
//         { id: 2, name: 'John Smith', initial: 'JS', avatarColor: '#f59e0b', tasksCompleted: 1, tasksPending: 1 },
//         { id: 20, name: 'Brandon Lee', initial: 'BL', avatarColor: '#8b5cf6', tasksCompleted: 0, tasksPending: 2 }
//       ],
//       favorite: false,
//       budget: '$25,000',
//       spent: '$15,000'
//     },
//     {
//       id: 2,
//       title: 'Website Redesign Project',
//       description: 'Complete website overhaul with modern UI/UX design',
//       status: 'In Progress',
//       priority: 'high',
//       startDate: '2024-12-01',
//       endDate: '2025-03-31',
//       daysRemaining: 45,
//       deadlineMissed: false,
//       totalTasks: 15,
//       completedTasks: 8,
//       inProgressTasks: 5,
//       delayedTasks: 2,
//       comments: 12,
//       progress: 53,
//       client: {
//         id: 30,
//         name: 'ABC Corporation',
//         initial: 'AC',
//         avatarColor: '#ef4444'
//       },
//       users: [
//         { id: 3, name: 'Sarah Wilson', initial: 'SW', avatarColor: '#8b5cf6', tasksCompleted: 5, tasksPending: 3 },
//         { id: 4, name: 'Mike Brown', initial: 'MB', avatarColor: '#06b6d4', tasksCompleted: 3, tasksPending: 2 }
//       ],
//       favorite: true,
//       budget: '$45,000',
//       spent: '$22,500'
//     },
//     {
//       id: 3,
//       title: 'Mobile App Development',
//       description: 'iOS and Android app for customer engagement platform',
//       status: 'Planning',
//       priority: 'medium',
//       startDate: '2024-12-10',
//       endDate: '2025-07-15',
//       daysRemaining: 150,
//       deadlineMissed: false,
//       totalTasks: 28,
//       completedTasks: 5,
//       inProgressTasks: 3,
//       delayedTasks: 0,
//       comments: 8,
//       progress: 18,
//       client: {
//         id: 28,
//         name: 'TechStart Inc',
//         initial: 'TI',
//         avatarColor: '#f59e0b'
//       },
//       users: [
//         { id: 5, name: 'David Chen', initial: 'DC', avatarColor: '#3b82f6', tasksCompleted: 3, tasksPending: 2 },
//         { id: 6, name: 'Emma Garcia', initial: 'EG', avatarColor: '#10b981', tasksCompleted: 2, tasksPending: 1 }
//       ],
//       favorite: false,
//       budget: '$38,000',
//       spent: '$7,000'
//     },
//     {
//       id: 4,
//       title: 'CRM System Upgrade',
//       description: 'Upgrade existing CRM with new features and better UX',
//       status: 'On Hold',
//       priority: 'low',
//       startDate: '2024-03-01',
//       endDate: '2024-06-30',
//       daysRemaining: -90,
//       deadlineMissed: true,
//       totalTasks: 18,
//       completedTasks: 7,
//       inProgressTasks: 4,
//       delayedTasks: 7,
//       comments: 3,
//       progress: 40,
//       client: {
//         id: 32,
//         name: 'Global Enterprises',
//         initial: 'GE',
//         avatarColor: '#64748b'
//       },
//       users: [
//         { id: 7, name: 'Emily Johnson', initial: 'EJ', avatarColor: '#f97316', tasksCompleted: 4, tasksPending: 2 },
//         { id: 8, name: 'Daniel Martinez', initial: 'DM', avatarColor: '#8b5cf6', tasksCompleted: 3, tasksPending: 5 }
//       ],
//       favorite: false,
//       budget: '$22,000',
//       spent: '$18,000'
//     },
//     {
//       id: 5,
//       title: 'Data Analytics Dashboard',
//       description: 'Interactive dashboard for business intelligence analytics',
//       status: 'Completed',
//       priority: 'medium',
//       startDate: '2024-02-15',
//       endDate: '2024-07-31',
//       daysRemaining: 0,
//       deadlineMissed: false,
//       totalTasks: 24,
//       completedTasks: 24,
//       inProgressTasks: 0,
//       delayedTasks: 0,
//       comments: 15,
//       progress: 100,
//       client: {
//         id: 35,
//         name: 'DataCorp International',
//         initial: 'DI',
//         avatarColor: '#06b6d4'
//       },
//       users: [
//         { id: 9, name: 'Sophia Davis', initial: 'SD', avatarColor: '#3b82f6', tasksCompleted: 12, tasksPending: 0 },
//         { id: 10, name: 'William Thompson', initial: 'WT', avatarColor: '#10b981', tasksCompleted: 8, tasksPending: 0 },
//         { id: 11, name: 'Olivia Anderson', initial: 'OA', avatarColor: '#f59e0b', tasksCompleted: 4, tasksPending: 0 }
//       ],
//       favorite: true,
//       budget: '$35,000',
//       spent: '$32,000'
//     }
//   ], []);

//   // Fetch projects
//   useEffect(() => {
//     setTimeout(() => {
//       setProjects(sampleProjects);
//       setFilteredProjects(sampleProjects);
//       setLoading(false);
//     }, 1000);
//   }, [sampleProjects]);

//   // Apply filters
//   useEffect(() => {
//     let result = [...projects];
    
//     if (filters.status) {
//       result = result.filter(project => project.status === filters.status);
//     }
    
//     if (filters.priority) {
//       result = result.filter(project => project.priority === filters.priority);
//     }
    
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       result = result.filter(project => 
//         project.title.toLowerCase().includes(searchLower) ||
//         project.description.toLowerCase().includes(searchLower) ||
//         project.client.name.toLowerCase().includes(searchLower)
//       );
//     }
    
//     setFilteredProjects(result);
//   }, [filters, projects]);

//   // Handlers
//   const handleFilterChange = (name, value) => {
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCreateProject = (projectData) => {
//     const newProject = {
//       id: projects.length + 1,
//       ...projectData,
//       daysRemaining: Math.ceil((new Date(projectData.endDate) - new Date()) / (1000 * 60 * 60 * 24)),
//       deadlineMissed: false,
//       totalTasks: 0,
//       completedTasks: 0,
//       inProgressTasks: 0,
//       delayedTasks: 0,
//       comments: 0,
//       progress: 0,
//       users: [],
//       favorite: false,
//       budget: projectData.budget || '$0',
//       spent: '$0'
//     };
    
//     setProjects(prev => [newProject, ...prev]);
//     setShowCreateForm(false);
//   };

//   const handleAddTask = (taskData, projectId) => {
//     setProjects(prev => prev.map(project => {
//       if (project.id === projectId) {
//         return {
//           ...project,
//           totalTasks: project.totalTasks + 1,
//           inProgressTasks: project.inProgressTasks + 1,
//           progress: Math.round((project.completedTasks / (project.totalTasks + 1)) * 100)
//         };
//       }
//       return project;
//     }));
//     setShowTaskForm(false);
//     setSelectedProject(null);
//   };

//   const toggleFavorite = (projectId) => {
//     setProjects(prev => prev.map(project => 
//       project.id === projectId 
//         ? { ...project, favorite: !project.favorite }
//         : project
//     ));
//   };

//   // Status colors
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'In Progress': return '#3b82f6';
//       case 'Completed': return '#10b981';
//       case 'Needs Review': return '#f59e0b';
//       case 'Planning': return '#8b5cf6';
//       case 'On Hold': return '#ef4444';
//       default: return '#64748b';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'high': return '#ef4444';
//       case 'medium': return '#f59e0b';
//       case 'low': return '#10b981';
//       default: return '#64748b';
//     }
//   };

//   // Calculate stats
//   const stats = useMemo(() => {
//     const totalProjects = projects.length;
//     const activeProjects = projects.filter(p => p.status === 'In Progress').length;
//     const delayedProjects = projects.filter(p => p.daysRemaining < 0).length;
//     const highPriority = projects.filter(p => p.priority === 'high').length;
//     const totalTasks = projects.reduce((acc, p) => acc + p.totalTasks, 0);
//     const completedTasks = projects.reduce((acc, p) => acc + p.completedTasks, 0);
//     const delayedTasks = projects.reduce((acc, p) => acc + p.delayedTasks, 0);
    
//     return {
//       totalProjects,
//       activeProjects,
//       delayedProjects,
//       highPriority,
//       totalTasks,
//       completedTasks,
//       delayedTasks,
//       completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
//     };
//   }, [projects]);

//   if (loading) {
//     return (
//       <div className="projects-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading projects...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="projects-page">
//       {/* Header Section */}
//       <div className="projects-header">
//         <div className="header-content">
//           <h1 className="page-title">
//             <span className="title-icon">📋</span>
//             Projects Management
//           </h1>
//           <p className="page-subtitle">Track, manage, and analyze all your projects in one place</p>
//         </div>
//         <button 
//           className="btn-create-project"
//           onClick={() => setShowCreateForm(true)}
//         >
//           <span className="btn-icon">+</span>
//           New Project
//         </button>
//       </div>

//       {/* Stats Overview */}
//       <div className="stats-overview">
//         <div className="stat-card">
//           <div className="stat-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
//             📋
//           </div>
//           <div className="stat-content">
//             <h3 className="stat-value">{stats.totalProjects}</h3>
//             <p className="stat-label">Total Projects</p>
//           </div>
//         </div>
        
//         <div className="stat-card">
//           <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
//             ✅
//           </div>
//           <div className="stat-content">
//             <h3 className="stat-value">{stats.completedTasks}</h3>
//             <p className="stat-label">Completed Tasks</p>
//           </div>
//         </div>
        
//         <div className="stat-card">
//           <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
//             ⚠️
//           </div>
//           <div className="stat-content">
//             <h3 className="stat-value">{stats.delayedProjects}</h3>
//             <p className="stat-label">Delayed Projects</p>
//           </div>
//         </div>
        
//         <div className="stat-card">
//           <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
//             ⚡
//           </div>
//           <div className="stat-content">
//             <h3 className="stat-value">{stats.activeProjects}</h3>
//             <p className="stat-label">Active Projects</p>
//           </div>
//         </div>
//       </div>

//       {/* Filters Section */}
//       <div className="projects-filters">
//         <div className="search-box">
//           <span className="search-icon">🔍</span>
//           <input
//             type="text"
//             placeholder="Search projects..."
//             value={filters.search}
//             onChange={(e) => handleFilterChange('search', e.target.value)}
//           />
//         </div>
        
//         <div className="filter-buttons">
//           <select
//             value={filters.status}
//             onChange={(e) => handleFilterChange('status', e.target.value)}
//             className="filter-select"
//           >
//             <option value="">All Status</option>
//             <option value="Needs Review">Needs Review</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Planning">Planning</option>
//             <option value="Completed">Completed</option>
//             <option value="On Hold">On Hold</option>
//           </select>
          
//           <select
//             value={filters.priority}
//             onChange={(e) => handleFilterChange('priority', e.target.value)}
//             className="filter-select"
//           >
//             <option value="">All Priorities</option>
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
          
//           <button 
//             className="btn-clear-filters"
//             onClick={() => setFilters({ status: '', priority: '', search: '' })}
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Projects Grid */}
//       <div className="projects-grid">
//         {filteredProjects.map((project) => (
//           <div key={project.id} className="project-card">
//             {/* Card Header */}
//             <div className="project-card-header">
//               <div className="project-title-section">
//                 <div className="project-title-row">
//                   <h3 className="project-title">{project.title}</h3>
//                   <div className="project-actions">
//                     <button 
//                       className={`favorite-btn ${project.favorite ? 'active' : ''}`}
//                       onClick={() => toggleFavorite(project.id)}
//                       title={project.favorite ? "Remove from favorites" : "Add to favorites"}
//                     >
//                       {project.favorite ? '★' : '☆'}
//                     </button>
                    
//                     <div className="dropdown">
//                       <button className="dropdown-toggle" title="More actions">
//                         ⋮
//                       </button>
//                       <div className="dropdown-menu">
//                         <button 
//                           className="dropdown-item"
//                           onClick={() => {
//                             setSelectedProject(project);
//                             setShowTaskForm(true);
//                           }}
//                         >
//                           <span className="dropdown-icon">➕</span>
//                           Add Task
//                         </button>
//                         <button className="dropdown-item">
//                           <span className="dropdown-icon">✏️</span>
//                           Edit Project
//                         </button>
//                         <button className="dropdown-item">
//                           <span className="dropdown-icon">⎘</span>
//                           Duplicate
//                         </button>
//                         <button className="dropdown-item delete">
//                           <span className="dropdown-icon">🗑️</span>
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="project-meta">
//                   <span 
//                     className="status-badge"
//                     style={{ backgroundColor: getStatusColor(project.status) }}
//                   >
//                     {project.status}
//                   </span>
//                   <span 
//                     className="priority-badge"
//                     style={{ backgroundColor: getPriorityColor(project.priority) }}
//                   >
//                     {project.priority}
//                   </span>
//                 </div>
//               </div>
              
//               <p className="project-description">{project.description}</p>
//             </div>

//             {/* Project Info Section */}
//             <div className="project-info-section">
//               <div className="info-row">
//                 <div className="info-item">
//                   <span className="info-label">Start Date</span>
//                   <span className="info-value">
//                     {new Date(project.startDate).toLocaleDateString('en-US', { 
//                       day: 'numeric', 
//                       month: 'short', 
//                       year: 'numeric' 
//                     })}
//                   </span>
//                 </div>
                
//                 <div className="info-item">
//                   <span className="info-label">End Date</span>
//                   <span className="info-value">
//                     {new Date(project.endDate).toLocaleDateString('en-US', { 
//                       day: 'numeric', 
//                       month: 'short', 
//                       year: 'numeric' 
//                     })}
//                   </span>
//                 </div>
//               </div>
              
//               <div className="info-row">
//                 <div className="info-item">
//                   <span className="info-label">Days Remaining</span>
//                   <span className={`info-value ${project.daysRemaining < 0 ? 'danger' : project.daysRemaining < 30 ? 'warning' : ''}`}>
//                     {project.daysRemaining > 0 ? `${project.daysRemaining} days` : 
//                      project.daysRemaining === 0 ? 'Today' : 
//                      `${Math.abs(project.daysRemaining)} days overdue`}
//                   </span>
//                 </div>
                
//                 <div className="info-item">
//                   <span className="info-label">Total Tasks</span>
//                   <span className="info-value">{project.totalTasks}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Team Section */}
//             <div className="team-section">
//               <h4 className="section-title">Team Members</h4>
//               <div className="team-members">
//                 {project.users.map((user) => (
//                   <div key={user.id} className="team-member">
//                     <div 
//                       className="member-avatar"
//                       style={{ backgroundColor: user.avatarColor }}
//                       title={user.name}
//                     >
//                       {user.initial}
//                     </div>
//                     <div className="member-info">
//                       <span className="member-name">{user.name}</span>
//                       <div className="member-tasks">
//                         <span className="task-count completed">{user.tasksCompleted} done</span>
//                         <span className="task-count pending">{user.tasksPending} pending</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Progress Section */}
//             <div className="progress-section">
//               <div className="progress-header">
//                 <span>Overall Progress</span>
//                 <span className="progress-percentage">{project.progress}%</span>
//               </div>
              
//               <div className="progress-bar">
//                 <div 
//                   className="progress-fill"
//                   style={{ width: `${project.progress}%` }}
//                 ></div>
//               </div>
              
//               <div className="task-breakdown">
//                 <div className="breakdown-item">
//                   <span className="breakdown-label">Completed</span>
//                   <span className="breakdown-value">{project.completedTasks}</span>
//                 </div>
//                 <div className="breakdown-item">
//                   <span className="breakdown-label">In Progress</span>
//                   <span className="breakdown-value">{project.inProgressTasks}</span>
//                 </div>
//                 <div className="breakdown-item">
//                   <span className="breakdown-label">Delayed</span>
//                   <span className="breakdown-value">{project.delayedTasks}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Client & Budget Section */}
//             <div className="client-section">
//               <div className="client-info">
//                 <div 
//                   className="client-avatar"
//                   style={{ backgroundColor: project.client.avatarColor }}
//                   title={project.client.name}
//                 >
//                   {project.client.initial}
//                 </div>
//                 <div>
//                   <span className="client-label">Client</span>
//                   <span className="client-name">{project.client.name}</span>
//                 </div>
//               </div>
              
//               <div className="budget-info">
//                 <span className="budget-label">Budget</span>
//                 <span className="budget-amount">{project.budget}</span>
//               </div>
//             </div>

//             {/* Card Footer */}
//             <div className="project-card-footer">
//               <button className="btn-view-details">
//                 View Details
//                 <span className="arrow">→</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Create Project Modal */}
//       {showCreateForm && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Create New Project</h2>
//               <button onClick={() => setShowCreateForm(false)}>×</button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.target);
//                 const projectData = {
//                   title: formData.get('title'),
//                   description: formData.get('description'),
//                   status: formData.get('status'),
//                   priority: formData.get('priority'),
//                   startDate: formData.get('startDate'),
//                   endDate: formData.get('endDate'),
//                   budget: formData.get('budget'),
//                   client: {
//                     name: formData.get('clientName'),
//                     initial: formData.get('clientName').substring(0, 2).toUpperCase(),
//                     avatarColor: '#3b82f6'
//                   }
//                 };
//                 handleCreateProject(projectData);
//               }}>
//                 <div className="form-group">
//                   <label>Project Title *</label>
//                   <input type="text" name="title" required placeholder="Enter project title" />
//                 </div>
//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea name="description" rows="3" placeholder="Project description"></textarea>
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Status</label>
//                     <select name="status">
//                       <option value="Planning">Planning</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Needs Review">Needs Review</option>
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Priority</label>
//                     <select name="priority">
//                       <option value="high">High</option>
//                       <option value="medium">Medium</option>
//                       <option value="low">Low</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Start Date</label>
//                     <input type="date" name="startDate" required />
//                   </div>
//                   <div className="form-group">
//                     <label>End Date</label>
//                     <input type="date" name="endDate" required />
//                   </div>
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Client Name</label>
//                     <input type="text" name="clientName" required placeholder="Enter client name" />
//                   </div>
//                   <div className="form-group">
//                     <label>Budget</label>
//                     <input type="text" name="budget" placeholder="$0.00" />
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn-cancel" onClick={() => setShowCreateForm(false)}>
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn-submit">
//                     Create Project
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Task Modal */}
//       {showTaskForm && selectedProject && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Add Task to {selectedProject.title}</h2>
//               <button onClick={() => {
//                 setShowTaskForm(false);
//                 setSelectedProject(null);
//               }}>×</button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.target);
//                 const taskData = {
//                   title: formData.get('taskTitle'),
//                   description: formData.get('taskDescription'),
//                   priority: formData.get('taskPriority'),
//                   dueDate: formData.get('taskDueDate'),
//                   assigneeId: formData.get('assigneeId')
//                 };
//                 handleAddTask(taskData, selectedProject.id);
//               }}>
//                 <div className="form-group">
//                   <label>Task Title *</label>
//                   <input type="text" name="taskTitle" required placeholder="Enter task title" />
//                 </div>
//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea name="taskDescription" rows="2" placeholder="Task description"></textarea>
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Priority</label>
//                     <select name="taskPriority">
//                       <option value="high">High</option>
//                       <option value="medium">Medium</option>
//                       <option value="low">Low</option>
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Due Date</label>
//                     <input type="date" name="taskDueDate" required />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label>Assign To</label>
//                   <select name="assigneeId">
//                     {selectedProject.users.map(user => (
//                       <option key={user.id} value={user.id}>
//                         {user.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn-cancel" onClick={() => {
//                     setShowTaskForm(false);
//                     setSelectedProject(null);
//                   }}>
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn-submit">
//                     Add Task
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {filteredProjects.length === 0 && (
//         <div className="no-projects">
//           <div className="no-projects-icon">📋</div>
//           <h3>No projects found</h3>
//           <p>Try adjusting your filters or create a new project</p>
//           <button className="btn-create-project" onClick={() => setShowCreateForm(true)}>
//             Create Your First Project
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectsPage;






// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import './ProjectsPage.css';

// const ProjectsPage = ({ currentUser, onCardClick }) => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [viewMode, setViewMode] = useState('list');
//   const [filters, setFilters] = useState({
//     status: '',
//     client: '',
//     priority: '',
//     search: ''
//   });

//   // Scroll state for hide/show
//   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
  
//   // Ref for the content wrapper
//   const contentRef = useRef(null);

//   // Check screen size for responsive design
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
    
//     return () => {
//       window.removeEventListener('resize', checkScreenSize);
//     };
//   }, []);

//   // Scroll event handler
//   useEffect(() => {
//     const handleScroll = () => {
//       const content = contentRef.current;
//       if (!content) return;

//       const currentScrollY = content.scrollTop;
      
//       if (currentScrollY > lastScrollY && currentScrollY > 30) {
//         setIsHeaderVisible(false);
//       } 
//       else if (currentScrollY < lastScrollY) {
//         setIsHeaderVisible(true);
//       }
      
//       setLastScrollY(currentScrollY);
//     };

//     const content = contentRef.current;
//     if (content) {
//       content.addEventListener('scroll', handleScroll, { passive: true });
//     }

//     return () => {
//       if (content) {
//         content.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, [lastScrollY]);

//   // Scroll to top function
//   const handleScrollToTop = useCallback(() => {
//     if (contentRef.current) {
//       contentRef.current.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//       setIsHeaderVisible(true);
//     }
//   }, []);

//   // Complete sample data
//   const sampleProjects = useMemo(() => [
//     {
//       id: 1,
//       title: 'Website Redesign',
//       description: 'Complete redesign of company website with modern UI/UX',
//       tasks: 15,
//       users: ['John Smith', 'Emily Johnson', 'Michael Brown'],
//       client: 'ABC Corporation',
//       status: 'In Progress',
//       priority: 'High',
//       startDate: '2024-02-25',
//       endDate: '2024-05-30',
//       progress: 65,
//       remainingDays: 45,
//       budget: '$25,000'
//     },
//     {
//       id: 2,
//       title: 'Mobile App Development',
//       description: 'iOS and Android application for customer engagement',
//       tasks: 28,
//       users: ['Sarah Wilson', 'David Lee', 'Emma Garcia', 'Robert Chen'],
//       client: 'TechStart Inc',
//       status: 'Planning',
//       priority: 'High',
//       startDate: '2024-03-10',
//       endDate: '2024-08-15',
//       progress: 20,
//       remainingDays: 120,
//       budget: '$45,000'
//     },
//     {
//       id: 3,
//       title: 'E-commerce Platform',
//       description: 'Build online shopping platform with payment integration',
//       tasks: 42,
//       users: ['Michael Brown', 'Lisa Taylor', 'James Wilson'],
//       client: 'Retail Solutions',
//       status: 'Completed',
//       priority: 'Medium',
//       startDate: '2024-01-15',
//       endDate: '2024-04-30',
//       progress: 100,
//       remainingDays: 0,
//       budget: '$38,000'
//     },
//     {
//       id: 4,
//       title: 'CRM System Upgrade',
//       description: 'Upgrade existing CRM with new features and better UX',
//       tasks: 18,
//       users: ['Emily Johnson', 'Daniel Martinez'],
//       client: 'Global Enterprises',
//       status: 'On Hold',
//       priority: 'Low',
//       startDate: '2024-03-01',
//       endDate: '2024-06-30',
//       progress: 40,
//       remainingDays: 90,
//       budget: '$22,000'
//     },
//     {
//       id: 5,
//       title: 'Data Analytics Dashboard',
//       description: 'Interactive dashboard for business intelligence',
//       tasks: 24,
//       users: ['Sophia Davis', 'William Thompson', 'Olivia Anderson'],
//       client: 'DataCorp International',
//       status: 'In Progress',
//       priority: 'Medium',
//       startDate: '2024-02-15',
//       endDate: '2024-07-31',
//       progress: 75,
//       remainingDays: 100,
//       budget: '$35,000'
//     },
//     {
//       id: 6,
//       title: 'Cloud Migration',
//       description: 'Migrate infrastructure to AWS cloud platform',
//       tasks: 32,
//       users: ['Robert Chen', 'Emma Garcia', 'Michael Brown'],
//       client: 'Finance Bank Ltd',
//       status: 'In Progress',
//       priority: 'High',
//       startDate: '2024-03-05',
//       endDate: '2024-09-30',
//       progress: 55,
//       remainingDays: 150,
//       budget: '$60,000'
//     },
//     {
//       id: 7,
//       title: 'Marketing Campaign Website',
//       description: 'Landing pages and microsites for product launch',
//       tasks: 12,
//       users: ['Lisa Taylor', 'David Lee'],
//       client: 'Marketing Pros',
//       status: 'Completed',
//       priority: 'Low',
//       startDate: '2024-02-01',
//       endDate: '2024-03-15',
//       progress: 100,
//       remainingDays: 0,
//       budget: '$15,000'
//     },
//     {
//       id: 8,
//       title: 'API Integration Suite',
//       description: 'Build and integrate multiple third-party APIs',
//       tasks: 20,
//       users: ['Daniel Martinez', 'Sophia Davis', 'John Smith'],
//       client: 'ConnectTech Solutions',
//       status: 'Planning',
//       priority: 'Medium',
//       startDate: '2024-04-01',
//       endDate: '2024-07-15',
//       progress: 10,
//       remainingDays: 95,
//       budget: '$28,000'
//     }
//   ], []);

//   // Fetch projects data
//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setProjects(sampleProjects);
//       setFilteredProjects(sampleProjects);
//       setLoading(false);
//     }, 1000);
    
//     return () => clearTimeout(timer);
//   }, [sampleProjects]);

//   // Apply filters
//   useEffect(() => {
//     let result = [...projects];
    
//     if (filters.status) {
//       result = result.filter(project => project.status === filters.status);
//     }
    
//     if (filters.client) {
//       result = result.filter(project => 
//         project.client.toLowerCase().includes(filters.client.toLowerCase())
//       );
//     }
    
//     if (filters.priority) {
//       result = result.filter(project => project.priority === filters.priority);
//     }
    
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       result = result.filter(project => 
//         project.title.toLowerCase().includes(searchLower) ||
//         project.description.toLowerCase().includes(searchLower) ||
//         project.client.toLowerCase().includes(searchLower)
//       );
//     }
    
//     setFilteredProjects(result);
//   }, [filters, projects]);

//   // Filter handlers
//   const handleFilterChange = useCallback((name, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   }, []);

//   const handleCreateProject = useCallback((projectData) => {
//     const newProject = {
//       id: projects.length + 1,
//       ...projectData,
//       progress: 0,
//       remainingDays: Math.ceil((new Date(projectData.endDate) - new Date()) / (1000 * 60 * 60 * 24)),
//       users: [currentUser?.name || 'Current User']
//     };
    
//     setProjects(prev => [newProject, ...prev]);
//     setShowCreateForm(false);
//   }, [projects.length, currentUser]);

//   const handleDeleteProject = useCallback((projectId) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       setProjects(prev => prev.filter(project => project.id !== projectId));
//     }
//   }, []);

//   // Get status badge class
//   const getStatusClass = (status) => {
//     switch(status) {
//       case 'In Progress': return 'status-in-progress';
//       case 'Planning': return 'status-planning';
//       case 'Completed': return 'status-completed';
//       case 'On Hold': return 'status-on-hold';
//       default: return '';
//     }
//   };

//   // Get priority badge class
//   const getPriorityClass = (priority) => {
//     switch(priority) {
//       case 'High': return 'priority-high';
//       case 'Medium': return 'priority-medium';
//       case 'Low': return 'priority-low';
//       default: return '';
//     }
//   };

//   // Calculate stats
//   const stats = useMemo(() => ({
//     inProgress: projects.filter(p => p.status === 'In Progress').length,
//     completed: projects.filter(p => p.status === 'Completed').length,
//     highPriority: projects.filter(p => p.priority === 'High').length,
//     averageProgress: Math.round(projects.reduce((acc, project) => acc + project.progress, 0) / projects.length) || 0,
//     totalTasks: projects.reduce((acc, project) => acc + project.tasks, 0),
//     totalBudget: projects.reduce((acc, project) => {
//       const budget = parseInt(project.budget.replace(/[$,]/g, ''));
//       return acc + budget;
//     }, 0)
//   }), [projects]);

//   // Responsive header class
//   const getHeaderClass = useCallback(() => {
//     if (isMobile) {
//       return isHeaderVisible ? 'visible mobile' : 'hidden mobile';
//     }
//     return isHeaderVisible ? 'visible' : 'hidden';
//   }, [isHeaderVisible, isMobile]);

//   // Handle clear all filters
//   const handleClearFilters = useCallback(() => {
//     setFilters({
//       status: '',
//       client: '',
//       priority: '',
//       search: ''
//     });
//   }, []);

//   return (
//     <div className="projects-fullpage-container">
//       {/* Projects Header */}
//       <div className={`projects-modal-header ${getHeaderClass()}`}>
//         <div className="projects-modal-header-content">
//           <div className="projects-modal-header-left">
//             <div className="projects-modal-header-icon">📋</div>
//             <div className="projects-modal-header-title">
//               <h1>Projects Management</h1>
//               <p>
//                 {isMobile ? (
//                   <>
//                     <span className="projects-modal-count-badge">{projects.length} Projects</span>
//                   </>
//                 ) : (
//                   <>
//                     Manage and track all projects • Total: 
//                     <span className="projects-modal-count-badge">{projects.length} Projects</span>
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//           <button 
//             className="projects-modal-close-btn" 
//             onClick={() => window.history.back()}
//             aria-label="Close projects page"
//           >
//             ✕
//           </button>
//         </div>
//       </div>

//       {/* Floating Scroll to Top Button */}
//       {!isHeaderVisible && (
//         <button 
//           className="projects-floating-top-btn"
//           onClick={handleScrollToTop}
//           aria-label="Scroll to top"
//         >
//           <span className="projects-floating-icon">↑</span>
//         </button>
//       )}

//       {/* Scrollable Content Area */}
//       <div className="projects-content-wrapper" ref={contentRef}>
//         <div className="projects-main-area">
//           {/* Main Content Container */}
//           <div className="projects-main-container">
//             {/* Action Bar */}
//             <div className="projects-action-bar">
//               <button 
//                 className="create-project-main-btn"
//                 onClick={() => setShowCreateForm(true)}
//               >
//                 <span className="btn-icon-main">+</span>
//                 {isMobile ? 'New Project' : 'Create New Project'}
//               </button>

//               <div className="projects-view-toggle">
//                 <button 
//                   className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
//                   onClick={() => setViewMode('list')}
//                   aria-label="List view"
//                 >
//                   <span className="view-toggle-icon">📋</span>
//                   {isMobile ? 'List' : 'List View'}
//                 </button>
//                 <button 
//                   className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
//                   onClick={() => setViewMode('grid')}
//                   aria-label="Grid view"
//                 >
//                   <span className="view-toggle-icon">🔲</span>
//                   {isMobile ? 'Grid' : 'Grid View'}
//                 </button>
//               </div>
//             </div>

//             {/* Filters Section */}
//             <div className="projects-filters-section">
//               <div className="filters-title">
//                 <span>Filters</span>
//                 {Object.values(filters).some(filter => filter !== '') && (
//                   <button 
//                     onClick={handleClearFilters}
//                     className="clear-all-filters-btn"
//                     style={{
//                       marginLeft: '10px',
//                       fontSize: '12px',
//                       padding: '2px 8px',
//                       background: 'rgba(239, 68, 68, 0.2)',
//                       border: '1px solid rgba(239, 68, 68, 0.3)',
//                       color: '#f87171',
//                       borderRadius: '4px',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Clear All
//                   </button>
//                 )}
//               </div>
//               <div className="filters-row">
//                 <div className="filter-group">
//                   <label>Status</label>
//                   <select 
//                     value={filters.status}
//                     onChange={(e) => handleFilterChange('status', e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="">All Status</option>
//                     <option value="Planning">Planning</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="On Hold">On Hold</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Priority</label>
//                   <select 
//                     value={filters.priority}
//                     onChange={(e) => handleFilterChange('priority', e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="">All Priorities</option>
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Client</label>
//                   <input
//                     type="text"
//                     value={filters.client}
//                     onChange={(e) => handleFilterChange('client', e.target.value)}
//                     placeholder="Search client..."
//                     className="filter-input"
//                   />
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Search</label>
//                   <input
//                     type="text"
//                     value={filters.search}
//                     onChange={(e) => handleFilterChange('search', e.target.value)}
//                     placeholder="Search projects..."
//                     className="filter-input"
//                   />
//                 </div>
                
//                 <button 
//                   className="clear-filters-btn"
//                   onClick={handleClearFilters}
//                 >
//                   {isMobile ? 'Clear' : 'Clear Filters'}
//                 </button>
//               </div>
//             </div>

//             {/* Projects Table */}
//             {loading ? (
//               <div className="projects-loading-container">
//                 <div className="projects-loading-spinner"></div>
//                 <p className="projects-loading-text">Loading projects...</p>
//               </div>
//             ) : (
//               <div className="projects-table-container">
//                 <div className="table-responsive-wrapper">
//                   <table className="projects-table">
//                     <thead>
//                       <tr>
//                         <th>Project Title</th>
//                         <th>Client</th>
//                         <th>Status</th>
//                         <th>Priority</th>
//                         <th>Progress</th>
//                         <th>Team</th>
//                         <th>Timeline</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProjects.map((project) => (
//                         <tr key={project.id}>
//                           <td>
//                             <div className="project-title-cell">
//                               <div className="project-title">{project.title}</div>
//                               <div className="project-description">{project.description}</div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="client-name">{project.client}</div>
//                           </td>
//                           <td>
//                             <span className={`status-badge ${getStatusClass(project.status)}`}>
//                               {isMobile ? project.status.split(' ')[0] : project.status}
//                             </span>
//                           </td>
//                           <td>
//                             <span className={`priority-badge ${getPriorityClass(project.priority)}`}>
//                               {isMobile ? project.priority.charAt(0) : project.priority}
//                             </span>
//                           </td>
//                           <td>
//                             <div className="progress-cell">
//                               <div className="project-progress-bar">
//                                 <div 
//                                   className="project-progress-fill"
//                                   style={{ width: `${project.progress}%` }}
//                                 ></div>
//                               </div>
//                               <div className="progress-percentage">{project.progress}%</div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="team-cell">
//                               <div className="team-count">{project.users.length} members</div>
//                               <div className="team-names">
//                                 {project.users.slice(0, isMobile ? 1 : 2).join(', ')}
//                                 {project.users.length > (isMobile ? 1 : 2) && '...'}
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="timeline-cell">
//                               {isMobile ? (
//                                 <>
//                                   <div className="dates">
//                                     {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                                   </div>
//                                   <div className="remaining-days">
//                                     {project.remainingDays > 0 
//                                       ? `${project.remainingDays}d left` 
//                                       : 'Done'}
//                                   </div>
//                                 </>
//                               ) : (
//                                 <>
//                                   <div className="dates">
//                                     {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
//                                   </div>
//                                   <div className="remaining-days">
//                                     {project.remainingDays > 0 
//                                       ? `${project.remainingDays} days left` 
//                                       : 'Completed'}
//                                   </div>
//                                 </>
//                               )}
//                             </div>
//                           </td>
//                           <td>
//                             <div className="action-buttons">
//                               <button 
//                                 className="action-btn view-btn" 
//                                 title="View Details"
//                                 onClick={() => console.log('View project', project.id)}
//                               >
//                                 {isMobile ? '👁️' : '👁️'}
//                               </button>
//                               <button 
//                                 className="action-btn edit-btn" 
//                                 title="Edit Project"
//                                 onClick={() => console.log('Edit project', project.id)}
//                               >
//                                 {isMobile ? '✏️' : '✏️'}
//                               </button>
//                               <button 
//                                 className="action-btn delete-btn" 
//                                 title="Delete Project"
//                                 onClick={() => handleDeleteProject(project.id)}
//                               >
//                                 {isMobile ? '🗑️' : '🗑️'}
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {filteredProjects.length === 0 && (
//                   <div className="no-projects-message">
//                     No projects found. Try adjusting your filters or create a new project.
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Stats Footer */}
//           <div className="projects-stats-footer">
//             <div className="stats-grid-main">
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.inProgress}</div>
//                 <div className="stat-label-main">In Progress</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.completed}</div>
//                 <div className="stat-label-main">Completed</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.highPriority}</div>
//                 <div className="stat-label-main">High Priority</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.averageProgress}%</div>
//                 <div className="stat-label-main">Avg Progress</div>
//               </div>
//               {!isMobile && (
//                 <>
//                   <div className="stat-item-main">
//                     <div className="stat-value-main">{stats.totalTasks}</div>
//                     <div className="stat-label-main">Total Tasks</div>
//                   </div>
//                   <div className="stat-item-main">
//                     <div className="stat-value-main">${stats.totalBudget.toLocaleString()}</div>
//                     <div className="stat-label-main">Total Budget</div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Create Project Form (Simplified for example) */}
//       {showCreateForm && (
//         <div className="create-project-overlay">
//           <div className="create-project-modal">
//             <div className="create-project-header">
//               <h2>Create New Project</h2>
//               <button onClick={() => setShowCreateForm(false)}>✕</button>
//             </div>
//             <div className="create-project-form">
//               <input type="text" placeholder="Project Title" />
//               <textarea placeholder="Description" rows="3"></textarea>
//               <input type="text" placeholder="Client Name" />
//               <div className="form-row">
//                 <select>
//                   <option>Select Status</option>
//                   <option>Planning</option>
//                   <option>In Progress</option>
//                   <option>Completed</option>
//                 </select>
//                 <select>
//                   <option>Select Priority</option>
//                   <option>High</option>
//                   <option>Medium</option>
//                   <option>Low</option>
//                 </select>
//               </div>
//               <div className="form-actions">
//                 <button 
//                   className="cancel-btn"
//                   onClick={() => setShowCreateForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="submit-btn"
//                   onClick={() => {
//                     handleCreateProject({
//                       title: 'New Project',
//                       description: 'Project description',
//                       client: 'New Client',
//                       status: 'Planning',
//                       priority: 'Medium',
//                       endDate: '2024-12-31'
//                     });
//                   }}
//                 >
//                   Create Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.memo(ProjectsPage);







// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import './ProjectsPage.css';

// const ProjectsPage = ({ currentUser, employeesData = [] }) => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [viewMode, setViewMode] = useState('list');
//   const [filters, setFilters] = useState({
//     status: '',
//     client: '',
//     priority: '',
//     search: '',
//     assignedTo: ''
//   });

//   // Form states
//   const [projectForm, setProjectForm] = useState({
//     title: '',
//     description: '',
//     client: '',
//     status: 'Planning',
//     priority: 'Medium',
//     startDate: '',
//     endDate: '',
//     budget: ''
//   });

//   const [taskForm, setTaskForm] = useState({
//     title: '',
//     description: '',
//     projectId: '',
//     status: 'Pending',
//     priority: 'Medium',
//     assignedTo: [],
//     startDate: '',
//     dueDate: ''
//   });

//   // Scroll state
//   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
  
//   // Refs
//   const contentRef = useRef(null);

//   // Check screen size
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
    
//     return () => {
//       window.removeEventListener('resize', checkScreenSize);
//     };
//   }, []);

//   // Sample Employees Data
//   const sampleEmployees = useMemo(() => employeesData.length > 0 ? employeesData : [
//     { id: 1, name: 'John Smith', role: 'Frontend Developer', department: 'Engineering', email: 'john@example.com', avatar: 'JS' },
//     { id: 2, name: 'Emily Johnson', role: 'UI/UX Designer', department: 'Design', email: 'emily@example.com', avatar: 'EJ' },
//     { id: 3, name: 'Michael Brown', role: 'Backend Developer', department: 'Engineering', email: 'michael@example.com', avatar: 'MB' },
//     { id: 4, name: 'Sarah Wilson', role: 'Project Manager', department: 'Management', email: 'sarah@example.com', avatar: 'SW' },
//     { id: 5, name: 'David Lee', role: 'QA Engineer', department: 'Quality', email: 'david@example.com', avatar: 'DL' },
//     { id: 6, name: 'Lisa Taylor', role: 'DevOps Engineer', department: 'Engineering', email: 'lisa@example.com', avatar: 'LT' },
//     { id: 7, name: 'Robert Chen', role: 'Full Stack Developer', department: 'Engineering', email: 'robert@example.com', avatar: 'RC' },
//     { id: 8, name: 'Emma Garcia', role: 'HR Manager', department: 'HR', email: 'emma@example.com', avatar: 'EG' }
//   ], [employeesData]);

//   // Sample Projects with tasks included
//   const sampleProjects = useMemo(() => [
//     {
//       id: 1,
//       title: 'Website Redesign',
//       description: 'Complete redesign of company website with modern UI/UX',
//       client: 'ABC Corporation',
//       status: 'In Progress',
//       priority: 'High',
//       startDate: '2024-02-25',
//       endDate: '2024-05-30',
//       progress: 65,
//       remainingDays: 45,
//       budget: '$25,000',
//       teamMembers: [1, 2, 3],
//       createdBy: 4,
//       createdAt: '2024-02-20',
//       clientContact: 'contact@abccorp.com',
//       clientPhone: '+1 234 567 8900',
//       totalTasks: 8,
//       completedTasks: 5,
//       pendingTasks: 3
//     },
//     {
//       id: 2,
//       title: 'Mobile App Development',
//       description: 'iOS and Android application for customer engagement',
//       client: 'TechStart Inc',
//       status: 'Planning',
//       priority: 'High',
//       startDate: '2024-03-10',
//       endDate: '2024-08-15',
//       progress: 20,
//       remainingDays: 120,
//       budget: '$45,000',
//       teamMembers: [2, 3, 4, 5],
//       createdBy: 4,
//       createdAt: '2024-03-01',
//       clientContact: 'info@techstart.com',
//       clientPhone: '+1 987 654 3210',
//       totalTasks: 12,
//       completedTasks: 3,
//       pendingTasks: 9
//     },
//     {
//       id: 3,
//       title: 'E-commerce Platform',
//       description: 'Build online shopping platform with payment integration',
//       client: 'Retail Solutions',
//       status: 'Completed',
//       priority: 'Medium',
//       startDate: '2024-01-15',
//       endDate: '2024-04-30',
//       progress: 100,
//       remainingDays: 0,
//       budget: '$38,000',
//       teamMembers: [1, 3, 6],
//       createdBy: 4,
//       createdAt: '2023-12-20',
//       clientContact: 'sales@retailsolutions.com',
//       clientPhone: '+1 555 123 4567',
//       totalTasks: 15,
//       completedTasks: 15,
//       pendingTasks: 0
//     },
//     {
//       id: 4,
//       title: 'CRM System Upgrade',
//       description: 'Upgrade existing CRM with new features and better UX',
//       client: 'Global Enterprises',
//       status: 'On Hold',
//       priority: 'Low',
//       startDate: '2024-03-01',
//       endDate: '2024-06-30',
//       progress: 40,
//       remainingDays: 90,
//       budget: '$22,000',
//       teamMembers: [2, 5],
//       createdBy: 4,
//       createdAt: '2024-02-15',
//       clientContact: 'support@globalent.com',
//       clientPhone: '+1 444 555 6666',
//       totalTasks: 6,
//       completedTasks: 2,
//       pendingTasks: 4
//     }
//   ], []);

//   // Sample Tasks
//   const sampleTasks = useMemo(() => [
//     {
//       id: 1,
//       title: 'Design Homepage Layout',
//       description: 'Create wireframes for homepage with modern design',
//       projectId: 1,
//       status: 'In Progress',
//       priority: 'High',
//       assignedTo: [2],
//       startDate: '2024-03-01',
//       dueDate: '2024-03-15',
//       createdBy: 4,
//       createdAt: '2024-02-25',
//       progress: 75
//     },
//     {
//       id: 2,
//       title: 'Develop Header Component',
//       description: 'Code responsive header with navigation',
//       projectId: 1,
//       status: 'Completed',
//       priority: 'Medium',
//       assignedTo: [1],
//       startDate: '2024-02-28',
//       dueDate: '2024-03-10',
//       createdBy: 4,
//       createdAt: '2024-02-25',
//       progress: 100
//     },
//     {
//       id: 3,
//       title: 'API Integration Setup',
//       description: 'Set up backend API endpoints',
//       projectId: 1,
//       status: 'In Progress',
//       priority: 'High',
//       assignedTo: [3],
//       startDate: '2024-03-05',
//       dueDate: '2024-03-20',
//       createdBy: 4,
//       createdAt: '2024-03-01',
//       progress: 60
//     },
//     {
//       id: 4,
//       title: 'Mobile Responsive Testing',
//       description: 'Test website on mobile devices',
//       projectId: 1,
//       status: 'Pending',
//       priority: 'Medium',
//       assignedTo: [5],
//       startDate: '2024-03-25',
//       dueDate: '2024-04-05',
//       createdBy: 4,
//       createdAt: '2024-03-10',
//       progress: 0
//     },
//     {
//       id: 5,
//       title: 'App Wireframes',
//       description: 'Design mobile app wireframes',
//       projectId: 2,
//       status: 'Planning',
//       priority: 'High',
//       assignedTo: [2],
//       startDate: '2024-03-20',
//       dueDate: '2024-04-05',
//       createdBy: 4,
//       createdAt: '2024-03-15',
//       progress: 10
//     },
//     {
//       id: 6,
//       title: 'Database Schema Design',
//       description: 'Design database structure for mobile app',
//       projectId: 2,
//       status: 'Pending',
//       priority: 'Medium',
//       assignedTo: [3],
//       startDate: '2024-04-01',
//       dueDate: '2024-04-15',
//       createdBy: 4,
//       createdAt: '2024-03-20',
//       progress: 0
//     },
//     {
//       id: 7,
//       title: 'Payment Gateway Integration',
//       description: 'Integrate payment system for e-commerce',
//       projectId: 3,
//       status: 'Completed',
//       priority: 'High',
//       assignedTo: [1, 3],
//       startDate: '2024-02-01',
//       dueDate: '2024-02-28',
//       createdBy: 4,
//       createdAt: '2024-01-25',
//       progress: 100
//     },
//     {
//       id: 8,
//       title: 'User Authentication System',
//       description: 'Implement secure user login system',
//       projectId: 3,
//       status: 'Completed',
//       priority: 'Medium',
//       assignedTo: [3],
//       startDate: '2024-01-20',
//       dueDate: '2024-02-10',
//       createdBy: 4,
//       createdAt: '2024-01-15',
//       progress: 100
//     }
//   ], []);

//   // Initialize data
//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setProjects(sampleProjects);
//       setFilteredProjects(sampleProjects);
//       setTasks(sampleTasks);
//       setLoading(false);
//     }, 1000);
    
//     return () => clearTimeout(timer);
//   }, [sampleProjects, sampleTasks]);

//   // Apply filters
//   useEffect(() => {
//     let result = [...projects];
    
//     if (filters.status) {
//       result = result.filter(project => project.status === filters.status);
//     }
    
//     if (filters.client) {
//       result = result.filter(project => 
//         project.client.toLowerCase().includes(filters.client.toLowerCase())
//       );
//     }
    
//     if (filters.priority) {
//       result = result.filter(project => project.priority === filters.priority);
//     }
    
//     if (filters.assignedTo) {
//       const employeeId = parseInt(filters.assignedTo);
//       result = result.filter(project => 
//         project.teamMembers.includes(employeeId)
//       );
//     }
    
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       result = result.filter(project => 
//         project.title.toLowerCase().includes(searchLower) ||
//         project.description.toLowerCase().includes(searchLower) ||
//         project.client.toLowerCase().includes(searchLower)
//       );
//     }
    
//     setFilteredProjects(result);
//   }, [filters, projects]);

//   // Scroll handler
//   useEffect(() => {
//     const handleScroll = () => {
//       const content = contentRef.current;
//       if (!content) return;

//       const currentScrollY = content.scrollTop;
      
//       if (currentScrollY > lastScrollY && currentScrollY > 30) {
//         setIsHeaderVisible(false);
//       } 
//       else if (currentScrollY < lastScrollY) {
//         setIsHeaderVisible(true);
//       }
      
//       setLastScrollY(currentScrollY);
//     };

//     const content = contentRef.current;
//     if (content) {
//       content.addEventListener('scroll', handleScroll, { passive: true });
//     }

//     return () => {
//       if (content) {
//         content.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, [lastScrollY]);

//   // Get employee by ID
//   const getEmployeeById = useCallback((id) => {
//     return sampleEmployees.find(emp => emp.id === id) || { name: 'Unknown', role: 'Unknown', avatar: '?' };
//   }, [sampleEmployees]);

//   // Get tasks by project
//   const getTasksByProject = useCallback((projectId) => {
//     return tasks.filter(task => task.projectId === projectId);
//   }, [tasks]);

//   // Get completed tasks by project
//   const getCompletedTasksByProject = useCallback((projectId) => {
//     return tasks.filter(task => task.projectId === projectId && task.status === 'Completed').length;
//   }, [tasks]);

//   // Get pending tasks by project
//   const getPendingTasksByProject = useCallback((projectId) => {
//     return tasks.filter(task => task.projectId === projectId && task.status !== 'Completed').length;
//   }, [tasks]);

//   // Get team members for project
//   const getTeamMembers = useCallback((project) => {
//     return project.teamMembers.map(empId => getEmployeeById(empId));
//   }, [getEmployeeById]);

//   // Calculate project progress based on tasks
//   const calculateProjectProgress = useCallback((projectId) => {
//     const projectTasks = tasks.filter(task => task.projectId === projectId);
//     if (projectTasks.length === 0) return 0;
    
//     const totalProgress = projectTasks.reduce((sum, task) => sum + task.progress, 0);
//     return Math.round(totalProgress / projectTasks.length);
//   }, [tasks]);

//   // Get tasks assigned to employee
//   const getTasksByEmployee = useCallback((employeeId) => {
//     return tasks.filter(task => task.assignedTo.includes(employeeId));
//   }, [tasks]);

//   // Handle project form changes
//   const handleProjectFormChange = useCallback((field, value) => {
//     setProjectForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   }, []);

//   // Handle task form changes
//   const handleTaskFormChange = useCallback((field, value) => {
//     setTaskForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   }, []);

//   // Create new project
//   const handleCreateProject = useCallback(() => {
//     if (!projectForm.title || !projectForm.client || !projectForm.endDate) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const newProject = {
//       id: projects.length + 1,
//       title: projectForm.title,
//       description: projectForm.description,
//       client: projectForm.client,
//       status: projectForm.status,
//       priority: projectForm.priority,
//       startDate: projectForm.startDate || new Date().toISOString().split('T')[0],
//       endDate: projectForm.endDate,
//       progress: 0,
//       remainingDays: Math.ceil((new Date(projectForm.endDate) - new Date()) / (1000 * 60 * 60 * 24)),
//       budget: projectForm.budget ? `$${projectForm.budget}` : '$0',
//       teamMembers: [],
//       createdBy: currentUser?.id || 4,
//       createdAt: new Date().toISOString().split('T')[0],
//       clientContact: '',
//       clientPhone: '',
//       totalTasks: 0,
//       completedTasks: 0,
//       pendingTasks: 0
//     };

//     setProjects(prev => [newProject, ...prev]);
//     setProjectForm({
//       title: '',
//       description: '',
//       client: '',
//       status: 'Planning',
//       priority: 'Medium',
//       startDate: '',
//       endDate: '',
//       budget: ''
//     });
//     setShowCreateForm(false);
//     alert('Project created successfully!');
//   }, [projectForm, projects.length, currentUser]);

//   // Create new task
//   const handleCreateTask = useCallback(() => {
//     if (!taskForm.title || !taskForm.projectId || !taskForm.dueDate) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const newTask = {
//       id: tasks.length + 1,
//       title: taskForm.title,
//       description: taskForm.description,
//       projectId: parseInt(taskForm.projectId),
//       status: taskForm.status,
//       priority: taskForm.priority,
//       assignedTo: taskForm.assignedTo.map(id => parseInt(id)),
//       startDate: taskForm.startDate || new Date().toISOString().split('T')[0],
//       dueDate: taskForm.dueDate,
//       createdBy: currentUser?.id || 4,
//       createdAt: new Date().toISOString().split('T')[0],
//       progress: 0
//     };

//     setTasks(prev => [newTask, ...prev]);
    
//     // Update project task counts
//     setProjects(prev => prev.map(project => {
//       if (project.id === parseInt(taskForm.projectId)) {
//         const projectTasks = [...tasks, newTask].filter(t => t.projectId === project.id);
//         const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
//         return {
//           ...project,
//           totalTasks: projectTasks.length,
//           completedTasks: completedTasks,
//           pendingTasks: projectTasks.length - completedTasks,
//           progress: Math.round((completedTasks / projectTasks.length) * 100) || 0
//         };
//       }
//       return project;
//     }));

//     setTaskForm({
//       title: '',
//       description: '',
//       projectId: '',
//       status: 'Pending',
//       priority: 'Medium',
//       assignedTo: [],
//       startDate: '',
//       dueDate: ''
//     });
//     setShowTaskForm(false);
//     alert('Task created successfully!');
//   }, [taskForm, tasks, projects, currentUser]);

//   // Delete project
//   const handleDeleteProject = useCallback((projectId) => {
//     if (window.confirm('Are you sure you want to delete this project? All tasks will also be deleted.')) {
//       setProjects(prev => prev.filter(project => project.id !== projectId));
//       setTasks(prev => prev.filter(task => task.projectId !== projectId));
//     }
//   }, []);

//   // Delete task
//   const handleDeleteTask = useCallback((taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       const task = tasks.find(t => t.id === taskId);
//       if (task) {
//         // Update project task counts
//         setProjects(prev => prev.map(project => {
//           if (project.id === task.projectId) {
//             const projectTasks = tasks.filter(t => t.projectId === project.id && t.id !== taskId);
//             const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
//             return {
//               ...project,
//               totalTasks: projectTasks.length,
//               completedTasks: completedTasks,
//               pendingTasks: projectTasks.length - completedTasks,
//               progress: projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0
//             };
//           }
//           return project;
//         }));
//       }
//       setTasks(prev => prev.filter(task => task.id !== taskId));
//     }
//   }, [tasks]);

//   // View project details
//   const handleViewProject = useCallback((project) => {
//     setSelectedProject(project);
//   }, []);

//   // Update task status
//   const handleUpdateTaskStatus = useCallback((taskId, newStatus) => {
//     setTasks(prev => prev.map(task => {
//       if (task.id === taskId) {
//         const progress = newStatus === 'Completed' ? 100 : 
//                         newStatus === 'In Progress' ? 50 : 
//                         task.progress;
//         return { ...task, status: newStatus, progress };
//       }
//       return task;
//     }));

//     // Update project progress
//     const task = tasks.find(t => t.id === taskId);
//     if (task) {
//       setProjects(prev => prev.map(project => {
//         if (project.id === task.projectId) {
//           const projectTasks = tasks.map(t => 
//             t.id === taskId ? { ...t, status: newStatus } : t
//           ).filter(t => t.projectId === project.id);
          
//           const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
//           return {
//             ...project,
//             completedTasks: completedTasks,
//             pendingTasks: projectTasks.length - completedTasks,
//             progress: Math.round((completedTasks / projectTasks.length) * 100) || 0
//           };
//         }
//         return project;
//       }));
//     }
//   }, [tasks]);

//   // Update project status
//   const handleUpdateProjectStatus = useCallback((projectId, newStatus) => {
//     setProjects(prev => prev.map(project => {
//       if (project.id === projectId) {
//         return { ...project, status: newStatus };
//       }
//       return project;
//     }));
//   }, []);

//   // Get status badge class
//   const getStatusClass = (status) => {
//     switch(status) {
//       case 'In Progress': return 'status-in-progress';
//       case 'Planning': return 'status-planning';
//       case 'Completed': return 'status-completed';
//       case 'On Hold': return 'status-on-hold';
//       case 'Pending': return 'status-pending';
//       case 'Delayed': return 'status-delayed';
//       case 'Blocked': return 'status-blocked';
//       case 'Waiting for Approval': return 'status-waiting';
//       case 'Testing Phase': return 'status-testing';
//       case 'Cancelled': return 'status-cancelled';
//       default: return 'status-pending';
//     }
//   };

//   // Get priority badge class
//   const getPriorityClass = (priority) => {
//     switch(priority) {
//       case 'High': return 'priority-high';
//       case 'Medium': return 'priority-medium';
//       case 'Low': return 'priority-low';
//       default: return '';
//     }
//   };

//   // Calculate stats
//   const stats = useMemo(() => ({
//     totalProjects: projects.length,
//     inProgress: projects.filter(p => p.status === 'In Progress').length,
//     completed: projects.filter(p => p.status === 'Completed').length,
//     totalTasks: tasks.length,
//     completedTasks: tasks.filter(t => t.status === 'Completed').length,
//     pendingTasks: tasks.filter(t => t.status !== 'Completed').length,
//     teamMembers: new Set(tasks.flatMap(task => task.assignedTo)).size,
//     highPriorityTasks: tasks.filter(t => t.priority === 'High').length,
//     overdueTasks: tasks.filter(t => 
//       new Date(t.dueDate) < new Date() && t.status !== 'Completed'
//     ).length
//   }), [projects, tasks]);

//   // Get tasks summary by employee
//   const getEmployeeTaskSummary = useCallback(() => {
//     const summary = {};
    
//     sampleEmployees.forEach(employee => {
//       const employeeTasks = getTasksByEmployee(employee.id);
//       const completedTasks = employeeTasks.filter(t => t.status === 'Completed').length;
      
//       summary[employee.id] = {
//         name: employee.name,
//         role: employee.role,
//         totalTasks: employeeTasks.length,
//         completedTasks: completedTasks,
//         pendingTasks: employeeTasks.length - completedTasks,
//         progress: employeeTasks.length > 0 ? Math.round((completedTasks / employeeTasks.length) * 100) : 0
//       };
//     });
    
//     return summary;
//   }, [sampleEmployees, getTasksByEmployee]);

//   // Scroll to top function
//   const handleScrollToTop = useCallback(() => {
//     if (contentRef.current) {
//       contentRef.current.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//       setIsHeaderVisible(true);
//     }
//   }, []);

//   // Handle clear all filters
//   const handleClearFilters = useCallback(() => {
//     setFilters({
//       status: '',
//       client: '',
//       priority: '',
//       search: '',
//       assignedTo: ''
//     });
//   }, []);

//   // Responsive header class
//   const getHeaderClass = useCallback(() => {
//     if (isMobile) {
//       return isHeaderVisible ? 'visible mobile' : 'hidden mobile';
//     }
//     return isHeaderVisible ? 'visible' : 'hidden';
//   }, [isHeaderVisible, isMobile]);

//   // Render project detail modal
//   const renderProjectDetailModal = () => {
//     if (!selectedProject) return null;

//     const projectTasks = getTasksByProject(selectedProject.id);
//     const projectTeam = getTeamMembers(selectedProject);
//     const employeeTaskSummary = getEmployeeTaskSummary();

//     return (
//       <div className="project-detail-overlay" onClick={() => setSelectedProject(null)}>
//         <div className="project-detail-modal" onClick={(e) => e.stopPropagation()}>
//           <div className="project-detail-header">
//             <h2>{selectedProject.title}</h2>
//             <button onClick={() => setSelectedProject(null)}>✕</button>
//           </div>
          
//           <div className="project-detail-content">
//             <div className="project-info-section">
//               <div className="info-row">
//                 <div className="info-item">
//                   <label>Client</label>
//                   <p>{selectedProject.client}</p>
//                 </div>
//                 <div className="info-item">
//                   <label>Status</label>
//                   <span className={`status-badge ${getStatusClass(selectedProject.status)}`}>
//                     {selectedProject.status}
//                   </span>
//                 </div>
//                 <div className="info-item">
//                   <label>Priority</label>
//                   <span className={`priority-badge ${getPriorityClass(selectedProject.priority)}`}>
//                     {selectedProject.priority}
//                   </span>
//                 </div>
//                 <div className="info-item">
//                   <label>Progress</label>
//                   <p>{selectedProject.progress}%</p>
//                 </div>
//               </div>
              
//               <div className="info-row">
//                 <div className="info-item">
//                   <label>Start Date</label>
//                   <p>{new Date(selectedProject.startDate).toLocaleDateString()}</p>
//                 </div>
//                 <div className="info-item">
//                   <label>End Date</label>
//                   <p>{new Date(selectedProject.endDate).toLocaleDateString()}</p>
//                 </div>
//                 <div className="info-item">
//                   <label>Remaining Days</label>
//                   <p>{selectedProject.remainingDays} days</p>
//                 </div>
//                 <div className="info-item">
//                   <label>Budget</label>
//                   <p>{selectedProject.budget}</p>
//                 </div>
//               </div>
              
//               <div className="info-item full-width">
//                 <label>Description</label>
//                 <p>{selectedProject.description}</p>
//               </div>
//             </div>

//             {/* Team Section with Task Distribution */}
//             <div className="section">
//               <h3>👥 Team Members & Task Distribution</h3>
//               <div className="team-grid">
//                 {projectTeam.map((member, index) => {
//                   const summary = employeeTaskSummary[member.id] || { totalTasks: 0, completedTasks: 0 };
//                   const projectTasksForMember = projectTasks.filter(task => 
//                     task.assignedTo.includes(member.id)
//                   );
                  
//                   return (
//                     <div key={index} className="team-member">
//                       <div className="member-avatar">{member.avatar}</div>
//                       <div className="member-info">
//                         <div className="member-name">{member.name}</div>
//                         <div className="member-role">{member.role}</div>
//                         <div className="member-dept">{member.department}</div>
//                       </div>
//                       <div className="member-tasks-info">
//                         <div className="task-stats">
//                           <div className="task-stat">
//                             <span className="stat-label">Project Tasks:</span>
//                             <span className="stat-value">{projectTasksForMember.length}</span>
//                           </div>
//                           <div className="task-stat">
//                             <span className="stat-label">Completed:</span>
//                             <span className="stat-value">{projectTasksForMember.filter(t => t.status === 'Completed').length}</span>
//                           </div>
//                           <div className="task-stat">
//                             <span className="stat-label">Pending:</span>
//                             <span className="stat-value">{projectTasksForMember.filter(t => t.status !== 'Completed').length}</span>
//                           </div>
//                         </div>
//                         <div className="task-progress-bar">
//                           <div 
//                             className="progress-fill"
//                             style={{ 
//                               width: `${projectTasksForMember.length > 0 ? 
//                                 Math.round((projectTasksForMember.filter(t => t.status === 'Completed').length / projectTasksForMember.length) * 100) : 0}%` 
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Tasks Section */}
//             <div className="section">
//               <div className="section-header">
//                 <h3>📋 Tasks ({projectTasks.length})</h3>
//                 <button 
//                   className="btn-small btn-primary"
//                   onClick={() => {
//                     setTaskForm(prev => ({ ...prev, projectId: selectedProject.id }));
//                     setShowTaskForm(true);
//                     setSelectedProject(null);
//                   }}
//                 >
//                   + Add Task
//                 </button>
//               </div>
              
//               {projectTasks.length > 0 ? (
//                 <div className="tasks-table">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Task</th>
//                         <th>Assigned To</th>
//                         <th>Priority</th>
//                         <th>Status</th>
//                         <th>Due Date</th>
//                         <th>Progress</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {projectTasks.map(task => (
//                         <tr key={task.id}>
//                           <td>
//                             <div className="task-title">
//                               <strong>{task.title}</strong>
//                               <small>{task.description}</small>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="assigned-users">
//                               {task.assignedTo.map(empId => {
//                                 const emp = getEmployeeById(empId);
//                                 return (
//                                   <span key={empId} className="user-badge" title={emp.name}>
//                                     {emp.avatar}
//                                   </span>
//                                 );
//                               })}
//                             </div>
//                           </td>
//                           <td>
//                             <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
//                               {task.priority}
//                             </span>
//                           </td>
//                           <td>
//                             <select 
//                               value={task.status}
//                               onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
//                               className="status-select"
//                             >
//                               <option value="Pending">Pending</option>
//                               <option value="In Progress">In Progress</option>
//                               <option value="Completed">Completed</option>
//                               <option value="On Hold">On Hold</option>
//                               <option value="Delayed">Delayed</option>
//                               <option value="Blocked">Blocked</option>
//                               <option value="Waiting for Approval">Waiting for Approval</option>
//                               <option value="Testing Phase">Testing Phase</option>
//                               <option value="Cancelled">Cancelled</option>
//                             </select>
//                           </td>
//                           <td>{new Date(task.dueDate).toLocaleDateString()}</td>
//                           <td>
//                             <div className="progress-cell">
//                               <div className="project-progress-bar">
//                                 <div 
//                                   className="project-progress-fill"
//                                   style={{ width: `${task.progress}%` }}
//                                 ></div>
//                               </div>
//                               <span className="progress-text">{task.progress}%</span>
//                             </div>
//                           </td>
//                           <td>
//                             <button 
//                               className="btn-icon btn-danger"
//                               onClick={() => handleDeleteTask(task.id)}
//                               title="Delete Task"
//                             >
//                               🗑️
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <p className="no-data">No tasks yet. Create the first task!</p>
//               )}
//             </div>

//             {/* Task Summary */}
//             <div className="section">
//               <h3>📊 Task Summary</h3>
//               <div className="task-summary-cards">
//                 <div className="summary-card">
//                   <div className="summary-icon">📋</div>
//                   <div className="summary-content">
//                     <div className="summary-value">{selectedProject.totalTasks}</div>
//                     <div className="summary-label">Total Tasks</div>
//                   </div>
//                 </div>
//                 <div className="summary-card">
//                   <div className="summary-icon">✅</div>
//                   <div className="summary-content">
//                     <div className="summary-value">{selectedProject.completedTasks}</div>
//                     <div className="summary-label">Completed</div>
//                   </div>
//                 </div>
//                 <div className="summary-card">
//                   <div className="summary-icon">⏳</div>
//                   <div className="summary-content">
//                     <div className="summary-value">{selectedProject.pendingTasks}</div>
//                     <div className="summary-label">Pending</div>
//                   </div>
//                 </div>
//                 <div className="summary-card">
//                   <div className="summary-icon">📈</div>
//                   <div className="summary-content">
//                     <div className="summary-value">{selectedProject.progress}%</div>
//                     <div className="summary-label">Completion</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="projects-fullpage-container">
//       {/* Projects Header */}
//       <div className={`projects-modal-header ${getHeaderClass()}`}>
//         <div className="projects-modal-header-content">
//           <div className="projects-modal-header-left">
//             <div className="projects-modal-header-icon">📋</div>
//             <div className="projects-modal-header-title">
//               <h1>Projects Management</h1>
//               <p>
//                 {isMobile ? (
//                   <>
//                     <span className="projects-modal-count-badge">{projects.length} Projects</span>
//                     <span className="projects-modal-count-badge">{tasks.length} Tasks</span>
//                   </>
//                 ) : (
//                   <>
//                     Manage and track all projects • Total: 
//                     <span className="projects-modal-count-badge">{projects.length} Projects</span>
//                     • <span className="projects-modal-count-badge">{tasks.length} Tasks</span>
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//           <div className="projects-modal-header-right">
//             <button 
//               className="btn-primary"
//               onClick={() => setShowCreateForm(true)}
//             >
//               + New Project
//             </button>
//             {/* <button 
//               className="btn-secondary"
//               onClick={() => {
//                 if (projects.length > 0) {
//                   setTaskForm(prev => ({ ...prev, projectId: projects[0].id }));0
//                   setShowTaskForm(true);
//                 } else {
//                   alert('Create a project first!');
//                 }
//               }}
//             >
//               + New Task
//             </button>
//             <button 
//               className="projects-modal-close-btn" 
//               onClick={() => window.history.back()}
//               aria-label="Close projects page"
//             >
//               ✕
//             </button> */}
//           </div>
//         </div>
//       </div>

//       {/* Floating Scroll to Top Button */}
//       {!isHeaderVisible && (
//         <button 
//           className="projects-floating-top-btn"
//           onClick={handleScrollToTop}
//           aria-label="Scroll to top"
//         >
//           <span className="projects-floating-icon">↑</span>
//         </button>
//       )}

//       {/* Scrollable Content Area */}
//       <div className="projects-content-wrapper" ref={contentRef}>
//         <div className="projects-main-area">
//           {/* Main Content Container */}
//           <div className="projects-main-container">
//             {/* Action Bar */}
//             <div className="projects-action-bar">
//               {/* <div className="projects-view-toggle">
//                 <button 
//                   className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
//                   onClick={() => setViewMode('list')}
//                   aria-label="List view"
//                 >
//                   <span className="view-toggle-icon">📋</span>
//                   {isMobile ? 'List' : 'List View'}
//                 </button>
//                 <button 
//                   className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
//                   onClick={() => setViewMode('grid')}
//                   aria-label="Grid view"
//                 >
//                   <span className="view-toggle-icon">🔲</span>
//                   {isMobile ? 'Grid' : 'Grid View'}
//                 </button>
//               </div> */}
//             </div>

//             {/* Quick Stats */}
//             <div className="quick-stats">
//               <div className="stat-card">
//                 <div className="stat-icon">📋</div>
//                 <div className="stat-content">
//                   <div className="stat-value">{stats.totalProjects}</div>
//                   <div className="stat-label">Total Projects</div>
//                 </div>
//               </div>
//               {/* <div className="stat-card">
//                 <div className="stat-icon">✅</div>
//                 <div className="stat-content">
//                   <div className="stat-value">{stats.completedTasks}</div>
//                   <div className="stat-label">Completed Tasks</div>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <div className="stat-icon">⏳</div>
//                 <div className="stat-content">
//                   <div className="stat-value">{stats.pendingTasks}</div>
//                   <div className="stat-label">Pending Tasks</div>
//                 </div>
//               </div> */}
//               <div className="stat-card">
//                 <div className="stat-icon">👥</div>
//                 <div className="stat-content">
//                   <div className="stat-value">{stats.teamMembers}</div>
//                   <div className="stat-label">Team Members</div>
//                 </div>
//               </div>
//             </div>

//             {/* Filters Section */}
//             <div className="projects-filters-section">
//               <div className="filters-title">
//                 <span>Filters & Search</span>
//                 {Object.values(filters).some(filter => filter !== '') && (
//                   <button 
//                     onClick={handleClearFilters}
//                     className="clear-all-filters-btn"
//                   >
//                     Clear All
//                   </button>
//                 )}
//               </div>
//               <div className="filters-row">
//                 <div className="filter-group">
//                   <label>Status</label>
//                   <select 
//                     value={filters.status}
//                     onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
//                     className="filter-select"
//                   >
//                     <option value="">All Status</option>
//                     <option value="Planning">Planning</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="On Hold">On Hold</option>
//                     <option value="Delayed">Delayed</option>
//                     <option value="Blocked">Blocked</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Priority</label>
//                   <select 
//                     value={filters.priority}
//                     onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
//                     className="filter-select"
//                   >
//                     <option value="">All Priorities</option>
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Assigned To</label>
//                   <select 
//                     value={filters.assignedTo}
//                     onChange={(e) => setFilters(prev => ({ ...prev, assignedTo: e.target.value }))}
//                     className="filter-select"
//                   >
//                     <option value="">All Team Members</option>
//                     {sampleEmployees.map(emp => (
//                       <option key={emp.id} value={emp.id}>{emp.name}</option>
//                     ))}
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Search</label>
//                   <input
//                     type="text"
//                     value={filters.search}
//                     onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
//                     placeholder="Search projects, clients..."
//                     className="filter-input"
//                   />
//                 </div>
                
//                 <button 
//                   className="clear-filters-btn"
//                   onClick={handleClearFilters}
//                 >
//                   {isMobile ? 'Clear' : 'Clear Filters'}
//                 </button>
//               </div>
//             </div>

//             {/* Projects Table */}
//             {loading ? (
//               <div className="projects-loading-container">
//                 <div className="projects-loading-spinner"></div>
//                 <p className="projects-loading-text">Loading projects...</p>
//               </div>
//             ) : (
//               <div className="projects-table-container">
//                 <div className="table-responsive-wrapper">
//                   <table className="projects-table">
//                     <thead>
//                       <tr>
//                         <th>Project Title</th>
//                         <th>Client</th>
//                         <th>Tasks</th>
//                         <th>Team</th>
//                         <th>Status</th>
//                         <th>Priority</th>
//                         <th>Progress</th>
//                         <th>Timeline</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProjects.map((project) => {
//                         const projectTasks = getTasksByProject(project.id);
//                         const completedTasks = getCompletedTasksByProject(project.id);
//                         const pendingTasks = getPendingTasksByProject(project.id);
                        
//                         return (
//                           <tr key={project.id}>
//                             <td>
//                               <div className="project-title-cell">
//                                 <div className="project-title">{project.title}</div>
//                                 <div className="project-description">{project.description}</div>
//                               </div>
//                             </td>
//                             <td>
//                               <div className="client-name">{project.client}</div>
//                               <div className="client-contact">{project.clientContact}</div>
//                             </td>
//                             <td>
//                               <div className="tasks-cell">
//                                 <div className="tasks-summary">
//                                   <span className="completed-tasks">{completedTasks}✅</span>
//                                   <span className="pending-tasks">{pendingTasks}⏳</span>
//                                   <span className="total-tasks">/{projectTasks.length}</span>
//                                 </div>
//                                 <div className="tasks-progress">
//                                   <div className="project-progress-bar small">
//                                     <div 
//                                       className="project-progress-fill"
//                                       style={{ 
//                                         width: `${projectTasks.length > 0 ? (completedTasks / projectTasks.length) * 100 : 0}%` 
//                                       }}
//                                     ></div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td>
//                               <div className="team-cell">
//                                 <div className="team-avatars">
//                                   {getTeamMembers(project).slice(0, 3).map((member, index) => (
//                                     <div key={index} className="team-avatar" title={member.name}>
//                                       {member.avatar}
//                                     </div>
//                                   ))}
//                                   {getTeamMembers(project).length > 3 && (
//                                     <div className="team-more">+{getTeamMembers(project).length - 3}</div>
//                                   )}
//                                 </div>
//                                 <div className="team-count">{getTeamMembers(project).length} members</div>
//                               </div>
//                             </td>
//                             <td>
//                               <select 
//                                 value={project.status}
//                                 onChange={(e) => handleUpdateProjectStatus(project.id, e.target.value)}
//                                 className="status-select"
//                               >
//                                 <option value="Planning">Planning</option>
//                                 <option value="In Progress">In Progress</option>
//                                 <option value="Completed">Completed</option>
//                                 <option value="On Hold">On Hold</option>
//                                 <option value="Delayed">Delayed</option>
//                                 <option value="Blocked">Blocked</option>
//                               </select>
//                             </td>
//                             <td>
//                               <span className={`priority-badge ${getPriorityClass(project.priority)}`}>
//                                 {project.priority}
//                               </span>
//                             </td>
//                             <td>
//                               <div className="progress-cell">
//                                 <div className="project-progress-bar">
//                                   <div 
//                                     className="project-progress-fill"
//                                     style={{ width: `${project.progress}%` }}
//                                   ></div>
//                                 </div>
//                                 <div className="progress-percentage">{project.progress}%</div>
//                               </div>
//                             </td>
//                             <td>
//                               <div className="timeline-cell">
//                                 <div className="dates">
//                                   {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
//                                   {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                                 </div>
//                                 <div className="remaining-days">
//                                   {project.remainingDays > 0 
//                                     ? `${project.remainingDays}d left` 
//                                     : 'Completed'}
//                                 </div>
//                               </div>
//                             </td>
//                             <td>
//                               <div className="action-buttons">
//                                 <button 
//                                   className="action-btn view-btn" 
//                                   title="View Details"
//                                   onClick={() => handleViewProject(project)}
//                                 >
//                                   👁️
//                                 </button>
//                                 <button 
//                                   className="action-btn edit-btn" 
//                                   title="Add Task"
//                                   onClick={() => {
//                                     setTaskForm(prev => ({ ...prev, projectId: project.id }));
//                                     setShowTaskForm(true);
//                                   }}
//                                 >
//                                   ➕
//                                 </button>
//                                 <button 
//                                   className="action-btn delete-btn" 
//                                   title="Delete Project"
//                                   onClick={() => handleDeleteProject(project.id)}
//                                 >
//                                   🗑️
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {filteredProjects.length === 0 && (
//                   <div className="no-projects-message">
//                     No projects found. Try adjusting your filters or create a new project.
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Employee Task Distribution */}
//             {/* <div className="employee-distribution-section">
//               <h3>👥 Employee Task Distribution</h3>
//               <div className="employee-grid">
//                 {sampleEmployees.map(employee => {
//                   const employeeTasks = getTasksByEmployee(employee.id);
//                   const completedTasks = employeeTasks.filter(t => t.status === 'Completed').length;
//                   const progress = employeeTasks.length > 0 ? Math.round((completedTasks / employeeTasks.length) * 100) : 0;
                  
//                   return (
//                     <div key={employee.id} className="employee-card">
//                       <div className="employee-header">
//                         <div className="employee-avatar-large">{employee.avatar}</div>
//                         <div className="employee-info">
//                           <div className="employee-name">{employee.name}</div>
//                           <div className="employee-role">{employee.role}</div>
//                           <div className="employee-dept">{employee.department}</div>
//                         </div>
//                       </div>
//                       <div className="employee-stats">
//                         <div className="stat-row">
//                           <span className="stat-label">Total Tasks:</span>
//                           <span className="stat-value">{employeeTasks.length}</span>
//                         </div>
//                         <div className="stat-row">
//                           <span className="stat-label">Completed:</span>
//                           <span className="stat-value">{completedTasks}</span>
//                         </div>
//                         <div className="stat-row">
//                           <span className="stat-label">Pending:</span>
//                           <span className="stat-value">{employeeTasks.length - completedTasks}</span>
//                         </div>
//                       </div>
//                       <div className="employee-progress">
//                         <div className="progress-bar">
//                           <div 
//                             className="progress-fill"
//                             style={{ width: `${progress}%` }}
//                           ></div>
//                         </div>
//                         <div className="progress-text">{progress}% Complete</div>
//                       </div>
//                       <div className="employee-projects">
//                         <span className="projects-label">Projects:</span>
//                         <div className="project-tags">
//                           {[...new Set(employeeTasks.map(t => t.projectId))].map(projectId => {
//                             const project = projects.find(p => p.id === projectId);
//                             return project ? (
//                               <span key={projectId} className="project-tag">
//                                 {project.title.substring(0, 15)}...
//                               </span>
//                             ) : null;
//                           }).slice(0, 2)}
//                           {[...new Set(employeeTasks.map(t => t.projectId))].length > 2 && (
//                             <span className="project-tag-more">
//                               +{[...new Set(employeeTasks.map(t => t.projectId))].length - 2} more
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div> */}
//           </div>

//           {/* Stats Footer */}
//           <div className="projects-stats-footer">
//             <div className="stats-grid-main">
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.totalProjects}</div>
//                 <div className="stat-label-main">Total Projects</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.totalTasks}</div>
//                 <div className="stat-label-main">Total Tasks</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.completedTasks}</div>
//                 <div className="stat-label-main">Completed Tasks</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.pendingTasks}</div>
//                 <div className="stat-label-main">Pending Tasks</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.teamMembers}</div>
//                 <div className="stat-label-main">Team Members</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.overdueTasks}</div>
//                 <div className="stat-label-main">Overdue Tasks</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Create Project Modal */}
//       {showCreateForm && (
//         <div className="create-project-overlay" onClick={() => setShowCreateForm(false)}>
//           <div className="create-project-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="create-project-header">
//               <h2>Create New Project</h2>
//               <button onClick={() => setShowCreateForm(false)}>✕</button>
//             </div>
//             <div className="create-project-form">
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Project Title *</label>
//                   <input 
//                     type="text" 
//                     placeholder="Enter project title"
//                     value={projectForm.title}
//                     onChange={(e) => handleProjectFormChange('title', e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Client Name *</label>
//                   <input 
//                     type="text" 
//                     placeholder="Enter client name"
//                     value={projectForm.client}
//                     onChange={(e) => handleProjectFormChange('client', e.target.value)}
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea 
//                   placeholder="Enter project description"
//                   rows="3"
//                   value={projectForm.description}
//                   onChange={(e) => handleProjectFormChange('description', e.target.value)}
//                 ></textarea>
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Status</label>
//                   <select 
//                     value={projectForm.status}
//                     onChange={(e) => handleProjectFormChange('status', e.target.value)}
//                   >
//                     <option value="Planning">Planning</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="On Hold">On Hold</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Priority</label>
//                   <select 
//                     value={projectForm.priority}
//                     onChange={(e) => handleProjectFormChange('priority', e.target.value)}
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Start Date</label>
//                   <input 
//                     type="date" 
//                     value={projectForm.startDate}
//                     onChange={(e) => handleProjectFormChange('startDate', e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>End Date *</label>
//                   <input 
//                     type="date" 
//                     value={projectForm.endDate}
//                     onChange={(e) => handleProjectFormChange('endDate', e.target.value)}
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Budget ($)</label>
//                 <input 
//                   type="number" 
//                   placeholder="Enter project budget"
//                   value={projectForm.budget}
//                   onChange={(e) => handleProjectFormChange('budget', e.target.value)}
//                 />
//               </div>
              
//               <div className="form-actions">
//                 <button 
//                   className="cancel-btn"
//                   onClick={() => setShowCreateForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="submit-btn"
//                   onClick={handleCreateProject}
//                 >
//                   Create Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create Task Modal */}
//       {showTaskForm && (
//         <div className="create-project-overlay" onClick={() => setShowTaskForm(false)}>
//           <div className="create-project-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="create-project-header">
//               <h2>Create New Task</h2>
//               <button onClick={() => setShowTaskForm(false)}>✕</button>
//             </div>
//             <div className="create-project-form">
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Task Title *</label>
//                   <input 
//                     type="text" 
//                     placeholder="Enter task title"
//                     value={taskForm.title}
//                     onChange={(e) => handleTaskFormChange('title', e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Project *</label>
//                   <select 
//                     value={taskForm.projectId}
//                     onChange={(e) => handleTaskFormChange('projectId', e.target.value)}
//                   >
//                     <option value="">Select Project</option>
//                     {projects.map(project => (
//                       <option key={project.id} value={project.id}>{project.title}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea 
//                   placeholder="Enter task description"
//                   rows="3"
//                   value={taskForm.description}
//                   onChange={(e) => handleTaskFormChange('description', e.target.value)}
//                 ></textarea>
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Status *</label>
//                   <select 
//                     value={taskForm.status}
//                     onChange={(e) => handleTaskFormChange('status', e.target.value)}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="On Hold">On Hold</option>
//                     <option value="Delayed">Delayed</option>
//                     <option value="Blocked">Blocked</option>
//                     <option value="Waiting for Approval">Waiting for Approval</option>
//                     <option value="Testing Phase">Testing Phase</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Priority</label>
//                   <select 
//                     value={taskForm.priority}
//                     onChange={(e) => handleTaskFormChange('priority', e.target.value)}
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Start Date</label>
//                   <input 
//                     type="date" 
//                     value={taskForm.startDate}
//                     onChange={(e) => handleTaskFormChange('startDate', e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Due Date *</label>
//                   <input 
//                     type="date" 
//                     value={taskForm.dueDate}
//                     onChange={(e) => handleTaskFormChange('dueDate', e.target.value)}
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Assign To *</label>
//                 <select 
//                   multiple
//                   value={taskForm.assignedTo}
//                   onChange={(e) => {
//                     const values = Array.from(e.target.selectedOptions, option => option.value);
//                     handleTaskFormChange('assignedTo', values);
//                   }}
//                   className="multi-select"
//                 >
//                   {sampleEmployees.map(emp => (
//                     <option key={emp.id} value={emp.id}>{emp.name} - {emp.role}</option>
//                   ))}
//                 </select>
//                 <small>Hold Ctrl/Cmd to select multiple members</small>
//               </div>
              
//               <div className="form-actions">
//                 <button 
//                   className="cancel-btn"
//                   onClick={() => setShowTaskForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="submit-btn"
//                   onClick={handleCreateTask}
//                 >
//                   Create Task
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Project Detail Modal */}
//       {renderProjectDetailModal()}
//     </div>
//   );
// };

// export default React.memo(ProjectsPage);













// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import './ProjectsPage.css';

// const ProjectsPage = ({ currentUser, employeesData = [] }) => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [filters, setFilters] = useState({
//     status: '',
//     client: '',
//     priority: '',
//     search: '',
//     assignedTo: ''
//   });

//   // Form states
//   const [projectForm, setProjectForm] = useState({
//     title: '',
//     description: '',
//     client: '',
//     status: 'Planning',
//     priority: 'Medium',
//     startDate: '',
//     endDate: '',
//     budget: ''
//   });

//   const [taskForm, setTaskForm] = useState({
//     title: '',
//     description: '',
//     projectId: '',
//     status: 'Pending',
//     priority: 'Medium',
//     assignedTo: [],
//     startDate: '',
//     dueDate: ''
//   });

//   // Responsive state
//   const [isMobile, setIsMobile] = useState(false);
  
//   // Refs
//   const contentRef = useRef(null);

//   // Check screen size
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
    
//     return () => {
//       window.removeEventListener('resize', checkScreenSize);
//     };
//   }, []);

//   // Sample Employees Data
//   const sampleEmployees = useMemo(() => employeesData.length > 0 ? employeesData : [
//     { id: 1, name: 'John Smith', role: 'Frontend Developer', department: 'Engineering', email: 'john@example.com', avatar: 'JS' },
//     { id: 2, name: 'Emily Johnson', role: 'UI/UX Designer', department: 'Design', email: 'emily@example.com', avatar: 'EJ' },
//     { id: 3, name: 'Michael Brown', role: 'Backend Developer', department: 'Engineering', email: 'michael@example.com', avatar: 'MB' },
//     { id: 4, name: 'Sarah Wilson', role: 'Project Manager', department: 'Management', email: 'sarah@example.com', avatar: 'SW' },
//     { id: 5, name: 'David Lee', role: 'QA Engineer', department: 'Quality', email: 'david@example.com', avatar: 'DL' },
//     { id: 6, name: 'Lisa Taylor', role: 'DevOps Engineer', department: 'Engineering', email: 'lisa@example.com', avatar: 'LT' },
//     { id: 7, name: 'Robert Chen', role: 'Full Stack Developer', department: 'Engineering', email: 'robert@example.com', avatar: 'RC' },
//     { id: 8, name: 'Emma Garcia', role: 'HR Manager', department: 'HR', email: 'emma@example.com', avatar: 'EG' }
//   ], [employeesData]);

//   // Sample Projects with tasks included
//   const sampleProjects = useMemo(() => [
//     {
//       id: 1,
//       title: 'Website Redesign',
//       description: 'Complete redesign of company website with modern UI/UX',
//       client: 'ABC Corporation',
//       status: 'In Progress',
//       priority: 'High',
//       startDate: '2024-02-25',
//       endDate: '2024-05-30',
//       progress: 65,
//       remainingDays: 45,
//       budget: '$25,000',
//       teamMembers: [1, 2, 3],
//       createdBy: 4,
//       createdAt: '2024-02-20',
//       clientContact: 'contact@abccorp.com',
//       clientPhone: '+1 234 567 8900',
//       totalTasks: 8,
//       completedTasks: 5,
//       pendingTasks: 3
//     },
//     {
//       id: 2,
//       title: 'Mobile App Development',
//       description: 'iOS and Android application for customer engagement',
//       client: 'TechStart Inc',
//       status: 'Planning',
//       priority: 'High',
//       startDate: '2024-03-10',
//       endDate: '2024-08-15',
//       progress: 20,
//       remainingDays: 120,
//       budget: '$45,000',
//       teamMembers: [2, 3, 4, 5],
//       createdBy: 4,
//       createdAt: '2024-03-01',
//       clientContact: 'info@techstart.com',
//       clientPhone: '+1 987 654 3210',
//       totalTasks: 12,
//       completedTasks: 3,
//       pendingTasks: 9
//     },
//     {
//       id: 3,
//       title: 'E-commerce Platform',
//       description: 'Build online shopping platform with payment integration',
//       client: 'Retail Solutions',
//       status: 'Completed',
//       priority: 'Medium',
//       startDate: '2024-01-15',
//       endDate: '2024-04-30',
//       progress: 100,
//       remainingDays: 0,
//       budget: '$38,000',
//       teamMembers: [1, 3, 6],
//       createdBy: 4,
//       createdAt: '2023-12-20',
//       clientContact: 'sales@retailsolutions.com',
//       clientPhone: '+1 555 123 4567',
//       totalTasks: 15,
//       completedTasks: 15,
//       pendingTasks: 0
//     },
//     {
//       id: 4,
//       title: 'CRM System Upgrade',
//       description: 'Upgrade existing CRM with new features and better UX',
//       client: 'Global Enterprises',
//       status: 'On Hold',
//       priority: 'Low',
//       startDate: '2024-03-01',
//       endDate: '2024-06-30',
//       progress: 40,
//       remainingDays: 90,
//       budget: '$22,000',
//       teamMembers: [2, 5],
//       createdBy: 4,
//       createdAt: '2024-02-15',
//       clientContact: 'support@globalent.com',
//       clientPhone: '+1 444 555 6666',
//       totalTasks: 6,
//       completedTasks: 2,
//       pendingTasks: 4
//     }
//   ], []);

//   // Sample Tasks
//   const sampleTasks = useMemo(() => [
//     {
//       id: 1,
//       title: 'Design Homepage Layout',
//       description: 'Create wireframes for homepage with modern design',
//       projectId: 1,
//       status: 'In Progress',
//       priority: 'High',
//       assignedTo: [2],
//       startDate: '2024-03-01',
//       dueDate: '2024-03-15',
//       createdBy: 4,
//       createdAt: '2024-02-25',
//       progress: 75
//     },
//     {
//       id: 2,
//       title: 'Develop Header Component',
//       description: 'Code responsive header with navigation',
//       projectId: 1,
//       status: 'Completed',
//       priority: 'Medium',
//       assignedTo: [1],
//       startDate: '2024-02-28',
//       dueDate: '2024-03-10',
//       createdBy: 4,
//       createdAt: '2024-02-25',
//       progress: 100
//     },
//     {
//       id: 3,
//       title: 'API Integration Setup',
//       description: 'Set up backend API endpoints',
//       projectId: 1,
//       status: 'In Progress',
//       priority: 'High',
//       assignedTo: [3],
//       startDate: '2024-03-05',
//       dueDate: '2024-03-20',
//       createdBy: 4,
//       createdAt: '2024-03-01',
//       progress: 60
//     },
//     {
//       id: 4,
//       title: 'Mobile Responsive Testing',
//       description: 'Test website on mobile devices',
//       projectId: 1,
//       status: 'Pending',
//       priority: 'Medium',
//       assignedTo: [5],
//       startDate: '2024-03-25',
//       dueDate: '2024-04-05',
//       createdBy: 4,
//       createdAt: '2024-03-10',
//       progress: 0
//     },
//     {
//       id: 5,
//       title: 'App Wireframes',
//       description: 'Design mobile app wireframes',
//       projectId: 2,
//       status: 'Planning',
//       priority: 'High',
//       assignedTo: [2],
//       startDate: '2024-03-20',
//       dueDate: '2024-04-05',
//       createdBy: 4,
//       createdAt: '2024-03-15',
//       progress: 10
//     },
//     {
//       id: 6,
//       title: 'Database Schema Design',
//       description: 'Design database structure for mobile app',
//       projectId: 2,
//       status: 'Pending',
//       priority: 'Medium',
//       assignedTo: [3],
//       startDate: '2024-04-01',
//       dueDate: '2024-04-15',
//       createdBy: 4,
//       createdAt: '2024-03-20',
//       progress: 0
//     },
//     {
//       id: 7,
//       title: 'Payment Gateway Integration',
//       description: 'Integrate payment system for e-commerce',
//       projectId: 3,
//       status: 'Completed',
//       priority: 'High',
//       assignedTo: [1, 3],
//       startDate: '2024-02-01',
//       dueDate: '2024-02-28',
//       createdBy: 4,
//       createdAt: '2024-01-25',
//       progress: 100
//     },
//     {
//       id: 8,
//       title: 'User Authentication System',
//       description: 'Implement secure user login system',
//       projectId: 3,
//       status: 'Completed',
//       priority: 'Medium',
//       assignedTo: [3],
//       startDate: '2024-01-20',
//       dueDate: '2024-02-10',
//       createdBy: 4,
//       createdAt: '2024-01-15',
//       progress: 100
//     }
//   ], []);

//   // Initialize data
//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setProjects(sampleProjects);
//       setFilteredProjects(sampleProjects);
//       setTasks(sampleTasks);
//       setLoading(false);
//     }, 1000);
    
//     return () => clearTimeout(timer);
//   }, [sampleProjects, sampleTasks]);

//   // Apply filters
//   useEffect(() => {
//     let result = [...projects];
    
//     if (filters.status) {
//       result = result.filter(project => project.status === filters.status);
//     }
    
//     if (filters.client) {
//       result = result.filter(project => 
//         project.client.toLowerCase().includes(filters.client.toLowerCase())
//       );
//     }
    
//     if (filters.priority) {
//       result = result.filter(project => project.priority === filters.priority);
//     }
    
//     if (filters.assignedTo) {
//       const employeeId = parseInt(filters.assignedTo);
//       result = result.filter(project => 
//         project.teamMembers.includes(employeeId)
//       );
//     }
    
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       result = result.filter(project => 
//         project.title.toLowerCase().includes(searchLower) ||
//         project.description.toLowerCase().includes(searchLower) ||
//         project.client.toLowerCase().includes(searchLower)
//       );
//     }
    
//     setFilteredProjects(result);
//   }, [filters, projects]);

//   // Get employee by ID
//   const getEmployeeById = useCallback((id) => {
//     return sampleEmployees.find(emp => emp.id === id) || { name: 'Unknown', role: 'Unknown', avatar: '?' };
//   }, [sampleEmployees]);

//   // Get tasks by project
//   const getTasksByProject = useCallback((projectId) => {
//     return tasks.filter(task => task.projectId === projectId);
//   }, [tasks]);

//   // Get completed tasks by project
//   const getCompletedTasksByProject = useCallback((projectId) => {
//     return tasks.filter(task => task.projectId === projectId && task.status === 'Completed').length;
//   }, [tasks]);

//   // Get pending tasks by project
//   const getPendingTasksByProject = useCallback((projectId) => {
//     return tasks.filter(task => task.projectId === projectId && task.status !== 'Completed').length;
//   }, [tasks]);

//   // Get team members for project
//   const getTeamMembers = useCallback((project) => {
//     return project.teamMembers.map(empId => getEmployeeById(empId));
//   }, [getEmployeeById]);

//   // Calculate project progress based on tasks
//   const calculateProjectProgress = useCallback((projectId) => {
//     const projectTasks = tasks.filter(task => task.projectId === projectId);
//     if (projectTasks.length === 0) return 0;
    
//     const totalProgress = projectTasks.reduce((sum, task) => sum + task.progress, 0);
//     return Math.round(totalProgress / projectTasks.length);
//   }, [tasks]);

//   // Get tasks assigned to employee
//   const getTasksByEmployee = useCallback((employeeId) => {
//     return tasks.filter(task => task.assignedTo.includes(employeeId));
//   }, [tasks]);

//   // Handle project form changes
//   const handleProjectFormChange = useCallback((field, value) => {
//     setProjectForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   }, []);

//   // Handle task form changes
//   const handleTaskFormChange = useCallback((field, value) => {
//     setTaskForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   }, []);

//   // Create new project
//   const handleCreateProject = useCallback(() => {
//     if (!projectForm.title || !projectForm.client || !projectForm.endDate) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const newProject = {
//       id: projects.length + 1,
//       title: projectForm.title,
//       description: projectForm.description,
//       client: projectForm.client,
//       status: projectForm.status,
//       priority: projectForm.priority,
//       startDate: projectForm.startDate || new Date().toISOString().split('T')[0],
//       endDate: projectForm.endDate,
//       progress: 0,
//       remainingDays: Math.ceil((new Date(projectForm.endDate) - new Date()) / (1000 * 60 * 60 * 24)),
//       budget: projectForm.budget ? `$${projectForm.budget}` : '$0',
//       teamMembers: [],
//       createdBy: currentUser?.id || 4,
//       createdAt: new Date().toISOString().split('T')[0],
//       clientContact: '',
//       clientPhone: '',
//       totalTasks: 0,
//       completedTasks: 0,
//       pendingTasks: 0
//     };

//     setProjects(prev => [newProject, ...prev]);
//     setProjectForm({
//       title: '',
//       description: '',
//       client: '',
//       status: 'Planning',
//       priority: 'Medium',
//       startDate: '',
//       endDate: '',
//       budget: ''
//     });
//     setShowCreateForm(false);
//     alert('Project created successfully!');
//   }, [projectForm, projects.length, currentUser]);

//   // Create new task
//   const handleCreateTask = useCallback(() => {
//     if (!taskForm.title || !taskForm.projectId || !taskForm.dueDate) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     const newTask = {
//       id: tasks.length + 1,
//       title: taskForm.title,
//       description: taskForm.description,
//       projectId: parseInt(taskForm.projectId),
//       status: taskForm.status,
//       priority: taskForm.priority,
//       assignedTo: taskForm.assignedTo.map(id => parseInt(id)),
//       startDate: taskForm.startDate || new Date().toISOString().split('T')[0],
//       dueDate: taskForm.dueDate,
//       createdBy: currentUser?.id || 4,
//       createdAt: new Date().toISOString().split('T')[0],
//       progress: 0
//     };

//     setTasks(prev => [newTask, ...prev]);
    
//     // Update project task counts
//     setProjects(prev => prev.map(project => {
//       if (project.id === parseInt(taskForm.projectId)) {
//         const projectTasks = [...tasks, newTask].filter(t => t.projectId === project.id);
//         const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
//         return {
//           ...project,
//           totalTasks: projectTasks.length,
//           completedTasks: completedTasks,
//           pendingTasks: projectTasks.length - completedTasks,
//           progress: Math.round((completedTasks / projectTasks.length) * 100) || 0
//         };
//       }
//       return project;
//     }));

//     setTaskForm({
//       title: '',
//       description: '',
//       projectId: '',
//       status: 'Pending',
//       priority: 'Medium',
//       assignedTo: [],
//       startDate: '',
//       dueDate: ''
//     });
//     setShowTaskForm(false);
//     alert('Task created successfully!');
//   }, [taskForm, tasks, projects, currentUser]);

//   // Delete project
//   const handleDeleteProject = useCallback((projectId) => {
//     if (window.confirm('Are you sure you want to delete this project? All tasks will also be deleted.')) {
//       setProjects(prev => prev.filter(project => project.id !== projectId));
//       setTasks(prev => prev.filter(task => task.projectId !== projectId));
//     }
//   }, []);

//   // Delete task
//   const handleDeleteTask = useCallback((taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       const task = tasks.find(t => t.id === taskId);
//       if (task) {
//         // Update project task counts
//         setProjects(prev => prev.map(project => {
//           if (project.id === task.projectId) {
//             const projectTasks = tasks.filter(t => t.projectId === project.id && t.id !== taskId);
//             const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
//             return {
//               ...project,
//               totalTasks: projectTasks.length,
//               completedTasks: completedTasks,
//               pendingTasks: projectTasks.length - completedTasks,
//               progress: projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0
//             };
//           }
//           return project;
//         }));
//       }
//       setTasks(prev => prev.filter(task => task.id !== taskId));
//     }
//   }, [tasks]);

//   // View project details
//   const handleViewProject = useCallback((project) => {
//     setSelectedProject(project);
//   }, []);

//   // Update task status
//   const handleUpdateTaskStatus = useCallback((taskId, newStatus) => {
//     setTasks(prev => prev.map(task => {
//       if (task.id === taskId) {
//         const progress = newStatus === 'Completed' ? 100 : 
//                         newStatus === 'In Progress' ? 50 : 
//                         task.progress;
//         return { ...task, status: newStatus, progress };
//       }
//       return task;
//     }));

//     // Update project progress
//     const task = tasks.find(t => t.id === taskId);
//     if (task) {
//       setProjects(prev => prev.map(project => {
//         if (project.id === task.projectId) {
//           const projectTasks = tasks.map(t => 
//             t.id === taskId ? { ...t, status: newStatus } : t
//           ).filter(t => t.projectId === project.id);
          
//           const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
//           return {
//             ...project,
//             completedTasks: completedTasks,
//             pendingTasks: projectTasks.length - completedTasks,
//             progress: Math.round((completedTasks / projectTasks.length) * 100) || 0
//           };
//         }
//         return project;
//       }));
//     }
//   }, [tasks]);

//   // Update project status
//   const handleUpdateProjectStatus = useCallback((projectId, newStatus) => {
//     setProjects(prev => prev.map(project => {
//       if (project.id === projectId) {
//         return { ...project, status: newStatus };
//       }
//       return project;
//     }));
//   }, []);

//   // Get status badge class
//   const getStatusClass = (status) => {
//     switch(status) {
//       case 'In Progress': return 'status-in-progress';
//       case 'Planning': return 'status-planning';
//       case 'Completed': return 'status-completed';
//       case 'On Hold': return 'status-on-hold';
//       case 'Pending': return 'status-pending';
//       case 'Delayed': return 'status-delayed';
//       case 'Blocked': return 'status-blocked';
//       case 'Waiting for Approval': return 'status-waiting';
//       case 'Testing Phase': return 'status-testing';
//       case 'Cancelled': return 'status-cancelled';
//       default: return 'status-pending';
//     }
//   };

//   // Get priority badge class
//   const getPriorityClass = (priority) => {
//     switch(priority) {
//       case 'High': return 'priority-high';
//       case 'Medium': return 'priority-medium';
//       case 'Low': return 'priority-low';
//       default: return '';
//     }
//   };

//   // Calculate stats
//   const stats = useMemo(() => ({
//     totalProjects: projects.length,
//     inProgress: projects.filter(p => p.status === 'In Progress').length,
//     completed: projects.filter(p => p.status === 'Completed').length,
//     totalTasks: tasks.length,
//     completedTasks: tasks.filter(t => t.status === 'Completed').length,
//     pendingTasks: tasks.filter(t => t.status !== 'Completed').length,
//     teamMembers: new Set(tasks.flatMap(task => task.assignedTo)).size,
//     highPriorityTasks: tasks.filter(t => t.priority === 'High').length,
//     overdueTasks: tasks.filter(t => 
//       new Date(t.dueDate) < new Date() && t.status !== 'Completed'
//     ).length
//   }), [projects, tasks]);

//   // Get tasks summary by employee
//   const getEmployeeTaskSummary = useCallback(() => {
//     const summary = {};
    
//     sampleEmployees.forEach(employee => {
//       const employeeTasks = getTasksByEmployee(employee.id);
//       const completedTasks = employeeTasks.filter(t => t.status === 'Completed').length;
      
//       summary[employee.id] = {
//         name: employee.name,
//         role: employee.role,
//         totalTasks: employeeTasks.length,
//         completedTasks: completedTasks,
//         pendingTasks: employeeTasks.length - completedTasks,
//         progress: employeeTasks.length > 0 ? Math.round((completedTasks / employeeTasks.length) * 100) : 0
//       };
//     });
    
//     return summary;
//   }, [sampleEmployees, getTasksByEmployee]);

//   // Handle clear all filters
//   const handleClearFilters = useCallback(() => {
//     setFilters({
//       status: '',
//       client: '',
//       priority: '',
//       search: '',
//       assignedTo: ''
//     });
//   }, []);

//   // Render project detail modal
//   const renderProjectDetailModal = () => {
//     if (!selectedProject) return null;

//     const projectTasks = getTasksByProject(selectedProject.id);
//     const projectTeam = getTeamMembers(selectedProject);
//     const employeeTaskSummary = getEmployeeTaskSummary();

//     return (
//       <div className="project-detail-overlay" onClick={() => setSelectedProject(null)}>
//         <div className="project-detail-modal" onClick={(e) => e.stopPropagation()}>
//           <div className="project-detail-header">
//             <h2>{selectedProject.title}</h2>
//             <button onClick={() => setSelectedProject(null)}>✕</button>
//           </div>
          
//           <div className="project-detail-content">
//             <div className="project-info-section">
//               <div className="info-row">
//                 <div className="info-item">
//                   <label>Client</label>
//                   <p>{selectedProject.client}</p>
//                 </div>
//                 <div className="info-item">
//                   <label>Status</label>
//                   <span className={`status-badge ${getStatusClass(selectedProject.status)}`}>
//                     {selectedProject.status}
//                   </span>
//                 </div>
//                 <div className="info-item">
//                   <label>Priority</label>
//                   <span className={`priority-badge ${getPriorityClass(selectedProject.priority)}`}>
//                     {selectedProject.priority}
//                   </span>
//                 </div>
//                 <div className="info-item">
//                   <label>Progress</label>
//                   <p>{selectedProject.progress}%</p>
//                 </div>
//               </div>
              
//               <div className="info-row">
//                 <div className="info-item">
//                   <label>Start Date</label>
//                   <p>{new Date(selectedProject.startDate).toLocaleDateString()}</p>
//                 </div>
//                 <div className="info-item">
//                   <label>End Date</label>
//                   <p>{new Date(selectedProject.endDate).toLocaleDateString()}</p>
//                 </div>
//                 <div className="info-item">
//                   <label>Remaining Days</label>
//                   <p>{selectedProject.remainingDays} days</p>
//                 </div>
//                 <div className="info-item">
//                   <label>Budget</label>
//                   <p>{selectedProject.budget}</p>
//                 </div>
//               </div>
              
//               <div className="info-item full-width">
//                 <label>Description</label>
//                 <p>{selectedProject.description}</p>
//               </div>
//             </div>

//             {/* Team Section with Task Distribution */}
//             <div className="section">
//               <h3>👥 Team Members & Task Distribution</h3>
//               <div className="team-grid">
//                 {projectTeam.map((member, index) => {
//                   const summary = employeeTaskSummary[member.id] || { totalTasks: 0, completedTasks: 0 };
//                   const projectTasksForMember = projectTasks.filter(task => 
//                     task.assignedTo.includes(member.id)
//                   );
                  
//                   return (
//                     <div key={index} className="team-member">
//                       <div className="member-avatar">{member.avatar}</div>
//                       <div className="member-info">
//                         <div className="member-name">{member.name}</div>
//                         <div className="member-role">{member.role}</div>
//                         <div className="member-dept">{member.department}</div>
//                       </div>
//                       <div className="member-tasks-info">
//                         <div className="task-stats">
//                           <div className="task-stat">
//                             <span className="stat-label">Project Tasks:</span>
//                             <span className="stat-value">{projectTasksForMember.length}</span>
//                           </div>
//                           <div className="task-stat">
//                             <span className="stat-label">Completed:</span>
//                             <span className="stat-value">{projectTasksForMember.filter(t => t.status === 'Completed').length}</span>
//                           </div>
//                           <div className="task-stat">
//                             <span className="stat-label">Pending:</span>
//                             <span className="stat-value">{projectTasksForMember.filter(t => t.status !== 'Completed').length}</span>
//                           </div>
//                         </div>
//                         <div className="task-progress-bar">
//                           <div 
//                             className="progress-fill"
//                             style={{ 
//                               width: `${projectTasksForMember.length > 0 ? 
//                                 Math.round((projectTasksForMember.filter(t => t.status === 'Completed').length / projectTasksForMember.length) * 100) : 0}%` 
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Tasks Section */}
//             <div className="section">
//               <div className="section-header">
//                 <h3>📋 Tasks ({projectTasks.length})</h3>
//                 <button 
//                   className="btn-small btn-primary"
//                   onClick={() => {
//                     setTaskForm(prev => ({ ...prev, projectId: selectedProject.id }));
//                     setShowTaskForm(true);
//                     setSelectedProject(null);
//                   }}
//                 >
//                   + Add Task
//                 </button>
//               </div>
              
//               {projectTasks.length > 0 ? (
//                 <div className="tasks-table">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Task</th>
//                         <th>Assigned To</th>
//                         <th>Priority</th>
//                         <th>Status</th>
//                         <th>Due Date</th>
//                         <th>Progress</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {projectTasks.map(task => (
//                         <tr key={task.id}>
//                           <td>
//                             <div className="task-title">
//                               <strong>{task.title}</strong>
//                               <small>{task.description}</small>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="assigned-users">
//                               {task.assignedTo.map(empId => {
//                                 const emp = getEmployeeById(empId);
//                                 return (
//                                   <span key={empId} className="user-badge" title={emp.name}>
//                                     {emp.avatar}
//                                   </span>
//                                 );
//                               })}
//                             </div>
//                           </td>
//                           <td>
//                             <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
//                               {task.priority}
//                             </span>
//                           </td>
//                           <td>
//                             <select 
//                               value={task.status}
//                               onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
//                               className="status-select"
//                             >
//                               <option value="Pending">Pending</option>
//                               <option value="In Progress">In Progress</option>
//                               <option value="Completed">Completed</option>
//                               <option value="On Hold">On Hold</option>
//                               <option value="Delayed">Delayed</option>
//                               <option value="Blocked">Blocked</option>
//                               <option value="Waiting for Approval">Waiting for Approval</option>
//                               <option value="Testing Phase">Testing Phase</option>
//                               <option value="Cancelled">Cancelled</option>
//                             </select>
//                           </td>
//                           <td>{new Date(task.dueDate).toLocaleDateString()}</td>
//                           <td>
//                             <div className="progress-cell">
//                               <div className="project-progress-bar">
//                                 <div 
//                                   className="project-progress-fill"
//                                   style={{ width: `${task.progress}%` }}
//                                 ></div>
//                               </div>
//                               <span className="progress-text">{task.progress}%</span>
//                             </div>
//                           </td>
//                           <td>
//                             <button 
//                               className="btn-icon btn-danger"
//                               onClick={() => handleDeleteTask(task.id)}
//                               title="Delete Task"
//                             >
//                               🗑️
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <p className="no-data">No tasks yet. Create the first task!</p>
//               )}
//             </div>

//             {/* Task Summary */}
//             <div className="section">
//               <h3>📊 Task Summary</h3>
//               <div className="task-summary-cards">
//                 <div className="summary-card">
//                   <div className="summary-icon">📋</div>
//                   <div className="summary-content">
//                     <div className="summary-value">{selectedProject.totalTasks}</div>
//                     <div className="summary-label">Total Tasks</div>
//                   </div>
//                 </div>
//                 <div className="summary-card">
//                   <div className="summary-icon">✅</div>
//                   <div className="summary-content">
//                     <div className="summary-value">{selectedProject.completedTasks}</div>
//                     <div className="summary-label">Completed</div>
//                   </div>
//                 </div>
//                 <div className="summary-card">
//                   <div className="summary-icon">⏳</div>
//                   <div className="summary-content">
//                     <div className="summary-value">{selectedProject.pendingTasks}</div>
//                     <div className="summary-label">Pending</div>
//                   </div>
//                 </div>
//                 <div className="summary-card">
//                   <div className="summary-icon">📈</div>
//                   <div className="summary-content">
//                     <div className="summary-value">{selectedProject.progress}%</div>
//                     <div className="summary-label">Completion</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="projects-container">
//       {/* Projects Header */}
//       <div className="projects-header">
//         <div className="projects-header-content">
//           <div className="projects-header-left">
//             <div className="projects-header-icon">📋</div>
//             <div className="projects-header-title">
//               <h1>Projects Management</h1>
//               <p>
//                 {isMobile ? (
//                   <>
//                     <span className="projects-count-badge">{projects.length} Projects</span>
//                     <span className="projects-count-badge">{tasks.length} Tasks</span>
//                   </>
//                 ) : (
//                   <>
//                     Manage and track all projects • Total: 
//                     <span className="projects-count-badge">{projects.length} Projects</span>
//                     • <span className="projects-count-badge">{tasks.length} Tasks</span>
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//           <div className="projects-header-right">
//             <button 
//               className="btn-primary"
//               onClick={() => setShowCreateForm(true)}
//             >
//               + New Project
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="projects-content" ref={contentRef}>
//         <div className="projects-main-area">
//           {/* Quick Stats */}
//           <div className="quick-stats">
//             <div className="stat-card">
//               <div className="stat-icon">📋</div>
//               <div className="stat-content">
//                 <div className="stat-value">{stats.totalProjects}</div>
//                 <div className="stat-label">Total Projects</div>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">👥</div>
//               <div className="stat-content">
//                 <div className="stat-value">{stats.teamMembers}</div>
//                 <div className="stat-label">Team Members</div>
//               </div>
//             </div>
//           </div>

//           {/* Filters Section */}
//           <div className="projects-filters-section">
//             <div className="filters-title">
//               <span>Filters & Search</span>
//               {Object.values(filters).some(filter => filter !== '') && (
//                 <button 
//                   onClick={handleClearFilters}
//                   className="clear-all-filters-btn"
//                 >
//                   Clear All
//                 </button>
//               )}
//             </div>
//             <div className="filters-row">
//               <div className="filter-group">
//                 <label>Status</label>
//                 <select 
//                   value={filters.status}
//                   onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
//                   className="filter-select"
//                 >
//                   <option value="">All Status</option>
//                   <option value="Planning">Planning</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                   <option value="On Hold">On Hold</option>
//                   <option value="Delayed">Delayed</option>
//                   <option value="Blocked">Blocked</option>
//                 </select>
//               </div>
              
//               <div className="filter-group">
//                 <label>Priority</label>
//                 <select 
//                   value={filters.priority}
//                   onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
//                   className="filter-select"
//                 >
//                   <option value="">All Priorities</option>
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//               </div>
              
//               <div className="filter-group">
//                 <label>Assigned To</label>
//                 <select 
//                   value={filters.assignedTo}
//                   onChange={(e) => setFilters(prev => ({ ...prev, assignedTo: e.target.value }))}
//                   className="filter-select"
//                 >
//                   <option value="">All Team Members</option>
//                   {sampleEmployees.map(emp => (
//                     <option key={emp.id} value={emp.id}>{emp.name}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="filter-group">
//                 <label>Search</label>
//                 <input
//                   type="text"
//                   value={filters.search}
//                   onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
//                   placeholder="Search projects, clients..."
//                   className="filter-input"
//                 />
//               </div>
              
//               <button 
//                 className="clear-filters-btn"
//                 onClick={handleClearFilters}
//               >
//                 {isMobile ? 'Clear' : 'Clear Filters'}
//               </button>
//             </div>
//           </div>

//           {/* Projects Table */}
//           {loading ? (
//             <div className="projects-loading-container">
//               <div className="projects-loading-spinner"></div>
//               <p className="projects-loading-text">Loading projects...</p>
//             </div>
//           ) : (
//             <div className="projects-table-container">
//               <div className="table-responsive-wrapper">
//                 <table className="projects-table">
//                   <thead>
//                     <tr>
//                       <th>Project Title</th>
//                       <th>Client</th>
//                       <th>Tasks</th>
//                       <th>Team</th>
//                       <th>Status</th>
//                       <th>Priority</th>
//                       <th>Progress</th>
//                       <th>Timeline</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredProjects.map((project) => {
//                       const projectTasks = getTasksByProject(project.id);
//                       const completedTasks = getCompletedTasksByProject(project.id);
//                       const pendingTasks = getPendingTasksByProject(project.id);
                      
//                       return (
//                         <tr key={project.id}>
//                           <td>
//                             <div className="project-title-cell">
//                               <div className="project-title">{project.title}</div>
//                               <div className="project-description">{project.description}</div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="client-name">{project.client}</div>
//                             <div className="client-contact">{project.clientContact}</div>
//                           </td>
//                           <td>
//                             <div className="tasks-cell">
//                               <div className="tasks-summary">
//                                 <span className="completed-tasks">{completedTasks}✅</span>
//                                 <span className="pending-tasks">{pendingTasks}⏳</span>
//                                 <span className="total-tasks">/{projectTasks.length}</span>
//                               </div>
//                               <div className="tasks-progress">
//                                 <div className="project-progress-bar small">
//                                   <div 
//                                     className="project-progress-fill"
//                                     style={{ 
//                                       width: `${projectTasks.length > 0 ? (completedTasks / projectTasks.length) * 100 : 0}%` 
//                                     }}
//                                   ></div>
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="team-cell">
//                               <div className="team-avatars">
//                                 {getTeamMembers(project).slice(0, 3).map((member, index) => (
//                                   <div key={index} className="team-avatar" title={member.name}>
//                                     {member.avatar}
//                                   </div>
//                                 ))}
//                                 {getTeamMembers(project).length > 3 && (
//                                   <div className="team-more">+{getTeamMembers(project).length - 3}</div>
//                                 )}
//                               </div>
//                               <div className="team-count">{getTeamMembers(project).length} members</div>
//                             </div>
//                           </td>
//                           <td>
//                             <select 
//                               value={project.status}
//                               onChange={(e) => handleUpdateProjectStatus(project.id, e.target.value)}
//                               className="status-select"
//                             >
//                               <option value="Planning">Planning</option>
//                               <option value="In Progress">In Progress</option>
//                               <option value="Completed">Completed</option>
//                               <option value="On Hold">On Hold</option>
//                               <option value="Delayed">Delayed</option>
//                               <option value="Blocked">Blocked</option>
//                             </select>
//                           </td>
//                           <td>
//                             <span className={`priority-badge ${getPriorityClass(project.priority)}`}>
//                               {project.priority}
//                             </span>
//                           </td>
//                           <td>
//                             <div className="progress-cell">
//                               <div className="project-progress-bar">
//                                 <div 
//                                   className="project-progress-fill"
//                                   style={{ width: `${project.progress}%` }}
//                                 ></div>
//                               </div>
//                               <div className="progress-percentage">{project.progress}%</div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="timeline-cell">
//                               <div className="dates">
//                                 {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
//                                 {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                               </div>
//                               <div className="remaining-days">
//                                 {project.remainingDays > 0 
//                                   ? `${project.remainingDays}d left` 
//                                   : 'Completed'}
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="action-buttons">
//                               <button 
//                                 className="action-btn view-btn" 
//                                 title="View Details"
//                                 onClick={() => handleViewProject(project)}
//                               >
//                                 👁️
//                               </button>
//                               <button 
//                                 className="action-btn edit-btn" 
//                                 title="Add Task"
//                                 onClick={() => {
//                                   setTaskForm(prev => ({ ...prev, projectId: project.id }));
//                                   setShowTaskForm(true);
//                                 }}
//                               >
//                                 ➕
//                               </button>
//                               <button 
//                                 className="action-btn delete-btn" 
//                                 title="Delete Project"
//                                 onClick={() => handleDeleteProject(project.id)}
//                               >
//                                 🗑️
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
              
//               {filteredProjects.length === 0 && (
//                 <div className="no-projects-message">
//                   No projects found. Try adjusting your filters or create a new project.
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create Project Modal */}
//       {showCreateForm && (
//         <div className="create-project-overlay" onClick={() => setShowCreateForm(false)}>
//           <div className="create-project-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="create-project-header">
//               <h2>Create New Project</h2>
//               <button onClick={() => setShowCreateForm(false)}>✕</button>
//             </div>
//             <div className="create-project-form">
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Project Title *</label>
//                   <input 
//                     type="text" 
//                     placeholder="Enter project title"
//                     value={projectForm.title}
//                     onChange={(e) => handleProjectFormChange('title', e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Client Name *</label>
//                   <input 
//                     type="text" 
//                     placeholder="Enter client name"
//                     value={projectForm.client}
//                     onChange={(e) => handleProjectFormChange('client', e.target.value)}
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea 
//                   placeholder="Enter project description"
//                   rows="3"
//                   value={projectForm.description}
//                   onChange={(e) => handleProjectFormChange('description', e.target.value)}
//                 ></textarea>
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Status</label>
//                   <select 
//                     value={projectForm.status}
//                     onChange={(e) => handleProjectFormChange('status', e.target.value)}
//                   >
//                     <option value="Planning">Planning</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="On Hold">On Hold</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Priority</label>
//                   <select 
//                     value={projectForm.priority}
//                     onChange={(e) => handleProjectFormChange('priority', e.target.value)}
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Start Date</label>
//                   <input 
//                     type="date" 
//                     value={projectForm.startDate}
//                     onChange={(e) => handleProjectFormChange('startDate', e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>End Date *</label>
//                   <input 
//                     type="date" 
//                     value={projectForm.endDate}
//                     onChange={(e) => handleProjectFormChange('endDate', e.target.value)}
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Budget ($)</label>
//                 <input 
//                   type="number" 
//                   placeholder="Enter project budget"
//                   value={projectForm.budget}
//                   onChange={(e) => handleProjectFormChange('budget', e.target.value)}
//                 />
//               </div>
              
//               <div className="form-actions">
//                 <button 
//                   className="cancel-btn"
//                   onClick={() => setShowCreateForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="submit-btn"
//                   onClick={handleCreateProject}
//                 >
//                   Create Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create Task Modal */}
//       {showTaskForm && (
//         <div className="create-project-overlay" onClick={() => setShowTaskForm(false)}>
//           <div className="create-project-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="create-project-header">
//               <h2>Create New Task</h2>
//               <button onClick={() => setShowTaskForm(false)}>✕</button>
//             </div>
//             <div className="create-project-form">
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Task Title *</label>
//                   <input 
//                     type="text" 
//                     placeholder="Enter task title"
//                     value={taskForm.title}
//                     onChange={(e) => handleTaskFormChange('title', e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Project *</label>
//                   <select 
//                     value={taskForm.projectId}
//                     onChange={(e) => handleTaskFormChange('projectId', e.target.value)}
//                   >
//                     <option value="">Select Project</option>
//                     {projects.map(project => (
//                       <option key={project.id} value={project.id}>{project.title}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea 
//                   placeholder="Enter task description"
//                   rows="3"
//                   value={taskForm.description}
//                   onChange={(e) => handleTaskFormChange('description', e.target.value)}
//                 ></textarea>
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Status *</label>
//                   <select 
//                     value={taskForm.status}
//                     onChange={(e) => handleTaskFormChange('status', e.target.value)}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="On Hold">On Hold</option>
//                     <option value="Delayed">Delayed</option>
//                     <option value="Blocked">Blocked</option>
//                     <option value="Waiting for Approval">Waiting for Approval</option>
//                     <option value="Testing Phase">Testing Phase</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Priority</label>
//                   <select 
//                     value={taskForm.priority}
//                     onChange={(e) => handleTaskFormChange('priority', e.target.value)}
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Start Date</label>
//                   <input 
//                     type="date" 
//                     value={taskForm.startDate}
//                     onChange={(e) => handleTaskFormChange('startDate', e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Due Date *</label>
//                   <input 
//                     type="date" 
//                     value={taskForm.dueDate}
//                     onChange={(e) => handleTaskFormChange('dueDate', e.target.value)}
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>Assign To *</label>
//                 <select 
//                   multiple
//                   value={taskForm.assignedTo}
//                   onChange={(e) => {
//                     const values = Array.from(e.target.selectedOptions, option => option.value);
//                     handleTaskFormChange('assignedTo', values);
//                   }}
//                   className="multi-select"
//                 >
//                   {sampleEmployees.map(emp => (
//                     <option key={emp.id} value={emp.id}>{emp.name} - {emp.role}</option>
//                   ))}
//                 </select>
//                 <small>Hold Ctrl/Cmd to select multiple members</small>
//               </div>
              
//               <div className="form-actions">
//                 <button 
//                   className="cancel-btn"
//                   onClick={() => setShowTaskForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="submit-btn"
//                   onClick={handleCreateTask}
//                 >
//                   Create Task
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Project Detail Modal */}
//       {renderProjectDetailModal()}

//       <style>{`
//         /* NEW SIMPLE CONTAINER - NO FIXED POSITIONING */
//         .projects-container {
//           color: white;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
//           position: relative;
//           z-index: 1;
//         }

//         /* Projects Header - NO FIXED POSITION */
//         .projects-header {
//           background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(26, 26, 46, 0.9) 100%);
//           padding: 20px 30px;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(10px);
//           position: sticky;
//           top: 0;
//           z-index: 100;
//         }

//         .projects-header-content {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .projects-header-left {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//         }

//         .projects-header-icon {
//           width: 50px;
//           height: 50px;
//           background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 24px;
//           color: white;
//         }

//         .projects-header-title h1 {
//           margin: 0 0 5px 0;
//           font-size: 24px;
//           font-weight: 700;
//           background: linear-gradient(90deg, #fff 0%, #a5b4fc 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .projects-header-title p {
//           margin: 0;
//           color: rgba(255, 255, 255, 0.7);
//           font-size: 14px;
//         }

//         .projects-count-badge {
//           background: rgba(255, 255, 255, 0.2);
//           padding: 2px 10px;
//           border-radius: 12px;
//           font-weight: 600;
//           font-size: 12px;
//           margin: 0 8px;
//         }

//         .projects-header-right {
//           display: flex;
//           gap: 12px;
//         }

//         /* Content Area - NORMAL SCROLLING */
//         .projects-content {
//           padding: 20px 30px;
//           overflow-y: auto;
//           min-height: calc(100vh - 120px);
//         }

//         .projects-main-area {
//           max-width: 1400px;
//           margin: 0 auto;
//         }

//         /* Quick Stats */
//         .quick-stats {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 16px;
//           margin-bottom: 30px;
//         }

//         .stat-card {
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 12px;
//           padding: 20px;
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           transition: all 0.3s ease;
//         }

//         .stat-card:hover {
//           background: rgba(255, 255, 255, 0.08);
//           transform: translateY(-3px);
//           border-color: rgba(255, 255, 255, 0.2);
//         }

//         .stat-icon {
//           font-size: 24px;
//           width: 50px;
//           height: 50px;
//           background: rgba(59, 130, 246, 0.1);
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .stat-content {
//           flex: 1;
//         }

//         .stat-value {
//           font-size: 24px;
//           font-weight: 700;
//           color: white;
//           margin-bottom: 4px;
//         }

//         .stat-label {
//           font-size: 12px;
//           color: rgba(255, 255, 255, 0.6);
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         /* Filters Section */
//         .projects-filters-section {
//           background: rgba(255, 255, 255, 0.03);
//           border-radius: 18px;
//           padding: 25px;
//           margin-bottom: 30px;
//           border: 1px solid rgba(255, 255, 255, 0.05);
//         }

//         .filters-title {
//           color: white;
//           font-size: 18px;
//           font-weight: 700;
//           margin-bottom: 20px;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .filters-row {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr) auto;
//           gap: 20px;
//           align-items: end;
//         }

//         @media (max-width: 1200px) {
//           .filters-row {
//             grid-template-columns: repeat(3, 1fr);
//           }
          
//           .filter-group:nth-child(4),
//           .filter-group:nth-child(5) {
//             grid-column: span 1;
//           }
          
//           .clear-filters-btn {
//             grid-column: span 3;
//           }
//         }

//         @media (max-width: 768px) {
//           .filters-row {
//             grid-template-columns: 1fr;
//           }
          
//           .clear-filters-btn {
//             grid-column: span 1;
//           }
//         }

//         .filter-group {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .filter-group label {
//           color: rgba(255, 255, 255, 0.7);
//           font-size: 14px;
//           font-weight: 600;
//         }

//         .filter-select,
//         .filter-input {
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 10px;
//           padding: 12px 16px;
//           color: white;
//           font-size: 14px;
//           transition: all 0.3s ease;
//           width: 100%;
//           box-sizing: border-box;
//         }

//         .filter-select:focus,
//         .filter-input:focus {
//           outline: none;
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
//         }

//         .clear-filters-btn {
//           background: rgba(255, 255, 255, 0.1);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           color: white;
//           padding: 12px 20px;
//           border-radius: 10px;
//           font-size: 14px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           white-space: nowrap;
//           min-width: 120px;
//         }

//         .clear-filters-btn:hover {
//           background: rgba(255, 255, 255, 0.15);
//           transform: translateY(-2px);
//         }

//         /* Table Styles */
//         .projects-table-container {
//           background: rgba(255, 255, 255, 0.03);
//           border-radius: 18px;
//           padding: 25px;
//           border: 1px solid rgba(255, 255, 255, 0.05);
//           overflow-x: auto;
//           margin-bottom: 30px;
//         }

//         .projects-table {
//           width: 100%;
//           border-collapse: separate;
//           border-spacing: 0;
//           min-width: 1200px;
//         }

//         .projects-table th {
//           background: rgba(255, 255, 255, 0.05);
//           color: rgba(255, 255, 255, 0.8);
//           font-weight: 700;
//           text-align: left;
//           padding: 18px 16px;
//           border-bottom: 2px solid rgba(255, 255, 255, 0.1);
//           font-size: 14px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .projects-table td {
//           padding: 20px 16px;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//           color: white;
//           font-size: 14px;
//           transition: all 0.3s ease;
//         }

//         .projects-table tbody tr:hover td {
//           background: rgba(255, 255, 255, 0.03);
//         }

//         /* Loading State */
//         .projects-loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 80px 20px;
//           text-align: center;
//         }

//         .projects-loading-spinner {
//           width: 60px;
//           height: 60px;
//           border: 4px solid rgba(255, 255, 255, 0.1);
//           border-top: 4px solid #3b82f6;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           margin-bottom: 25px;
//         }

//         .projects-loading-text {
//           color: rgba(255, 255, 255, 0.7);
//           font-size: 16px;
//           font-weight: 600;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         /* Responsive Design */
//         @media (max-width: 768px) {
//           .projects-header {
//             padding: 15px 20px;
//           }
          
//           .projects-header-content {
//             flex-direction: column;
//             gap: 15px;
//             text-align: center;
//           }
          
//           .projects-header-left {
//             flex-direction: column;
//             text-align: center;
//           }
          
//           .projects-header-right {
//             width: 100%;
//             justify-content: center;
//             flex-wrap: wrap;
//           }
          
//           .projects-content {
//             padding: 15px 20px;
//           }
          
//           .quick-stats {
//             grid-template-columns: 1fr;
//           }
//         }

//         @media (max-width: 480px) {
//           .projects-header {
//             padding: 12px 15px;
//           }
          
//           .projects-header-title h1 {
//             font-size: 20px;
//           }
          
//           .projects-header-title p {
//             font-size: 12px;
//           }
          
//           .projects-content {
//             padding: 10px 15px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default React.memo(ProjectsPage);








import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './ProjectsPage.css';
import {
  fetchProjects,
  createProject,
  fetchProjectById,
  updateProject,
  deleteProject,
  addProjectMember,
  removeProjectMember
} from "../../../redux/slices/projectsSlice";

const ProjectsPage = ({ currentUser, employeesData = [] }) => {
  const dispatch = useDispatch();
  const {
    projects: projectsFromRedux,
    selectedProject: selectedProjectFromRedux,
    loading: reduxLoading,
    error: reduxError
  } = useSelector((state) => state.projects);

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    client: '',
    priority: '',
    search: '',
    assignedTo: ''
  });

  // Form states
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    client: '',
    projectStatus: 'Planning',
    priority: 'Medium',
    startDate: '',
    endDate: '',
    budget: ''
  });

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    projectId: '',
    status: 'Pending',
    priority: 'Medium',
    assignedTo: [],
    startDate: '',
    dueDate: ''
  });

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs
  const contentRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Sample Employees Data (temporary, can be replaced with real API)
  const sampleEmployees = useMemo(() => employeesData.length > 0 ? employeesData : [
    { _id: 1, name: 'John Smith', role: 'Frontend Developer', department: 'Engineering', email: 'john@example.com', avatar: 'JS' },
    { _id: 2, name: 'Emily Johnson', role: 'UI/UX Designer', department: 'Design', email: 'emily@example.com', avatar: 'EJ' },
    { _id: 3, name: 'Michael Brown', role: 'Backend Developer', department: 'Engineering', email: 'michael@example.com', avatar: 'MB' },
    { _id: 4, name: 'Sarah Wilson', role: 'Project Manager', department: 'Management', email: 'sarah@example.com', avatar: 'SW' },
    { _id: 5, name: 'David Lee', role: 'QA Engineer', department: 'Quality', email: 'david@example.com', avatar: 'DL' },
    { _id: 6, name: 'Lisa Taylor', role: 'DevOps Engineer', department: 'Engineering', email: 'lisa@example.com', avatar: 'LT' },
    { _id: 7, name: 'Robert Chen', role: 'Full Stack Developer', department: 'Engineering', email: 'robert@example.com', avatar: 'RC' },
    { _id: 8, name: 'Emma Garcia', role: 'HR Manager', department: 'HR', email: 'emma@example.com', avatar: 'EG' }
  ], [employeesData]);

  // Load all projects from API
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Update local state when Redux data changes
  useEffect(() => {
    if (projectsFromRedux && projectsFromRedux.length > 0) {
      // Transform API data to match our component structure
      const transformedProjects = projectsFromRedux.map(project => ({
        id: project._id,
        title: project.name,
        description: project.description,
        client: project.client || 'N/A',
        status: project.projectStatus || 'Planning',
        priority: project.priority || 'Medium',
        startDate: project.startDate,
        endDate: project.endDate,
        progress: project.progress || 0,
        remainingDays: calculateRemainingDays(project.endDate),
        budget: project.budget ? `$${project.budget}` : '$0',
        teamMembers: project.members || [],
        createdBy: project.createdBy || 4,
        createdAt: project.createdAt,
        clientContact: project.clientContact || '',
        clientPhone: project.clientPhone || '',
        totalTasks: project.totalTasks || 0,
        completedTasks: project.completedTasks || 0,
        pendingTasks: project.pendingTasks || 0
      }));
      
      setProjects(transformedProjects);
      setFilteredProjects(transformedProjects);
      setLoading(false);
    } else {
      setLoading(reduxLoading);
    }
  }, [projectsFromRedux, reduxLoading]);

  // Update selected project when Redux data changes
  useEffect(() => {
    if (selectedProjectFromRedux) {
      setSelectedProject({
        id: selectedProjectFromRedux._id,
        title: selectedProjectFromRedux.name,
        description: selectedProjectFromRedux.description,
        client: selectedProjectFromRedux.client || 'N/A',
        status: selectedProjectFromRedux.projectStatus || 'Planning',
        priority: selectedProjectFromRedux.priority || 'Medium',
        startDate: selectedProjectFromRedux.startDate,
        endDate: selectedProjectFromRedux.endDate,
        progress: selectedProjectFromRedux.progress || 0,
        remainingDays: calculateRemainingDays(selectedProjectFromRedux.endDate),
        budget: selectedProjectFromRedux.budget ? `$${selectedProjectFromRedux.budget}` : '$0',
        teamMembers: selectedProjectFromRedux.members || [],
        createdBy: selectedProjectFromRedux.createdBy || 4,
        createdAt: selectedProjectFromRedux.createdAt,
        clientContact: selectedProjectFromRedux.clientContact || '',
        clientPhone: selectedProjectFromRedux.clientPhone || '',
        totalTasks: selectedProjectFromRedux.totalTasks || 0,
        completedTasks: selectedProjectFromRedux.completedTasks || 0,
        pendingTasks: selectedProjectFromRedux.pendingTasks || 0
      });
    }
  }, [selectedProjectFromRedux]);

  // Helper function to calculate remaining days
  const calculateRemainingDays = (endDate) => {
    if (!endDate) return 0;
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Apply filters
  useEffect(() => {
    let result = [...projects];
    
    if (filters.status) {
      result = result.filter(project => project.status === filters.status);
    }
    
    if (filters.client) {
      result = result.filter(project => 
        project.client.toLowerCase().includes(filters.client.toLowerCase())
      );
    }
    
    if (filters.priority) {
      result = result.filter(project => project.priority === filters.priority);
    }
    
    if (filters.assignedTo) {
      const employeeId = parseInt(filters.assignedTo);
      result = result.filter(project => 
        project.teamMembers.includes(employeeId)
      );
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.client.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredProjects(result);
  }, [filters, projects]);

  // Get employee by ID
  const getEmployeeById = useCallback((id) => {
    return sampleEmployees.find(emp => emp._id === id) || { name: 'Unknown', role: 'Unknown', avatar: '?' };
  }, [sampleEmployees]);

  // Get tasks by project (temporary - would come from tasks API)
  const getTasksByProject = useCallback((projectId) => {
    // In real app, fetch tasks from API based on projectId
    return [];
  }, []);

  // Get completed tasks by project
  const getCompletedTasksByProject = useCallback((projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project?.completedTasks || 0;
  }, [projects]);

  // Get pending tasks by project
  const getPendingTasksByProject = useCallback((projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project?.pendingTasks || 0;
  }, [projects]);

  // Get team members for project
  const getTeamMembers = useCallback((project) => {
    return project.teamMembers.map(empId => getEmployeeById(empId));
  }, [getEmployeeById]);

  // Get tasks assigned to employee (temporary)
  const getTasksByEmployee = useCallback((employeeId) => {
    return [];
  }, []);

  // Handle project form changes
  const handleProjectFormChange = useCallback((field, value) => {
    setProjectForm(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Handle task form changes
  const handleTaskFormChange = useCallback((field, value) => {
    setTaskForm(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Create new project using Redux
  const handleCreateProject = useCallback(async () => {
    if (!projectForm.name || !projectForm.client || !projectForm.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const projectData = {
      name: projectForm.name,
      description: projectForm.description,
      client: projectForm.client,
      projectStatus: projectForm.projectStatus,
      priority: projectForm.priority,
      startDate: projectForm.startDate || new Date().toISOString().split('T')[0],
      endDate: projectForm.endDate,
      budget: projectForm.budget || 0,
      members: []
    };

    try {
      await dispatch(createProject(projectData)).unwrap();
      
      setProjectForm({
        name: '',
        description: '',
        client: '',
        projectStatus: 'Planning',
        priority: 'Medium',
        startDate: '',
        endDate: '',
        budget: ''
      });
      setShowCreateForm(false);
      alert('Project created successfully!');
    } catch (error) {
      alert(`Failed to create project: ${error.message || 'Unknown error'}`);
    }
  }, [projectForm, dispatch]);

  // Create new task (temporary - would be from tasks API)
  const handleCreateTask = useCallback(() => {
    if (!taskForm.title || !taskForm.projectId || !taskForm.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    alert('Task creation would be implemented with tasks API');
    setTaskForm({
      title: '',
      description: '',
      projectId: '',
      status: 'Pending',
      priority: 'Medium',
      assignedTo: [],
      startDate: '',
      dueDate: ''
    });
    setShowTaskForm(false);
  }, [taskForm]);

  // Delete project using Redux
  const handleDeleteProject = useCallback((projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(projectId));
    }
  }, [dispatch]);

  // Delete task (temporary)
  const handleDeleteTask = useCallback((taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      alert('Task deletion would be implemented with tasks API');
    }
  }, []);

  // View project details using Redux
  const handleViewProject = useCallback((project) => {
    dispatch(fetchProjectById(project.id));
  }, [dispatch]);

  // Update task status (temporary)
  const handleUpdateTaskStatus = useCallback((taskId, newStatus) => {
    alert(`Task status update would be implemented with tasks API: ${newStatus}`);
  }, []);

  // Update project status using Redux
  const handleUpdateProjectStatus = useCallback((projectId, newStatus) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const updatedData = {
      ...project,
      projectStatus: newStatus
    };

    dispatch(updateProject({
      projectId,
      updatedData: {
        projectStatus: newStatus
      }
    }));
  }, [projects, dispatch]);

  // Add member to project using Redux
  const handleAddMemberToProject = useCallback((projectId, memberId) => {
    dispatch(addProjectMember({
      projectId,
      memberId
    }));
  }, [dispatch]);

  // Remove member from project using Redux
  const handleRemoveMemberFromProject = useCallback((projectId, memberId) => {
    dispatch(removeProjectMember({
      projectId,
      memberId
    }));
  }, [dispatch]);

  // Get status badge class
  const getStatusClass = (status) => {
    switch(status) {
      case 'In Progress': return 'status-in-progress';
      case 'Planning': return 'status-planning';
      case 'Completed': return 'status-completed';
      case 'On Hold': return 'status-on-hold';
      case 'Pending': return 'status-pending';
      case 'Delayed': return 'status-delayed';
      case 'Blocked': return 'status-blocked';
      case 'Waiting for Approval': return 'status-waiting';
      case 'Testing Phase': return 'status-testing';
      case 'Cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  // Get priority badge class
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  // Calculate stats
  const stats = useMemo(() => ({
    totalProjects: projects.length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    teamMembers: new Set(projects.flatMap(project => project.teamMembers)).size
  }), [projects]);

  // Get tasks summary by employee (temporary)
  const getEmployeeTaskSummary = useCallback(() => {
    const summary = {};
    
    sampleEmployees.forEach(employee => {
      summary[employee._id] = {
        name: employee.name,
        role: employee.role,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        progress: 0
      };
    });
    
    return summary;
  }, [sampleEmployees]);

  // Handle clear all filters
  const handleClearFilters = useCallback(() => {
    setFilters({
      status: '',
      client: '',
      priority: '',
      search: '',
      assignedTo: ''
    });
  }, []);

  // Render project detail modal
  const renderProjectDetailModal = () => {
    if (!selectedProject) return null;

    const projectTasks = getTasksByProject(selectedProject.id);
    const projectTeam = getTeamMembers(selectedProject);
    const employeeTaskSummary = getEmployeeTaskSummary();

    return (
      <div className="project-detail-overlay" onClick={() => setSelectedProject(null)}>
        <div className="project-detail-modal" onClick={(e) => e.stopPropagation()}>
          <div className="project-detail-header">
            <h2>{selectedProject.title}</h2>
            <button onClick={() => setSelectedProject(null)}>✕</button>
          </div>
          
          <div className="project-detail-content">
            <div className="project-info-section">
              <div className="info-row">
                <div className="info-item">
                  <label>Client</label>
                  <p>{selectedProject.client}</p>
                </div>
                <div className="info-item">
                  <label>Status</label>
                  <span className={`status-badge ${getStatusClass(selectedProject.status)}`}>
                    {selectedProject.status}
                  </span>
                </div>
                <div className="info-item">
                  <label>Priority</label>
                  <span className={`priority-badge ${getPriorityClass(selectedProject.priority)}`}>
                    {selectedProject.priority}
                  </span>
                </div>
                <div className="info-item">
                  <label>Progress</label>
                  <p>{selectedProject.progress}%</p>
                </div>
              </div>
              
              <div className="info-row">
                <div className="info-item">
                  <label>Start Date</label>
                  <p>{new Date(selectedProject.startDate).toLocaleDateString()}</p>
                </div>
                <div className="info-item">
                  <label>End Date</label>
                  <p>{new Date(selectedProject.endDate).toLocaleDateString()}</p>
                </div>
                <div className="info-item">
                  <label>Remaining Days</label>
                  <p>{selectedProject.remainingDays} days</p>
                </div>
                <div className="info-item">
                  <label>Budget</label>
                  <p>{selectedProject.budget}</p>
                </div>
              </div>
              
              <div className="info-item full-width">
                <label>Description</label>
                <p>{selectedProject.description}</p>
              </div>
            </div>

            {/* Team Section */}
            <div className="section">
              <h3>👥 Team Members</h3>
              <div className="team-grid">
                {projectTeam.map((member, index) => (
                  <div key={index} className="team-member">
                    <div className="member-avatar">{member.avatar}</div>
                    <div className="member-info">
                      <div className="member-name">{member.name}</div>
                      <div className="member-role">{member.role}</div>
                      <div className="member-dept">{member.department}</div>
                    </div>
                    <div className="member-actions">
                      <button 
                        className="btn-small btn-danger"
                        onClick={() => handleRemoveMemberFromProject(selectedProject.id, member._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add Member Form */}
              <div className="add-member-section">
                <h4>Add Team Member</h4>
                <select 
                  className="member-select"
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddMemberToProject(selectedProject.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                >
                  <option value="">Select member to add...</option>
                  {sampleEmployees
                    .filter(emp => !selectedProject.teamMembers.includes(emp._id))
                    .map(emp => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name} - {emp.role} ({emp.department})
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="section">
              <div className="section-header">
                <h3>📋 Tasks</h3>
                <button 
                  className="btn-small btn-primary"
                  onClick={() => {
                    setTaskForm(prev => ({ ...prev, projectId: selectedProject.id }));
                    setShowTaskForm(true);
                    setSelectedProject(null);
                  }}
                >
                  + Add Task
                </button>
              </div>
              
              <p className="no-data">Tasks would be loaded from tasks API</p>
            </div>

            {/* Task Summary */}
            <div className="section">
              <h3>📊 Task Summary</h3>
              <div className="task-summary-cards">
                <div className="summary-card">
                  <div className="summary-icon">📋</div>
                  <div className="summary-content">
                    <div className="summary-value">{selectedProject.totalTasks}</div>
                    <div className="summary-label">Total Tasks</div>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="summary-icon">✅</div>
                  <div className="summary-content">
                    <div className="summary-value">{selectedProject.completedTasks}</div>
                    <div className="summary-label">Completed</div>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="summary-icon">⏳</div>
                  <div className="summary-content">
                    <div className="summary-value">{selectedProject.pendingTasks}</div>
                    <div className="summary-label">Pending</div>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="summary-icon">📈</div>
                  <div className="summary-content">
                    <div className="summary-value">{selectedProject.progress}%</div>
                    <div className="summary-label">Completion</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="section">
              <h3>⚙️ Project Actions</h3>
              <div className="project-actions">
                <button 
                  className="btn-primary"
                  onClick={() => {
                    const newStatus = selectedProject.status === 'Completed' ? 'In Progress' : 'Completed';
                    handleUpdateProjectStatus(selectedProject.id, newStatus);
                  }}
                >
                  {selectedProject.status === 'Completed' ? 'Mark as In Progress' : 'Mark as Completed'}
                </button>
                <button 
                  className="btn-warning"
                  onClick={() => {
                    const newPriority = selectedProject.priority === ' high' ? 'Medium' : ' high';
                    dispatch(updateProject({
                      projectId: selectedProject.id,
                      updatedData: { priority: newPriority }
                    }));
                  }}
                >
                  Toggle Priority
                </button>
                <button 
                  className="btn-danger"
                  onClick={() => handleDeleteProject(selectedProject.id)}
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show error if any
  if (reduxError) {
    return (
      <div className="error-container">
        <h2>Error Loading Projects</h2>
        <p>{reduxError.message || reduxError}</p>
        <button onClick={() => dispatch(fetchProjects())}>Retry</button>
      </div>
    );
  }

  return (
    <div className="projects-container">
      {/* Projects Header */}
      <div className="projects-header">
        <div className="projects-header-content">
          <div className="projects-header-left">
            <div className="projects-header-icon">📋</div>
            <div className="projects-header-title">
              <h1>Projects Management</h1>
              <p>
                {isMobile ? (
                  <>
                    <span className="projects-count-badge">{projects.length} Projects</span>
                  </>
                ) : (
                  <>
                    Manage and track all projects • Total: 
                    <span className="projects-count-badge">{projects.length} Projects</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="projects-header-right">
            <button 
              className="btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              + New Project
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="projects-content" ref={contentRef}>
        <div className="projects-main-area">
          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalProjects}</div>
                <div className="stat-label">Total Projects</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <div className="stat-value">{stats.teamMembers}</div>
                <div className="stat-label">Team Members</div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="projects-filters-section">
            <div className="filters-title">
              <span>Filters & Search</span>
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
                <label>Status</label>
                <select 
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="filter-select"
                >
                  <option value="">All Status</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Priority</label>
                <select 
                  value={filters.priority}
                  onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                  className="filter-select"
                >
                  <option value="">All Priorities</option>
                  <option value=" high"> high</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Assigned To</label>
                <select 
                  value={filters.assignedTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, assignedTo: e.target.value }))}
                  className="filter-select"
                >
                  <option value="">All Team Members</option>
                  {sampleEmployees.map(emp => (
                    <option key={emp._id} value={emp._id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label>Search</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="Search projects..."
                  className="filter-input"
                />
              </div>
              
              <button 
                className="clear-filters-btn"
                onClick={handleClearFilters}
              >
                {isMobile ? 'Clear' : 'Clear Filters'}
              </button>
            </div>
          </div>

          {/* Projects Table */}
          {(loading || reduxLoading) ? (
            <div className="projects-loading-container">
              <div className="projects-loading-spinner"></div>
              <p className="projects-loading-text">Loading projects...</p>
            </div>
          ) : (
            <div className="projects-table-container">
              <div className="table-responsive-wrapper">
                <table className="projects-table">
                  <thead>
                    <tr>
                      <th>Project Title</th>
                      <th>Client</th>
                      <th>Tasks</th>
                      <th>Team</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Progress</th>
                      <th>Timeline</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => {
                      const completedTasks = getCompletedTasksByProject(project.id);
                      const pendingTasks = getPendingTasksByProject(project.id);
                      
                      return (
                        <tr key={project.id}>
                          <td>
                            <div className="project-title-cell">
                              <div className="project-title">{project.title}</div>
                              <div className="project-description">{project.description}</div>
                            </div>
                          </td>
                          <td>
                            <div className="client-name">{project.client}</div>
                            <div className="client-contact">{project.clientContact}</div>
                          </td>
                          <td>
                            <div className="tasks-cell">
                              <div className="tasks-summary">
                                <span className="completed-tasks">{completedTasks}✅</span>
                                <span className="pending-tasks">{pendingTasks}⏳</span>
                                <span className="total-tasks">/{project.totalTasks}</span>
                              </div>
                              <div className="tasks-progress">
                                <div className="project-progress-bar small">
                                  <div 
                                    className="project-progress-fill"
                                    style={{ 
                                      width: `${project.progress}%` 
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="team-cell">
                              <div className="team-avatars">
                                {getTeamMembers(project).slice(0, 3).map((member, index) => (
                                  <div key={index} className="team-avatar" title={member.name}>
                                    {member.avatar}
                                  </div>
                                ))}
                                {getTeamMembers(project).length > 3 && (
                                  <div className="team-more">+{getTeamMembers(project).length - 3}</div>
                                )}
                              </div>
                              <div className="team-count">{getTeamMembers(project).length} members</div>
                            </div>
                          </td>
                          <td>
                            <select 
                              value={project.status}
                              onChange={(e) => handleUpdateProjectStatus(project.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="Planning">Planning</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="On Hold">On Hold</option>
                            </select>
                          </td>
                          <td>
                            <span className={`priority-badge ${getPriorityClass(project.priority)}`}>
                              {project.priority}
                            </span>
                          </td>
                          <td>
                            <div className="progress-cell">
                              <div className="project-progress-bar">
                                <div 
                                  className="project-progress-fill"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <div className="progress-percentage">{project.progress}%</div>
                            </div>
                          </td>
                          <td>
                            <div className="timeline-cell">
                              <div className="dates">
                                {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                                {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                              <div className="remaining-days">
                                {project.remainingDays > 0 
                                  ? `${project.remainingDays}d left` 
                                  : 'Completed'}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="action-btn view-btn" 
                                title="View Details"
                                onClick={() => handleViewProject(project)}
                              >
                                👁️
                              </button>
                              <button 
                                className="action-btn edit-btn" 
                                title="Add Task"
                                onClick={() => {
                                  setTaskForm(prev => ({ ...prev, projectId: project.id }));
                                  setShowTaskForm(true);
                                }}
                              >
                                ➕
                              </button>
                              <button 
                                className="action-btn delete-btn" 
                                title="Delete Project"
                                onClick={() => handleDeleteProject(project.id)}
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
              
              {filteredProjects.length === 0 && (
                <div className="no-projects-message">
                  {projects.length === 0 ? (
                    "No projects found. Create your first project!"
                  ) : (
                    "No projects found. Try adjusting your filters."
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateForm && (
        <div className="create-project-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="create-project-modal" onClick={(e) => e.stopPropagation()}>
            <div className="create-project-header">
              <h2>Create New Project</h2>
              <button onClick={() => setShowCreateForm(false)}>✕</button>
            </div>
            <div className="create-project-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input 
                    type="text" 
                    placeholder="Enter project title"
                    value={projectForm.name}
                    onChange={(e) => handleProjectFormChange('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Client Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter client name"
                    value={projectForm.client}
                    onChange={(e) => handleProjectFormChange('client', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Enter project description"
                  rows="3"
                  value={projectForm.description}
                  onChange={(e) => handleProjectFormChange('description', e.target.value)}
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select 
                    value={projectForm.projectStatus}
                    onChange={(e) => handleProjectFormChange('projectStatus', e.target.value)}
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    value={projectForm.priority}
                    onChange={(e) => handleProjectFormChange('priority', e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value=" high"> high</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    value={projectForm.startDate}
                    onChange={(e) => handleProjectFormChange('startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>End Date *</label>
                  <input 
                    type="date" 
                    value={projectForm.endDate}
                    onChange={(e) => handleProjectFormChange('endDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Budget ($)</label>
                <input 
                  type="number" 
                  placeholder="Enter project budget"
                  value={projectForm.budget}
                  onChange={(e) => handleProjectFormChange('budget', e.target.value)}
                />
              </div>
              
              <div className="form-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="submit-btn"
                  onClick={handleCreateProject}
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showTaskForm && (
        <div className="create-project-overlay" onClick={() => setShowTaskForm(false)}>
          <div className="create-project-modal" onClick={(e) => e.stopPropagation()}>
            <div className="create-project-header">
              <h2>Create New Task</h2>
              <button onClick={() => setShowTaskForm(false)}>✕</button>
            </div>
            <div className="create-project-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Task Title *</label>
                  <input 
                    type="text" 
                    placeholder="Enter task title"
                    value={taskForm.title}
                    onChange={(e) => handleTaskFormChange('title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Project *</label>
                  <select 
                    value={taskForm.projectId}
                    onChange={(e) => handleTaskFormChange('projectId', e.target.value)}
                  >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Enter task description"
                  rows="3"
                  value={taskForm.description}
                  onChange={(e) => handleTaskFormChange('description', e.target.value)}
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Status *</label>
                  <select 
                    value={taskForm.status}
                    onChange={(e) => handleTaskFormChange('status', e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    value={taskForm.priority}
                    onChange={(e) => handleTaskFormChange('priority', e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value=" high"> high</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    value={taskForm.startDate}
                    onChange={(e) => handleTaskFormChange('startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Due Date *</label>
                  <input 
                    type="date" 
                    value={taskForm.dueDate}
                    onChange={(e) => handleTaskFormChange('dueDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowTaskForm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="submit-btn"
                  onClick={handleCreateTask}
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {renderProjectDetailModal()}
 

      <style>{`
        /* NEW SIMPLE CONTAINER - NO FIXED POSITIONING */
        .projects-container {
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          position: relative;
          z-index: 1;
        }

        /* Projects Header - NO FIXED POSITION */
        .projects-header {
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(26, 26, 46, 0.9) 100%);
          padding: 20px 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .projects-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .projects-header-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .projects-header-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }

        .projects-header-title h1 {
          margin: 0 0 5px 0;
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(90deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .projects-header-title p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        .projects-count-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 10px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 12px;
          margin: 0 8px;
        }

        .projects-header-right {
          display: flex;
          gap: 12px;
        }

        /* Content Area - NORMAL SCROLLING */
        .projects-content {
          padding: 20px 30px;
          overflow-y: auto;
          min-height: calc(100vh - 120px);
        }

        .projects-main-area {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Quick Stats */
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .stat-icon {
          font-size: 24px;
          width: 50px;
          height: 50px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Filters Section */
        .projects-filters-section {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          padding: 25px;
          margin-bottom: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .filters-title {
          color: white;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filters-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr) auto;
          gap: 20px;
          align-items: end;
        }

        @media (max-width: 1200px) {
          .filters-row {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .filter-group:nth-child(4),
          .filter-group:nth-child(5) {
            grid-column: span 1;
          }
          
          .clear-filters-btn {
            grid-column: span 3;
          }
        }

        @media (max-width: 768px) {
          .filters-row {
            grid-template-columns: 1fr;
          }
          
          .clear-filters-btn {
            grid-column: span 1;
          }
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-group label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-weight: 600;
        }

        .filter-select,
        .filter-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 12px 16px;
          color: white;
          font-size: 14px;
          transition: all 0.3s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .filter-select:focus,
        .filter-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .clear-filters-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          min-width: 120px;
        }

        .clear-filters-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        /* Table Styles */
        .projects-table-container {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow-x: auto;
          margin-bottom: 30px;
        }

        .projects-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          min-width: 1200px;
        }

        .projects-table th {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          font-weight: 700;
          text-align: left;
          padding: 18px 16px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .projects-table td {
          padding: 20px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .projects-table tbody tr:hover td {
          background: rgba(255, 255, 255, 0.03);
        }

        /* Loading State */
        .projects-loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
        }

        .projects-loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 25px;
        }

        .projects-loading-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
          font-weight: 600;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .projects-header {
            padding: 15px 20px;
          }
          
          .projects-header-content {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
          
          .projects-header-left {
            flex-direction: column;
            text-align: center;
          }
          
          .projects-header-right {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .projects-content {
            padding: 15px 20px;
          }
          
          .quick-stats {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .projects-header {
            padding: 12px 15px;
          }
          
          .projects-header-title h1 {
            font-size: 20px;
          }
          
          .projects-header-title p {
            font-size: 12px;
          }
          
          .projects-content {
            padding: 10px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(ProjectsPage);