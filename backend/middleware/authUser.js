import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Authentication
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        req.user = user;

        next();
    } 
    catch (error) {
        console.log(error, 'Error authenticating user');    
    }
}