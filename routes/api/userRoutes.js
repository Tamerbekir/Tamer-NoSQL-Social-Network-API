const router = require('express').Router();

const { 
    allUsers,
    singleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController')

//api/users
router.route('/')
    .get(allUsers)
    .post(createUser)

//api/users/:userId
router.route('/:userId')
    .get(singleUser)
    .put(updateUser)
    .delete(deleteUser)

//api/users/:userId/friends/
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)


module.exports = router;


