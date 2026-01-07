// import React, { useState } from "react";

// const LeavesPage = () => {
//   const [leaves, setLeaves] = useState([
//     {
//       id: 1,
//       employee: "John Doe",
//       type: "Sick Leave",
//       from: "2025-02-18",
//       to: "2025-02-20",
//       days: 3,
//       reason: "Fever & Health Issue",
//       status: "Pending"
//     },
//     {
//       id: 2,
//       employee: "Jane Smith",
//       type: "Casual Leave",
//       from: "2025-02-22",
//       to: "2025-02-23",
//       days: 2,
//       reason: "Family Function",
//       status: "Approved"
//     }
//   ]);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");

//   const updateStatus = (id, status) => {
//     setLeaves(
//       leaves.map(l =>
//         l.id === id ? { ...l, status } : l
//       )
//     );
//   };

//   const deleteLeave = (id) => {
//     if (window.confirm("Delete Leave Request?")) {
//       setLeaves(leaves.filter(l => l.id !== id));
//     }
//   };

//   const filtered = leaves
//     .filter(l =>
//       l.employee.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter(l => (filter === "All" ? true : l.status === filter));

//   const statusColor = (status) => {
//     if (status === "Approved") return { background: "#064e3b", color: "#6ee7b7" };
//     if (status === "Rejected") return { background: "#4c0519", color: "#fda4af" };
//     return { background: "#1e3a8a", color: "#93c5fd" };
//   };

//   return (
//     <div style={{ color: "white" }}>
      
//       {/* HEADER */}
//       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//         <div>
//           <h2 style={{ marginBottom:"4px" }}>📝 Leave Management</h2>
//           <p style={{ color:"#9ca3af", fontSize:"13px" }}>
//             Manage employee leave requests
//           </p>
//         </div>
//       </div>

//       {/* CARDS */}
//       <div style={{
//         display:"grid",
//         gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
//         gap:"16px",
//         margin:"18px 0"
//       }}>
//         <Card icon="📝" title="Total Requests" value={leaves.length} color="#374151"/>
//         <Card icon="✅" title="Approved" value={leaves.filter(l=>l.status==="Approved").length} left="#10b981"/>
//         <Card icon="⛔" title="Rejected" value={leaves.filter(l=>l.status==="Rejected").length} left="#ef4444"/>
//         <Card icon="⏳" title="Pending" value={leaves.filter(l=>l.status==="Pending").length} left="#3b82f6"/>
//       </div>

//       {/* FILTER BAR */}
//       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//         <h3>📋 Leave Requests</h3>

//         <div style={{ display:"flex", gap:"10px" }}>
//           <input
//             placeholder="Search employee..."
//             style={input}
//             value={search}
//             onChange={(e)=>setSearch(e.target.value)}
//           />

//           <select
//             style={input}
//             value={filter}
//             onChange={(e)=>setFilter(e.target.value)}
//           >
//             <option>All</option>
//             <option>Approved</option>
//             <option>Rejected</option>
//             <option>Pending</option>
//           </select>
//         </div>
//       </div>

//       {/* TABLE */}
//       <table style={{ width:"100%", marginTop:"10px", borderCollapse:"collapse" }}>
//         <thead>
//           <tr>
//             <Th>Employee</Th>
//             <Th>Leave Type</Th>
//             <Th>From</Th>
//             <Th>To</Th>
//             <Th>Days</Th>
//             <Th>Reason</Th>
//             <Th>Status</Th>
//             <Th>Actions</Th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.map(l => (
//             <tr key={l.id}>
//               <TdWhite>{l.employee}</TdWhite>
//               <Td>{l.type}</Td>
//               <Td>{l.from}</Td>
//               <Td>{l.to}</Td>
//               <Td>{l.days}</Td>
//               <Td>{l.reason}</Td>

//               <Td>
//                 <span style={{
//                   padding:"6px 10px",
//                   borderRadius:"8px",
//                   fontSize:"11px",
//                   ...statusColor(l.status)
//                 }}>
//                   {l.status}
//                 </span>
//               </Td>

//               <Td>
//                 {l.status !== "Approved" && (
//                   <button style={btnGreen} onClick={()=>updateStatus(l.id,"Approved")}>✔</button>
//                 )}

//                 {l.status !== "Rejected" && (
//                   <button style={btnYellow} onClick={()=>updateStatus(l.id,"Rejected")}>✖</button>
//                 )}

//                 <button style={btnRed} onClick={()=>deleteLeave(l.id)}>🗑</button>
//               </Td>
//             </tr>
//           ))}

//           {filtered.length === 0 && (
//             <tr>
//               <td colSpan={8} style={{ textAlign:"center", padding:"20px" }}>
//                 ❌ No Leave Requests Found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// /* ---------- Reusable Components ---------- */
// const Card = ({ icon,title,value,left }) => (
//   <div style={{
//     background:"#1e293b",
//     border:"1px solid #374151",
//     borderRadius:"8px",
//     padding:"14px",
//     borderLeft: left ? `4px solid ${left}` : "4px solid #6b7280"
//   }}>
//     <div style={{ fontSize:"25px" }}>{icon}</div>
//     <h3>{title}</h3>
//     <p style={{ fontSize:"28px", fontWeight:"bold" }}>{value}</p>
//   </div>
// );

// const Th = ({children}) => (
//   <th style={{
//     textAlign:"left",
//     padding:"10px",
//     background:"#111827",
//     borderBottom:"1px solid #374151",
//     color:"#9ca3af"
//   }}>{children}</th>
// );

// const Td = ({children}) => (
//   <td style={{
//     padding:"12px",
//     borderBottom:"1px solid #374151"
//   }}>{children}</td>
// );

// const TdWhite = ({children}) => (
//   <Td>
//     <span style={{ color:"white" }}>{children}</span>
//   </Td>
// );

// const input = {
//   background:"#020617",
//   color:"white",
//   border:"1px solid #374151",
//   padding:"10px",
//   borderRadius:"6px"
// };

// const btnGreen = { background:"#10b981", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
// const btnYellow = { background:"#f59e0b", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
// const btnRed = { background:"#ef4444", border:0, padding:"6px 8px", borderRadius:"6px", cursor:"pointer" };

// export default LeavesPage;





// import React, { useState, useEffect } from "react";

// const LeavesPage = () => {
//   const [leaves, setLeaves] = useState([
//     {
//       id: 1,
//       employee: "John Doe",
//       type: "Sick Leave",
//       from: "2025-02-18",
//       to: "2025-02-20",
//       days: 3,
//       reason: "Fever & Health Issue",
//       status: "Pending",
//       // ✅ New fields for early leave
//       isEarlyLeave: false,
//       earlyLeaveTime: "",
//       earlyLeaveApproved: false
//     },
//     {
//       id: 2,
//       employee: "Jane Smith",
//       type: "Casual Leave",
//       from: "2025-02-22",
//       to: "2025-02-23",
//       days: 2,
//       reason: "Family Function",
//       status: "Approved",
//       isEarlyLeave: false,
//       earlyLeaveTime: "",
//       earlyLeaveApproved: false
//     },
//     // ✅ New: Early Leave Example
//     {
//       id: 3,
//       employee: "Mike Johnson",
//       type: "Early Leave",
//       from: "2025-02-25",
//       to: "2025-02-25",
//       days: 1,
//       reason: "Doctor Appointment",
//       status: "Pending",
//       isEarlyLeave: true,  // ✅ Early leave flag
//       earlyLeaveTime: "14:30",  // ✅ Time user wants to leave
//       earlyLeaveApproved: false
//     }
//   ]);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [showOnlyEarly, setShowOnlyEarly] = useState(false); // ✅ New filter

//   // ✅ Fetch real data from API
//   useEffect(() => {
//     fetchLeavesData();
//   }, []);

//   const fetchLeavesData = async () => {
//     try {
//       // API call for pending early leaves
//       const response = await fetch('http://localhost:5000/api/leaves/admin/pending-early');
//       const data = await response.json();
      
//       if (data.success) {
//         // Add API data to your existing leaves
//         const apiLeaves = data.leaves.map(leave => ({
//           id: leave._id,
//           employee: leave.employeeName,
//           type: "Early Leave",
//           from: new Date(leave.fromDate).toLocaleDateString(),
//           to: new Date(leave.toDate).toLocaleDateString(),
//           days: leave.days,
//           reason: leave.earlyLeaveReason || leave.reason,
//           status: leave.status === "approved" ? "Approved" : "Pending",
//           isEarlyLeave: true,
//           earlyLeaveTime: leave.earlyLeaveTime,
//           earlyLeaveApproved: leave.earlyLeaveApproved
//         }));
        
//         setLeaves(prev => [...prev, ...apiLeaves]);
//       }
//     } catch (error) {
//       console.error("Error fetching leaves:", error);
//     }
//   };

//   // ✅ Modified updateStatus function for early leave
//   const updateStatus = async (id, status) => {
//     // First check if it's an early leave
//     const leave = leaves.find(l => l.id === id);
    
//     if (leave && leave.isEarlyLeave) {
//       // Call API to approve/reject early leave
//       try {
//         const response = await fetch(`http://localhost:5000/api/leaves/admin/approve-early/${id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             status: status.toLowerCase(),
//             adminName: "Admin" // You can get from user context
//           })
//         });
        
//         const data = await response.json();
        
//         if (data.success) {
//           // Update local state
//           setLeaves(
//             leaves.map(l =>
//               l.id === id ? { 
//                 ...l, 
//                 status: status,
//                 earlyLeaveApproved: status === "Approved" 
//               } : l
//             )
//           );
          
//           // Show notification
//           alert(`Early leave ${status.toLowerCase()} successfully!`);
//         }
//       } catch (error) {
//         console.error("Error updating early leave:", error);
//         alert("Failed to update early leave");
//       }
//     } else {
//       // Regular leave update (existing code)
//       setLeaves(
//         leaves.map(l =>
//           l.id === id ? { ...l, status } : l
//         )
//       );
//     }
//   };

//   const deleteLeave = (id) => {
//     if (window.confirm("Delete Leave Request?")) {
//       setLeaves(leaves.filter(l => l.id !== id));
//     }
//   };

//   // ✅ Modified filtered leaves
//   const filtered = leaves
//     .filter(l =>
//       l.employee.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter(l => (filter === "All" ? true : l.status === filter))
//     .filter(l => showOnlyEarly ? l.isEarlyLeave : true); // ✅ Early leave filter

//   const statusColor = (status) => {
//     if (status === "Approved") return { background: "#064e3b", color: "#6ee7b7" };
//     if (status === "Rejected") return { background: "#4c0519", color: "#fda4af" };
//     return { background: "#1e3a8a", color: "#93c5fd" };
//   };

//   // ✅ Early leave badge style
//   const earlyLeaveBadge = {
//     background: "#fef3c7",
//     color: "#92400e",
//     padding: "2px 8px",
//     borderRadius: "12px",
//     fontSize: "10px",
//     marginLeft: "6px"
//   };

//   return (
//     <div style={{ color: "white" }}>
      
//       {/* HEADER */}
//       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//         <div>
//           <h2 style={{ marginBottom:"4px" }}>📝 Leave Management</h2>
//           <p style={{ color:"#9ca3af", fontSize:"13px" }}>
//             Manage employee leave requests {showOnlyEarly && "(Early Leaves Only)"}
//           </p>
//         </div>
//       </div>

//       {/* CARDS - Updated with Early Leave Count */}
//       <div style={{
//         display:"grid",
//         gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
//         gap:"16px",
//         margin:"18px 0"
//       }}>
//         <Card icon="📝" title="Total Requests" value={leaves.length} color="#374151"/>
//         <Card icon="✅" title="Approved" value={leaves.filter(l=>l.status==="Approved").length} left="#10b981"/>
//         <Card icon="⛔" title="Rejected" value={leaves.filter(l=>l.status==="Rejected").length} left="#ef4444"/>
//         <Card icon="⏳" title="Pending" value={leaves.filter(l=>l.status==="Pending").length} left="#3b82f6"/>
//         {/* ✅ New Card for Early Leaves */}
//         <Card 
//           icon="🚨" 
//           title="Early Leaves" 
//           value={leaves.filter(l=>l.isEarlyLeave).length} 
//           left="#f59e0b"
//         />
//       </div>

//       {/* FILTER BAR - Updated */}
//       <div style={{ 
//         display:"flex", 
//         justifyContent:"space-between", 
//         alignItems:"center",
//         marginBottom: "15px" 
//       }}>
//         <h3>📋 Leave Requests</h3>

//         <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
//           {/* ✅ Early Leave Filter Toggle */}
//           <label style={{ display:"flex", alignItems:"center", gap:"5px", cursor:"pointer" }}>
//             <input
//               type="checkbox"
//               checked={showOnlyEarly}
//               onChange={(e) => setShowOnlyEarly(e.target.checked)}
//               style={{ width: "16px", height: "16px" }}
//             />
//             <span style={{ fontSize: "14px" }}>Show Early Leaves Only</span>
//           </label>

//           <input
//             placeholder="Search employee..."
//             style={input}
//             value={search}
//             onChange={(e)=>setSearch(e.target.value)}
//           />

//           <select
//             style={input}
//             value={filter}
//             onChange={(e)=>setFilter(e.target.value)}
//           >
//             <option>All</option>
//             <option>Approved</option>
//             <option>Rejected</option>
//             <option>Pending</option>
//           </select>
//         </div>
//       </div>

//       {/* TABLE - Updated with Early Leave Info */}
//       <table style={{ width:"100%", marginTop:"10px", borderCollapse:"collapse" }}>
//         <thead>
//           <tr>
//             <Th>Employee</Th>
//             <Th>Leave Type</Th>
//             <Th>From</Th>
//             <Th>To</Th>
//             <Th>Days</Th>
//             <Th>Reason</Th>
//             <Th>Status</Th>
//             <Th>Actions</Th>
//           </tr>
//         </thead>

//         <tbody>
//           {filtered.map(l => (
//             <tr key={l.id} style={l.isEarlyLeave ? { background: "#fef3c7", color: "#000" } : {}}>
//               <TdWhite style={l.isEarlyLeave ? { color: "#000" } : {}}>
//                 {l.employee}
//                 {l.isEarlyLeave && (
//                   <span style={earlyLeaveBadge}>🚨 Early</span>
//                 )}
//               </TdWhite>
              
//               <Td>
//                 {l.type}
//                 {l.isEarlyLeave && l.earlyLeaveTime && (
//                   <div style={{ fontSize: "11px", color: "#92400e", marginTop: "2px" }}>
//                     ⏰ Time: {l.earlyLeaveTime}
//                   </div>
//                 )}
//               </Td>
              
//               <Td>{l.from}</Td>
//               <Td>{l.to}</Td>
//               <Td>{l.days}</Td>
              
//               <Td>
//                 {l.reason}
//                 {l.isEarlyLeave && (
//                   <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
//                     {l.earlyLeaveApproved ? "✅ Approved for early punch out" : "⏳ Waiting for admin approval"}
//                   </div>
//                 )}
//               </Td>

//               <Td>
//                 <span style={{
//                   padding:"6px 10px",
//                   borderRadius:"8px",
//                   fontSize:"11px",
//                   ...statusColor(l.status)
//                 }}>
//                   {l.status}
//                   {l.isEarlyLeave && l.earlyLeaveApproved && " (Early)"}
//                 </span>
//               </Td>

//               <Td>
//                 {l.status !== "Approved" && (
//                   <button 
//                     style={btnGreen} 
//                     onClick={()=>updateStatus(l.id, "Approved")}
//                     title="Approve Leave"
//                   >
//                     ✔
//                   </button>
//                 )}

//                 {l.status !== "Rejected" && (
//                   <button 
//                     style={btnYellow} 
//                     onClick={()=>updateStatus(l.id, "Rejected")}
//                     title="Reject Leave"
//                   >
//                     ✖
//                   </button>
//                 )}

//                 {/* ✅ Special action for early leaves */}
//                 {l.isEarlyLeave && l.status === "Pending" && (
//                   <button 
//                     style={{ 
//                       background: "#f59e0b", 
//                       border: 0, 
//                       padding: "6px 8px", 
//                       marginRight: "6px", 
//                       borderRadius: "6px", 
//                       cursor: "pointer" 
//                     }}
//                     onClick={() => {
//                       // View early leave details
//                       alert(`Early Leave Details:\n\nEmployee: ${l.employee}\nTime: ${l.earlyLeaveTime}\nReason: ${l.reason}\nStatus: ${l.status}`);
//                     }}
//                     title="View Early Leave Details"
//                   >
//                     👁️
//                   </button>
//                 )}

//                 <button style={btnRed} onClick={()=>deleteLeave(l.id)} title="Delete Leave">
//                   🗑
//                 </button>
//               </Td>
//             </tr>
//           ))}

//           {filtered.length === 0 && (
//             <tr>
//               <td colSpan={8} style={{ textAlign:"center", padding:"20px" }}>
//                 {showOnlyEarly ? "🚫 No Early Leave Requests Found" : "❌ No Leave Requests Found"}
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* ✅ Early Leave Instructions */}
//       {showOnlyEarly && filtered.length > 0 && (
//         <div style={{
//           background: "#fef3c7",
//           border: "1px solid #fbbf24",
//           borderRadius: "8px",
//           padding: "15px",
//           marginTop: "20px",
//           color: "#92400e"
//         }}>
//           <strong>🚨 Early Leave Management Instructions:</strong>
//           <ul style={{ margin: "10px 0 0 20px", fontSize: "13px" }}>
//             <li>Early leave requests need explicit admin approval</li>
//             <li>After approval, employee can punch out at specified time</li>
//             <li>System will automatically track early punch outs</li>
//             <li>Rejected early leaves require employee to complete 7 hours</li>
//           </ul>
//         </div>
//       )}

//     </div>
//   );
// };

// /* ---------- Reusable Components ---------- */
// const Card = ({ icon, title, value, left }) => (
//   <div style={{
//     background:"#1e293b",
//     border:"1px solid #374151",
//     borderRadius:"8px",
//     padding:"14px",
//     borderLeft: left ? `4px solid ${left}` : "4px solid #6b7280"
//   }}>
//     <div style={{ fontSize:"25px" }}>{icon}</div>
//     <h3>{title}</h3>
//     <p style={{ fontSize:"28px", fontWeight:"bold" }}>{value}</p>
//   </div>
// );

// const Th = ({children}) => (
//   <th style={{
//     textAlign:"left",
//     padding:"10px",
//     background:"#111827",
//     borderBottom:"1px solid #374151",
//     color:"#9ca3af"
//   }}>{children}</th>
// );

// const Td = ({children}) => (
//   <td style={{
//     padding:"12px",
//     borderBottom:"1px solid #374151"
//   }}>{children}</td>
// );

// const TdWhite = ({children, style}) => (
//   <Td>
//     <span style={{ color:"white", ...style }}>{children}</span>
//   </Td>
// );

// const input = {
//   background:"#020617",
//   color:"white",
//   border:"1px solid #374151",
//   padding:"10px",
//   borderRadius:"6px"
// };

// const btnGreen = { 
//   background:"#10b981", 
//   border:0, 
//   padding:"6px 8px", 
//   marginRight:"6px", 
//   borderRadius:"6px", 
//   cursor:"pointer" 
// };

// const btnYellow = { 
//   background:"#f59e0b", 
//   border:0, 
//   padding:"6px 8px", 
//   marginRight:"6px", 
//   borderRadius:"6px", 
//   cursor:"pointer" 
// };

// const btnRed = { 
//   background:"#ef4444", 
//   border:0, 
//   padding:"6px 8px", 
//   borderRadius:"6px", 
//   cursor:"pointer" 
// };

// export default LeavesPage;


// working code he 



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  getPendingEarlyLeaves, 
  approveEarlyLeave 
} from "../../../redux/slices/adminEarlyLeaveSlice";
import { toast } from "react-toastify";

const LeavesPage = () => {
  const dispatch = useDispatch();
  
  // ✅ Redux State
  const { 
    pendingLeaves, 
    loading, 
    error, 
    success 
  } = useSelector((state) => state.adminEarlyLeave);
  
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showOnlyEarly, setShowOnlyEarly] = useState(false);

  // ✅ Fetch pending early leaves on component mount
  useEffect(() => {
    fetchPendingEarlyLeaves();
  }, []);

  // ✅ Handle success/error messages
  useEffect(() => {
    if (success) {
      toast.success("✅ Action completed successfully!");
    }
    if (error) {
      toast.error(`❌ ${error}`);
    }
  }, [success, error]);

  // ✅ Fetch pending early leaves
  const fetchPendingEarlyLeaves = async () => {
    try {
      await dispatch(getPendingEarlyLeaves()).unwrap();
    } catch (error) {
      console.error("Failed to fetch pending leaves:", error);
      toast.error("❌ Failed to load pending leaves");
    }
  };

  // ✅ Handle approve/reject
  const handleApproveLeave = async (leaveId, status) => {
    const action = status === "approved" ? "Approve" : "Reject";
    
    if (window.confirm(`Are you sure you want to ${status.toLowerCase()} this early leave?`)) {
      try {
        await dispatch(approveEarlyLeave({
          leaveId,
          status,
          approvedBy: "Admin" // Get from auth context
        })).unwrap();
        
        toast.success(`✅ Early leave ${status.toLowerCase()} successfully!`);
      } catch (error) {
        toast.error(`❌ Failed to ${status.toLowerCase()} early leave`);
      }
    }
  };

  // ✅ Combine pending early leaves with existing leaves
  useEffect(() => {
    const earlyLeaveItems = pendingLeaves.map(leave => ({
      id: leave._id,
      employee: leave.employeeName,
      type: "Early Leave",
      from: new Date(leave.fromDate).toLocaleDateString('en-IN'),
      to: new Date(leave.toDate).toLocaleDateString('en-IN'),
      days: leave.days,
      reason: leave.earlyLeaveReason || leave.reason,
      status: leave.status.charAt(0).toUpperCase() + leave.status.slice(1),
      isEarlyLeave: true,
      earlyLeaveTime: leave.earlyLeaveTime,
      earlyLeaveApproved: leave.earlyLeaveApproved,
      appliedDate: new Date(leave.createdAt).toLocaleDateString('en-IN')
    }));

    // Your existing mock data
    const existingLeaves = [
      {
        id: 1,
        employee: "John Doe",
        type: "Sick Leave",
        from: "2025-02-18",
        to: "2025-02-20",
        days: 3,
        reason: "Fever & Health Issue",
        status: "Pending",
        isEarlyLeave: false
      },
      {
        id: 2,
        employee: "Jane Smith",
        type: "Casual Leave",
        from: "2025-02-22",
        to: "2025-02-23",
        days: 2,
        reason: "Family Function",
        status: "Approved",
        isEarlyLeave: false
      }
    ];

    setLeaves([...existingLeaves, ...earlyLeaveItems]);
  }, [pendingLeaves]);

  // ✅ Filter leaves
  const filtered = leaves
    .filter(l =>
      l.employee.toLowerCase().includes(search.toLowerCase())
    )
    .filter(l => (filter === "All" ? true : l.status === filter))
    .filter(l => showOnlyEarly ? l.isEarlyLeave : true);

  const statusColor = (status) => {
    if (status === "Approved") return { background: "#064e3b", color: "#6ee7b7" };
    if (status === "Rejected") return { background: "#4c0519", color: "#fda4af" };
    return { background: "#1e3a8a", color: "#93c5fd" };
  };

  // ✅ Early leave badge style
  const earlyLeaveBadge = {
    background: "#fef3c7",
    color: "#92400e",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "10px",
    marginLeft: "6px",
    border: "1px solid #fbbf24"
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "400px",
        color: "white" 
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "20px" }}>⏳</div>
          <p>Loading leave requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      
      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <h2 style={{ marginBottom:"4px" }}>📝 Leave Management</h2>
          <p style={{ color:"#9ca3af", fontSize:"13px" }}>
            Manage employee leave requests {showOnlyEarly && "(Early Leaves Only)"}
            {pendingLeaves.length > 0 && ` • ${pendingLeaves.length} pending early leaves`}
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
        gap:"16px",
        margin:"18px 0"
      }}>
        <Card icon="📝" title="Total Requests" value={leaves.length} color="#374151"/>
        <Card icon="✅" title="Approved" value={leaves.filter(l=>l.status==="Approved").length} left="#10b981"/>
        <Card icon="⛔" title="Rejected" value={leaves.filter(l=>l.status==="Rejected").length} left="#ef4444"/>
        <Card icon="⏳" title="Pending" value={leaves.filter(l=>l.status==="Pending").length} left="#3b82f6"/>
        {/* ✅ Early Leaves Card */}
        <Card 
          icon="🚨" 
          title="Early Leaves" 
          value={pendingLeaves.length} 
          left="#f59e0b"
          subtitle={`${pendingLeaves.filter(l => l.status === "pending").length} pending`}
        />
      </div>

      {/* FILTER BAR */}
      <div style={{ 
        display:"flex", 
        justifyContent:"space-between", 
        alignItems:"center",
        marginBottom: "15px" 
      }}>
        <h3>📋 Leave Requests</h3>

        <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
          {/* ✅ Early Leave Filter Toggle */}
          <label style={{ display:"flex", alignItems:"center", gap:"5px", cursor:"pointer" }}>
            <input
              type="checkbox"
              checked={showOnlyEarly}
              onChange={(e) => setShowOnlyEarly(e.target.checked)}
              style={{ width: "16px", height: "16px", accentColor: "#f59e0b" }}
            />
            <span style={{ fontSize: "14px", color: "#f59e0b" }}>
              Show Early Leaves Only
            </span>
          </label>

          <input
            placeholder="Search employee..."
            style={input}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <select
            style={input}
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Pending</option>
          </select>

          {/* ✅ Refresh Button */}
          <button
            onClick={fetchPendingEarlyLeaves}
            style={{
              background: "#3b82f6",
              border: "none",
              padding: "10px 15px",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table style={{ width:"100%", marginTop:"10px", borderCollapse:"collapse" }}>
        <thead>
          <tr>
            <Th>Employee</Th>
            <Th>Leave Type</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Days</Th>
            <Th>Reason</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(l => (
            <tr key={l.id} style={l.isEarlyLeave ? { background: "rgba(254, 243, 199, 0.1)" } : {}}>
              <TdWhite>
                {l.employee}
                {l.isEarlyLeave && (
                  <span style={earlyLeaveBadge}>🚨 Early</span>
                )}
              </TdWhite>
              
              <Td>
                {l.type}
                {l.isEarlyLeave && l.earlyLeaveTime && (
                  <div style={{ fontSize: "11px", color: "#f59e0b", marginTop: "2px" }}>
                    ⏰ Time: {l.earlyLeaveTime}
                  </div>
                )}
              </Td>
              
              <Td>{l.from}</Td>
              <Td>{l.to}</Td>
              <Td>{l.days}</Td>
              
              <Td>
                <div style={{ maxWidth: "200px" }}>
                  {l.reason}
                  {l.isEarlyLeave && l.appliedDate && (
                    <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>
                      Applied: {l.appliedDate}
                    </div>
                  )}
                </div>
              </Td>

              <Td>
                <span style={{
                  padding:"6px 10px",
                  borderRadius:"8px",
                  fontSize:"11px",
                  ...statusColor(l.status)
                }}>
                  {l.status}
                  {l.isEarlyLeave && l.earlyLeaveApproved && " ✓"}
                </span>
              </Td>

              <Td>
                {/* ✅ Early Leave Actions */}
                {l.isEarlyLeave && l.status === "Pending" && (
                  <>
                    <button 
                      style={btnGreen} 
                      onClick={()=>handleApproveLeave(l.id, "approved")}
                      title="Approve Early Leave"
                    >
                      ✅ Approve
                    </button>
                    
                    <button 
                      style={btnYellow} 
                      onClick={()=>handleApproveLeave(l.id, "rejected")}
                      title="Reject Early Leave"
                    >
                      ❌ Reject
                    </button>
                    
                    <button 
                      style={{ 
                        background: "#8b5cf6", 
                        border: 0, 
                        padding: "6px 8px", 
                        marginRight: "6px", 
                        borderRadius: "6px", 
                        cursor: "pointer",
                        color: "white",
                        fontSize: "11px"
                      }}
                      onClick={() => {
                        alert(`Early Leave Details:\n\nEmployee: ${l.employee}\nTime: ${l.earlyLeaveTime}\nReason: ${l.reason}\nStatus: ${l.status}\nApplied: ${l.appliedDate}`);
                      }}
                      title="View Details"
                    >
                      👁️ View
                    </button>
                  </>
                )}

                {/* Regular Leave Actions */}
                {!l.isEarlyLeave && (
                  <>
                    {l.status !== "Approved" && (
                      <button style={btnGreen} onClick={()=>{/* your regular approve */}}>✔</button>
                    )}
                    {l.status !== "Rejected" && (
                      <button style={btnYellow} onClick={()=>{/* your regular reject */}}>✖</button>
                    )}
                  </>
                )}

                {/* Delete Button */}
                <button style={btnRed} onClick={()=>{
                  if (window.confirm("Delete Leave Request?")) {
                    // Handle delete
                  }
                }} title="Delete Leave">
                  🗑
                </button>
              </Td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign:"center", padding:"40px" }}>
                {showOnlyEarly ? "🚫 No Early Leave Requests Found" : "❌ No Leave Requests Found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Early Leave Instructions */}
      {showOnlyEarly && filtered.length > 0 && (
        <div style={{
          background: "#fef3c7",
          border: "1px solid #fbbf24",
          borderRadius: "8px",
          padding: "15px",
          marginTop: "20px",
          color: "#92400e"
        }}>
          <strong>🚨 Early Leave Management Instructions:</strong>
          <ul style={{ margin: "10px 0 0 20px", fontSize: "13px" }}>
            <li>Early leave requests need explicit admin approval</li>
            <li>After approval, employee can punch out at specified time</li>
            <li>System will automatically track early punch outs</li>
            <li>Rejected early leaves require employee to complete 7 hours</li>
            <li>Refresh to see latest requests</li>
          </ul>
        </div>
      )}

    </div>
  );
};

/* ---------- Reusable Components ---------- */
const Card = ({ icon, title, value, left, subtitle }) => (
  <div style={{
    background:"#1e293b",
    border:"1px solid #374151",
    borderRadius:"8px",
    padding:"14px",
    borderLeft: left ? `4px solid ${left}` : "4px solid #6b7280"
  }}>
    <div style={{ fontSize:"25px" }}>{icon}</div>
    <h3 style={{ margin: "8px 0", fontSize: "14px", color: "#d1d5db" }}>{title}</h3>
    <p style={{ fontSize:"28px", fontWeight:"bold", margin: "0" }}>{value}</p>
    {subtitle && (
      <p style={{ fontSize:"12px", color: "#9ca3af", marginTop: "5px" }}>{subtitle}</p>
    )}
  </div>
);

const Th = ({children}) => (
  <th style={{
    textAlign:"left",
    padding:"10px",
    background:"#111827",
    borderBottom:"1px solid #374151",
    color:"#9ca3af"
  }}>{children}</th>
);

const Td = ({children}) => (
  <td style={{
    padding:"12px",
    borderBottom:"1px solid #374151"
  }}>{children}</td>
);

const TdWhite = ({children}) => (
  <Td>
    <span style={{ color:"white" }}>{children}</span>
  </Td>
);

const input = {
  background:"#020617",
  color:"white",
  border:"1px solid #374151",
  padding:"10px",
  borderRadius:"6px",
  fontSize: "14px"
};

const btnGreen = { 
  background:"#10b981", 
  border:0, 
  padding:"6px 10px", 
  marginRight:"6px", 
  borderRadius:"6px", 
  cursor:"pointer",
  color: "white",
  fontSize: "11px"
};

const btnYellow = { 
  background:"#f59e0b", 
  border:0, 
  padding:"6px 10px", 
  marginRight:"6px", 
  borderRadius:"6px", 
  cursor:"pointer",
  color: "white",
  fontSize: "11px"
};

const btnRed = { 
  background:"#ef4444", 
  border:0, 
  padding:"6px 8px", 
  borderRadius:"6px", 
  cursor:"pointer",
  color: "white",
  fontSize: "11px"
};

export default LeavesPage;