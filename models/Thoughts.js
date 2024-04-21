const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
    text: {
        type: String,
        required: true,
        maxLength: 150,
        minLength: 5,
        default: 'Looks like no one has anything thoughts yet!'
        },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
        },
    reactions: {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
        required: true
        },
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

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;