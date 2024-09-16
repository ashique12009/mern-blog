import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlog, myBlogs, updateBlog } from '../controllers/blog.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/authUser.js';

const router = express.Router();

router.post('/create', isAuthenticated, isAdmin('admin'), createBlog);
router.delete('/delete/:id', isAuthenticated, isAdmin('admin'), deleteBlog);
router.get('/all-blogs', getAllBlogs);
router.get('/blog/:id', getBlog);
router.get('/myblogs/:id', isAuthenticated, myBlogs);
router.put('/update/:id', isAuthenticated, isAdmin('admin'), updateBlog);

export default router;