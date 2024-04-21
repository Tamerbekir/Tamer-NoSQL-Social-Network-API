const User = require('../models/User')

module.exports = {

    addFriend: async (req, res) => {
        try {
            const addFriend = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.body.friendId } },
                { new: true }
            )
            res.json(addFriend);
        } catch (err) {
            res.status(500).json({ mesage: 'There was an error adding friend' })
        }
    },

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