import mongoose from "mongoose";


/**
 * Interface representing the input data for creating a group.
 */
export interface GroupInput {
    name: String,
    users: mongoose.Types.ObjectId[]
}

/**
 * Interface representing a MongoDB document for the 'groups' collection.
 */
export interface GroupDocument extends GroupInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
}

// Define the group schema
const groupSchema = new mongoose.Schema({
    name: {type: String, require:true, index: true, unique: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true, collection: "groups"})


// Create the Group model
const Group = mongoose.model<GroupDocument>("Group", groupSchema);

export default Group;