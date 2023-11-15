import mongoose from "mongoose";


export interface GroupInput {
    name: String,
    users: mongoose.Types.ObjectId[]
}

export interface GroupDocument extends GroupInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
}

const groupSchema = new mongoose.Schema({
    name: {type: String, require:true, index: true, unique: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true, collection: "groups"})

const Group = mongoose.model<GroupDocument>("Group", groupSchema);

export default Group;