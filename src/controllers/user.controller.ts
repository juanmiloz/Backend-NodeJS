import {Request, Response} from 'express';
import userService from '../services/user.service';
import {UserInput, UserDocument} from '../models/user.model';
import bcrypt from 'bcrypt';
import {GroupDocument} from "../models/group.model";

class UserController {

    /**
     * Creates a new user.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<Response>
     */
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const userExists: UserDocument | null = await userService.findByEmail(req.body.email);
            if(userExists){
                return res.status(400).json({message: "User already exists"});
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user: UserDocument = await userService.create(req.body as UserInput);

            return res.status(201).json(user);

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Retrieves all users.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<Response>
     */
    public  async  findAll(req: Request, res: Response): Promise<Response> {
        try {
            const users: UserDocument[] = await userService.findAll();
            return res.status(200).json(users);
        }catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Retrieves a user by ID.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<>
     */
    public async  findById(req: Request, res: Response) {
        try{
            const user: UserDocument | null = await  userService.findById(req.params.id);
            if(user === null){
                return res.status(404).json({message: "User not found"});
            }
            return res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    /**
     * Updates an existing user.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<>
     */
    public async update(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await  userService.findById(req.params.id);
            if(user === null){
                return res.status(404).json({message: "User not found"});
            }
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const updateUser: UserDocument | null = await userService.update(user, req.body)

            return res.status(200).json(updateUser)
            
        } catch (error) {
            res.status(500).json(error);
        }
    }

    /**
     * Deletes an existing user.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<>
     */
    public async delete(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await  userService.findById(req.params.id);
            if(user === null){
                return res.status(404).json({message: "User not found"});
            }

            const isDeleted: boolean | null = await userService.delete(req.params.id)
            if(isDeleted){
                return res.status(200).json({message: "User deleted succesfully"})
            }
        } catch(error){
            res.status(500).json(error)
        }
    }

    /**
     * Handles user login.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<void>
     */
    public async login(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.findByEmail(req.body.email);
            if(!user){
                return res.status(401).json({message: "Not authorized"});
            }
            const isMatch  = await bcrypt.compare(req.body.password, user.password);

            if(!isMatch){
                return res.status(401).json({message: "Not authorized"});
            }

            const token = await  userService.generateToken(user);

            return res.status(200).send({email:user.email, token})

        } catch (error) {
            res.status(500).json(error);
        }
    }

    /**
     * Retrieves information about groups associated with a user.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns Promise<>
     */
    public async getGroupsInfo(req: Request, res: Response){
        try{
            const user: UserDocument | null = await userService.findById(req.params.id);
            if(user === null){
                return res.status(404).json({message: "User not found"});
            }

            const groupList: GroupDocument[] = await userService.getGroupsInfo(user.groups)
            return res.status(200).json(groupList)
        }catch (error){
            throw error
        }
    }
    
}

export default new UserController();