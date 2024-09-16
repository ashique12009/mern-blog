import express from 'express'
import { createBlog, deleteBlog } from '../controllers/blog.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/authUser.js';

const router = express.Router();

router.post('/create', isAuthenticated, isAdmin('admin'), createBlog);
router.delete('/delete/:id', isAuthenticated, isAdmin('admin'), deleteBlog);

export default router;