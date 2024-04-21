const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thoughts');
const userSchema = require('./User');

const reactionSchema = new Schema(
    {
        emoji: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        thought: {
            type: thoughtSchema,
            ref: 'Thoughts',
            require: true
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Reactions = model('reactions', reactionSchema)

module.exports = Reactions;