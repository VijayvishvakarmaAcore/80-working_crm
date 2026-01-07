// import React, { useState, useEffect } from "react";

// const AnnouncementsPage = () => {
//   const [announcements, setAnnouncements] = useState([
//     {
//       id: 1,
//       title: "Server Maintenance",
//       content: "Server will be down today from 10PM to 1AM.",
//       date: "2025-02-20",
//       status: "Active",
//       image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
//     },
//     {
//       id: 2,
//       title: "Holiday Announcement",
//       content: "Office will remain closed on Friday due to festival.",
//       date: "2025-02-25",
//       status: "Inactive",
//       image: "https://images.unsplash.com/photo-1521791136064-7986c2920216"
//     }
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//     date: "",
//     image: "",
//     status: "Active"
//   });

//   const openAddModal = () => {
//     setEditing(null);
//     setForm({
//       title: "",
//       content: "",
//       date: "",
//       image: "",
//       status: "Active"
//     });
//     setShowModal(true);
//   };

//   const openEditModal = (item) => {
//     setEditing(item);
//     setForm(item);
//     setShowModal(true);
//   };

//   const saveAnnouncement = () => {
//     if (!form.title || !form.content) {
//       alert("Title & Content Required!");
//       return;
//     }

//     if (editing) {
//       setAnnouncements(
//         announcements.map((a) => (a.id === editing.id ? form : a))
//       );
//     } else {
//       setAnnouncements([
//         ...announcements,
//         { ...form, id: Date.now(), status: "Active" }
//       ]);
//     }

//     setShowModal(false);
//   };

//   const deleteAnnouncement = (id) => {
//     if (window.confirm("Delete this announcement?")) {
//       setAnnouncements(announcements.filter((a) => a.id !== id));
//     }
//   };

//   const toggleStatus = (id) => {
//     setAnnouncements(
//       announcements.map((a) =>
//         a.id === id
//           ? { ...a, status: a.status === "Active" ? "Inactive" : "Active" }
//           : a
//       )
//     );
//   };

//   return (
//     <div className="page-content">
//       <div className="page-header">
//         <div>
//           <h2 className="page-title">📢 Announcement Management</h2>
//           <p className="page-subtitle">
//             Manage dashboard announcement slider content
//           </p>
//         </div>

//         <button className="btn-primary" onClick={openAddModal}>
//           ➕ Add Announcement
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="summary-cards">
//         <div className="card">
//           <div className="card-icon">📢</div>
//           <h3>Total Announcements</h3>
//           <p className="card-value">{announcements.length}</p>
//         </div>

//         <div className="card card-success">
//           <div className="card-icon">✅</div>
//           <h3>Active</h3>
//           <p className="card-value">
//             {announcements.filter((a) => a.status === "Active").length}
//           </p>
//         </div>

//         <div className="card card-danger">
//           <div className="card-icon">⛔</div>
//           <h3>Inactive</h3>
//           <p className="card-value">
//             {announcements.filter((a) => a.status === "Inactive").length}
//           </p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-container">
//         <div className="table-header">
//           <h3>📋 Announcement List</h3>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Banner</th>
//               <th>Title</th>
//               <th>Message</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {announcements.map((a) => (
//               <tr key={a.id}>
//                 <td>
//                   <img
//                     src={a.image}
//                     alt=""
//                     style={{
//                       width: "90px",
//                       height: "60px",
//                       borderRadius: "6px",
//                       objectFit: "cover",
//                       border: "1px solid #334155"
//                     }}
//                   />
//                 </td>

//                 <td>
//                   <strong className="text-white">{a.title}</strong>
//                 </td>

//                 <td className="text-muted">{a.content}</td>

//                 <td>{a.date}</td>

//                 <td>
//                   <span
//                     className={`status-badge ${
//                       a.status === "Active" ? "present" : "absent"
//                     }`}
//                   >
//                     {a.status}
//                   </span>
//                 </td>

//                 <td>
//                   <div className="action-buttons">
//                     <button
//                       className="btn-small btn-success"
//                       onClick={() => toggleStatus(a.id)}
//                     >
//                       🔄 Toggle
//                     </button>

//                     <button
//                       className="btn-small btn-warning"
//                       onClick={() => openEditModal(a)}
//                     >
//                       ✏️ Edit
//                     </button>

//                     <button
//                       className="btn-small btn-danger"
//                       onClick={() => deleteAnnouncement(a.id)}
//                     >
//                       🗑 Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {announcements.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center">
//                   ❌ No Announcements Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h3>{editing ? "✏️ Edit Announcement" : "➕ Add Announcement"}</h3>

//             <input
//               className="input-box"
//               placeholder="Announcement Title"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />

//             <textarea
//               className="input-box"
//               placeholder="Announcement Content"
//               rows={4}
//               value={form.content}
//               onChange={(e) => setForm({ ...form, content: e.target.value })}
//             />

//             <input
//               className="input-box"
//               type="date"
//               value={form.date}
//               onChange={(e) => setForm({ ...form, date: e.target.value })}
//             />

//             <input
//               className="input-box"
//               placeholder="Image URL"
//               value={form.image}
//               onChange={(e) => setForm({ ...form, image: e.target.value })}
//             />

//             <div className="modal-actions">
//               <button className="btn-primary" onClick={saveAnnouncement}>
//                 💾 Save
//               </button>

//               <button
//                 className="btn-danger"
//                 onClick={() => setShowModal(false)}
//               >
//                 ❌ Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .page-subtitle {
//           color: #94a3b8;
//           font-size: 14px;
//         }

//         .summary-cards {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 16px;
//           margin: 20px 0;
//         }

//         .card {
//           background: #1e293b;
//           border: 1px solid #334155;
//           padding: 16px;
//           border-radius: 8px;
//         }

//         .card-icon {
//           font-size: 26px;
//         }

//         .card h3 {
//           font-size: 14px;
//           color: #94a3b8;
//         }

//         .card-value {
//           font-size: 28px;
//           font-weight: 700;
//           color: white;
//         }

//         .card-success {
//           border-left: 4px solid #10b981;
//         }

//         .card-danger {
//           border-left: 4px solid #ef4444;
//         }

//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.6);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .modal-box {
//           width: 450px;
//           background: #1e293b;
//           border: 1px solid #334155;
//           padding: 20px;
//           border-radius: 8px;
//         }

//         .input-box {
//           width: 100%;
//           padding: 10px;
//           margin-top: 10px;
//           border-radius: 6px;
//           border: 1px solid #334155;
//           background: #0f172a;
//           color: white;
//         }

//         .modal-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 10px;
//           margin-top: 15px;
//         }

//         .text-white {
//           color: white;
//         }

//         .text-muted {
//           color: #94a3b8;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AnnouncementsPage;






import React, { useState, useEffect } from "react";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Server Maintenance",
      content: "Server will be down today from 10PM to 1AM.",
      date: "2025-02-20",
      status: "Active",
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
      category: "Technical",
      priority: "High",
      views: 1245
    },
    {
      id: 2,
      title: "Holiday Announcement",
      content: "Office will remain closed on Friday due to festival.",
      date: "2025-02-25",
      status: "Inactive",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
      category: "General",
      priority: "Medium",
      views: 892
    },
    {
      id: 3,
      title: "System Upgrade Complete",
      content: "New features are now available in the dashboard.",
      date: "2025-02-18",
      status: "Active",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      category: "Update",
      priority: "Medium",
      views: 2103
    },
    {
      id: 4,
      title: "Security Alert",
      content: "Please update your passwords immediately.",
      date: "2025-02-15",
      status: "Active",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      category: "Security",
      priority: "High",
      views: 1876
    },
    {
      id: 5,
      title: "New Employee Onboarding",
      content: "Welcome session for new joiners at 3 PM.",
      date: "2025-02-22",
      status: "Inactive",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      category: "HR",
      priority: "Low",
      views: 654
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split('T')[0],
    image: "",
    status: "Active",
    category: "General",
    priority: "Medium"
  });

  // Categories for filtering
  const categories = ["All", "Technical", "General", "Update", "Security", "HR"];
  
  // Graph data
  const [analyticsData, setAnalyticsData] = useState({
    monthlyViews: [1245, 892, 2103, 1876, 654, 1432, 987, 1654, 1234, 876, 1098, 1543],
    categoryDistribution: {
      Technical: 2,
      General: 1,
      Update: 1,
      Security: 1,
      HR: 1
    },
    performanceMetrics: {
      avgViews: 1350,
      engagementRate: "72%",
      avgActiveDays: 14
    }
  });

  // Filter and sort announcements
  const filteredAnnouncements = announcements
    .filter(announcement => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All" || announcement.status === filterStatus;
      const matchesCategory = filterCategory === "All" || announcement.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  // Open preview modal
  const openPreview = (item) => {
    setSelectedAnnouncement(item);
    setPreviewModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    setEditing(null);
    setForm({
      title: "",
      content: "",
      date: new Date().toISOString().split('T')[0],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      status: "Active",
      category: "General",
      priority: "Medium"
    });
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (item) => {
    setEditing(item);
    setForm(item);
    setShowModal(true);
  };

  // Save announcement
  const saveAnnouncement = () => {
    if (!form.title || !form.content) {
      alert("Title & Content Required!");
      return;
    }

    if (editing) {
      setAnnouncements(
        announcements.map((a) => (a.id === editing.id ? { ...form, id: editing.id, views: editing.views } : a))
      );
    } else {
      setAnnouncements([
        ...announcements,
        { ...form, id: Date.now(), views: 0 }
      ]);
    }

    setShowModal(false);
  };

  // Delete announcement
  const deleteAnnouncement = (id) => {
    if (window.confirm("Delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  // Toggle status
  const toggleStatus = (id) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Inactive" : "Active" }
          : a
      )
    );
  };

  // Generate priority badge
  const getPriorityBadge = (priority) => {
    const styles = {
      High: { bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.4)" },
      Medium: { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.4)" },
      Low: { bg: "rgba(34, 197, 94, 0.2)", text: "#22c55e", border: "1px solid rgba(34, 197, 94, 0.4)" }
    };
    return (
      <span className="priority-badge" style={styles[priority]}>
        {priority}
      </span>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="page-title">📢 Announcements Dashboard</h1>
          <p className="page-subtitle">
            Manage and analyze all your announcements in one place
          </p>
        </div>
        <div className="header-right">
          <button className="btn-primary" onClick={openAddModal}>
            <span className="btn-icon">+</span> Add Announcement
          </button>
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ▫️
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              📋
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">📢</div>
          <div className="stat-content">
            <h3>Total Announcements</h3>
            <p className="stat-value">{announcements.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">✅</div>
          <div className="stat-content">
            <h3>Active</h3>
            <p className="stat-value">
              {announcements.filter((a) => a.status === "Active").length}
            </p>
            <p className="stat-change">+2 this week</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon views">👁️</div>
          <div className="stat-content">
            <h3>Total Views</h3>
            <p className="stat-value">
              {announcements.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
            </p>
            <p className="stat-change">+12% from last month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon engagement">📈</div>
          <div className="stat-content">
            <h3>Engagement Rate</h3>
            <p className="stat-value">{analyticsData.performanceMetrics.engagementRate}</p>
            <p className="stat-change">+5% from last month</p>
          </div>
        </div>
      </div>

      {/* Charts and Analytics Section */}
      <div className="analytics-section">
        <div className="chart-container">
          <div className="chart-header">
            <h3>Monthly Views Trend</h3>
            <select className="filter-select">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="bar-chart">
            {analyticsData.monthlyViews.map((value, index) => (
              <div key={index} className="bar-wrapper">
                <div className="bar-label">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</div>
                <div className="bar">
                  <div 
                    className="bar-fill" 
                    style={{ height: `${(value / 2500) * 100}%` }}
                  ></div>
                </div>
                <div className="bar-value">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3>Category Distribution</h3>
          </div>
          <div className="pie-chart">
            <div className="pie-chart-visual">
              <div className="pie-segment" style={{ '--percentage': '33%', '--color': '#3b82f6' }}></div>
              <div className="pie-segment" style={{ '--percentage': '17%', '--color': '#10b981' }}></div>
              <div className="pie-segment" style={{ '--percentage': '17%', '--color': '#f59e0b' }}></div>
              <div className="pie-segment" style={{ '--percentage': '17%', '--color': '#ef4444' }}></div>
              <div className="pie-segment" style={{ '--percentage': '17%', '--color': '#8b5cf6' }}></div>
            </div>
            <div className="pie-legend">
              {Object.entries(analyticsData.categoryDistribution).map(([category, count]) => (
                <div key={category} className="legend-item">
                  <span className="legend-color" style={{ 
                    backgroundColor: 
                      category === 'Technical' ? '#3b82f6' :
                      category === 'General' ? '#10b981' :
                      category === 'Update' ? '#f59e0b' :
                      category === 'Security' ? '#ef4444' : '#8b5cf6'
                  }}></span>
                  <span className="legend-label">{category}</span>
                  <span className="legend-value">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select 
            className="filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="views">Sort by Views</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </div>

      {/* Announcements Grid/List */}
      <div className={`announcements-container ${viewMode}`}>
        {filteredAnnouncements.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No announcements found</h3>
            <p>Try adjusting your filters or add a new announcement</p>
            <button className="btn-primary" onClick={openAddModal}>
              + Create Announcement
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="announcements-grid">
            {filteredAnnouncements.map((a) => (
              <div key={a.id} className="announcement-card">
                <div className="card-header">
                  <img src={a.image} alt={a.title} className="card-image" />
                  <span className={`status-badge ${a.status === "Active" ? "active" : "inactive"}`}>
                    {a.status}
                  </span>
                  <div className="card-actions">
                    <button onClick={() => openEditModal(a)} className="icon-btn edit">✏️</button>
                    <button onClick={() => deleteAnnouncement(a.id)} className="icon-btn delete">🗑️</button>
                  </div>
                </div>
                <div className="card-content">
                  <h4 className="card-title">{a.title}</h4>
                  <p className="card-text">{a.content.substring(0, 80)}...</p>
                  <div className="card-meta">
                    <span className="meta-date">📅 {a.date}</span>
                    <span className="meta-views">👁️ {a.views.toLocaleString()}</span>
                  </div>
                  <div className="card-footer">
                    <span className="category-tag">{a.category}</span>
                    {getPriorityBadge(a.priority)}
                  </div>
                  <div className="card-actions-bottom">
                    <button onClick={() => toggleStatus(a.id)} className="btn-small">
                      {a.status === "Active" ? "⛔ Deactivate" : "✅ Activate"}
                    </button>
                    <button onClick={() => openPreview(a)} className="btn-small outline">
                      👁️ Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="announcements-list">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Views</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnnouncements.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div className="table-cell-title">
                        <img src={a.image} alt="" className="table-image" />
                        <div>
                          <strong>{a.title}</strong>
                          <p className="table-subtitle">{a.content.substring(0, 60)}...</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="category-tag">{a.category}</span></td>
                    <td>
                      <span className={`status-badge ${a.status === "Active" ? "active" : "inactive"}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>{getPriorityBadge(a.priority)}</td>
                    <td>{a.views.toLocaleString()}</td>
                    <td>{a.date}</td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => openEditModal(a)} className="icon-btn edit">✏️</button>
                        <button onClick={() => toggleStatus(a.id)} className="icon-btn toggle">🔄</button>
                        <button onClick={() => deleteAnnouncement(a.id)} className="icon-btn delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewModal && selectedAnnouncement && (
        <div className="modal-overlay">
          <div className="modal-box preview-modal">
            <div className="modal-header">
              <h3>📢 Announcement Preview</h3>
              <button className="close-btn" onClick={() => setPreviewModal(false)}>✕</button>
            </div>
            <div className="preview-content">
              <img src={selectedAnnouncement.image} alt={selectedAnnouncement.title} className="preview-image" />
              <div className="preview-body">
                <h2>{selectedAnnouncement.title}</h2>
                <div className="preview-meta">
                  <span className="meta-date">📅 {selectedAnnouncement.date}</span>
                  <span className="meta-category">{selectedAnnouncement.category}</span>
                  <span className="meta-views">👁️ {selectedAnnouncement.views.toLocaleString()} views</span>
                </div>
                <div className="preview-priority">
                  Priority: {getPriorityBadge(selectedAnnouncement.priority)}
                </div>
                <div className="preview-text">
                  <p>{selectedAnnouncement.content}</p>
                </div>
                <div className="preview-status">
                  Status: <span className={`status-badge ${selectedAnnouncement.status === "Active" ? "active" : "inactive"}`}>
                    {selectedAnnouncement.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => openEditModal(selectedAnnouncement)}>
                ✏️ Edit Announcement
              </button>
              <button className="btn-secondary" onClick={() => setPreviewModal(false)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>{editing ? "✏️ Edit Announcement" : "➕ Add Announcement"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Title *</label>
                <input
                  className="form-input"
                  placeholder="Announcement Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="General">General</option>
                  <option value="Technical">Technical</option>
                  <option value="Security">Security</option>
                  <option value="Update">Update</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  className="form-input"
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                className="form-input"
                placeholder="Announcement Content"
                rows={4}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                className="form-input"
                placeholder="https://images.unsplash.com/photo-..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              {form.image && (
                <div className="image-preview">
                  <img src={form.image} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Status</label>
              <div className="status-toggle">
                <button
                  className={`status-btn ${form.status === "Active" ? "active" : ""}`}
                  onClick={() => setForm({ ...form, status: "Active" })}
                >
                  Active
                </button>
                <button
                  className={`status-btn ${form.status === "Inactive" ? "inactive" : ""}`}
                  onClick={() => setForm({ ...form, status: "Inactive" })}
                >
                  Inactive
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={saveAnnouncement}>
                💾 {editing ? "Update" : "Save"} Announcement
              </button>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          padding: 24px;
        }

        /* Header */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .header-left {
          flex: 1;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(90deg, #60a5fa, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          color: #94a3b8;
          margin-top: 8px;
        }

        /* Buttons */
        .btn-primary {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          background: #334155;
          color: white;
          border: 1px solid #475569;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-secondary:hover {
          background: #475569;
        }

        .btn-small {
          background: #334155;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }

        .btn-small.outline {
          background: transparent;
          border: 1px solid #475569;
        }

        /* Stats Cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: #3b82f6;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-icon.total { background: rgba(59, 130, 246, 0.2); }
        .stat-icon.active { background: rgba(34, 197, 94, 0.2); }
        .stat-icon.views { background: rgba(245, 158, 11, 0.2); }
        .stat-icon.engagement { background: rgba(139, 92, 246, 0.2); }

        .stat-content h3 {
          margin: 0;
          font-size: 14px;
          color: #94a3b8;
          font-weight: 500;
        }

        .stat-value {
          margin: 4px 0;
          font-size: 28px;
          font-weight: 700;
        }

        .stat-change {
          margin: 0;
          font-size: 12px;
          color: #10b981;
        }

        /* Analytics Section */
        .analytics-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        @media (max-width: 768px) {
          .analytics-section {
            grid-template-columns: 1fr;
          }
        }

        .chart-container {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 20px;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .chart-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        /* Bar Chart */
        .bar-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 200px;
          padding: 20px 0;
        }

        .bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .bar-label {
          margin-bottom: 8px;
          font-size: 12px;
          color: #94a3b8;
        }

        .bar {
          width: 20px;
          height: 150px;
          background: #1e293b;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        .bar-fill {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: linear-gradient(to top, #3b82f6, #60a5fa);
          border-radius: 4px;
          transition: height 0.3s;
        }

        .bar-value {
          margin-top: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        /* Pie Chart */
        .pie-chart {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .pie-chart-visual {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: conic-gradient(
            var(--color) 0% var(--percentage),
            #334155 var(--percentage) 100%
          );
          position: relative;
        }

        .pie-legend {
          flex: 1;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .legend-label {
          flex: 1;
          font-size: 14px;
        }

        .legend-value {
          font-weight: 600;
        }

        /* Filters */
        .filters-section {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          color: white;
          font-size: 14px;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .filter-controls {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-select {
          padding: 10px 16px;
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 6px;
          color: white;
          font-size: 14px;
          min-width: 140px;
        }

        /* Announcements Grid/List */
        .announcements-container.grid .announcements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .announcement-card {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.2s;
        }

        .announcement-card:hover {
          transform: translateY(-4px);
          border-color: #3b82f6;
        }

        .card-header {
          position: relative;
          height: 160px;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-actions {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          background: rgba(15, 23, 42, 0.9);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn.edit:hover { background: rgba(245, 158, 11, 0.2); }
        .icon-btn.delete:hover { background: rgba(239, 68, 68, 0.2); }
        .icon-btn.toggle:hover { background: rgba(34, 197, 94, 0.2); }

        .card-content {
          padding: 20px;
        }

        .card-title {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
        }

        .card-text {
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          font-size: 12px;
          color: #64748b;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .category-tag {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .priority-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .card-actions-bottom {
          display: flex;
          gap: 8px;
        }

        /* Table View */
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          text-align: left;
          padding: 16px;
          background: rgba(15, 23, 42, 0.8);
          color: #94a3b8;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 1px solid #334155;
        }

        .data-table td {
          padding: 16px;
          border-bottom: 1px solid #334155;
        }

        .data-table tr:hover {
          background: rgba(30, 41, 59, 0.4);
        }

        .table-cell-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .table-image {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          object-fit: cover;
        }

        .table-subtitle {
          margin: 4px 0 0 0;
          color: #94a3b8;
          font-size: 12px;
        }

        .table-actions {
          display: flex;
          gap: 8px;
        }

        /* Status Badges */
        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.active {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.4);
        }

        .status-badge.inactive {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.4);
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .empty-state h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
        }

        .empty-state p {
          color: #94a3b8;
          margin-bottom: 24px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-box {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .preview-modal {
          max-width: 800px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #334155;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 20px;
        }

        .close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }

        .close-btn:hover {
          background: #334155;
          color: white;
        }

        /* Form */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          padding: 24px;
        }

        .form-group {
          padding: 0 24px;
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #e2e8f0;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          color: white;
          font-size: 14px;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .image-preview {
          margin-top: 16px;
        }

        .image-preview img {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #334155;
        }

        .status-toggle {
          display: flex;
          gap: 12px;
        }

        .status-btn {
          flex: 1;
          padding: 12px;
          border: 1px solid #334155;
          background: #0f172a;
          color: #94a3b8;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        .status-btn.active {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border-color: rgba(34, 197, 94, 0.4);
        }

        .status-btn.inactive {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.4);
        }

        .modal-actions {
          padding: 24px;
          border-top: 1px solid #334155;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        /* Preview Modal Styles */
        .preview-content {
          padding: 24px;
        }

        .preview-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .preview-body h2 {
          margin: 0 0 16px 0;
          font-size: 24px;
        }

        .preview-meta {
          display: flex;
          gap: 24px;
          margin-bottom: 20px;
          color: #94a3b8;
        }

        .preview-priority {
          margin-bottom: 20px;
        }

        .preview-text {
          line-height: 1.6;
          margin-bottom: 24px;
          color: #e2e8f0;
        }

        .preview-status {
          padding: 16px;
          background: rgba(15, 23, 42, 0.4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* View Toggle */
        .view-toggle {
          display: flex;
          gap: 8px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 4px;
        }

        .view-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          color: #94a3b8;
          font-size: 18px;
        }

        .view-btn.active {
          background: #334155;
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 16px;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .analytics-section,
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .filters-section {
            flex-direction: column;
          }
          
          .search-box {
            min-width: 100%;
          }
          
          .modal-box {
            margin: 16px;
          }
        }

        @media (max-width: 480px) {
          .dashboard-header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .header-right {
            justify-content: space-between;
          }
          
          .card-actions-bottom {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementsPage;