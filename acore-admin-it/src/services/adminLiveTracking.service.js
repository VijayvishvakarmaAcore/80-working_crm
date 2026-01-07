import { io } from "socket.io-client";
import {
  addEmployeeLive,
  updateEmployeeLive,
} from "../redux/slices/adminLiveTrackingSlice";

let socket = null;

/* ===============================
   INIT SOCKET (Admin Live Tracking)
================================ */
export const initAdminLiveTrackingService = (dispatch) => {
  if (socket) return; // prevent duplicate connection

  socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("🟢 Admin live tracking socket connected");
  });

  socket.on("admin-live-add", (data) => {
    dispatch(addEmployeeLive(data));
  });

  socket.on("admin-live-update", (data) => {
    dispatch(updateEmployeeLive(data));
  });

  socket.on("disconnect", () => {
    console.log("🔴 Admin live tracking socket disconnected");
  });
};

/* ===============================
   DISCONNECT SOCKET
================================ */
export const disconnectAdminLiveTrackingService = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
