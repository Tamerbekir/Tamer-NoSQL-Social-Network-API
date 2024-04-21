const Reactions = require('../models/Reactions');
const Thoughts = require('../models/Thoughts')

module.exports = {

    // Creating a reaction by putting the reaction into the body of the json and saving it
    createReactions: async (req, res) => {
            try {
                const newReaction = new Reactions(req.body);
                await newReaction.save();
                res.status(200).json(newReaction);
            } catch (error) {
                res.status(500).json({ message: 'There was an error creating a new reaction' });
            }
        },

    // Deleting a reaction by finding the reaction by its ID, updating the thought it belongs to, pulling ($pull) it from the thought it belongs to, and then deleting it.
    deleteReactions: async (req, res) => {
        try {
            const reactionId = req.params.reactionId;
            const reaction = await Reactions.findById(reactionId);

            await Thoughts.findByIdAndUpdate(
                reaction.thoughtId,
                { $pull: { reactions: reactionId } }
            );
            // Delete the reaction
            await Reactions.findByIdAndDelete(reactionId);
            res.json({ message: 'Reaction deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'There was an error deleting reaction' });
        }
    }
};