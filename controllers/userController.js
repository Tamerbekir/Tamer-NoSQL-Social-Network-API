// const User = require('../models/User');


// module.exports = {
//     // GET all users
//     allUsers: async (req, res) => {
//         try {
//             const users = await User.find()
//             res.json(users);
//         } catch (err) {
//             res.status(500).json({ message: 'There was an error finding all users.' });
//         }
//     },

// // GET single User with friends and thoughts
// singleUser: async (req, res) => {
//     try {
//         const singleUser = await User.findById(req.params.userId)
//             .populate('friends', 'username')
//             .populate('thoughts');
//         res.json(singleUser);
//     } catch (err) {
//         console.error('Error finding a single user:', err);
//         res.status(500).json({ message: 'There was an error finding a single user.' });
//     }
// },

    
//     // Creating a user within the json body and then saving it
//     createUser: async (req, res) => {
//         try {
//             const newUser = new User(req.body);
//             await newUser.save();
//             res.json(newUser);
//         } catch (err) {
//             res.status(500).json({ message:'There was an error creating a new user' });
//         }
//     },

//     // Updating a user by grabbing a single user by its ID by the parameter and then setting ($set) it to whatever we want within the json body
//     updateUser: async (req, res) => {
//         try {
//             const updateUser = await User.findOneAndUpdate(
//                 { _id: req.params.userId },
//                 { $set: req.body },
//                 { runValidators: true, new: true }
//                 )
//             res.json(updateUser);
//         } catch (err) {
//             res.status(500).json({ message: 'There was an error updating the user' })
//         }
//     },

//     // Deleting a user by grabbing a single user by its ID by the parameter and then deleting it
//     deleteUser: async (req, res) => {
//         try {

//             const deleteUser = await User.findOneAndDelete(
//                 { _id: req.params.userId });
//             res.status(200).json({ message: 'User deleted!' });

//         } catch (err) {
//             res.status(500).json({ message: 'There was an error deleting the user or the user does not exist' })
//         }
//     },

//     // Adding a friend by finding the user by its ID and pushing ($push) the friend ID from the parameter to the friends array. Then ensuring the update went into the document
//     addFriend: async (req, res) => {
//         try {
//             const addFriend = await User.findOneAndUpdate(
//                 { _id: req.params.userId },
//                 { $push: { friends: req.body.friendId } },
//                 { new: true }
//             )
//             res.status(200).json({ message: 'Friend Added!' });
//         } catch (err) {
//             res.status(500).json({ message: 'There was an error adding friend or the friend does not exist' })
//         }
//     },

//     // Removing a friend by finding the user by its ID and pulling ($pull) the friend ID from the parameter from the friends array. Then ensuring the update went into the document
//     removeFriend: async (req, res) => {
//         try {
//             const removeFriend = await User.findOneAndDelete(
//                 { _id: req.params.userId },
//                 { $pull: { friends: req.params.friendId } },
//                 { new: true }
//                 )
//                 res.status(200).json({ message: 'Friend Removed!' });
//             } catch (err) {
//             res.status(500).json({ message: 'There was an error removing friend or the friend does not exist' })
//         }
//     }
// }


//! Refactoring User Model

//Bringing in the User and Thought Model from directory
const  User = require('../models/User')


module.exports = {
    
    //Finding all users
    allUsers: async (req, res) => {
        try {
            const allUsers = await
                User.find()
                    //excluding the version key
                    .select('-_v')
                    //display all users as object 
            res.status(200).json(allUsers)
        } catch {
            res.status(500).json({ message: 'Unable to get all users.' })
        }
    // Getting a single user by their ID
    },

    //Finding a single user by their ID
    singleUser: async (req, res) => {
        try {
            const singleUser = await User.findOne(
                { _id: req.params.userId })
                .select('-__v')
                //Populate method to display their thoughts and friends
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
    updateUser: async (req, res) => {
        try {
            const updateUser = await 
                //find a single user an update
                User.findOneAndUpdate(
                    // getting users id from the parameter
                    { _id: req.params.userId },
                    // adding the new name to the body and POSTing it.
                    { $set: req.body },
                    // Running validator when using update method and true to return the document
                    { runValidators: true, new: true } )
                    //json results
                .then((updateUser) => {
                    res.status(200).json(updateUser)
                })
        } catch (err) {
            res.status(500).json({ message: 'There was a problem creating a new user' })
        }
    },

    deleteUser: async (req, res) => {
        try{
            const deleteUser = await 
                // find a single user and delete it
                User.findOnAndDelete(
                    // getting the users name from the parameter and then deleting it
                    { _id: req.params.userId } )
                .then((deleteUser) => {
                    res.status(200).json(deleteUser)
                })
        } catch (err) {
            res.status(500).json({ message: 'There was a problem deleting user.' })
        }
    },

    // Adding a friend for a user
    addFriend: async (req, res) => {
        try {
            const addFriend = await 
                // Finding a single user and updating them with friend
                User.findOneAndUpdate(
                    // Find user by their ID in parameter
                    { _id: req.params.userId },
                    //Using addToSet to add a friend to the user
                    { $addToSet: req.params.friend } )
                .then((addFriend) => {
                    res.status(200).json(addFriend)
                })
        } catch (err) {
            res.status(500).json({ message: 'There was a problem adding a friend.' })
        }
    },

    // removing a friend from a single user
    removeFriend: async (req, res) => {
        try {
            const removeFriend = await
                // Find a single user and delete friend
                User.findOnAndDelete(
                    // find user by ID in the parameter
                    { _id: req.params.userId },
                    // Pull the users friend from the parameter
                    { $pull: req.params.friend } )
                .then((removeFriend) => {
                    res.status(200).json(removeFriend)
                })
            } catch (err) {
                res.status(500).json({ message: 'There was a problem removing a friend.' })
            }
    }
}