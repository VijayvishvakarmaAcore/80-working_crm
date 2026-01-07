import React from 'react';

const EmployeeDetailModal = ({ 
  employee, 
  isOpen, 
  onClose, 
  getStatusIcon, 
  getStatusColor,
  getAppIcon,
  formatDuration 
}) => {
  if (!isOpen || !employee) return null;

  const activityHistory = employee.activityHistory || [];
  const timeStats = employee.timeStats || {};
  
  // Calculate productivity metrics
  const productivityScore = Math.round((employee.workSeconds / (employee.workSeconds + employee.idleSeconds)) * 100) || 0;
  const attendanceRate = employee.attendanceRate || 95;
  const avgProductivity = employee.avgProductivity || 78;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title">
            <h2>{employee.name}'s Activity Details</h2>
            <p className="modal-subtitle">Employee ID: {employee.empId}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Employee Overview */}
          <div className="overview-section">
            <div className="employee-profile">
              <div 
                className="profile-avatar-large"
                style={{ background: getStatusColor(employee.status) }}
              >
                {employee.name.charAt(0)}
              </div>
              <div className="profile-info">
                <h3>{employee.name}</h3>
                <p className="profile-role">{employee.role || 'Software Engineer'}</p>
                <p className="profile-department">{employee.department || 'Engineering Department'}</p>
              </div>
              <div 
                className="status-display-large"
                style={{ 
                  background: `${getStatusColor(employee.status)}20`,
                  color: getStatusColor(employee.status)
                }}
              >
                {getStatusIcon(employee.status)} {employee.status}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid-small">
              <div className="stat-item">
                <span className="stat-label">Punch In</span>
                <span className="stat-value">
                  {employee.punchInTime ? 
                    new Date(employee.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
                    '--:--'
                  }
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Active Time</span>
                <span className="stat-value time-active">
                  {formatDuration(employee.workSeconds)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Idle Time</span>
                <span className="stat-value time-idle">
                  {formatDuration(employee.idleSeconds)}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Productivity</span>
                <span className="stat-value" style={{ color: productivityScore > 70 ? '#10b981' : '#f59e0b' }}>
                  {productivityScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Current Activity */}
          <div className="activity-section">
            <h3>🎯 Current Activity</h3>
            <div className="current-activity-card">
              <div className="activity-header">
                <div className="activity-app">
                  <span className="app-icon-large">{getAppIcon(employee.appName)}</span>
                  <div>
                    <strong>{employee.appName || 'Unknown Application'}</strong>
                    <p>{employee.currentActivity || 'No active task'}</p>
                  </div>
                </div>
                <span className="activity-duration">
                  {formatDuration(employee.currentActivityDuration || 0)}
                </span>
              </div>
              <div className="activity-timeline">
                <div className="timeline-bar">
                  <div 
                    className="timeline-progress"
                    style={{ 
                      width: `${Math.min(productivityScore, 100)}%`,
                      background: getStatusColor(employee.status)
                    }}
                  ></div>
                </div>
                <div className="timeline-labels">
                  <span>Start</span>
                  <span>Now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Breakdown */}
          <div className="time-breakdown-section">
            <h3>⏱️ Today's Time Breakdown</h3>
            <div className="time-breakdown-grid">
              <div className="breakdown-item">
                <div className="breakdown-label">Active Work</div>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill"
                    style={{ 
                      width: `${(employee.workSeconds / (employee.workSeconds + employee.idleSeconds)) * 100 || 0}%`,
                      background: '#10b981'
                    }}
                  ></div>
                </div>
                <div className="breakdown-value">{formatDuration(employee.workSeconds)}</div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-label">Idle Time</div>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill"
                    style={{ 
                      width: `${(employee.idleSeconds / (employee.workSeconds + employee.idleSeconds)) * 100 || 0}%`,
                      background: '#f59e0b'
                    }}
                  ></div>
                </div>
                <div className="breakdown-value">{formatDuration(employee.idleSeconds)}</div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-label">Meetings</div>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill"
                    style={{ 
                      width: `${employee.meetingPercentage || 15}%`,
                      background: '#3b82f6'
                    }}
                  ></div>
                </div>
                <div className="breakdown-value">{formatDuration(employee.meetingSeconds || 0)}</div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-label">Breaks</div>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill"
                    style={{ 
                      width: `${employee.breakPercentage || 5}%`,
                      background: '#ef4444'
                    }}
                  ></div>
                </div>
                <div className="breakdown-value">{formatDuration(employee.breakSeconds || 0)}</div>
              </div>
            </div>
          </div>

          {/* Activity History */}
          <div className="history-section">
            <h3>📋 Recent Activity History</h3>
            <div className="activity-history">
              {activityHistory.length > 0 ? (
                activityHistory.map((activity, index) => (
                  <div key={index} className="history-item">
                    <div className="history-time">
                      {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="history-icon">{getAppIcon(activity.app)}</div>
                    <div className="history-content">
                      <strong>{activity.app}</strong>
                      <p>{activity.activity}</p>
                    </div>
                    <div className="history-duration">{formatDuration(activity.duration)}</div>
                    <div 
                      className="history-status"
                      style={{ color: getStatusColor(activity.status) }}
                    >
                      {getStatusIcon(activity.status)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-history">No activity history available</div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="metrics-section">
            <h3>📊 Performance Metrics</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">🎯</div>
                <div className="metric-content">
                  <h4>Productivity Score</h4>
                  <p className="metric-value">{productivityScore}%</p>
                  <p className="metric-trend">Today's performance</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">📅</div>
                <div className="metric-content">
                  <h4>Attendance Rate</h4>
                  <p className="metric-value">{attendanceRate}%</p>
                  <p className="metric-trend">This month</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">⏱️</div>
                <div className="metric-content">
                  <h4>Avg. Active Hours</h4>
                  <p className="metric-value">{employee.avgDailyHours || '7h 30m'}</p>
                  <p className="metric-trend">Last 30 days</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">📈</div>
                <div className="metric-content">
                  <h4>Avg. Productivity</h4>
                  <p className="metric-value">{avgProductivity}%</p>
                  <p className="metric-trend">Monthly average</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <div className="action-buttons">
            <button className="btn-icon" title="Send Message">
              💬 Message
            </button>
            <button className="btn-icon" title="View Screenshots">
              📷 Screenshots
            </button>
            <button className="btn-icon" title="Generate Report">
              📄 Report
            </button>
            <button className="btn-primary">
              Export Details
            </button>
          </div>
        </div>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
            backdrop-filter: blur(4px);
          }

          .modal-container {
            background: #0f172a;
            border-radius: 16px;
            width: 100%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            border: 1px solid #334155;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: modalSlideIn 0.3s ease-out;
          }

          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px;
            border-bottom: 1px solid #334155;
            position: sticky;
            top: 0;
            background: #0f172a;
            z-index: 10;
            border-radius: 16px 16px 0 0;
          }

          .modal-title h2 {
            margin: 0;
            font-size: 24px;
            color: #f1f5f9;
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
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            transition: all 0.2s;
          }

          .modal-close:hover {
            background: #334155;
            color: #f1f5f9;
          }

          .modal-body {
            padding: 0 24px 24px 24px;
          }

          .overview-section {
            background: #1e293b;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            border: 1px solid #334155;
          }

          .employee-profile {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 24px;
          }

          .profile-avatar-large {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: 600;
            color: white;
            flex-shrink: 0;
          }

          .profile-info {
            flex: 1;
          }

          .profile-info h3 {
            margin: 0 0 4px 0;
            font-size: 24px;
            color: #f1f5f9;
          }

          .profile-role {
            color: #3b82f6;
            font-weight: 500;
            margin: 0 0 4px 0;
          }

          .profile-department {
            color: #94a3b8;
            font-size: 14px;
            margin: 0;
          }

          .status-display-large {
            padding: 12px 20px;
            border-radius: 24px;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            white-space: nowrap;
          }

          .stats-grid-small {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
          }

          .stat-item {
            background: #0f172a;
            padding: 16px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #334155;
          }

          .stat-label {
            display: block;
            color: #94a3b8;
            font-size: 12px;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .stat-value {
            display: block;
            font-size: 20px;
            font-weight: 700;
            color: #f1f5f9;
          }

          .time-active {
            color: #10b981;
          }

          .time-idle {
            color: #f59e0b;
          }

          .activity-section {
            margin-bottom: 24px;
          }

          .activity-section h3 {
            font-size: 18px;
            color: #f1f5f9;
            margin: 0 0 16px 0;
          }

          .current-activity-card {
            background: #1e293b;
            border-radius: 12px;
            padding: 20px;
            border: 1px solid #334155;
          }

          .activity-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .activity-app {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .app-icon-large {
            font-size: 32px;
          }

          .activity-duration {
            background: rgba(59, 130, 246, 0.2);
            color: #3b82f6;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
          }

          .activity-timeline {
            margin-top: 20px;
          }

          .timeline-bar {
            height: 8px;
            background: #334155;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 8px;
          }

          .timeline-progress {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
          }

          .timeline-labels {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #94a3b8;
          }

          .time-breakdown-section {
            margin-bottom: 24px;
          }

          .time-breakdown-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .breakdown-item {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .breakdown-label {
            width: 120px;
            color: #94a3b8;
            font-size: 14px;
          }

          .breakdown-bar {
            flex: 1;
            height: 12px;
            background: #334155;
            border-radius: 6px;
            overflow: hidden;
          }

          .breakdown-fill {
            height: 100%;
            border-radius: 6px;
            transition: width 0.3s ease;
          }

          .breakdown-value {
            width: 80px;
            text-align: right;
            font-weight: 600;
            color: #f1f5f9;
            font-size: 14px;
          }

          .history-section {
            margin-bottom: 24px;
          }

          .activity-history {
            background: #1e293b;
            border-radius: 12px;
            border: 1px solid #334155;
            max-height: 300px;
            overflow-y: auto;
          }

          .history-item {
            display: flex;
            align-items: center;
            padding: 16px;
            border-bottom: 1px solid #334155;
            transition: background 0.2s;
          }

          .history-item:last-child {
            border-bottom: none;
          }

          .history-item:hover {
            background: rgba(255, 255, 255, 0.05);
          }

          .history-time {
            width: 80px;
            color: #94a3b8;
            font-size: 12px;
            font-weight: 500;
          }

          .history-icon {
            width: 40px;
            font-size: 20px;
            text-align: center;
          }

          .history-content {
            flex: 1;
          }

          .history-content strong {
            display: block;
            color: #f1f5f9;
            font-size: 14px;
            margin-bottom: 4px;
          }

          .history-content p {
            margin: 0;
            color: #94a3b8;
            font-size: 12px;
          }

          .history-duration {
            width: 80px;
            text-align: right;
            color: #3b82f6;
            font-weight: 600;
            font-size: 14px;
          }

          .history-status {
            width: 40px;
            text-align: center;
            font-size: 20px;
          }

          .empty-history {
            text-align: center;
            padding: 40px;
            color: #94a3b8;
          }

          .metrics-section {
            margin-bottom: 24px;
          }

          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
          }

          .metric-card {
            background: #1e293b;
            border-radius: 12px;
            padding: 20px;
            border: 1px solid #334155;
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .metric-icon {
            font-size: 32px;
            opacity: 0.9;
          }

          .metric-content h4 {
            margin: 0 0 8px 0;
            font-size: 16px;
            color: #94a3b8;
          }

          .metric-value {
            font-size: 24px;
            font-weight: 700;
            color: #f1f5f9;
            margin: 0 0 4px 0;
          }

          .metric-trend {
            color: #94a3b8;
            font-size: 12px;
            margin: 0;
          }

          .modal-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px;
            border-top: 1px solid #334155;
            background: #0f172a;
            border-radius: 0 0 16px 16px;
            position: sticky;
            bottom: 0;
          }

          .btn-secondary {
            background: transparent;
            color: #94a3b8;
            border: 1px solid #334155;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
          }

          .btn-secondary:hover {
            background: #334155;
            color: #f1f5f9;
          }

          .action-buttons {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .btn-icon {
            background: transparent;
            color: #94a3b8;
            border: 1px solid #334155;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s;
          }

          .btn-icon:hover {
            background: #334155;
            color: #f1f5f9;
          }

          .btn-primary {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s;
          }

          .btn-primary:hover {
            background: #2563eb;
          }

          @media (max-width: 768px) {
            .modal-container {
              max-height: 95vh;
            }
            
            .modal-header {
              padding: 16px;
            }
            
            .modal-body {
              padding: 0 16px 16px 16px;
            }
            
            .employee-profile {
              flex-direction: column;
              text-align: center;
              gap: 16px;
            }
            
            .stats-grid-small {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .activity-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }
            
            .activity-app {
              width: 100%;
            }
            
            .modal-footer {
              flex-direction: column;
              gap: 16px;
              padding: 16px;
            }
            
            .action-buttons {
              width: 100%;
              flex-wrap: wrap;
              justify-content: center;
            }
          }

          @media (max-width: 480px) {
            .stats-grid-small {
              grid-template-columns: 1fr;
            }
            
            .breakdown-item {
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }
            
            .breakdown-label,
            .breakdown-bar,
            .breakdown-value {
              width: 100%;
            }
            
            .breakdown-value {
              text-align: left;
            }
            
            .metrics-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;