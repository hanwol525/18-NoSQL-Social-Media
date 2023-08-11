const User = require('../models/User');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            if (!users){
                return res.status(404).json('Users not found')
            }
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
            console.error(err);
        };
    },
    // get single user
    async getSingleUser(req, res){
        try {
            const user = await User.findOne( { _id: req.params.userId } );
            if (!user){
                return res.status(404).json('User not found')
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    // create a new user
    async createUser(req, res){
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        };
    },
    // update user by _id
    async updateUser(req, res){
        try {
            const userUpdate = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!userUpdate){
                return res.status(404).json('User not found')
            }
            res.json(userUpdate);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    // delete user by _id
    async deleteUser(req, res){
        try {
            const deleteUser = await User.findOneAndDelete(
                { _id: req.params.userId },
                { $pull: { _id: req.params.userId } },
                { new: true }
            );
            if (!deleteUser) {
                return res.status(404).json('User not found');
            };
            res.json('User successfully deleted');
        } catch (err) {
            res.status(500).json(err)
        };
    },
    // add friend to friends list
    async addFriend(req, res) {
        try {
            const newFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId} },
                { new: true }
            )
            const acceptReq = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.userId } },
                { new: true }
            );
            if (!newFriend || !acceptReq){
                return res.status(404).json('User not found');
            };
            res.json('Friend added');
        } catch (err) {
            res.status(500).json(err);
        };
    },
    // delete friend from friends list
    async deleteFriend(req, res) {
        try {
            const removeFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            const mutualRemove = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.userId } },
                { new: true }
            );
            if (!removeFriend || !mutualRemove ){
                return res.status(404).json('User not found');
            };
        } catch (err) {
            res.status(500).json(err);
        };
    }
};