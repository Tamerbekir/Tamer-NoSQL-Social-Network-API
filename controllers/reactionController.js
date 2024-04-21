// Reaction
    // Tie reaction to user
    // Create Reaction
    // Delete reaction


const Reactions = require('../models/Reactions');

module.exports = {

    createReaction: async (req, res) => {
        try {
            const newReaction = new Reactions(req.body)
            await newReaction.save();
            res.status(200).json(newReaction);
        } catch (error) {
            res.status(500).json({ message: 'There was an error creating a new reaction' });
        }
    },

    deleteReaction: async (req, res) => {
        try {
            const deleteReaction = await Reactions.findOneAndDelete(
                { _id: req.params.reactionId })
            res.json(deleteReaction);
        } catch (err) {
            res.status(500).json({ message: 'There was an error deleting a reaction' })
        }
    }
}