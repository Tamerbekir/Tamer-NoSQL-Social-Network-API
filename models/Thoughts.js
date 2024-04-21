const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    // The text for the thought
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Reactions in an array within the User model so they are associated.
    // The reaction will hold the reactionBody, the users name, and the date it was created at when posted.
    reactions: [{
            reactionBody: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        // Friends in an array within the User model
    friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
});

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;
