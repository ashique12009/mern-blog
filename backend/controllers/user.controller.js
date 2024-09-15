import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const {email, name, password, phone, photo, education, role} = req.body;

        // Validation
        if (!name || !email || !password || !phone || !photo || !education || !role) {
            return res.status(400).json({message: 'Please enter all fields'});
        }

        // Check if user exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            photo,
            education,
            role
        });

        // Save user
        const savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(500).json({message: 'Failed to save user'});
        }

        return res.status(201).json({message: 'User created successfully', user: savedUser});
    } 
    catch (error) {
        console.log(error, 'Error creating user');
        return res.status(500).json({message: 'Internal server error'});
    }
}