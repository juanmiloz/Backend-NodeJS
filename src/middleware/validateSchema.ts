import {Request, Response, NextFunction} from  'express';
import { AnyZodObject } from 'zod';


/**
 * Middleware function for validating request body against a Zod schema.
 * @param schema - Zod schema to validate the request body.
 * @returns Promise<void>
 */
const validateSchema  = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

export default validateSchema;