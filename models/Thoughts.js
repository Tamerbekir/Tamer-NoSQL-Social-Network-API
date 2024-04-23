// // Thoughts model
// const { Schema, model } = require('mongoose');

// const thoughtSchema = new Schema({
//     thoughtText: {
//         type: String,
//         required: true,
//         maxlength: 280
//     },
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     reactions: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Reactions'
//     }],
//     }, 
//      {
//         toJSON: {
//             virtuals: true
//         }
//     });

// const Thoughts = model('Thoughts', thoughtSchema);

// module.exports = Thoughts;

//! Refactor

// Thoughts model
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
    },
    // Username must be put inside the req.body instead of the userId
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    //Brought in reactions schema 
    reactions: [reactionSchema],
},
    {
        toJSON: {
            //made getter
            getters: true,
        },
        //this will prevent virtuals from creating duplicate of _id as `id`
        id: false
    });

    // Will display how many reactions by # are associated with the thought
    thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length
    });

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;