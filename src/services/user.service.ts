import UserModel, {UserInput, UserDocument} from "../models/user.model";
import jwt  from "jsonwebtoken";
import mongoose from "mongoose";
import {GroupDocument} from "../models/group.model";
import groupService from "./group.service";

class UserService {


    /**
     * Create a new user.
     * @param userInput - Input data for creating the user.
     * @returns The created user document.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async create(userInput: UserInput): Promise<UserDocument> {
      try {
        const user = await UserModel.create(userInput);
        return user;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Find a user by email.
     * @param email - Email of the user to be found.
     * @returns The user document if found, or null if not found.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async findByEmail(email: string): Promise<UserDocument | null> {
        try {
            const userExists = await UserModel.findOne({email});
            return userExists;
        } catch (error) {
            throw error 
        }
    }


    /**
     * Find a user by ID.
     * @param id - ID of the user to be found.
     * @returns The user document if found, or null if not found.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async findById(id: string): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw error 
        }        
    }


    /**
     * Find all users.
     * @returns An array of user documents.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async findAll(): Promise<UserDocument[]> {
        try {
            const users = await UserModel.find();
            return users;
        }  catch (error) {
            throw error;
        }
    }


    /**
     * Update an existing user.
     * @param user - User document to be updated.
     * @param data - Updated data for the user.
     * @returns The updated user document.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async update(user: UserDocument, data: UserInput): Promise<UserDocument | null> {
        try {
            const userUpdate: UserDocument | null = await UserModel.findOneAndUpdate({_id: user.id}, data,{new: true});

            return userUpdate;

        }  catch (error) {
            throw error;
        }        

    }


    /**
     * Delete a user by ID.
     * @param id - ID of the user to be deleted.
     * @returns True if the user is successfully deleted, null if the user is not found.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async delete(id: string): Promise<boolean | null> {
        try {
            return UserModel.deleteOne({_id: id}).then((res)=>{
                if(res.deletedCount === 1){
                    return true
                }else{
                    return null
                }
            });
        }  catch (error) {
            throw error;
        }   
    }


    /**
     * Generate a JWT token for a user.
     * @param user - User document for which the token will be generated.
     * @returns The generated JWT token.
     * @throws Throws an error if there is an issue with the token generation.
     */
    public async generateToken(user: UserDocument): Promise<String> {
        try {
            const token = await jwt.sign({user_id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET || 'secret', {expiresIn: "10m"});

            return token;
        } catch (error) {
            throw error;            
        }
    }


    /**
     * Get information about groups a user belongs to.
     * @param groupIds - Array of group IDs in which the user is a member.
     * @returns An array of group documents for the user.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async getGroupsInfo(groupIds: mongoose.Types.ObjectId[]) {
        try {
            let listGroups: GroupDocument[] = [];

            await Promise.all(groupIds.map(async (groupId) => {
                const user = await groupService.findById(groupId.toString());
                if (user !== null) {
                    listGroups.push(user);
                }
            }));

            return listGroups;
        } catch (error) {
            throw error
        }
    }

}

export default new UserService();