import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectionString  = process.env.MONGO_URI || "mongodb+srv://juanmiloz:Password@tallerbackweb.gzwu5re.mongodb.net/web";
                          

export const  db = mongoose.connect(connectionString)
                            .then((res) => {
                                console.log("Connected to MongoDb");
                            }).catch((err) => {
                                console.log('Connection error')
                                console.log(err);
                            }); 