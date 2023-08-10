const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new thought
    async postNewThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const userThought = await User.findOneAndUpdate(
                { username: newThought.username },
                { $addToSet: {thoughts: newThought._id} },
                { new: true }
            )

            if (!userThought) {
                return res.status(404).json('User not found')
            }
            res.status(200).json(newThought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // add a new reaction
    async newReaction(req, res){
        try {
            const newReact = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body } },
                { new: true }
            );
            if (!newReact) {
                return res.status(404).json('Thought not found')
            };
            res.status(200).json(newReact);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a reaction
    async deleteReaction(req, res){
        try {
            const reactDelete = { reactions: { _id: req.params.reactId }}
            const deletePost = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactDelete } },
                { new: true }
            )

            if (!deletePost){
               return res.status(404).json('Thought not found')
            };

            res.status(200).json('Post deleted')
        } catch (err) {
            res.status(500).json(err);
        }
    }
}