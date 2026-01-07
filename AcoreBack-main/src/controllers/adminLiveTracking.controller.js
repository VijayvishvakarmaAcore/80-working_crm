import WorkSession from "../models/WorkSession.model.js";

/*
|--------------------------------------------------------------------------
| Admin Live Tracking Controller
|--------------------------------------------------------------------------
| Purpose:
| - Admin dashboard ke liye live employee grid
| - Page reload par current day ka data
| - Socket sirf real-time updates ke liye
|--------------------------------------------------------------------------
*/

export const getAdminLiveTracking = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const sessions = await WorkSession.find({ date: today })
      .populate("employeeId", "name email");

    const result = sessions.map(s => ({
      employeeId: s.employeeId._id,
      name: s.employeeId.name,
      email: s.employeeId.email,
      status: s.status === "WORKING" ? "ACTIVE" : "COMPLETED",
      workSeconds: s.workSeconds,
      idleSeconds: s.idleSeconds,
      startAt: s.startAt,
      endAt: s.endAt,
    }));

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("❌ admin live tracking error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load live tracking data",
    });
  }
};
