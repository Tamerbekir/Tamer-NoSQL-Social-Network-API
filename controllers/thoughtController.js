// Thought
// Tie Thought to user
// Create Thought
// Delete Thought


// Bring in User, their reactions and thoughts
const { ObjectId } = require('mongoose').Types;
const { User, Thoughts, Reactions } = require('../models')

// Get all thoughts
const thoughtCount = async () =>
Thoughts.aggregate()
    .count('thoughtCount')
    .then((numberOfThoughts) => numberOfThoughts)


const thought = async (thoughtId) =>
    Thoughts.aggregate([
        { $match: { _id: ObjectId(thoughtId) }},
        {
            $unwind: '$thoughts',
        },
        {
            $group: {
                _id: ObjectId(thoughtId)
            }
        }
    ])

module.exports = {

    getThoughts(req, res) {
        Thoughts.find()
        .then(async (users) => {
            const userObj = {
                users
            }
            return res.json(userObj)
        })
    },


    // Ability to add thought by the user
    addThought(req, res) {
        User.findOneAndUpdate(
            // Finding the user by their id and then adding/updating the thought in the json which is then added to the users data
            { _id: req.params.userId },
            { $addToSet: { thought: req.body } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            ! user ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
    },

    // Ability to delete a user.
    // One user is found nd then they are removed.
    // The user is found by their id
    deleteThought(req, res) {
        User.findOneAndRemove(
            { _id: req.params.userId },
            {
                // Pulling the users reaction and thought data from the user.
                $pull: {
                    thought: { thoughtId: req.params.thoughtId }
                }
            }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).son(err));
    }
}