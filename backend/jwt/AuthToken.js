import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const createTokenAndSaveCookie = async (userId, response) => {
    const token = jwt.sign(
        { userId }, 
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
    );

    // Set JWT as a cookie in the browser
    response.cookie('jwt', token, {
        httpOnly: false,      // Prevent client-side JS from accessing the token
        sameSite: 'none',    // Allow cross-origin requests
        secure: true,        // Ensure the cookie is only sent over HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });

    await User.findByIdAndUpdate(userId, { token });
    return token;
}

export default createTokenAndSaveCookie;