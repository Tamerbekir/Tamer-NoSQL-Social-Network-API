const User = require('../models/User');


module.exports = {
    // GET all users
    allUsers: async (req, res) => {
        try {
            const users = await User.find()
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'There was an error finding all users.' });
        }
    },

// GET single User with friends and thoughts
singleUser: async (req, res) => {
    try {
        const singleUser = await User.findById(req.params.userId)
            .populate('friends', 'username')
            .populate('thoughts');
        res.json(singleUser);
    } catch (err) {
        console.error('Error finding a single user:', err);
        res.status(500).json({ message: 'There was an error finding a single user.' });
    }
},

    
    // Creating a user within the json body and then saving it
    createUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.json(newUser);
        } catch (err) {
            res.status(500).json({ message:'There was an error creating a new user' });
        }
    },

    // Updating a user by grabbing a single user by its ID by the parameter and then setting ($set) it to whatever we want within the json body
    updateUser: async (req, res) => {
        try {
            const updateUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
                )
            res.json(updateUser);
        } catch (err) {
            res.status(500).json({ message: 'There was an error updating the user' })
        }
    },

    // Deleting a user by grabbing a single user by its ID by the parameter and then deleting it
    deleteUser: async (req, res) => {
        try {

            const deleteUser = await User.findOneAndDelete(
                { _id: req.params.userId });
            res.status(200).json({ message: 'User deleted!' });

        } catch (err) {
            res.status(500).json({ message: 'There was an error deleting the user or the user does not exist' })
        }
    },

    // Adding a friend by finding the user by its ID and pushing ($push) the friend ID from the parameter to the friends array. Then ensuring the update went into the document
    addFriend: async (req, res) => {
        try {
            const addFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.body.friendId } },
                { new: true }
            )
            res.status(200).json({ message: 'Friend Added!' });
        } catch (err) {
            res.status(500).json({ message: 'There was an error adding friend or the friend does not exist' })
        }
    },

    // Removing a friend by finding the user by its ID and pulling ($pull) the friend ID from the parameter from the friends array. Then ensuring the update went into the document
    removeFriend: async (req, res) => {
        try {
            const removeFriend = await User.findOneAndDelete(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
                )
                res.status(200).json({ message: 'Friend Removed!' });
            } catch (err) {
            res.status(500).json({ message: 'There was an error removing friend or the friend does not exist' })
        }
    }
}