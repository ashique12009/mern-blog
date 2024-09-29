import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/AuthToken.js";
import path from 'path';
import fs from 'fs';

export const register = async (req, res) => {
    try {
        const {email, name, password, phone, education, role} = req.body;

        // Validation
        if (!name || !email || !password || !phone || !education || !role) {
            return res.status(400).json({message: 'Please enter all fields'});
        }

        // Check if user exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 7);

        // Handle photo upload (if provided)
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            photo: photoPath, // Get the path of the uploaded image, Save it in MongoDB
            education,
            role
        });

        // Save user
        const savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(500).json({message: 'Failed to save user'});
        }

        const token = await createTokenAndSaveCookie(savedUser._id, res);

        return res.status(201).json({message: 'User created successfully', user: savedUser, token: token});
    } 
    catch (error) {
        console.log(error, 'Error creating user');
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        
        // Validation
        if (!email || !password || !role) {
            return res.status(400).json({message: 'Please enter all fields'});
        }

        // Check if user exists
        const existingUser = await User.findOne({email}).select('+password');
        if (!existingUser) {
            return res.status(200).json({message: 'User does not exist'});
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({message: 'Invalid credentials', success: false});
        }

        // Chcek role
        if (existingUser.role !== role) {
            return res.status(400).json({message: 'Invalid role'});
        }

        const token = await createTokenAndSaveCookie(existingUser._id, res);
        return res.status(200).json({message: 'Login successful', user: existingUser, token: token, success: true});
    }
    catch (error) {
        console.log(error, 'Error logging in');
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({message: 'Logout successful'});
    } 
    catch (error) {
        console.log(error, 'Error logging out');
        return res.status(500).json({message: 'Internal server error'});
    }   
}

export const myProfile = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({message: 'User profile fetched successfully', user});
    } 
    catch (error) {
        console.log(error, 'Error fetching user');
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const allAdmins = async (req, res) => {
    try {
        const admins = await User.find({role: 'admin'});
        return res.status(200).json({message: 'Admins fetched successfully', admins});
    } 
    catch (error) {
        console.log(error, 'Error fetching admins');
        return res.status(500).json({message: 'Internal server error'});
    }
}