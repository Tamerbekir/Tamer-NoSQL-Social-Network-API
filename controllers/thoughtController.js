// // Thought
// // Tie Thought to user
// // Create Thought
// // Delete Thought


// // Bring in User, their reactions and thoughts
// const { ObjectId } = require('mongoose').Types;
// const { User, Thoughts, Reactions } = require('../models')

// // Get all thoughts
// const thoughtCount = async () =>
// Thoughts.aggregate()
//     .count('thoughtCount')
//     .then((numberOfThoughts) => numberOfThoughts)


// module.exports = {

//     getThoughts(req, res) {
//         Thoughts.find()
//         .then(async (users) => {
//             const userObj = {
//                 users
//             }
//             return res.json(userObj)
//         })
//     },


//     // Ability to add thought by the user
//     addThought(req, res) {
//         User.findOneAndUpdate(
//             // Finding the user by their id and then adding/updating the thought in the json which is then added to the users data
//             { _id: req.params.userId },
//             { $addToSet: { thought: req.body } },
//             { runValidators: true, new: true }
//         )
//         .then((user) =>
//             ! user ? res.status(404).json({ message: 'No user with this id!' })
//             : res.json(user)
//         )
//     },

//     // Ability to delete a user.
//     // One user is found nd then they are removed.
//     // The user is found by their id
//     deleteThought(req, res) {
//         User.findOneAndRemove(
//             { _id: req.params.userId },
//             {
//                 // Pulling the users reaction and thought data from the user.
//                 $pull: {
//                     thought: { thoughtId: req.params.thoughtId }
//                 }
//             }
//         )
//         .then((user) =>
//             !user
//             ? res.status(404).json({ message: 'No user with that ID' })
//             : res.json(user)
//         )
//         .catch((err) => res.status(500).son(err));
//     }
// }

const Thoughts = require('../models/Thoughts')

model.export = {

    allThoughts: async (req, res) => {
        try  {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json({ message: 'There was an error getting all thoughts' });
        }
    },

    createThoughts: async (req, res) => {
        try {
            const newThought = new Thoughts(req.body);
            await newThought.save();
            res.json(newThought);
        } catch (err) {
            res.status(500).json({ message: 'There was an error creating a new thought' });
        }
    },

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