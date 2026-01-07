// import { io } from "socket.io-client";
// import { liveTrackingUpdate } from "../redux/slices/adminLiveTrackingSlice";

// class SocketClient {
//   constructor() {
//     this.socket = null;
//     this.store = null;
//   }

//   initialize(store) {
//     this.store = store;

//     this.socket = io(
//       process.env.REACT_APP_SOCKET_URL || "http://localhost:5000",
//       {
//         transports: ["websocket"],
//         reconnection: true,
//       }
//     );

//     this.socket.on("connect", () => {
//       console.log("🟢 Socket connected:", this.socket.id);

//       // ✅ MATCH BACKEND
//       this.socket.emit("register-admin");
//     });

//     this.socket.on("disconnect", () => {
//       console.log("🔴 Socket disconnected");
//     });

//     // ✅ SINGLE EVENT (MATCH BACKEND)
//     this.socket.on("LIVE_TRACKING_UPDATE", (data) => {
//       console.log("📡 Live tracking update:", data);

//       this.store.dispatch(liveTrackingUpdate(data));
//     });
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//     }
//   }

//   isConnected() {
//     return !!this.socket?.connected;
//   }
// }

// // ✅ Singleton
// const socketClient = new SocketClient();
// export default socketClient;




import { io } from "socket.io-client";
import { liveTrackingUpdate } from "../redux/slices/liveTrackingSlice";

class SocketClient {
  constructor() {
    this.socket = null;
    this.store = null;
  }

  initialize(store) {
    if (this.socket?.connected) {
      console.log("⚠️ Socket already connected");
      return;
    }

    this.store = store;
    
    this.socket = io(
      process.env.REACT_APP_SOCKET_URL || "http://localhost:5000",
      {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      }
    );

    // Connection events
    this.socket.on("connect", () => {
      console.log("🟢 Socket connected:", this.socket.id);
      // Register as admin for live tracking
      this.socket.emit("register-admin");
      console.log("📡 Registered for ADMIN_LIVE_TRACKING");
    });

    this.socket.on("disconnect", (reason) => {
      console.log("🔴 Socket disconnected:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
    });

    // ✅ Listen for live tracking updates
    this.socket.on("LIVE_TRACKING_UPDATE", (data) => {
      console.log("📡 Live tracking update received:", data);
      
      // Dispatch to Redux
      if (this.store) {
        this.store.dispatch(liveTrackingUpdate(data));
      }
    });
  }

  disconnect() {
    if (this.socket) {
      console.log("🔌 Disconnecting socket...");
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected() {
    return !!this.socket?.connected;
  }

  // Helper method to get socket instance
  getSocket() {
    return this.socket;
  }
}

// ✅ Singleton instance
const socketClient = new SocketClient();

export default socketClient;