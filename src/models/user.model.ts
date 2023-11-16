import  mongoose from "mongoose";


/**
 * Interface representing the input data for creating a user.
 */
export  interface UserInput {
    name: string;
    email: string;
    password: string;
    role: string;
    groups: mongoose.Types.ObjectId[];
}


/**
 * Interface representing a MongoDB document for the 'users' collection.
 */
export  interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
}


// Define the user schema
const userSchema = new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, index: true, unique: true},
        password: {type: String, required: true},
        role: {type: String},
        groups: [{type: mongoose.Schema.Types.ObjectId, ref: "Group"}]
    }, {timestamps: true, collection: "users"});


// Set a default value for the "role" field before saving the document
userSchema.pre("save", function (next) {
    this.role = "user";
    next();
});


// Create the User model
const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
