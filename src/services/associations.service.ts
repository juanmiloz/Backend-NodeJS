import UserModel, {UserDocument} from "../models/user.model";
import GroupModel, {GroupDocument} from "../models/group.model";

class AssociationsService {


    /**
     * Add a user to a group.
     * @param user - User document to be added to the group.
     * @param group - Group document to which the user will be added.
     * @returns A success message if the user is added, or an error message if the user is already in the group.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async addUser(user: UserDocument, group: GroupDocument) {
        try {
            const userFound = await UserModel.findOne({ _id: user.id, groups: group.id });
            if (userFound) {
                return "The user is already in the group"
            }

            const resUser = await UserModel.updateOne({_id: user.id}, {$addToSet: {groups: group._id}})
            const resGroup = await GroupModel.updateOne({_id: group.id}, {$addToSet: {users: user._id}})

            if (resUser.modifiedCount === 1 && resGroup.modifiedCount === 1) {
                return "User successfully added to the group"
            }
        } catch (error) {
            throw error
        }
    }


    /**
     * Remove a user from a group.
     * @param user - User document to be removed from the group.
     * @param group - Group document from which the user will be removed.
     * @returns A success message if the user is removed, or an error message if the user is not in the group.
     * @throws Throws an error if there is an issue with the database operation.
     */
    public async removeUser(user: UserDocument, group: GroupDocument) {
        try {
            const userFound = await UserModel.findOne({ _id: user.id, groups: group.id });
            if (!userFound) {
                return "The user is not in the group"
            }

            const resUser = await UserModel.updateOne({_id: user.id}, {$pull: {groups: group._id}})
            const resGroup = await GroupModel.updateOne({_id: group.id}, {$pull: {users: user._id}})

            if (resUser.modifiedCount === 1 && resGroup.modifiedCount === 1) {
                return "User successfully removed from the group"
            }
        } catch (error) {
            throw error
        }

        return true;
    }
}

export default new AssociationsService();