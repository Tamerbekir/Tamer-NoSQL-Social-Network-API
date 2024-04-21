//Bringing in mongoose for model and schema
const { Schema, Types } = require('mongoose');
const reactionSchema = require('./Reactions')

// Thought Schema
const thoughtSchema = new Schema(
    {
    thoughtId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    thoughtText: {
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
    reaction: [ reactionSchema ],
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