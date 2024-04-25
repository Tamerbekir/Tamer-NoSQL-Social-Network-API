// Reactions model
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');


const reactionSchema = new Schema({
    // Gave reaction an id and removed thoughtId
    reactionId: {
        type: Schema.Types.ObjectId,
        //added default 
        default: () => new mongoose.Types.ObjectId(),
    },
    username: {
        type: String,
        required: true,
    },
    reactionText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        toJSON: {
            virtuals: true
        },
        // not to be confused with _id
        id: false
    });

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;

