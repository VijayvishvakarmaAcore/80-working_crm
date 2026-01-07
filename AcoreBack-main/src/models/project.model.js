



import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    startDate: { 
        type: Date 
    },
    endDate: { 
        type: Date 
    },
    priority: { 
        type: String, 
        // enum: ["low", "medium", "high"], 
        default: "medium" 
    },
    

    projectStatus: { 
        type: String, 
        enum: ['Initiated', 'Active', 'On Hold', 'Completed', 'Cancelled'],
        default: 'Initiated',
    },
    
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }],
    clientName: { 
        type: String,
        trim: true,
        default: null
    },
    registeredClients: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }],

    budget:{
        type: String,

    },
    progressPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        // Calculated based on task completion (Task Count or Weighted)
    },
    estimatedBudgetHours: {
        type: Number,
        min: 0,
        default: 0,
        // Sum of all estimated task hours for the entire project
    },
    actualBudgetHours: {
        type: Number,
        min: 0,
        default: 0,
        // Sum of all actual hours logged against child tasks
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);