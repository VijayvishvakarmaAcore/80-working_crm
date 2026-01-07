// import React, { useState } from "react";

// const SalaryAdminPage = () => {

//   const [salaries, setSalaries] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       empId: "EMP001",
//       department: "Engineering",
//       month: "February 2025",
//       basic: 40000,
//       bonus: 5000,
//       deduction: 2000,
//       net: 43000,
//       status: "Pending"
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       empId: "EMP002",
//       department: "Design",
//       month: "February 2025",
//       basic: 38000,
//       bonus: 4000,
//       deduction: 1000,
//       net: 41000,
//       status: "Paid"
//     }
//   ]);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");

//   const changeStatus = (id, status) => {
//     setSalaries(
//       salaries.map(s => s.id === id ? { ...s, status } : s)
//     );
//   };

//   const deleteSalary = (id) => {
//     if (window.confirm("Delete Salary Record?")) {
//       setSalaries(salaries.filter(s => s.id !== id));
//     }
//   };

//   const filtered = salaries
//     .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
//     .filter(s => filter === "All" ? true : s.status === filter);

//   return (
//     <div style={{ color:"white" }}>

//       {/* UNIQUE CURVE HEADER */}
//       <div style={{
//         background:"linear-gradient(135deg,#0f172a,#1e40af,#3b82f6)",
//         padding:"22px",
//         borderRadius:"16px",
//         position:"relative",
//         overflow:"hidden",
//         boxShadow:"0 30px 60px rgba(0,0,0,.6)"
//       }}>
//         <div style={{
//           position:"absolute",
//           width:"180px",
//           height:"180px",
//           background:"rgba(255,255,255,0.08)",
//           borderRadius:"50%",
//           right:"-30px",
//           top:"-30px"
//         }}></div>

//         <h2 style={{ margin:0 }}>💰 Salary & Payroll Management</h2>
//         <p style={{ margin:0, color:"#d1d5db" }}>
//           Handle employee salary, payouts & payroll approvals
//         </p>
//       </div>

//       {/* NEW STYLE INFO STRIP */}
//       <div style={{
//         display:"grid",
//         gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
//         gap:"14px",
//         marginTop:"18px"
//       }}>
        
//         <InfoCard label="Total Employees" value={salaries.length} icon="👥" />
//         <InfoCard label="Paid Salaries" value={salaries.filter(s=>s.status==='Paid').length} icon="💸" color="#10b981" />
//         <InfoCard label="Pending Salaries" value={salaries.filter(s=>s.status==='Pending').length} icon="⏳" color="#f59e0b" />
//         <InfoCard label="Rejected Requests" value={salaries.filter(s=>s.status==='Rejected').length} icon="❌" color="#ef4444" />

//       </div>

//       {/* FILTER PANEL CHIP STYLE */}
//       <div style={{
//         marginTop:"18px",
//         background:"#020617",
//         border:"1px solid #374151",
//         padding:"14px",
//         borderRadius:"12px",
//         display:"flex",
//         gap:"10px",
//         flexWrap:"wrap"
//       }}>
//         <input
//           style={input}
//           placeholder="Search employee..."
//           value={search}
//           onChange={(e)=>setSearch(e.target.value)}
//         />

//         <select
//           style={input}
//           value={filter}
//           onChange={(e)=>setFilter(e.target.value)}
//         >
//           <option>All</option>
//           <option>Paid</option>
//           <option>Pending</option>
//           <option>Rejected</option>
//         </select>
//       </div>

//       {/* TABLE — RESPONSIVE */}
//       <div style={{ width:"100%", overflowX:"auto" }}>
//         <table style={{
//           width:"100%",
//           marginTop:"10px",
//           borderCollapse:"collapse",
//           minWidth:"1000px"
//         }}>
//           <thead>
//             <tr>
//               <Th>Name</Th>
//               <Th>Emp ID</Th>
//               <Th>Dept</Th>
//               <Th>Month</Th>
//               <Th>Basic</Th>
//               <Th>Bonus</Th>
//               <Th>Deduction</Th>
//               <Th>Net Salary</Th>
//               <Th>Status</Th>
//               <Th>Action</Th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map(s => (
//               <tr key={s.id}>
//                 <TdWhite>{s.name}</TdWhite>
//                 <Td>{s.empId}</Td>
//                 <Td>{s.department}</Td>
//                 <Td>{s.month}</Td>
//                 <Td>₹{s.basic}</Td>
//                 <Td>₹{s.bonus}</Td>
//                 <Td>₹{s.deduction}</Td>
//                 <Td style={{ fontWeight:"bold" }}>₹{s.net}</Td>

//                 <Td>
//                   <span style={{
//                     padding:"6px 10px",
//                     borderRadius:"8px",
//                     fontSize:"11px",
//                     background:
//                       s.status === "Paid" ? "#064e3b" :
//                       s.status === "Rejected" ? "#4c0519" :
//                       "#1e3a8a",
//                     color:
//                       s.status === "Paid" ? "#6ee7b7" :
//                       s.status === "Rejected" ? "#fda4af" :
//                       "#bfdbfe"
//                   }}>
//                     {s.status}
//                   </span>
//                 </Td>

//                 <Td>
//                   {s.status !== "Paid" && (
//                     <button style={btnGreen} onClick={()=>changeStatus(s.id,"Paid")}>💸 Pay</button>
//                   )}

//                   {s.status !== "Rejected" && (
//                     <button style={btnYellow} onClick={()=>changeStatus(s.id,"Rejected")}>❌</button>
//                   )}

//                   <button style={btnBlue} onClick={()=>alert("Salary Slip Generated (Demo)")}>📄</button>
//                   <button style={btnRed} onClick={()=>deleteSalary(s.id)}>🗑</button>
//                 </Td>
//               </tr>
//             ))}

//             {filtered.length === 0 && (
//               <tr>
//                 <td colSpan="10" style={{ textAlign:"center", padding:"20px" }}>
//                   ❌ No Salary Records Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// };

// // Reusable Info Card
// const InfoCard = ({label,value,icon,color}) => (
//   <div style={{
//     background:"#0f172a",
//     border:"1px solid #374151",
//     borderRadius:"14px",
//     padding:"16px",
//     display:"flex",
//     alignItems:"center",
//     justifyContent:"space-between"
//   }}>
//     <div>
//       <p style={{ margin:0, color:"#9ca3af" }}>{label}</p>
//       <h2 style={{ margin:0 }}>{value}</h2>
//     </div>
//     <span style={{
//       fontSize:"34px",
//       border:`1px solid ${color || "#6366f1"}`,
//       padding:"8px 12px",
//       borderRadius:"12px",
//       background:"#020617"
//     }}>{icon}</span>
//   </div>
// );

// // UI Components
// const Th = ({children}) => (
//   <th style={{
//     textAlign:"left",
//     padding:"10px",
//     background:"#020617",
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
//   <Td><span style={{ color:"white" }}>{children}</span></Td>
// );

// const input = {
//   background:"#020617",
//   color:"white",
//   border:"1px solid #374151",
//   padding:"10px",
//   borderRadius:"8px"
// };

// const btnGreen = { background:"#10b981", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
// const btnYellow = { background:"#f59e0b", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
// const btnBlue = { background:"#2563eb", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
// const btnRed = { background:"#ef4444", border:0, padding:"6px 8px", borderRadius:"6px", cursor:"pointer" };

// export default SalaryAdminPage;






import React, { useState } from "react";

const SalaryAdminPage = () => {

  const [salaries, setSalaries] = useState([
    {
      id: 1,
      name: "John Doe",
      empId: "EMP001",
      department: "Engineering",
      month: "February 2025",
      basic: 40000,
      bonus: 5000,
      deduction: 2000,
      net: 43000,
      status: "Pending"
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    empId: "",
    department: "",
    month: "",
    basic: "",
    bonus: "",
    deduction: "",
    net: "",
    status: "Pending"
  });

  // Open ADD
  const openAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      empId: "",
      department: "",
      month: "",
      basic: "",
      bonus: "",
      deduction: "",
      net: "",
      status: "Pending"
    });
    setModalOpen(true);
  };

  // Open EDIT
  const openEdit = (item) => {
    setEditing(item);
    setForm(item);
    setModalOpen(true);
  };

  // Calculate Net Salary Auto
  const calculateNet = (basic, bonus, deduction) => {
    const b = Number(basic || 0);
    const bo = Number(bonus || 0);
    const d = Number(deduction || 0);
    return b + bo - d;
  };

  // Save Salary
  const saveSalary = () => {
    if (!form.name || !form.empId || !form.month)
      return alert("Please fill required fields");

    const netSalary = calculateNet(form.basic, form.bonus, form.deduction);

    const salaryData = {
      ...form,
      net: netSalary
    };

    if (editing) {
      setSalaries(salaries.map(s => s.id === editing.id ? salaryData : s));
    } else {
      setSalaries([{ ...salaryData, id: Date.now() }, ...salaries]);
    }

    setModalOpen(false);
  };

  const changeStatus = (id, status) => {
    setSalaries(salaries.map(s => s.id === id ? { ...s, status } : s));
  };

  const deleteSalary = (id) => {
    if (window.confirm("Delete Salary Record?")) {
      setSalaries(salaries.filter(s => s.id !== id));
    }
  };

  const filtered = salaries
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    .filter(s => filter === "All" ? true : s.status === filter);

  return (
    <div style={{ color:"white" }}>

      {/* PREMIUM HEADER */}
      <div style={{
        background:"linear-gradient(135deg,#0f172a,#1e40af,#3b82f6)",
        padding:"24px",
        borderRadius:"16px",
        boxShadow:"0 30px 60px rgba(0,0,0,.7)"
      }}>
        <h2 style={{ margin:0 }}>💰 Salary & Payroll Management</h2>
        <p style={{ margin:0, color:"#cbd5e1" }}>HR controls complete salary system</p>
      </div>

      {/* ACTION BAR */}
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:"18px",
        flexWrap:"wrap",
        gap:"10px"
      }}>
        <div style={{ display:"flex", gap:"10px" }}>
          <input
            placeholder="Search employee..."
            style={input}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <select style={input} value={filter} onChange={(e)=>setFilter(e.target.value)}>
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>

        <button
          style={btnGreenBig}
          onClick={openAdd}
        >
          ➕ Add Salary Record
        </button>
      </div>

      {/* TABLE */}
      <div style={{ width:"100%", overflowX:"auto" }}>
        <table style={{ width:"100%", marginTop:"10px", minWidth:"1000px", borderCollapse:"collapse" }}>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Emp ID</Th>
              <Th>Month</Th>
              <Th>Basic</Th>
              <Th>Bonus</Th>
              <Th>Deduction</Th>
              <Th>Net</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <TdWhite>{s.name}</TdWhite>
                <Td>{s.empId}</Td>
                <Td>{s.month}</Td>
                <Td>₹{s.basic}</Td>
                <Td>₹{s.bonus}</Td>
                <Td>₹{s.deduction}</Td>
                <Td style={{ fontWeight:"bold" }}>₹{s.net}</Td>

                <Td>
                  <span style={{
                    padding:"6px 10px",
                    borderRadius:"10px",
                    fontSize:"11px",
                    background: s.status==="Paid" ? "#064e3b" :
                               s.status==="Rejected"? "#4c0519" :
                               "#1e3a8a",
                    color: s.status==="Paid" ? "#6ee7b7" :
                            s.status==="Rejected"? "#fda4af" :
                            "#bfdbfe"
                  }}>
                    {s.status}
                  </span>
                </Td>

                <Td>
                  <button style={btnYellow} onClick={()=>openEdit(s)}>✏️</button>
                  {s.status !== "Paid" && <button style={btnGreen} onClick={()=>changeStatus(s.id,"Paid")}>💸</button>}
                  <button style={btnRed} onClick={()=>deleteSalary(s.id)}>🗑</button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* MODAL */}
      {modalOpen && (
        <div style={overlay}>
          <div style={modal}>
            <h3>{editing ? "✏️ Edit Salary" : "➕ Add Salary"}</h3>

            <input style={input} placeholder="Employee Name"
              value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />

            <input style={input} placeholder="Employee ID"
              value={form.empId} onChange={(e)=>setForm({...form,empId:e.target.value})} />

            <input style={input} placeholder="Department"
              value={form.department} onChange={(e)=>setForm({...form,department:e.target.value})} />

            <input style={input} placeholder="Month (ex: February 2025)"
              value={form.month} onChange={(e)=>setForm({...form,month:e.target.value})} />

            <input style={input} placeholder="Basic Salary"
              value={form.basic} onChange={(e)=>setForm({...form,basic:e.target.value})} />

            <input style={input} placeholder="Bonus"
              value={form.bonus} onChange={(e)=>setForm({...form,bonus:e.target.value})} />

            <input style={input} placeholder="Deduction"
              value={form.deduction} onChange={(e)=>setForm({...form,deduction:e.target.value})} />

            <h4>Net Salary: ₹ {calculateNet(form.basic,form.bonus,form.deduction)}</h4>

            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <button style={btnGreenBig} onClick={saveSalary}>💾 Save</button>
              <button style={btnRedBig} onClick={()=>setModalOpen(false)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


// UI Components
const Th = ({children}) => (
  <th style={{
    textAlign:"left",
    padding:"10px",
    background:"#020617",
    borderBottom:"1px solid #374151",
    color:"#9ca3af"
  }}>{children}</th>
);

const Td = ({children}) => (
  <td style={{ padding:"12px", borderBottom:"1px solid #374151" }}>{children}</td>
);

const TdWhite = ({children}) => <Td><span style={{ color:"white" }}>{children}</span></Td>;

const input = {
  background:"#020617",
  color:"white",
  border:"1px solid #374151",
  padding:"10px",
  borderRadius:"8px",
  width:"100%"
};

const btnGreenBig = { background:"#10b981", padding:"10px 14px", borderRadius:"8px", border:0, cursor:"pointer" };
const btnRedBig = { background:"#ef4444", padding:"10px 14px", borderRadius:"8px", border:0, cursor:"pointer" };
const btnYellow = { background:"#f59e0b", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
const btnGreen = { background:"#22c55e", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
const btnRed = { background:"#ef4444", border:0, padding:"6px 8px", borderRadius:"6px", cursor:"pointer" };

const overlay = { position:"fixed", inset:0, background:"#000000ba", display:"flex", justifyContent:"center", alignItems:"center" };
const modal = { width:"480px", background:"#0f172a", padding:"16px", borderRadius:"14px", border:"1px solid #374151" };

export default SalaryAdminPage;
