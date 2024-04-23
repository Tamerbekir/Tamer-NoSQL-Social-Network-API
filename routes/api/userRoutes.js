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
router.route('/').get(allUsers).post(createUser)

//api/users/:userId
router.route('/:userId').get(singleUser).delete(deleteUser).put(updateUser)

//api/users/:userId/friends/
router.route('/:userId/friends').post(addFriend)

//api/users/:userId/friends/friendsId
router.route('/:userId/friends').delete(removeFriend)

module.exports = router;


