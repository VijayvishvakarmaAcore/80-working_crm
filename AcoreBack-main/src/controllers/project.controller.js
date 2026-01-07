import Project from '../models/project.model.js';
import User from '../models/user.model.js';
import Task from "../models/task.model.js"
import mongoose, { Mongoose } from 'mongoose';
import moment from 'moment-timezone';

const populateProjectFields = [
    { path: 'createdBy', select: 'name employeeId' },
    { path: 'members', select: 'name employeeId profilePicture' },
    { path: 'registeredClients', select: 'name employeeId profilePicture email' }
];

export const createProject = async (req, res) => {
    try {
        const { 
            name, description, startDate, endDate, priority, status, 
            members, 
            registeredClients, 
            clientName ,
            budget
        } = req.body;
        
        const createdBy = req.user.id; 

        if (!name || !createdBy) {
            return res.status(400).json({ status: false, message: "Project name and creator are required." });
        }

        const project = await Project.create({
            name,
            description,
            startDate,
            endDate,
            priority,
            status,
            createdBy,
            members: [createdBy, ...(members || [])],
            registeredClients: registeredClients || [],
            clientName: clientName || null,
            budget  
        });

        res.status(201).json({ status: true, message: "Project created successfully.", data: project });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const listAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate(populateProjectFields)
            .sort({ createdAt: -1 });

        res.status(200).json({ status: true, count: projects.length, data: projects });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getProjectDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id)
            .populate(populateProjectFields);

        if (!project) {
            return res.status(404).json({ status: false, message: "Project not found." });
        }

        res.status(200).json({ status: true, data: project });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedProject = await Project.findByIdAndUpdate(
            id, 
            { $set: updates }, 
            { new: true, runValidators: true }
        ).populate(populateProjectFields);

        if (!updatedProject) {
            return res.status(404).json({ status: false, message: "Project not found." });
        }
        
        res.status(200).json({ status: true, message: "Project updated successfully.", data: updatedProject });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ status: false, message: "Project not found." });
        }
        
        res.status(200).json({ status: true, message: "Project deleted successfully." });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const addMembers = async (req, res) => {
    try {
        const { id } = req.params;
        const { memberIds = [], clientIds = [] } = req.body; 

        if (memberIds.length === 0 && clientIds.length === 0) {
            return res.status(400).json({ status: false, message: "Member or Client IDs are required." });
        }
        
        const updates = {};
        if (memberIds.length > 0) {
            updates.$addToSet = { members: { $each: memberIds } };
        }
        if (clientIds.length > 0) {
            updates.$addToSet = { ...(updates.$addToSet || {}), registeredClients: { $each: clientIds } }; 
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        ).populate(populateProjectFields);

        if (!updatedProject) {
            return res.status(404).json({ status: false, message: "Project not found." });
        }

        res.status(200).json({ status: true, message: "Members/Clients added successfully.", data: updatedProject });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const removeMember = async (req, res) => {
    try {
        const { id, userId } = req.params;
        
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { 
                $pull: { 
                    members: userId, 
                    registeredClients: userId 
                } 
            },
            { new: true }
        ).populate(populateProjectFields);

        if (!updatedProject) {
            return res.status(404).json({ status: false, message: "Project not found." });
        }

        res.status(200).json({ status: true, message: "User removed successfully from project.", data: updatedProject });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getUserProjects = async (req, res) => {
    try {
        const { id } = req.params; 

        const projects = await Project.find({ $or: [{ members: id }, { registeredClients: id }] })
            .populate(populateProjectFields)
            .sort({ createdAt: -1 });

        res.status(200).json({ status: true, count: projects.length, data: projects });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


export const calculateProjectProgress = async (req, res) => {

    try{

        const {projectId} = req.params;

        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return res.status(400).json({ status: false, message: "Invalid Project ID format." });
        }

        const tasks = await Task.find({projectId});

        if (tasks.length === 0) {
            
            await Project.findByIdAndUpdate(projectId, { $set: { progressPercentage: 0 } });
            return res.status(200).json({ status: true, progress: 0, message: "Project has no tasks defined." });
        }

        const totalTasks = tasks.length;
        let completedTasks =0;

        tasks.forEach(task =>{
            if(task.status === 'done'){
                completedTasks++;
            }
        });

        const projectProgress = Math.round((completedTasks / totalTasks) * 100);

        const updatedProject = await Project.findByIdAndUpdate(projectId,{ $set: { progressPercentage: projectProgress } },
            { new: true })

            if(!updateProject) {
          return res.status(404).json({ status: false, message: "Project not found." });
            }

            res.status(200).json({
                status:true,
           progress: projectProgress,
           details: {
                totalTasks: totalTasks,
                completedTasks: completedTasks,
            },
            message: `Project progress updated to ${projectProgress}% based on task count.`
            })

    }catch(error){
        console.error("Calculate Project Progress Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
}



export const getProjectTaskOverview = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ status: false, message: "Invalid ID format" });
        }

        const user = await User.findById(userId).select("name employeeId email");
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const overview = await Project.aggregate([
            { 
             
                $match: { members: new mongoose.Types.ObjectId(userId) } 
            },
            {
                
                $lookup: {
                    from: "tasks", 
                    let: { projId: "$_id" },
                    pipeline: [
                        { 
                            $match: { 
                                $expr: { 
                                    $and: [
                                        { $eq: ["$projectId", "$$projId"] },
                                        { $eq: ["$assignedTo", new mongoose.Types.ObjectId(userId)] }
                                    ]
                                } 
                            } 
                        }
                    ],
                    as: "userTasks"
                }
            },
            {
              
                $addFields: {
                    totalAssignedTasks: { $size: "$userTasks" },
                    completedTasks: {
                        $size: {
                            $filter: {
                                input: "$userTasks",
                                as: "t",
                                cond: { $in: ["$$t.status", ["done", "complete"]] }
                            }
                        }
                    },
                    totalEstimatedHours: { $sum: "$userTasks.estimatedHours" },
                    totalActualHours: { $sum: "$userTasks.actualHours" }
                }
            },
            {
          
                $addFields: {
                    userProgressPercentage: {
                        $cond: [
                            { $gt: ["$totalAssignedTasks", 0] },
                            { $multiply: [{ $divide: ["$completedTasks", "$totalAssignedTasks"] }, 100] },
                            0
                        ]
                    }
                }
            },
            {
              
                $project: { members: 0, registeredClients: 0, __v: 0 }
            }
        ]);

        res.status(200).json({
            status: true,
            employee: user,
            projectCount: overview.length,
            overview: overview
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};



const getOverviewData = async (userId, startDate, daysCount) => {
    return await Project.aggregate([
        { 
            $match: { members: new mongoose.Types.ObjectId(userId) } 
        },
        {
            $lookup: {
                from: "tasks",
                let: { projId: "$_id" },
                pipeline: [
                    { 
                        $match: { 
                            $expr: { 
                                $and: [
                                    { $eq: ["$projectId", "$$projId"] },
                                    { $eq: ["$assignedTo", new mongoose.Types.ObjectId(userId)] },
                                    { $gte: ["$updatedAt", startDate] } // Only tasks touched in this period
                                ]
                            } 
                        } 
                    }
                ],
                as: "userTasks"
            }
        },
        {
            $addFields: {
                projectTaskCount: { $size: "$userTasks" },
                projectCompletedTasks: {
                    $size: {
                        $filter: {
                            input: "$userTasks",
                            as: "t",
                            cond: { $in: ["$$t.status", ["done", "complete"]] }
                        }
                    }
                },
                projectTotalHours: { $sum: "$userTasks.actualHours" }
            }
        }
    ]);
};

// --- WEEKLY OVERVIEW ---
export const getWeeklyProjectOverview = async (req, res) => {
    try {
        const { userId } = req.params;
        const startOfWeek = moment().startOf('week').toDate();
        
        const projects = await getOverviewData(userId, startOfWeek);
        
        const totalHours = projects.reduce((acc, p) => acc + p.projectTotalHours, 0);
        const completedTasks = projects.reduce((acc, p) => acc + p.projectCompletedTasks, 0);

        res.status(200).json({
            status: true,
            timeframe: "week",
            metrics: {
                totalHours: totalHours,
                averageDailyHours: (totalHours / 7).toFixed(2),
                completedTasks: completedTasks
            },
            projects
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// --- MONTHLY OVERVIEW ---
export const getMonthlyProjectOverview = async (req, res) => {
    try {
        const { userId } = req.params;
        const startOfMonth = moment().startOf('month').toDate();
        const daysInMonth = moment().daysInMonth();

        const projects = await getOverviewData(userId, startOfMonth);

        const totalHours = projects.reduce((acc, p) => acc + p.projectTotalHours, 0);
        const completedTasks = projects.reduce((acc, p) => acc + p.projectCompletedTasks, 0);

        res.status(200).json({
            status: true,
            timeframe: "month",
            metrics: {
                totalHours: totalHours,
                averageDailyHours: (totalHours / daysInMonth).toFixed(2),
                completedTasks: completedTasks
            },
            projects
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}; 