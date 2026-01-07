import React, { useState } from "react";

const CelebrationAdminPage = () => {

  const [celebrations, setCelebrations] = useState([
    {
      id: 1,
      title: "Happy Birthday John 🎂",
      name: "John Doe",
      empId: "EMP001",
      type: "Birthday",
      date: "2025-03-01",
      status: "Active"
    },
    {
      id: 2,
      title: "2 Year Work Anniversary 🎉",
      name: "Jane Smith",
      empId: "EMP002",
      type: "Work Anniversary",
      date: "2025-03-10",
      status: "Inactive"
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    name: "",
    empId: "",
    type: "Birthday",
    date: "",
    status: "Active"
  });

  const openAdd = () => {
    setEditing(null);
    setForm({
      title: "",
      name: "",
      empId: "",
      type: "Birthday",
      date: "",
      status: "Active"
    });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm(item);
    setModalOpen(true);
  };

  const saveCelebration = () => {
    if (!form.title || !form.name || !form.date)
      return alert("Please fill required fields");

    if (editing) {
      setCelebrations(
        celebrations.map(c => c.id === editing.id ? form : c)
      );
    } else {
      setCelebrations([{ ...form, id: Date.now() }, ...celebrations]);
    }

    setModalOpen(false);
  };

  const toggleStatus = (id) => {
    setCelebrations(
      celebrations.map(c =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );
  };

  const deleteCelebration = (id) => {
    if (window.confirm("Delete Celebration?")) {
      setCelebrations(celebrations.filter(c => c.id !== id));
    }
  };

  const filtered = celebrations
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter(c => filter === "All" ? true : c.type === filter);

  return (
    <div style={{ color:"white" }}>

      {/* PREMIUM HEADER */}
      <div style={{
        background:"linear-gradient(135deg,#0f172a,#7c3aed,#a855f7)",
        padding:"24px",
        borderRadius:"16px",
        boxShadow:"0 30px 60px rgba(0,0,0,.7)"
      }}>
        <h2 style={{ margin:0 }}>🎉 Celebration & Events Management</h2>
        <p style={{ margin:0, color:"#d1d5db" }}>
          HR controls birthday, anniversaries & achievements
        </p>
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

          <select
            style={input}
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Birthday</option>
            <option>Work Anniversary</option>
            <option>Achievement</option>
            <option>Other</option>
          </select>
        </div>

        <button style={btnGreenBig} onClick={openAdd}>
          ➕ Add Celebration
        </button>
      </div>

      {/* TABLE */}
      <div style={{ width:"100%", overflowX:"auto" }}>
        <table style={{
          width:"100%",
          marginTop:"10px",
          minWidth:"900px",
          borderCollapse:"collapse"
        }}>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Employee</Th>
              <Th>Emp ID</Th>
              <Th>Type</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <TdWhite>{c.title}</TdWhite>
                <Td>{c.name}</Td>
                <Td>{c.empId}</Td>
                <Td>{c.type}</Td>
                <Td>{c.date}</Td>

                <Td>
                  <span style={{
                    padding:"6px 10px",
                    borderRadius:"8px",
                    fontSize:"11px",
                    background: c.status==="Active" ? "#064e3b" : "#4c0519",
                    color: c.status==="Active" ? "#6ee7b7" : "#fda4af"
                  }}>
                    {c.status}
                  </span>
                </Td>

                <Td>
                  <button style={btnBlue} onClick={()=>openEdit(c)}>✏️</button>
                  <button style={btnYellow} onClick={()=>toggleStatus(c.id)}>🔄</button>
                  <button style={btnRed} onClick={()=>deleteCelebration(c.id)}>🗑</button>
                </Td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign:"center", padding:"20px" }}>
                  ❌ No Celebration Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* MODAL */}
      {modalOpen && (
        <div style={overlay}>
          <div style={modal}>
            <h3>{editing ? "✏️ Edit Celebration" : "➕ Add Celebration"}</h3>

            <input style={input} placeholder="Celebration Title"
              value={form.title}
              onChange={(e)=>setForm({...form,title:e.target.value})}
            />

            <input style={input} placeholder="Employee Name"
              value={form.name}
              onChange={(e)=>setForm({...form,name:e.target.value})}
            />

            <input style={input} placeholder="Employee ID"
              value={form.empId}
              onChange={(e)=>setForm({...form,empId:e.target.value})}
            />

            <select
              style={input}
              value={form.type}
              onChange={(e)=>setForm({...form,type:e.target.value})}
            >
              <option>Birthday</option>
              <option>Work Anniversary</option>
              <option>Achievement</option>
              <option>Other</option>
            </select>

            <input
              style={input}
              type="date"
              value={form.date}
              onChange={(e)=>setForm({...form,date:e.target.value})}
            />

            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <button style={btnGreenBig} onClick={saveCelebration}>💾 Save</button>
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
  <td style={{
    padding:"12px",
    borderBottom:"1px solid #374151"
  }}>{children}</td>
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

const btnGreenBig = { background:"#22c55e", padding:"10px 14px", borderRadius:"8px", border:0, cursor:"pointer" };
const btnRedBig = { background:"#ef4444", padding:"10px 14px", borderRadius:"8px", border:0, cursor:"pointer" };
const btnYellow = { background:"#f59e0b", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
const btnBlue = { background:"#2563eb", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
const btnRed = { background:"#ef4444", border:0, padding:"6px 8px", borderRadius:"6px", cursor:"pointer" };

const overlay = { position:"fixed", inset:0, background:"#000000b0", display:"flex", justifyContent:"center", alignItems:"center" };
const modal = { width:"480px", background:"#0f172a", padding:"16px", borderRadius:"14px", border:"1px solid #374151" };

export default CelebrationAdminPage;
