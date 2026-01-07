import React, { useState } from 'react';

const SettingsPage = ({ section, users }) => {
  const [activeTab, setActiveTab] = useState(section);
  const [companySettings, setCompanySettings] = useState({
    name: 'ACORE IT Solutions',
    email: 'info@acore.com',
    phone: '+91 9876543210',
    address: 'Indore, Madhya Pradesh',
    website: 'www.acoreithub.com',
    timezone: 'Asia/Kolkata',
    currency: 'INR'
  });

  const [workingHours, setWorkingHours] = useState({
    startTime: '09:00',
    endTime: '18:00',
    breakDuration: 60,
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    overtimeRate: 1.5,
    autoClockOut: true
  });

  const [trackingSettings, setTrackingSettings] = useState({
    screenshots: true,
    screenshotInterval: 5,
    activityTracking: true,
    appTracking: true,
    urlTracking: true,
    idleTimeout: 5,
    blurScreenshots: false,
    privacyMode: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    slackNotifications: false,
    dailyReports: true,
    weeklyReports: true,
    monthlyReports: true,
    attendanceAlerts: true,
    productivityAlerts: true,
    systemAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    ipRestriction: false,
    passwordPolicy: 'medium',
    loginAttempts: 5,
    autoLogout: true
  });

  const handleSaveSettings = (settingsType) => {
    alert(`${settingsType} settings saved successfully!`);
    // In real app, this would make an API call
  };

  const handleResetSettings = (settingsType) => {
    if (window.confirm(`Are you sure you want to reset ${settingsType} settings to default?`)) {
      alert(`${settingsType} settings reset to default`);
    }
  };

  const handleInputChange = (settingsType, field, value) => {
    switch(settingsType) {
      case 'company':
        setCompanySettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'workingHours':
        setWorkingHours(prev => ({ ...prev, [field]: value }));
        break;
      case 'tracking':
        setTrackingSettings(prev => ({ ...prev, [field]: value }));
        break;
      case 'notifications':
        setNotificationSettings(prev => ({ ...prev, [field]: value === 'toggle' ? !prev[field] : value }));
        break;
      case 'security':
        setSecuritySettings(prev => ({ ...prev, [field]: value }));
        break;
      default:
        break;
    }
  };

  const renderCompanySettings = () => (
    <div className="settings-section">
      <h3>🏢 Company Information</h3>
      <div className="settings-form">
        <div className="form-grid">
          <div className="input-group">
            <label>Company Name *</label>
            <input 
              type="text" 
              value={companySettings.name}
              onChange={(e) => handleInputChange('company', 'name', e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <div className="input-group">
            <label>Email Address *</label>
            <input 
              type="email" 
              value={companySettings.email}
              onChange={(e) => handleInputChange('company', 'email', e.target.value)}
              placeholder="company@email.com"
            />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              value={companySettings.phone}
              onChange={(e) => handleInputChange('company', 'phone', e.target.value)}
              placeholder="+91 9876543210"
            />
          </div>
          <div className="input-group">
            <label>Website</label>
            <input 
              type="url" 
              value={companySettings.website}
              onChange={(e) => handleInputChange('company', 'website', e.target.value)}
              placeholder="www.example.com"
            />
          </div>
          <div className="input-group full-width">
            <label>Address</label>
            <textarea 
              value={companySettings.address}
              onChange={(e) => handleInputChange('company', 'address', e.target.value)}
              placeholder="Company full address"
              rows="3"
            />
          </div>
          <div className="input-group">
            <label>Timezone</label>
            <select 
              value={companySettings.timezone}
              onChange={(e) => handleInputChange('company', 'timezone', e.target.value)}
            >
              <option value="Asia/Kolkata">India (IST)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
            </select>
          </div>
          <div className="input-group">
            <label>Currency</label>
            <select 
              value={companySettings.currency}
              onChange={(e) => handleInputChange('company', 'currency', e.target.value)}
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>
        </div>
        <div className="settings-actions">
          <button 
            className="btn-primary" 
            onClick={() => handleSaveSettings('Company')}
          >
            💾 Save Company Settings
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => handleResetSettings('Company')}
          >
            🔄 Reset to Default
          </button>
        </div>
      </div>
    </div>
  );

  const renderWorkingHoursSettings = () => (
    <div className="settings-section">
      <h3>⏰ Working Hours Configuration</h3>
      <div className="settings-form">
        <div className="form-grid">
          <div className="input-group">
            <label>Start Time *</label>
            <input 
              type="time" 
              value={workingHours.startTime}
              onChange={(e) => handleInputChange('workingHours', 'startTime', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>End Time *</label>
            <input 
              type="time" 
              value={workingHours.endTime}
              onChange={(e) => handleInputChange('workingHours', 'endTime', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Break Duration (mins) *</label>
            <input 
              type="number" 
              min="0"
              max="180"
              value={workingHours.breakDuration}
              onChange={(e) => handleInputChange('workingHours', 'breakDuration', parseInt(e.target.value))}
            />
          </div>
          <div className="input-group">
            <label>Overtime Rate</label>
            <select 
              value={workingHours.overtimeRate}
              onChange={(e) => handleInputChange('workingHours', 'overtimeRate', parseFloat(e.target.value))}
            >
              <option value="1.0">1.0x (Regular)</option>
              <option value="1.5">1.5x (Time & Half)</option>
              <option value="2.0">2.0x (Double Time)</option>
            </select>
          </div>
          <div className="input-group full-width">
            <label>Working Days *</label>
            <div className="days-selector">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <label key={day} className="day-checkbox">
                  <input 
                    type="checkbox" 
                    checked={workingHours.workingDays.includes(day)}
                    onChange={(e) => {
                      const newDays = e.target.checked 
                        ? [...workingHours.workingDays, day]
                        : workingHours.workingDays.filter(d => d !== day);
                      handleInputChange('workingHours', 'workingDays', newDays);
                    }}
                  />
                  <span className="day-label">{day}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="input-group">
            <label className="toggle-label">
              <span>Auto Clock-Out</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={workingHours.autoClockOut}
                  onChange={(e) => handleInputChange('workingHours', 'autoClockOut', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </label>
            <p className="helper-text">Automatically clock out employees at end time</p>
          </div>
        </div>
        <div className="settings-actions">
          <button 
            className="btn-primary" 
            onClick={() => handleSaveSettings('Working Hours')}
          >
            💾 Save Working Hours
          </button>
        </div>
      </div>
    </div>
  );

  // const renderTrackingSettings = () => (
  //   <div className="settings-section">
  //     <h3>📡 Tracking & Monitoring Settings</h3>
  //     <div className="settings-form">
  //       <div className="toggle-grid">
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Screenshot Capture</strong>
  //             <p>Take periodic screenshots of employee screens</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={trackingSettings.screenshots}
  //               onChange={() => handleInputChange('tracking', 'screenshots', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Activity Tracking</strong>
  //             <p>Track keyboard and mouse activity</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={trackingSettings.activityTracking}
  //               onChange={() => handleInputChange('tracking', 'activityTracking', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Application Tracking</strong>
  //             <p>Monitor applications being used</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={trackingSettings.appTracking}
  //               onChange={() => handleInputChange('tracking', 'appTracking', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>URL Tracking</strong>
  //             <p>Track websites visited</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={trackingSettings.urlTracking}
  //               onChange={() => handleInputChange('tracking', 'urlTracking', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Blur Screenshots</strong>
  //             <p>Blur sensitive information in screenshots</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={trackingSettings.blurScreenshots}
  //               onChange={() => handleInputChange('tracking', 'blurScreenshots', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Privacy Mode</strong>
  //             <p>Hide sensitive data in reports</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={trackingSettings.privacyMode}
  //               onChange={() => handleInputChange('tracking', 'privacyMode', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
  //       </div>

  //       <div className="form-grid">
  //         <div className="input-group">
  //           <label>Screenshot Interval (minutes)</label>
  //           <select 
  //             value={trackingSettings.screenshotInterval}
  //             onChange={(e) => handleInputChange('tracking', 'screenshotInterval', parseInt(e.target.value))}
  //           >
  //             <option value="1">1 minute</option>
  //             <option value="5">5 minutes</option>
  //             <option value="10">10 minutes</option>
  //             <option value="15">15 minutes</option>
  //             <option value="30">30 minutes</option>
  //           </select>
  //         </div>
          
  //         <div className="input-group">
  //           <label>Idle Timeout (minutes)</label>
  //           <select 
  //             value={trackingSettings.idleTimeout}
  //             onChange={(e) => handleInputChange('tracking', 'idleTimeout', parseInt(e.target.value))}
  //           >
  //             <option value="1">1 minute</option>
  //             <option value="5">5 minutes</option>
  //             <option value="10">10 minutes</option>
  //             <option value="15">15 minutes</option>
  //             <option value="30">30 minutes</option>
  //           </select>
  //         </div>
  //       </div>

  //       <div className="settings-actions">
  //         <button 
  //           className="btn-primary" 
  //           onClick={() => handleSaveSettings('Tracking')}
  //         >
  //           💾 Save Tracking Settings
  //         </button>
  //         <button 
  //           className="btn-secondary" 
  //           onClick={() => handleResetSettings('Tracking')}
  //         >
  //           🔄 Reset to Default
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const renderNotificationSettings = () => (
  //   <div className="settings-section">
  //     <h3>🔔 Notification Settings</h3>
  //     <div className="settings-form">
  //       <div className="toggle-grid">
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Email Notifications</strong>
  //             <p>Send notifications via email</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={notificationSettings.emailNotifications}
  //               onChange={() => handleInputChange('notifications', 'emailNotifications', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Slack Notifications</strong>
  //             <p>Send notifications to Slack</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={notificationSettings.slackNotifications}
  //               onChange={() => handleInputChange('notifications', 'slackNotifications', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Daily Reports</strong>
  //             <p>Send daily summary reports</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={notificationSettings.dailyReports}
  //               onChange={() => handleInputChange('notifications', 'dailyReports', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Weekly Reports</strong>
  //             <p>Send weekly performance reports</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={notificationSettings.weeklyReports}
  //               onChange={() => handleInputChange('notifications', 'weeklyReports', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Monthly Reports</strong>
  //             <p>Send monthly analytics reports</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={notificationSettings.monthlyReports}
  //               onChange={() => handleInputChange('notifications', 'monthlyReports', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Attendance Alerts</strong>
  //             <p>Alert for late arrivals and absences</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={notificationSettings.attendanceAlerts}
  //               onChange={() => handleInputChange('notifications', 'attendanceAlerts', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Productivity Alerts</strong>
  //             <p>Alert for low productivity</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={notificationSettings.productivityAlerts}
  //               onChange={() => handleInputChange('notifications', 'productivityAlerts', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>System Alerts</strong>
  //             <p>System maintenance and update alerts</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={notificationSettings.systemAlerts}
  //               onChange={() => handleInputChange('notifications', 'systemAlerts', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
  //       </div>

  //       <div className="settings-actions">
  //         <button 
  //           className="btn-primary" 
  //           onClick={() => handleSaveSettings('Notification')}
  //         >
  //           💾 Save Notification Settings
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const renderSecuritySettings = () => (
  //   <div className="settings-section">
  //     <h3>🔐 Security Settings</h3>
  //     <div className="settings-form">
  //       <div className="toggle-grid">
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Two-Factor Authentication</strong>
  //             <p>Require 2FA for admin login</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={securitySettings.twoFactorAuth}
  //               onChange={() => handleInputChange('security', 'twoFactorAuth', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>IP Restriction</strong>
  //             <p>Restrict access to specific IP addresses</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={securitySettings.ipRestriction}
  //               onChange={() => handleInputChange('security', 'ipRestriction', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
          
  //         <div className="toggle-item">
  //           <div className="toggle-header">
  //             <strong>Auto Logout</strong>
  //             <p>Automatically logout inactive sessions</p>
  //           </div>
  //           <label className="switch">
  //             <input 
  //               type="checkbox" 
  //               checked={securitySettings.autoLogout}
  //               onChange={() => handleInputChange('security', 'autoLogout', 'toggle')}
  //             />
  //             <span className="slider"></span>
  //           </label>
  //         </div>
  //       </div>

  //       <div className="form-grid">
  //         <div className="input-group">
  //           <label>Session Timeout (minutes)</label>
  //           <select 
  //             value={securitySettings.sessionTimeout}
  //             onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
  //           >
  //             <option value="15">15 minutes</option>
  //             <option value="30">30 minutes</option>
  //             <option value="60">60 minutes</option>
  //             <option value="120">2 hours</option>
  //             <option value="240">4 hours</option>
  //           </select>
  //         </div>
          
  //         <div className="input-group">
  //           <label>Password Policy</label>
  //           <select 
  //             value={securitySettings.passwordPolicy}
  //             onChange={(e) => handleInputChange('security', 'passwordPolicy', e.target.value)}
  //           >
  //             <option value="low">Low (6+ characters)</option>
  //             <option value="medium">Medium (8+ with mix)</option>
  //             <option value="high">High (12+ with special)</option>
  //           </select>
  //         </div>
          
  //         <div className="input-group">
  //           <label>Max Login Attempts</label>
  //           <select 
  //             value={securitySettings.loginAttempts}
  //             onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value))}
  //           >
  //             <option value="3">3 attempts</option>
  //             <option value="5">5 attempts</option>
  //             <option value="10">10 attempts</option>
  //             <option value="0">Unlimited</option>
  //           </select>
  //         </div>
  //       </div>

  //       <div className="settings-actions">
  //         <button 
  //           className="btn-primary" 
  //           onClick={() => handleSaveSettings('Security')}
  //         >
  //           💾 Save Security Settings
  //         </button>
  //         <button 
  //           className="btn-secondary" 
  //           onClick={() => handleResetSettings('Security')}
  //         >
  //           🔄 Reset to Default
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  const renderUserManagement = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>👤 User Management</h3>
        <button className="btn-primary">
          👥 Add New User
        </button>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td><strong>{user.id}</strong></td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">{user.name[0]}</div>
                    <div>
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.id.toLowerCase()}@acore.com</div>
                    </div>
                  </div>
                </td>
                <td><span className="role-badge">{user.role}</span></td>
                <td>{user.department}</td>
                <td><span className="status-badge active">Active</span></td>
                <td>Today, 09:30 AM</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit User">
                      ✏️
                    </button>
                    <button className="btn-icon" title="Reset Password">
                      🔑
                    </button>
                    <button className="btn-icon" title="Deactivate">
                      ⏸️
                    </button>
                    <button className="btn-icon btn-danger" title="Delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="user-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div>
            <strong>Total Users</strong>
            <p>{users.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👑</div>
          <div>
            <strong>Admins</strong>
            <p>{users.filter(u => u.role === 'Boss').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👔</div>
          <div>
            <strong>HR Users</strong>
            <p>{users.filter(u => u.role === 'HR').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <strong>Active</strong>
            <p>{users.length}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'general':
        return (
          <>
            {renderCompanySettings()}
            {renderWorkingHoursSettings()}
          </>
        );
      // case 'tracking':
      //   return renderTrackingSettings();
      // case 'notifications':
      //   return renderNotificationSettings();
      // case 'security':
      //   return renderSecuritySettings();
      case 'users':
        return renderUserManagement();
      default:
        return renderCompanySettings();
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">⚙️ System Settings</h2>
        <div className="settings-status">
          <span className="status-indicator active"></span>
          <span>All systems operational</span>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="settings-tabs">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            🏢 General
          </button>
          {/* <button 
            className={`tab-btn ${activeTab === 'tracking' ? 'active' : ''}`}
            onClick={() => setActiveTab('tracking')}
          >
            📡 Tracking
          </button> */}
          {/* <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            🔔 Notifications
          </button> */}
          {/* <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔐 Security
          </button> */}
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👤 Users
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        {renderTabContent()}
      </div>

      {/* System Info */}
      {/* <div className="system-info">
        <h3>ℹ️ System Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Version</span>
            <span className="info-value">1.0.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Updated</span>
            <span className="info-value">Dec 13, 2024</span>
          </div>
          <div className="info-item">
            <span className="info-label">Database</span>
            <span className="info-value">PostgreSQL 14</span>
          </div>
          <div className="info-item">
            <span className="info-label">Uptime</span>
            <span className="info-value">99.8%</span>
          </div>
          <div className="info-item">
            <span className="info-label">Storage</span>
            <span className="info-value">2.4 GB / 10 GB</span>
          </div>
          <div className="info-item">
            <span className="info-label">Backup</span>
            <span className="info-value">Daily at 2:00 AM</span>
          </div>
        </div>
      </div> */}

      <style jsx>{`
        .page-subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin-top: 4px;
        }
        
        .settings-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 20px;
          color: #10b981;
          font-size: 14px;
        }
        
        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse 2s infinite;
        }
        
        .settings-tabs {
          margin: 24px 0;
          background: #1e293b;
          border-radius: 8px;
          border: 1px solid #334155;
        }
        
        .tabs-container {
          display: flex;
          overflow-x: auto;
        }
        
        .tab-btn {
          padding: 16px 24px;
          border: none;
          background: transparent;
          color: #94a3b8;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          border-bottom: 3px solid transparent;
          transition: all 0.2s;
        }
        
        .tab-btn:hover {
          color: #f1f5f9;
        }
        
        .tab-btn.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
        }
        
        .settings-content {
          animation: fadeIn 0.3s ease;
        }
        
        .settings-section {
          background: #1e293b;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #334155;
          margin-bottom: 24px;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .settings-form {
          margin-top: 20px;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        
        .full-width {
          grid-column: 1 / -1;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .input-group label {
          font-size: 14px;
          font-weight: 500;
          color: #94a3b8;
        }
        
        .input-group input,
        .input-group select,
        .input-group textarea {
          padding: 10px 12px;
          background: #334155;
          border: 1px solid #475569;
          border-radius: 6px;
          color: #f1f5f9;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .input-group input:focus,
        .input-group select:focus,
        .input-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .helper-text {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
        }
        
        .toggle-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #334155;
          transition: .4s;
          border-radius: 24px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .slider {
          background-color: #10b981;
        }
        
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        
        .toggle-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #334155;
          border-radius: 8px;
          border: 1px solid #475569;
        }
        
        .toggle-header {
          flex: 1;
        }
        
        .toggle-header strong {
          display: block;
          color: #f1f5f9;
          font-size: 14px;
          margin-bottom: 4px;
        }
        
        .toggle-header p {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
        }
        
        .days-selector {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .day-checkbox {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        
        .day-checkbox input[type="checkbox"] {
          display: none;
        }
        
        .day-label {
          padding: 6px 12px;
          background: #334155;
          border: 1px solid #475569;
          border-radius: 6px;
          color: #94a3b8;
          font-size: 13px;
          transition: all 0.2s;
        }
        
        .day-checkbox input[type="checkbox"]:checked + .day-label {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
        
        .settings-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        
        .btn-secondary {
          background: #334155;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.2s;
        }
        
        .btn-secondary:hover {
          background: #475569;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          flex-shrink: 0;
        }
        
        .user-name {
          font-weight: 500;
          color: #f1f5f9;
        }
        
        .user-email {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .action-buttons {
          display: flex;
          gap: 4px;
        }
        
        .btn-danger {
          color: #ef4444;
        }
        
        .user-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 24px;
        }
        
        .stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #334155;
          border-radius: 8px;
          border: 1px solid #475569;
        }
        
        .stat-icon {
          font-size: 24px;
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: rgba(59, 130, 246, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .stat-card strong {
          display: block;
          font-size: 14px;
          color: #94a3b8;
        }
        
        .stat-card p {
          font-size: 20px;
          font-weight: 600;
          color: #f1f5f9;
          margin: 4px 0 0 0;
        }
        
        .system-info {
          background: #1e293b;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #334155;
          margin-top: 24px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }
        
        .info-item {
          padding: 12px;
          background: #334155;
          border-radius: 6px;
        }
        
        .info-label {
          display: block;
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        
        .info-value {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .tabs-container {
            flex-direction: column;
          }
          
          .tab-btn {
            text-align: left;
            border-bottom: none;
            border-left: 3px solid transparent;
          }
          
          .tab-btn.active {
            border-left-color: #3b82f6;
            border-bottom: none;
          }
          
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .settings-actions {
            flex-direction: column;
          }
          
          .user-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .toggle-grid {
            grid-template-columns: 1fr;
          }
          
          .user-stats {
            grid-template-columns: 1fr;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;