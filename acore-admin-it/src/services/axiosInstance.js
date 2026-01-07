// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;




// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "/api",         // ❗IMPORTANT → no http://localhost:5000
//   withCredentials: false,  // ❗IMPORTANT → CORS fix
// });

// // Add Token Automatically
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;



import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
