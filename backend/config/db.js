// backend/config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            console.error('Error: MONGO_URI is not defined in .env file!');
            process.exit(1); // ออกจากการทำงานของ Process ถ้าไม่มี MONGO_URI
        }

        const conn = await mongoose.connect(mongoUri);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // ออกจากการทำงานของ Process เมื่อเชื่อมต่อล้มเหลว
    }
};

export default connectDB;