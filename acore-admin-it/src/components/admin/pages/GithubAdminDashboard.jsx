import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDailyCommitReport,
  getExceptionRequests,
  updateExceptionStatus,
  getEmployeeCommitHistory,
  setFilter,
  clearErrors,
} from '../../../redux/slices/adminGithubSlice';
import { useToast } from '../../../hooks/useToast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
  FiUsers, FiCheckCircle, FiXCircle, FiClock,
  FiCalendar, FiFilter, FiDownload, FiRefreshCw,
  FiSearch, FiEye, FiCheck, FiX, FiGitCommit
} from 'react-icons/fi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const GithubAdminDashboard = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
    const { currentUser } = useSelector((state) => state.adminAuth);
  
  // Redux state
  const {
    dailyReport,
    exceptionRequests,
    employeeHistory,
    loading,
    errors,
    filters,
  } = useSelector((state) => state.adminGithub);

  // Local states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetchDailyReport();
      fetchExceptionRequests();
    }
  }, [currentUser]);

  // Fetch daily report
  const fetchDailyReport = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    dispatch(setFilter({ key: 'date', value: dateStr }));
    dispatch(getDailyCommitReport({ date: dateStr }))
      .unwrap()
      .catch(error => {
        showToast(error || 'Failed to load daily report', 'error');
      });
  };

  // Fetch exception requests
  const fetchExceptionRequests = (status = 'all') => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    dispatch(getExceptionRequests({ status, date: dateStr }))
      .unwrap()
      .catch(error => {
        showToast(error || 'Failed to load exception requests', 'error');
      });
  };

  // Fetch employee history
  const fetchEmployeeHistory = (employeeId) => {
    dispatch(getEmployeeCommitHistory({ employeeId }))
      .unwrap()
      .then(() => {
        setActiveTab('employee-details');
        setSelectedEmployee(employeeId);
      })
      .catch(error => {
        showToast(error || 'Failed to load employee history', 'error');
      });
  };

  // Handle exception action
  const handleExceptionAction = async (requestId, action) => {
    if (action === 'reject' && !rejectionReason.trim()) {
      showToast('Please enter rejection reason', 'error');
      return;
    }

    try {
      await dispatch(updateExceptionStatus({
        requestId,
        action,
        rejectionReason: action === 'reject' ? rejectionReason : undefined
      })).unwrap();

      showToast(`Exception ${action}ed successfully`, 'success');
      setShowRejectModal(null);
      setRejectionReason('');
      fetchExceptionRequests();
    } catch (error) {
      showToast(error || `Failed to ${action} exception`, 'error');
    }
  };

  // Filter employees based on search
  const filteredEmployees = dailyReport?.report?.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Calculate statistics
  const stats = dailyReport?.stats || {
    totalEmployees: 0,
    committed: 0,
    exceptions: 0,
    pending: 0,
  };

  // Chart data for commits
  const chartData = dailyReport?.report?.map(emp => ({
    name: emp.name,
    commits: emp.hasCommitted ? 1 : 0,
    exceptions: emp.hasException ? 1 : 0,
    pending: !emp.hasCommitted && !emp.hasException ? 1 : 0,
  })) || [];

  // Pie chart data
  const pieData = [
    { name: 'Committed', value: stats.committed, color: '#10B981' },
    { name: 'Exceptions', value: stats.exceptions, color: '#F59E0B' },
    { name: 'Pending', value: stats.pending, color: '#EF4444' },
  ];

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTimeout(() => fetchDailyReport(), 100);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!dailyReport?.report) return;

    const headers = ['Employee ID', 'Name', 'Department', 'GitHub', 'Status', 'Commit URL', 'Exception Token'];
    const rows = dailyReport.report.map(emp => [
      emp.employeeId,
      emp.name,
      emp.department,
      emp.githubUsername || 'N/A',
      emp.status,
      emp.commitData?.url || 'N/A',
      emp.exceptionData?.token || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `github-report-${filters.date}.csv`;
    a.click();
  };

  // Render loading skeleton
  if (loading.dailyReport && !dailyReport) {
    return (
      <div style={styles.container}>
        <div style={styles.skeletonHeader}></div>
        <div style={styles.skeletonStats}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={styles.skeletonStatCard}></div>
          ))}
        </div>
        <div style={styles.skeletonTable}></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            <FiGitCommit style={styles.titleIcon} />
            GitHub Commit Dashboard
          </h1>
          <p style={styles.subtitle}>
            Monitor daily code commits and exception requests
          </p>
        </div>
        
        <div style={styles.headerActions}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            customInput={
              <button style={styles.dateButton}>
                <FiCalendar style={{ marginRight: '8px' }} />
                {selectedDate.toISOString().split('T')[0]}
              </button>
            }
          />
          
          <button
            style={styles.refreshButton}
            onClick={fetchDailyReport}
            disabled={loading.dailyReport}
          >
            <FiRefreshCw style={loading.dailyReport ? styles.spinning : {}} />
            {loading.dailyReport ? 'Refreshing...' : 'Refresh'}
          </button>
          
          <button
            style={styles.exportButton}
            onClick={exportToCSV}
            disabled={!dailyReport}
          >
            <FiDownload />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIconContainer}>
            <FiUsers style={styles.statIcon} />
          </div>
          <div style={styles.statContent}>
            <h3 style={styles.statValue}>{stats.totalEmployees}</h3>
            <p style={styles.statLabel}>Total Employees</p>
          </div>
        </div>
        
        <div style={{...styles.statCard, borderLeft: '4px solid #10B981'}}>
          <div style={{...styles.statIconContainer, background: '#D1FAE5'}}>
            <FiCheckCircle style={{...styles.statIcon, color: '#10B981'}} />
          </div>
          <div style={styles.statContent}>
            <h3 style={{...styles.statValue, color: '#10B981'}}>{stats.committed}</h3>
            <p style={styles.statLabel}>Committed Today</p>
          </div>
          <div style={styles.statBadge}>
            {stats.totalEmployees > 0 ? 
              `${Math.round((stats.committed / stats.totalEmployees) * 100)}%` : '0%'
            }
          </div>
        </div>
        
        <div style={{...styles.statCard, borderLeft: '4px solid #F59E0B'}}>
          <div style={{...styles.statIconContainer, background: '#FEF3C7'}}>
            <FiClock style={{...styles.statIcon, color: '#F59E0B'}} />
          </div>
          <div style={styles.statContent}>
            <h3 style={{...styles.statValue, color: '#F59E0B'}}>{stats.exceptions}</h3>
            <p style={styles.statLabel}>Exceptions</p>
          </div>
        </div>
        
        <div style={{...styles.statCard, borderLeft: '4px solid #EF4444'}}>
          <div style={{...styles.statIconContainer, background: '#FEE2E2'}}>
            <FiXCircle style={{...styles.statIcon, color: '#EF4444'}} />
          </div>
          <div style={styles.statContent}>
            <h3 style={{...styles.statValue, color: '#EF4444'}}>{stats.pending}</h3>
            <p style={styles.statLabel}>Pending</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={activeTab === 'overview' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          style={activeTab === 'exceptions' ? styles.activeTab : styles.tab}
          onClick={() => {
            setActiveTab('exceptions');
            fetchExceptionRequests('pending');
          }}
        >
          Exception Requests
          {exceptionRequests?.count > 0 && (
            <span style={styles.badge}>{exceptionRequests.count}</span>
          )}
        </button>
        <button
          style={activeTab === 'analytics' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <div style={styles.searchBox}>
          <FiSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search employees by name, ID, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.filterButtons}>
          <button
            style={styles.filterButton}
            onClick={() => fetchExceptionRequests('all')}
          >
            <FiFilter /> All
          </button>
          <button
            style={styles.filterButton}
            onClick={() => fetchExceptionRequests('pending')}
          >
            <FiClock /> Pending
          </button>
          <button
            style={styles.filterButton}
            onClick={() => fetchExceptionRequests('approved')}
          >
            <FiCheck /> Approved
          </button>
          <button
            style={styles.filterButton}
            onClick={() => fetchExceptionRequests('rejected')}
          >
            <FiX /> Rejected
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div style={styles.content}>
        {activeTab === 'overview' && (
          <>
            {/* Charts */}
            <div style={styles.chartsGrid}>
              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>Commit Distribution</h3>
                <div style={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>Employee Performance</h3>
                <div style={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="commits" fill="#10B981" name="Committed" />
                      <Bar dataKey="exceptions" fill="#F59E0B" name="Exceptions" />
                      <Bar dataKey="pending" fill="#EF4444" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Employees Table */}
            <div style={styles.tableCard}>
              <h3 style={styles.tableTitle}>
                Employee Commit Status for {filters.date}
              </h3>
              
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Employee</th>
                      <th style={styles.tableHeader}>Department</th>
                      <th style={styles.tableHeader}>GitHub</th>
                      <th style={styles.tableHeader}>Status</th>
                      <th style={styles.tableHeader}>Commit</th>
                      <th style={styles.tableHeader}>Exception</th>
                      <th style={styles.tableHeader}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((emp, index) => (
                        <tr key={emp.employeeId} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                          <td style={styles.tableCell}>
                            <div style={styles.employeeInfo}>
                              <div style={styles.avatar}>
                                {emp.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div style={styles.employeeName}>{emp.name}</div>
                                <div style={styles.employeeId}>{emp.employeeId}</div>
                              </div>
                            </div>
                          </td>
                          <td style={styles.tableCell}>
                            <span style={styles.departmentBadge}>
                              {emp.department}
                            </span>
                          </td>
                          <td style={styles.tableCell}>
                            <a
                              href={`https://github.com/${emp.githubUsername}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={styles.githubLink}
                            >
                              {emp.githubUsername || 'N/A'}
                            </a>
                          </td>
                          <td style={styles.tableCell}>
                            <span style={{
                              ...styles.statusBadge,
                              ...(emp.status === 'committed' ? styles.statusSuccess :
                                  emp.status === 'exception' ? styles.statusWarning :
                                  styles.statusError)
                            }}>
                              {emp.status === 'committed' ? '✅ Committed' :
                               emp.status === 'exception' ? '⚠️ Exception' : '❌ Pending'}
                            </span>
                          </td>
                          <td style={styles.tableCell}>
                            {emp.commitData ? (
                              <a
                                href={emp.commitData.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.commitLink}
                              >
                                <FiEye /> View
                              </a>
                            ) : (
                              <span style={styles.noData}>No commit</span>
                            )}
                          </td>
                          <td style={styles.tableCell}>
                            {emp.exceptionData ? (
                              <div>
                                <div style={styles.token}>
                                  {emp.exceptionData.token.substring(0, 8)}...
                                </div>
                                <div style={styles.reason}>
                                  {emp.exceptionData.reason}
                                </div>
                              </div>
                            ) : (
                              <span style={styles.noData}>No exception</span>
                            )}
                          </td>
                          <td style={styles.tableCell}>
                            <div style={styles.actionButtons}>
                              <button
                                style={styles.viewButton}
                                onClick={() => fetchEmployeeHistory(emp.employeeId)}
                                title="View History"
                              >
                                <FiEye />
                              </button>
                              <button
                                style={styles.messageButton}
                                onClick={() => {
                                  // Implement message feature
                                }}
                                title="Send Reminder"
                              >
                                💬
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" style={styles.noResults}>
                          No employees found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'exceptions' && (
          <div style={styles.tableCard}>
            <h3 style={styles.tableTitle}>
              Exception Requests ({exceptionRequests?.count || 0})
            </h3>
            
            {exceptionRequests?.data?.length > 0 ? (
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Employee</th>
                      <th style={styles.tableHeader}>Reason</th>
                      <th style={styles.tableHeader}>Status</th>
                      <th style={styles.tableHeader}>Requested</th>
                      <th style={styles.tableHeader}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exceptionRequests.data.map((req, index) => (
                      <tr key={req.id} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                        <td style={styles.tableCell}>
                          <div style={styles.employeeInfo}>
                            <div style={styles.avatar}>
                              {req.employeeName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div style={styles.employeeName}>{req.employeeName}</div>
                              <div style={styles.employeeId}>{req.employeeId}</div>
                              <div style={styles.department}>{req.department}</div>
                            </div>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.reasonText}>{req.reason}</div>
                        </td>
                        <td style={styles.tableCell}>
                          <span style={{
                            ...styles.statusBadge,
                            ...(req.status === 'approved' ? styles.statusSuccess :
                                req.status === 'rejected' ? styles.statusError :
                                styles.statusWarning)
                          }}>
                            {req.status.toUpperCase()}
                          </span>
                          {req.rejectionReason && (
                            <div style={styles.rejectionReason}>
                              Reason: {req.rejectionReason}
                            </div>
                          )}
                        </td>
                        <td style={styles.tableCell}>
                          {new Date(req.createdAt).toLocaleString()}
                        </td>
                        <td style={styles.tableCell}>
                          {req.status === 'pending' ? (
                            <div style={styles.exceptionActions}>
                              <button
                                style={styles.approveButton}
                                onClick={() => handleExceptionAction(req.id, 'approve')}
                                disabled={loading.updateException}
                              >
                                <FiCheck /> Approve
                              </button>
                              <button
                                style={styles.rejectButton}
                                onClick={() => setShowRejectModal(req.id)}
                              >
                                <FiX /> Reject
                              </button>
                            </div>
                          ) : req.token ? (
                            <div style={styles.tokenDisplay}>
                              <strong>Token:</strong>
                              <code style={styles.exceptionToken}>
                                {req.token}
                              </code>
                            </div>
                          ) : (
                            <span style={styles.noData}>Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📝</div>
                <h4>No exception requests</h4>
                <p>All employees have committed code today</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={styles.analyticsGrid}>
            <div style={styles.analyticsCard}>
              <h3 style={styles.analyticsTitle}>Commit Trends</h3>
              {/* Add trend chart here */}
            </div>
            <div style={styles.analyticsCard}>
              <h3 style={styles.analyticsTitle}>Department Performance</h3>
              {/* Add department chart here */}
            </div>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Reject Exception Request</h3>
            <p style={styles.modalText}>
              Please provide a reason for rejecting this exception request.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              style={styles.modalTextarea}
              rows={4}
            />
            <div style={styles.modalActions}>
              <button
                style={styles.modalCancel}
                onClick={() => {
                  setShowRejectModal(null);
                  setRejectionReason('');
                }}
              >
                Cancel
              </button>
              <button
                style={styles.modalReject}
                onClick={() => handleExceptionAction(showRejectModal, 'reject')}
                disabled={!rejectionReason.trim()}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============== STYLES ==============
const styles = {
  container: {
    padding: '24px',
    background: '#f8fafc',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  titleIcon: {
    fontSize: '32px',
    color: '#3b82f6',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: '4px 0 0 0',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  dateButton: {
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
    ':hover': {
      borderColor: '#3b82f6',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.1)',
    },
  },
  refreshButton: {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    ':hover': {
      background: '#2563eb',
      transform: 'translateY(-1px)',
    },
    ':disabled': {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
  },
  exportButton: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    ':hover': {
      background: '#059669',
      transform: 'translateY(-1px)',
    },
    ':disabled': {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    position: 'relative',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
  },
  statIconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    background: '#dbeafe',
  },
  statIcon: {
    fontSize: '24px',
    color: '#3b82f6',
  },
  statContent: {
    flex: '1',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0',
  },
  statBadge: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: '#f0f9ff',
    color: '#0369a1',
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '20px',
    border: '1px solid #bae6fd',
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    background: '#f1f5f9',
    borderRadius: '8px',
    padding: '4px',
    marginBottom: '24px',
  },
  tab: {
    flex: '1',
    background: 'transparent',
    border: 'none',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#64748b',
    cursor: 'pointer',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  activeTab: {
    flex: '1',
    background: 'white',
    border: 'none',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#3b82f6',
    cursor: 'pointer',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  badge: {
    background: '#ef4444',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    padding: '2px 8px',
    borderRadius: '10px',
    minWidth: '20px',
    height: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  searchBox: {
    flex: '1',
    minWidth: '300px',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    fontSize: '18px',
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px 12px 48px',
    fontSize: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    background: 'white',
    transition: 'all 0.2s',
    ':focus': {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
  },
  filterButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  filterButton: {
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    ':hover': {
      borderColor: '#3b82f6',
      color: '#3b82f6',
    },
  },
  content: {
    marginTop: '16px',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  chartCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  chartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 20px 0',
  },
  chartContainer: {
    height: '300px',
  },
  tableCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  tableTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 20px 0',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '2px solid #e2e8f0',
    whiteSpace: 'nowrap',
  },
  tableRowEven: {
    background: '#f8fafc',
  },
  tableRowOdd: {
    background: 'white',
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#475569',
    borderBottom: '1px solid #e2e8f0',
  },
  employeeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px',
  },
  employeeName: {
    fontWeight: '600',
    color: '#1e293b',
  },
  employeeId: {
    fontSize: '12px',
    color: '#64748b',
  },
  departmentBadge: {
    background: '#f0f9ff',
    color: '#0369a1',
    fontSize: '12px',
    fontWeight: '500',
    padding: '4px 10px',
    borderRadius: '20px',
    border: '1px solid #bae6fd',
  },
  githubLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  statusBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statusSuccess: {
    background: '#d1fae5',
    color: '#065f46',
  },
  statusWarning: {
    background: '#fef3c7',
    color: '#92400e',
  },
  statusError: {
    background: '#fee2e2',
    color: '#991b1b',
  },
  commitLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  noData: {
    color: '#94a3b8',
    fontStyle: 'italic',
    fontSize: '13px',
  },
  token: {
    fontFamily: "'Courier New', monospace",
    fontSize: '12px',
    background: '#f1f5f9',
    padding: '4px 8px',
    borderRadius: '4px',
    marginBottom: '4px',
  },
  reason: {
    fontSize: '12px',
    color: '#64748b',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  viewButton: {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    ':hover': {
      background: '#2563eb',
    },
  },
  messageButton: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    transition: 'all 0.2s',
    ':hover': {
      background: '#059669',
    },
  },
  noResults: {
    textAlign: 'center',
    padding: '40px',
    color: '#94a3b8',
    fontSize: '16px',
  },
  exceptionActions: {
    display: 'flex',
    gap: '8px',
  },
  approveButton: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
    ':hover': {
      background: '#059669',
    },
    ':disabled': {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
  },
  rejectButton: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
    ':hover': {
      background: '#dc2626',
    },
  },
  tokenDisplay: {
    fontSize: '12px',
  },
  exceptionToken: {
    fontFamily: "'Courier New', monospace",
    background: '#f1f5f9',
    padding: '4px 8px',
    borderRadius: '4px',
    marginLeft: '8px',
  },
  rejectionReason: {
    fontSize: '11px',
    color: '#ef4444',
    marginTop: '4px',
    fontStyle: 'italic',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
  },
  analyticsCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  analyticsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 20px 0',
  },
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
  },
  modal: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    width: '500px',
    maxWidth: '90%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 16px 0',
  },
  modalText: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 20px 0',
  },
  modalTextarea: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    marginBottom: '24px',
    resize: 'vertical',
    ':focus': {
      outline: 'none',
      borderColor: '#3b82f6',
    },
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  modalCancel: {
    background: 'white',
    border: '1px solid #e2e8f0',
    color: '#475569',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      borderColor: '#94a3b8',
    },
  },
  modalReject: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      background: '#dc2626',
    },
    ':disabled': {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
  },
  spinning: {
    animation: 'spin 1s linear infinite',
  },
  skeletonHeader: {
    height: '60px',
    background: '#e2e8f0',
    borderRadius: '8px',
    marginBottom: '24px',
    animation: 'pulse 2s infinite',
  },
  skeletonStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },
  skeletonStatCard: {
    height: '120px',
    background: '#e2e8f0',
    borderRadius: '12px',
    animation: 'pulse 2s infinite',
  },
  skeletonTable: {
    height: '400px',
    background: '#e2e8f0',
    borderRadius: '12px',
    animation: 'pulse 2s infinite',
  },
};

// Global styles for animations
const GlobalStyles = () => (
  <style>
    {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      @media (max-width: 768px) {
        .charts-grid {
          grid-template-columns: 1fr;
        }
        
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .header-actions {
          flex-direction: column;
          align-items: stretch;
        }
        
        .filter-buttons {
          justify-content: flex-start;
        }
      }
      
      @media (max-width: 480px) {
        .stats-grid {
          grid-template-columns: 1fr;
        }
        
        .search-box {
          min-width: 100%;
        }
      }
    `}
  </style>
);

export default GithubAdminDashboard;