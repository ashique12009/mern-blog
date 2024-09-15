import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRoute from './routes/user.route.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

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