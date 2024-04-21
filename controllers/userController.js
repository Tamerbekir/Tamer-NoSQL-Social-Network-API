const User = require('../models/User');

model.exports = {
    // GET all users
    allUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'There was an error finding all users.' });
        }
    },

    // GET single User
    singleUser: async (req, res) => {
        try {
            const singleUser = await User.findOne(
                { _id: req.params.userId }
                );
            res.json(singleUser);
        } catch (err) {
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
            res.json(deleteUser);
        } catch (err) {
            res.status(500).json({ message: 'There was an error deleting the user' })
        }
    },
};