import express from 'express'
import { login, register, logout, myProfile, allAdmins } from '../controllers/user.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.get('/my-profile', isAuthenticated, myProfile);
router.get('/admins', isAuthenticated, isAdmin('admin'), allAdmins);

export default router;