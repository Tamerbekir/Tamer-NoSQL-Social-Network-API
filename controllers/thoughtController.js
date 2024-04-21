const Thoughts = require('../models/Thoughts')

module.exports = {

    // Grabbing all thoughts
    allThoughts: async (req, res) => {
        try  {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json({ message: 'There was an error getting all thoughts' });
        }
    },

    // Get a single thought by ID
    singleThought: async (req, res) => {
        try {
            const thought = await Thoughts.findById(req.params.thoughtId);
            res.json(thought);
        } catch (err) {
            res.status(500).json({ message: 'There was an error finding the thought.' });
        }
    },

    // Creating a thought by placing a thought in the body of the json and saving it.
    createThoughts: async (req, res) => {
        try {
            const newThought = new Thoughts(req.body);
            await newThought.save();
            res.json(newThought);
        } catch (err) {
            res.status(500).json({ message: 'There was an error creating a new thought' });
        }
    },

    // Updating a thought by grabbing a single thought by its ID by the parameter and then setting ($set) it to whatever we want within the json body
    updateThoughts: async (req, res) => {
        try {
            const updateThoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            res.json(updateThoughts);
        } catch (err) {
            res.status(500).json({ message: 'There was an error updating a thought' });
        }
    },

    // Deleting a thought by grabbing a single thought by its ID by the parameter and then deleting it
    deleteThoughts: async (req, res) => {
        try {
            const deleteThoughts = await Thoughts.findOneAndDelete(
                { _id: req.params.thoughtId });
            res.json(deleteThoughts);
        } catch (err) {
            res.status(500).json({ message: 'There was an error deleting a thought' });
        }
    }
}