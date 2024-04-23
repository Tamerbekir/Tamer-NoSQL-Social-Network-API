const Reactions = require('../models/Reactions');
const Thoughts = require('../models/Thoughts')

module.exports = {

    createReactions: async (req, res) => {
        try {
            const { thoughtId, reactionText, userId } = req.body;

            const thought = await Thoughts.findById(thoughtId);

            const newReaction = new Reactions({
                thoughtId,
                userId,
                reactionText,
            });
    
            await newReaction.save();
    
            thought.reactions.push(newReaction._id);
            await thought.save();
    
            res.status(200).json(newReaction);
        } catch (error) {
            console.error('Error creating a new reaction:', error);
            res.status(500).json({ message: 'There was an error creating a new reaction' });
        }
    },
    
    
    // Deleting a reaction by finding the reaction by its ID, updating the thought it belongs to, pulling ($pull) it from the thought it belongs to, and then deleting it.
    deleteReactions: async (req, res) => {
        try {
            const reactionId = req.params.reactionId;
            const reaction = await Reactions.findByIdAndDelete(reactionId);
    
            await Thoughts.findByIdAndUpdate(
                reaction.thoughtId,
                { $pull: { Reactions: reactionId } }
            );
    
            res.json({ message: 'Reaction deleted successfully' });
        } catch (err) {
            console.error('Error deleting reaction:', err);
            res.status(500).json({ message: 'There was an error deleting reaction' });
        }
    }
    
}