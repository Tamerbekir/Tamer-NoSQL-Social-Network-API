const router = require('express').Router();

const { 
    allUsers,
    singleUser,
    createUser,
    deleteUser,
    updateUser
} = require('../../controllers/userController')

//api/users
router.route('/').get(allUsers).post(createUser)

//api/users/:userId
router.route('/:userId').get(singleUser).delete(deleteUser).put(updateUser)

// From the friends controller addFriend, which is part of User model as a reference to add a friend to the user's friend list. 'friends' is found in the User model

//api/users/:userId/friends/
router.route(':userId/friends').post(addFriend)

//api/users/:userId/friends/friendsId
router.route(':userId/friends').delete(removeFriend)

