import {Request, Response} from "express";
import {GroupDocument} from "../models/group.model";
import groupService from "../services/group.service";
import {UserDocument} from "../models/user.model";
import userService from "../services/user.service";
import associationsService from "../services/associations.service";


class AssociationsController {

    /**
     * Adds a user to a group.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<Response<>>
     */
    public async addUser(req: Request, res: Response) {
        try {
            const group: GroupDocument | null = await groupService.findById(req.params.groupID);
            if (group === null) {
                return res.status(404).json({message: "Group not found"});
            }

            const user: UserDocument | null = await userService.findById(req.params.userID);
            if (user === null) {
                return res.status(400).json({message: "User not found"});
            }

            const answer = await associationsService.addUser(user, group);
            return res.status(200).json({message: answer})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    /**
     * Removes a user from a group.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<Response<>>
     */
    public async removeUser(req: Request, res: Response) {
        try {
            const group: GroupDocument | null = await groupService.findById(req.params.groupID);
            if (group === null) {
                return res.status(404).json({message: "Group not found"});
            }

            const user: UserDocument | null = await userService.findById(req.params.userID);
            if (user === null) {
                return res.status(400).json({message: "User not found"});
            }

            const answer = await associationsService.removeUser(user, group);
            return res.status(200).json({message: answer})

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default new AssociationsController();