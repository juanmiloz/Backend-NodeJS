import {object, string} from 'zod';


/**
 * Zod schema for validating the request body when creating or updating a group.
 */
export const groupSchema = object({
    name: string({required_error: "Name is required"}),
});