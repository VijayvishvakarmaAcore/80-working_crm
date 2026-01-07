// const { app, BrowserWindow, ipcMain, powerMonitor, globalShortcut } = require('electron');
// const path = require('path');
// const { activeWindow } = require('@nut-tree/nut-js');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 5 * 60 * 1000; // 5 minutes
//     this.currentApp = 'Browser';
//     this.isIdle = false;
//   }

//   startTracking() {
//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.setupActivityListeners();
//     this.startAppTracking();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.totalActiveTime = this.getActiveTime();
//     this.cleanupListeners();
//   }

//   setupActivityListeners() {
//     // Monitor system idle time
//     powerMonitor.on('resume', () => {
//       this.lastActivityTime = Date.now();
//       this.isIdle = false;
//     });

//     // Global shortcuts for activity detection
//     globalShortcut.register('Super', () => {
//       this.updateActivity();
//     });

//     // Check idle status every 30 seconds
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 30000);
//   }

//   startAppTracking() {
//     // Track active application every 10 seconds
//     this.appInterval = setInterval(async () => {
//       try {
//         const window = await activeWindow();
//         this.currentApp = window.title || 'Unknown App';
//       } catch (error) {
//         this.currentApp = 'Browser';
//       }
//     }, 10000);
//   }

//   updateActivity() {
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;
//   }

//   checkIdleStatus() {
//     const idleTime = Date.now() - this.lastActivityTime;
//     this.isIdle = idleTime > this.idleThreshold;
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - idleTime;

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     return {
//       isTracking: this.isTracking,
//       activeTime: this.getActiveTime(),
//       currentApp: this.currentApp,
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime
//     };
//   }

//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//     if (this.appInterval) clearInterval(this.appInterval);
//     globalShortcut.unregisterAll();
//   }
// }

// const activityTracker = new ActivityTracker();

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     },
//     icon: path.join(__dirname, '../public/logo.png')
//   });

//   mainWindow.loadURL(
//     process.env.NODE_ENV === 'development' 
//       ? 'http://localhost:3000' 
//       : `file://${path.join(__dirname, '../build/index.html')}`
//   );

//   // Open DevTools in development
//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.webContents.openDevTools();
//   }
// }

// // IPC Handlers for communication with React app
// ipcMain.handle('start-tracking', () => {
//   activityTracker.startTracking();
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   activityTracker.stopTracking();
//   const data = activityTracker.getTrackingData();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('get-current-app', () => {
//   return activityTracker.currentApp;
// });

// // App event handlers
// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// app.on('before-quit', () => {
//   activityTracker.cleanupListeners();
// });




// const { app, BrowserWindow, ipcMain, powerMonitor, globalShortcut } = require('electron');
// const path = require('path');
// // const { activeWindow } = require('@nut-tree/nut-js');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 5 * 60 * 1000; // 5 minutes
//     this.currentApp = 'Browser';
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.appInterval = null;
//   }

//   startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.setupActivityListeners();
//     this.startAppTracking();
//     console.log('Activity tracking started');
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.totalActiveTime = this.getActiveTime();
//     this.cleanupListeners();
//     console.log('Activity tracking stopped');
//   }

//   setupActivityListeners() {
//     // Monitor system idle time
//     powerMonitor.on('resume', () => {
//       this.updateActivity();
//     });

//     powerMonitor.on('suspend', () => {
//       this.isIdle = true;
//     });

//     // Global shortcuts for activity detection
//     try {
//       globalShortcut.register('Super', () => {
//         this.updateActivity();
//       });
//     } catch (error) {
//       console.log('Super key registration failed, using alternative');
//     }

//     // Check idle status every 30 seconds
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 30000);
//   }

//   startAppTracking() {
//     // Track active application every 10 seconds
//     this.appInterval = setInterval(async () => {
//       try {
//         const window = await activeWindow();
//         this.currentApp = window.title || 'Unknown App';
//         // Limit app name length
//         if (this.currentApp.length > 30) {
//           this.currentApp = this.currentApp.substring(0, 30) + '...';
//         }
//       } catch (error) {
//         this.currentApp = 'Browser';
//       }
//     }, 10000);
//   }

//   updateActivity() {
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;
//   }

//   checkIdleStatus() {
//     const idleTime = Date.now() - this.lastActivityTime;
//     const wasIdle = this.isIdle;
//     this.isIdle = idleTime > this.idleThreshold;

//     // Send update to renderer if idle status changed
//     if (wasIdle !== this.isIdle && mainWindow) {
//       mainWindow.webContents.send('activity-update', {
//         isIdle: this.isIdle,
//         currentApp: this.currentApp
//       });
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     return {
//       isTracking: this.isTracking,
//       activeTime: this.getActiveTime(),
//       currentApp: this.currentApp,
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime
//     };
//   }

//   cleanupListeners() {
//     if (this.idleInterval) {
//       clearInterval(this.idleInterval);
//       this.idleInterval = null;
//     }
//     if (this.appInterval) {
//       clearInterval(this.appInterval);
//       this.appInterval = null;
//     }
//     try {
//       globalShortcut.unregisterAll();
//     } catch (error) {
//       console.log('Error unregistering shortcuts:', error);
//     }
//   }
// }

// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     },
//     icon: path.join(__dirname, 'assets/icon.png'),
//     title: 'ACore Employee Portal'
//   });

//   // Load the React app
//   const startUrl = process.env.ELECTRON_IS_DEV 
//     ? 'http://localhost:3000' 
//     : `file://${path.join(__dirname, '../frontend/build/index.html')}`;

//   mainWindow.loadURL(startUrl);

//   // Open DevTools in development
//   if (process.env.ELECTRON_IS_DEV) {
//     mainWindow.webContents.openDevTools();
//   }

//   // Handle window closed
//   mainWindow.on('closed', () => {
//     mainWindow = null;
//     activityTracker.cleanupListeners();
//   });
// }

// // IPC Handlers for communication with React app
// ipcMain.handle('start-tracking', () => {
//   activityTracker.startTracking();
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('get-current-app', () => {
//   return activityTracker.currentApp;
// });

// // App event handlers
// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// app.on('before-quit', () => {
//   activityTracker.cleanupListeners();
// });

// app.on('will-quit', () => {
//   activityTracker.cleanupListeners();
// });




// const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     show: false,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   // ✅ CORRECT PORT: 5173 (Vite default)
//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ Vite React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // IPC handlers
// ipcMain.handle('start-tracking', () => {
//   console.log('🟢 REAL: Tracking Started in Electron');
//   return { 
//     success: true, 
//     message: 'Real Electron tracking active!',
//     currentApp: 'ACore Employee Portal',
//     timestamp: new Date().toISOString()
//   };
// });

// ipcMain.handle('stop-tracking', () => {
//   console.log('🔴 REAL: Tracking Stopped in Electron');
//   return { 
//     success: true, 
//     message: 'Tracking stopped',
//     timestamp: new Date().toISOString()
//   };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return {
//     isTracking: true,
//     activeTime: Date.now(),
//     currentApp: 'ACore Portal - REAL MODE',
//     isIdle: false,
//     source: 'Electron Desktop App'
//   };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });



// const { app, BrowserWindow, ipcMain, powerMonitor } = require('electron');
// const path = require('path');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 1 * 60 * 1000; // 1 minute for testing
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.mainWindow = null;
//   }

//   setMainWindow(window) {
//     this.mainWindow = window;
//   }

//   startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;
//     this.setupActivityListeners();

//     console.log('🟢 REAL Tracking Started');
//     this.sendActivityUpdate();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.cleanupListeners();
//     console.log('🔴 Tracking Stopped');
//     this.sendActivityUpdate();
//   }

//   setupActivityListeners() {
//     // ✅ SYSTEM IDLE DETECTION - Yeh actually work karega
//     let lastMousePos = { x: 0, y: 0 };

//     // Mouse movement detection
//     if (this.mainWindow) {
//       this.mainWindow.on('focus', () => {
//         this.updateActivity();
//       });

//       // ✅ REAL Mouse move detection
//       this.mainWindow.webContents.executeJavaScript(`
//         document.addEventListener('mousemove', (e) => {
//           window.electronAPI.reportActivity();
//         });
//         document.addEventListener('keydown', () => {
//           window.electronAPI.reportActivity();
//         });
//         document.addEventListener('click', () => {
//           window.electronAPI.reportActivity();
//         });
//         console.log('🎯 Activity listeners installed in renderer');
//       `);
//     }

//     // ✅ System power monitor
//     powerMonitor.on('resume', () => {
//       this.updateActivity();
//     });

//     powerMonitor.on('suspend', () => {
//       this.markIdle();
//     });

//     // ✅ Check idle status every 5 seconds
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 5000);
//   }

//   updateActivity() {
//     const now = Date.now();
//     const wasIdle = this.isIdle;

//     this.lastActivityTime = now;
//     this.isIdle = false;

//     if (wasIdle) {
//       console.log('🎯 ACTIVITY DETECTED - Tracking RESUMED');
//       this.sendActivityUpdate();
//     }
//   }

//   markIdle() {
//     if (!this.isIdle) {
//       this.isIdle = true;
//       console.log('⏸️ IDLE DETECTED - Tracking PAUSED');
//       this.sendActivityUpdate();
//     }
//   }

//   checkIdleStatus() {
//     if (!this.isTracking) return;

//     const idleTime = Date.now() - this.lastActivityTime;
//     const wasIdle = this.isIdle;

//     if (idleTime > this.idleThreshold && !this.isIdle) {
//       this.markIdle();
//     }

//     // Auto-send updates every 10 seconds
//     if (this.isTracking) {
//       this.sendActivityUpdate();
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     const activeTime = this.getActiveTime();
//     const idleSeconds = Math.floor((Date.now() - this.lastActivityTime) / 1000);

//     return {
//       isTracking: this.isTracking,
//       activeTime: activeTime,
//       currentApp: 'ACore Employee Portal',
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime,
//       idleSeconds: idleSeconds,
//       totalSeconds: Math.floor(activeTime / 1000)
//     };
//   }

//   // sendActivityUpdate() {
//   //   if (this.mainWindow) {
//   //     const data = this.getTrackingData();
//   //     this.mainWindow.webContents.send('activity-update', data);

//   //     // ✅ Terminal pe bhi dikhao real status
//   //     console.log('📊', {
//   //       tracking: this.isTracking ? '🟢 ON' : '🔴 OFF',
//   //       idle: this.isIdle ? '⏸️ YES' : '🎯 NO', 
//   //       activeTime: Math.floor(data.activeTime / 1000) + 's',
//   //       idleFor: data.idleSeconds + 's'
//   //     });
//   //   }
//   // }

// //   sendActivityUpdate() {
// //   if (this.mainWindow) {
// //     const data = this.getTrackingData();
// //     this.mainWindow.webContents.send('activity-update', data);

// //     // ✅ Better logging
// //     const activeSeconds = Math.floor(data.activeTime / 1000);
// //     const idleSeconds = data.idleSeconds;

// //     console.log('📊', {
// //       status: this.isTracking ? '🟢 TRACKING' : '🔴 STOPPED',
// //       state: this.isIdle ? '⏸️ IDLE' : '🎯 ACTIVE', 
// //       activeTime: `${Math.floor(activeSeconds / 60)}m ${activeSeconds % 60}s`,
// //       idleFor: `${Math.floor(idleSeconds / 60)}m ${idleSeconds % 60}s`,
// //       willResume: 'FROM LAST POSITION ✅'
// //     });
// //   }
// // }

// sendActivityUpdate() {
//   if (this.mainWindow) {
//     const data = this.getTrackingData();
//     this.mainWindow.webContents.send('activity-update', data);

//     const activeSeconds = Math.floor(data.activeTime / 1000);
//     const idleSeconds = data.idleSeconds;

//     console.log('📊 LIVE STATUS:', {
//       state: this.isIdle ? '⏸️ IDLE - TIMER STOPPED' : '🎯 ACTIVE - TIMER RUNNING', 
//       totalActive: `${Math.floor(activeSeconds / 60)}m ${activeSeconds % 60}s`,
//       idleFor: `${Math.floor(idleSeconds / 60)}m ${idleSeconds % 60}s`,
//       behavior: this.isIdle ? 'TIMER FROZEN ❄️' : 'TIMER COUNTING ⏰'
//     });
//   }
// }


//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//   }
// }

// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   activityTracker.setMainWindow(mainWindow);

//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // ✅ IPC Handlers
// // ipcMain.handle('start-tracking', () => {
// //   activityTracker.startTracking();
// //   return { 
// //     success: true, 
// //     message: 'Real tracking with ACTIVE idle detection started!',
// //     idleThreshold: '1 minute (testing)'
// //   };
// // });


// ipcMain.handle('start-tracking', () => {
//   activityTracker.startTracking();
//   return { 
//     success: true, 
//     message: 'Smart tracking started - Resume from last position!',
//     idleThreshold: '1 minute'
//   };
// });


// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('report-activity', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Activity reported manually' };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });






// const { app, BrowserWindow, ipcMain, powerMonitor } = require('electron');
// const path = require('path');
// const activeWin = require('active-win');
// const si = require('systeminformation');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 1 * 60 * 1000; // 1 minute
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.appCheckInterval = null;
//     this.mainWindow = null;
//     this.currentApp = 'Unknown';
//     this.lastAppCheck = Date.now();
//   }

//   setMainWindow(window) {
//     this.mainWindow = window;
//   }

//   async startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;

//     this.setupActivityListeners();
//     this.startAppTracking();
//     this.startSystemMonitoring();

//     console.log('🟢 REAL SYSTEM-LEVEL Tracking Started');
//     console.log('🎯 Now tracking: VS Code, Chrome, Firefox, Word, Excel, etc.');
//     this.sendActivityUpdate();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.cleanupListeners();
//     console.log('🔴 Tracking Stopped');
//     this.sendActivityUpdate();
//   }

//   setupActivityListeners() {
//     // ✅ System power events
//     powerMonitor.on('resume', () => {
//       this.updateActivity();
//       console.log('💻 System resumed from sleep');
//     });

//     powerMonitor.on('suspend', () => {
//       this.markIdle();
//       console.log('💤 System going to sleep');
//     });

//     // ✅ Check idle status
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 10000);
//   }

//   startAppTracking() {
//     // ✅ Track ACTIVE WINDOW every 3 seconds
//     this.appCheckInterval = setInterval(async () => {
//       if (!this.isTracking) return;

//       try {
//         const now = Date.now();
//         // Only check every 3 seconds to reduce CPU usage
//         if (now - this.lastAppCheck < 3000) return;

//         this.lastAppCheck = now;

//         const window = await activeWin();
//         if (window && window.owner) {
//           const appName = this.formatAppName(window.owner.name);
//           if (appName !== this.currentApp) {
//             this.currentApp = appName;
//             this.updateActivity(); // Activity detected - app changed
//             console.log('💻 Switched to:', this.currentApp);
//             this.sendActivityUpdate();
//           }
//         }
//       } catch (error) {
//         console.log('⚠️ App detection failed:', error.message);
//       }
//     }, 1000);
//   }

//   startSystemMonitoring() {
//     // ✅ System-level activity monitoring
//     setInterval(async () => {
//       if (!this.isTracking) return;

//       try {
//         // Check keyboard and mouse activity
//         const processes = await si.processes();
//         const activeProcesses = processes.list.filter(p => 
//           p.name && this.isUserApp(p.name)
//         );

//         if (activeProcesses.length > 0) {
//           this.updateActivity();
//         }
//       } catch (error) {
//         // Ignore monitoring errors
//       }
//     }, 15000);
//   }

//   isUserApp(processName) {
//     const userApps = [
//       'code', 'chrome', 'firefox', 'msedge', 'notepad', 'winword', 'excel',
//       'powerpoint', 'photoshop', 'figma', 'slack', 'discord', 'teams'
//     ];
//     return userApps.some(app => processName.toLowerCase().includes(app));
//   }

//   formatAppName(name) {
//     if (!name) return 'Unknown App';

//     const appMap = {
//       'Code': 'VS Code',
//       'chrome': 'Google Chrome',
//       'firefox': 'Mozilla Firefox',
//       'msedge': 'Microsoft Edge',
//       'notepad': 'Notepad',
//       'winword': 'Microsoft Word',
//       'excel': 'Microsoft Excel',
//       'powerpnt': 'Microsoft PowerPoint',
//       'photoshop': 'Adobe Photoshop',
//       'figma': 'Figma',
//       'slack': 'Slack',
//       'discord': 'Discord',
//       'teams': 'Microsoft Teams'
//     };

//     return appMap[name] || name;
//   }

//   updateActivity() {
//     const now = Date.now();
//     const wasIdle = this.isIdle;

//     this.lastActivityTime = now;
//     this.isIdle = false;

//     if (wasIdle) {
//       console.log('🎯 ACTIVITY DETECTED - User is working again');
//       this.sendActivityUpdate();
//     }
//   }

//   markIdle() {
//     if (!this.isIdle) {
//       this.isIdle = true;
//       console.log('⏸️ USER IDLE - No activity detected');
//       this.sendActivityUpdate();
//     }
//   }

//   checkIdleStatus() {
//     if (!this.isTracking) return;

//     const idleTime = Date.now() - this.lastActivityTime;
//     const wasIdle = this.isIdle;

//     if (idleTime > this.idleThreshold && !this.isIdle) {
//       this.markIdle();
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     const activeTime = this.getActiveTime();
//     const idleSeconds = Math.floor((Date.now() - this.lastActivityTime) / 1000);

//     return {
//       isTracking: this.isTracking,
//       activeTime: activeTime,
//       currentApp: this.currentApp,
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime,
//       idleSeconds: idleSeconds,
//       totalSeconds: Math.floor(activeTime / 1000),
//       platform: process.platform,
//       trackingLevel: 'SYSTEM-WIDE' // ✅ Confirmation
//     };
//   }

//   sendActivityUpdate() {
//     if (this.mainWindow) {
//       const data = this.getTrackingData();
//       this.mainWindow.webContents.send('activity-update', data);

//       const activeSeconds = Math.floor(data.activeTime / 1000);

//       console.log('📊 LIVE TRACKING:', {
//         application: data.currentApp,
//         state: data.isIdle ? '⏸️ IDLE' : '🎯 ACTIVE', 
//         activeTime: `${Math.floor(activeSeconds / 60)}m ${activeSeconds % 60}s`,
//         idleFor: `${Math.floor(data.idleSeconds / 60)}m ${data.idleSeconds % 60}s`,
//         tracking: 'SYSTEM-LEVEL ✅'
//       });
//     }
//   }

//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//     if (this.appCheckInterval) clearInterval(this.appCheckInterval);
//   }
// }

// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   activityTracker.setMainWindow(mainWindow);

//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // IPC Handlers
// ipcMain.handle('start-tracking', async () => {
//   await activityTracker.startTracking();
//   return { 
//     success: true, 
//     message: 'REAL SYSTEM-LEVEL tracking activated!',
//     features: [
//       'Cross-Application Tracking',
//       'VS Code Monitoring', 
//       'Chrome/Firefox Tracking',
//       'Office Apps Detection',
//       'System-Wide Idle Detection'
//     ]
//   };
// });

// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('report-activity', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Activity reported' };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });







// const { app, BrowserWindow, ipcMain, powerMonitor } = require('electron');
// const path = require('path');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 1 * 60 * 1000; // 1 minute
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.mainWindow = null;
//     this.currentApp = 'ACore Portal';
//     this.manualMode = true; // ✅ Manual tracking mode
//   }

//   setMainWindow(window) {
//     this.mainWindow = window;
//   }

//   async startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;

//     this.setupActivityListeners();

//     console.log('🟢 MANUAL Tracking Started');
//     console.log('📝 Note: Switch to manual testing mode');
//     this.sendActivityUpdate();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.cleanupListeners();
//     console.log('🔴 Tracking Stopped');
//     this.sendActivityUpdate();
//   }

//   setupActivityListeners() {
//     // ✅ Only basic system events
//     powerMonitor.on('suspend', () => {
//       this.markIdle();
//       console.log('💤 System sleep detected');
//     });

//     powerMonitor.on('resume', () => {
//       this.updateActivity();
//       console.log('💻 System wake detected');
//     });

//     // ✅ SIMPLE Idle detection (time-based only)
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 5000);

//     console.log('🎯 Using time-based idle detection');
//   }

//   updateActivity() {
//     const now = Date.now();
//     const wasIdle = this.isIdle;

//     this.lastActivityTime = now;
//     this.isIdle = false;

//     if (wasIdle) {
//       console.log('🎯 ACTIVITY DETECTED - Timer RESUMED');
//       this.sendActivityUpdate();
//     }
//   }

//   markIdle() {
//     if (!this.isIdle) {
//       this.isIdle = true;
//       console.log('⏸️ IDLE DETECTED - Timer STOPPED');
//       this.sendActivityUpdate();
//     }
//   }

//   checkIdleStatus() {
//     if (!this.isTracking) return;

//     const idleTime = Date.now() - this.lastActivityTime;
//     const wasIdle = this.isIdle;

//     if (idleTime > this.idleThreshold && !this.isIdle) {
//       this.markIdle();
//     }

//     // ✅ Auto activity detection (fallback)
//     if (this.isIdle && idleTime < this.idleThreshold) {
//       this.updateActivity();
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     const activeTime = this.getActiveTime();
//     const idleSeconds = Math.floor((Date.now() - this.lastActivityTime) / 1000);

//     return {
//       isTracking: this.isTracking,
//       activeTime: activeTime,
//       currentApp: this.currentApp,
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime,
//       idleSeconds: idleSeconds,
//       totalSeconds: Math.floor(activeTime / 1000),
//       trackingMode: 'TIME-BASED 🕒'
//     };
//   }

//   sendActivityUpdate() {
//     if (this.mainWindow) {
//       const data = this.getTrackingData();
//       this.mainWindow.webContents.send('activity-update', data);

//       const activeSeconds = Math.floor(data.activeTime / 1000);

//       console.log('📊 STATUS:', {
//         state: data.isIdle ? '⏸️ IDLE' : '🎯 ACTIVE', 
//         activeTime: `${Math.floor(activeSeconds / 60)}m ${activeSeconds % 60}s`,
//         idleFor: `${Math.floor(data.idleSeconds / 60)}m ${data.idleSeconds % 60}s`
//       });
//     }
//   }

//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//   }
// }

// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   activityTracker.setMainWindow(mainWindow);

//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();

//       // ✅ Add manual testing instructions
//       console.log('\n🎯 MANUAL TESTING INSTRUCTIONS:');
//       console.log('1. Punch In in the app');
//       console.log('2. Wait 1 minute (DO NOT touch mouse/keyboard)');
//       console.log('3. Check if timer pauses automatically');
//       console.log('4. Move mouse to resume timer\n');
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // IPC Handlers
// ipcMain.handle('start-tracking', async () => {
//   await activityTracker.startTracking();
//   return { 
//     success: true, 
//     message: 'Time-based tracking started!',
//     note: 'Using fallback time-based detection'
//   };
// });

// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('report-activity', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Activity reported' };
// });

// // ✅ Manual testing commands
// ipcMain.handle('force-idle', () => {
//   activityTracker.markIdle();
//   return { success: true, message: 'Forced idle state' };
// });

// ipcMain.handle('force-active', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Forced active state' };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });




// const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 1 * 60 * 1000; // 1 minute
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.mainWindow = null;
//   }

//   setMainWindow(window) {
//     this.mainWindow = window;
//   }

//   startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;

//     this.setupActivityListeners();

//     console.log('🟢 Electron Window Tracking Started');
//     this.sendActivityUpdate();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.cleanupListeners();
//     console.log('🔴 Tracking Stopped');
//     this.sendActivityUpdate();
//   }

//   setupActivityListeners() {
//     // ✅ Install activity listeners in renderer
//     if (this.mainWindow) {
//       this.mainWindow.webContents.executeJavaScript(`
//         let lastActivityTime = Date.now();

//         function reportActivity() {
//           lastActivityTime = Date.now();
//           window.electronAPI.reportActivity().catch(console.error);
//         }

//         // Track all possible interactions
//         document.addEventListener('mousemove', reportActivity);
//         document.addEventListener('mousedown', reportActivity); 
//         document.addEventListener('keydown', reportActivity);
//         document.addEventListener('click', reportActivity);
//         document.addEventListener('scroll', reportActivity);
//         document.addEventListener('touchstart', reportActivity);

//         // Also track window focus
//         window.addEventListener('focus', reportActivity);

//         console.log('🎯 Activity listeners installed in Electron window');

//         // Periodic activity check
//         setInterval(() => {
//           const idleTime = Date.now() - lastActivityTime;
//           if (idleTime > 60000) { // 1 minute
//             console.log('ℹ️ No activity in Electron window for 1 minute');
//           }
//         }, 30000);
//       `).catch(console.error);
//     }

//     // ✅ Check idle status every 5 seconds
//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 5000);
//   }

//   updateActivity() {
//     const now = Date.now();
//     const wasIdle = this.isIdle;

//     this.lastActivityTime = now;
//     this.isIdle = false;

//     if (wasIdle) {
//       console.log('🎯 ACTIVITY DETECTED - Resuming timer');
//       this.sendActivityUpdate();
//     }
//   }

//   markIdle() {
//     if (!this.isIdle) {
//       this.isIdle = true;
//       console.log('⏸️ NO ACTIVITY - Pausing timer');
//       this.sendActivityUpdate();
//     }
//   }

//   checkIdleStatus() {
//     if (!this.isTracking) return;

//     const idleTime = Date.now() - this.lastActivityTime;

//     if (idleTime > this.idleThreshold && !this.isIdle) {
//       this.markIdle();
//     } else if (idleTime <= this.idleThreshold && this.isIdle) {
//       this.updateActivity();
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return 0;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     const activeTime = this.getActiveTime();
//     const idleSeconds = Math.floor((Date.now() - this.lastActivityTime) / 1000);

//     return {
//       isTracking: this.isTracking,
//       activeTime: activeTime,
//       currentApp: 'Electron App',
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime,
//       idleSeconds: idleSeconds,
//       totalSeconds: Math.floor(activeTime / 1000)
//     };
//   }

//   sendActivityUpdate() {
//     if (this.mainWindow) {
//       const data = this.getTrackingData();
//       this.mainWindow.webContents.send('activity-update', data);

//       console.log('📊 Status:', {
//         idle: this.isIdle ? 'YES ⏸️' : 'NO 🎯',
//         activeTime: Math.floor(data.activeTime / 1000) + 's',
//         idleFor: data.idleSeconds + 's'
//       });
//     }
//   }

//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//   }
// }

// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   activityTracker.setMainWindow(mainWindow);

//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // IPC Handlers
// ipcMain.handle('start-tracking', () => {
//   activityTracker.startTracking();
//   return { success: true, message: 'Tracking started' };
// });

// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('report-activity', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Activity reported' };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });  







// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');
// const { exec } = require('child_process');

// class ActivityTracker {
//   constructor() {
//     this.isTracking = false;
//     this.startTime = null;
//     this.totalActiveTime = 0;
//     this.lastActivityTime = Date.now();
//     this.idleThreshold = 1 * 60 * 1000;
//     this.isIdle = false;
//     this.idleInterval = null;
//     this.windowCheckInterval = null;
//     this.mouseInterval = null;
//     this.mainWindow = null;
//     this.currentApp = 'Unknown';
//   }

//   setMainWindow(window) {
//     this.mainWindow = window;
//   }

//   async startTracking() {
//     if (this.isTracking) return;

//     this.isTracking = true;
//     this.startTime = Date.now();
//     this.lastActivityTime = Date.now();
//     this.isIdle = false;

//     this.setupActivityListeners();
//     this.startWindowsTracking();
//     this.startUserActivityMonitoring();

//     console.log('🟢 REAL SYSTEM TRACKING Started');
//     console.log('🎯 Tracking: VS Code, Chrome, Firefox, Word, Excel, etc.');
//     this.sendActivityUpdate();
//   }

//   stopTracking() {
//     this.isTracking = false;
//     this.cleanupListeners();
//     console.log('🔴 Tracking Stopped');
//     this.sendActivityUpdate();
//   }

//   setupActivityListeners() {
//     powerMonitor.on('suspend', () => {
//       this.markIdle();
//     });

//     powerMonitor.on('resume', () => {
//       this.updateActivity();
//     });

//     this.idleInterval = setInterval(() => {
//       this.checkIdleStatus();
//     }, 5000);
//   }

//   startWindowsTracking() {
//     this.windowCheckInterval = setInterval(() => {
//       this.getActiveWindow().then(appName => {
//         if (appName && appName !== this.currentApp) {
//           this.currentApp = appName;
//           console.log('💻 Switched to:', this.currentApp);
//           this.updateActivity();
//           this.sendActivityUpdate();
//         }
//       });
//     }, 3000);
//   }

//   startUserActivityMonitoring() {
//     // Monitor mouse movement
//     let lastMousePos = screen.getCursorScreenPoint();

//     this.mouseInterval = setInterval(() => {
//       const currentMousePos = screen.getCursorScreenPoint();

//       if (currentMousePos.x !== lastMousePos.x || currentMousePos.y !== lastMousePos.y) {
//         lastMousePos = currentMousePos;
//         this.updateActivity();
//       }
//     }, 2000);
//   }

//   getActiveWindow() {
//     return new Promise((resolve) => {
//       if (process.platform === 'win32') {
//         exec('powershell "(Get-Process | Where-Object {$_.MainWindowTitle -ne \"\"} | Sort-Object MainWindowTitle | Select-Object -First 1).ProcessName"', 
//           (error, stdout) => {
//             if (!error && stdout && stdout.trim()) {
//               const appName = this.formatWindowsAppName(stdout.trim());
//               resolve(appName);
//             } else {
//               resolve('Unknown App');
//             }
//           });
//       } else {
//         resolve('Browser');
//       }
//     });
//   }

//   formatWindowsAppName(processName) {
//     const appMap = {
//       'code': 'VS Code',
//       'chrome': 'Google Chrome', 
//       'firefox': 'Mozilla Firefox',
//       'msedge': 'Microsoft Edge',
//       'notepad': 'Notepad',
//       'winword': 'Microsoft Word',
//       'excel': 'Microsoft Excel',
//       'powerpnt': 'Microsoft PowerPoint',
//       'outlook': 'Microsoft Outlook',
//       'teams': 'Microsoft Teams',
//       'slack': 'Slack',
//       'discord': 'Discord',
//       'photoshop': 'Adobe Photoshop',
//       'figma': 'Figma'
//     };

//     return appMap[processName.toLowerCase()] || processName;
//   }

//   updateActivity() {
//     const now = Date.now();
//     const wasIdle = this.isIdle;

//     this.lastActivityTime = now;
//     this.isIdle = false;

//     if (wasIdle) {
//       console.log('🎯 ACTIVITY DETECTED - Timer RESUMED');
//       this.sendActivityUpdate();
//     }
//   }

//   markIdle() {
//     if (!this.isIdle) {
//       this.isIdle = true;
//       console.log('⏸️ USER IDLE - Timer PAUSED');
//       this.sendActivityUpdate();
//     }
//   }

//   checkIdleStatus() {
//     if (!this.isTracking) return;

//     const idleTime = Date.now() - this.lastActivityTime;

//     if (idleTime > this.idleThreshold && !this.isIdle) {
//       this.markIdle();
//     }
//   }

//   getActiveTime() {
//     if (!this.isTracking) return this.totalActiveTime;

//     const currentTime = Date.now();
//     const idleTime = this.isIdle ? (currentTime - this.lastActivityTime) : 0;
//     const currentSessionTime = currentTime - this.startTime - Math.min(idleTime, this.idleThreshold);

//     return this.totalActiveTime + Math.max(0, currentSessionTime);
//   }

//   getTrackingData() {
//     const activeTime = this.getActiveTime();
//     const idleSeconds = Math.floor((Date.now() - this.lastActivityTime) / 1000);

//     return {
//       isTracking: this.isTracking,
//       activeTime: activeTime,
//       currentApp: this.currentApp,
//       isIdle: this.isIdle,
//       lastActivity: this.lastActivityTime,
//       idleSeconds: idleSeconds,
//       totalSeconds: Math.floor(activeTime / 1000),
//       platform: process.platform,
//       trackingLevel: 'SYSTEM-WIDE ✅'
//     };
//   }

//   sendActivityUpdate() {
//     if (this.mainWindow) {
//       const data = this.getTrackingData();
//       this.mainWindow.webContents.send('activity-update', data);
//     }
//   }

//   cleanupListeners() {
//     if (this.idleInterval) clearInterval(this.idleInterval);
//     if (this.windowCheckInterval) clearInterval(this.windowCheckInterval);
//     if (this.mouseInterval) clearInterval(this.mouseInterval);
//   }
// }

// // Rest of the code same as before...
// const activityTracker = new ActivityTracker();
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js')
//     }
//   });

//   activityTracker.setMainWindow(mainWindow);

//   mainWindow.loadURL('http://localhost:5173/')
//     .then(() => {
//       console.log('✅ React app loaded successfully!');
//       mainWindow.show();
//       mainWindow.webContents.openDevTools();
//     })
//     .catch(err => {
//       console.log('❌ Error loading app:', err);
//       mainWindow.show();
//     });
// }

// // IPC Handlers (same as before)
// ipcMain.handle('start-tracking', () => {
//   activityTracker.startTracking();
//   return { 
//     success: true, 
//     message: 'WINDOWS SYSTEM TRACKING Activated!',
//     features: ['VS Code Tracking', 'Chrome/Firefox Tracking', 'Office Apps', 'System-Wide Monitoring']
//   };
// });

// ipcMain.handle('stop-tracking', () => {
//   const data = activityTracker.getTrackingData();
//   activityTracker.stopTracking();
//   return { success: true, data };
// });

// ipcMain.handle('get-tracking-data', () => {
//   return activityTracker.getTrackingData();
// });

// ipcMain.handle('report-activity', () => {
//   activityTracker.updateActivity();
//   return { success: true, message: 'Activity reported' };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   activityTracker.cleanupListeners();
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });





// main.js → 100% WORKING, NO NATIVE PACKAGE, KEY + MOUSE RESUME

// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM READY – System-wide tracking active!');
//   });
// }

// // Mouse move detect (global)
// const checkMouseActivity = () => {
//   if (!isTracking) return;
//   const pos = screen.getCursorScreenPoint();
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     lastActivityTime = Date.now();
//     sendUpdate(false);
//   }
//   lastMousePos = pos;
// };

// // System idle se activity detect
// const checkSystemActivity = () => {
//   if (!isTracking) return;
//   const idleSeconds = powerMonitor.getSystemIdleTime();
//   if (idleSeconds < 60) {
//     lastActivityTime = Date.now();
//     sendUpdate(false); // Active
//   } else {
//     sendUpdate(true); // Idle
//   }
// };

// const sendUpdate = (isIdle) => {
//   if (!mainWindow) return;
//   const currentSeconds = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);
//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: currentSeconds
//   });
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   lastMousePos = screen.getCursorScreenPoint();
//   totalActiveSeconds = 0;

//   setInterval(checkMouseActivity, 2000);
//   setInterval(checkSystemActivity, 10000);

//   console.log('PUNCH IN – Global tracking started');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`PUNCH OUT – Total Active Time: ${totalActiveSeconds} seconds`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });




// main.js — 100% TESTED, YOUTUBE + NETWORK TAB + CONSOLE PROOF

// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;
// let activeWindowTitle = 'Not Tracking';

// // Active window title lene ke liye (YouTube detect karega)
// let getActiveWindow;
// try {
//   const activeWin = require('active-window');
//   getActiveWindow = activeWin;
// } catch (e) {
//   console.log('active-window not loaded (optional)');
// }

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM READY → Global tracking active!');
//   });
// }

// // Send update to React + Console + Network tab proof
// const sendUpdate = (isIdle, source = 'Unknown') => {
//   if (!mainWindow) return;

//   const currentSeconds = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   const data = {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : (activeWindowTitle || 'Active'),
//     totalSeconds: currentSeconds,
//     source,
//     timestamp: new Date().toLocaleTimeString()
//   };

//   // 1. React ko bhej
//   mainWindow.webContents.send('activity-update', data);

//   // 2. Console mein dikhe (tester ke liye)
//   console.log(
//     `%c[${data.timestamp}] ${isIdle ? 'IDLE' : 'ACTIVE'} → ${data.currentApp} (${source}) → ${currentSeconds}s`,
//     isIdle ? 'color: red; font-weight: bold;' : 'color: green; font-weight: bold;'
//   );

//   // 3. Network tab mein dikhe (WebSocket style)
//   mainWindow.webContents.executeJavaScript(`
//     window.dispatchEvent(new CustomEvent('electron-activity', { detail: ${JSON.stringify(data)} }));
//   `);
// };

// // Mouse move detect
// const checkMouseMove = () => {
//   if (!isTracking) return;
//   const pos = screen.getCursorScreenPoint();
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     lastActivityTime = Date.now();
//     sendUpdate(false, 'Mouse Move');
//   }
//   lastMousePos = pos;
// };

// // System idle + key press detect
// const checkSystemActivity = () => {
//   if (!isTracking) return;
//   const idleSeconds = powerMonitor.getSystemIdleTime();
//   if (idleSeconds < 60) {
//     lastActivityTime = Date.now();
//     sendUpdate(false, 'Key Press / System Active');
//   } else if (idleSeconds > 60) {
//     sendUpdate(true, 'Idle > 1 min');
//   }
// };

// // Active window title check (YouTube, Netflix, etc.)
// const checkActiveWindow = () => {
//   if (!isTracking || !getActiveWindow) return;
//   getActiveWindow((win) => {
//     if (win && win.title) {
//       const title = win.title.toLowerCase();
//       activeWindowTitle = win.title.length > 30 ? win.title.substring(0, 30) + '...' : win.title;

//       if (title.includes('youtube') || title.includes('netflix') || title.includes('prime') || title.includes('video')) {
//         lastActivityTime = Date.now();
//         sendUpdate(false, 'Watching Video');
//       }
//     }
//   });
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   lastMousePos = screen.getCursorScreenPoint();
//   totalActiveSeconds = 0;
//   activeWindowTitle = 'Tracking Started';

//   setInterval(checkMouseMove, 1500);
//   setInterval(checkSystemActivity, 8000);
//   setInterval(checkActiveWindow, 10000);

//   console.log('GLOBAL TRACKING STARTED → YouTube + Key + Mouse sab count hoga!');
//   sendUpdate(false, 'Punch In');

//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;

//   console.log(`PUNCH OUT → Total Active Time: ${totalActiveSeconds} seconds`);
//   sendUpdate(false, 'Punch Out');

//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });



// main.js — 100% WHITE SCREEN FIX + TRACKING WORKING

// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     show: false, // pehle load, phir show → white screen nahi aayega
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false // agar CORS issue ho to
//     }
//   });

//   // YE LINE SABSE ZAROORI — React app sahi se load hoga
//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.focus();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM LOADED — No White Screen!');
//   });

//   // Agar load fail ho to error dikhao
//   mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
//     console.error('Load Failed:', errorCode, errorDescription);
//     mainWindow.loadURL('http://localhost:5173');
//   });
// }

// // Mouse move + system idle se tracking (100% working, no extra package)
// const checkActivity = () => {
//   if (!isTracking || !mainWindow) return;

//   const pos = screen.getCursorScreenPoint();
//   const idleSeconds = powerMonitor.getSystemIdleTime();

//   // Mouse move ya key press detect
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y) || idleSeconds < 60) {
//     lastActivityTime = Date.now();
//     const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);
//     mainWindow.webContents.send('activity-update', {
//       isIdle: false,
//       currentApp: 'Active',
//       totalSeconds: current
//     });
//   } else if (idleSeconds > 60) {
//     const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);
//     mainWindow.webContents.send('activity-update', {
//       isIdle: true,
//       currentApp: 'Idle',
//       totalSeconds: current
//     });
//   }

//   lastMousePos = pos;
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   lastMousePos = screen.getCursorScreenPoint();
//   totalActiveSeconds = 0;

//   setInterval(checkActivity, 3000); // har 3 sec check

//   console.log('TRACKING STARTED — Background mein bhi chalega');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`PUNCH OUT — Total: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });







// main.js — FINAL VERSION: SIRF 60 SECOND INACTIVITY = PAUSE

// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();  // Yeh update hoga har activity pe
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');
//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM READY — 60 Second Rule Active!');
//   });
// }

// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(
//     isIdle 
//       ? `%cIDLE → Timer PAUSED (${reason})` 
//       : `%cACTIVE → Timer Running (${reason})`,
//     isIdle ? 'color: red; font-weight: bold;' : 'color: green; font-weight: bold;',
//     current + 's'
//   );
// };

// // Har 5 second mein check karo
// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   // 1. Mouse move?
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // 2. Key press ya system activity?
//   if (powerMonitor.getSystemIdleTime() < 60) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   // Agar activity mili → lastActivityTime update kar do
//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   }

//   // 60 second se zyada inactivity → PAUSE
//   else if (idleMs > 60000) {  // 60,000 ms = 60 seconds
//     sendUpdate(true, 'No Activity for 60 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   // Har 5 second mein check
//   setInterval(checkActivity, 5000);

//   console.log('TRACKING STARTED — 60 Second Inactivity = Pause');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`PUNCH OUT — Total Active Time: ${totalActiveSeconds} seconds`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });



// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();  
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');
//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM READY — 20 Second Rule Active!');
//   });
// }

// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(
//     isIdle 
//       ? `%cIDLE → Timer PAUSED (${reason})` 
//       : `%cACTIVE → Timer Running (${reason})`,
//     isIdle ? 'color: red; font-weight: bold;' : 'color: green; font-weight: bold;',
//     current + 's'
//   );
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // 🔥 System Idle Time Check -> 60 -> 20 seconds
//   if (powerMonitor.getSystemIdleTime() < 20) { // UPDATED
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   }

//   // 🔥 Inactivity sleep -> 60,000 -> 20,000 ms
//   else if (idleMs > 20000) { // UPDATED (20 sec)
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('TRACKING STARTED — 20 Second Inactivity = Pause');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`PUNCH OUT — Total Active Time: ${totalActiveSeconds} seconds`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });




// adding geolocation 







// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');
// const geoip = require('geoip-lite'); // ✅ Add geoip package

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();  
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       enableRemoteModule: false,
//       // ✅ Location tracking ke liye yeh add karo
//       webSecurity: false,
//       allowRunningInsecureContent: true
//     }
//   });

//   // ✅ Enable geolocation before loading
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     const allowedPermissions = ['geolocation', 'notifications'];
//     if (allowedPermissions.includes(permission)) {
//       callback(true); // Allow
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');
//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE CRM READY — 20 Second Rule Active!');
//   });
// }

// // ✅ Function to get approximate location from IP
// const getApproximateLocation = () => {
//   try {
//     // This gives approximate location based on IP
//     // In real production, you might want to use GPS or more accurate method
//     const os = require('os');
//     const networkInterfaces = os.networkInterfaces();
//     let ip = '8.8.8.8'; // Default to Google DNS

//     // Try to get local IP
//     Object.values(networkInterfaces).forEach(iface => {
//       iface.forEach(alias => {
//         if (alias.family === 'IPv4' && !alias.internal) {
//           ip = alias.address;
//         }
//       });
//     });

//     // Get location from IP (approximate)
//     const geo = geoip.lookup(ip);

//     if (geo) {
//       return {
//         latitude: geo.ll[0],
//         longitude: geo.ll[1],
//         city: geo.city || 'Unknown',
//         country: geo.country || 'Unknown',
//         accuracy: 50000, // Approximate accuracy in meters
//         source: 'ip'
//       };
//     }
//   } catch (error) {
//     console.error('GeoIP error:', error);
//   }

//   // Default to Indore coordinates if IP lookup fails
//   return {
//     latitude: 22.7494444,
//     longitude: 75.8991667,
//     city: 'Indore',
//     country: 'India',
//     accuracy: 100000,
//     source: 'default'
//   };
// };

// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(
//     isIdle 
//       ? `%cIDLE → Timer PAUSED (${reason})` 
//       : `%cACTIVE → Timer Running (${reason})`,
//     isIdle ? 'color: red; font-weight: bold;' : 'color: green; font-weight: bold;',
//     current + 's'
//   );
// };

// // ✅ New IPC handler for location
// ipcMain.handle('get-user-location', async () => {
//   try {
//     return getApproximateLocation();
//   } catch (error) {
//     console.error('Location error:', error);
//     return null;
//   }
// });

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('TRACKING STARTED — 20 Second Inactivity = Pause');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`PUNCH OUT — Total Active Time: ${totalActiveSeconds} seconds`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// // ✅ Add geolocation flags
// app.commandLine.appendSwitch('enable-geolocation');
// app.commandLine.appendSwitch('enable-features', 'Geolocation');

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });





// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       // ✅ MUST BE FALSE FOR LOCALHOST
//       webSecurity: false
//     }
//   });

//   // ✅ FIX PERMISSION ERRORS
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     // Allow all necessary permissions
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5175');

//   // ✅ FIX CSP ERRORS - Modify response headers
//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://ipapi.co https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     // Optional: Comment out in production
//     // mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ✅ SIMPLE & WORKING Location Function
// const getCurrentLocation = () => {
//   return new Promise((resolve) => {
//     if (!mainWindow) {
//       resolve({ error: 'Window not ready' });
//       return;
//     }

//     // Execute JavaScript in renderer to get location
//     mainWindow.webContents.executeJavaScript(`
//       (async () => {
//         try {
//           // Method 1: Direct Browser Geolocation
//           if (navigator.geolocation) {
//             return new Promise((resolveGeolocation) => {
//               navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                   resolveGeolocation({
//                     success: true,
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude,
//                     accuracy: position.coords.accuracy,
//                     source: 'browser-gps'
//                   });
//                 },
//                 async (error) => {
//                   // If GPS fails, try IP-based location
//                   try {
//                     const response = await fetch('https://ipapi.co/json/', {
//                       timeout: 5000
//                     });
//                     if (response.ok) {
//                       const data = await response.json();
//                       resolveGeolocation({
//                         success: true,
//                         latitude: parseFloat(data.latitude) || 22.7494444,
//                         longitude: parseFloat(data.longitude) || 75.8991667,
//                         accuracy: 50000,
//                         source: 'ip-api',
//                         city: data.city || 'Indore'
//                       });
//                     } else {
//                       throw new Error('IP API failed');
//                     }
//                   } catch (ipError) {
//                     // Fallback to default office location
//                     resolveGeolocation({
//                       success: true,
//                       latitude: 22.7494444,
//                       longitude: 75.8991667,
//                       accuracy: 100000,
//                       source: 'default-fallback'
//                     });
//                   }
//                 },
//                 {
//                   enableHighAccuracy: true,
//                   timeout: 10000,
//                   maximumAge: 0
//                 }
//               );
//             });
//           } else {
//             throw new Error('Geolocation not supported');
//           }
//         } catch (error) {
//           return {
//             success: false,
//             error: error.message
//           };
//         }
//       })()
//     `).then(resolve).catch(error => {
//       resolve({ success: false, error: error.message });
//     });
//   });
// };

// // ✅ IPC Handler for Location
// ipcMain.handle('get-current-location', async () => {
//   console.log('🔄 Getting location...');
//   try {
//     const location = await getCurrentLocation();
//     console.log('📍 Location result:', location);
//     return location;
//   } catch (error) {
//     console.error('❌ Location error:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// });

// // ✅ Existing Activity Tracking (Unchanged)
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason, `${current}s`);
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`🛑 PUNCH OUT - Total Time: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// // ✅ FIX: Add these flags BEFORE app.whenReady()
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });


// ---------+

// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       // ✅ MUST BE FALSE FOR LOCALHOST
//       webSecurity: false
//     }
//   });

//   // ✅ FIX PERMISSION ERRORS
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     // Allow all necessary permissions
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5174');

//   // ✅ FIX CSP ERRORS - Modify response headers
//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://ipapi.co https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     // Optional: Comment out in production
//     // mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ✅ SIMPLIFIED & RELIABLE Location Function
// ipcMain.handle('get-current-location', async () => {
//   return new Promise((resolve) => {
//     if (!mainWindow) {
//       resolve({
//         success: true,
//         latitude: 22.7494444,
//         longitude: 75.8991667,
//         accuracy: 100000,
//         source: 'window-not-ready'
//       });
//       return;
//     }

//     mainWindow.webContents.executeJavaScript(`
//       new Promise((resolve) => {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => resolve({
//               success: true,
//               latitude: pos.coords.latitude,
//               longitude: pos.coords.longitude,
//               accuracy: pos.coords.accuracy,
//               source: 'gps'
//             }),
//             () => {
//               fetch('https://ipapi.co/json/')
//                 .then(r => r.json())
//                 .then(data => resolve({
//                   success: true,
//                   latitude: data.latitude || 22.7494444,
//                   longitude: data.longitude || 75.8991667,
//                   accuracy: 50000,
//                   source: 'ip'
//                 }))
//                 .catch(() => resolve({
//                   success: true,
//                   latitude: 22.7494444,
//                   longitude: 75.8991667,
//                   accuracy: 100000,
//                   source: 'fallback'
//                 }));
//             },
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         } else {
//           resolve({
//             success: true,
//             latitude: 22.7494444,
//             longitude: 75.8991667,
//             accuracy: 100000,
//             source: 'no-api'
//           });
//         }
//       })
//     `).then(resolve).catch(() => {
//       resolve({
//         success: true,
//         latitude: 22.7494444,
//         longitude: 75.8991667,
//         accuracy: 100000,
//         source: 'js-error-fallback'
//       });
//     });
//   });
// });

// // ✅ Existing Activity Tracking (Unchanged)
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason, `${current}s`);
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`🛑 PUNCH OUT - Total Time: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// // ✅ FIX: Add these flags BEFORE app.whenReady()
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });

// +++++++++===========>



//   const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5174');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('🚀 ACORE EMPLOYEE PORTAL READY');
//   });
// }

// // -------------------------------------
// // 📌 LOCATION HANDLER (FINAL & WORKING)
// // -------------------------------------

// ipcMain.handle('get-current-location', async () => {
//   return new Promise((resolve) => {

//     mainWindow.webContents.executeJavaScript(`
//       new Promise((resolve) => {

//         // 1) Try Browser GPS
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => resolve({
//               success: true,
//               latitude: pos.coords.latitude,
//               longitude: pos.coords.longitude,
//               accuracy: pos.coords.accuracy,
//               source: "gps"
//             }),
//             async () => {
//               // 2) Try IP API
//               try {
//                 const res = await fetch("https://ipapi.co/json/");
//                 const data = await res.json();
//                 resolve({
//                   success: true,
//                   latitude: parseFloat(data.latitude) || 22.7494444,
//                   longitude: parseFloat(data.longitude) || 75.8991667,
//                   accuracy: 50000,
//                   source: "ip"
//                 });
//               } catch (err) {
//                 // 3) Fallback
//                 resolve({
//                   success: true,
//                   latitude: 22.7494444,
//                   longitude: 75.8991667,
//                   accuracy: 100000,
//                   source: "fallback"
//                 });
//               }
//             },
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         } else {
//           resolve({
//             success: true,
//             latitude: 22.7494444,
//             longitude: 75.8991667,
//             accuracy: 100000,
//             source: "no-geolocation"
//           });
//         }
//       })
//     `)
//     .then(resolve)
//     .catch(() => {
//       resolve({
//         success: true,
//         latitude: 22.7494444,
//         longitude: 75.8991667,
//         accuracy: 100000,
//         source: "error-fallback"
//       });
//     });
//   });
// });

// // -------------------------------------

// // ACTIVITY TRACKING (NO CHANGE)

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('▶️ TRACKING STARTED');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`🛑 TRACKING STOPPED: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// function checkActivity() {
//   if (!isTracking) return;

//   const now = Date.now();
//   const pos = screen.getCursorScreenPoint();
//   const idleMs = now - lastActivityTime;

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     mainWindow.webContents.send('activity-update', {
//       isIdle: false,
//       currentApp: "Active",
//       totalSeconds: now
//     });
//   } else if (idleMs > 20000) {
//     mainWindow.webContents.send('activity-update', {
//       isIdle: true,
//       currentApp: "Idle",
//       totalSeconds: now
//     });
//   }
// }

// // FLAGS
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(createWindow);
// app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });


//                  11111111111111111111111111111111111111111111111111111111



















// const { app, BrowserWindow, ipcMain, powerMonitor, screen, net } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('🚀 ACORE EMPLOYEE PORTAL READY');
//   });
// }

// // -------------------------------------
// // 📌 UPDATED LOCATION HANDLER (FIXED FOR ELECTRON)
// // -------------------------------------

// // ipcMain.handle('get-current-location', async () => {
// //   console.log('📍 get-current-location called from renderer');
  
// //   return new Promise((resolve) => {
// //     // First try: Native Electron geolocation
// //     if (navigator.geolocation) {
// //       console.log('🔍 Trying native Electron geolocation...');
      
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           console.log('✅ Native geolocation success:', {
// //             lat: position.coords.latitude,
// //             lng: position.coords.longitude,
// //             accuracy: position.coords.accuracy
// //           });
          
// //           resolve({
// //             success: true,
// //             latitude: position.coords.latitude,
// //             longitude: position.coords.longitude,
// //             accuracy: position.coords.accuracy || 50,
// //             altitude: position.coords.altitude,
// //             altitudeAccuracy: position.coords.altitudeAccuracy,
// //             heading: position.coords.heading,
// //             speed: position.coords.speed,
// //             timestamp: position.timestamp,
// //             source: "electron-gps"
// //           });
// //         },
// //         async (error) => {
// //           console.log('❌ Native geolocation failed:', error.message);
          
// //           // Second try: BrowserView method (if mainWindow exists)
// //           try {
// //             console.log('🌐 Trying BrowserView method...');
// //             const location = await getLocationViaBrowserView();
// //             if (location && location.success) {
// //               console.log('✅ BrowserView location success');
// //               resolve(location);
// //               return;
// //             }
// //           } catch (browserViewError) {
// //             console.log('❌ BrowserView method failed:', browserViewError.message);
// //           }
          
// //           // Third try: IP-based location
// //           try {
// //             console.log('🌍 Trying IP-based location...');
// //             const ipLocation = await getIPLocation();
// //             console.log('✅ IP location result:', ipLocation);
// //             resolve(ipLocation);
// //           } catch (ipError) {
// //             console.log('❌ IP location failed:', ipError.message);
            
// //             // Final fallback: Default office location
// //             resolve({
// //               success: true,
// //               latitude: 22.7494444,
// //               longitude: 75.8991667,
// //               accuracy: 100,
// //               source: "default-office"
// //             });
// //           }
// //         },
// //         {
// //           enableHighAccuracy: true,
// //           timeout: 15000,
// //           maximumAge: 0
// //         }
// //       );
// //     } else {
// //       console.log('⚠️ navigator.geolocation not available in main process');
      
// //       // Fallback to IP location
// //       getIPLocation()
// //         .then(resolve)
// //         .catch(() => {
// //           resolve({
// //             success: true,
// //             latitude: 22.7494444,
// //             longitude: 75.8991667,
// //             accuracy: 100,
// //             source: "fallback"
// //           });
// //         });
// //     }
// //   });
// // });                                                                                yaha par mene changes kiye location ke liye 



// // -------------------------------------
// // 📌 FINAL STABLE LOCATION HANDLER
// // -------------------------------------
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 get-current-location called from renderer');

//   // STEP-1: Try Browser WiFi + GPS Based
//   try {
//     console.log('🌐 Trying BrowserView location...');
//     const browserLocation = await getLocationViaBrowserView();
    
//     if (browserLocation && browserLocation.success) {
//       updateLastKnownLocation(browserLocation);
//       console.log('✅ BrowserView location success');
//       return browserLocation;
//     }
//   } catch (err) {
//     console.log('❌ BrowserView failed:', err.message);
//   }

//   // STEP-2: Try IP Based
//   try {
//     console.log('🌍 Trying IP-based location...');
//     const ipLocation = await getIPLocation();
    
//     if (ipLocation && ipLocation.success) {
//       updateLastKnownLocation(ipLocation);
//       console.log('✅ IP Location success');
//       return ipLocation;
//     }
//   } catch (err) {
//     console.log('❌ IP Based failed:', err.message);
//   }

//   // STEP-3: Last Known Cached Location
//   if (lastKnownLocation) {
//     console.log('♻️ Using cached last known location');
//     return lastKnownLocation;
//   }

//   // STEP-4: Final Fallback → Default Office
//   console.log('⚠️ Returning default office location');
//   const fallback = {
//     success: true,
//     latitude: 22.7494444,
//     longitude: 75.8991667,
//     accuracy: 100,
//     source: "default-office"
//   };

//   updateLastKnownLocation(fallback);
//   return fallback;
// });

// // Helper: Get location via BrowserView (more reliable)
// async function getLocationViaBrowserView() {
//   return new Promise((resolve, reject) => {
//     if (!mainWindow || !mainWindow.webContents) {
//       reject(new Error('Main window not available'));
//       return;
//     }

//     mainWindow.webContents.executeJavaScript(`
//       new Promise((resolveJS) => {
//         if (!navigator.geolocation) {
//           resolveJS({ success: false, error: "Geolocation not available in browser" });
//           return;
//         }
        
//         navigator.geolocation.getCurrentPosition(
//           (pos) => {
//             resolveJS({
//               success: true,
//               latitude: pos.coords.latitude,
//               longitude: pos.coords.longitude,
//               accuracy: pos.coords.accuracy || 100,
//               source: "browser-view"
//             });
//           },
//           (error) => {
//             resolveJS({
//               success: false,
//               error: error.message,
//               source: "browser-view"
//             });
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 10000,
//             maximumAge: 0
//           }
//         );
//       })
//     `)
//     .then((result) => {
//       console.log('📍 BrowserView result:', result);
//       if (result && result.success) {
//         resolve(result);
//       } else {
//         reject(new Error(result?.error || 'BrowserView location failed'));
//       }
//     })
//     .catch(reject);
//   });
// }

// // Helper: Get IP-based location with multiple fallbacks
// async function getIPLocation() {
//   const ipServices = [
//     'https://ipapi.co/json/',
//     'https://ipinfo.io/json?token=test', // Remove token if not needed
//     'https://api.ipgeolocation.io/ipgeo?apiKey=demo', // Demo key
//     'https://geolocation-db.com/json/'
//   ];

//   for (const serviceUrl of ipServices) {
//     try {
//       console.log(`🌐 Trying IP service: ${serviceUrl}`);
      
//       const response = await fetch(serviceUrl, {
//         signal: AbortSignal.timeout(5000)
//       });
      
//       if (!response.ok) continue;
      
//       const data = await response.json();
      
//       // Extract coordinates from different API formats
//       let lat, lng;
      
//       if (serviceUrl.includes('ipapi.co')) {
//         lat = data.latitude;
//         lng = data.longitude;
//       } else if (serviceUrl.includes('ipinfo.io')) {
//         const [latStr, lngStr] = data.loc?.split(',') || [];
//         lat = parseFloat(latStr);
//         lng = parseFloat(lngStr);
//       } else if (serviceUrl.includes('ipgeolocation.io')) {
//         lat = data.latitude;
//         lng = data.longitude;
//       } else if (serviceUrl.includes('geolocation-db.com')) {
//         lat = data.latitude;
//         lng = data.longitude;
//       }
      
//       if (lat && lng) {
//         return {
//           success: true,
//           latitude: lat,
//           longitude: lng,
//           accuracy: 50000, // ~50km accuracy for IP
//           source: "ip-api",
//           service: serviceUrl,
//           city: data.city,
//           country: data.country_name || data.country
//         };
//       }
//     } catch (error) {
//       console.log(`❌ IP service failed (${serviceUrl}):`, error.message);
//       continue;
//     }
//   }
  
//   throw new Error('All IP services failed');
// }

// // New: Get last known location (for caching)
// let lastKnownLocation = null;
// ipcMain.handle('get-last-known-location', () => {
//   return lastKnownLocation || {
//     success: false,
//     error: 'No location cached',
//     source: 'cache'
//   };
// });

// // Update last known location when we get a new one
// function updateLastKnownLocation(location) {
//   if (location && location.success) {
//     lastKnownLocation = {
//       ...location,
//       timestamp: Date.now()
//     };
//     console.log('💾 Updated last known location cache');
//   }
// }

// // -------------------------------------
// // ACTIVITY TRACKING (NO CHANGES - KEEPING EXISTING FUNCTIONALITY)
// // -------------------------------------

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   // Start activity checking interval
//   const activityInterval = setInterval(() => {
//     if (!isTracking) {
//       clearInterval(activityInterval);
//       return;
//     }
//     checkActivity();
//   }, 5000);

//   console.log('▶️ TRACKING STARTED');
//   return { success: true, intervalId: activityInterval };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`🛑 TRACKING STOPPED: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// function checkActivity() {
//   if (!isTracking) return;

//   const now = Date.now();
//   const pos = screen.getCursorScreenPoint();
//   const idleMs = now - lastActivityTime;

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     if (mainWindow && mainWindow.webContents) {
//       mainWindow.webContents.send('activity-update', {
//         isIdle: false,
//         currentApp: "Active",
//         totalSeconds: now
//       });
//     }
//   } else if (idleMs > 20000) {
//     if (mainWindow && mainWindow.webContents) {
//       mainWindow.webContents.send('activity-update', {
//         isIdle: true,
//         currentApp: "Idle",
//         totalSeconds: now
//       });
//     }
//   }
// }

// // Get current active application
// ipcMain.handle('get-current-app', () => {
//   try {
//     // This is platform-specific
//     if (process.platform === 'win32') {
//       return { app: "Windows App", platform: "windows" };
//     } else if (process.platform === 'darwin') {
//       return { app: "Mac App", platform: "mac" };
//     } else {
//       return { app: "Linux App", platform: "linux" };
//     }
//   } catch (error) {
//     return { app: "Unknown", error: error.message };
//   }
// });

// // Health check endpoint
// ipcMain.handle('health-check', () => {
//   return {
//     status: 'healthy',
//     timestamp: new Date().toISOString(),
//     tracking: isTracking,
//     uptime: process.uptime(),
//     platform: process.platform
//   };
// });

// // Handle window events
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// // FLAGS for development
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// // Enable remote module for debugging
// app.commandLine.appendSwitch('remote-debugging-port', '8315');

// app.whenReady().then(() => {
//   createWindow();
  
//   // Log when app is ready
//   console.log('⚡ Electron app ready');
//   console.log('📡 Location services initialized');
//   console.log('🖱️ Activity tracking available');
// });
















// new add fsor location reasson yaha par me add kar raha hu 


// const { app, BrowserWindow, ipcMain, powerMonitor, screen, net } = require('electron');
// const path = require('path');
// const fetch = require('node-fetch'); // यदि node-fetch install है

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('🚀 ACORE EMPLOYEE PORTAL READY');
//   });
// }

// // ✅ SIMPLIFIED LOCATION HANDLER
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 Location request received');

//   // FIRST: Try direct GPS if available
//   if (mainWindow && mainWindow.webContents) {
//     try {
//       const browserLocation = await mainWindow.webContents.executeJavaScript(`
//         new Promise((resolve) => {
//           if (!navigator.geolocation) {
//             resolve({ success: false, error: "No geolocation" });
//             return;
//           }
          
//           navigator.geolocation.getCurrentPosition(
//             (pos) => {
//               resolve({
//                 success: true,
//                 latitude: pos.coords.latitude,
//                 longitude: pos.coords.longitude,
//                 accuracy: pos.coords.accuracy || 50,
//                 source: "browser-gps"
//               });
//             },
//             (error) => {
//               resolve({ 
//                 success: false, 
//                 error: error.message,
//                 source: "browser-error" 
//               });
//             },
//             {
//               enableHighAccuracy: true,
//               timeout: 10000,
//               maximumAge: 0
//             }
//           );
//         });
//       `);

//       if (browserLocation.success) {
//         console.log('✅ Browser GPS location:', browserLocation);
//         return browserLocation;
//       }
//     } catch (error) {
//       console.log('❌ Browser GPS failed:', error.message);
//     }
//   }

//   // SECOND: IP-based fallback (सिर्फ development के लिए)
//   try {
//     console.log('🌐 Trying IP-based location...');
//     const response = await fetch('https://ipapi.co/json/', {
//       timeout: 5000
//     });
    
//     if (response.ok) {
//       const data = await response.json();
//       console.log('📍 IP location data:', {
//         lat: data.latitude,
//         lng: data.longitude,
//         city: data.city
//       });
      
//       return {
//         success: true,
//         latitude: parseFloat(data.latitude) || 22.7494444,
//         longitude: parseFloat(data.longitude) || 75.8991667,
//         accuracy: 50000, // IP location की accuracy कम होती है
//         source: "ip-api",
//         city: data.city || 'Indore',
//         country: data.country_name || 'India'
//       };
//     }
//   } catch (error) {
//     console.log('❌ IP location failed:', error.message);
//   }

//   // THIRD: Default office location
//   console.log('🏢 Using default office location');
//   return {
//     success: true,
//     latitude: 22.7494444,
//     longitude: 75.8991667,
//     accuracy: 100,
//     source: "default-office",
//     city: "Indore",
//     country: "India"
//   };
// });

// // ✅ NEW: Get location with relaxed rules
// ipcMain.handle('get-relaxed-location', async () => {
//   console.log('📍 Relaxed location request');
  
//   // Try all methods but always return a valid location
//   try {
//     const location = await mainWindow.webContents.executeJavaScript(`
//       new Promise((resolve) => {
//         let locationAttempts = 0;
        
//         function tryGeolocation() {
//           if (!navigator.geolocation) {
//             resolve({
//               success: true,
//               latitude: 22.7494444,
//               longitude: 75.8991667,
//               accuracy: 100,
//               source: "no-gps-fallback"
//             });
//             return;
//           }
          
//           navigator.geolocation.getCurrentPosition(
//             (pos) => {
//               resolve({
//                 success: true,
//                 latitude: pos.coords.latitude,
//                 longitude: pos.coords.longitude,
//                 accuracy: pos.coords.accuracy || 100,
//                 source: "gps-success"
//               });
//             },
//             (error) => {
//               locationAttempts++;
//               if (locationAttempts < 2) {
//                 // Try again with less accuracy
//                 navigator.geolocation.getCurrentPosition(
//                   (pos) => {
//                     resolve({
//                       success: true,
//                       latitude: pos.coords.latitude,
//                       longitude: pos.coords.longitude,
//                       accuracy: pos.coords.accuracy || 200,
//                       source: "gps-low-accuracy"
//                     });
//                   },
//                   () => {
//                     // Final fallback
//                     resolve({
//                       success: true,
//                       latitude: 22.7494444,
//                       longitude: 75.8991667,
//                       accuracy: 500,
//                       source: "final-fallback"
//                     });
//                   },
//                   {
//                     enableHighAccuracy: false,
//                     timeout: 5000
//                   }
//                 );
//               } else {
//                 resolve({
//                   success: true,
//                   latitude: 22.7494444,
//                   longitude: 75.8991667,
//                   accuracy: 500,
//                   source: "multiple-failures"
//                 });
//               }
//             },
//             {
//               enableHighAccuracy: true,
//               timeout: 10000,
//               maximumAge: 0
//             }
//           );
//         }
        
//         tryGeolocation();
//       });
//     `);
    
//     return location;
//   } catch (error) {
//     console.log('❌ All location methods failed, using default');
//     return {
//       success: true,
//       latitude: 22.7494444,
//       longitude: 75.8991667,
//       accuracy: 1000,
//       source: "catch-all-fallback"
//     };
//   }
// });

// // ✅ ACTIVITY TRACKING (NO CHANGES)
// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   const activityInterval = setInterval(() => {
//     if (!isTracking) {
//       clearInterval(activityInterval);
//       return;
//     }
//     checkActivity();
//   }, 5000);

//   console.log('▶️ TRACKING STARTED');
//   return { success: true, intervalId: activityInterval };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`🛑 TRACKING STOPPED: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// function checkActivity() {
//   if (!isTracking) return;

//   const now = Date.now();
//   const pos = screen.getCursorScreenPoint();
//   const idleMs = now - lastActivityTime;

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     if (mainWindow && mainWindow.webContents) {
//       mainWindow.webContents.send('activity-update', {
//         isIdle: false,
//         currentApp: "Active",
//         totalSeconds: now
//       });
//     }
//   } else if (idleMs > 20000) {
//     if (mainWindow && mainWindow.webContents) {
//       mainWindow.webContents.send('activity-update', {
//         isIdle: true,
//         currentApp: "Idle",
//         totalSeconds: now
//       });
//     }
//   }
// }

// // Get current active application
// ipcMain.handle('get-current-app', () => {
//   try {
//     if (process.platform === 'win32') {
//       return { app: "Windows App", platform: "windows" };
//     } else if (process.platform === 'darwin') {
//       return { app: "Mac App", platform: "mac" };
//     } else {
//       return { app: "Linux App", platform: "linux" };
//     }
//   } catch (error) {
//     return { app: "Unknown", error: error.message };
//   }
// });

// // Health check endpoint
// ipcMain.handle('health-check', () => {
//   return {
//     status: 'healthy',
//     timestamp: new Date().toISOString(),
//     tracking: isTracking,
//     uptime: process.uptime(),
//     platform: process.platform
//   };
// });

// // Handle window events
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// // Development flags
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');
// app.commandLine.appendSwitch('remote-debugging-port', '8315');

// app.whenReady().then(() => {
//   createWindow();
//   console.log('⚡ Electron app ready');
// });




// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');
// const { exec } = require('child_process');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;
// let currentApp = 'Unknown';
// let idleThreshold = 20; // 20 seconds idle time
// let appCheckInterval = null;
// let activityInterval = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     show: false,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.focus();
//     console.log('🎯 ACORE EMPLOYEE PORTAL - READY');
//   });

//   // Error handling
//   mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
//     console.error('Load Failed:', errorCode, errorDescription);
//     mainWindow.loadURL('http://localhost:5173');
//   });
// }

// // ✅ Get Active Application (Windows specific)
// function getActiveApplication() {
//   return new Promise((resolve) => {
//     if (process.platform === 'win32') {
//       exec('powershell "(Get-Process | Where-Object {$_.MainWindowTitle -ne \"\"} | Sort-Object MainWindowTitle | Select-Object -First 1).ProcessName"', 
//         (error, stdout) => {
//           if (!error && stdout && stdout.trim()) {
//             const appName = formatAppName(stdout.trim());
//             resolve(appName);
//           } else {
//             resolve('Unknown App');
//           }
//         });
//     } else if (process.platform === 'darwin') {
//       // For macOS
//       exec("osascript -e 'tell application \"System Events\" to get name of first application process whose frontmost is true'", 
//         (error, stdout) => {
//           if (!error && stdout) {
//             resolve(stdout.trim());
//           } else {
//             resolve('Unknown App');
//           }
//         });
//     } else {
//       // Linux
//       exec("xdotool getwindowfocus getwindowname", (error, stdout) => {
//         if (!error && stdout) {
//           resolve(stdout.trim().substring(0, 50));
//         } else {
//           resolve('Unknown App');
//         }
//       });
//     }
//   });
// }

// // Format application name
// function formatAppName(processName) {
//   const appMap = {
//     'code': 'VS Code',
//     'chrome': 'Google Chrome', 
//     'firefox': 'Mozilla Firefox',
//     'msedge': 'Microsoft Edge',
//     'notepad': 'Notepad',
//     'winword': 'Microsoft Word',
//     'excel': 'Microsoft Excel',
//     'powerpnt': 'Microsoft PowerPoint',
//     'outlook': 'Microsoft Outlook',
//     'teams': 'Microsoft Teams',
//     'slack': 'Slack',
//     'discord': 'Discord',
//     'photoshop': 'Adobe Photoshop',
//     'figma': 'Figma',
//     'spotify': 'Spotify',
//     'whatsapp': 'WhatsApp',
//     'telegram': 'Telegram',
//     'androidstudio': 'Android Studio',
//     'pycharm': 'PyCharm',
//     'intellij': 'IntelliJ IDEA',
//     'sublime_text': 'Sublime Text',
//     'atom': 'Atom',
//     'postman': 'Postman',
//     'mysql': 'MySQL',
//     'mongodb': 'MongoDB',
//     'terminal': 'Terminal',
//     'cmd': 'Command Prompt',
//     'powershell': 'PowerShell',
//     'explorer': 'File Explorer',
//     'calculator': 'Calculator',
//     'mspaint': 'Paint',
//     'acrobat': 'Adobe Acrobat',
//     'zoom': 'Zoom',
//     'skype': 'Skype',
//     'vscode': 'VS Code',
//     'devenv': 'Visual Studio',
//     'javaw': 'Java Application',
//     'python': 'Python',
//     'node': 'Node.js',
//     'npm': 'NPM',
//     'docker': 'Docker',
//     'git': 'Git',
//     'github': 'GitHub Desktop'
//   };

//   const lowerName = processName.toLowerCase();
//   return appMap[lowerName] || processName;
// }

// // ✅ Mouse Activity Detection
// function checkMouseActivity() {
//   if (!isTracking) return false;
  
//   const currentPos = screen.getCursorScreenPoint();
//   let moved = false;
  
//   if (lastMousePos) {
//     moved = (currentPos.x !== lastMousePos.x || currentPos.y !== lastMousePos.y);
//   }
  
//   lastMousePos = currentPos;
//   return moved;
// }

// // ✅ Check System Idle Time
// function checkSystemIdle() {
//   if (!isTracking) return false;
  
//   const idleTime = powerMonitor.getSystemIdleTime();
//   const isIdle = idleTime > idleThreshold;
  
//   return isIdle;
// }

// // ✅ Update Activity Status
// function updateActivityStatus() {
//   if (!isTracking || !mainWindow) return;

//   const now = Date.now();
//   const mouseMoved = checkMouseActivity();
//   const isSystemIdle = checkSystemIdle();
  
//   let activityDetected = false;
  
//   // Activity detected if mouse moved OR system is not idle
//   if (mouseMoved || !isSystemIdle) {
//     activityDetected = true;
//     lastActivityTime = now;
//   }
  
//   // Calculate active time (pauses when idle)
//   let currentActiveTime = totalActiveSeconds;
//   if (startTime && !isSystemIdle) {
//     currentActiveTime += Math.floor((now - startTime) / 1000);
//   }
  
//   const idleSeconds = Math.floor((now - lastActivityTime) / 1000);
//   const isIdle = idleSeconds > idleThreshold;
  
//   // Send update to React
//   mainWindow.webContents.send('activity-update', {
//     isTracking: isTracking,
//     isIdle: isIdle,
//     currentApp: currentApp,
//     totalSeconds: currentActiveTime,
//     idleSeconds: idleSeconds,
//     lastActivityTime: lastActivityTime
//   });
  
//   // Log for debugging
//   if (isTracking) {
//     console.log('📊 Activity Status:', {
//       app: currentApp,
//       state: isIdle ? '⏸️ IDLE' : '🎯 ACTIVE',
//       activeTime: `${Math.floor(currentActiveTime / 60)}m ${currentActiveTime % 60}s`,
//       idleFor: `${Math.floor(idleSeconds / 60)}m ${idleSeconds % 60}s`
//     });
//   }
// }

// // ✅ Start Application Tracking
// function startAppTracking() {
//   if (appCheckInterval) clearInterval(appCheckInterval);
  
//   appCheckInterval = setInterval(async () => {
//     if (!isTracking) return;
    
//     try {
//       const newApp = await getActiveApplication();
//       if (newApp !== currentApp) {
//         currentApp = newApp;
//         console.log('💻 Switched to:', currentApp);
        
//         // Update activity time when app changes
//         lastActivityTime = Date.now();
//         updateActivityStatus();
//       }
//     } catch (error) {
//       console.log('⚠️ App detection failed:', error.message);
//     }
//   }, 3000); // Check every 3 seconds
// }

// // ✅ Start Activity Monitoring
// function startActivityMonitoring() {
//   if (activityInterval) clearInterval(activityInterval);
  
//   activityInterval = setInterval(() => {
//     updateActivityStatus();
//   }, 5000); // Update every 5 seconds
// }

// // ✅ Location Handler
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 Location request received');
  
//   try {
//     // Try browser geolocation
//     if (mainWindow && mainWindow.webContents) {
//       const browserLocation = await mainWindow.webContents.executeJavaScript(`
//         new Promise((resolve) => {
//           if (!navigator.geolocation) {
//             resolve({ success: false, error: "Geolocation not available" });
//             return;
//           }
          
//           navigator.geolocation.getCurrentPosition(
//             (pos) => {
//               resolve({
//                 success: true,
//                 latitude: pos.coords.latitude,
//                 longitude: pos.coords.longitude,
//                 accuracy: pos.coords.accuracy || 50,
//                 source: "browser-gps"
//               });
//             },
//             (error) => {
//               // Fallback to IP-based location
//               fetch('https://ipapi.co/json/')
//                 .then(response => response.json())
//                 .then(data => {
//                   resolve({
//                     success: true,
//                     latitude: parseFloat(data.latitude) || 22.7494444,
//                     longitude: parseFloat(data.longitude) || 75.8991667,
//                     accuracy: 50000,
//                     source: "ip-api",
//                     city: data.city || 'Indore'
//                   });
//                 })
//                 .catch(() => {
//                   // Final fallback
//                   resolve({
//                     success: true,
//                     latitude: 22.7494444,
//                     longitude: 75.8991667,
//                     accuracy: 100,
//                     source: "default-office"
//                   });
//                 });
//             },
//             {
//               enableHighAccuracy: true,
//               timeout: 10000,
//               maximumAge: 0
//             }
//           );
//         });
//       `);
      
//       if (browserLocation.success) {
//         return browserLocation;
//       }
//     }
//   } catch (error) {
//     console.log('❌ Browser location failed:', error.message);
//   }
  
//   // Return default location if all fails
//   return {
//     success: true,
//     latitude: 22.7494444,
//     longitude: 75.8991667,
//     accuracy: 100,
//     source: "fallback",
//     city: "Indore",
//     country: "India"
//   };
// });

// // ✅ IPC Handlers
// ipcMain.handle('start-tracking', () => {
//   if (isTracking) return { success: false, message: 'Already tracking' };
  
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();
//   currentApp = 'Starting...';
  
//   // Start tracking
//   startAppTracking();
//   startActivityMonitoring();
  
//   console.log('✅ SYSTEM-WIDE TRACKING STARTED');
//   console.log('🎯 Tracking: Mouse, Keyboard, VS Code, Chrome, Office Apps, etc.');
  
//   // Send initial update
//   updateActivityStatus();
  
//   return { 
//     success: true, 
//     message: 'System-wide tracking activated',
//     features: [
//       'Cross-Application Tracking',
//       'VS Code Monitoring',
//       'Chrome/Firefox Tracking',
//       'Office Apps Detection',
//       'Real Mouse/Keyboard Detection'
//     ]
//   };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (!isTracking) return { success: false, message: 'Not tracking' };
  
//   // Calculate final time
//   if (startTime) {
//     const now = Date.now();
//     const idleTime = powerMonitor.getSystemIdleTime();
//     const isIdle = idleTime > idleThreshold;
    
//     if (!isIdle) {
//       totalActiveSeconds += Math.floor((now - startTime) / 1000);
//     }
//   }
  
//   isTracking = false;
  
//   // Clear intervals
//   if (appCheckInterval) {
//     clearInterval(appCheckInterval);
//     appCheckInterval = null;
//   }
  
//   if (activityInterval) {
//     clearInterval(activityInterval);
//     activityInterval = null;
//   }
  
//   console.log(`🛑 TRACKING STOPPED - Total Active Time: ${totalActiveSeconds} seconds`);
  
//   return { 
//     success: true, 
//     totalSeconds: totalActiveSeconds,
//     message: `Tracking stopped. Total active time: ${Math.floor(totalActiveSeconds / 3600)}h ${Math.floor((totalActiveSeconds % 3600) / 60)}m ${totalActiveSeconds % 60}s`
//   };
// });

// ipcMain.handle('get-tracking-data', () => {
//   const now = Date.now();
//   let currentActiveTime = totalActiveSeconds;
  
//   if (startTime && isTracking) {
//     const idleTime = powerMonitor.getSystemIdleTime();
//     const isIdle = idleTime > idleThreshold;
    
//     if (!isIdle) {
//       currentActiveTime += Math.floor((now - startTime) / 1000);
//     }
//   }
  
//   return {
//     isTracking: isTracking,
//     activeTime: currentActiveTime * 1000, // Convert to milliseconds
//     currentApp: currentApp,
//     isIdle: powerMonitor.getSystemIdleTime() > idleThreshold,
//     lastActivityTime: lastActivityTime,
//     platform: process.platform,
//     trackingLevel: 'SYSTEM-WIDE'
//   };
// });

// ipcMain.handle('report-activity', () => {
//   lastActivityTime = Date.now();
//   return { success: true, message: 'Activity reported manually' };
// });

// // ✅ Health check
// ipcMain.handle('health-check', () => {
//   return {
//     status: 'healthy',
//     timestamp: new Date().toISOString(),
//     tracking: isTracking,
//     uptime: process.uptime(),
//     platform: process.platform,
//     electron: process.versions.electron,
//     chrome: process.versions.chrome
//   };
// });

// // ✅ System power events
// app.on('ready', () => {
//   powerMonitor.on('suspend', () => {
//     console.log('💤 System going to sleep');
//     if (isTracking) {
//       // Mark as idle when system sleeps
//       lastActivityTime = Date.now();
//       updateActivityStatus();
//     }
//   });

//   powerMonitor.on('resume', () => {
//     console.log('💻 System resumed from sleep');
//     if (isTracking) {
//       // Update activity when system wakes up
//       lastActivityTime = Date.now();
//       updateActivityStatus();
//     }
//   });
// });

// // ✅ App event handlers
// app.whenReady().then(() => {
//   // Add flags for geolocation
//   app.commandLine.appendSwitch('enable-geolocation');
//   app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
//   app.commandLine.appendSwitch('allow-running-insecure-content');
  
//   createWindow();
  
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// app.on('window-all-closed', () => {
//   // Clean up
//   if (appCheckInterval) clearInterval(appCheckInterval);
//   if (activityInterval) clearInterval(activityInterval);
  
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// // ✅ Before quitting
// app.on('before-quit', () => {
//   if (appCheckInterval) clearInterval(appCheckInterval);
//   if (activityInterval) clearInterval(activityInterval);
// });






// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');
// const { exec } = require('child_process');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveTime = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;
// let currentApp = 'Unknown';
// let idleThreshold = 30000;
// let appCheckInterval = null;
// let activityInterval = null;
// let isIdle = false;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     show: false,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.focus();
//     console.log('🎯 ACORE EMPLOYEE PORTAL - READY');
//     console.log('📍 Office Location: Vijay Nagar, Indore (22.7494444, 75.8991667)');
//     console.log('⏱️  Idle Threshold: 30 seconds');
//   });
// }

// function getActiveApplication() {
//   return new Promise((resolve) => {
//     if (process.platform === 'win32') {
//       exec('powershell "(Get-Process | Where-Object {$_.MainWindowTitle -ne \"\"} | Sort-Object MainWindowTitle | Select-Object -First 1).ProcessName"', 
//         (error, stdout) => {
//           if (!error && stdout && stdout.trim()) {
//             const appName = formatAppName(stdout.trim());
//             resolve(appName);
//           } else {
//             resolve('Windows App');
//           }
//         });
//     } else if (process.platform === 'darwin') {
//       exec("osascript -e 'tell application \"System Events\" to get name of first application process whose frontmost is true'", 
//         (error, stdout) => {
//           if (!error && stdout) {
//             resolve(stdout.trim());
//           } else {
//             resolve('macOS App');
//           }
//         });
//     } else {
//       exec("xdotool getwindowfocus getwindowname 2>/dev/null || echo 'Linux App'", 
//         (error, stdout) => {
//           if (!error && stdout) {
//             resolve(stdout.trim().substring(0, 50));
//           } else {
//             resolve('Linux App');
//           }
//         });
//     }
//   });
// }

// function formatAppName(processName) {
//   const appMap = {
//     'code': 'VS Code',
//     'chrome': 'Google Chrome', 
//     'firefox': 'Mozilla Firefox',
//     'msedge': 'Microsoft Edge',
//     'notepad': 'Notepad',
//     'winword': 'Microsoft Word',
//     'excel': 'Microsoft Excel',
//     'powerpnt': 'Microsoft PowerPoint',
//     'outlook': 'Microsoft Outlook',
//     'teams': 'Microsoft Teams',
//     'slack': 'Slack',
//     'discord': 'Discord',
//     'photoshop': 'Adobe Photoshop',
//     'figma': 'Figma',
//     'spotify': 'Spotify',
//     'whatsapp': 'WhatsApp',
//     'telegram': 'Telegram',
//     'androidstudio': 'Android Studio',
//     'pycharm': 'PyCharm',
//     'intellij': 'IntelliJ IDEA',
//     'sublime_text': 'Sublime Text',
//     'atom': 'Atom',
//     'postman': 'Postman',
//     'mysql': 'MySQL',
//     'mongodb': 'MongoDB',
//     'terminal': 'Terminal',
//     'cmd': 'Command Prompt',
//     'powershell': 'PowerShell',
//     'explorer': 'File Explorer',
//     'calculator': 'Calculator',
//     'mspaint': 'Paint',
//     'acrobat': 'Adobe Acrobat',
//     'zoom': 'Zoom',
//     'skype': 'Skype',
//     'vscode': 'VS Code',
//     'devenv': 'Visual Studio',
//     'javaw': 'Java Application',
//     'python': 'Python',
//     'node': 'Node.js',
//     'npm': 'NPM',
//     'docker': 'Docker',
//     'git': 'Git',
//     'github': 'GitHub Desktop',
//     'brave': 'Brave Browser',
//     'opera': 'Opera',
//     'safari': 'Safari',
//     'thunderbird': 'Thunderbird',
//     'libreoffice': 'LibreOffice'
//   };

//   const lowerName = processName.toLowerCase().replace('.exe', '').replace('.app', '');
//   return appMap[lowerName] || processName;
// }

// function checkMouseActivity() {
//   if (!isTracking) return false;
  
//   try {
//     const currentPos = screen.getCursorScreenPoint();
//     let moved = false;
    
//     if (lastMousePos) {
//       moved = (Math.abs(currentPos.x - lastMousePos.x) > 1 || Math.abs(currentPos.y - lastMousePos.y) > 1);
//     }
    
//     lastMousePos = currentPos;
//     return moved;
//   } catch (error) {
//     return false;
//   }
// }

// function checkSystemIdle() {
//   if (!isTracking) return false;
  
//   try {
//     const idleTime = powerMonitor.getSystemIdleTime() * 1000;
//     const isSystemIdle = idleTime > idleThreshold;
//     return isSystemIdle;
//   } catch (error) {
//     return false;
//   }
// }

// function updateActivityStatus() {
//   if (!isTracking || !mainWindow) return;

//   const now = Date.now();
//   const mouseMoved = checkMouseActivity();
//   const isSystemIdle = checkSystemIdle();
  
//   const activityDetected = mouseMoved || !isSystemIdle;
  
//   if (activityDetected) {
//     if (isIdle) {
//       console.log('🎯 ACTIVITY DETECTED - Timer RESUMED');
//       isIdle = false;
//     }
//     lastActivityTime = now;
//   } else {
//     const timeSinceLastActivity = now - lastActivityTime;
//     if (!isIdle && timeSinceLastActivity > idleThreshold) {
//       console.log('⏸️ NO ACTIVITY for 30s - Timer PAUSED');
//       isIdle = true;
//     }
//   }
  
//   let currentActiveTime = totalActiveTime;
//   if (startTime && !isIdle) {
//     currentActiveTime += (now - startTime);
//   }
  
//   const idleSeconds = Math.floor((now - lastActivityTime) / 1000);
  
//   mainWindow.webContents.send('activity-update', {
//     isTracking: isTracking,
//     isIdle: isIdle,
//     currentApp: currentApp,
//     activeTime: currentActiveTime,
//     idleSeconds: idleSeconds,
//     lastActivityTime: lastActivityTime
//   });
// }

// function startAppTracking() {
//   if (appCheckInterval) clearInterval(appCheckInterval);
  
//   appCheckInterval = setInterval(async () => {
//     if (!isTracking) return;
    
//     try {
//       const newApp = await getActiveApplication();
//       if (newApp !== currentApp) {
//         currentApp = newApp;
//         lastActivityTime = Date.now();
//         isIdle = false;
//         updateActivityStatus();
//       }
//     } catch (error) {}
//   }, 2000);
// }

// function startActivityMonitoring() {
//   if (activityInterval) clearInterval(activityInterval);
  
//   activityInterval = setInterval(() => {
//     updateActivityStatus();
//   }, 1000);
// }

// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 Returning office location');
//   return {
//     success: true,
//     latitude: 22.7494444,
//     longitude: 75.8991667,
//     accuracy: 10,
//     source: "office-default",
//     city: "Indore",
//     country: "India",
//     address: "Vijay Nagar, Indore, MP"
//   };
// });

// ipcMain.handle('start-tracking', () => {
//   if (isTracking) return { success: false, message: 'Already tracking' };
  
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveTime = 0;
//   lastMousePos = screen.getCursorScreenPoint();
//   isIdle = false;
  
//   getActiveApplication().then(app => {
//     currentApp = app;
//   });
  
//   startAppTracking();
//   startActivityMonitoring();
  
//   console.log('✅ SYSTEM-WIDE TRACKING STARTED');
  
//   updateActivityStatus();
  
//   return { 
//     success: true, 
//     message: 'System-wide tracking activated'
//   };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (!isTracking) return { success: false, message: 'Not tracking' };
  
//   if (startTime && !isIdle) {
//     totalActiveTime += (Date.now() - startTime);
//   }
  
//   isTracking = false;
  
//   if (appCheckInterval) {
//     clearInterval(appCheckInterval);
//     appCheckInterval = null;
//   }
  
//   if (activityInterval) {
//     clearInterval(activityInterval);
//     activityInterval = null;
//   }
  
//   const totalHours = totalActiveTime / 3600000;
//   console.log(`🛑 TRACKING STOPPED - Total Active Time: ${totalHours.toFixed(2)} hours`);
  
//   return { 
//     success: true, 
//     activeTime: totalActiveTime
//   };
// });

// ipcMain.handle('get-tracking-data', () => {
//   let currentActiveTime = totalActiveTime;
  
//   if (startTime && isTracking && !isIdle) {
//     currentActiveTime += (Date.now() - startTime);
//   }
  
//   return {
//     isTracking: isTracking,
//     activeTime: currentActiveTime,
//     currentApp: currentApp,
//     isIdle: isIdle,
//     lastActivityTime: lastActivityTime,
//     platform: process.platform
//   };
// });

// ipcMain.handle('report-activity', () => {
//   lastActivityTime = Date.now();
//   isIdle = false;
//   return { success: true, message: 'Activity reported manually' };
// });

// ipcMain.handle('health-check', () => {
//   return {
//     status: 'healthy',
//     timestamp: new Date().toISOString(),
//     tracking: isTracking,
//     uptime: process.uptime(),
//     platform: process.platform
//   };
// });

// app.on('ready', () => {
//   powerMonitor.on('suspend', () => {
//     if (isTracking) {
//       isIdle = true;
//       updateActivityStatus();
//     }
//   });

//   powerMonitor.on('resume', () => {
//     if (isTracking) {
//       lastActivityTime = Date.now();
//       isIdle = false;
//       updateActivityStatus();
//     }
//   });
// });

// app.whenReady().then(() => {
//   app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
//   app.commandLine.appendSwitch('allow-running-insecure-content');
  
//   createWindow();
  
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// app.on('window-all-closed', () => {
//   if (appCheckInterval) clearInterval(appCheckInterval);
//   if (activityInterval) clearInterval(activityInterval);
  
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('before-quit', () => {
//   if (appCheckInterval) clearInterval(appCheckInterval);
//   if (activityInterval) clearInterval(activityInterval);
// });






// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       // ✅ MUST BE FALSE FOR LOCALHOST
//       webSecurity: false
//     }
//   });

//   // ✅ FIX PERMISSION ERRORS
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     // Allow all necessary permissions
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   // ✅ FIX CSP ERRORS - Modify response headers
//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://ipapi.co https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     // Optional: Comment out in production
//     // mainWindow.webContents.openDevTools({ mode: 'detach' });
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ✅ SIMPLIFIED & RELIABLE Location Function
// ipcMain.handle('get-current-location', async () => {
//   return new Promise((resolve) => {
//     if (!mainWindow) {
//       resolve({
//         success: true,
//         latitude: 22.7494444,
//         longitude: 75.8991667,
//         accuracy: 100000,
//         source: 'window-not-ready'
//       });
//       return;
//     }

//     mainWindow.webContents.executeJavaScript(`
//       new Promise((resolve) => {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => resolve({
//               success: true,
//               latitude: pos.coords.latitude,
//               longitude: pos.coords.longitude,
//               accuracy: pos.coords.accuracy,
//               source: 'gps'
//             }),
//             () => {
//               fetch('https://ipapi.co/json/')
//                 .then(r => r.json())
//                 .then(data => resolve({
//                   success: true,
//                   latitude: data.latitude || 22.7494444,
//                   longitude: data.longitude || 75.8991667,
//                   accuracy: 50000,
//                   source: 'ip'
//                 }))
//                 .catch(() => resolve({
//                   success: true,
//                   latitude: 22.7494444,
//                   longitude: 75.8991667,
//                   accuracy: 100000,
//                   source: 'fallback'
//                 }));
//             },
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         } else {
//           resolve({
//             success: true,
//             latitude: 22.7494444,
//             longitude: 75.8991667,
//             accuracy: 100000,
//             source: 'no-api'
//           });
//         }
//       })
//     `).then(resolve).catch(() => {
//       resolve({
//         success: true,
//         latitude: 22.7494444,
//         longitude: 75.8991667,
//         accuracy: 100000,
//         source: 'js-error-fallback'
//       });
//     });
//   });
// });

// // ✅ Existing Activity Tracking (Unchanged)
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason, `${current}s`);
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log(`🛑 PUNCH OUT - Total Time: ${totalActiveSeconds}s`);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// // ✅ FIX: Add these flags BEFORE app.whenReady()
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });


// api key ading




// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }


// // ================= GOOGLE + ELECTRON LOCATION ===================
// ipcMain.handle('get-current-location', async () => {
//   return new Promise((resolve) => {
//     if (!mainWindow) {
//       resolve({
//         success: true,
//         latitude: 22.7494444,
//         longitude: 75.8991667,
//         accuracy: 100000,
//         source: 'window-not-ready'
//       });
//       return;
//     }

//     mainWindow.webContents.executeJavaScript(`
//       new Promise((resolve) => {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (pos) => resolve({
//               success: true,
//               latitude: pos.coords.latitude,
//               longitude: pos.coords.longitude,
//               accuracy: pos.coords.accuracy,
//               source: 'gps'
//             }),
//             () => {
              
//               // ================= GOOGLE FALLBACK ===================
//               fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBqTGBtJYtoRpvJFpF6tls1jcwlbiNcEVI", {
//                 method: "POST"
//               })
//               .then(r => r.json())
//               .then(data => resolve({
//                 success: true,
//                 latitude: data?.location?.lat || 22.7494444,
//                 longitude: data?.location?.lng || 75.8991667,
//                 accuracy: data?.accuracy || 80,
//                 source: "google"
//               }))
//               .catch(() => resolve({
//                 success: true,
//                 latitude: 22.7494444,
//                 longitude: 75.8991667,
//                 accuracy: 100000,
//                 source: "google-fallback"
//               }));

//             },
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         } else {
//           resolve({
//             success: true,
//             latitude: 22.7494444,
//             longitude: 75.8991667,
//             accuracy: 100000,
//             source: 'no-api'
//           });
//         }
//       })
//     `).then(resolve).catch(() => {
//       resolve({
//         success: true,
//         latitude: 22.7494444,
//         longitude: 75.8991667,
//         accuracy: 100000,
//         source: 'js-error-fallback'
//       });
//     });
//   });
// });


// // ================= ACTIVITY TRACKING (UNCHANGED) ===================
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason, current + 's');
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log('🛑 PUNCH OUT - Total Time:', totalActiveSeconds);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });























// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ================= IMPROVED GOOGLE LOCATION API ===================
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 get-current-location called');
  
//   return new Promise(async (resolve) => {
//     const GOOGLE_API_KEY = 'AIzaSyBqTGBtJYtoRpvJFpF6tls1jcwlbiNcEVI'; // 🔴 यहाँ अपनी REAL KEY डालें
    
//     try {
//       // 1. FIRST: Try Google Geolocation API directly
//       console.log('🔄 Trying Google Geolocation API...');
      
//       const googleResponse = await fetch(
//         `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, 
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({}) // Empty body for basic request
//         }
//       );
      
//       if (!googleResponse.ok) {
//         throw new Error(`Google API error: ${googleResponse.status}`);
//       }
      
//       const googleData = await googleResponse.json();
//       console.log('📊 Google API Response:', googleData);
      
//       if (googleData && googleData.location && googleData.location.lat) {
//         console.log('✅ Google API Success!');
//         resolve({
//           success: true,
//           latitude: googleData.location.lat,
//           longitude: googleData.location.lng,
//           accuracy: googleData.accuracy || 50,
//           source: 'google-api',
//           timestamp: Date.now()
//         });
//         return;
//       }
//     } catch (googleError) {
//       console.log('❌ Google API Failed:', googleError.message);
//     }
    
//     // 2. SECOND: Try browser geolocation as fallback
//     try {
//       if (mainWindow) {
//         console.log('🌐 Trying Browser Geolocation as fallback...');
        
//         const browserLocation = await mainWindow.webContents.executeJavaScript(`
//           new Promise((resolveBrowser) => {
//             if (!navigator.geolocation) {
//               resolveBrowser(null);
//               return;
//             }
            
//             navigator.geolocation.getCurrentPosition(
//               (pos) => {
//                 resolveBrowser({
//                   success: true,
//                   latitude: pos.coords.latitude,
//                   longitude: pos.coords.longitude,
//                   accuracy: pos.coords.accuracy,
//                   source: 'browser-geo'
//                 });
//               },
//               (err) => {
//                 console.log('Browser geolocation error:', err.code, err.message);
//                 resolveBrowser(null);
//               },
//               {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 0
//               }
//             );
//           })
//         `);
        
//         if (browserLocation && browserLocation.success) {
//           console.log('✅ Browser Geolocation Success!');
//           resolve(browserLocation);
//           return;
//         }
//       }
//     } catch (browserError) {
//       console.log('❌ Browser Geolocation Failed:', browserError.message);
//     }
    
//     // 3. THIRD: IP-based geolocation fallback
//     try {
//       console.log('🌍 Trying IP-based geolocation...');
      
//       const ipResponse = await fetch('https://ipapi.co/json/', { timeout: 5000 });
//       if (ipResponse.ok) {
//         const ipData = await ipResponse.json();
//         if (ipData.latitude && ipData.longitude) {
//           console.log('✅ IP Geolocation Success!');
//           resolve({
//             success: true,
//             latitude: ipData.latitude,
//             longitude: ipData.longitude,
//             accuracy: 50000, // IP-based is less accurate
//             source: 'ip-geolocation',
//             city: ipData.city,
//             region: ipData.region
//           });
//           return;
//         }
//       }
//     } catch (ipError) {
//       console.log('❌ IP Geolocation Failed:', ipError.message);
//     }
    
//     // 4. FINAL: Default office location (LAST RESORT)
//     console.log('🏢 Using default office location');
//     resolve({
//       success: true,
//       latitude: 22.7494444,  // Vijay Nagar, Indore
//       longitude: 75.8991667,
//       accuracy: 100000, // Very low accuracy
//       source: 'default-office',
//       note: 'All location methods failed'
//     });
//   });
// });

// // ================= ACTIVITY TRACKING ===================
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason, current + 's');
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log('🛑 PUNCH OUT - Total Time:', totalActiveSeconds);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });




// ye vala main js working he isek niche me copy kar raha hu agar kuchh bhi change honge to ham yaha se uske shi kar lenge 


//  proper working code he location ko chhod kar 






















// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ================= IMPROVED GOOGLE LOCATION API ===================
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 get-current-location called');
  
//   return new Promise(async (resolve) => {
//     const GOOGLE_API_KEY = 'AIzaSyBqTGBtJYtoRpvJFpF6tls1jcwlbiNcEVI'; // 🔴 यहाँ अपनी REAL KEY डालें
    
//     try {
//       // 1. FIRST: Try Google Geolocation API directly
//       console.log('🔄 Trying Google Geolocation API...');
      
//       const googleResponse = await fetch(
//         `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, 
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({}) // Empty body for basic request
//         }
//       );
      
//       if (!googleResponse.ok) {
//         throw new Error(`Google API error: ${googleResponse.status}`);
//       }
      
//       const googleData = await googleResponse.json();
//       console.log('📊 Google API Response:', googleData);
      
//       if (googleData && googleData.location && googleData.location.lat) {
//         console.log('✅ Google API Success!');
//         resolve({
//           success: true,
//           latitude: googleData.location.lat,
//           longitude: googleData.location.lng,
//           accuracy: googleData.accuracy || 50,
//           source: 'google-api',
//           timestamp: Date.now()
//         });
//         return;
//       }
//     } catch (googleError) {
//       console.log('❌ Google API Failed:', googleError.message);
//     }
    
//     // 2. SECOND: Try browser geolocation as fallback
//     try {
//       if (mainWindow) {
//         console.log('🌐 Trying Browser Geolocation as fallback...');
        
//         const browserLocation = await mainWindow.webContents.executeJavaScript(`
//           new Promise((resolveBrowser) => {
//             if (!navigator.geolocation) {
//               resolveBrowser(null);
//               return;
//             }
            
//             navigator.geolocation.getCurrentPosition(
//               (pos) => {
//                 resolveBrowser({
//                   success: true,
//                   latitude: pos.coords.latitude,
//                   longitude: pos.coords.longitude,
//                   accuracy: pos.coords.accuracy,
//                   source: 'browser-geo'
//                 });
//               },
//               (err) => {
//                 console.log('Browser geolocation error:', err.code, err.message);
//                 resolveBrowser(null);
//               },
//               {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 0
//               }
//             );
//           })
//         `);
        
//         if (browserLocation && browserLocation.success) {
//           console.log('✅ Browser Geolocation Success!');
//           resolve(browserLocation);
//           return;
//         }
//       }
//     } catch (browserError) {
//       console.log('❌ Browser Geolocation Failed:', browserError.message);
//     }
    
//     // 3. THIRD: IP-based geolocation fallback
//     try {
//       console.log('🌍 Trying IP-based geolocation...');
      
//       const ipResponse = await fetch('https://ipapi.co/json/', { timeout: 5000 });
//       if (ipResponse.ok) {
//         const ipData = await ipResponse.json();
//         if (ipData.latitude && ipData.longitude) {
//           console.log('✅ IP Geolocation Success!');
//           resolve({
//             success: true,
//             latitude: ipData.latitude,
//             longitude: ipData.longitude,
//             accuracy: 50000, // IP-based is less accurate
//             source: 'ip-geolocation',
//             city: ipData.city,
//             region: ipData.region
//           });
//           return;
//         }
//       }
//     } catch (ipError) {
//       console.log('❌ IP Geolocation Failed:', ipError.message);
//     }
    
//     // 4. FINAL: Default office location (LAST RESORT)
//     console.log('🏢 Using default office location');
//     resolve({
//       success: true,
//       latitude: 22.7494444,  // Vijay Nagar, Indore
//       longitude: 75.8991667,
//       accuracy: 100000, // Very low accuracy
//       source: 'default-office',
//       note: 'All location methods failed'
//     });
//   });
// });

// // ================= ACTIVITY TRACKING ===================
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason, current + 's');
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log('🛑 PUNCH OUT - Total Time:', totalActiveSeconds);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });



// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');
// const fetch = require('node-fetch');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   // Set permission handler
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   // Load your React app
//   mainWindow.loadURL('http://localhost:5173');

//   // Set CSP headers
//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://*.googleapis.com https://ipapi.co"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });

//   // Open DevTools in development
//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.webContents.openDevTools();
//   }
// }

// // ================= SIMPLIFIED LOCATION API ===================
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 [MAIN] get-current-location called');
  
//   const GOOGLE_API_KEY = 'AIzaSyBqTGBtJYtoRpvJFpF6tls1jcwlbiNcEVI';
  
//   try {
//     // 1. FIRST TRY: Google Geolocation API (Direct call - NO BrowserWindow)
//     console.log('🔄 [MAIN] Trying Google Geolocation API...');
    
//     const googleResponse = await fetch(
//       `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, 
//       {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({}),
//         timeout: 10000
//       }
//     );
    
//     if (googleResponse.ok) {
//       const googleData = await googleResponse.json();
//       console.log('📊 [MAIN] Google API Response:', googleData);
      
//       if (googleData && googleData.location && googleData.location.lat) {
//         console.log('✅ [MAIN] Google API Success!');
//         return {
//           success: true,
//           latitude: googleData.location.lat,
//           longitude: googleData.location.lng,
//           accuracy: googleData.accuracy || 50,
//           source: 'google-api',
//           timestamp: Date.now()
//         };
//       }
//     } else {
//       console.log(`❌ [MAIN] Google API Error: ${googleResponse.status}`);
//     }
//   } catch (googleError) {
//     console.log('❌ [MAIN] Google API Failed:', googleError.message);
//   }
  
//   try {
//     // 2. SECOND TRY: IP-based geolocation (Direct call - NO BrowserWindow)
//     console.log('🌍 [MAIN] Trying IP-based geolocation...');
    
//     const ipResponse = await fetch('https://ipapi.co/json/', { 
//       timeout: 5000 
//     });
    
//     if (ipResponse.ok) {
//       const ipData = await ipResponse.json();
//       console.log('📊 [MAIN] IP API Response:', ipData);
      
//       if (ipData.latitude && ipData.longitude) {
//         console.log('✅ [MAIN] IP Geolocation Success!');
//         return {
//           success: true,
//           latitude: ipData.latitude,
//           longitude: ipData.longitude,
//           accuracy: 50000, // IP-based is less accurate
//           source: 'ip-geolocation',
//           city: ipData.city,
//           region: ipData.region,
//           country: ipData.country_name
//         };
//       }
//     } else {
//       console.log(`❌ [MAIN] IP API Error: ${ipResponse.status}`);
//     }
//   } catch (ipError) {
//     console.log('❌ [MAIN] IP Geolocation Failed:', ipError.message);
//   }
  
//   // 3. FINAL FALLBACK: Default office location
//   console.log('🏢 [MAIN] Using default office location (Vijay Nagar, Indore)');
//   return {
//     success: true,
//     latitude: 22.7494444,  // Vijay Nagar, Indore
//     longitude: 75.8991667,
//     accuracy: 100000, // Very low accuracy
//     source: 'default-office',
//     note: 'All location methods failed, using office coordinates'
//   };
// });

// // ================= ACTIVITY TRACKING ===================
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow || !mainWindow.webContents) return;
  
//   try {
//     const current = isTracking ? totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000) : totalActiveSeconds;

//     mainWindow.webContents.send('activity-update', {
//       isIdle,
//       currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//       totalSeconds: current,
//       reason
//     });

//     console.log(`📊 [TRACKING] ${isIdle ? '⏸️ IDLE' : '▶️ ACTIVE'} - ${reason} (${current}s)`);
//   } catch (error) {
//     console.error('❌ [TRACKING] Error sending update:', error);
//   }
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   // Check mouse movement
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // Check keyboard activity (system idle time)
//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) { // 20 seconds idle threshold
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   console.log('▶️ [TRACKING] Starting activity tracking...');
  
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   // Start activity checking interval
//   const activityInterval = setInterval(checkActivity, 5000);
  
//   // Store interval ID for cleanup
//   mainWindow.__activityInterval = activityInterval;

//   console.log('✅ [TRACKING] TRACKING STARTED');
//   sendUpdate(false, 'Punch In - Tracking Started');
  
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   console.log('🛑 [TRACKING] Stopping activity tracking...');
  
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
  
//   // Clear activity interval
//   if (mainWindow.__activityInterval) {
//     clearInterval(mainWindow.__activityInterval);
//     delete mainWindow.__activityInterval;
//   }
  
//   isTracking = false;
  
//   console.log(`📊 [TRACKING] PUNCH OUT - Total Time: ${totalActiveSeconds} seconds`);
  
//   return { 
//     success: true, 
//     totalSeconds: totalActiveSeconds 
//   };
// });

// // ================= APP LIFECYCLE ===================
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 [APP] Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   console.log('👋 [APP] All windows closed');
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   console.log('🎯 [APP] App activated');
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// // ================= CLEANUP ON QUIT ===================
// app.on('before-quit', () => {
//   console.log('🧹 [APP] Cleaning up before quit...');
  
//   // Clear any intervals
//   if (mainWindow && mainWindow.__activityInterval) {
//     clearInterval(mainWindow.__activityInterval);
//   }
  
//   isTracking = false;
// });



// counter missing he bhai 




// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');
// const fetch = require('node-fetch');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;
// let activityInterval = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   // Permissions
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     if (permission === 'geolocation' || permission === 'notifications') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   // CSP Headers
//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:* ws://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: file: *",
//           "connect-src 'self' http://localhost:* https://localhost:* ws://localhost:* https://*.googleapis.com https://ipapi.co",
//           "font-src 'self' data:"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.loadURL('http://localhost:5173');
  
//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('🚀 ACORE EMPLOYEE PORTAL - READY');
//   });

//   // DevTools
//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.webContents.openDevTools();
//   }
// }

// // ================= LOCATION API =================
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 get-current-location called');
  
//   const GOOGLE_API_KEY = 'AIzaSyBqTGBtJYtoRpvJFpF6tls1jcwlbiNcEVI';
  
//   try {
//     // Try Google API
//     const googleResponse = await fetch(
//       `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, 
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({}),
//         timeout: 10000
//       }
//     );
    
//     if (googleResponse.ok) {
//       const googleData = await googleResponse.json();
//       if (googleData?.location?.lat) {
//         console.log('✅ Google API Success');
//         return {
//           success: true,
//           latitude: googleData.location.lat,
//           longitude: googleData.location.lng,
//           accuracy: googleData.accuracy || 50,
//           source: 'google-api',
//           timestamp: Date.now()
//         };
//       }
//     }
//   } catch (error) {
//     console.log('❌ Google API Failed:', error.message);
//   }
  
//   // Fallback: Office location
//   console.log('🏢 Using default office location');
//   return {
//     success: true,
//     latitude: 22.7494444,
//     longitude: 75.8991667,
//     accuracy: 100000,
//     source: 'default-office',
//     note: 'Using office coordinates'
//   };
// });

// // ================= ACTIVITY TRACKING =================
// const sendActivityUpdate = (isIdle, reason = '') => {
//   if (!mainWindow || !mainWindow.webContents) return;
  
//   const current = isTracking ? totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000) : totalActiveSeconds;
  
//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : getActiveWindowTitle(),
//     totalSeconds: current,
//     reason
//   });

//   console.log(`📊 ${isIdle ? '⏸️ IDLE' : '▶️ ACTIVE'} - ${reason}`);
// };




// // Get active window title (simplified)
// function getActiveWindowTitle() {
//   return 'Desktop App'; // In production, use active-win package
// }

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   // Mouse movement
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // Keyboard activity
//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendActivityUpdate(false, reason);
//   } else if (idleMs > 30000) { // 30 seconds idle
//     sendActivityUpdate(true, 'No Activity for 30 Seconds');
//   }
// };

// // Start tracking
// ipcMain.handle('start-tracking', () => {
//   console.log('▶️ Starting activity tracking...');
  
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   // Check activity every 5 seconds
//   activityInterval = setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendActivityUpdate(false, 'Punch In - Tracking Started');
  
//   return { success: true };
// });

// // Stop tracking
// ipcMain.handle('stop-tracking', () => {
//   console.log('🛑 Stopping activity tracking...');
  
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
  
//   // Clear interval
//   if (activityInterval) {
//     clearInterval(activityInterval);
//     activityInterval = null;
//   }
  
//   isTracking = false;
  
//   console.log(`📊 PUNCH OUT - Total Time: ${totalActiveSeconds} seconds`);
  
//   return { 
//     success: true, 
//     totalSeconds: totalActiveSeconds 
//   };
// });

// // ================= APP LIFECYCLE =================
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });

// app.on('before-quit', () => {
//   console.log('🧹 Cleaning up before quit...');
//   if (activityInterval) clearInterval(activityInterval);
//   isTracking = false;
// });






// // main.js - SIMPLE & WORKING VERSION
// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;
// let activityInterval = null;
// let idleTimeout = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   // Permissions
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     if (permission === 'geolocation') {
//       console.log('✅ Granting geolocation permission');
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   // Load your React app
//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('🚀 ACORE EMPLOYEE PORTAL - READY');
//   });

//   // DevTools in development
//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.webContents.openDevTools();
//   }
// }

// // ================= SIMPLE LOCATION API =================
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 get-current-location called in main process');
  
//   return new Promise((resolve) => {
//     // Use browser's geolocation API directly
//     if (!mainWindow) {
//       console.log('❌ Main window not ready');
//       resolve(getDefaultLocation());
//       return;
//     }

//     // Execute JavaScript in the renderer to get location
//     mainWindow.webContents.executeJavaScript(`
//       new Promise((resolveGeolocation) => {
//         console.log('🌐 Getting location from browser...');
        
//         if (!navigator.geolocation) {
//           console.log('❌ Geolocation not supported');
//           resolveGeolocation({
//             success: false,
//             error: 'Geolocation not supported'
//           });
//           return;
//         }
        
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             console.log('✅ Browser location success:', position.coords);
//             resolveGeolocation({
//               success: true,
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//               accuracy: position.coords.accuracy || 100,
//               source: 'browser-geolocation',
//               timestamp: Date.now()
//             });
//           },
//           (error) => {
//             console.log('❌ Browser location error:', error.message);
            
//             // Try fallback to IP-based location
//             fetch('https://ipapi.co/json/')
//               .then(response => response.json())
//               .then(ipData => {
//                 if (ipData.latitude && ipData.longitude) {
//                   console.log('✅ IP location success');
//                   resolveGeolocation({
//                     success: true,
//                     latitude: ipData.latitude,
//                     longitude: ipData.longitude,
//                     accuracy: 50000, // Less accurate
//                     source: 'ip-location',
//                     city: ipData.city,
//                     country: ipData.country_name
//                   });
//                 } else {
//                   resolveGeolocation({
//                     success: false,
//                     error: 'Location not available'
//                   });
//                 }
//               })
//               .catch(ipError => {
//                 console.log('❌ IP location failed:', ipError);
//                 resolveGeolocation(getDefaultLocation());
//               });
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 10000,
//             maximumAge: 0
//           }
//         );
//       })
//     `).then(resolve).catch((error) => {
//       console.log('❌ Location JavaScript error:', error);
//       resolve(getDefaultLocation());
//     });
//   });
// });

// // Default office location
// function getDefaultLocation() {
//   console.log('🏢 Using default office location');
//   return {
//     success: true,
//     latitude: 22.7494444,  // Vijay Nagar, Indore
//     longitude: 75.8991667,
//     accuracy: 100000,
//     source: 'default-office',
//     note: 'Using fixed office coordinates'
//   };
// }

// // ================= ACTIVITY TRACKING =================
// const sendActivityUpdate = (isIdle, reason = '') => {
//   if (!mainWindow || !mainWindow.webContents) return;
  
//   const current = isTracking ? totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000) : totalActiveSeconds;
  
//   const hours = Math.floor(current / 3600);
//   const minutes = Math.floor((current % 3600) / 60);
//   const seconds = current % 60;
//   const timeString = `${hours}h ${minutes}m`;
  
//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : getActiveWindowTitle(),
//     totalSeconds: current,
//     formattedTime: timeString,
//     reason
//   });

//   console.log(`📊 ${isIdle ? '⏸️ IDLE' : '▶️ ACTIVE'} - ${reason} (${timeString})`);
// };

// // Get active window title (simplified)
// function getActiveWindowTitle() {
//   return 'Desktop App';
// }

// // Check for activity
// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();
//   const systemIdleTime = powerMonitor.getSystemIdleTime();

//   let activityDetected = false;
//   let reason = '';

//   // 1. Check mouse movement (even 1 pixel)
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // 2. Check keyboard activity (system idle time)
//   if (systemIdleTime < 5) { // Less than 5 seconds idle
//     activityDetected = true;
//     reason = reason || 'Keyboard Activity';
//   }

//   // 3. Check if user resumed from idle
//   if (activityDetected) {
//     // Clear any idle timeout
//     if (idleTimeout) {
//       clearTimeout(idleTimeout);
//       idleTimeout = null;
//     }
    
//     // If was idle, send resume update
//     if (idleMs > 30000) {
//       console.log('🎯 Activity resumed after idle');
//       sendActivityUpdate(false, 'Resumed from idle');
//     }
    
//     lastActivityTime = now;
//   } 
//   // 4. Check if idle for 30 seconds
//   else if (idleMs > 30000) {
//     if (!idleTimeout) {
//       console.log('⏸️ User idle for 30 seconds');
//       sendActivityUpdate(true, 'No activity for 30 seconds');
      
//       // Set timeout to keep checking
//       idleTimeout = setTimeout(() => {
//         // Just keep logging idle status
//         if (isTracking && (Date.now() - lastActivityTime) > 30000) {
//           console.log('💤 Still idle...');
//         }
//       }, 10000);
//     }
//   }
// };

// // Start tracking
// ipcMain.handle('start-tracking', () => {
//   console.log('▶️ Starting activity tracking...');
  
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   // Start checking activity every 3 seconds
//   activityInterval = setInterval(checkActivity, 3000);

//   console.log('✅ TRACKING STARTED');
//   sendActivityUpdate(false, 'Tracking Started');
  
//   return { success: true };
// });

// // Stop tracking
// ipcMain.handle('stop-tracking', () => {
//   console.log('🛑 Stopping activity tracking...');
  
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
  
//   // Clear all intervals
//   if (activityInterval) {
//     clearInterval(activityInterval);
//     activityInterval = null;
//   }
  
//   if (idleTimeout) {
//     clearTimeout(idleTimeout);
//     idleTimeout = null;
//   }
  
//   isTracking = false;
  
//   const finalTime = totalActiveSeconds;
//   const hours = Math.floor(finalTime / 3600);
//   const minutes = Math.floor((finalTime % 3600) / 60);
  
//   console.log(`📊 PUNCH OUT - Total Time: ${hours}h ${minutes}m (${finalTime} seconds)`);
  
//   // Send final update
//   if (mainWindow && mainWindow.webContents) {
//     mainWindow.webContents.send('activity-update', {
//       isIdle: false,
//       currentApp: 'Tracking Stopped',
//       totalSeconds: finalTime,
//       formattedTime: `${hours}h ${minutes}m`,
//       reason: 'Punch Out'
//     });
//   }
  
//   return { 
//     success: true, 
//     totalSeconds: totalActiveSeconds,
//     formattedTime: `${hours}h ${minutes}m`
//   };
// });

// // ================= APP LIFECYCLE =================
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// app.on('before-quit', () => {
//   console.log('🧹 Cleaning up before quit...');
  
//   if (activityInterval) clearInterval(activityInterval);
//   if (idleTimeout) clearTimeout(idleTimeout);
  
//   isTracking = false;
// });






// const { app, BrowserWindow, ipcMain, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let totalActiveSeconds = 0;
// let startTime = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');
// }

// // Location API
// ipcMain.handle('get-current-location', async () => {
//   try {
//     // Simple implementation - returns office location as default
//     return {
//       success: true,
//       latitude: 22.7494444,
//       longitude: 75.8991667,
//       accuracy: 50,
//       source: 'electron-default'
//     };
//   } catch (error) {
//     console.error('Location error:', error);
//     return {
//       success: true,
//       latitude: 22.7494444,
//       longitude: 75.8991667,
//       accuracy: 100000,
//       source: 'fallback'
//     };
//   }
// });

// // Activity tracking
// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   console.log('✅ Tracking started');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log('🛑 Tracking stopped');
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });





// ye vala run to kar raha he location vale mamaele par isem location required ki problem aa rahi he 






// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ================= IMPROVED GOOGLE LOCATION API ===================
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 get-current-location called');
  
//   return new Promise(async (resolve) => {
//     const GOOGLE_API_KEY = 'AIzaSyBqTGBtJYtoRpvJFpF6tls1jcwlbiNcEVI'; // 🔴 यहाँ अपनी REAL KEY डालें
    
//     try {
//       // 1. FIRST: Try Google Geolocation API directly
//       console.log('🔄 Trying Google Geolocation API...');
      
//       const googleResponse = await fetch(
//         `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, 
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({}) // Empty body for basic request
//         }
//       );
      
//       if (!googleResponse.ok) {
//         throw new Error(`Google API error: ${googleResponse.status}`);
//       }
      
//       const googleData = await googleResponse.json();
//       console.log('📊 Google API Response:', googleData);
      
//       if (googleData && googleData.location && googleData.location.lat) {
//         console.log('✅ Google API Success!');
//         resolve({
//           success: true,
//           latitude: googleData.location.lat,
//           longitude: googleData.location.lng,
//           accuracy: googleData.accuracy || 50,
//           source: 'google-api',
//           timestamp: Date.now()
//         });
//         return;
//       }
//     } catch (googleError) {
//       console.log('❌ Google API Failed:', googleError.message);
//     }
    
//     // 2. SECOND: Try browser geolocation as fallback
//     try {
//       if (mainWindow) {
//         console.log('🌐 Trying Browser Geolocation as fallback...');
        
//         const browserLocation = await mainWindow.webContents.executeJavaScript(`
//           new Promise((resolveBrowser) => {
//             if (!navigator.geolocation) {
//               resolveBrowser(null);
//               return;
//             }
            
//             navigator.geolocation.getCurrentPosition(
//               (pos) => {
//                 resolveBrowser({
//                   success: true,
//                   latitude: pos.coords.latitude,
//                   longitude: pos.coords.longitude,
//                   accuracy: pos.coords.accuracy,
//                   source: 'browser-geo'
//                 });
//               },
//               (err) => {
//                 console.log('Browser geolocation error:', err.code, err.message);
//                 resolveBrowser(null);
//               },
//               {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 0
//               }
//             );
//           })
//         `);
        
//         if (browserLocation && browserLocation.success) {
//           console.log('✅ Browser Geolocation Success!');
//           resolve(browserLocation);
//           return;
//         }
//       }
//     } catch (browserError) {
//       console.log('❌ Browser Geolocation Failed:', browserError.message);
//     }
    
//     // 3. THIRD: IP-based geolocation fallback
//     try {
//       console.log('🌍 Trying IP-based geolocation...');
      
//       const ipResponse = await fetch('https://ipapi.co/json/', { timeout: 5000 });
//       if (ipResponse.ok) {
//         const ipData = await ipResponse.json();
//         if (ipData.latitude && ipData.longitude) {
//           console.log('✅ IP Geolocation Success!');
//           resolve({
//             success: true,
//             latitude: ipData.latitude,
//             longitude: ipData.longitude,
//             accuracy: 50000, // IP-based is less accurate
//             source: 'ip-geolocation',
//             city: ipData.city,
//             region: ipData.region
//           });
//           return;
//         }
//       }
//     } catch (ipError) {
//       console.log('❌ IP Geolocation Failed:', ipError.message);
//     }
    
//     // 4. FINAL: Default office location (LAST RESORT)
//     console.log('🏢 Using default office location');
//     resolve({
//       success: true,
//       latitude: 22.7494444,  // Vijay Nagar, Indore
//       longitude: 75.8991667,
//       accuracy: 100000, // Very low accuracy
//       source: 'default-office',
//       note: 'All location methods failed'
//     });
//   });
// });

// // ================= ACTIVITY TRACKING ===================
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
//   const current = totalActiveSeconds + Math.floor((Date.now() - startTime) / 1000);

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active',
//     totalSeconds: current,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason, current + 's');
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     sendUpdate(false, reason);
//   } else if (idleMs > 20000) {
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
//   return { success: true };
// });

// ipcMain.handle('stop-tracking', () => {
//   if (startTime) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log('🛑 PUNCH OUT - Total Time:', totalActiveSeconds);
//   return { success: true, totalSeconds: totalActiveSeconds };
// });

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });










// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ✅ SIMPLIFIED LOCATION API
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 get-current-location called');
  
//   return new Promise(async (resolve) => {
//     try {
//       // 1. FIRST: Try IP-based geolocation (Most reliable)
//       console.log('🌍 Trying IP-based geolocation...');
      
//       const ipResponse = await fetch('https://ipapi.co/json/', { 
//         timeout: 5000 
//       });
      
//       if (ipResponse.ok) {
//         const ipData = await ipResponse.json();
//         console.log('✅ IP Location Success!');
        
//         resolve({
//           success: true,
//           latitude: ipData.latitude || 22.7494444,
//           longitude: ipData.longitude || 75.8991667,
//           accuracy: 5000,
//           source: 'ip-geolocation',
//           city: ipData.city,
//           region: ipData.region,
//           country: ipData.country_name
//         });
//         return;
//       }
//     } catch (ipError) {
//       console.log('❌ IP Geolocation Failed:', ipError.message);
//     }
    
//     // 2. SECOND: Try browser geolocation via renderer
//     try {
//       if (mainWindow) {
//         console.log('🌐 Trying Browser Geolocation...');
        
//         const browserLocation = await mainWindow.webContents.executeJavaScript(`
//           new Promise((resolveBrowser) => {
//             if (!navigator.geolocation) {
//               resolveBrowser(null);
//               return;
//             }
            
//             navigator.geolocation.getCurrentPosition(
//               (pos) => {
//                 resolveBrowser({
//                   success: true,
//                   latitude: pos.coords.latitude,
//                   longitude: pos.coords.longitude,
//                   accuracy: pos.coords.accuracy,
//                   source: 'browser-geo'
//                 });
//               },
//               (err) => {
//                 console.log('Browser geolocation error:', err.code, err.message);
//                 resolveBrowser(null);
//               },
//               {
//                 enableHighAccuracy: false,
//                 timeout: 10000,
//                 maximumAge: 30000
//               }
//             );
//           })
//         `);
        
//         if (browserLocation && browserLocation.success) {
//           console.log('✅ Browser Geolocation Success!');
//           resolve(browserLocation);
//           return;
//         }
//       }
//     } catch (browserError) {
//       console.log('❌ Browser Geolocation Failed:', browserError.message);
//     }
    
//     // 3. FINAL: Default office location
//     console.log('🏢 Using default office location');
//     resolve({
//       success: true,
//       latitude: 22.7494444,
//       longitude: 75.8991667,
//       accuracy: 1000,
//       source: 'default-office',
//       note: 'All location methods failed'
//     });
//   });
// });

// // ✅ ACTIVITY TRACKING
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
  
//   const now = Date.now();
//   let currentSeconds = 0;
  
//   if (startTime) {
//     const activeSeconds = isIdle ? 0 : Math.floor((now - startTime) / 1000);
//     currentSeconds = totalActiveSeconds + activeSeconds;
//   }

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active (Working)',
//     totalSeconds: currentSeconds,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason);
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   // Check mouse movement
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // Check keyboard activity (system idle time less than 20 seconds)
//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     // If was idle and now active, send update
//     if (idleMs > 20000) {
//       sendUpdate(false, 'Activity Detected');
//     }
//   } else if (idleMs > 20000) {
//     // No activity for 20 seconds, mark as idle
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// // Start tracking
// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   // Check activity every 5 seconds
//   const activityInterval = setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
  
//   return { success: true };
// });

// // Stop tracking
// ipcMain.handle('stop-tracking', () => {
//   if (startTime && !isTracking) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log('🛑 PUNCH OUT - Total Time:', totalActiveSeconds);
  
//   return { 
//     success: true, 
//     totalSeconds: totalActiveSeconds 
//   };
// });

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });



//  proper working code he 






// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ✅ SIMPLIFIED LOCATION API
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 get-current-location called');
  
//   return new Promise(async (resolve) => {
//     try {
//       // 1. FIRST: Try IP-based geolocation (Most reliable)
//       console.log('🌍 Trying IP-based geolocation...');
      
//       const ipResponse = await fetch('https://ipapi.co/json/', { 
//         timeout: 5000 
//       });
      
//       if (ipResponse.ok) {
//         const ipData = await ipResponse.json();
//         console.log('✅ IP Location Success!');
        
//         resolve({
//           success: true,
//           latitude: ipData.latitude || 22.7494444,
//           longitude: ipData.longitude || 75.8991667,
//           accuracy: 5000,
//           source: 'ip-geolocation',
//           city: ipData.city,
//           region: ipData.region,
//           country: ipData.country_name
//         });
//         return;
//       }
//     } catch (ipError) {
//       console.log('❌ IP Geolocation Failed:', ipError.message);
//     }
    
//     // 2. SECOND: Try browser geolocation via renderer
//     try {
//       if (mainWindow) {
//         console.log('🌐 Trying Browser Geolocation...');
        
//         const browserLocation = await mainWindow.webContents.executeJavaScript(`
//           new Promise((resolveBrowser) => {
//             if (!navigator.geolocation) {
//               resolveBrowser(null);
//               return;
//             }
            
//             navigator.geolocation.getCurrentPosition(
//               (pos) => {
//                 resolveBrowser({
//                   success: true,
//                   latitude: pos.coords.latitude,
//                   longitude: pos.coords.longitude,
//                   accuracy: pos.coords.accuracy,
//                   source: 'browser-geo'
//                 });
//               },
//               (err) => {
//                 console.log('Browser geolocation error:', err.code, err.message);
//                 resolveBrowser(null);
//               },
//               {
//                 enableHighAccuracy: false,
//                 timeout: 10000,
//                 maximumAge: 30000
//               }
//             );
//           })
//         `);
        
//         if (browserLocation && browserLocation.success) {
//           console.log('✅ Browser Geolocation Success!');
//           resolve(browserLocation);
//           return;
//         }
//       }
//     } catch (browserError) {
//       console.log('❌ Browser Geolocation Failed:', browserError.message);
//     }
    
//     // 3. FINAL: Default office location
//     console.log('🏢 Using default office location');
//     resolve({
//       success: true,
//       latitude: 22.7494444,
//       longitude: 75.8991667,
//       accuracy: 1000,
//       source: 'default-office',
//       note: 'All location methods failed'
//     });
//   });
// });

// // ✅ ACTIVITY TRACKING
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
  
//   const now = Date.now();
//   let currentSeconds = 0;
  
//   if (startTime) {
//     const activeSeconds = isIdle ? 0 : Math.floor((now - startTime) / 1000);
//     currentSeconds = totalActiveSeconds + activeSeconds;
//   }

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active (Working)',
//     totalSeconds: currentSeconds,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason);
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   // Check mouse movement
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // Check keyboard activity (system idle time less than 20 seconds)
//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     // If was idle and now active, send update
//     if (idleMs > 20000) {
//       sendUpdate(false, 'Activity Detected');
//     }
//   } else if (idleMs > 20000) {
//     // No activity for 20 seconds, mark as idle
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// // Start tracking
// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   // Check activity every 5 seconds
//   const activityInterval = setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
  
//   return { success: true };
// });

// // Stop tracking
// ipcMain.handle('stop-tracking', () => {
//   if (startTime && !isTracking) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log('🛑 PUNCH OUT - Total Time:', totalActiveSeconds);
  
//   return { 
//     success: true, 
//     totalSeconds: totalActiveSeconds 
//   };
// });

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });






// // main.js - Simplified Version (Backend Controls Everything)
// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');
// const axios = require('axios');

// let mainWindow;
// let isTracking = false;
// let activityInterval = null;
// let attendanceId = null;

// // ✅ BACKEND CONFIG
// const BACKEND_URL = 'http://localhost:5000/api';
// let employeeId = null;
// let token = null;

// // ✅ INITIALIZE WITH BACKEND
// ipcMain.handle('init-attendance', async (event, userData) => {
//   employeeId = userData.employeeId;
//   token = userData.token;
  
//   try {
//     // Check today's status from backend
//     const response = await axios.get(
//       `${BACKEND_URL}/attendance/today-status/${employeeId}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
    
//     return response.data; // Backend will tell if already punched in
    
//   } catch (error) {
//     console.error('❌ Failed to initialize:', error.message);
//     return { isPunchedIn: false };
//   }
// });

// // ✅ PUNCH IN CONTROLLED BY BACKEND
// ipcMain.handle('punch-in', async () => {
//   try {
//     // 1. Get location
//     const location = await getCurrentLocation();
    
//     // 2. Send to backend - BACKEND WILL CONTROL EVERYTHING
//     const response = await axios.post(
//       `${BACKEND_URL}/attendance/punch-in`,
//       {
//         employeeId,
//         location: {
//           latitude: location.latitude,
//           longitude: location.longitude,
//           accuracy: location.accuracy,
//           source: location.source
//         }
//       },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
    
//     const data = response.data.data;
//     attendanceId = data.attendanceId;
    
//     // 3. Start sending activity data to backend
//     startActivityMonitoring();
    
//     return { 
//       success: true, 
//       attendanceId,
//       message: 'Punched in via backend'
//     };
    
//   } catch (error) {
//     console.error('❌ Punch in failed:', error.message);
//     return { success: false, error: error.message };
//   }
// });

// // ✅ ACTIVITY MONITORING (Only collects data, doesn't calculate)
// const startActivityMonitoring = () => {
//   if (activityInterval) clearInterval(activityInterval);
  
//   activityInterval = setInterval(async () => {
//     try {
//       // Collect activity data
//       const activityData = collectActivityData();
      
//       // Send to backend - BACKEND WILL CALCULATE TIME
//       await axios.post(
//         `${BACKEND_URL}/attendance/${attendanceId}/activity`,
//         activityData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//     } catch (error) {
//       console.error('❌ Failed to send activity:', error.message);
//     }
//   }, 10000); // Every 10 seconds
// };

// // ✅ COLLECT ACTIVITY DATA (No calculations)
// const collectActivityData = () => {
//   const now = new Date();
//   const pos = screen.getCursorScreenPoint();
  
//   // Check if user is active
//   const isActive = checkUserActive();
  
//   return {
//     timestamp: now,
//     isActive: isActive,
//     mousePosition: { x: pos.x, y: pos.y },
//     systemIdleTime: powerMonitor.getSystemIdleTime(),
//     activeApplication: getActiveWindowTitle(),
//     screenResolution: screen.getPrimaryDisplay().size
//   };
// };

// // ✅ CHECK USER ACTIVE (Simple check)
// const checkUserActive = () => {
//   const idleTime = powerMonitor.getSystemIdleTime();
//   const pos = screen.getCursorScreenPoint();
  
//   // Simple check - if system idle < 5 seconds
//   return idleTime < 5;
// };

// // ✅ PUNCH OUT CONTROLLED BY BACKEND
// ipcMain.handle('punch-out', async () => {
//   try {
//     if (!attendanceId) {
//       return { success: false, error: 'Not punched in' };
//     }
    
//     // 1. Stop activity monitoring
//     if (activityInterval) {
//       clearInterval(activityInterval);
//       activityInterval = null;
//     }
    
//     // 2. Get final location
//     const location = await getCurrentLocation();
    
//     // 3. Send punch-out to backend - BACKEND WILL VERIFY 7 HOURS
//     const response = await axios.post(
//       `${BACKEND_URL}/attendance/punch-out`,
//       {
//         attendanceId,
//         employeeId,
//         location: {
//           latitude: location.latitude,
//           longitude: location.longitude,
//           accuracy: location.accuracy
//         }
//       },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
    
//     const data = response.data.data;
    
//     // 4. Reset
//     attendanceId = null;
//     isTracking = false;
    
//     return { 
//       success: true,
//       data: {
//         totalHours: data.totalHours,
//         breakTime: data.breakTime,
//         status: data.status,
//         message: data.message
//       }
//     };
    
//   } catch (error) {
//     console.error('❌ Punch out failed:', error.message);
//     return { success: false, error: error.message };
//   }
// });

// // ✅ GET REAL-TIME STATUS FROM BACKEND
// ipcMain.handle('get-live-status', async () => {
//   try {
//     if (!attendanceId) {
//       return { isPunchedIn: false };
//     }
    
//     const response = await axios.get(
//       `${BACKEND_URL}/attendance/${attendanceId}/live-status`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
    
//     return response.data; // Backend sends all calculated data
    
//   } catch (error) {
//     console.error('❌ Failed to get status:', error.message);
//     return { error: 'Failed to get status' };
//   }
// });







// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ✅ SIMPLIFIED LOCATION API
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 get-current-location called');
  
//   return new Promise(async (resolve) => {
//     try {
//       // 1. FIRST: Try IP-based geolocation (Most reliable)
//       console.log('🌍 Trying IP-based geolocation...');
      
//       const ipResponse = await fetch('https://ipapi.co/json/', { 
//         timeout: 5000 
//       });
      
//       if (ipResponse.ok) {
//         const ipData = await ipResponse.json();
//         console.log('✅ IP Location Success!');
        
//         resolve({
//           success: true,
//           latitude: ipData.latitude || 22.7494444,
//           longitude: ipData.longitude || 75.8991667,
//           accuracy: 5000,
//           source: 'ip-geolocation',
//           city: ipData.city,
//           region: ipData.region,
//           country: ipData.country_name
//         });
//         return;
//       }
//     } catch (ipError) {
//       console.log('❌ IP Geolocation Failed:', ipError.message);
//     }
    
//     // 2. SECOND: Try browser geolocation via renderer
//     try {
//       if (mainWindow) {
//         console.log('🌐 Trying Browser Geolocation...');
        
//         const browserLocation = await mainWindow.webContents.executeJavaScript(`
//           new Promise((resolveBrowser) => {
//             if (!navigator.geolocation) {
//               resolveBrowser(null);
//               return;
//             }
            
//             navigator.geolocation.getCurrentPosition(
//               (pos) => {
//                 resolveBrowser({
//                   success: true,
//                   latitude: pos.coords.latitude,
//                   longitude: pos.coords.longitude,
//                   accuracy: pos.coords.accuracy,
//                   source: 'browser-geo'
//                 });
//               },
//               (err) => {
//                 console.log('Browser geolocation error:', err.code, err.message);
//                 resolveBrowser(null);
//               },
//               {
//                 enableHighAccuracy: false,
//                 timeout: 10000,
//                 maximumAge: 30000
//               }
//             );
//           })
//         `);
        
//         if (browserLocation && browserLocation.success) {
//           console.log('✅ Browser Geolocation Success!');
//           resolve(browserLocation);
//           return;
//         }
//       }
//     } catch (browserError) {
//       console.log('❌ Browser Geolocation Failed:', browserError.message);
//     }
    
//     // 3. FINAL: Default office location
//     console.log('🏢 Using default office location');
//     resolve({
//       success: true,
//       latitude: 22.7494444,
//       longitude: 75.8991667,
//       accuracy: 1000,
//       source: 'default-office',
//       note: 'All location methods failed'
//     });
//   });
// });

// // ✅ ACTIVITY TRACKING
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
  
//   const now = Date.now();
//   let currentSeconds = 0;
  
//   if (startTime) {
//     const activeSeconds = isIdle ? 0 : Math.floor((now - startTime) / 1000);
//     currentSeconds = totalActiveSeconds + activeSeconds;
//   }

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active (Working)',
//     totalSeconds: currentSeconds,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason);
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   // Check mouse movement
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // Check keyboard activity (system idle time less than 20 seconds)
//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     // If was idle and now active, send update
//     if (idleMs > 20000) {
//       sendUpdate(false, 'Activity Detected');
//     }
//   } else if (idleMs > 20000) {
//     // No activity for 20 seconds, mark as idle
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// // Start tracking
// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   // Check activity every 5 seconds
//   const activityInterval = setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
  
//   return { success: true };
// });

// // Stop tracking
// ipcMain.handle('stop-tracking', () => {
//   if (startTime && !isTracking) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log('🛑 PUNCH OUT - Total Time:', totalActiveSeconds);
  
//   return { 
//     success: true, 
//     totalSeconds: totalActiveSeconds 
//   };
// });

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });



//  me iske niche vo code add kar raha hu jaha par mujhe he admin dashboard me live activity show karna he thik he 








// const { app, BrowserWindow, ipcMain, screen, powerMonitor } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let activityInterval;
// let mouseMoveCount = 0;
// let keyPressCount = 0;
// let lastMousePos = null;
// let lastActivityTime = Date.now();

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     icon: path.join(__dirname, 'icon.ico'),
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       nodeIntegration: false,
//       contextIsolation: true,
//       webSecurity: false,
//       allowRunningInsecureContent: true
//     }
//   });

//   // Load frontend (Port 5173)
//   mainWindow.loadURL('http://localhost:5173');
  
//   // For admin dashboard, you can use:
//   // mainWindow.loadURL('http://localhost:3000');
  
//   mainWindow.webContents.openDevTools();
  
//   // Allow all permissions
//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     callback(true);
//   });
// }

// // ✅ LOCATION API
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 Getting location...');
  
//   try {
//     // Try multiple location sources
//     const sources = [
//       { name: 'office', lat: 22.7494444, lng: 75.8991667, accuracy: 50 },
//       { name: 'ip-api', lat: 22.7494444, lng: 75.8991667, accuracy: 100 }
//     ];
    
//     return {
//       success: true,
//       latitude: sources[0].lat,
//       longitude: sources[0].lng,
//       accuracy: sources[0].accuracy,
//       source: 'electron-default',
//       city: 'Indore',
//       region: 'Madhya Pradesh',
//       country: 'India'
//     };
//   } catch (error) {
//     console.log('Location error, using default:', error);
//     return {
//       success: true,
//       latitude: 22.7494444,
//       longitude: 75.8991667,
//       accuracy: 1000,
//       source: 'default-office'
//     };
//   }
// });

// // ✅ ACTIVITY TRACKING
// const trackActivity = () => {
//   if (!isTracking || !mainWindow) return;
  
//   const now = Date.now();
//   const mousePos = screen.getCursorScreenPoint();
//   let activityDetected = false;
  
//   // Check mouse movement
//   if (lastMousePos && (mousePos.x !== lastMousePos.x || mousePos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     mouseMoveCount++;
//   }
//   lastMousePos = mousePos;
  
//   // Check keyboard activity
//   if (powerMonitor.getSystemIdleTime() < 2) {
//     activityDetected = true;
//     keyPressCount++;
//   }
  
//   if (activityDetected) {
//     lastActivityTime = now;
    
//     // Send to renderer
//     mainWindow.webContents.send('activity-update', {
//       isIdle: false,
//       currentApp: getActiveWindowInfo(),
//       activityType: 'active',
//       mouseCount: mouseMoveCount,
//       keyCount: keyPressCount,
//       timestamp: new Date()
//     });
    
//     // Send to backend API (simulate)
//     sendActivityToAPI({
//       activityType: 'mouse_move',
//       mouseActivity: 1,
//       keyboardActivity: 0,
//       timestamp: new Date()
//     });
    
//   } else if (now - lastActivityTime > 20000) {
//     // Idle for 20+ seconds
//     mainWindow.webContents.send('activity-update', {
//       isIdle: true,
//       currentApp: 'Idle',
//       idleDuration: Math.floor((now - lastActivityTime) / 1000)
//     });
//   }
// };

// // ✅ Get active window info
// function getActiveWindowInfo() {
//   try {
//     const { getActiveWindow } = require('active-win');
//     // This requires active-win package
//     return 'VS Code'; // Default
//   } catch {
//     return 'Unknown App';
//   }
// }

// // ✅ Send activity to backend API
// async function sendActivityToAPI(activityData) {
//   try {
//     // Simulate sending to your backend
//     console.log('📤 Activity data:', activityData);
//   } catch (error) {
//     console.error('API send error:', error);
//   }
// }

// // ✅ START TRACKING
// ipcMain.handle('start-tracking', async (event) => {
//   console.log('✅ STARTING TRACKING...');
  
//   isTracking = true;
//   mouseMoveCount = 0;
//   keyPressCount = 0;
//   lastMousePos = screen.getCursorScreenPoint();
//   lastActivityTime = Date.now();
  
//   // Start activity tracking interval
//   activityInterval = setInterval(trackActivity, 5000);
  
//   // Initial activity update
//   mainWindow.webContents.send('activity-update', {
//     isIdle: false,
//     currentApp: 'Starting...',
//     totalSeconds: 0
//   });
  
//   return { success: true, message: 'Tracking started' };
// });

// // ✅ STOP TRACKING
// ipcMain.handle('stop-tracking', async (event) => {
//   console.log('🛑 STOPPING TRACKING...');
  
//   isTracking = false;
//   if (activityInterval) {
//     clearInterval(activityInterval);
//     activityInterval = null;
//   }
  
//   const totalActivities = mouseMoveCount + keyPressCount;
//   console.log(`📊 Total Activities: Mouse=${mouseMoveCount}, Keys=${keyPressCount}`);
  
//   return { 
//     success: true, 
//     message: 'Tracking stopped',
//     totalMouseActivities: mouseMoveCount,
//     totalKeyboardActivities: keyPressCount
//   };
// });

// // ✅ APP EVENTS
// app.whenReady().then(() => {
//   console.log('🚀 ELECTRON APP READY');
//   createWindow();
  
//   // Handle external links
//   mainWindow.webContents.setWindowOpenHandler(({ url }) => {
//     if (url.startsWith('http://localhost:5173') || url.startsWith('http://localhost:3000')) {
//       return { action: 'allow' };
//     }
//     return { action: 'deny' };
//   });
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     if (activityInterval) {
//       clearInterval(activityInterval);
//     }
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// // ✅ Handle CORS and security
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');
// app.commandLine.appendSwitch('ignore-certificate-errors');








// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
// const path = require('path');

// let mainWindow;
// let isTracking = false;
// let startTime = null;
// let totalActiveSeconds = 0;
// let lastActivityTime = Date.now();
// let lastMousePos = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false
//     }
//   });

//   mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
//     console.log('Permission requested:', permission);
//     if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });

//   mainWindow.loadURL('http://localhost:5173');

//   mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': [
//           "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
//           "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
//           "style-src 'self' 'unsafe-inline'",
//           "img-src 'self' data: blob: *",
//           "connect-src 'self' http://localhost:* https://localhost:* https://*.googleapis.com"
//         ].join('; ')
//       }
//     });
//   });

//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     console.log('ACORE EMPLOYEE PORTAL - READY');
//   });
// }

// // ✅ SIMPLIFIED LOCATION API
// ipcMain.handle('get-current-location', async () => {
//   console.log('📍 get-current-location called');
  
//   return new Promise(async (resolve) => {
//     try {
//       // 1. FIRST: Try IP-based geolocation (Most reliable)
//       console.log('🌍 Trying IP-based geolocation...');
      
//       const ipResponse = await fetch('https://ipapi.co/json/', { 
//         timeout: 5000 
//       });
      
//       if (ipResponse.ok) {
//         const ipData = await ipResponse.json();
//         console.log('✅ IP Location Success!');
        
//         resolve({
//           success: true,
//           latitude: ipData.latitude || 22.7494444,
//           longitude: ipData.longitude || 75.8991667,
//           accuracy: 5000,
//           source: 'ip-geolocation',
//           city: ipData.city,
//           region: ipData.region,
//           country: ipData.country_name
//         });
//         return;
//       }
//     } catch (ipError) {
//       console.log('❌ IP Geolocation Failed:', ipError.message);
//     }
    
//     // 2. SECOND: Try browser geolocation via renderer
//     try {
//       if (mainWindow) {
//         console.log('🌐 Trying Browser Geolocation...');
        
//         const browserLocation = await mainWindow.webContents.executeJavaScript(`
//           new Promise((resolveBrowser) => {
//             if (!navigator.geolocation) {
//               resolveBrowser(null);
//               return;
//             }
            
//             navigator.geolocation.getCurrentPosition(
//               (pos) => {
//                 resolveBrowser({
//                   success: true,
//                   latitude: pos.coords.latitude,
//                   longitude: pos.coords.longitude,
//                   accuracy: pos.coords.accuracy,
//                   source: 'browser-geo'
//                 });
//               },
//               (err) => {
//                 console.log('Browser geolocation error:', err.code, err.message);
//                 resolveBrowser(null);
//               },
//               {
//                 enableHighAccuracy: false,
//                 timeout: 10000,
//                 maximumAge: 30000
//               }
//             );
//           })
//         `);
        
//         if (browserLocation && browserLocation.success) {
//           console.log('✅ Browser Geolocation Success!');
//           resolve(browserLocation);
//           return;
//         }
//       }
//     } catch (browserError) {
//       console.log('❌ Browser Geolocation Failed:', browserError.message);
//     }
    
//     // 3. FINAL: Default office location
//     console.log('🏢 Using default office location');
//     resolve({
//       success: true,
//       latitude: 22.7494444,
//       longitude: 75.8991667,
//       accuracy: 1000,
//       source: 'default-office',
//       note: 'All location methods failed'
//     });
//   });
// });

// // ✅ ACTIVITY TRACKING
// const sendUpdate = (isIdle, reason = '') => {
//   if (!mainWindow) return;
  
//   const now = Date.now();
//   let currentSeconds = 0;
  
//   if (startTime) {
//     const activeSeconds = isIdle ? 0 : Math.floor((now - startTime) / 1000);
//     currentSeconds = totalActiveSeconds + activeSeconds;
//   }

//   mainWindow.webContents.send('activity-update', {
//     isIdle,
//     currentApp: isIdle ? 'Idle (No Activity)' : 'Active (Working)',
//     totalSeconds: currentSeconds,
//     reason
//   });

//   console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason);
// };

// const checkActivity = () => {
//   if (!isTracking) return;

//   const now = Date.now();
//   const idleMs = now - lastActivityTime;
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;
//   let reason = '';

//   // Check mouse movement
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     reason = 'Mouse Move';
//   }
//   lastMousePos = pos;

//   // Check keyboard activity (system idle time less than 20 seconds)
//   if (powerMonitor.getSystemIdleTime() < 20) {
//     activityDetected = true;
//     reason = reason || 'Key Press';
//   }

//   if (activityDetected) {
//     lastActivityTime = now;
//     // If was idle and now active, send update
//     if (idleMs > 20000) {
//       sendUpdate(false, 'Activity Detected');
//     }
//   } else if (idleMs > 20000) {
//     // No activity for 20 seconds, mark as idle
//     sendUpdate(true, 'No Activity for 20 Seconds');
//   }
// };

// // Start tracking
// ipcMain.handle('start-tracking', () => {
//   isTracking = true;
//   startTime = Date.now();
//   lastActivityTime = Date.now();
//   totalActiveSeconds = 0;
//   lastMousePos = screen.getCursorScreenPoint();

//   // Check activity every 5 seconds
//   const activityInterval = setInterval(checkActivity, 5000);

//   console.log('✅ TRACKING STARTED');
//   sendUpdate(false, 'Punch In');
  
//   return { success: true };
// });

// // Stop tracking
// ipcMain.handle('stop-tracking', () => {
//   if (startTime && !isTracking) {
//     totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
//   }
//   isTracking = false;
//   console.log('🛑 PUNCH OUT - Total Time:', totalActiveSeconds);
  
//   return { 
//     success: true, 
//     totalSeconds: totalActiveSeconds 
//   };
// });

// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('disable-web-security');
// app.commandLine.appendSwitch('allow-running-insecure-content');

// app.whenReady().then(() => {
//   console.log('🚀 Electron App Ready');
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });



// ----------------------------------------------------------------------------------------------------------------------------------------



// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require("electron");
// const path = require("path");

// let mainWindow = null;
// let trackingInterval = null;

// let lastActivityAt = Date.now();
// let lastMousePos = null;

// let currentState = "ACTIVE"; // ACTIVE | IDLE
// let bucketSeconds = 0;

// const IDLE_THRESHOLD_SEC = 20;
// const FLUSH_INTERVAL_SEC = 60;

// /* =========================
//    CREATE WINDOW
// ========================= */
// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false,
//     },
//   });

//   mainWindow.loadURL("http://localhost:5173");

//   mainWindow.once("ready-to-show", () => {
//     mainWindow.show();
//     console.log("✅ Main window ready");
//   });

//   mainWindow.on("closed", () => {
//     mainWindow = null;
//   });
// }

// /* =========================
//    SAFE SEND
// ========================= */
// function safeSend(channel, payload) {
//   if (!mainWindow) return;
//   if (mainWindow.isDestroyed()) return;

//   try {
//     mainWindow.webContents.send(channel, payload);
//   } catch (err) {
//     console.error("IPC send failed:", err.message);
//   }
// }

// /* =========================
//    ACTIVITY DETECTION
// ========================= */
// function detectActivity() {
//   const now = Date.now();
//   const pos = screen.getCursorScreenPoint();

//   let activityDetected = false;

//   // Mouse movement
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//   }
//   lastMousePos = pos;

//   // Keyboard / system idle
//   let systemIdle = 0;
//   try {
//     systemIdle = powerMonitor.getSystemIdleTime();
//   } catch {
//     systemIdle = 0;
//   }

//   if (systemIdle < IDLE_THRESHOLD_SEC) {
//     activityDetected = true;
//   }

//   if (activityDetected) {
//     lastActivityAt = now;
//     if (currentState === "IDLE") {
//       flushBucket();
//       currentState = "ACTIVE";
//     }
//   } else if (now - lastActivityAt > IDLE_THRESHOLD_SEC * 1000) {
//     if (currentState === "ACTIVE") {
//       flushBucket();
//       currentState = "IDLE";
//     }
//   }

//   bucketSeconds += 1;

//   if (bucketSeconds >= FLUSH_INTERVAL_SEC) {
//     flushBucket();
//   }
// }

// function flushBucket() {
//   if (bucketSeconds <= 0) return;

//   safeSend("work-session-update", {
//     state: currentState,
//     seconds: bucketSeconds,
//   });

//   bucketSeconds = 0;
// }

// /* =========================
//    IPC HANDLERS
// ========================= */
// ipcMain.handle("ws-start-tracking", async () => {
//   if (trackingInterval) {
//     return { success: true, message: "Already tracking" };
//   }

//   lastActivityAt = Date.now();
//   lastMousePos = screen.getCursorScreenPoint();
//   currentState = "ACTIVE";
//   bucketSeconds = 0;

//   trackingInterval = setInterval(detectActivity, 1000);

//   console.log("▶️ Tracking started");
//   return { success: true };
// });

// ipcMain.handle("ws-stop-tracking", async () => {
//   if (trackingInterval) {
//     clearInterval(trackingInterval);
//     trackingInterval = null;
//   }

//   flushBucket();
//   console.log("⏹ Tracking stopped");
//   return { success: true };
// });

// /* =========================
//    APP LIFECYCLE
// ========================= */
// app.whenReady().then(createWindow);

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });


// ?????????????????????????????



// const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require("electron");
// const path = require("path");

// let mainWindow = null;
// let trackingInterval = null;

// let lastActivityAt = Date.now();
// let lastMousePos = null;

// let currentState = "ACTIVE"; // ACTIVE | IDLE
// let bucketSeconds = 0;

// const IDLE_THRESHOLD_SEC = 30; // ✅ 30 seconds idle threshold (FIXED)
// const FLUSH_INTERVAL_SEC = 60; // Send update every 60 seconds

// /* =========================
//    CREATE WINDOW
// ========================= */
// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1350,
//     height: 850,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       contextIsolation: true,
//       nodeIntegration: false,
//       webSecurity: false,
//     },
//   });

//   // Set permissions
//   mainWindow.webContents.session.setPermissionRequestHandler(
//     (webContents, permission, callback) => {
//       console.log("📡 Permission requested:", permission);
//       if (
//         permission === "geolocation" ||
//         permission === "notifications" ||
//         permission === "media"
//       ) {
//         callback(true);
//       } else {
//         callback(false);
//       }
//     }
//   );

//   mainWindow.loadURL("http://localhost:5173");

//   // ✅ Open DevTools to see console logs
//   mainWindow.webContents.openDevTools();

//   mainWindow.once("ready-to-show", () => {
//     mainWindow.show();
//     console.log("✅ ACORE EMPLOYEE PORTAL - READY");
//     console.log(`⏱️ IDLE THRESHOLD: ${IDLE_THRESHOLD_SEC} seconds`);
//     console.log(`📊 FLUSH INTERVAL: ${FLUSH_INTERVAL_SEC} seconds`);
//   });

//   mainWindow.on("closed", () => {
//     mainWindow = null;
//     if (trackingInterval) {
//       clearInterval(trackingInterval);
//       trackingInterval = null;
//     }
//   });
// }

// /* =========================
//    SAFE SEND TO RENDERER
// ========================= */
// function safeSend(channel, payload) {
//   if (!mainWindow) return;
//   if (mainWindow.isDestroyed()) return;

//   try {
//     mainWindow.webContents.send(channel, payload);
    
//     // ✅ Log to BOTH console AND renderer
//     console.log(`📤 [MAIN] Sent ${channel}:`, JSON.stringify(payload));
    
//     // Send log to renderer so you can see it in browser console
//     mainWindow.webContents.executeJavaScript(`
//       console.log('%c📤 [ELECTRON] ${channel}: ${JSON.stringify(payload)}', 'color: #10b981; font-weight: bold');
//     `);
//   } catch (err) {
//     console.error("❌ [MAIN] IPC send failed:", err.message);
//   }
// }

// /* =========================
//    LOG TO RENDERER CONSOLE
// ========================= */
// function logToRenderer(message, color = '#3b82f6') {
//   if (!mainWindow || mainWindow.isDestroyed()) return;
  
//   try {
//     mainWindow.webContents.executeJavaScript(`
//       console.log('%c${message}', 'color: ${color}; font-weight: bold');
//     `);
//   } catch (err) {
//     // Ignore errors
//   }
// }

// /* =========================
//    ACTIVITY DETECTION
// ========================= */
// function detectActivity() {
//   const now = Date.now();
//   const pos = screen.getCursorScreenPoint();
//   const timeSinceLastActivity = Math.floor((now - lastActivityAt) / 1000);

//   let activityDetected = false;
//   let activityReason = "";

//   // 1️⃣ Check mouse movement
//   if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
//     activityDetected = true;
//     activityReason = "Mouse Movement";
//   }
//   lastMousePos = pos;

//   // 2️⃣ Check keyboard / system idle
//   let systemIdle = 0;
//   try {
//     systemIdle = powerMonitor.getSystemIdleTime();
//   } catch (err) {
//     systemIdle = 0;
//   }

//   if (systemIdle < IDLE_THRESHOLD_SEC) {
//     activityDetected = true;
//     if (!activityReason) {
//       activityReason = "Keyboard Activity";
//     }
//   }

//   // 3️⃣ Update state based on activity
//   if (activityDetected) {
//     lastActivityAt = now;
    
//     if (currentState === "IDLE") {
//       console.log(`▶️ [MAIN] User ACTIVE again (${activityReason})`);
//       logToRenderer(`▶️ User ACTIVE again (${activityReason})`, '#10b981');
      
//       flushBucket(); // Flush IDLE bucket first
//       currentState = "ACTIVE";
      
//       // Send immediate state change to UI
//       safeSend("activity-state-change", {
//         state: "ACTIVE",
//         reason: activityReason
//       });
//     }
//   } else if (timeSinceLastActivity >= IDLE_THRESHOLD_SEC) {
//     if (currentState === "ACTIVE") {
//       console.log(`⏸️ [MAIN] User became IDLE (${timeSinceLastActivity}s inactive)`);
//       logToRenderer(`⏸️ User became IDLE (${timeSinceLastActivity}s inactive)`, '#f59e0b');
      
//       flushBucket(); // Flush ACTIVE bucket first
//       currentState = "IDLE";
      
//       // Send immediate state change to UI
//       safeSend("activity-state-change", {
//         state: "IDLE",
//         reason: `${timeSinceLastActivity}s inactive`
//       });
//     }
//   }

//   // 4️⃣ Increment bucket
//   bucketSeconds += 1;

//   // 5️⃣ Log current status every 10 seconds
//   if (bucketSeconds % 10 === 0) {
//     const status = `${currentState} - Bucket: ${bucketSeconds}s - Last Activity: ${timeSinceLastActivity}s ago`;
//     console.log(`📊 [MAIN] ${status}`);
//     logToRenderer(`📊 ${status}`, currentState === "ACTIVE" ? '#10b981' : '#f59e0b');
//   }

//   // 6️⃣ Flush every 60 seconds
//   if (bucketSeconds >= FLUSH_INTERVAL_SEC) {
//     flushBucket();
//   }
// }

// /* =========================
//    FLUSH BUCKET (Send to Backend)
// ========================= */
// function flushBucket() {
//   if (bucketSeconds <= 0) return;

//   console.log(`🔄 [MAIN] Flushing ${bucketSeconds}s as ${currentState}`);
//   logToRenderer(`🔄 Flushing ${bucketSeconds}s as ${currentState}`, '#8b5cf6');

//   safeSend("work-session-update", {
//     state: currentState,
//     seconds: bucketSeconds,
//   });

//   bucketSeconds = 0; // Reset bucket
// }

// /* =========================
//    IPC HANDLERS
// ========================= */

// // 🟢 START TRACKING
// ipcMain.handle("ws-start-tracking", async () => {
//   if (trackingInterval) {
//     console.log("⚠️ [MAIN] Already tracking");
//     return { success: true, message: "Already tracking" };
//   }

//   // Reset state
//   lastActivityAt = Date.now();
//   lastMousePos = screen.getCursorScreenPoint();
//   currentState = "ACTIVE";
//   bucketSeconds = 0;

//   // Start tracking interval (every 1 second)
//   trackingInterval = setInterval(detectActivity, 1000);

//   console.log("▶️ [MAIN] TRACKING STARTED");
//   console.log(`⏱️ [MAIN] IDLE THRESHOLD: ${IDLE_THRESHOLD_SEC} seconds`);
  
//   logToRenderer("▶️ TRACKING STARTED", '#10b981');
//   logToRenderer(`⏱️ IDLE THRESHOLD: ${IDLE_THRESHOLD_SEC} seconds`, '#3b82f6');
  
//   return { success: true };
// });

// // 🔴 STOP TRACKING
// ipcMain.handle("ws-stop-tracking", async () => {
//   if (trackingInterval) {
//     clearInterval(trackingInterval);
//     trackingInterval = null;
//   }

//   // Flush remaining seconds
//   flushBucket();

//   console.log("⏹ [MAIN] TRACKING STOPPED");
//   logToRenderer("⏹ TRACKING STOPPED", '#ef4444');
  
//   return { success: true };
// });

// // 📍 GET LOCATION
// ipcMain.handle("get-current-location", async () => {
//   console.log("📍 [MAIN] Location request received");

//   return new Promise(async (resolve) => {
//     try {
//       // 1️⃣ Try IP-based geolocation
//       console.log("🌍 [MAIN] Trying IP-based geolocation...");

//       const ipResponse = await fetch("https://ipapi.co/json/", {
//         timeout: 5000,
//       });

//       if (ipResponse.ok) {
//         const ipData = await ipResponse.json();
//         console.log("✅ [MAIN] IP Location Success!");

//         resolve({
//           success: true,
//           latitude: ipData.latitude || 22.7494444,
//           longitude: ipData.longitude || 75.8991667,
//           accuracy: 5000,
//           source: "ip-geolocation",
//           city: ipData.city,
//           region: ipData.region,
//           country: ipData.country_name,
//         });
//         return;
//       }
//     } catch (ipError) {
//       console.log("❌ [MAIN] IP Geolocation Failed:", ipError.message);
//     }

//     // 2️⃣ Try browser geolocation
//     try {
//       if (mainWindow) {
//         console.log("🌐 [MAIN] Trying Browser Geolocation...");

//         const browserLocation = await mainWindow.webContents.executeJavaScript(`
//           new Promise((resolveBrowser) => {
//             if (!navigator.geolocation) {
//               resolveBrowser(null);
//               return;
//             }
            
//             navigator.geolocation.getCurrentPosition(
//               (pos) => {
//                 resolveBrowser({
//                   success: true,
//                   latitude: pos.coords.latitude,
//                   longitude: pos.coords.longitude,
//                   accuracy: pos.coords.accuracy,
//                   source: 'browser-geo'
//                 });
//               },
//               (err) => {
//                 console.log('Browser geolocation error:', err.message);
//                 resolveBrowser(null);
//               },
//               {
//                 enableHighAccuracy: false,
//                 timeout: 10000,
//                 maximumAge: 30000
//               }
//             );
//           })
//         `);

//         if (browserLocation && browserLocation.success) {
//           console.log("✅ [MAIN] Browser Geolocation Success!");
//           resolve(browserLocation);
//           return;
//         }
//       }
//     } catch (browserError) {
//       console.log("❌ [MAIN] Browser Geolocation Failed:", browserError.message);
//     }

//     // 3️⃣ Default office location
//     console.log("🏢 [MAIN] Using default office location");
//     resolve({
//       success: true,
//       latitude: 22.7494444,
//       longitude: 75.8991667,
//       accuracy: 1000,
//       source: "default-office",
//       note: "All location methods failed",
//     });
//   });
// });

// /* =========================
//    APP LIFECYCLE
// ========================= */
// app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
// app.commandLine.appendSwitch("disable-web-security");
// app.commandLine.appendSwitch("allow-running-insecure-content");

// app.whenReady().then(() => {
//   console.log("🚀 [MAIN] Electron App Ready");
//   createWindow();
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });


// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww


const { app, BrowserWindow, ipcMain, powerMonitor, screen } = require('electron');
const path = require('path');

let mainWindow;

// ✅ OLD TRACKING VARIABLES (Working perfectly)
let isTracking = false;
let startTime = null;
let totalActiveSeconds = 0;
let lastActivityTime = Date.now();
let lastMousePos = null;
let activityInterval = null;

// ✅ NEW API VARIABLES (For backend sync)
let currentState = "ACTIVE"; // ACTIVE | IDLE
let bucketSeconds = 0;
const IDLE_THRESHOLD_MS = 30000; // 30 seconds (same as old 20-30s logic)
const FLUSH_INTERVAL_SEC = 60; // Send to backend every 60 seconds

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1350,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false
    }
  });

  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    console.log('📡 Permission requested:', permission);
    if (permission === 'geolocation' || permission === 'notifications' || permission === 'media') {
      callback(true);
    } else {
      callback(false);
    }
  });

  mainWindow.loadURL('http://localhost:5173');

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: *",
          "connect-src 'self' http://localhost:* https://localhost:* https://*.googleapis.com"
        ].join('; ')
      }
    });
  });

  // ✅ Open DevTools to see logs
  mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('✅ ACORE EMPLOYEE PORTAL - READY');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (activityInterval) {
      clearInterval(activityInterval);
      activityInterval = null;
    }
  });
}

/* =========================
   📍 LOCATION API
========================= */
ipcMain.handle('get-current-location', async () => {
  console.log('📍 get-current-location called');
  
  return new Promise(async (resolve) => {
    try {
      // Try IP-based geolocation
      console.log('🌍 Trying IP-based geolocation...');
      
      const ipResponse = await fetch('https://ipapi.co/json/', { 
        timeout: 5000 
      });
      
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        console.log('✅ IP Location Success!');
        
        resolve({
          success: true,
          latitude: ipData.latitude || 22.7494444,
          longitude: ipData.longitude || 75.8991667,
          accuracy: 5000,
          source: 'ip-geolocation',
          city: ipData.city,
          region: ipData.region,
          country: ipData.country_name
        });
        return;
      }
    } catch (ipError) {
      console.log('❌ IP Geolocation Failed:', ipError.message);
    }
    
    // Try browser geolocation
    try {
      if (mainWindow) {
        console.log('🌐 Trying Browser Geolocation...');
        
        const browserLocation = await mainWindow.webContents.executeJavaScript(`
          new Promise((resolveBrowser) => {
            if (!navigator.geolocation) {
              resolveBrowser(null);
              return;
            }
            
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                resolveBrowser({
                  success: true,
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                  accuracy: pos.coords.accuracy,
                  source: 'browser-geo'
                });
              },
              (err) => {
                console.log('Browser geolocation error:', err.code, err.message);
                resolveBrowser(null);
              },
              {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 30000
              }
            );
          })
        `);
        
        if (browserLocation && browserLocation.success) {
          console.log('✅ Browser Geolocation Success!');
          resolve(browserLocation);
          return;
        }
      }
    } catch (browserError) {
      console.log('❌ Browser Geolocation Failed:', browserError.message);
    }
    
    // Default office location
    console.log('🏢 Using default office location');
    resolve({
      success: true,
      latitude: 22.7494444,
      longitude: 75.8991667,
      accuracy: 1000,
      source: 'default-office',
      note: 'All location methods failed'
    });
  });
});

/* =========================
   📤 SEND UPDATE TO RENDERER
========================= */
const sendUpdate = (isIdle, reason = '') => {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  
  const now = Date.now();
  let currentSeconds = 0;
  
  if (startTime) {
    const activeSeconds = isIdle ? 0 : Math.floor((now - startTime) / 1000);
    currentSeconds = totalActiveSeconds + activeSeconds;
  }

  // ✅ Send to frontend (OLD format - working perfectly)
  mainWindow.webContents.send('activity-update', {
    isIdle,
    currentApp: isIdle ? 'Idle (No Activity)' : 'Active (Working)',
    totalSeconds: currentSeconds,
    reason
  });

  console.log(isIdle ? '⏸️ IDLE' : '▶️ ACTIVE', reason, `(${currentSeconds}s total)`);
  
  // ✅ Log to browser console
  try {
    mainWindow.webContents.executeJavaScript(`
      console.log('%c${isIdle ? '⏸️ IDLE' : '▶️ ACTIVE'} ${reason} (${currentSeconds}s total)', 
        'color: ${isIdle ? '#f59e0b' : '#10b981'}; font-weight: bold');
    `);
  } catch (err) {
    // Ignore
  }
};

/* =========================
   🔄 FLUSH TO BACKEND
========================= */
const flushToBackend = () => {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  if (bucketSeconds <= 0) return;

  console.log(`📤 Flushing ${bucketSeconds}s as ${currentState} to backend`);

  // ✅ Send to backend via work-session-update
  mainWindow.webContents.send('work-session-update', {
    state: currentState,
    seconds: bucketSeconds,
  });

  bucketSeconds = 0; // Reset bucket
};

/* =========================
   🔍 CHECK ACTIVITY (OLD LOGIC - Working perfectly)
========================= */
const checkActivity = () => {
  if (!isTracking) return;

  const now = Date.now();
  const idleMs = now - lastActivityTime;
  const pos = screen.getCursorScreenPoint();

  let activityDetected = false;
  let reason = '';

  // ✅ Check mouse movement
  if (lastMousePos && (pos.x !== lastMousePos.x || pos.y !== lastMousePos.y)) {
    activityDetected = true;
    reason = 'Mouse Move';
  }
  lastMousePos = pos;

  // ✅ Check keyboard activity (system idle time)
  const systemIdle = powerMonitor.getSystemIdleTime();
  if (systemIdle < 30) { // Less than 30 seconds idle
    activityDetected = true;
    reason = reason || 'Keyboard Activity';
  }

  // ✅ Update activity state
  if (activityDetected) {
    lastActivityTime = now;
    
    // If was idle and now active, send update
    if (idleMs > IDLE_THRESHOLD_MS) {
      sendUpdate(false, 'Activity Detected');
      
      // ✅ Flush IDLE bucket and switch to ACTIVE
      if (currentState === "IDLE") {
        flushToBackend();
        currentState = "ACTIVE";
      }
    }
  } else if (idleMs > IDLE_THRESHOLD_MS) {
    // No activity for 30 seconds, mark as idle
    sendUpdate(true, `No Activity for ${Math.floor(idleMs / 1000)}s`);
    
    // ✅ Flush ACTIVE bucket and switch to IDLE
    if (currentState === "ACTIVE") {
      flushToBackend();
      currentState = "IDLE";
    }
  }

  // ✅ Increment bucket for backend
  bucketSeconds += 5; // We check every 5 seconds

  // ✅ Flush to backend every 60 seconds
  if (bucketSeconds >= FLUSH_INTERVAL_SEC) {
    flushToBackend();
  }
};

/* =========================
   🟢 START TRACKING
========================= */
ipcMain.handle('start-tracking', () => {
  console.log('🟢 START TRACKING called');
  
  isTracking = true;
  startTime = Date.now();
  lastActivityTime = Date.now();
  totalActiveSeconds = 0;
  lastMousePos = screen.getCursorScreenPoint();
  currentState = "ACTIVE";
  bucketSeconds = 0;

  // ✅ Check activity every 5 seconds (OLD logic - working perfectly)
  activityInterval = setInterval(checkActivity, 5000);

  console.log('✅ TRACKING STARTED');
  sendUpdate(false, 'Punch In');
  
  return { success: true };
});

/* =========================
   🔴 STOP TRACKING
========================= */
ipcMain.handle('stop-tracking', () => {
  console.log('🔴 STOP TRACKING called');
  
  if (startTime && isTracking) {
    totalActiveSeconds += Math.floor((Date.now() - startTime) / 1000);
  }
  
  isTracking = false;
  
  if (activityInterval) {
    clearInterval(activityInterval);
    activityInterval = null;
  }
  
  // ✅ Flush remaining bucket
  flushToBackend();
  
  console.log('🛑 PUNCH OUT - Total Time:', totalActiveSeconds, 'seconds');
  
  return { 
    success: true, 
    totalSeconds: totalActiveSeconds 
  };
});

/* =========================
   🚀 APP LIFECYCLE
========================= */
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('allow-running-insecure-content');

app.whenReady().then(() => {
  console.log('🚀 Electron App Ready');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});