import { Blog } from "../models/blog.model.js";

export const createBlog = async (req, res) => {
    try {
        const {title, blogImage, category, about, photo, education, role} = req.body;

        // Validation
        if (!title || !blogImage || !category) {
            return res.status(400).json({message: 'Please enter all fields'});
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo;
        const createdBy = req?.user?._id;

        const blogData = {
            title,
            blogImage,
            category,
            about,
            adminName,
            adminPhoto,
            createdBy
        };

        // Save blog
        const blog = await Blog.create(blogData);

        return res.status(201).json({message: 'Blog created successfully', blog});
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
        return res.status(200).json({message: 'Blog deleted successfully', blog});
    }
    catch (error) {
        console.log(error, 'Error deleting blog');
        return res.status(500).json({message: 'Internal server error'});
    }
}