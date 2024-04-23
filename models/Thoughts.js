// Thoughts model
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Reactions'
    }],
    }, 
     {
        toJSON: {
            virtuals: true
        }
    });

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;