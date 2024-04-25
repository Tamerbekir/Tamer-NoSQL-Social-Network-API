const router = require('express').Router();

const { 
    allThoughts, 
    singleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

//All routes being handles via /thoughts
//api/thoughts
router.route('/')
    .get(allThoughts)
    .post(createThought);


//All routes being handles via /thoughtId
//api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(singleThought)
    .put(updateThought)
    .delete(deleteThought)

// Route for creating a reaction with the thought Id
//api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reaction')
    .post(createReaction)

// Routes for deleting reactionID, which is from reactions, which is from thoughtId
//api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reaction/:reactionId')
    .delete(deleteReaction)



module.exports = router;
