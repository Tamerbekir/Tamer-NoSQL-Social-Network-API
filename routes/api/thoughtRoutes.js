const router = require('express').Router();

const { 
    allThoughts, 
    singleThought,
    createThoughts,
    updateThoughts,
    deleteThoughts
} = require('../../controllers/thoughtController');

//All routes being handles via /thoughts
//api/thoughts
router.route('/').get(allThoughts).post(createThoughts);


//All routes being handles via /thoughtId
//api/thoughts/:thoughtId
router.route('/:thoughtId').get(singleThought).put(updateThoughts).delete(deleteThoughts)

module.exports = router;
