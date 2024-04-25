const Reaction = require('../models/Reactions')
const Thoughts = require('../models/Thoughts')
const User = require('../models/User')

module.exports = {

    //finding all thoughts by users
    allThoughts: async (req, res) => {
        try {
            const allThoughts = await
                Thoughts.find()
                    .then((allThoughts) => {
                        res.status(200).json(allThoughts)
                    })
        } catch (err) {
            res.status(500).json({ message: 'Unable to find all thoughts.' })
        }
    },

    // finding a single thought by a user
    // finding one thought by a user from parameter
    //show the reactions to this single thought
    singleThought: async (req, res) => {
        try {
            const singleThought = await
                Thoughts.findOne({ _id: req.params.thoughtId })
                    .populate('reactions')
                    .then((singleThought) => {
                        res.status(200).json(singleThought)
                    })
        } catch (err) {
            res.status(500).json({ message: 'Unable to find single thought.' })
        }
    },

    // creating a thought for a single user by user ID
    // Creating thought though json Body
    //then finding single user from their userID
    // then pushing the new thought into the user's thoughts array
    //running validator for update and confirm its new
    createThought: async (req, res) => {
        try {
            const createThought = await
                Thoughts.create(req.body)
            await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: createThought.id } },
                { runValidators: true, new: true }
            )
            res.status(200).json(createThought);
        } catch (err) {
            res.status(500).json({ message: 'There was a problem creating a new thought.' });
        }
    },


    // updating a single thought
    //finding a single thought and updating it
    //locate thought by thought ID in params
    //update thought within the json body
    //run validator because update, confirming change is new
    updateThought: async (req, res) => {
        try {
            const updateThought = await
                Thoughts.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $set: req.body },
                    { runValidators: true, new: true })
            res.status(200).json(updateThought)
        } catch (err) {
            res.status(500).json({ message: 'There was a problem updating thought.' })
        }
    },

    //deleting thought
    //finding a single thought using thoughtId 
    // Once single thought, find user who has thought, delete it from user
    deleteThought: async (req, res) => {
        try {
            const deleteThought = await
                Thoughts.findOneAndDelete(
                    { _id: req.params.thoughtId },
                    await User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } })
                )
            res.status(200).json(deleteThought)
        } catch (err) {
            res.status(500).json({ message: 'Unable to delete thought' })
        }
    },

    // Creating a new reacting using username and reactionText from the request body
    // Saving the reaction
    // Finding the thought by ID and push the new reactions ID into the reactions array
    createReaction: async (req, res) => {
        try {
            const newReaction = new Reaction({
                username: req.body.username,
                reactionText: req.body.reactionText
            })
            await newReaction.save();
            const createReaction = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: newReaction._id } },
                { runValidators: true, new: true })
            res.status(200).json(createReaction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was a problem creating a reaction' });
        }
    },


    // Delete reaction
    // Find thought by ID
    // Pull/delete reaction by ID from reactions array
    //run validators and update, confirm it is true
    deleteReaction: async (req, res) => {
        try {
            const deleteReaction = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId } },
                { runValidators: true, new: true }
            );

            res.status(200).json(deleteReaction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was a problem deleting reaction.' });
        }
    }
}
