

import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";

import { httpServer, port } from "./src/app.js"; 

dotenv.config();
connectDB();





httpServer.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});