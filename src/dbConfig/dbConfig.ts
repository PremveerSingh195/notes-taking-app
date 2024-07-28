import mongoose, { mongo } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!)
    } catch (error) {
        console.log('something went wrong in connecting to db');
    }
}