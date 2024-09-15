import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import multer from 'multer';

import userRoute from './routes/user.route.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: '/tmp/',
    }
));
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

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});