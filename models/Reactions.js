//Bringing in the reaction schema
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    //thoughtId that will reference the Thoughts model that will be associated with the reaction
    thoughtId: {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
        required: true
    },
    //userId that is referencing the User model that is associated with the reaction
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Making reaction an emoji
    reactionEmoji: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Reaction = model('reactions', reactionSchema);

module.exports = Reaction;
