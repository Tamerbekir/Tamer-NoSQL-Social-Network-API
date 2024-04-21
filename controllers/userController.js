// User
    // Find a user
    // Find all users
    // Create a user
    // Delete a user
// Reaction
    // Tie reaction to user
    // Create Reaction
    // Delete reaction
// Thought
    // Tie Thought to user
    // Create Thought
    // Delete Thought


// Bring in User, their reactions and thoughts
const { ObjectId } = require('mongoose').Types;
const { User, Thoughts, Reactions } = require('../models')

// Adding up all the users
const usersCount = async () =>
    User.aggregate()
        .count('userCount')
        .then((numberOfUsers) => numberOfUsers)

// Defining usersReaction / userThought to use when pulling reaction data for user
// Using aggregate method to put data together and return results in one object
// Filtering and matching data to return only the thought data for the user
// Creating an array field for the user's thoughts
// Grouping the all the data by the user's id
const userReaction = async (userId) =>
    Reactions.aggregate([
        { $match: { _id: ObjectId(userId) } },
        { $unwind: '$reaction' },
        { $group: { _id: ObjectId(userId), } }
    ]);

const userThought = async (userId) =>
    Thoughts.aggregate([
        { $match: { _id: ObjectId(userId) } },
        { $unwind: '$thought' },
        { $group: { _id: ObjectId(userId), } }
    ]);

// Bringing in all users
module.exports = {
    getUsers(req, res) {
        //Finding user
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    // Adding user to the userObj using the userCount function
                    usersCount: await usersCount()
                };
                return res.json(userObj)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Ability to use a single user
    getSingleUser(res, req) {
        User.findOne({ _id: req.params.userId })
            .select('-_v')
            .then(async (user) => 
                ! user ? res.status(404).json({ message: 'No user with that ID' })
                : res.join ({ 
                    //Once user is found,the users thought and reaction are joined and displayed once the user once found. 
                    user,
                    userThought: await userThought(req.params.userId),
                    userReaction: await userReaction(req.params.userId)
                })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    // Ability to create a new user
    // User created with the data from the body via json from server client
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndRemove(
            { _id: req.params.use })
            .then((user) =>
                ! user ? res.status(404).json({ message: 'No user with that ID' }): Reactions.deleteMany(
                        { users: req.params.userId },
                        { $pull: { users: req.params.userId } },
                        { new: true },
                    Thoughts.deleteMany(
                        { users: req.params.userId },
                        { $pull: { users: req.params.userId } },
                        { new: true },
                        )
                    )
            )
            .then((user) =>
                ! user ? res.status(404).json({
                        message: 'User deleted, but no reactions or thoughts',
                    })
                    : res.json({ message: 'User data successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
}
