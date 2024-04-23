// Reactions model
const { Schema, model } = require('mongoose');


const reactionSchema = new Schema({
    thoughtId: {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        }
    });

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
