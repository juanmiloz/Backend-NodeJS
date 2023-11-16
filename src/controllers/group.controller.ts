import {Request, Response} from 'express';
import {GroupDocument, GroupInput} from "../models/group.model";
import groupService from "../services/group.service";
import {UserDocument} from "../models/user.model";

class GroupController {


    /**
     * Creates a new group.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<Response>
     */
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const groupExist: GroupDocument | null = await groupService.findByName(req.body.name);
            if(groupExist){
                return res.status(400).json({message: "Group already exists"});
            }
            const group: GroupDocument = await groupService.create(req.body as GroupInput);

            return res.status(201).json(group);

        } catch (error) {
            return res.status(500).json(error);
        }
    }


    /**
     * Retrieves all groups.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<Response>
     */
    public  async  findAll(req: Request, res: Response): Promise<Response> {
        try {
            const groups: GroupDocument[] = await groupService.findAll();
            return res.status(200).json(groups);
        }catch (error) {
            return res.status(500).json(error);
        }
    }


    /**
     * Updates an existing group.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<void>
     */
    public async update(req: Request, res: Response) {
        try {
            const group: GroupDocument | null = await  groupService.findById(req.params.id);
            if(group === null){
                return res.status(404).json({message: "Group not found"});
            }
            const updateGroup: GroupDocument | null = await groupService.update(group, req.body)

            return res.status(200).json(updateGroup)
            
        } catch (error) {
            res.status(500).json(error);
        }
    }


    /**
     * Deletes an existing group.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<void>
     */
    public async delete(req: Request, res: Response) {
        try {
            const group: GroupDocument | null = await  groupService.findById(req.params.id);
            if(group === null){
                return res.status(404).json({message: "Group not found"});
            }

            const isDeleted: boolean | null = await groupService.delete(req.params.id)
            if(isDeleted){
                return res.status(200).json({message: "Group deleted succesfully"})
            }
        } catch(error){
            res.status(500).json(error)
        }
    }

    /**
     * Retrieves information about users belonging to a group.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<>
     */
    public async getUsersInfo(req:Request, res:Response) {
        try{
            const group: GroupDocument | null = await  groupService.findById(req.params.id);
            if(group === null){
                return res.status(404).json({message: "Group not found"});
            }

            const userList:UserDocument[] = await groupService.getUsersInfo(group.users)
            return res.status(200).json(userList)
        }catch (error){
            res.status(500).json(error)
        }
    }

}

export default new GroupController();