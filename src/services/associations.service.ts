import UserModel, {UserDocument} from "../models/user.model";
import GroupModel, {GroupDocument} from "../models/group.model";

class AssociationsService {

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
            console.log('error')
            throw error
        }
    }

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