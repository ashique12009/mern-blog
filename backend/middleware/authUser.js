import {} from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Authentication
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        
        next();
    } 
    catch (error) {
        console.log(error, 'Error authenticating user');    
    }
}