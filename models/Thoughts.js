//Bringing in mongoose for model and schema
const { Schema, model } = require('mongoose');

// Thought Schema
const thoughtSchema = new Schema(
    {
    text: {
        type: String,
        required: true,
        maxlength: 150,
        minlength: 5,
        default: 'Looks like no one has anything thoughts yet!'
    },
    // Thoughts has a relationship with user and reactions. User and reactions are referencing their own models.
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    reaction: [{
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
        required: true
    }],
},
{
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
    {
        toJSON: {
            getters: true
        }
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;