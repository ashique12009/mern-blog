import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const createTokenAndSaveCookie = async (userId, response) => {
    const token = jwt.sign(
        { userId }, 
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
    );

    response.cookie('jwt', token, {
        httpOnly: true, // protect from XSS
        sameSite: 'strict', // protect from CSRF
        secure: true, // only send cookie over https
        maxAge: 24 * 60 * 60 * 1000
    });

    await User.findByIdAndUpdate(userId, { token });
    return token;
}

export default createTokenAndSaveCookie;