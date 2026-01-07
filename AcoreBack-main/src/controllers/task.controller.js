import Task from '../models/task.model.js';
// import Subtask from '../models/subtask.model.js';
import mongoose from 'mongoose';
import { createNotification } from './notification.controller.js';

const populateTaskFields = [
    { path: 'projectId', select: 'name status' },
    { path: 'assignedTo', select: 'name employeeId profilePicture' }
];

// POST /tasks - Create a new task
export const createTask = async (req, res) => {
    try {
        const { title, description, projectId, assignedTo, priority, status, startDate, dueDate } = req.body;

        if (!title || !projectId) {
            return res.status(400).json({ status: false, message: "Task title and Project ID are required." });
        }

        const task = await Task.create({
            title,
            description,
            projectId,
            assignedTo, 
            priority,
            status,
            startDate,
            dueDate
        });


        if (task.assignedTo) {
            
             const notificationBody = `Task: ${task.title}. Project ID: ${task.projectId}. Due: ${task.dueDate ? new Date(task.dueDate).toDateString() : 'N/A'}`;

             createNotification(
                 task.assignedTo, 
                 " New Task Assigned!", 
                 notificationBody, 
                 'task', 
                 task._id 
             );
        }
        res.status(201).json({ status: true, message: "Task created successfully.", data: task });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getProjectTasks = async (req, res) => {
    try {
        const { id } = req.params; // Project ID

        const tasks = await Task.find({ projectId: id })
            .populate(populateTaskFields)
            .sort({ dueDate: 1, priority: -1 });

        res.status(200).json({ status: true, count: tasks.length, data: tasks });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getTaskDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id)
            .populate(populateTaskFields);

        if (!task) {
            return res.status(404).json({ status: false, message: "Task not found." });
        }
        
        res.status(200).json({ status: true, data: task });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { $set: updates }, 
            { new: true, runValidators: true }
        ).populate(populateTaskFields);

        if (!updatedTask) {
            return res.status(404).json({ status: false, message: "Task not found." });
        }

        res.status(200).json({ status: true, message: "Task updated successfully.", data: updatedTask });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ status: false, message: "Task not found." });
        }
        
        

        res.status(200).json({ status: true, message: "Task  deleted successfully." });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ status: false, message: "New status is required." });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { $set: { status: status } }, 
            { new: true, runValidators: true }
        ).populate(populateTaskFields);

        if (!updatedTask) {
            return res.status(404).json({ status: false, message: "Task not found." });
        }

        res.status(200).json({ status: true, message: `Status updated to ${status}.`, data: updatedTask });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const assignTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { assignedTo } = req.body; 

        if (!assignedTo) {
            return res.status(400).json({ status: false, message: "User ID for assignment is required." });
        }
        
        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { $set: { assignedTo: assignedTo } }, 
            { new: true }
        ).populate(populateTaskFields);

        if (!updatedTask) {
            return res.status(404).json({ status: false, message: "Task not found." });
        }

        res.status(200).json({ status: true, message: "Task assigned successfully.", data: updatedTask });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getUserTasks = async (req, res) => {
    try {
        const { id } = req.params; 

        const tasks = await Task.find({ assignedTo: id })
            .populate(populateTaskFields)
            .sort({ dueDate: 1 });

        res.status(200).json({ status: true, count: tasks.length, data: tasks });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};