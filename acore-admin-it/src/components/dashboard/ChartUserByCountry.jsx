import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './ChartUserByCountry.css';

const ChartUserByCountry = () => {
  const countries = [
    { 
      name: 'India', 
      value: 50, 
      users: 50000,
      color: '#6366f1',
      flag: '🇮🇳'
    },
    { 
      name: 'USA', 
      value: 35, 
      users: 35000,
      color: '#3b82f6',
      flag: '🇺🇸'
    },
    { 
      name: 'Brazil', 
      value: 10, 
      users: 10000,
      color: '#10b981',
      flag: '🇧🇷'
    },
    { 
      name: 'Other', 
      value: 5, 
      users: 5000,
      color: '#8b5cf6',
      flag: '🌍'
    },
  ];

  const pieData = countries.map(country => ({
    name: country.name,
    value: country.users,
    color: country.color
  }));

  const totalUsers = countries.reduce((sum, country) => sum + country.users, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalUsers) * 100).toFixed(1);
      
      return (
        <div className="custom-tooltip">
          <div className="tooltip-content">
            <div className="tooltip-header">
              <span className="country-flag">{data.flag}</span>
              <span className="country-name">{data.name}</span>
            </div>
            <div className="tooltip-stats">
              <div className="stat-row">
                <span>Users:</span>
                <span className="stat-value">{data.value.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span>Percentage:</span>
                <span className="stat-value">{percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-user-country">
      <div className="chart-header">
        <h3 className="chart-title">Users by Country</h3>
        <div className="chart-actions">
          <button className="chart-action-btn" title="Refresh">
            🔄
          </button>
          <button className="chart-action-btn" title="Export">
            📥
          </button>
        </div>
      </div>

      <div className="chart-container">
        <div className="pie-chart-section">
          <div className="pie-chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="pie-center-label">
              <div className="total-users">{totalUsers.toLocaleString()}</div>
              <div className="total-label">Total Users</div>
            </div>
          </div>
        </div>

        <div className="country-details">
          {countries.map((country, index) => (
            <div key={index} className="country-item">
              <div className="country-header">
                <div className="country-flag">{country.flag}</div>
                <div className="country-info">
                  <span className="country-name">{country.name}</span>
                  <span className="country-percentage">{country.value}%</span>
                </div>
              </div>
              
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${country.value}%`,
                      backgroundColor: country.color
                    }}
                  ></div>
                </div>
                <div className="progress-stats">
                  <span className="user-count">{country.users.toLocaleString()} users</span>
                  <span className="growth-rate">
                    {country.name === 'India' && '+12%'}
                    {country.name === 'USA' && '+8%'}
                    {country.name === 'Brazil' && '+15%'}
                    {country.name === 'Other' && '+5%'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-footer">
        <div className="legend">
          {countries.map((country, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: country.color }}
              ></div>
              <span className="legend-label">{country.name}</span>
              <span className="legend-value">{country.value}%</span>
            </div>
          ))}
        </div>
        
        <div className="time-range">
          <span className="time-label">Last 30 days</span>
          <button className="time-change-btn">📅 Change Period</button>
        </div>
      </div>
    </div>
  );
};

export default ChartUserByCountry;