import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {JwtInfoInterface} from "../interface/jwt.info.interface";


/**
 * Middleware function for authentication.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 * @returns Promise<void>
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if(!token)
            return res.status(401).json({message: "Not Authorized"})

        token = token.replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        req.body.loggedUser = decoded
        next()
    } catch (error) {
        res.status(500).json(error);
    }
}


/**
 * Middleware function for role-based authentication.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 * @returns Promise<void>
 */
export const authRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if(!token)
            return res.status(401).json({message: "Not Authorized"})

        token = token.replace('Bearer ','');
        const decoded: JwtInfoInterface = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtInfoInterface;

        if(decoded.role !== "superadmin")
            return res.status(401).json({message: "Role not Authorized"})

        next()
    } catch (error) {
        res.status(500).json(error);
    }
}