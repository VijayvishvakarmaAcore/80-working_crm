// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   // Activity tracking methods
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   getCurrentApp: () => ipcRenderer.invoke('get-current-app'),

//   // Listen for activity updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   // Remove listeners
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// const { contextBridge, ipcRenderer } = require('electron');

// // Expose protected methods that allow the renderer process to use
// // the ipcRenderer without exposing the entire object
// contextBridge.exposeInMainWorld('electronAPI', {
//   // Activity tracking methods
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   getCurrentApp: () => ipcRenderer.invoke('get-current-app'),

//   // Listen for activity updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   // Remove listeners
//   removeAllListeners: (channel) => {
//     ipcRenderer.removeAllListeners(channel);
//   }
// });





// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),

//   // ✅ Real-time updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   // ✅ Remove listeners
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// updated code



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),

//   // ✅ Add location functions
//   getUserLocation: () => ipcRenderer.invoke('get-user-location'),

//   // Browser geolocation wrapper for Electron
//   getBrowserLocation: () => {
//     return new Promise((resolve) => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             resolve({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//               accuracy: position.coords.accuracy,
//               source: 'browser'
//             });
//           },
//           (error) => {
//             console.log('Browser geolocation error:', error);
//             resolve(null);
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 10000,
//             maximumAge: 0
//           }
//         );
//       } else {
//         resolve(null);
//       }
//     });
//   },

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });








// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // ✅ Correctly mapped location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });

// +++++++++++++++++++++==========>



//   const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // FINAL: correct IPC name
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });



//            111111111111111111111111111111111111111111111111111111111



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   // Activity Tracking (Existing - NO CHANGE)
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // Location APIs (Updated with new functions)
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
//   getLastKnownLocation: () => ipcRenderer.invoke('get-last-known-location'),
  
//   // App Info (New)
//   getCurrentApp: () => ipcRenderer.invoke('get-current-app'),
  
//   // Health Check (New)
//   healthCheck: () => ipcRenderer.invoke('health-check'),

//   // Event Listeners (Updated)
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   // Location Events (New - optional for future use)
//   onLocationUpdate: (callback) => {
//     // This can be implemented if you want real-time location updates
//     ipcRenderer.on('location-update', (event, data) => callback(data));
//   },

//   // Remove Listeners (Updated)
//   removeActivityListener: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   },
  
//   removeLocationListener: () => {
//     ipcRenderer.removeAllListeners('location-update');
//   },
  
//   // Keep existing removeAllListeners for backward compatibility
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//     ipcRenderer.removeAllListeners('location-update');
//   }
// });



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),
//   healthCheck: () => ipcRenderer.invoke('health-check'),
  
//   // Listen for activity updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   // Remove listener
//   removeActivityUpdateListener: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),
//   healthCheck: () => ipcRenderer.invoke('health-check'),
  
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   removeActivityUpdateListener: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });

















// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // ✅ Correctly mapped location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// ye copy kiye he iske niche or ye val working code he thik





















// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // ✅ Correctly mapped location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });




// const { contextBridge, ipcRenderer } = require('electron');

// // ✅ SAFE API EXPOSURE - Only expose what's needed
// contextBridge.exposeInMainWorld('electronAPI', {
//   // ============= LOCATION API =============
//   getCurrentLocation: () => {
//     console.log('[PRELOAD] getCurrentLocation called');
//     return ipcRenderer.invoke('get-current-location');
//   },

//   // ============= ACTIVITY TRACKING =============
//   startTracking: () => {
//     console.log('[PRELOAD] startTracking called');
//     return ipcRenderer.invoke('start-tracking');
//   },

//   stopTracking: () => {
//     console.log('[PRELOAD] stopTracking called');
//     return ipcRenderer.invoke('stop-tracking');
//   },

//   // ============= ACTIVITY UPDATES =============
//   onActivityUpdate: (callback) => {
//     console.log('[PRELOAD] Setting up activity update listener');
//     const wrappedCallback = (event, data) => {
//       console.log('[PRELOAD] Activity update received:', data);
//       callback(data);
//     };
    
//     // Remove any existing listeners first
//     ipcRenderer.removeAllListeners('activity-update');
//     // Add new listener
//     ipcRenderer.on('activity-update', wrappedCallback);
    
//     // Return cleanup function
//     return () => {
//       console.log('[PRELOAD] Removing activity update listener');
//       ipcRenderer.removeListener('activity-update', wrappedCallback);
//     };
//   },

//   // ============= CLEANUP =============
//   removeActivityListeners: () => {
//     console.log('[PRELOAD] Removing all activity listeners');
//     ipcRenderer.removeAllListeners('activity-update');
//   },

//   // ============= UTILITY FUNCTIONS =============
//   isElectron: () => {
//     return true; // Indicate that we're running in Electron
//   },

//   // ============= ERROR HANDLING =============
//   onError: (callback) => {
//     const wrappedCallback = (event, error) => {
//       console.error('[PRELOAD] Error received:', error);
//       callback(error);
//     };
//     ipcRenderer.on('electron-error', wrappedCallback);
    
//     return () => {
//       ipcRenderer.removeListener('electron-error', wrappedCallback);
//     };
//   }
// });

// // ✅ Console log for debugging
// console.log('[PRELOAD] Electron preload script loaded successfully');



// ui chla rha he lekin main js ka nahi chal raha h e



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   onActivityUpdate: (callback) => {
//     const wrappedCallback = (event, data) => {
//       console.log('[PRELOAD] Sending activity update to renderer:', data);
//       callback(data);
//     };
    
//     ipcRenderer.on('activity-update', wrappedCallback);
    
//     // Return cleanup function
//     return () => {
//       console.log('[PRELOAD] Removing activity listener');
//       ipcRenderer.removeListener('activity-update', wrappedCallback);
//     };
//   }
// });






// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   // Location
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
  
//   // Tracking
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
  
//   // Activity Updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//     // Return cleanup function
//     return () => ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// // preload.js - SIMPLE VERSION
// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   // Location - simple call
//   getCurrentLocation: () => {
//     return ipcRenderer.invoke('get-current-location');
//   },
  
//   // Tracking
//   startTracking: () => {
//     return ipcRenderer.invoke('start-tracking');
//   },
  
//   stopTracking: () => {
//     return ipcRenderer.invoke('stop-tracking');
//   },
  
//   // Activity updates
//   onActivityUpdate: (callback) => {
//     const wrappedCallback = (event, data) => {
//       callback(data);
//     };
    
//     ipcRenderer.on('activity-update', wrappedCallback);
    
//     // Return cleanup function
//     return () => {
//       ipcRenderer.removeListener('activity-update', wrappedCallback);
//     };
//   }
// });















// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// lcation required vali problem he 




















// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // ✅ Correctly mapped location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });




// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
  
//   // ✅ Location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });




// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
  
//   // ✅ Location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });



//  iske nich me vo add kar raha hu jaha par me  live tracking ko admin dashboard me show kar raha hu 




// const { contextBridge, ipcRenderer } = require('electron');
// const axios = require('axios');

// contextBridge.exposeInMainWorld('electronAPI', {
//   // Existing functions
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
  
//   // ✅ NEW: Send activity data to backend
//   sendActivityData: async (activityData) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) return { success: false, error: 'No token' };

//       const response = await axios.post('http://localhost:5000/api/activity/save-activity', 
//         activityData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       return response.data;
//     } catch (error) {
//       console.error('Failed to send activity:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // Listeners
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });




// const { contextBridge, ipcRenderer } = require('electron');

// // ✅ Expose APIs to renderer
// contextBridge.exposeInMainWorld('electronAPI', {
//   // ✅ Location
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
  
//   // ✅ Tracking
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
  
//   // ✅ Activity Updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   // ✅ Cleanup
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   },
  
//   // ✅ Send activity to backend
//   sendActivityData: async (activityData) => {
//     try {
//       // Send to main process
//       console.log('Sending activity:', activityData);
      
//       // In production, you would send to your backend
//       const response = await fetch('http://localhost:5000/api/activity/save-activity', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
//         },
//         body: JSON.stringify(activityData)
//       });
      
//       return await response.json();
//     } catch (error) {
//       console.error('Failed to send activity:', error);
//       return { success: false, error: error.message };
//     }
//   }
// });

// // ✅ Expose node modules (if needed)
// contextBridge.exposeInMainWorld('nodeAPI', {
//   platform: process.platform,
//   version: process.version
// });

// // ✅ Expose localStorage for debugging
// contextBridge.exposeInMainWorld('storageAPI', {
//   getItem: (key) => localStorage.getItem(key),
//   setItem: (key, value) => localStorage.setItem(key, value),
//   removeItem: (key) => localStorage.removeItem(key),
//   clear: () => localStorage.clear()
// });





// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
  
//   // ✅ Location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// ------------------------------------------------------------------------------------------------------------------


// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("electronWS", {
//   startTracking: async () => {
//     try {
//       return await ipcRenderer.invoke("ws-start-tracking");
//     } catch (e) {
//       console.error("startTracking failed:", e);
//       return { success: false };
//     }
//   },

//   stopTracking: async () => {
//     try {
//       return await ipcRenderer.invoke("ws-stop-tracking");
//     } catch (e) {
//       console.error("stopTracking failed:", e);
//       return { success: false };
//     }
//   },

//   onUpdate: (callback) => {
//     if (!callback) return;
//     ipcRenderer.on("work-session-update", (_e, payload) => {
//       callback(payload);
//     });
//   },

//   removeAll: () => {
//     ipcRenderer.removeAllListeners("work-session-update");
//   },
// });


// ?????????????????????

// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("electronWS", {
//   // 🟢 Start tracking
//   startTracking: async () => {
//     try {
//       console.log("📡 [PRELOAD] Starting tracking...");
//       return await ipcRenderer.invoke("ws-start-tracking");
//     } catch (e) {
//       console.error("❌ [PRELOAD] startTracking failed:", e);
//       return { success: false };
//     }
//   },

//   // 🔴 Stop tracking
//   stopTracking: async () => {
//     try {
//       console.log("📡 [PRELOAD] Stopping tracking...");
//       return await ipcRenderer.invoke("ws-stop-tracking");
//     } catch (e) {
//       console.error("❌ [PRELOAD] stopTracking failed:", e);
//       return { success: false };
//     }
//   },

//   // 📡 Listen for updates (60 second flush)
//   onUpdate: (callback) => {
//     if (!callback) return;
//     console.log("👂 [PRELOAD] Listening for work-session-update...");
//     ipcRenderer.on("work-session-update", (_e, payload) => {
//       console.log("📥 [PRELOAD] Received update:", payload);
//       callback(payload);
//     });
//   },

//   // 📡 Listen for immediate state changes (ACTIVE/IDLE)
//   onStateChange: (callback) => {
//     if (!callback) return;
//     console.log("👂 [PRELOAD] Listening for activity-state-change...");
//     ipcRenderer.on("activity-state-change", (_e, payload) => {
//       console.log("📥 [PRELOAD] State changed:", payload);
//       callback(payload);
//     });
//   },

//   // 🧹 Remove all listeners
//   removeAll: () => {
//     console.log("🧹 [PRELOAD] Removing all listeners...");
//     ipcRenderer.removeAllListeners("work-session-update");
//     ipcRenderer.removeAllListeners("activity-state-change");
//   },
// });

// // 📍 LOCATION API
// contextBridge.exposeInMainWorld("electronAPI", {
//   getCurrentLocation: () => {
//     console.log("📍 [PRELOAD] Getting current location...");
//     return ipcRenderer.invoke("get-current-location");
//   },
// });

// wwwwwwwwwwwwwwwwwwwwwwww


const { contextBridge, ipcRenderer } = require('electron');

// ✅ OLD API (Working perfectly)
contextBridge.exposeInMainWorld('electronAPI', {
  startTracking: () => {
    console.log('📡 [PRELOAD] startTracking called');
    return ipcRenderer.invoke('start-tracking');
  },
  
  stopTracking: () => {
    console.log('📡 [PRELOAD] stopTracking called');
    return ipcRenderer.invoke('stop-tracking');
  },
  
  getCurrentLocation: () => {
    console.log('📍 [PRELOAD] getCurrentLocation called');
    return ipcRenderer.invoke('get-current-location');
  },

  onActivityUpdate: (callback) => {
    console.log('👂 [PRELOAD] Listening for activity-update');
    ipcRenderer.on('activity-update', (event, data) => {
      console.log('📥 [PRELOAD] activity-update received:', data);
      callback(data);
    });
  },

  removeAllListeners: () => {
    console.log('🧹 [PRELOAD] Removing all listeners');
    ipcRenderer.removeAllListeners('activity-update');
    ipcRenderer.removeAllListeners('work-session-update');
  }
});

// ✅ NEW API (For backend sync)
contextBridge.exposeInMainWorld('electronWS', {
  onUpdate: (callback) => {
    console.log('👂 [PRELOAD] Listening for work-session-update');
    ipcRenderer.on('work-session-update', (_e, payload) => {
      console.log('📥 [PRELOAD] work-session-update received:', payload);
      callback(payload);
    });
  },

  removeAll: () => {
    console.log('🧹 [PRELOAD] Removing WS listeners');
    ipcRenderer.removeAllListeners('work-session-update');
  },
});