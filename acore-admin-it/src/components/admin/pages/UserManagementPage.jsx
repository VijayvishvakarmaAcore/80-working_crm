// import React, { useState } from 'react';
// import './UserManagementPage.css';

// // Dummy data for all user types
// const DUMMY_USERS = {
//   hr: [
//     { 
//       id: 'HR001', 
//       name: 'Sarah Johnson', 
//       email: 'sarah.hr@acore.com', 
//       phone: '9876543210', 
//       department: 'Human Resources', 
//       role: 'HR Manager',
//       status: 'Active', 
//       joinDate: '2022-03-15',
//       permissions: ['View All', 'Edit Employee', 'Manage Leave']
//     },
//     { 
//       id: 'HR002', 
//       name: 'Michael Chen', 
//       email: 'michael.hr@acore.com', 
//       phone: '9876543211', 
//       department: 'Human Resources', 
//       role: 'HR Executive',
//       status: 'Active', 
//       joinDate: '2023-01-10',
//       permissions: ['View All', 'Manage Attendance']
//     },
//   ],
//   managers: [
//     { 
//       id: 'MGR001', 
//       name: 'Robert Williams', 
//       email: 'robert.mgr@acore.com', 
//       phone: '9876543220', 
//       department: 'Engineering', 
//       role: 'Project Manager',
//       status: 'Active', 
//       joinDate: '2021-08-20',
//       teamSize: 8,
//       projects: 3
//     },
//     { 
//       id: 'MGR002', 
//       name: 'Lisa Anderson', 
//       email: 'lisa.mgr@acore.com', 
//       phone: '9876543221', 
//       department: 'Design', 
//       role: 'Design Lead',
//       status: 'Active', 
//       joinDate: '2022-11-05',
//       teamSize: 5,
//       projects: 2
//     },
//   ],
//   employees: [
//     { 
//       id: 'EMP001', 
//       name: 'John Doe', 
//       email: 'john@acore.com', 
//       phone: '9876543230', 
//       department: 'Engineering', 
//       role: 'Software Developer',
//       status: 'Active', 
//       joinDate: '2023-01-15',
//       manager: 'Robert Williams',
//       todayHours: 8,
//       weekHours: 40
//     },
//     { 
//       id: 'EMP002', 
//       name: 'Jane Smith', 
//       email: 'jane@acore.com', 
//       phone: '9876543231', 
//       department: 'Design', 
//       role: 'UI/UX Designer',
//       status: 'Active', 
//       joinDate: '2023-02-20',
//       manager: 'Lisa Anderson',
//       todayHours: 7.5,
//       weekHours: 35
//     },
//     { 
//       id: 'EMP003', 
//       name: 'Alex Turner', 
//       email: 'alex@acore.com', 
//       phone: '9876543232', 
//       department: 'Quality', 
//       role: 'QA Engineer',
//       status: 'Inactive', 
//       joinDate: '2023-03-10',
//       manager: 'Robert Williams',
//       todayHours: 0,
//       weekHours: 0
//     },
//   ],
//   clients: [
//     { 
//       id: 'CLT001', 
//       name: 'TechCorp Solutions', 
//       email: 'contact@techcorp.com', 
//       phone: '9123456789', 
//       company: 'TechCorp Solutions Inc.',
//       status: 'Active', 
//       joinDate: '2022-05-15',
//       projects: 2,
//       contactPerson: 'David Wilson'
//     },
//     { 
//       id: 'CLT002', 
//       name: 'Global Enterprises', 
//       email: 'info@globalent.com', 
//       phone: '9123456790', 
//       company: 'Global Enterprises Ltd.',
//       status: 'Active', 
//       joinDate: '2023-02-28',
//       projects: 1,
//       contactPerson: 'Emma Brown'
//     },
//   ]
// };

// // Role options for changing user roles
// const ROLE_OPTIONS = [
//   'Admin',
//   'HR Manager',
//   'HR Executive',
//   'Project Manager',
//   'Team Lead',
//   'Software Developer',
//   'UI/UX Designer',
//   'QA Engineer',
//   'System Admin',
//   'Client'
// ];

// const UserManagementPage = () => {
//   const [activeTab, setActiveTab] = useState('hr');
//   const [users, setUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newUser, setNewUser] = useState({
//     type: 'employee',
//     name: '',
//     email: '',
//     phone: '',
//     department: '',
//     role: 'Software Developer',
//     status: 'Active'
//   });

//   // Stats for each section
//   const stats = {
//     hr: {
//       total: users.hr.length,
//       active: users.hr.filter(u => u.status === 'Active').length,
//       departments: [...new Set(users.hr.map(u => u.department))]
//     },
//     managers: {
//       total: users.managers.length,
//       active: users.managers.filter(u => u.status === 'Active').length,
//       totalTeams: users.managers.reduce((sum, mgr) => sum + (mgr.teamSize || 0), 0),
//       totalProjects: users.managers.reduce((sum, mgr) => sum + (mgr.projects || 0), 0)
//     },
//     employees: {
//       total: users.employees.length,
//       active: users.employees.filter(u => u.status === 'Active').length,
//       departments: [...new Set(users.employees.map(u => u.department))],
//       avgHours: (users.employees.reduce((sum, emp) => sum + (emp.weekHours || 0), 0) / users.employees.length).toFixed(1)
//     },
//     clients: {
//       total: users.clients.length,
//       active: users.clients.filter(u => u.status === 'Active').length,
//       totalProjects: users.clients.reduce((sum, client) => sum + (client.projects || 0), 0)
//     }
//   };

//   // Filter users based on search term
//   const filteredUsers = users[activeTab].filter(user => 
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle user deletion
//   const handleDeleteUser = (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       setUsers(prev => ({
//         ...prev,
//         [activeTab]: prev[activeTab].filter(user => user.id !== userId)
//       }));
//     }
//   };

//   // Handle role change
//   const handleRoleChange = (userId, newRole) => {
//     // First remove from current tab
//     const updatedUsers = { ...users };
//     const userIndex = updatedUsers[activeTab].findIndex(u => u.id === userId);
    
//     if (userIndex > -1) {
//       const user = updatedUsers[activeTab][userIndex];
//       user.role = newRole;
      
//       // Move to appropriate tab if role type changes
//       const newTab = getTabFromRole(newRole);
//       if (newTab !== activeTab) {
//         updatedUsers[activeTab].splice(userIndex, 1);
//         updatedUsers[newTab].push(user);
//       }
      
//       setUsers(updatedUsers);
//     }
//   };

//   // Get tab from role
//   const getTabFromRole = (role) => {
//     if (role.includes('HR')) return 'hr';
//     if (role.includes('Manager') || role.includes('Lead')) return 'managers';
//     if (role === 'Client') return 'clients';
//     return 'employees';
//   };

//   // Handle edit user
//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     setShowEditModal(true);
//   };

//   // Handle save edited user
//   const handleSaveEdit = () => {
//     if (selectedUser) {
//       setUsers(prev => ({
//         ...prev,
//         [activeTab]: prev[activeTab].map(u => 
//           u.id === selectedUser.id ? selectedUser : u
//         )
//       }));
//       setShowEditModal(false);
//       setSelectedUser(null);
//     }
//   };

//   // Handle add new user
//   const handleAddUser = () => {
//     const newUserObj = {
//       id: `${newUser.type.toUpperCase().substring(0, 2)}${(users[newUser.type].length + 1).toString().padStart(3, '0')}`,
//       ...newUser,
//       joinDate: new Date().toISOString().split('T')[0]
//     };

//     setUsers(prev => ({
//       ...prev,
//       [newUser.type]: [...prev[newUser.type], newUserObj]
//     }));

//     setShowAddModal(false);
//     setNewUser({
//       type: 'employee',
//       name: '',
//       email: '',
//       phone: '',
//       department: '',
//       role: 'Software Developer',
//       status: 'Active'
//     });
//   };

//   return (
//     <div className="user-management-page">
//       {/* Header */}
//       <div className="user-management-header">
//         <div>
//           <h2 className="page-title">👥 User Management</h2>
//           <p className="page-subtitle">Manage all HR, Managers, Employees, and Clients</p>
//         </div>
//         <button 
//           className="add-user-btn"
//           onClick={() => setShowAddModal(true)}
//         >
//           <span>+</span> Add New User
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="user-stats-cards">
//         <div 
//           className={`stat-card ${activeTab === 'hr' ? 'active' : ''}`}
//           onClick={() => setActiveTab('hr')}
//         >
//           <div className="stat-icon">👔</div>
//           <div className="stat-content">
//             <h3>HR Team</h3>
//             <p className="stat-number">{stats.hr.total} Members</p>
//             <div className="stat-details">
//               <span className="stat-badge active-badge">{stats.hr.active} Active</span>
//               <span className="stat-badge">{stats.hr.departments.length} Departments</span>
//             </div>
//           </div>
//         </div>

//         <div 
//           className={`stat-card ${activeTab === 'managers' ? 'active' : ''}`}
//           onClick={() => setActiveTab('managers')}
//         >
//           <div className="stat-icon">👨‍💼</div>
//           <div className="stat-content">
//             <h3>Managers</h3>
//             <p className="stat-number">{stats.managers.total} Managers</p>
//             <div className="stat-details">
//               <span className="stat-badge active-badge">{stats.managers.active} Active</span>
//               <span className="stat-badge">{stats.managers.totalTeams} Team Members</span>
//               <span className="stat-badge">{stats.managers.totalProjects} Projects</span>
//             </div>
//           </div>
//         </div>

//         <div 
//           className={`stat-card ${activeTab === 'employees' ? 'active' : ''}`}
//           onClick={() => setActiveTab('employees')}
//         >
//           <div className="stat-icon">👨‍💻</div>
//           <div className="stat-content">
//             <h3>Employees</h3>
//             <p className="stat-number">{stats.employees.total} Employees</p>
//             <div className="stat-details">
//               <span className="stat-badge active-badge">{stats.employees.active} Active</span>
//               <span className="stat-badge">{stats.employees.departments.length} Departments</span>
//               <span className="stat-badge">{stats.employees.avgHours} Avg Hrs/Week</span>
//             </div>
//           </div>
//         </div>

//         <div 
//           className={`stat-card ${activeTab === 'clients' ? 'active' : ''}`}
//           onClick={() => setActiveTab('clients')}
//         >
//           <div className="stat-icon">🤝</div>
//           <div className="stat-content">
//             <h3>Clients</h3>
//             <p className="stat-number">{stats.clients.total} Clients</p>
//             <div className="stat-details">
//               <span className="stat-badge active-badge">{stats.clients.active} Active</span>
//               <span className="stat-badge">{stats.clients.totalProjects} Projects</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Controls */}
//       <div className="user-controls">
//         <div className="search-box">
//           <span className="search-icon">🔍</span>
//           <input
//             type="text"
//             placeholder={`Search ${activeTab}...`}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           {searchTerm && (
//             <button 
//               className="clear-search"
//               onClick={() => setSearchTerm('')}
//             >
//               ✕
//             </button>
//           )}
//         </div>
        
//         <div className="tab-indicator">
//           <span className="active-tab-label">
//             {activeTab === 'hr' ? 'Human Resources' :
//              activeTab === 'managers' ? 'Managers' :
//              activeTab === 'employees' ? 'Employees' : 'Clients'}
//           </span>
//           <span className="tab-count">{filteredUsers.length} users</span>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="users-table-container">
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>{activeTab === 'clients' ? 'Company' : 'Department'}</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map(user => (
//               <tr key={user.id}>
//                 <td>
//                   <span className="user-id-badge">{user.id}</span>
//                 </td>
//                 <td>
//                   <div className="user-info-cell">
//                     <div className="user-avatar">
//                       {user.name[0]}
//                     </div>
//                     <div>
//                       <div className="user-name">{user.name}</div>
//                       {user.manager && (
//                         <div className="user-manager">Reports to: {user.manager}</div>
//                       )}
//                       {user.contactPerson && (
//                         <div className="user-contact">Contact: {user.contactPerson}</div>
//                       )}
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="user-email">{user.email}</div>
//                 </td>
//                 <td>{user.phone}</td>
//                 <td>
//                   {activeTab === 'clients' ? (
//                     <div className="company-info">{user.company}</div>
//                   ) : (
//                     <span className="dept-badge">{user.department}</span>
//                   )}
//                 </td>
//                 <td>
//                   <select
//                     className="role-select"
//                     value={user.role}
//                     onChange={(e) => handleRoleChange(user.id, e.target.value)}
//                   >
//                     {ROLE_OPTIONS.map(role => (
//                       <option key={role} value={role}>{role}</option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <span className={`status-badge ${user.status.toLowerCase()}`}>
//                     {user.status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="action-buttons">
//                     <button 
//                       className="action-btn edit-btn"
//                       onClick={() => handleEditUser(user)}
//                       title="Edit User"
//                     >
//                       ✏️
//                     </button>
//                     <button 
//                       className="action-btn delete-btn"
//                       onClick={() => handleDeleteUser(user.id)}
//                       title="Delete User"
//                     >
//                       🗑️
//                     </button>
//                     <button 
//                       className="action-btn view-btn"
//                       title="View Details"
//                       onClick={() => {/* Add view details functionality */}}
//                     >
//                       👁️
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//         {filteredUsers.length === 0 && (
//           <div className="no-users-found">
//             <div className="empty-state-icon">👤</div>
//             <h3>No users found</h3>
//             <p>Try adjusting your search criteria</p>
//           </div>
//         )}
//       </div>

//       {/* Edit User Modal */}
//       {showEditModal && selectedUser && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3>Edit User</h3>
//               <button 
//                 className="close-modal"
//                 onClick={() => {
//                   setShowEditModal(false);
//                   setSelectedUser(null);
//                 }}
//               >
//                 ×
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="form-group">
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   value={selectedUser.name}
//                   onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
//                   className="form-input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={selectedUser.email}
//                   onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
//                   className="form-input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone</label>
//                 <input
//                   type="tel"
//                   value={selectedUser.phone}
//                   onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
//                   className="form-input"
//                 />
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Department</label>
//                   <input
//                     type="text"
//                     value={selectedUser.department}
//                     onChange={(e) => setSelectedUser({...selectedUser, department: e.target.value})}
//                     className="form-input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Status</label>
//                   <select
//                     value={selectedUser.status}
//                     onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
//                     className="form-input"
//                   >
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                     <option value="On Leave">On Leave</option>
//                   </select>
//                 </div>
//               </div>
//               {selectedUser.permissions && (
//                 <div className="form-group">
//                   <label>Permissions</label>
//                   <div className="permissions-list">
//                     {selectedUser.permissions.map((perm, index) => (
//                       <span key={index} className="permission-tag">{perm}</span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button 
//                 className="btn-cancel"
//                 onClick={() => {
//                   setShowEditModal(false);
//                   setSelectedUser(null);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="btn-save"
//                 onClick={handleSaveEdit}
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add User Modal */}
//       {showAddModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3>Add New User</h3>
//               <button 
//                 className="close-modal"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 ×
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="form-group">
//                 <label>User Type</label>
//                 <select
//                   value={newUser.type}
//                   onChange={(e) => setNewUser({...newUser, type: e.target.value})}
//                   className="form-input"
//                 >
//                   <option value="hr">HR</option>
//                   <option value="managers">Manager</option>
//                   <option value="employees">Employee</option>
//                   <option value="clients">Client</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   value={newUser.name}
//                   onChange={(e) => setNewUser({...newUser, name: e.target.value})}
//                   className="form-input"
//                   placeholder="Enter full name"
//                 />
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     value={newUser.email}
//                     onChange={(e) => setNewUser({...newUser, email: e.target.value})}
//                     className="form-input"
//                     placeholder="Enter email"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Phone</label>
//                   <input
//                     type="tel"
//                     value={newUser.phone}
//                     onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
//                     className="form-input"
//                     placeholder="Enter phone"
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Department</label>
//                   <input
//                     type="text"
//                     value={newUser.department}
//                     onChange={(e) => setNewUser({...newUser, department: e.target.value})}
//                     className="form-input"
//                     placeholder="Enter department"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Role</label>
//                   <select
//                     value={newUser.role}
//                     onChange={(e) => setNewUser({...newUser, role: e.target.value})}
//                     className="form-input"
//                   >
//                     {ROLE_OPTIONS.map(role => (
//                       <option key={role} value={role}>{role}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Status</label>
//                 <select
//                   value={newUser.status}
//                   onChange={(e) => setNewUser({...newUser, status: e.target.value})}
//                   className="form-input"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                   <option value="Pending">Pending</option>
//                 </select>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button 
//                 className="btn-cancel"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="btn-save"
//                 onClick={handleAddUser}
//               >
//                 Add User
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagementPage;








import React, { useState } from 'react';
import './UserManagementPage.css';

// Dummy data for all user types
const DUMMY_USERS = {
  hr: [
    { 
      id: 'HR001', 
      name: 'Sarah Johnson', 
      email: 'sarah.hr@acore.com', 
      phone: '9876543210', 
      department: 'Human Resources', 
      role: 'HR Manager',
      status: 'Active', 
      joinDate: '2022-03-15',
      permissions: ['View All', 'Edit Employee', 'Manage Leave', 'Approve Requests'],
      address: '123 HR Street, New York',
      birthday: '1990-05-15',
      emergencyContact: '9876543222',
      lastLogin: '2024-01-15 09:30 AM',
      totalLeaves: 12,
      leavesTaken: 3,
      avatarColor: '#3b82f6'
    },
    { 
      id: 'HR002', 
      name: 'Michael Chen', 
      email: 'michael.hr@acore.com', 
      phone: '9876543211', 
      department: 'Human Resources', 
      role: 'HR Executive',
      status: 'Active', 
      joinDate: '2023-01-10',
      permissions: ['View All', 'Manage Attendance', 'Track Time'],
      address: '456 HR Avenue, California',
      birthday: '1992-08-22',
      emergencyContact: '9876543223',
      lastLogin: '2024-01-15 10:15 AM',
      totalLeaves: 12,
      leavesTaken: 5,
      avatarColor: '#10b981'
    },
  ],
  managers: [
    { 
      id: 'MGR001', 
      name: 'Robert Williams', 
      email: 'robert.mgr@acore.com', 
      phone: '9876543220', 
      department: 'Engineering', 
      role: 'Project Manager',
      status: 'Active', 
      joinDate: '2021-08-20',
      teamSize: 8,
      projects: 3,
      teamMembers: ['John Doe', 'Alex Turner', 'Emma Wilson', 'David Lee'],
      currentProject: 'E-Commerce Platform',
      address: '789 Manager Road, Texas',
      birthday: '1988-11-30',
      emergencyContact: '9876543224',
      lastLogin: '2024-01-15 08:45 AM',
      totalLeaves: 15,
      leavesTaken: 7,
      avatarColor: '#8b5cf6'
    },
    { 
      id: 'MGR002', 
      name: 'Lisa Anderson', 
      email: 'lisa.mgr@acore.com', 
      phone: '9876543221', 
      department: 'Design', 
      role: 'Design Lead',
      status: 'Active', 
      joinDate: '2022-11-05',
      teamSize: 5,
      projects: 2,
      teamMembers: ['Jane Smith', 'Sarah Miller'],
      currentProject: 'Mobile App Redesign',
      address: '321 Design Street, California',
      birthday: '1991-03-18',
      emergencyContact: '9876543225',
      lastLogin: '2024-01-15 09:00 AM',
      totalLeaves: 12,
      leavesTaken: 4,
      avatarColor: '#ec4899'
    },
  ],
  employees: [
    { 
      id: 'EMP001', 
      name: 'John Doe', 
      email: 'john@acore.com', 
      phone: '9876543230', 
      department: 'Engineering', 
      role: 'Software Developer',
      status: 'Active', 
      joinDate: '2023-01-15',
      manager: 'Robert Williams',
      todayHours: 8,
      weekHours: 40,
      monthHours: 160,
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      projects: ['E-Commerce Platform', 'Admin Dashboard'],
      address: '123 Tech Street, New York',
      birthday: '1995-07-10',
      emergencyContact: '9876543226',
      lastLogin: '2024-01-15 09:15 AM',
      totalLeaves: 12,
      leavesTaken: 2,
      avatarColor: '#f59e0b'
    },
    { 
      id: 'EMP002', 
      name: 'Jane Smith', 
      email: 'jane@acore.com', 
      phone: '9876543231', 
      department: 'Design', 
      role: 'UI/UX Designer',
      status: 'Active', 
      joinDate: '2023-02-20',
      manager: 'Lisa Anderson',
      todayHours: 7.5,
      weekHours: 35,
      monthHours: 140,
      skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
      projects: ['Mobile App Redesign'],
      address: '456 Design Avenue, California',
      birthday: '1993-12-05',
      emergencyContact: '9876543227',
      lastLogin: '2024-01-15 09:20 AM',
      totalLeaves: 12,
      leavesTaken: 3,
      avatarColor: '#06b6d4'
    },
  ],
  clients: [
    { 
      id: 'CLT001', 
      name: 'TechCorp Solutions', 
      email: 'contact@techcorp.com', 
      phone: '9123456789', 
      company: 'TechCorp Solutions Inc.',
      status: 'Active', 
      joinDate: '2022-05-15',
      projects: 2,
      contactPerson: 'David Wilson',
      companySize: '500-1000',
      industry: 'Technology',
      address: '789 Corporate Blvd, New York',
      website: 'www.techcorp.com',
      contractValue: '$50,000',
      contractEndDate: '2024-12-31',
      projectsList: ['CRM System', 'Mobile App'],
      avatarColor: '#ef4444'
    },
    { 
      id: 'CLT002', 
      name: 'Global Enterprises', 
      email: 'info@globalent.com', 
      phone: '9123456790', 
      company: 'Global Enterprises Ltd.',
      status: 'Active', 
      joinDate: '2023-02-28',
      projects: 1,
      contactPerson: 'Emma Brown',
      companySize: '1000+',
      industry: 'Finance',
      address: '321 Finance Street, London',
      website: 'www.globalent.com',
      contractValue: '$30,000',
      contractEndDate: '2024-06-30',
      projectsList: ['Banking Portal'],
      avatarColor: '#84cc16'
    },
  ]
};

// Role options for changing user roles
const ROLE_OPTIONS = [
  'Admin',
  'HR Manager',
  'HR Executive',
  'Project Manager',
  'Team Lead',
  'Software Developer',
  'UI/UX Designer',
  'QA Engineer',
  'System Admin',
  'Client'
];

const UserManagementPage = () => {
  const [activeTab, setActiveTab] = useState('hr');
  const [users, setUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [newUser, setNewUser] = useState({
    type: 'employee',
    name: '',
    email: '',
    phone: '',
    department: '',
    role: 'Software Developer',
    status: 'Active'
  });

  // Stats for each section
  const stats = {
    hr: {
      total: users.hr.length,
      active: users.hr.filter(u => u.status === 'Active').length,
      departments: [...new Set(users.hr.map(u => u.department))]
    },
    managers: {
      total: users.managers.length,
      active: users.managers.filter(u => u.status === 'Active').length,
      totalTeams: users.managers.reduce((sum, mgr) => sum + (mgr.teamSize || 0), 0),
      totalProjects: users.managers.reduce((sum, mgr) => sum + (mgr.projects || 0), 0)
    },
    employees: {
      total: users.employees.length,
      active: users.employees.filter(u => u.status === 'Active').length,
      departments: [...new Set(users.employees.map(u => u.department))],
      avgHours: (users.employees.reduce((sum, emp) => sum + (emp.weekHours || 0), 0) / users.employees.length).toFixed(1)
    },
    clients: {
      total: users.clients.length,
      active: users.clients.filter(u => u.status === 'Active').length,
      totalProjects: users.clients.reduce((sum, client) => sum + (client.projects || 0), 0)
    }
  };

  // Filter users based on search term
  const filteredUsers = users[activeTab].filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle user deletion
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(user => user.id !== userId)
      }));
    }
  };

  // Handle role change
  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = { ...users };
    const userIndex = updatedUsers[activeTab].findIndex(u => u.id === userId);
    
    if (userIndex > -1) {
      const user = updatedUsers[activeTab][userIndex];
      user.role = newRole;
      
      const newTab = getTabFromRole(newRole);
      if (newTab !== activeTab) {
        updatedUsers[activeTab].splice(userIndex, 1);
        updatedUsers[newTab].push(user);
      }
      
      setUsers(updatedUsers);
    }
  };

  // Get tab from role
  const getTabFromRole = (role) => {
    if (role.includes('HR')) return 'hr';
    if (role.includes('Manager') || role.includes('Lead')) return 'managers';
    if (role === 'Client') return 'clients';
    return 'employees';
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // Handle view user
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  // Handle save edited user
  const handleSaveEdit = () => {
    if (selectedUser) {
      setUsers(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(u => 
          u.id === selectedUser.id ? selectedUser : u
        )
      }));
      setShowEditModal(false);
      setSelectedUser(null);
    }
  };

  // Handle add new user
  const handleAddUser = () => {
    const newUserObj = {
      id: `${newUser.type.toUpperCase().substring(0, 2)}${(users[newUser.type].length + 1).toString().padStart(3, '0')}`,
      ...newUser,
      joinDate: new Date().toISOString().split('T')[0],
      avatarColor: getRandomColor()
    };

    setUsers(prev => ({
      ...prev,
      [newUser.type]: [...prev[newUser.type], newUserObj]
    }));

    setShowAddModal(false);
    setNewUser({
      type: 'employee',
      name: '',
      email: '',
      phone: '',
      department: '',
      role: 'Software Developer',
      status: 'Active'
    });
  };

  // Get random color for avatar
  const getRandomColor = () => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate leaves remaining
  const calculateLeavesRemaining = (user) => {
    return (user.totalLeaves || 12) - (user.leavesTaken || 0);
  };

  return (
    <div className="user-management-page">
      {/* Header */}
      <div className="user-management-header">
        <div>
          <h2 className="page-title">👥 User Management</h2>
          <p className="page-subtitle">Manage all HR, Managers, Employees, and Clients</p>
        </div>
        <button 
          className="add-user-btn"
          onClick={() => setShowAddModal(true)}
        >
          <span>+</span> Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="user-stats-cards">
        <div 
          className={`stat-card ${activeTab === 'hr' ? 'active' : ''}`}
          onClick={() => setActiveTab('hr')}
        >
          <div className="stat-icon">👔</div>
          <div className="stat-content">
            <h3>HR Team</h3>
            <p className="stat-number">{stats.hr.total} Members</p>
            <div className="stat-details">
              <span className="stat-badge active-badge">{stats.hr.active} Active</span>
              <span className="stat-badge">{stats.hr.departments.length} Departments</span>
            </div>
          </div>
        </div>

        <div 
          className={`stat-card ${activeTab === 'managers' ? 'active' : ''}`}
          onClick={() => setActiveTab('managers')}
        >
          <div className="stat-icon">👨‍💼</div>
          <div className="stat-content">
            <h3>Managers</h3>
            <p className="stat-number">{stats.managers.total} Managers</p>
            <div className="stat-details">
              <span className="stat-badge active-badge">{stats.managers.active} Active</span>
              <span className="stat-badge">{stats.managers.totalTeams} Team Members</span>
              <span className="stat-badge">{stats.managers.totalProjects} Projects</span>
            </div>
          </div>
        </div>

        <div 
          className={`stat-card ${activeTab === 'employees' ? 'active' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          <div className="stat-icon">👨‍💻</div>
          <div className="stat-content">
            <h3>Employees</h3>
            <p className="stat-number">{stats.employees.total} Employees</p>
            <div className="stat-details">
              <span className="stat-badge active-badge">{stats.employees.active} Active</span>
              <span className="stat-badge">{stats.employees.departments.length} Departments</span>
              <span className="stat-badge">{stats.employees.avgHours} Avg Hrs/Week</span>
            </div>
          </div>
        </div>

        <div 
          className={`stat-card ${activeTab === 'clients' ? 'active' : ''}`}
          onClick={() => setActiveTab('clients')}
        >
          <div className="stat-icon">🤝</div>
          <div className="stat-content">
            <h3>Clients</h3>
            <p className="stat-number">{stats.clients.total} Clients</p>
            <div className="stat-details">
              <span className="stat-badge active-badge">{stats.clients.active} Active</span>
              <span className="stat-badge">{stats.clients.totalProjects} Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="user-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="tab-indicator">
          <span className="active-tab-label">
            {activeTab === 'hr' ? 'Human Resources' :
             activeTab === 'managers' ? 'Managers' :
             activeTab === 'employees' ? 'Employees' : 'Clients'}
          </span>
          <span className="tab-count">{filteredUsers.length} users</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>{activeTab === 'clients' ? 'Company' : 'Department'}</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <span className="user-id-badge">{user.id}</span>
                </td>
                <td>
                  <div className="user-info-cell">
                    <div 
                      className="user-avatar"
                      style={{ background: user.avatarColor }}
                    >
                      {user.name[0]}
                    </div>
                    <div>
                      <div className="user-name">{user.name}</div>
                      {user.manager && (
                        <div className="user-manager">Reports to: {user.manager}</div>
                      )}
                      {user.contactPerson && (
                        <div className="user-contact">Contact: {user.contactPerson}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="user-email">{user.email}</div>
                </td>
                <td>{user.phone}</td>
                <td>
                  {activeTab === 'clients' ? (
                    <div className="company-info">{user.company}</div>
                  ) : (
                    <span className="dept-badge">{user.department}</span>
                  )}
                </td>
                <td>
                  <select
                    className="role-select"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {ROLE_OPTIONS.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view-btn"
                      onClick={() => handleViewUser(user)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEditUser(user)}
                      title="Edit User"
                    >
                      ✏️
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete User"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div className="no-users-found">
            <div className="empty-state-icon">👤</div>
            <h3>No users found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content view-user-modal">
            <div className="modal-header">
              <h3>User Details</h3>
              <button 
                className="close-modal"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedUser(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-profile-header">
                <div 
                  className="profile-avatar-large"
                  style={{ background: selectedUser.avatarColor }}
                >
                  {selectedUser.name[0]}
                </div>
                <div className="profile-info">
                  <h2>{selectedUser.name}</h2>
                  <div className="profile-meta">
                    <span className="profile-role">{selectedUser.role}</span>
                    <span className={`profile-status ${selectedUser.status.toLowerCase()}`}>
                      {selectedUser.status}
                    </span>
                    <span className="profile-id">ID: {selectedUser.id}</span>
                  </div>
                  <p className="profile-email">{selectedUser.email}</p>
                </div>
              </div>

              <div className="details-grid">
                {/* Basic Information */}
                <div className="detail-section">
                  <h4 className="section-title">
                    <span className="section-icon">📋</span>
                    Basic Information
                  </h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Phone</span>
                      <span className="info-value">{selectedUser.phone}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Department</span>
                      <span className="info-value">{selectedUser.department}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Join Date</span>
                      <span className="info-value">{formatDate(selectedUser.joinDate)}</span>
                    </div>
                    {selectedUser.birthday && (
                      <div className="info-item">
                        <span className="info-label">Birthday</span>
                        <span className="info-value">{formatDate(selectedUser.birthday)}</span>
                      </div>
                    )}
                    {selectedUser.address && (
                      <div className="info-item full-width">
                        <span className="info-label">Address</span>
                        <span className="info-value">{selectedUser.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Role Specific Information */}
                {selectedUser.permissions && (
                  <div className="detail-section">
                    <h4 className="section-title">
                      <span className="section-icon">🔐</span>
                      Permissions
                    </h4>
                    <div className="permissions-grid">
                      {selectedUser.permissions.map((perm, index) => (
                        <span key={index} className="permission-badge">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedUser.skills && (
                  <div className="detail-section">
                    <h4 className="section-title">
                      <span className="section-icon">⚡</span>
                      Skills & Expertise
                    </h4>
                    <div className="skills-grid">
                      {selectedUser.skills.map((skill, index) => (
                        <span key={index} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedUser.teamSize && (
                  <div className="detail-section">
                    <h4 className="section-title">
                      <span className="section-icon">👥</span>
                      Team Management
                    </h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Team Size</span>
                        <span className="info-value">{selectedUser.teamSize} members</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Projects</span>
                        <span className="info-value">{selectedUser.projects}</span>
                      </div>
                      {selectedUser.currentProject && (
                        <div className="info-item full-width">
                          <span className="info-label">Current Project</span>
                          <span className="info-value">{selectedUser.currentProject}</span>
                        </div>
                      )}
                      {selectedUser.teamMembers && (
                        <div className="info-item full-width">
                          <span className="info-label">Team Members</span>
                          <div className="team-members">
                            {selectedUser.teamMembers.map((member, index) => (
                              <span key={index} className="team-member">
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedUser.company && (
                  <div className="detail-section">
                    <h4 className="section-title">
                      <span className="section-icon">🏢</span>
                      Company Information
                    </h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Company</span>
                        <span className="info-value">{selectedUser.company}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Industry</span>
                        <span className="info-value">{selectedUser.industry}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Company Size</span>
                        <span className="info-value">{selectedUser.companySize}</span>
                      </div>
                      {selectedUser.website && (
                        <div className="info-item">
                          <span className="info-label">Website</span>
                          <a 
                            href={`https://${selectedUser.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="info-link"
                          >
                            {selectedUser.website}
                          </a>
                        </div>
                      )}
                      {selectedUser.contractValue && (
                        <div className="info-item">
                          <span className="info-label">Contract Value</span>
                          <span className="info-value">{selectedUser.contractValue}</span>
                        </div>
                      )}
                      {selectedUser.contractEndDate && (
                        <div className="info-item">
                          <span className="info-label">Contract Ends</span>
                          <span className="info-value">{formatDate(selectedUser.contractEndDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Stats Section */}
                <div className="detail-section">
                  <h4 className="section-title">
                    <span className="section-icon">📊</span>
                    Statistics
                  </h4>
                  <div className="stats-grid">
                    {(selectedUser.todayHours !== undefined) && (
                      <div className="stat-card-small">
                        <div className="stat-icon-small">📅</div>
                        <div>
                          <div className="stat-value-small">{selectedUser.todayHours}h</div>
                          <div className="stat-label-small">Today</div>
                        </div>
                      </div>
                    )}
                    {(selectedUser.weekHours !== undefined) && (
                      <div className="stat-card-small">
                        <div className="stat-icon-small">📆</div>
                        <div>
                          <div className="stat-value-small">{selectedUser.weekHours}h</div>
                          <div className="stat-label-small">This Week</div>
                        </div>
                      </div>
                    )}
                    {(selectedUser.monthHours !== undefined) && (
                      <div className="stat-card-small">
                        <div className="stat-icon-small">📈</div>
                        <div>
                          <div className="stat-value-small">{selectedUser.monthHours}h</div>
                          <div className="stat-label-small">This Month</div>
                        </div>
                      </div>
                    )}
                    {(selectedUser.totalLeaves !== undefined) && (
                      <div className="stat-card-small">
                        <div className="stat-icon-small">🏖️</div>
                        <div>
                          <div className="stat-value-small">{calculateLeavesRemaining(selectedUser)}</div>
                          <div className="stat-label-small">Leaves Left</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Projects Section */}
                {(selectedUser.projectsList || selectedUser.projects) && (
                  <div className="detail-section">
                    <h4 className="section-title">
                      <span className="section-icon">🎯</span>
                      Projects
                    </h4>
                    <div className="projects-list">
                      {selectedUser.projectsList ? (
                        selectedUser.projectsList.map((project, index) => (
                          <div key={index} className="project-item">
                            <div className="project-icon">📁</div>
                            <div className="project-details">
                              <div className="project-name">{project}</div>
                              <div className="project-status">Active</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="project-item">
                          <div className="project-icon">📁</div>
                          <div className="project-details">
                            <div className="project-name">Working on {selectedUser.projects} projects</div>
                            <div className="project-status">See project management for details</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Emergency Contact */}
                {selectedUser.emergencyContact && (
                  <div className="detail-section">
                    <h4 className="section-title">
                      <span className="section-icon">🆘</span>
                      Emergency Contact
                    </h4>
                    <div className="emergency-contact">
                      <div className="contact-icon">📞</div>
                      <div className="contact-details">
                        <div className="contact-number">{selectedUser.emergencyContact}</div>
                        <div className="contact-label">24/7 Emergency Number</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Last Activity */}
                {selectedUser.lastLogin && (
                  <div className="detail-section">
                    <h4 className="section-title">
                      <span className="section-icon">🕒</span>
                      Last Activity
                    </h4>
                    <div className="activity-info">
                      <div className="activity-time">{selectedUser.lastLogin}</div>
                      <div className="activity-status">Active Now</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedUser(null);
                }}
              >
                Close
              </button>
              <button 
                className="btn-edit"
                onClick={() => {
                  setShowViewModal(false);
                  handleEditUser(selectedUser);
                }}
              >
                ✏️ Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit User</h3>
              <button 
                className="close-modal"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={selectedUser.phone}
                  onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={selectedUser.department}
                    onChange={(e) => setSelectedUser({...selectedUser, department: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
                    className="form-input"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>
              {selectedUser.permissions && (
                <div className="form-group">
                  <label>Permissions</label>
                  <div className="permissions-list">
                    {selectedUser.permissions.map((perm, index) => (
                      <span key={index} className="permission-tag">{perm}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-save"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New User</h3>
              <button 
                className="close-modal"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>User Type</label>
                <select
                  value={newUser.type}
                  onChange={(e) => setNewUser({...newUser, type: e.target.value})}
                  className="form-input"
                >
                  <option value="hr">HR</option>
                  <option value="managers">Manager</option>
                  <option value="employees">Employee</option>
                  <option value="clients">Client</option>
                </select>
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="form-input"
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="form-input"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    className="form-input"
                    placeholder="Enter phone"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={newUser.department}
                    onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                    className="form-input"
                    placeholder="Enter department"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="form-input"
                  >
                    {ROLE_OPTIONS.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  className="form-input"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-save"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;