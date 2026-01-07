import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { addMembers, calculateProjectProgress, createProject, deleteProject, getProjectDetails, getProjectTaskOverview, getUserProjects, listAllProjects, removeMember, updateProject } from '../controllers/project.controller.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { hasPermission } from '../middlewares/permissionMiddleware.js';

const router = express.Router();




router.post('/', protect, hasPermission('manage_project'), createProject);
router.get('/', protect, listAllProjects);
router.get('/:id'   , protect, getProjectDetails);
router.put('/:id', protect,hasPermission('manage_project'), updateProject);
router.delete('/:id', protect, hasPermission('manage_project'),deleteProject);
router.post('/:id/members', protect, hasPermission('manage_project'), addMembers);
router.delete('/:id/members/:userId', protect,hasPermission('manage_project'), removeMember);
router.get('/users/:id/projects', protect, getUserProjects);
router.put('/progress/:projectId', protect, calculateProjectProgress);


router.get("/user-overview/:userId", protect, getProjectTaskOverview);
export default router;


 