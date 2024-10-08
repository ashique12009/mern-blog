import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Construct __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBlog = async (req, res) => {
    try {
        const {title, category, about} = req.body;

        // Validation
        if (!title || !category) {
            return res.status(400).json({message: 'Please enter all fields', success: false});
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo;
        const createdBy = req?.user?._id;

        // Handle photo upload (if provided)
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }

        const blogData = {
            title,
            blogImage: photoPath,
            category,
            about,
            adminName,
            adminPhoto,
            createdBy
        };

        // Save blog
        const blog = await Blog.create(blogData);

        return res.status(201).json({message: 'Blog created successfully', blog, success: true});
    } 
    catch (error) {
        console.log(error, 'Error creating blog');
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        // Construct the correct file path
        const imagePath = path.join(__dirname, '..', blog.blogImage);

        // Delete physical photo
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log('File deletion error', err);
                } 
                else {
                    console.log('File deleted successfully:', imagePath);
                }
            });
        } 
        else {
            console.log('File not found at:', imagePath);
        }

        return res.status(200).json({message: 'Blog deleted successfully', blog, success: true});
    }
    catch (error) {
        console.log(error, 'Error deleting blog');
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json({message: 'Blogs fetched successfully', blogs});
    }
    catch (error) {
        console.log(error, 'Error fetching blogs');
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const getBlog = async (req, res) => {
    try {
        console.log('REQ PARAMS',req.params);
        const {id} = req.params;

        // Validate the id format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Invalid blog id'});
        }

        const blog = await Blog.findById(id);
        
        if (!blog) {
            return res.status(404).json({message: 'Blog not found'});
        }

        return res.status(200).json({message: 'Blog fetched successfully', blog});
    }
    catch (error) {
        console.log(error, 'Error fetching blog');
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const myBlogs = async (req, res) => {
    try {
        const {id} = req.params;

        // Validate the id format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Invalid user id'});
        }

        const blogs = await Blog.find({createdBy: id});
        return res.status(200).json({message: 'Blogs fetched successfully', blogs});
    }
    catch (error) {
        console.log(error, 'Error fetching blogs');
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const updateBlog = async (req, res) => {
    try {
        const {id} = req.params;

        // Validate the id format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Invalid blog id'});
        }

        const {title, blogImage, category, about, photo, education, role} = req.body;

        // Validation
        if (!title || !category) {
            return res.status(400).json({message: 'Please enter all fields'});
        }

        // Construct updateData
        const updateData = {
            title,
            category,
            about
        }

        // Handle photo upload (if provided)
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
            updateData.blogImage = photoPath;
        }

        const updateBlog = await Blog.findByIdAndUpdate(id, updateData, {new: true});
        return res.status(200).json({message: 'Blog updated successfully', updateBlog, success: true});
    }
    catch (error) {
        console.log(error, 'Error updating blog');
        return res.status(500).json({message: 'Internal server error'});
    }
}