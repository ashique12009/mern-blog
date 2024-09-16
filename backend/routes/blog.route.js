import express from 'express'
import { createBlog } from '../controllers/blog.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

router.post('/create', isAuthenticated, createBlog);

export default router;