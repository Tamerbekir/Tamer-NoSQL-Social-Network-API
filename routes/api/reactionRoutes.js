const router = require('express').Router();
const { 
    createReactions, 
    deleteReactions 
} = require('../../controllers/reactionController');

//api/reactions
router.route('/').post(createReactions);

//api/reactions/:reactionsId
router.route('/:reactionId').delete(deleteReactions);

module.exports = router;
