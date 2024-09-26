import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        default: '/assets/pp.png'
    },
    category: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true,
        maxlength: 500
    },
    adminName: {
        type: String,
        // required: true
    },
    adminPhoto: {
        type: String,
        default: '/assets/pp.png'
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Blog = mongoose.model('Blog', blogSchema);