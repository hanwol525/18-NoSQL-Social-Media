const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            if (!thoughts){
                return res.status(404).json('Thoughts not found')
            }
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    // get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought){
                return res.status(404).json('Thought not found')
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    // create a new thought
    async postNewThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const userThought = await User.findOneAndUpdate(
                { username: newThought.username },
                { $addToSet: {thoughts: newThought._id} },
                { new: true }
            );
            if (!userThought) {
                return res.status(404).json('User not found')
            };
            res.json(newThought);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    // update thought by id
    async updateThought(req, res) {
        try {
            const thoughtUpdate = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thoughtUpdate)  {
                return res.status(404).json('Thought not found')
            };
            res.json(thoughtUpdate);
        } catch (err) {
            res.status(500).json(err)
        };
    },
    // delete thought by id
    async deleteThought(req, res) {
        try {
            const thoughtDelete = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { $pull: { _id: req.params.thoughtId } },
                { new: true }
            );
            const fromUser = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            );
            if (!thoughtDelete){
                return res.status(404).json('Thought not found');
            } else if (!fromUser){
                return res.status(404).json('Thought found, but no user');
            };
            res.json('Thought successfully deleted');
        } catch (err) {
            res.status(500).json(err)
        };
    },
    // add a new reaction
    async newReaction(req, res){ 
        try {
            const newReact = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            if (!newReact) {
                return res.status(404).json('Thought not found');
            };
            res.json(newReact);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a reaction
    async deleteReaction(req, res){
        try {
            const reactDelete = { reactions: { reactionId: req.params.reactionId }}
            const deletePost = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: reactDelete },
                { new: true }
            );
            if (!reactDelete){
                return res.status(404).json('Reaction not found');
            };
            if (!deletePost){
               return res.status(404).json('Thought not found');
            };
            res.json('Reaction successfully deleted');
        } catch (err) {
            res.status(500).json(err);
        };
    }
};