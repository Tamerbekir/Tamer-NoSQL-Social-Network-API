//Bringing in the User and Thought Model from directory
const  User = require('../models/User')


module.exports = {
    
    //Finding all users
    //excluding the version key
    //display all users as object 
    allUsers: async (req, res) => {
        try {
            const allUsers = await
                User.find()
                    .select('-_v')
            res.status(200).json(allUsers)
        } catch {
            res.status(500).json({ message: 'Unable to get all users.' })
        }
    },
    
    // Getting a single user by their ID
    //Finding a single user by their ID
    //Populate method to display their thoughts and friends
    singleUser: async (req, res) => {
        try {
            const singleUser = await User.findOne(
                { _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
            res.status(200).json(singleUser);
        } catch (err) {
            res.status(500).json({ message: 'Unable to get user.' });
        }
    },
    

    // Creating a new user
    createUser: async (req, res) => {
        try {
            const createUser = await
                //Creating a new user by using json body
                User.create(req.body)
                .then((createUser) => {
                res.status(200).json(createUser)
            })
        } catch (err) {
            res.status(500).json({ message: 'Unable to create user.' })
        }
    },

    // Updating a users name
    //find a single user an update
    // getting users id from the parameter
    // adding the new name to the body and POSTing it.
    // Running validator when using update method and true to return the document
    //json results
    updateUser: async (req, res) => {
        try {
            const updateUser = await 
                User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $set: req.body },
                    { runValidators: true, new: true } )
                .then((updateUser) => {
                    res.status(200).json(updateUser)
                })
        } catch (err) {
            res.status(500).json({ message: 'There was a problem creating a new user' })
        }
    },

    // find a single user and delete it
    // getting the users name from the parameter and then deleting it
    deleteUser: async (req, res) => {
        try{
            const deleteUser = await 
                User.findOneAndDelete(
                    { _id: req.params.userId } )
                .then((deleteUser) => {
                    res.status(200).json(deleteUser)
                })
        } catch (err) {
            res.status(500).json({ message: 'There was a problem deleting user.' })
        }
    },

    // Adding a friend for a user
    // Find the user by ID and add the friend ID to their friends array 
    addFriend: async (req, res) => {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
    
            const user = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } },
                { new: true }
            );
    
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was a problem adding a friend.' });
        }    
    },

    // removing a friend from a single user
    //Pulling single user by their Id, and removing the friend Id from the friends array
    removeFriend: async (req, res) => {
        try {
            const removeFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
    
            res.status(200).json(removeFriend);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was a problem removing a friend.' });
        }
    }
}
    