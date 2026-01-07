

import express from "express";
import { generateExceptionToken, approveTokenDirectly, getRequestStatus, logExceptionRequest, listPendingRequests, rejectTokenManual, approveTokenManual } from "../controllers/exception.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/request", protect, generateExceptionToken);

router.get("/status/:requestId", protect, getRequestStatus);

router.get("/direct-approve/:requestId", protect, approveTokenDirectly); 


router.post("/log/request",protect,logExceptionRequest);

router.get("/request-list",protect,listPendingRequests)

router.put("/approve/manual/:requestId", protect,approveTokenManual);
router.put("/reject/manual/:requestId",protect,rejectTokenManual);
export default router;