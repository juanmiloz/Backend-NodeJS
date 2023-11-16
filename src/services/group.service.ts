import GroupModel, {GroupDocument, GroupInput} from '../models/group.model'
import {UserDocument} from "../models/user.model";
import userService from "./user.service";
import mongoose from "mongoose";
import {type} from "os";


class GroupService {

    /**
     * Create a new group.
     * @param groupInput - Input data for creating the group.
     * @returns The created group document.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async create(groupInput: GroupInput): Promise<GroupDocument> {
        try {
            const group = await GroupModel.create(groupInput);
            return group;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Update an existing group.
     * @param user - Group document to be updated.
     * @param data - Updated data for the group.
     * @returns The updated group document.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async update(user: GroupDocument, data: GroupInput): Promise<GroupDocument | null> {
        try {
            const groupUpdate: GroupDocument | null = await GroupModel.findOneAndUpdate({_id: user.id}, data, {new: true});
            return groupUpdate;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Delete a group by ID.
     * @param id - ID of the group to be deleted.
     * @returns True if the group is successfully deleted, null if the group is not found.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async delete(id: string): Promise<boolean | null> {
        try {
            return GroupModel.deleteOne({_id: id}).then((res) => {
                if (res.deletedCount === 1) {
                    return true
                } else {
                    return null
                }
            });
        } catch (error) {
            throw error;
        }
    }


    /**
     * Find a group by name.
     * @param name - Name of the group to be found.
     * @returns The group document if found, or null if not found.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async findByName(name: string): Promise<GroupDocument | null> {
        try {
            const groupExist = await GroupModel.findOne({name});
            return groupExist;
        } catch (error) {
            throw error
        }
    }


    /**
     * Find a group by ID.
     * @param id - ID of the group to be found.
     * @returns The group document if found, or null if not found.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async findById(id: string): Promise<GroupDocument | null> {
        try {
            const group = await GroupModel.findById(id);
            return group;
        } catch (error) {
            throw error
        }
    }


    /**
     * Find all groups.
     * @returns An array of group documents.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async findAll(): Promise<GroupDocument[]> {
        try {
            const groups = await GroupModel.find();
            return groups;
        } catch (error) {
            throw error
        }
    }


    /**
     * Get information about users in a group.
     * @param userIds - Array of user IDs in the group.
     * @returns An array of user documents in the group.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async getUsersInfo(userIds: mongoose.Types.ObjectId[]) {
        try {
            let listUser: UserDocument[] = [];

            await Promise.all(userIds.map(async (userId) => {
                const user = await userService.findById(userId.toString());
                if (user !== null) {
                    listUser.push(user);
                }
            }));

            return listUser;
        } catch (error) {
            throw error
        }
    }

}

export default new GroupService();