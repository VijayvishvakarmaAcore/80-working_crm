import React, { useState, useEffect } from 'react';

const RealTimeUpdates = ({ updates = [] }) => {
  const [showUpdates, setShowUpdates] = useState(true);
  const [filteredUpdates, setFilteredUpdates] = useState([]);

  useEffect(() => {
    // Filter to show only recent updates (last 10)
    const recentUpdates = updates.slice(0, 10);
    setFilteredUpdates(recentUpdates);
  }, [updates]);

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

  return (
    <div className="realtime-updates-section">
      <div className="updates-header">
        <div className="updates-title">
          <h3>🔄 Real-time Updates</h3>
          <span className="updates-badge">{filteredUpdates.length}</span>
        </div>
        <button 
          className="toggle-updates"
          onClick={() => setShowUpdates(!showUpdates)}
        >
          {showUpdates ? 'Hide' : 'Show'} Updates
        </button>
      </div>

      {showUpdates && (
        <div className="updates-container">
          {filteredUpdates.length > 0 ? (
            <div className="updates-list">
              {filteredUpdates.map((update, index) => (
                <div 
                  key={index} 
                  className="update-item"
                  style={{ borderLeftColor: getUpdateColor(update.type) }}
                >
                  <div className="update-icon" style={{ color: getUpdateColor(update.type) }}>
                    {getUpdateIcon(update.type)}
                  </div>
                  <div className="update-content">
                    <div className="update-message">
                      <strong>{update.employeeName}</strong> {update.message}
                    </div>
                    <div className="update-meta">
                      <span className="update-time">{formatTime(update.timestamp)}</span>
                      <span className="update-type">{update.type.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-updates">
              <div className="no-updates-icon">📭</div>
              <p>No recent updates</p>
              <small>Updates will appear here in real-time</small>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .realtime-updates-section {
          background: #1e293b;
          border-radius: 12px;
          padding: 20px;
          margin-top: 24px;
          border: 1px solid #334155;
        }

        .updates-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .updates-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .updates-title h3 {
          margin: 0;
          font-size: 18px;
          color: #f1f5f9;
        }

        .updates-badge {
          background: #3b82f6;
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 12px;
          min-width: 20px;
          text-align: center;
        }

        .toggle-updates {
          background: transparent;
          color: #94a3b8;
          border: 1px solid #334155;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .toggle-updates:hover {
          background: #334155;
          color: #f1f5f9;
        }

        .updates-container {
          max-height: 300px;
          overflow-y: auto;
        }

        .updates-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .update-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border-left: 3px solid;
          transition: background 0.2s;
        }

        .update-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .update-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .update-content {
          flex: 1;
        }

        .update-message {
          color: #f1f5f9;
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 4px;
        }

        .update-message strong {
          color: #3b82f6;
        }

        .update-meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #94a3b8;
        }

        .no-updates {
          text-align: center;
          padding: 40px 20px;
        }

        .no-updates-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .no-updates p {
          color: #94a3b8;
          margin: 0 0 8px 0;
        }

        .no-updates small {
          color: #64748b;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .realtime-updates-section {
            padding: 16px;
          }
          
          .updates-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .toggle-updates {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default RealTimeUpdates;