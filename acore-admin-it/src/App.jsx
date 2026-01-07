// import React, { useState, useEffect } from 'react';

// import AdminDashboard from './components/admin/AdminDashboard';

// import Login from "./components/auth/Login"
// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [registerLoading, setRegisterLoading] = useState(false);

//   // Handle login
//   const handleLogin = async (email, password) => {
//     setLoading(true);
    
    
//     // Demo authentication logic
//     setTimeout(() => {
//       if (email && password) {
//         // Determine role based on email
//         let role = 'Admin';
//         if (email.includes('hr') || email === 'hr@123') role = 'HR';
//         if (email.includes('boss') || email === 'boss@123') role = 'Boss';
        
//         setUserRole(role);
//         setIsAuthenticated(true);
        
//         // Store user info in localStorage
//         localStorage.setItem('adminUser', JSON.stringify({
//           email,
//           role,
//           name: email.split('@')[0] || 'Admin User',
//           department: role === 'HR' ? 'Human Resources' : 
//                      role === 'Boss' ? 'Management' : 'Administration'
//         }));
//       }
//       setLoading(false);
//     }, 1000);
//   };

//   // Handle registration
//   const handleRegister = async (data) => {
//     setRegisterLoading(true);
    
//     setTimeout(() => {
//       console.log('Registration data:', data);
//       alert('Registration successful! Please login with your credentials.');
//       setRegisterLoading(false);
//     }, 1500);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUserRole(null);
//     localStorage.removeItem('adminUser');
//   };

//   // Check for existing session
//   useEffect(() => {
//     const savedUser = localStorage.getItem('adminUser');
//     if (savedUser) {
//       try {
//         const user = JSON.parse(savedUser);
//         if (user && user.role) {
//           setUserRole(user.role);
//           setIsAuthenticated(true);
//         }
//       } catch (e) {
//         console.error('Error parsing saved user:', e);
//       }
//     }
//   }, []);

//   if (!isAuthenticated) {
//     return (
//       <Login 
//         onLogin={handleLogin}
//         onRegister={handleRegister}
//         loading={loading}
//         registerLoading={registerLoading}
//       />
//     );
//   }

//   return <AdminDashboard userRole={userRole} onLogout={handleLogout} />;
// };

// export default App;




import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/auth/Login";
import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {
  const { user, token } = useSelector((state) => state.adminAuth);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check Login Session
  useEffect(() => {
    const localToken = localStorage.getItem("adminToken");

    if (token || localToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAuthenticated(false);
    window.location.reload();
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    
    <AdminDashboard
      userRole={user?.role || "Admin"}
      onLogout={handleLogout}
    />
    
  );
};

export default App;
