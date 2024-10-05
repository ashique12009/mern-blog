import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoute from './routes/user.route.js';
import blogRoute from './routes/blog.route.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/assets', express.static('assets'));

// DB connection
try {
    mongoose.connect(MONGO_URI);
    console.log('MongoDB connected'); 
}
catch (error) {
    console.log(error, 'MongoDB connection error!');
}

// Define routes
app.use('/api/users', userRoute);
app.use('/api/blogs', blogRoute);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});