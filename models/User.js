// //Bringing in mongoose for model and schema
// const { Schema, model } = require('mongoose');


// // User Schema
// const userSchema = new Schema(
//     {
//     //Username is a string that is required and its max length of 50 characters
//     username: {
//         type: String,
//         required: true,
//         maxlength: 50
//     },
//     // User's friends array has a relationship with friends, thoughts and reactions. The User can have multiple friends, thoughts and reactions. Thoughts and reactions are referencing their own models, and the friends is referencing the User.
//     friends: [{
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//         }],
//     thoughts: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Thoughts'
//         }],
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }, 
//     // },
//     // {
//     //     toJSON: {
//     //         virtuals: true
//     //     }

// });

// const User = model('User', userSchema);

// module.exports = User;

//! Reattempting to refactor. 

//Bringing in mongoose for model and schema
const { Schema, model } = require('mongoose');


// User Schema
const userSchema = new Schema(
    {
        //Username is a string that is required and its max length of 50 characters
        username: {
            type: String,
            required: true,
            maxlength: 50
        },
        // User's friends array has a relationship with friends, thoughts and reactions. The User can have multiple friends, thoughts and reactions. Thoughts and reactions are referencing their own models, and the friends is referencing the User.
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        toJSON: {
            virtuals: true
        }
    });

    // Added to show user friends count
userSchema.virtual('userFriends').get(function () {
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;