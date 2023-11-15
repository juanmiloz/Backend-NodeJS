import GroupModel, {GroupDocument, GroupInput} from '../models/group.model'
import {UserDocument} from "../models/user.model";
import userService from "./user.service";
import mongoose from "mongoose";
import {type} from "os";


class GroupService {

    public async create(groupInput: GroupInput): Promise<GroupDocument> {
        try {
            console.log(groupInput)
            const group = await GroupModel.create(groupInput);
            return group;
        } catch (error) {
            throw error;
        }
    }

    public async update(user: GroupDocument, data: GroupInput): Promise<GroupDocument | null> {
        try {
            const groupUpdate: GroupDocument | null = await GroupModel.findOneAndUpdate({_id: user.id}, data, {new: true});
            return groupUpdate;
        } catch (error) {
            throw error;
        }
    }

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

    public async findByName(name: string): Promise<GroupDocument | null> {
        try {
            const groupExist = await GroupModel.findOne({name});
            return groupExist;
        } catch (error) {
            throw error
        }
    }


    public async findById(id: string): Promise<GroupDocument | null> {
        try {
            const group = await GroupModel.findById(id);
            return group;
        } catch (error) {
            throw error
        }
    }

    public async findAll(): Promise<GroupDocument[]> {
        try {
            const groups = await GroupModel.find();
            return groups;
        } catch (error) {
            throw error
        }
    }

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