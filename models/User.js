const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thoughts')
const reactionSchema = require('./Reactions')

const userSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        max_length: 50
    },
    fiends: {
        type: Schema.Types.ObjectId
    },
    thoughts: {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
        required: true
    },
    reactions: {
        type: Schema.Types.ObjectId,
        ref: 'Reactions',
        required: true,
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
})

const User = model('user', userSchema);

module.exports = User;