import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection

        connection.on('connected' , ()=> {
            console.log("Mongo db Connected successfully");
            
        })

        connection.on('error' , (error) => {
            console.log("Mongo db connection error , please make sure database is up and running : " + error);
            process.exit()
        })
    } catch (error) {
        console.log('something went wrong in connecting to db');
    }
}