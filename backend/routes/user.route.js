import express from 'express'
import { login, register, logout } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);

export default router;