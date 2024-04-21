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
    // User has a relationship with friends, thoughts and reactions. The User can have multiple friends, thoughts and reactions. Thoughts and reactions are referencing their own models, and the friends is referencing the User.
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
        }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
        }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = model('user', userSchema);

module.exports = User;