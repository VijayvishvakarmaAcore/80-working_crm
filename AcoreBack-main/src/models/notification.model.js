import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipientId: {
        type: String,
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['system', 'approval', 'reminder', 'schedule_change', 'leave', 'task'],
    },
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    expiresAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);