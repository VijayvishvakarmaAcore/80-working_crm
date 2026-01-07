import Notification from "../models/notification.model.js";


import {io } from "../app.js"
import notificationModel from "../models/notification.model.js";
import mongoose from "mongoose";

export const createNotification = async (recipientId, title, body , type, referenceId = null )=> {
    try{
   const newNotification = await Notification.create({
    recipientId,
    body,
    title,
    type,
    referenceId
   });

   if(io){
    io.to(recipientId).emit('newNotification',{
        Notification:newNotification
    });
   }

   return newNotification;
    }catch(error){
        console.error("Failed to create/emit notification:", error);

    }
}


export const getNotifications = async (req, res) => {
    try {
        const { employeeId: paramId } = req.params;
        
        let recipientId;

        if (paramId) {
            recipientId = paramId;
            console.log("Fetching notifications for Admin view:", recipientId);
        } else {
            recipientId = req.user._id; 
            console.log("Fetching notifications for self-view:", recipientId);
        }
        const notifications = await notificationModel.find({ recipientId: recipientId })
            .sort({ createdAt: -1 })
            .limit(20);

        const unreadCount = notifications.filter(n => !n.isRead).length;

        res.status(200).json({ status: true, count: unreadCount, data: notifications });

    } catch (error) {
        console.error("Get Notifications Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};

export const markAsRead = async (req,res)=> {
    try{
        const {id} = req.params;

        const notification = await Notification.findByIdAndUpdate(
            id,
            {$set:{isRead: true}},
            {new:true}

        )

    if(!notification){
       return res.status(404).json({ status: false, message: "Notification not found." }); 
    }

     res.status(200).json({status:true,message:"Notification marked as read.", data: notification})
    }catch(error){
res.status(500).json({ status: false, message: error.message });
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleted = await Notification.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ status: false, message: "Notification not found." });
        }

        res.status(200).json({ status: true, message: "Notification deleted." });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const sendAdHocNotification = async (req, res) => {
    try {
        const { recipientId, title, body, type, referenceId } = req.body;

        // Basic validation
        if (!recipientId || !title || !body || !type) {
            return res.status(400).json({ status: false, message: "Recipient ID, title, body, and type are all required for the notification." });
        }
        
        if (!['system', 'approval', 'reminder', 'schedule_change', 'leave', 'task'].includes(type)) {
             return res.status(400).json({ status: false, message: "Invalid notification type provided." });
        }

   
        const notification = await createNotification(recipientId, title, body, type, referenceId);

        if (!notification) {
             return res.status(500).json({ status: false, message: "Failed to create notification record." });
        }

        res.status(201).json({ 
            status: true, 
            message: `Notification sent and logged for user ${recipientId}.`, 
            data: notification 
        });

    } catch (error) {
        console.error("Send Ad-Hoc Notification Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};