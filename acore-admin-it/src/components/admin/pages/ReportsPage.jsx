import React, { useState } from 'react';

const ReportsPage = ({ reportType, reportData }) => {
  const [activeTab, setActiveTab] = useState(reportType === 'weekly' ? 'summary' : 'overview');
  const [dateRange, setDateRange] = useState('this-week');
  
  // Mock data for different reports
  const weeklyData = {
    weekRange: 'Dec 7 - Dec 13, 2024',
    totalHours: 1250,
    avgHoursPerEmployee: 7.8,
    totalEmployees: 8,
    productivityScore: 92,
    topPerformers: [
      { name: 'Sneha Reddy', hours: 43.2, productivity: 96, department: 'Engineering' },
      { name: 'Rahul Verma', hours: 42.5, productivity: 94, department: 'Engineering' },
      { name: 'Arjun Mehta', hours: 41.8, productivity: 92, department: 'Engineering' },
      { name: 'Anjali Singh', hours: 39.2, productivity: 89, department: 'Design' },
      { name: 'Kavya Nair', hours: 38.9, productivity: 91, department: 'Quality' }
    ],
    departmentStats: [
      { dept: 'Engineering', employees: 4, avgHours: 8.1, productivity: 93, overtime: 12 },
      { dept: 'Design', employees: 1, avgHours: 7.8, productivity: 89, overtime: 4 },
      { dept: 'Quality', employees: 1, avgHours: 7.9, productivity: 91, overtime: 6 },
      { dept: 'Management', employees: 1, avgHours: 6.5, productivity: 85, overtime: 2 },
      { dept: 'HR', employees: 1, avgHours: 8.3, productivity: 88, overtime: 8 }
    ],
    dailyHours: [
      { day: 'Mon', hours: 165, avg: 8.25, productivity: 91 },
      { day: 'Tue', hours: 172, avg: 8.6, productivity: 93 },
      { day: 'Wed', hours: 158, avg: 7.9, productivity: 89 },
      { day: 'Thu', hours: 168, avg: 8.4, productivity: 92 },
      { day: 'Fri', hours: 162, avg: 8.1, productivity: 90 },
      { day: 'Sat', hours: 84, avg: 4.2, productivity: 85 },
      { day: 'Sun', hours: 0, avg: 0, productivity: 0 }
    ]
  };

  const monthlyData = {
    month: 'November 2024',
    totalHours: 5280,
    totalDays: 22,
    avgHoursPerDay: 7.6,
    totalEmployees: 8,
    productivity: 91,
    attendance: { present: 165, absent: 11, leaves: 8 },
    departmentPerformance: [
      { dept: 'Engineering', productivity: 93, attendance: 95, overtime: 45 },
      { dept: 'Design', productivity: 89, attendance: 92, overtime: 18 },
      { dept: 'Quality', productivity: 91, attendance: 94, overtime: 24 },
      { dept: 'Management', productivity: 85, attendance: 88, overtime: 10 },
      { dept: 'HR', productivity: 88, attendance: 96, overtime: 32 }
    ],
    weeklyTrends: [
      { week: 'Week 1', hours: 1240, productivity: 89 },
      { week: 'Week 2', hours: 1320, productivity: 91 },
      { week: 'Week 3', hours: 1280, productivity: 90 },
      { week: 'Week 4', hours: 1440, productivity: 94 }
    ]
  };

  const data = reportType === 'weekly' ? weeklyData : monthlyData;

  const handleExport = (format) => {
    alert(`Exporting ${reportType} report as ${format}...`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            {reportType === 'weekly' ? '📊 Weekly Performance Report' : '📈 Monthly Analytics Report'}
          </h2>
          <p className="page-subtitle">
            {reportType === 'weekly' ? data.weekRange : data.month} • Generated on {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="report-actions">
          <select 
            className="filter-select" 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="this-week">This Week</option>
            <option value="last-week">Last Week</option>
            <option value="this-month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
          <div className="action-buttons">
            <button className="btn-icon" onClick={() => handleExport('PDF')} title="Export as PDF">
              📄 PDF
            </button>
            <button className="btn-icon" onClick={() => handleExport('Excel')} title="Export as Excel">
              📊 Excel
            </button>
            <button className="btn-icon" onClick={handlePrint} title="Print Report">
              🖨️ Print
            </button>
            <button className="btn-primary" onClick={() => alert('Sharing report...')}>
              📤 Share Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="report-tabs">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            📋 Summary
          </button>
          <button 
            className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            🏆 Performance
          </button>
          {/* <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button> */}
          {/* <button 
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            📊 Details
          </button> */}
        </div>
      </div>

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div className="report-section">
          <div className="summary-cards">
            <div className="card">
              <div className="card-icon">⏱️</div>
              <h3>Total Hours</h3>
              <p className="card-value">{data.totalHours}h</p>
              <p className="card-trend">
                {reportType === 'weekly' ? 'This week' : 'This month'}
              </p>
            </div>
            <div className="card">
              <div className="card-icon">👥</div>
              <h3>Avg Hours/Employee</h3>
              <p className="card-value">{data.avgHoursPerEmployee || data.avgHoursPerDay}h</p>
              <p className="card-trend">
                {reportType === 'weekly' ? 'Per day' : 'Per working day'}
              </p>
            </div>
            {/* <div className="card card-success">
              <div className="card-icon">📊</div>
              <h3>Productivity</h3>
              <p className="card-value">{data.productivityScore || data.productivity}%</p>
              <p className="card-trend">
                {data.productivityScore || data.productivity >= 90 ? 'Excellent' : 'Good'}
              </p>
            </div> */}
            {reportType === 'monthly' && (
              <>
                <div className="card">
                  <div className="card-icon">📅</div>
                  <h3>Working Days</h3>
                  <p className="card-value">{data.totalDays}</p>
                  <p className="card-trend">Total days</p>
                </div>
                <div className="card card-success">
                  <div className="card-icon">✅</div>
                  <h3>Present Days</h3>
                  <p className="card-value">{data.attendance.present}</p>
                  <p className="card-trend">{Math.round((data.attendance.present / (data.attendance.present + data.attendance.absent)) * 100)}% attendance</p>
                </div>
              </>
            )}
          </div>

          {/* Productivity Gauge */}
          {/* <div className="chart-box">
            <h3>⚡ Overall Productivity Score</h3>
            <div className="productivity-gauge">
              <div className="gauge-container">
                <div className="gauge">
                  <div className="gauge-fill" style={{
                    transform: `rotate(${((data.productivityScore || data.productivity) - 50) * 1.8}deg)`
                  }}></div>
                  <div className="gauge-center">
                    <span className="gauge-value">{data.productivityScore || data.productivity}%</span>
                    <span className="gauge-label">Productivity</span>
                  </div>
                </div>
                <div className="gauge-labels">
                  <span className="label-low">50%</span>
                  <span className="label-medium">75%</span>
                  <span className="label-high">100%</span>
                </div>
              </div>
              <div className="gauge-stats">
                <div className="stat-item">
                  <span className="stat-label">Target</span>
                  <span className="stat-value">85%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Actual</span>
                  <span className="stat-value highlight">{data.productivityScore || data.productivity}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Variance</span>
                  <span className="stat-value positive">+{(data.productivityScore || data.productivity) - 85}%</span>
                </div>
              </div>
            </div>
          </div> */}

          {/* Time Distribution */}
          <div className="chart-box">
            <h3>
              {reportType === 'weekly' ? '📅 Daily Hours Distribution' : '📈 Weekly Trends'}
            </h3>
            <div className="time-distribution">
              <div className="distribution-chart">
                {(reportType === 'weekly' ? data.dailyHours : data.weeklyTrends).map((item, index) => (
                  <div key={index} className="distribution-item">
                    <div className="item-header">
                      <span className="item-label">
                        {reportType === 'weekly' ? item.day : item.week}
                      </span>
                      <span className="item-value">
                        {reportType === 'weekly' ? `${item.hours}h` : `${item.hours}h`}
                      </span>
                    </div>
                    <div className="item-bar-container">
                      <div 
                        className="item-bar" 
                        style={{
                          width: `${reportType === 'weekly' ? 
                            (item.hours / Math.max(...data.dailyHours.map(d => d.hours))) * 100 :
                            (item.productivity / 100) * 100}%`,
                          background: item.productivity >= 90 ? '#10b981' : 
                                    item.productivity >= 80 ? '#f59e0b' : '#ef4444'
                        }}
                      ></div>
                    </div>
                    <div className="item-footer">
                      <span className="item-detail">
                        Avg: {reportType === 'weekly' ? `${item.avg}h` : `${item.productivity}%`}
                      </span>
                      <span className="item-productivity">
                        {item.productivity}% productive
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="report-section">
          <h3>🏆 Top Performers</h3>
          <div className="performers-grid">
            {data.topPerformers?.map((performer, index) => (
              <div key={index} className="performer-card">
                <div className="performer-rank">
                  <span className="rank-number">{index + 1}</span>
                  <div className="rank-medal">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '⭐'}
                  </div>
                </div>
                <div className="performer-info">
                  <div className="performer-header">
                    <strong>{performer.name}</strong>
                    <span className="performer-dept">{performer.department}</span>
                  </div>
                  <div className="performer-stats">
                    <div className="stat">
                      <span className="stat-label">Hours Worked</span>
                      <span className="stat-value">{performer.hours}h</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Productivity</span>
                      <span className="stat-value highlight">{performer.productivity}%</span>
                    </div>
                  </div>
                  <div className="performer-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${performer.productivity}%`,
                          background: performer.productivity >= 95 ? '#10b981' : '#3b82f6'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <button className="btn-icon" title="View Details">
                  👁️
                </button>
              </div>
            ))}
          </div>

          {/* Department Performance */}
          <h3>🏢 Department Performance</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Employees</th>
                  <th>Avg Hours</th>
                  <th>Productivity</th>
                  <th>Overtime (h)</th>
                  <th>Attendance %</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {data.departmentStats?.map((dept, index) => (
                  <tr key={index}>
                    <td><strong>{dept.dept}</strong></td>
                    <td>{dept.employees}</td>
                    <td>{dept.avgHours}h</td>
                    <td>
                      <div className="productivity-cell">
                        <span className="productivity-value">{dept.productivity}%</span>
                        <div className="productivity-bar">
                          <div 
                            className="bar-fill" 
                            style={{ 
                              width: `${dept.productivity}%`,
                              background: dept.productivity >= 90 ? '#10b981' : 
                                        dept.productivity >= 80 ? '#f59e0b' : '#ef4444'
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>{dept.overtime}h</td>
                    <td>{Math.round(dept.attendance || 95)}%</td>
                    <td>
                      <span className={`performance-badge ${
                        dept.productivity >= 90 ? 'excellent' :
                        dept.productivity >= 80 ? 'good' : 'average'
                      }`}>
                        {dept.productivity >= 90 ? 'Excellent' :
                         dept.productivity >= 80 ? 'Good' : 'Average'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="report-section">
          <div className="analytics-grid">
            {/* <div className="analytics-card">
              <h3>📈 Productivity Trend</h3>
              <div className="trend-chart">
                {[65, 72, 80, 85, 88, 90, 92].map((value, index) => (
                  <div key={index} className="trend-point">
                    <div 
                      className="point-value" 
                      style={{ height: `${value}%` }}
                      title={`${value}%`}
                    ></div>
                    <div className="point-label">W{index + 1}</div>
                  </div>
                ))}
              </div>
              <div className="trend-stats">
                <div className="trend-item">
                  <span className="trend-label">Current</span>
                  <span className="trend-value">92%</span>
                </div>
                <div className="trend-item">
                  <span className="trend-label">Growth</span>
                  <span className="trend-value positive">+27%</span>
                </div>
                <div className="trend-item">
                  <span className="trend-label">Target</span>
                  <span className="trend-value">85%</span>
                </div>
              </div>
            </div> */}

            <div className="analytics-card">
              <h3>⏱️ Hours Distribution</h3>
              <div className="hours-distribution">
                <div className="distribution-pie">
                  <div className="pie-segment coding"></div>
                  <div className="pie-segment meetings"></div>
                  <div className="pie-segment planning"></div>
                  <div className="pie-segment breaks"></div>
                  <div className="pie-center">
                    <span className="pie-total">{data.totalHours}h</span>
                    <span className="pie-label">Total</span>
                  </div>
                </div>
                <div className="distribution-legend">
                  <div className="legend-item">
                    <span className="legend-dot coding"></span>
                    <span>Coding (45%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot meetings"></span>
                    <span>Meetings (20%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot planning"></span>
                    <span>Planning (18%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot breaks"></span>
                    <span>Breaks (17%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overtime Analysis */}
          <div className="chart-box">
            <h3>⚠️ Overtime Analysis</h3>
            <div className="overtime-analysis">
              <div className="overtime-stats">
                <div className="overtime-item">
                  <span className="overtime-label">Total Overtime</span>
                  <span className="overtime-value">112h</span>
                </div>
                <div className="overtime-item">
                  <span className="overtime-label">Avg/Employee</span>
                  <span className="overtime-value">14h</span>
                </div>
                <div className="overtime-item">
                  <span className="overtime-label">Highest Dept</span>
                  <span className="overtime-value">Engineering (45h)</span>
                </div>
              </div>
              <div className="overtime-chart">
                {data.departmentStats?.map((dept, index) => (
                  <div key={index} className="overtime-bar">
                    <div className="bar-label">{dept.dept}</div>
                    <div className="bar-container">
                      <div 
                        className="bar-fill" 
                        style={{ 
                          width: `${(dept.overtime / 50) * 100}%`,
                          background: dept.overtime > 30 ? '#ef4444' : 
                                    dept.overtime > 20 ? '#f59e0b' : '#10b981'
                        }}
                      ></div>
                    </div>
                    <div className="bar-value">{dept.overtime}h</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="report-section">
          <div className="report-details">
            <h3>📋 Detailed Analysis</h3>
            <div className="detail-sections">
              <div className="detail-section">
                <h4>🎯 Key Metrics</h4>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <span className="metric-label">Peak Productivity Time</span>
                    <span className="metric-value">2:00 PM - 4:00 PM</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Most Productive Day</span>
                    <span className="metric-value">Tuesday</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Avg Start Time</span>
                    <span className="metric-value">9:15 AM</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Avg End Time</span>
                    <span className="metric-value">6:30 PM</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Break Duration</span>
                    <span className="metric-value">48 mins avg</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Meeting Hours</span>
                    <span className="metric-value">18% of total</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>📊 Recommendations</h4>
                <div className="recommendations">
                  <div className="recommendation-item positive">
                    <span className="rec-icon">✅</span>
                    <div>
                      <strong>Excellent productivity levels maintained</strong>
                      <p>Team is consistently performing above 90% productivity target</p>
                    </div>
                  </div>
                  <div className="recommendation-item warning">
                    <span className="rec-icon">⚠️</span>
                    <div>
                      <strong>Monitor Engineering overtime</strong>
                      <p>Engineering department has 45h overtime this month</p>
                    </div>
                  </div>
                  <div className="recommendation-item info">
                    <span className="rec-icon">💡</span>
                    <div>
                      <strong>Optimize meeting schedules</strong>
                      <p>Consider moving meetings to less productive hours (11 AM)</p>
                    </div>
                  </div>
                  <div className="recommendation-item success">
                    <span className="rec-icon">🎯</span>
                    <div>
                      <strong>Recognize top performers</strong>
                      <p>Sneha Reddy achieved 96% productivity this week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn-primary">
                📥 Download Full Report
              </button>
              <button className="btn-secondary">
                📋 Generate Custom Report
              </button>
              <button className="btn-icon">
                🔄 Compare with Previous Period
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin-top: 4px;
        }
        
        .report-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .action-buttons {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .report-tabs {
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
        
        .report-section {
          animation: fadeIn 0.3s ease;
        }
        
        .card-trend {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 4px;
        }
        
        .productivity-gauge {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-top: 20px;
        }
        
        .gauge-container {
          position: relative;
          width: 200px;
          height: 100px;
          overflow: hidden;
        }
        
        .gauge {
          width: 200px;
          height: 100px;
          position: relative;
        }
        
        .gauge::before {
          content: '';
          position: absolute;
          width: 160px;
          height: 80px;
          border: 20px solid #334155;
          border-top: none;
          border-radius: 0 0 160px 160px;
          box-sizing: border-box;
        }
        
        .gauge-fill {
          position: absolute;
          width: 160px;
          height: 80px;
          border: 20px solid #10b981;
          border-top: none;
          border-radius: 0 0 160px 160px;
          box-sizing: border-box;
          transform-origin: center top;
          transform: rotate(0deg);
          transition: transform 1s ease;
        }
        
        .gauge-center {
          position: absolute;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }
        
        .gauge-value {
          font-size: 24px;
          font-weight: 700;
          color: #10b981;
          display: block;
        }
        
        .gauge-label {
          font-size: 12px;
          color: #94a3b8;
          display: block;
        }
        
        .gauge-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 12px;
          color: #94a3b8;
        }
        
        .gauge-stats {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        
        .stat-item {
          text-align: center;
          padding: 12px;
          background: #334155;
          border-radius: 6px;
        }
        
        .stat-label {
          display: block;
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        
        .stat-value {
          display: block;
          font-size: 18px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .stat-value.highlight {
          color: #10b981;
        }
        
        .stat-value.positive {
          color: #10b981;
        }
        
        .stat-value.negative {
          color: #ef4444;
        }
        
        .time-distribution {
          margin-top: 20px;
        }
        
        .distribution-item {
          margin-bottom: 16px;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .item-label {
          color: #f1f5f9;
          font-weight: 500;
        }
        
        .item-value {
          color: #3b82f6;
          font-weight: 600;
        }
        
        .item-bar-container {
          height: 8px;
          background: #334155;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .item-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .item-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 4px;
          font-size: 12px;
        }
        
        .item-detail {
          color: #94a3b8;
        }
        
        .item-productivity {
          color: #10b981;
          font-weight: 500;
        }
        
        .performers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          margin: 20px 0;
        }
        
        .performer-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: #1e293b;
          border-radius: 8px;
          border: 1px solid #334155;
        }
        
        .performer-rank {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        
        .rank-number {
          font-size: 24px;
          font-weight: 700;
          color: #f1f5f9;
        }
        
        .rank-medal {
          font-size: 24px;
        }
        
        .performer-info {
          flex: 1;
        }
        
        .performer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .performer-header strong {
          font-size: 16px;
          color: #f1f5f9;
        }
        
        .performer-dept {
          font-size: 12px;
          color: #94a3b8;
          background: rgba(59, 130, 246, 0.1);
          padding: 2px 8px;
          border-radius: 12px;
        }
        
        .performer-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 8px;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
        }
        
        .stat-label {
          font-size: 11px;
          color: #94a3b8;
        }
        
        .stat-value {
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .performer-progress {
          margin-top: 8px;
        }
        
        .progress-bar {
          height: 4px;
          background: #334155;
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        
        .productivity-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .productivity-value {
          min-width: 40px;
          font-weight: 600;
        }
        
        .productivity-bar {
          flex: 1;
          height: 6px;
          background: #334155;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .performance-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .performance-badge.excellent {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .performance-badge.good {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }
        
        .performance-badge.average {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 16px;
          margin: 20px 0;
        }
        
        .analytics-card {
          background: #1e293b;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #334155;
        }
        
        .trend-chart {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          height: 150px;
          margin: 20px 0;
        }
        
        .trend-point {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .point-value {
          width: 20px;
          background: #3b82f6;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }
        
        .point-label {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .trend-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .trend-item {
          text-align: center;
          padding: 8px;
          background: #334155;
          border-radius: 6px;
        }
        
        .trend-label {
          display: block;
          font-size: 11px;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        
        .trend-value {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .trend-value.positive {
          color: #10b981;
        }
        
        .hours-distribution {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-top: 20px;
        }
        
        .distribution-pie {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: conic-gradient(
            #3b82f6 0% 45%,
            #8b5cf6 45% 65%,
            #f59e0b 65% 83%,
            #ef4444 83% 100%
          );
          position: relative;
        }
        
        .pie-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: #1e293b;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .pie-total {
          font-size: 18px;
          font-weight: 700;
          color: #f1f5f9;
        }
        
        .pie-label {
          font-size: 11px;
          color: #94a3b8;
        }
        
        .distribution-legend {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
        }
        
        .legend-dot.coding {
          background: #3b82f6;
        }
        
        .legend-dot.meetings {
          background: #8b5cf6;
        }
        
        .legend-dot.planning {
          background: #f59e0b;
        }
        
        .legend-dot.breaks {
          background: #ef4444;
        }
        
        .overtime-analysis {
          margin-top: 20px;
        }
        
        .overtime-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .overtime-item {
          padding: 12px;
          background: #334155;
          border-radius: 6px;
        }
        
        .overtime-label {
          display: block;
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        
        .overtime-value {
          display: block;
          font-size: 16px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .overtime-chart {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .overtime-bar {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .bar-label {
          width: 100px;
          color: #f1f5f9;
          font-size: 14px;
        }
        
        .bar-container {
          flex: 1;
          height: 20px;
          background: #334155;
          border-radius: 10px;
          overflow: hidden;
        }
        
        .bar-value {
          width: 60px;
          text-align: right;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .report-details {
          background: #1e293b;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #334155;
        }
        
        .detail-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin: 20px 0;
        }
        
        .detail-section h4 {
          margin-bottom: 16px;
          color: #f1f5f9;
          font-size: 16px;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .metric-item {
          padding: 12px;
          background: #334155;
          border-radius: 6px;
        }
        
        .metric-label {
          display: block;
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        
        .metric-value {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .recommendations {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .recommendation-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          border-radius: 6px;
        }
        
        .recommendation-item.positive {
          background: rgba(16, 185, 129, 0.1);
          border-left: 3px solid #10b981;
        }
        
        .recommendation-item.warning {
          background: rgba(245, 158, 11, 0.1);
          border-left: 3px solid #f59e0b;
        }
        
        .recommendation-item.info {
          background: rgba(59, 130, 246, 0.1);
          border-left: 3px solid #3b82f6;
        }
        
        .recommendation-item.success {
          background: rgba(139, 92, 246, 0.1);
          border-left: 3px solid #8b5cf6;
        }
        
        .rec-icon {
          font-size: 20px;
          flex-shrink: 0;
        }
        
        .recommendation-item strong {
          display: block;
          margin-bottom: 4px;
          color: #f1f5f9;
        }
        
        .recommendation-item p {
          font-size: 13px;
          color: #94a3b8;
          margin: 0;
        }
        
        .detail-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          flex-wrap: wrap;
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
          .report-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          
          .action-buttons {
            flex-wrap: wrap;
          }
          
          .productivity-gauge {
            flex-direction: column;
            gap: 20px;
          }
          
          .gauge-stats {
            width: 100%;
          }
          
          .performers-grid {
            grid-template-columns: 1fr;
          }
          
          .analytics-grid {
            grid-template-columns: 1fr;
          }
          
          .hours-distribution {
            flex-direction: column;
            gap: 20px;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .detail-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportsPage;