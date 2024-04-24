// const Thoughts = require('../models/Thoughts')

// module.exports = {

//     // Grabbing all thoughts
//     allThoughts: async (req, res) => {
//         try  {
//             const thoughts = await Thoughts.find().populate('reactions')
//             res.json(thoughts);
//         } catch (err) {
//             res.status(500).json({ message: 'There was an error getting all thoughts' });
//         }
//     },

//     // Get a single thought by ID
//     singleThought: async (req, res) => {
//         try {
//             const thought = await Thoughts.findById(req.params.thoughtId);
//             res.json(thought);
//         } catch (err) {
//             res.status(500).json({ message: 'There was an error finding the thought.' });
//         }
//     },

//     // Creating a thought by placing a thought in the body of the json and saving it.
//     createThoughts: async (req, res) => {
//         try {
//             const newThought = new Thoughts(req.body);
//             await newThought.save();
//             res.json(newThought);
//         } catch (err) {
//             res.status(500).json({ message: 'There was an error creating a new thought' });
//         }
//     },

//     // Updating a thought by grabbing a single thought by its ID by the parameter and then setting ($set) it to whatever we want within the json body
//     updateThoughts: async (req, res) => {
//         try {
//             const updateThoughts = await Thoughts.findOneAndUpdate(
//                 { _id: req.params.thoughtId },
//                 { $set: req.body },
//                 { runValidators: true, new: true }
//             )
//             res.json(updateThoughts);
//         } catch (err) {
//             res.status(500).json({ message: 'There was an error updating a thought' });
//         }
//     },

//     // Deleting a thought by grabbing a single thought by its ID by the parameter and then deleting it
//     deleteThoughts: async (req, res) => {
//         try {
//             const deleteThoughts = await Thoughts.findOneAndDelete(
//                 { _id: req.params.thoughtId });
//             res.status(200).json({ message: "Deleted Thought!" });
//         } catch (err) {
//             res.status(500).json({ message: 'There was an error deleting a thought' });
//         }
//     },

//     addReaction: async (req, res) => {
//         try {
//             const { reactionBody, userId } = req.body;
//             const thoughtId = req.params.thoughtId;

//             const updatedThought = await Thoughts.findOneAndUpdate(
//                 { _id: thoughtId },
//                 { $push: { reactions: { reactionBody, userId } } },
//                 { new: true }
//             );

//             res.json(updatedThought);
//         } catch (err) {
//             res.status(500).json({ message: 'There was an error adding a reaction to the thought.' });
//         }
//     }
// };


//! Refactoring Thought controller 

const Reaction = require('../models/Reactions')
const Thoughts = require('../models/Thoughts')
const User = require('../models/User')

module.exports = {

    //finding all thoughts by users
    allThoughts: async (req, res) => {
        try {
            const allThoughts = await
                Thoughts.find()
                .then((allThoughts) => {
                    res.status(200).json(allThoughts)
                })
        } catch (err) {
            res.status(500).json({ message: 'Unable to find all thoughts.' })
        }
    },

    // finding a single thought by a user
    singleThought: async (req, res) => {
        try {
            const singleThought = await
            // finding one thought by a user from parameter
                Thoughts.findOne({ _id: req.params.thoughtId })
                .then((singleThought) => {
                    res.status(200).json(singleThought)
                })
            } catch (err) {
                res.status(500).json({ message: 'Unable to find single thought.' })
            }
        },

    // creating a thought for a single user by user ID
    createThought: async (req, res) => {
        try {
            const createThought = await 
                //creating thought in json body
                Thoughts.create(req.body)
                //then find single user by ID and update thought to user
                .then((createThought) => {
                    User.findOneAndUpdate(
                        { _id: params.userId },
                        //push thought to user
                        { $push: { thoughts: createThought.id } },
                        //running validator because update, confirming change is new
                        { runValidators: true, new: true } )
                    })
        } catch (err) {
            res.status(500).json({ message: 'There was a problem creating a new thought.' })
        }
    },

    // updating a single thought
    updateThought: async (req, res) => {
        try {
            const updateThought = await
                //finding a single thought and updating it
                Thoughts.findOneAndUpdate(
                    //locate thought by thought ID in params
                    { _id: params.thoughtId },
                    //update thought within the json body
                    { $set: req.body },
                    //run validator because update, confirming change is new
                    { runValidators: true, new: true } )
                    .then((updateThought) => {
                        res.status(200).json(updateThought)
                    })
        } catch (err) {
            res.status(500).json({ message: 'There was a problem updating thought.' })
        }
    },

    //deleting thought
    deleteThought: async (req, res) => {
        try {
            const deleteThought = await
                //finding a single thought using thoughtId 
                Thoughts.findOneAndDelete(
                    { _id: params.thoughtId }
                    .then((deleteThought) => {
                        // Once single thought, find user who has thought, delete it from user
                        User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } } )
                        res.status(200).json(deleteThought)
                    })
                )
        } catch (err) {
            res.status(500).json({ message: 'Unable to delete thought' })
        }
    },

    createReaction: async (req, res) => {
        try {
            const createReaction = await
                Thoughts.create(
                    // create reaction ID within parameter
                    { _id: params.thoughtId },
                    // add reaction to json body
                    { $addToSet: { reactions: req.body } },
                    // run validators
                    { runValidators: true, new: true } )
                    .then((createReaction) => {
                        res.status(200).json(createReaction)
                    })
        } catch (err) {
            res.status(500).json({ message: 'There was a problem creating a reaction' })
        }
    },

    // Delete reaction
    deleteReaction: async (req, res) => {
        try {
            const deleteReaction = await
                // find thought by ID and delete reaction by ID
                Thoughts.findOneAndDelete(
                    { _id: params.thoughtId },
                    // pull / delete reaction (from parameter from reactions, from reaction id, under the reaction ID parameter.)
                    { $pull: { reactions: { reactionId: req.params.reactionId } } },
                    { runValidators: true, new: true } )
                    .then((deleteReaction) => {
                        res.status(200).json(deleteReaction)
                    })
        } catch (err) {
            res.status(500),json({ message: 'There was a problem deleting reaction.' })
        }
    }
}
