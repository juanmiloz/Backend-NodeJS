import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Configure dotenv to load environment variables from the .env file
dotenv.config();

// Get the connection string from the environment variable or use a default one if not present
const connectionString  = process.env.MONGO_URI || "mongodb+srv://juanmiloz:Password@tallerwebback.lgxfiwi.mongodb.net/TallerWebBack"


// Connect to the MongoDB database
export const  db = mongoose.connect(connectionString)
                            .then((res) => {
                                console.log("Connected to MongoDb");
                            }).catch((err) => {
                                console.log('Connection error')
                                console.log(err);
                            }); 