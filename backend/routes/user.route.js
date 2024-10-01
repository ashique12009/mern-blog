import express from 'express'
import { login, register, logout, myProfile, allAdmins, allAdminsGuest } from '../controllers/user.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';

import upload from '../middleware/multerConfig.js'; // Multer config

const router = express.Router();

router.post('/register', upload.single('photo'), register);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.get('/my-profile', isAuthenticated, myProfile);
router.get('/admins', isAuthenticated, isAdmin('admin'), allAdmins);
router.get('/admins-guest', allAdminsGuest);

export default router;