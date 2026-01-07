// import React, { useState } from "react";

// const AdminRegisterEmployee = () => {

//   const [employee, setEmployee] = useState({
//     fullName: "",
//     empId: "",
//     email: "",
//     mobile: "",
//     gender: "",
//     dob: "",
//     department: "",
//     designation: "",
//     employeeType: "",
//     dateOfJoining: "",
//     employmentStatus: "Active",
//     reportingManager: "",
//     workLocation: "",
//     shiftTiming: "",
//     probationPeriod: "",
//     emergencyName: "",
//     emergencyRelation: "",
//     emergencyContact: "",
//     basicSalary: "",
//     allowance: "",
//     deduction: "",
//     netSalary: "",
//     pan: "",
//     aadhar: "",
//     bankName: "",
//     account: "",
//     ifsc: "",
//   });

//   const handleChange = (e) => {
//     setEmployee({
//       ...employee,
//       [e.target.name]: e.target.value
//     });
//   };

//   const autoNetSalary = () => {
//     const basic = Number(employee.basicSalary || 0);
//     const allo = Number(employee.allowance || 0);
//     const ded = Number(employee.deduction || 0);
//     return basic + allo - ded;
//   };

//   const submitForm = (e) => {
//     e.preventDefault();

//     if(!employee.fullName || !employee.empId || !employee.email || !employee.dateOfJoining){
//       alert("Please fill required * fields");
//       return;
//     }

//     alert("Employee Registered Successfully (Demo)");
//     console.log(employee);
//   };

//   return (
//     <div style={{ color:"white" }}>

//       {/* HEADER */}
//       <div style={{
//         background:"linear-gradient(135deg,#0f172a,#047857,#22c55e)",
//         padding:"22px",
//         borderRadius:"16px",
//         boxShadow:"0 30px 60px rgba(0,0,0,.7)"
//       }}>
//         <h2 style={{ margin:0 }}>👤 Register New Employee (HR Panel)</h2>
//         <p style={{ margin:0, color:"#d1d5db" }}>
//           Only Admin / HR can register employees with full verified details.
//         </p>
//       </div>

//       <form onSubmit={submitForm} style={{ marginTop:"18px" }}>

//         {/* SECTION */}
//         <Section title="Personal Information">
          
//           <Grid>
//             <Input label="Full Name *" name="fullName" value={employee.fullName} onChange={handleChange}/>
//             <Input label="Employee ID *" name="empId" value={employee.empId} onChange={handleChange}/>
//           </Grid>

//           <Grid>
//             <Input label="Email *" name="email" value={employee.email} onChange={handleChange}/>
//             <Input label="Mobile" name="mobile" value={employee.mobile} onChange={handleChange}/>
//           </Grid>

//           <Grid>
//             <Select label="Gender" name="gender" value={employee.gender} onChange={handleChange}
//               options={["Male","Female","Other"]}/>
//             <Input type="date" label="Date of Birth" name="dob" value={employee.dob} onChange={handleChange}/>
//           </Grid>

//         </Section>

//         <Section title="Employment Details">

//           <Grid>
//             <Select label="Department *" name="department" value={employee.department} onChange={handleChange}
//               options={["Engineering","Design","HR","Finance","Support"]}/>
//             <Select label="Designation" name="designation" value={employee.designation} onChange={handleChange}
//               options={["Developer","Manager","Team Lead","Designer","Intern"]}/>
//           </Grid>

//           <Grid>
//             <Select label="Employee Type *" name="employeeType" value={employee.employeeType} onChange={handleChange}
//               options={["Full Time","Part Time","Intern","Contract"]}/>
//             <Input type="date" label="Date Of Joining *" name="dateOfJoining" value={employee.dateOfJoining} onChange={handleChange}/>
//           </Grid>

//           <Grid>
//             <Input label="Reporting Manager" name="reportingManager" value={employee.reportingManager} onChange={handleChange}/>
//             <Input label="Work Location" name="workLocation" value={employee.workLocation} onChange={handleChange}/>
//           </Grid>

//           <Grid>
//             <Input label="Shift Timing" name="shiftTiming" value={employee.shiftTiming} onChange={handleChange}/>
//             <Input label="Probation Period (Months)" name="probationPeriod" value={employee.probationPeriod} onChange={handleChange}/>
//           </Grid>

//         </Section>

//         <Section title="Emergency Details">

//           <Grid>
//             <Input label="Emergency Contact Name" name="emergencyName" value={employee.emergencyName} onChange={handleChange}/>
//             <Input label="Relation" name="emergencyRelation" value={employee.emergencyRelation} onChange={handleChange}/>
//           </Grid>

//           <Grid>
//             <Input label="Emergency Contact Number" name="emergencyContact" value={employee.emergencyContact} onChange={handleChange}/>
//           </Grid>

//         </Section>

//         <Section title="Salary Setup">

//           <Grid>
//             <Input label="Basic Salary" name="basicSalary" value={employee.basicSalary} onChange={handleChange}/>
//             <Input label="Allowance" name="allowance" value={employee.allowance} onChange={handleChange}/>
//             <Input label="Deduction" name="deduction" value={employee.deduction} onChange={handleChange}/>
//           </Grid>

//           <h3>Net Salary : ₹ {autoNetSalary()}</h3>

//         </Section>

//         <Section title="Documents">

//           <Grid>
//             <Input label="PAN Number" name="pan" value={employee.pan} onChange={handleChange}/>
//             <Input label="Aadhar Number" name="aadhar" value={employee.aadhar} onChange={handleChange}/>
//           </Grid>

//           <Grid>
//             <Input label="Bank Name" name="bankName" value={employee.bankName} onChange={handleChange}/>
//             <Input label="Account Number" name="account" value={employee.account} onChange={handleChange}/>
//             <Input label="IFSC Code" name="ifsc" value={employee.ifsc} onChange={handleChange}/>
//           </Grid>

//         </Section>

//         <button style={submitBtn}>Register Employee</button>

//       </form>

//     </div>
//   );
// };

// /* ---------- SMALL COMPONENTS ---------- */
// const Section = ({title, children}) => (
//   <div style={{
//     background:"#020617",
//     border:"1px solid #374151",
//     padding:"16px",
//     borderRadius:"12px",
//     marginTop:"18px"
//   }}>
//     <h3 style={{ marginTop:0 }}>{title}</h3>
//     {children}
//   </div>
// );

// const Grid = ({children}) => (
//   <div style={{
//     display:"grid",
//     gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
//     gap:"14px",
//     marginTop:"8px"
//   }}>{children}</div>
// );

// const Input = ({label,type="text",...props}) => (
//   <div>
//     <label>{label}</label>
//     <input type={type} style={input} {...props}/>
//   </div>
// );

// const Select = ({label,options,...props}) => (
//   <div>
//     <label>{label}</label>
//     <select style={input} {...props}>
//       <option value="">Select</option>
//       {options.map(o=> <option key={o}>{o}</option>)}
//     </select>
//   </div>
// );

// /* ---------- STYLES ---------- */
// const input = {
//   background:"#020617",
//   color:"white",
//   border:"1px solid #374151",
//   padding:"10px",
//   borderRadius:"8px",
//   width:"100%"
// };

// const submitBtn = {
//   background:"#22c55e",
//   padding:"12px 18px",
//   borderRadius:"10px",
//   border:"none",
//   cursor:"pointer",
//   marginTop:"18px",
//   fontSize:"15px",
//   fontWeight:"bold"
// };

// export default AdminRegisterEmployee;





// import React, { useState } from "react";

// const AdminRegisterEmployee = () => {
//   const [employee, setEmployee] = useState({
//     fullName: "",
//     empId: "",
//     email: "",
//     mobile: "",
//     gender: "",
//     dob: "",
//     department: "",
//     designation: "",
//     employeeType: "",
//     dateOfJoining: "",
//     employmentStatus: "Active",
//     reportingManager: "",
//     workLocation: "",
//     shiftTiming: "",
//     probationPeriod: "",
//     emergencyName: "",
//     emergencyRelation: "",
//     emergencyContact: "",
//     basicSalary: "",
//     allowance: "",
//     deduction: "",
//     netSalary: "",
//     pan: "",
//     aadhar: "",
//     bankName: "",
//     account: "",
//     ifsc: "",
//   });

//   const handleChange = (e) => {
//     setEmployee({
//       ...employee,
//       [e.target.name]: e.target.value
//     });
//   };

//   const autoNetSalary = () => {
//     const basic = Number(employee.basicSalary || 0);
//     const allo = Number(employee.allowance || 0);
//     const ded = Number(employee.deduction || 0);
//     return basic + allo - ded;
//   };

//   const submitForm = (e) => {
//     e.preventDefault();

//     if(!employee.fullName || !employee.empId || !employee.email || !employee.dateOfJoining){
//       alert("Please fill required * fields");
//       return;
//     }

//     alert("Employee Registered Successfully (Demo)");
//     console.log(employee);
//   };

//   return (
//     <div className="admin-register-container">
//       {/* HEADER */}
//       <div className="register-header">
//         <div className="header-content">
//           <div className="header-icon">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//               <circle cx="9" cy="7" r="4"></circle>
//               <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
//               <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//             </svg>
//           </div>
//           <div>
//             <h2 className="header-title">Register New Employee</h2>
//             <p className="header-subtitle">
//               Only Admin / HR can register employees with full verified details.
//             </p>
//           </div>
//         </div>
//         <div className="header-badge">
//           HR Panel
//         </div>
//       </div>

//       <form onSubmit={submitForm} className="register-form">
//         {/* Personal Information */}
//         <Section title="Personal Information" icon="👤">
//           <Grid>
//             <Input 
//               label="Full Name *" 
//               name="fullName" 
//               value={employee.fullName} 
//               onChange={handleChange}
//               icon="user"
//               placeholder="Enter full name"
//             />
//             <Input 
//               label="Employee ID *" 
//               name="empId" 
//               value={employee.empId} 
//               onChange={handleChange}
//               icon="id-card"
//               placeholder="EMP-001"
//             />
//             <Input 
//               label="Email *" 
//               name="email" 
//               value={employee.email} 
//               onChange={handleChange}
//               type="email"
//               icon="mail"
//               placeholder="employee@company.com"
//             />
//             <Input 
//               label="Mobile" 
//               name="mobile" 
//               value={employee.mobile} 
//               onChange={handleChange}
//               type="tel"
//               icon="phone"
//               placeholder="+91 9876543210"
//             />
//           </Grid>

//           <Grid>
//             <Select 
//               label="Gender" 
//               name="gender" 
//               value={employee.gender} 
//               onChange={handleChange}
//               options={["Male","Female","Other"]}
//               icon="gender"
//             />
//             <Input 
//               type="date" 
//               label="Date of Birth" 
//               name="dob" 
//               value={employee.dob} 
//               onChange={handleChange}
//               icon="calendar"
//             />
//             <div></div>
//             <div></div>
//           </Grid>
//         </Section>

//         {/* Employment Details */}
//         <Section title="Employment Details" icon="💼">
//           <Grid>
//             <Select 
//               label="Department *" 
//               name="department" 
//               value={employee.department} 
//               onChange={handleChange}
//               options={["Engineering","Design","HR","Finance","Support","Marketing","Sales","Operations"]}
//               icon="building"
//             />
//             <Select 
//               label="Designation" 
//               name="designation" 
//               value={employee.designation} 
//               onChange={handleChange}
//               options={["Developer","Manager","Team Lead","Designer","Intern","Senior Developer","HR Executive","Finance Manager"]}
//               icon="briefcase"
//             />
//             <Select 
//               label="Employee Type *" 
//               name="employeeType" 
//               value={employee.employeeType} 
//               onChange={handleChange}
//               options={["Full Time","Part Time","Intern","Contract","Freelance"]}
//               icon="users"
//             />
//             <Input 
//               type="date" 
//               label="Date Of Joining *" 
//               name="dateOfJoining" 
//               value={employee.dateOfJoining} 
//               onChange={handleChange}
//               icon="calendar-check"
//             />
//           </Grid>

//           <Grid>
//             <Input 
//               label="Reporting Manager" 
//               name="reportingManager" 
//               value={employee.reportingManager} 
//               onChange={handleChange}
//               icon="user-check"
//               placeholder="Manager's name"
//             />
//             <Input 
//               label="Work Location" 
//               name="workLocation" 
//               value={employee.workLocation} 
//               onChange={handleChange}
//               icon="map-pin"
//               placeholder="City, Office"
//             />
//             <Input 
//               label="Shift Timing" 
//               name="shiftTiming" 
//               value={employee.shiftTiming} 
//               onChange={handleChange}
//               icon="clock"
//               placeholder="9:00 AM - 6:00 PM"
//             />
//             <Input 
//               label="Probation Period (Months)" 
//               name="probationPeriod" 
//               value={employee.probationPeriod} 
//               onChange={handleChange}
//               icon="calendar"
//               type="number"
//               placeholder="3"
//             />
//           </Grid>
//         </Section>

//         {/* Emergency Details */}
//         <Section title="Emergency Details" icon="🆘">
//           <Grid>
//             <Input 
//               label="Emergency Contact Name" 
//               name="emergencyName" 
//               value={employee.emergencyName} 
//               onChange={handleChange}
//               icon="user-plus"
//               placeholder="Contact person name"
//             />
//             <Input 
//               label="Relation" 
//               name="emergencyRelation" 
//               value={employee.emergencyRelation} 
//               onChange={handleChange}
//               icon="heart"
//               placeholder="Father/Mother/Spouse"
//             />
//             <Input 
//               label="Emergency Contact Number" 
//               name="emergencyContact" 
//               value={employee.emergencyContact} 
//               onChange={handleChange}
//               type="tel"
//               icon="phone-call"
//               placeholder="Emergency phone number"
//             />
//             <div></div>
//           </Grid>
//         </Section>

//         {/* Salary Setup */}
//         <Section title="Salary Setup" icon="💰">
//           <Grid>
//             <Input 
//               label="Basic Salary" 
//               name="basicSalary" 
//               value={employee.basicSalary} 
//               onChange={handleChange}
//               type="number"
//               icon="rupee-sign"
//               placeholder="0"
//             />
//             <Input 
//               label="Allowance" 
//               name="allowance" 
//               value={employee.allowance} 
//               onChange={handleChange}
//               type="number"
//               icon="plus-circle"
//               placeholder="0"
//             />
//             <Input 
//               label="Deduction" 
//               name="deduction" 
//               value={employee.deduction} 
//               onChange={handleChange}
//               type="number"
//               icon="minus-circle"
//               placeholder="0"
//             />
//             <div className="net-salary-preview">
//               <div className="net-salary-label">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <line x1="12" y1="1" x2="12" y2="23"></line>
//                   <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//                 </svg>
//                 Net Salary
//               </div>
//               <div className="net-salary-amount">₹ {autoNetSalary().toLocaleString()}</div>
//             </div>
//           </Grid>
//         </Section>

//         {/* Documents */}
//         <Section title="Documents" icon="📄">
//           <Grid>
//             <Input 
//               label="PAN Number" 
//               name="pan" 
//               value={employee.pan} 
//               onChange={handleChange}
//               icon="file-text"
//               placeholder="ABCDE1234F"
//             />
//             <Input 
//               label="Aadhar Number" 
//               name="aadhar" 
//               value={employee.aadhar} 
//               onChange={handleChange}
//               icon="id-card"
//               placeholder="1234 5678 9012"
//             />
//             <Input 
//               label="Bank Name" 
//               name="bankName" 
//               value={employee.bankName} 
//               onChange={handleChange}
//               icon="bank"
//               placeholder="Bank name"
//             />
//             <Input 
//               label="Account Number" 
//               name="account" 
//               value={employee.account} 
//               onChange={handleChange}
//               icon="credit-card"
//               placeholder="1234567890"
//             />
//           </Grid>
          
//           <Grid>
//             <Input 
//               label="IFSC Code" 
//               name="ifsc" 
//               value={employee.ifsc} 
//               onChange={handleChange}
//               icon="hash"
//               placeholder="ABCD0123456"
//             />
//             <div></div>
//             <div></div>
//             <div></div>
//           </Grid>
//         </Section>

//         {/* Form Actions */}
//         <div className="form-actions">
//           <button type="button" className="cancel-btn">
//             Cancel
//           </button>
//           <button type="submit" className="submit-btn">
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
//               <polyline points="17 21 17 13 7 13 7 21"></polyline>
//               <polyline points="7 3 7 8 15 8"></polyline>
//             </svg>
//             Register Employee
//           </button>
//         </div>
//       </form>

//       <style jsx>{`
//         .admin-register-container {
//           color: white;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//         }

//         /* Header Styles */
//         .register-header {
//           background: linear-gradient(135deg, #0f172a 0%, #047857 50%, #22c55e 100%);
//           padding: 24px 32px;
//           border-radius: 16px;
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 24px;
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           position: relative;
//           overflow: hidden;
//         }

//         .register-header::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
//         }

//         .header-content {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .header-icon {
//           background: rgba(255, 255, 255, 0.1);
//           padding: 12px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .header-title {
//           margin: 0;
//           font-size: 24px;
//           font-weight: 700;
//           background: linear-gradient(90deg, #fff 0%, #d1fae5 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .header-subtitle {
//           margin: 4px 0 0 0;
//           color: #d1fae5;
//           font-size: 14px;
//           opacity: 0.9;
//         }

//         .header-badge {
//           background: rgba(255, 255, 255, 0.1);
//           padding: 8px 16px;
//           border-radius: 20px;
//           font-size: 14px;
//           font-weight: 600;
//           color: #22c55e;
//           border: 1px solid rgba(34, 197, 94, 0.3);
//           backdrop-filter: blur(10px);
//         }

//         /* Form Styles */
//         .register-form {
//           display: flex;
//           flex-direction: column;
//           gap: 24px;
//         }

//         /* Section Component */
//         .section-container {
//           background: #0f172a;
//           border: 1px solid #1e293b;
//           padding: 24px;
//           border-radius: 16px;
//           transition: all 0.3s ease;
//           position: relative;
//         }

//         .section-container:hover {
//           border-color: #22c55e;
//           box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);
//         }

//         .section-title {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           margin: 0 0 24px 0;
//           font-size: 18px;
//           font-weight: 600;
//           color: #e2e8f0;
//           padding-bottom: 12px;
//           border-bottom: 2px solid #1e293b;
//         }

//         /* Grid Component - FIXED: Equal width for all fields */
//         .grid-container {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 20px;
//           margin-bottom: 20px;
//         }

//         /* Input Components - FIXED: Consistent sizing */
//         .input-group {
//           position: relative;
//           min-height: 72px;
//         }

//         .input-label {
//           display: block;
//           margin-bottom: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           color: #94a3b8;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .input-label:after {
//           content: ' *';
//           color: #ef4444;
//           opacity: ${props => props.required ? '1' : '0'};
//         }

//         .input-field {
//           width: 100%;
//           height: 44px;
//           padding: 0 16px 0 44px;
//           background: #1e293b;
//           border: 2px solid #334155;
//           border-radius: 10px;
//           color: #f8fafc;
//           font-size: 14px;
//           transition: all 0.3s ease;
//           box-sizing: border-box;
//         }

//         .input-field::placeholder {
//           color: #64748b;
//         }

//         .input-field:focus {
//           outline: none;
//           border-color: #22c55e;
//           box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
//         }

//         .input-icon {
//           position: absolute;
//           left: 16px;
//           bottom: 12px;
//           color: #64748b;
//           width: 16px;
//           height: 16px;
//           pointer-events: none;
//         }

//         /* Select Field */
//         .select-field {
//           width: 100%;
//           height: 44px;
//           padding: 0 16px 0 44px;
//           background: #1e293b;
//           border: 2px solid #334155;
//           border-radius: 10px;
//           color: #f8fafc;
//           font-size: 14px;
//           transition: all 0.3s ease;
//           cursor: pointer;
//           appearance: none;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 16px center;
//           box-sizing: border-box;
//         }

//         .select-field:focus {
//           outline: none;
//           border-color: #22c55e;
//           box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
//         }

//         /* Net Salary Preview */
//         .net-salary-preview {
//           background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
//           border: 2px solid #22c55e;
//           border-radius: 10px;
//           padding: 12px 16px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           height: 72px;
//           box-sizing: border-box;
//         }

//         .net-salary-label {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 12px;
//           font-weight: 600;
//           color: #94a3b8;
//           margin-bottom: 4px;
//         }

//         .net-salary-amount {
//           font-size: 18px;
//           font-weight: 700;
//           color: #22c55e;
//           white-space: nowrap;
//         }

//         /* Form Actions */
//         .form-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 16px;
//           padding: 24px 0;
//           border-top: 1px solid #1e293b;
//           margin-top: 24px;
//         }

//         .cancel-btn {
//           padding: 12px 32px;
//           background: transparent;
//           border: 2px solid #475569;
//           border-radius: 10px;
//           color: #94a3b8;
//           font-size: 14px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           height: 44px;
//         }

//         .cancel-btn:hover {
//           border-color: #64748b;
//           color: #e2e8f0;
//         }

//         .submit-btn {
//           padding: 12px 32px;
//           background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
//           border: none;
//           border-radius: 10px;
//           color: white;
//           font-size: 14px;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           transition: all 0.3s ease;
//           height: 44px;
//         }

//         .submit-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
//         }

//         .submit-btn:active {
//           transform: translateY(0);
//         }

//         /* Responsive Design - FIXED: Better mobile adaptation */
//         @media (max-width: 1200px) {
//           .grid-container {
//             grid-template-columns: repeat(3, 1fr);
//           }
//         }

//         @media (max-width: 992px) {
//           .grid-container {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         @media (max-width: 768px) {
//           .admin-register-container {
//             padding: 16px;
//           }

//           .register-header {
//             flex-direction: column;
//             gap: 16px;
//             text-align: center;
//             padding: 20px;
//           }

//           .header-content {
//             flex-direction: column;
//             text-align: center;
//           }

//           .grid-container {
//             grid-template-columns: 1fr;
//             gap: 16px;
//           }

//           .form-actions {
//             flex-direction: column;
//           }

//           .cancel-btn,
//           .submit-btn {
//             width: 100%;
//             justify-content: center;
//           }

//           .section-container {
//             padding: 20px;
//           }

//           .input-group {
//             min-height: 68px;
//           }
//         }

//         @media (max-width: 480px) {
//           .header-title {
//             font-size: 20px;
//           }

//           .input-field,
//           .select-field {
//             padding: 0 12px 0 40px;
//             font-size: 13px;
//           }

//           .input-icon {
//             left: 12px;
//           }

//           .net-salary-preview {
//             padding: 10px 12px;
//           }

//           .net-salary-amount {
//             font-size: 16px;
//           }
//         }

//         /* Special handling for empty divs in grid */
//         .grid-container > div:empty {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// /* ---------- COMPONENTS ---------- */
// const Section = ({ title, icon, children }) => (
//   <div className="section-container">
//     <h3 className="section-title">
//       {icon} {title}
//     </h3>
//     {children}
//   </div>
// );

// const Grid = ({ children }) => (
//   <div className="grid-container">
//     {children}
//   </div>
// );

// const Input = ({ label, type = "text", icon, placeholder, ...props }) => {
//   const getIcon = (iconName) => {
//     const icons = {
//       user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
//       "id-card": "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
//       mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
//       phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
//       calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
//       building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
//       briefcase: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
//       users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 5 0 01-9 0",
//       "calendar-check": "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
//       "user-check": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
//       "map-pin": "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
//       clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
//       "user-plus": "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
//       heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
//       "phone-call": "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
//       "rupee-sign": "M9 8h6m-6 4h6m-6 4h6M6 3v18M18 3v18",
//       "plus-circle": "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
//       "minus-circle": "M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
//       "file-text": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
//       bank: "M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
//       "credit-card": "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
//       hash: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14",
//     };
    
//     return icons[iconName] || "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 016.16 1.5 12.084 12.084 0 01-6.16 1.5 12.084 12.084 0 01-6.16-1.5L12 14zm-4 6v-7.5l4-2.222";
//   };

//   return (
//     <div className="input-group">
//       <label className="input-label">{label}</label>
//       <div style={{ position: "relative" }}>
//         {icon && (
//           <div className="input-icon">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d={getIcon(icon)} />
//             </svg>
//           </div>
//         )}
//         <input
//           type={type}
//           className="input-field"
//           placeholder={placeholder}
//           {...props}
//         />
//       </div>
//     </div>
//   );
// };

// const Select = ({ label, options, icon, ...props }) => {
//   const getIcon = (iconName) => {
//     const icons = {
//       gender: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 016.16 1.5 12.084 12.084 0 01-6.16 1.5 12.084 12.084 0 01-6.16-1.5L12 14zm-4 6v-7.5l4-2.222",
//       building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
//       briefcase: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
//       users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 5 0 01-9 0",
//     };
    
//     return icons[iconName] || "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 016.16 1.5 12.084 12.084 0 01-6.16 1.5 12.084 12.084 0 01-6.16-1.5L12 14zm-4 6v-7.5l4-2.222";
//   };

//   return (
//     <div className="input-group">
//       <label className="input-label">{label}</label>
//       <div style={{ position: "relative" }}>
//         {icon && (
//           <div className="input-icon">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d={getIcon(icon)} />
//             </svg>
//           </div>
//         )}
//         <select className="select-field" {...props}>
//           <option value="">Select {label.toLowerCase()}</option>
//           {options.map((o) => (
//             <option key={o} value={o}>
//               {o}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default AdminRegisterEmployee;











import React, { useState, useEffect } from "react";

const AdminRegisterEmployee = () => {
  // Mock data - API से replace करना होगा
  const [pendingRegistrations, setPendingRegistrations] = useState([
    {
      id: 1,
      fullName: "Rahul Sharma",
      email: "rahul.sharma@acoreithub.com",
      mobile: "+91 9876543210",
      dob: "1995-05-15",
      gender: "Male",
      address: "123, MG Road, Bangalore",
      bloodGroup: "O+",
      panNumber: "ABCDE1234F",
      aadharNumber: "123456789012",
      country: "India",
      state: "Karnataka",
      city: "Bangalore",
      pincode: "560001",
      emergencyContactName: "Priya Sharma",
      emergencyContactRelation: "Sister",
      emergencyContact: "+91 9876543211",
      status: "pending",
      registrationDate: "2024-12-10"
    },
    {
      id: 2,
      fullName: "Priya Patel",
      email: "priya.patel@acoreithub.com",
      mobile: "+91 9876543212",
      dob: "1992-08-22",
      gender: "Female",
      address: "456, Connaught Place, Delhi",
      bloodGroup: "B+",
      panNumber: "FGHIJ5678K",
      aadharNumber: "987654321098",
      country: "India",
      state: "Delhi",
      city: "New Delhi",
      pincode: "110001",
      emergencyContactName: "Raj Patel",
      emergencyContactRelation: "Father",
      emergencyContact: "+91 9876543213",
      status: "pending",
      registrationDate: "2024-12-11"
    }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState("pending"); // pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState("");

  // Employee form state (HR द्वारा complete किया जाने वाला)
  const [employeeForm, setEmployeeForm] = useState({
    empId: "",
    department: "",
    designation: "",
    employeeType: "",
    dateOfJoining: "",
    employmentStatus: "Active",
    reportingManager: "",
    workLocation: "",
    shiftTiming: "",
    probationPeriod: "",
    basicSalary: "",
    allowance: "",
    deduction: "",
    netSalary: "",
    bankName: "",
    account: "",
    ifsc: "",
    hrNotes: ""
  });

  // Auto calculate net salary
  useEffect(() => {
    const basic = Number(employeeForm.basicSalary || 0);
    const allowance = Number(employeeForm.allowance || 0);
    const deduction = Number(employeeForm.deduction || 0);
    setEmployeeForm(prev => ({
      ...prev,
      netSalary: (basic + allowance - deduction).toString()
    }));
  }, [employeeForm.basicSalary, employeeForm.allowance, employeeForm.deduction]);

  // Selected employee के data से form auto-fill करें
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    
    // User registration data display के लिए
    console.log("Selected Employee:", employee);
    
    // HR form reset (ताकि पिछला data clear हो)
    setEmployeeForm({
      empId: `EMP-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      department: "",
      designation: "",
      employeeType: "",
      dateOfJoining: "",
      employmentStatus: "Active",
      reportingManager: "",
      workLocation: "",
      shiftTiming: "9:00 AM - 6:00 PM",
      probationPeriod: "3",
      basicSalary: "",
      allowance: "",
      deduction: "",
      netSalary: "",
      bankName: "",
      account: "",
      ifsc: "",
      hrNotes: ""
    });
  };

  // HR form handle changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Employee approve करें
  const handleApprove = () => {
    if (!selectedEmployee) {
      alert("Please select an employee first!");
      return;
    }

    // Required fields check
    if (!employeeForm.department || !employeeForm.designation || !employeeForm.dateOfJoining) {
      alert("Please fill all required fields: Department, Designation, and Date of Joining");
      return;
    }

    // Mock API call - production में real API call होगा
    const approvedEmployee = {
      ...selectedEmployee,
      ...employeeForm,
      status: "approved",
      approvedDate: new Date().toISOString().split('T')[0],
      approvedBy: "HR Admin"
    };

    console.log("Approved Employee:", approvedEmployee);
    alert(`Employee ${selectedEmployee.fullName} approved successfully!`);

    // Pending list से remove करें
    setPendingRegistrations(prev => 
      prev.filter(emp => emp.id !== selectedEmployee.id)
    );
    
    // Reset forms
    setSelectedEmployee(null);
    setEmployeeForm({
      empId: "",
      department: "",
      designation: "",
      employeeType: "",
      dateOfJoining: "",
      employmentStatus: "Active",
      reportingManager: "",
      workLocation: "",
      shiftTiming: "",
      probationPeriod: "",
      basicSalary: "",
      allowance: "",
      deduction: "",
      netSalary: "",
      bankName: "",
      account: "",
      ifsc: "",
      hrNotes: ""
    });
  };

  // Employee reject करें
  const handleReject = () => {
    if (!selectedEmployee) {
      alert("Please select an employee first!");
      return;
    }

    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    const rejectedEmployee = {
      ...selectedEmployee,
      status: "rejected",
      rejectionReason: reason,
      rejectedDate: new Date().toISOString().split('T')[0]
    };

    console.log("Rejected Employee:", rejectedEmployee);
    alert(`Employee ${selectedEmployee.fullName} rejected.`);

    // Pending list से remove करें
    setPendingRegistrations(prev => 
      prev.filter(emp => emp.id !== selectedEmployee.id)
    );
    
    setSelectedEmployee(null);
  };

  // Filter employees based on search and tab
  const filteredEmployees = pendingRegistrations.filter(emp => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = emp.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="admin-register-employee">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div>
            <h1 className="header-title">Employee Registration Dashboard</h1>
            <p className="header-subtitle">
              Manage pending registrations, review details, and complete employment information
            </p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-count">{pendingRegistrations.length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-count">0</span>
            <span className="stat-label">Approved</span>
          </div>
          <div className="stat-card">
            <span className="stat-count">0</span>
            <span className="stat-label">Rejected</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* LEFT SIDEBAR - Employee Grid */}
        <div className="employee-sidebar">
          <div className="sidebar-header">
            <h3>Pending Registrations</h3>
            <div className="search-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="employee-grid">
            {filteredEmployees.length === 0 ? (
              <div className="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <p>No pending registrations</p>
              </div>
            ) : (
              filteredEmployees.map(employee => (
                <div
                  key={employee.id}
                  className={`employee-card ${selectedEmployee?.id === employee.id ? 'selected' : ''}`}
                  onClick={() => handleEmployeeSelect(employee)}
                >
                  <div className="employee-avatar">
                    {employee.fullName.charAt(0)}
                  </div>
                  <div className="employee-info">
                    <h4>{employee.fullName}</h4>
                    <p>{employee.email}</p>
                    <div className="employee-meta">
                      <span>{employee.mobile}</span>
                      <span className="badge pending">Pending</span>
                    </div>
                  </div>
                  <div className="employee-date">
                    {new Date(employee.registrationDate).toLocaleDateString('en-IN')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* MAIN CONTENT - Registration Details & HR Form */}
        <div className="main-content-section">
          {selectedEmployee ? (
            <>
              {/* User Registration Data (Auto-filled) */}
              <div className="section-card">
                <div className="section-header">
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    User Registration Details (Auto-filled)
                  </h3>
                  <span className="section-badge">Submitted by User</span>
                </div>
                
                <div className="auto-filled-grid">
                  <div className="info-row">
                    <span className="info-label">Full Name:</span>
                    <span className="info-value">{selectedEmployee.fullName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{selectedEmployee.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Mobile:</span>
                    <span className="info-value">{selectedEmployee.mobile}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date of Birth:</span>
                    <span className="info-value">{selectedEmployee.dob}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Gender:</span>
                    <span className="info-value">{selectedEmployee.gender}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Blood Group:</span>
                    <span className="info-value">{selectedEmployee.bloodGroup}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Address:</span>
                    <span className="info-value">{selectedEmployee.address}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">City/State:</span>
                    <span className="info-value">{selectedEmployee.city}, {selectedEmployee.state}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Emergency Contact:</span>
                    <span className="info-value">{selectedEmployee.emergencyContactName} ({selectedEmployee.emergencyContactRelation}) - {selectedEmployee.emergencyContact}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">PAN:</span>
                    <span className="info-value">{selectedEmployee.panNumber}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Aadhar:</span>
                    <span className="info-value">{selectedEmployee.aadharNumber}</span>
                  </div>
                </div>
              </div>

              {/* HR Employment Form (To be filled by HR) */}
              <div className="section-card">
                <div className="section-header">
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Complete Employment Details (HR to fill)
                  </h3>
                  <span className="section-badge warning">Required Fields</span>
                </div>

                <div className="hr-form">
                  <div className="form-grid">
                    {/* Row 1 */}
                    <div className="input-group">
                      <label>Employee ID *</label>
                      <input
                        type="text"
                        name="empId"
                        value={employeeForm.empId}
                        onChange={handleFormChange}
                        placeholder="EMP-001"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Department *</label>
                      <select
                        name="department"
                        value={employeeForm.department}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Support">Support</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Designation *</label>
                      <select
                        name="designation"
                        value={employeeForm.designation}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select Designation</option>
                        <option value="Software Developer">Software Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="Manager">Manager</option>
                        <option value="HR Executive">HR Executive</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Employee Type *</label>
                      <select
                        name="employeeType"
                        value={employeeForm.employeeType}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Intern">Intern</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>

                    {/* Row 2 */}
                    <div className="input-group">
                      <label>Date of Joining *</label>
                      <input
                        type="date"
                        name="dateOfJoining"
                        value={employeeForm.dateOfJoining}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Reporting Manager</label>
                      <input
                        type="text"
                        name="reportingManager"
                        value={employeeForm.reportingManager}
                        onChange={handleFormChange}
                        placeholder="Manager's name"
                      />
                    </div>
                    <div className="input-group">
                      <label>Work Location</label>
                      <input
                        type="text"
                        name="workLocation"
                        value={employeeForm.workLocation}
                        onChange={handleFormChange}
                        placeholder="City, Office"
                      />
                    </div>
                    <div className="input-group">
                      <label>Shift Timing</label>
                      <select
                        name="shiftTiming"
                        value={employeeForm.shiftTiming}
                        onChange={handleFormChange}
                      >
                        <option value="">Select Shift</option>
                        <option value="9:00 AM - 6:00 PM">9:00 AM - 6:00 PM</option>
                        <option value="10:00 AM - 7:00 PM">10:00 AM - 7:00 PM</option>
                        <option value="2:00 PM - 11:00 PM">2:00 PM - 11:00 PM</option>
                      </select>
                    </div>

                    {/* Row 3 - Salary */}
                    <div className="input-group">
                      <label>Basic Salary (₹)</label>
                      <input
                        type="number"
                        name="basicSalary"
                        value={employeeForm.basicSalary}
                        onChange={handleFormChange}
                        placeholder="0"
                      />
                    </div>
                    <div className="input-group">
                      <label>Allowance (₹)</label>
                      <input
                        type="number"
                        name="allowance"
                        value={employeeForm.allowance}
                        onChange={handleFormChange}
                        placeholder="0"
                      />
                    </div>
                    <div className="input-group">
                      <label>Deduction (₹)</label>
                      <input
                        type="number"
                        name="deduction"
                        value={employeeForm.deduction}
                        onChange={handleFormChange}
                        placeholder="0"
                      />
                    </div>
                    <div className="input-group net-salary">
                      <label>Net Salary</label>
                      <div className="net-salary-display">
                        ₹ {employeeForm.netSalary ? Number(employeeForm.netSalary).toLocaleString('en-IN') : '0'}
                      </div>
                    </div>

                    {/* Row 4 - Bank Details */}
                    <div className="input-group">
                      <label>Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={employeeForm.bankName}
                        onChange={handleFormChange}
                        placeholder="Bank name"
                      />
                    </div>
                    <div className="input-group">
                      <label>Account Number</label>
                      <input
                        type="text"
                        name="account"
                        value={employeeForm.account}
                        onChange={handleFormChange}
                        placeholder="1234567890"
                      />
                    </div>
                    <div className="input-group">
                      <label>IFSC Code</label>
                      <input
                        type="text"
                        name="ifsc"
                        value={employeeForm.ifsc}
                        onChange={handleFormChange}
                        placeholder="ABCD0123456"
                      />
                    </div>
                    <div className="input-group">
                      <label>HR Notes</label>
                      <textarea
                        name="hrNotes"
                        value={employeeForm.hrNotes}
                        onChange={handleFormChange}
                        placeholder="Additional notes or comments..."
                        rows="2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="action-buttons">
                <button 
                  className="btn-reject"
                  onClick={handleReject}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Reject Registration
                </button>
                <button 
                  className="btn-save"
                  onClick={() => alert("Changes saved!")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  Save Changes
                </button>
                <button 
                  className="btn-approve"
                  onClick={handleApprove}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Approve & Register
                </button>
              </div>
            </>
          ) : (
            /* EMPTY STATE - When no employee selected */
            <div className="empty-selection">
              <div className="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3>Select an Employee</h3>
              <p>Click on any employee from the list to view their registration details and complete their employment information.</p>
              <div className="empty-stats">
                <div className="stat">
                  <span className="stat-number">{pendingRegistrations.length}</span>
                  <span className="stat-label">Pending Registrations</span>
                </div>
                <div className="stat">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Approved Today</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-register-employee {
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          min-height: 100vh;
          background: #0f172a;
        }

        /* HEADER STYLES */
        .dashboard-header {
          background: linear-gradient(135deg, #0f172a 0%, #047857 50%, #22c55e 100%);
          padding: 20px 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon {
          background: rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-title {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(90deg, #fff 0%, #d1fae5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-subtitle {
          margin: 4px 0 0 0;
          color: #d1fae5;
          font-size: 14px;
          opacity: 0.9;
        }

        .header-stats {
          display: flex;
          gap: 20px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 12px 20px;
          border-radius: 12px;
          text-align: center;
          min-width: 100px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-count {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: #ffffffff;
        }

        .stat-label {
          font-size: 12px;
          color: #d1fae5;
          opacity: 0.8;
        }

        /* MAIN LAYOUT */
        .dashboard-content {
          display: flex;
          min-height: calc(100vh - 120px);
        }

        /* SIDEBAR - Employee Grid */
        .employee-sidebar {
          width: 400px;
          background: #1e293b;
          border-right: 1px solid #334155;
          overflow-y: auto;
          padding: 20px;
          position: sticky;
          top: 120px;
          height: calc(100vh - 120px);
        }

        .sidebar-header {
          margin-bottom: 20px;
        }

        .sidebar-header h3 {
          margin: 0 0 16px 0;
          color: #f8fafc;
          font-size: 18px;
          font-weight: 600;
        }

        .search-box {
          position: relative;
          margin-bottom: 20px;
        }

        .search-box svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          background: #0f172a;
          border: 2px solid #334155;
          border-radius: 10px;
          color: #f8fafc;
          font-size: 14px;
        }

        .search-input:focus {
          outline: none;
          border-color: #22c55e;
        }

        /* EMPLOYEE GRID */
        .employee-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .employee-card {
          background: #0f172a;
          border: 2px solid #334155;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .employee-card:hover {
          border-color: #22c55e;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.1);
        }

        .employee-card.selected {
          border-color: #22c55e;
          background: rgba(34, 197, 94, 0.05);
        }

        .employee-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          color: white;
        }

        .employee-info {
          flex: 1;
        }

        .employee-info h4 {
          margin: 0 0 4px 0;
          color: #f8fafc;
          font-size: 16px;
          font-weight: 600;
        }

        .employee-info p {
          margin: 0 0 8px 0;
          color: #94a3b8;
          font-size: 13px;
        }

        .employee-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .employee-meta span:first-child {
          color: #cbd5e1;
          font-size: 12px;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
        }

        .badge.pending {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .employee-date {
          font-size: 12px;
          color: #94a3b8;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #94a3b8;
        }

        .empty-state svg {
          margin-bottom: 16px;
          color: #475569;
        }

        /* MAIN CONTENT */
        .main-content-section {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          max-height: calc(100vh - 120px);
        }

        /* SECTION CARDS */
        .section-card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #334155;
        }

        .section-header h3 {
          margin: 0;
          color: #f8fafc;
          font-size: 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-badge {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .section-badge:not(.warning) {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .section-badge.warning {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        /* AUTO-FILLED USER DATA */
        .auto-filled-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 1200px) {
          .auto-filled-grid {
            grid-template-columns: 1fr;
          }
        }

        .info-row {
          display: flex;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          width: 180px;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 500;
        }

        .info-value {
          flex: 1;
          color: #f8fafc;
          font-size: 14px;
        }

        /* HR FORM */
        .hr-form {
          margin-top: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1400px) {
          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        .input-group {
          margin-bottom: 16px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 500;
        }

        .input-group label:after {
          content: ' *';
          color: #ef4444;
          opacity: 0.7;
        }

        .input-group input,
        .input-group select,
        .input-group textarea {
          width: 100%;
          padding: 12px 16px;
          background: #0f172a;
          border: 2px solid #334155;
          border-radius: 10px;
          color: #f8fafc;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .input-group input:focus,
        .input-group select:focus,
        .input-group textarea:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }

        .input-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          cursor: pointer;
        }

        .net-salary .net-salary-display {
          padding: 12px 16px;
          background: rgba(34, 197, 94, 0.1);
          border: 2px solid #22c55e;
          border-radius: 10px;
          color: #22c55e;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
        }

        /* ACTION BUTTONS */
        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding: 24px;
          background: #1e293b;
          border-radius: 16px;
          margin-top: 24px;
        }

        .action-buttons button {
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .btn-reject {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 2px solid rgba(239, 68, 68, 0.3);
        }

        .btn-reject:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: translateY(-2px);
        }

        .btn-save {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border: 2px solid rgba(59, 130, 246, 0.3);
        }

        .btn-save:hover {
          background: rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }

        .btn-approve {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
        }

        .btn-approve:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
        }

        /* EMPTY SELECTION STATE */
        .empty-selection {
          text-align: center;
          padding: 80px 40px;
        }

        .empty-icon {
          margin-bottom: 24px;
        }

        .empty-icon svg {
          color: #475569;
        }

        .empty-selection h3 {
          margin: 0 0 16px 0;
          color: #f8fafc;
          font-size: 24px;
          font-weight: 600;
        }

        .empty-selection p {
          color: #94a3b8;
          max-width: 500px;
          margin: 0 auto 40px auto;
          line-height: 1.6;
        }

        .empty-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 32px;
          font-weight: 700;
          color: #22c55e;
          margin-bottom: 8px;
        }

        .stat-label {
          color: #ffffffff;
          font-size: 14px;
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1200px) {
          .dashboard-content {
            flex-direction: column;
          }
          
          .employee-sidebar {
            width: 100%;
            height: 300px;
            border-right: none;
            border-bottom: 1px solid #334155;
            position: static;
            top: auto;
          }
          
          .employee-grid {
            flex-direction: row;
            overflow-x: auto;
          }
          
          .employee-card {
            min-width: 300px;
          }
          
          .main-content-section {
            max-height: none;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          
          .header-stats {
            width: 100%;
            justify-content: center;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .auto-filled-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminRegisterEmployee;