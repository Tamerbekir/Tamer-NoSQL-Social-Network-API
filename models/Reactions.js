//Bringing in the reaction schema
const { Schema, Types } = require('mongoose');
const thoughtsSchema = require('./Thoughts')


//Reaction Schema
const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    emoji: {
        type: String,
        required: true,
    },
    // Reaction has a relationship with user and thoughts. User and thoughts are referencing their own models.
    user: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
    ],
    thought: [ thoughtsSchema ],
    },
    {
    toJSON: {
        getters: true,
    },
    }
);

const Reaction = model('reactions', reactionSchema)

module.exports = Reaction;