// // Reactions model
// const { Schema, model } = require('mongoose');


// const reactionSchema = new Schema({
//     thoughtId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Thoughts',
//         required: true
//     },
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     reactionText: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// },
//     {
//         toJSON: {
//             virtuals: true
//         }
//     });

// const Reaction = model('Reaction', reactionSchema);

// module.exports = Reaction;

//! Refactor

// Reactions type
const { Schema, Types } = require('mongoose');


const reactionSchema = new Schema({
    // Gave reaction an id and removed thoughtId
    reactionId: {
        type: Schema.Types.ObjectId,
        //added default 
        default: () => new Types.ObjectId(),
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
        },
        // not to be confused with _id
        id: false
    });

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;

