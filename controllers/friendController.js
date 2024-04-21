const User = require('../models/User')

module.exports = {

    // Adding a friend by finding the user by its ID and pushing ($push) the friend ID from the parameter to the friends array. Then ensuring the update went into the document
    addFriend: async (req, res) => {
        try {
            const addFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.body.friendId } },
                { new: true }
            )
            res.json(addFriend);
        } catch (err) {
            res.status(500).json({ message: 'There was an error adding friend' })
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
                res.json(removeFriend);
        } catch (err) {
            res.status(500).json({ message: 'There was an error removing friend' })
        }
    }
}