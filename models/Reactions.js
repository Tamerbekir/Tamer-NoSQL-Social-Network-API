//Bringing in the reaction schema
const { Schema, model } = require('mongoose');


//Reaction Schema
const reactionSchema = new Schema(
    {
    emoji: {
        type: String,
        required: true,
    },
        // Reaction has a relationship with user and thoughts. User and thoughts are referencing their own models.
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    thought: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
        require: true
    }],
},
{
    toJSON: {
        getters: true,
    },
}
);

const Reaction = model('reactions', reactionSchema)

module.exports = Reaction;