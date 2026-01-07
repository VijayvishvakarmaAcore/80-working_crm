import React, { useState } from 'react';

const RoleManagement = () => {
  // Initial users data with roles and permissions
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@acoreit.com",
      currentRole: "Employee",
      avatar: "JD",
      department: "Development",
      status: "active",
      permissions: {
        view: ["dashboard", "attendance"],
        edit: ["profile"],
        delete: []
      }
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@acoreit.com",
      currentRole: "HR",
      avatar: "SS",
      department: "Human Resources",
      status: "active",
      permissions: {
        view: ["dashboard", "employees", "attendance", "reports"],
        edit: ["employees", "attendance"],
        delete: []
      }
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@acoreit.com",
      currentRole: "Manager",
      avatar: "MJ",
      department: "Sales",
      status: "active",
      permissions: {
        view: ["dashboard", "employees", "attendance", "reports", "tracking"],
        edit: ["employees", "reports"],
        delete: []
      }
    },
    {
      id: 4,
      name: "Admin User",
      email: "admin@acoreit.com",
      currentRole: "Admin",
      avatar: "AU",
      department: "Administration",
      status: "active",
      permissions: {
        view: ["all"],
        edit: ["all"],
        delete: ["all"]
      }
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Available roles with their permissions
  const rolePermissions = {
    "Employee": {
      view: ["Dashboard", "My Attendance", "My Profile"],
      edit: ["My Profile"],
      features: ["Clock In/Out", "View Schedule", "Request Leave"]
    },
    "HR": {
      view: ["Dashboard", "All Employees", "Attendance", "Reports", "Leaves"],
      edit: ["Employee Profiles", "Attendance", "Leaves"],
      features: ["Manage Employees", "Generate Reports", "Approve Leaves"]
    },
    "Manager": {
      view: ["Dashboard", "Team Members", "Attendance", "Performance Reports", "Live Tracking"],
      edit: ["Team Schedules", "Performance Reviews", "Reports"],
      features: ["Track Team", "Approve Requests", "Generate Team Reports"]
    },
    "Admin": {
      view: ["Everything"],
      edit: ["Everything"],
      features: ["Full System Access", "User Management", "System Settings"]
    }
  };

  // Role change handler
  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { 
        ...user, 
        currentRole: newRole,
        permissions: {
          view: rolePermissions[newRole].view,
          edit: rolePermissions[newRole].edit,
          delete: newRole === "Admin" ? ["all"] : []
        }
      } : user
    ));
  };

  // Update user permissions
  const updateUserPermissions = (userId, permissionType, value) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newPermissions = { ...user.permissions };
        if (value === "all") {
          newPermissions[permissionType] = ["all"];
        } else if (Array.isArray(value)) {
          newPermissions[permissionType] = value;
        }
        return { ...user, permissions: newPermissions };
      }
      return user;
    }));
  };

  // Get role color
  const getRoleColor = (role) => {
    switch(role) {
      case 'Admin': return '#8b5cf6';
      case 'Manager': return '#3b82f6';
      case 'HR': return '#0ea5e9';
      case 'Employee': return '#10b981';
      default: return '#64748b';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#10b981';
      case 'inactive': return '#ef4444';
      case 'on-leave': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  // Permission options
  const permissionOptions = [
    "Dashboard",
    "Employees",
    "Attendance",
    "Live Tracking",
    "Reports",
    "Settings",
    "User Management",
    "Role Management"
  ];

  return (
    <div style={{
      background: '#1e293b',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #334155'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#f1f5f9',
            margin: '0 0 8px 0'
          }}>
            Role & Permission Management
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#94a3b8',
            margin: 0
          }}>
            Manage user roles, permissions and access levels
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <button
            style={{
              padding: '10px 20px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3b82f6';
            }}
          >
            + Add New User
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {Object.entries(rolePermissions).map(([role, data]) => (
          <div key={role} style={{
            background: '#0f172a',
            padding: '20px',
            borderRadius: '8px',
            border: `2px solid ${getRoleColor(role)}`
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: getRoleColor(role),
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '600',
                color: 'white'
              }}>
                {role.charAt(0)}
              </div>
              <div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#f1f5f9'
                }}>
                  {users.filter(u => u.currentRole === role).length}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#94a3b8'
                }}>
                  {role}s
                </div>
              </div>
            </div>
            <div style={{
              fontSize: '12px',
              color: getRoleColor(role)
            }}>
              {data.features.slice(0, 2).join(' • ')}
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div style={{
        background: '#0f172a',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
          gap: '16px',
          padding: '16px',
          background: '#1e293b',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ fontWeight: '500', color: '#f1f5f9' }}>User</div>
          <div style={{ fontWeight: '500', color: '#f1f5f9' }}>Current Role</div>
          <div style={{ fontWeight: '500', color: '#f1f5f9' }}>Permissions</div>
          <div style={{ fontWeight: '500', color: '#f1f5f9' }}>Status</div>
          <div style={{ fontWeight: '500', color: '#f1f5f9' }}>Actions</div>
        </div>

        {users.map(user => (
          <div key={user.id} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
            gap: '16px',
            padding: '16px',
            alignItems: 'center',
            borderBottom: '1px solid #334155',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
          >
            {/* User Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: getRoleColor(user.currentRole),
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  {user.avatar}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '10px',
                  height: '10px',
                  background: getStatusColor(user.status),
                  borderRadius: '50%',
                  border: '2px solid #0f172a'
                }} />
              </div>
              <div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#f1f5f9',
                  marginBottom: '2px'
                }}>
                  {user.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#94a3b8'
                }}>
                  {user.email}
                </div>
              </div>
            </div>

            {/* Current Role */}
            <div>
              <select
                value={user.currentRole}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                style={{
                  padding: '8px 12px',
                  background: `${getRoleColor(user.currentRole)}20`,
                  border: `1px solid ${getRoleColor(user.currentRole)}`,
                  borderRadius: '6px',
                  color: getRoleColor(user.currentRole),
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                {Object.keys(rolePermissions).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Permissions Preview */}
            <div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px'
              }}>
                <span style={{
                  fontSize: '11px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#10b981',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  View: {user.permissions.view.length}
                </span>
                <span style={{
                  fontSize: '11px',
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#3b82f6',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  Edit: {user.permissions.edit.length}
                </span>
                {user.permissions.delete.length > 0 && (
                  <span style={{
                    fontSize: '11px',
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    Delete: {user.permissions.delete.length}
                  </span>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <span style={{
                fontSize: '12px',
                fontWeight: '500',
                color: getStatusColor(user.status),
                background: `${getStatusColor(user.status)}20`,
                padding: '4px 8px',
                borderRadius: '12px'
              }}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setShowPermissions(true);
                }}
                style={{
                  padding: '6px 12px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '6px',
                  color: '#3b82f6',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                }}
              >
                Permissions
              </button>
              <button
                onClick={() => setEditingUser(user)}
                style={{
                  padding: '6px 12px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#10b981',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Modal */}
      {showPermissions && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: '#1e293b',
            borderRadius: '12px',
            padding: '32px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '80vh',
            overflowY: 'auto',
            border: '1px solid #334155'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#f1f5f9',
                  margin: '0 0 8px 0'
                }}>
                  Permissions for {selectedUser.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#94a3b8',
                  margin: 0
                }}>
                  Current Role: <span style={{ color: getRoleColor(selectedUser.currentRole) }}>
                    {selectedUser.currentRole}
                  </span>
                </p>
              </div>
              <button
                onClick={() => {
                  setShowPermissions(false);
                  setSelectedUser(null);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                ×
              </button>
            </div>

            {/* Permission Sections */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {/* View Permissions */}
              <div style={{
                background: '#0f172a',
                padding: '20px',
                borderRadius: '8px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#10b981',
                  margin: '0 0 16px 0'
                }}>
                  View Permissions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {permissionOptions.map(permission => (
                    <label key={permission} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedUser.permissions.view.includes(permission.toLowerCase()) || selectedUser.permissions.view.includes("all")}
                        onChange={(e) => {
                          const newView = e.target.checked
                            ? [...selectedUser.permissions.view.filter(p => p !== "all"), permission.toLowerCase()]
                            : selectedUser.permissions.view.filter(p => p !== permission.toLowerCase());
                          updateUserPermissions(selectedUser.id, "view", newView);
                        }}
                        style={{
                          accentColor: '#10b981'
                        }}
                      />
                      <span style={{ color: '#f1f5f9', fontSize: '14px' }}>{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Edit Permissions */}
              <div style={{
                background: '#0f172a',
                padding: '20px',
                borderRadius: '8px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#3b82f6',
                  margin: '0 0 16px 0'
                }}>
                  Edit Permissions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {permissionOptions.map(permission => (
                    <label key={permission} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedUser.permissions.edit.includes(permission.toLowerCase()) || selectedUser.permissions.edit.includes("all")}
                        onChange={(e) => {
                          const newEdit = e.target.checked
                            ? [...selectedUser.permissions.edit.filter(p => p !== "all"), permission.toLowerCase()]
                            : selectedUser.permissions.edit.filter(p => p !== permission.toLowerCase());
                          updateUserPermissions(selectedUser.id, "edit", newEdit);
                        }}
                        style={{
                          accentColor: '#3b82f6'
                        }}
                      />
                      <span style={{ color: '#f1f5f9', fontSize: '14px' }}>{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delete Permissions (Only for Admin) */}
              {selectedUser.currentRole === "Admin" && (
                <div style={{
                  background: '#0f172a',
                  padding: '20px',
                  borderRadius: '8px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ef4444',
                    margin: '0 0 16px 0'
                  }}>
                    Delete Permissions
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        style={{
                          accentColor: '#ef4444'
                        }}
                      />
                      <span style={{ color: '#f1f5f9', fontSize: '14px' }}>Full Delete Access</span>
                    </label>
                    <p style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      margin: '8px 0 0 0'
                    }}>
                      Admin has full delete permissions for all modules
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Role Features */}
            <div style={{
              background: '#0f172a',
              padding: '20px',
              borderRadius: '8px',
              marginTop: '20px'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#f59e0b',
                margin: '0 0 12px 0'
              }}>
                {selectedUser.currentRole} Role Features
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {rolePermissions[selectedUser.currentRole].features.map((feature, index) => (
                  <span key={index} style={{
                    fontSize: '12px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    color: '#f59e0b',
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}>
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '24px'
            }}>
              <button
                onClick={() => {
                  setShowPermissions(false);
                  setSelectedUser(null);
                }}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowPermissions(false);
                  setSelectedUser(null);
                }}
                style={{
                  padding: '10px 20px',
                  background: '#3b82f6',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3b82f6';
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default RoleManagement;