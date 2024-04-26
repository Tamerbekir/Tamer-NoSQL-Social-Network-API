# NoSQL-Social-Network-API
## Description 

This application is the back end of a social networking API. A user is able to create user accounts, add friends, and post thoughts. The user is also able to add reactions to thoughts and add friends to other users. A user is also able to delete their friends, their thoughts as well as their account if they wish. Users are also able to create reactions on other thoughts. Lastly, a user can update their thoughts as well as their username if they wish. 

This is all done on the backend API endpoint routes:

`/api/users`
*GET*: Retrieve all users or a single user by ID
*POST*: Create a new user
*PUT*: Update a user by ID
*DELETE*: Remove a user by ID

`/api/users/:userId/friends/:friendId`
*POST*: Add a new friend to a user's friend list
*DELETE*: Remove a friend from a user's friend list

`/api/thoughts`
*GET*: Retrieve all thoughts or a single thought by ID
*POST*: Create a new thought
*PUT*: Update a thought by ID
*DELETE*: Remove a thought by ID

`/api/thoughts/:thoughtId/reactions`
*POST*: Add a reaction to a thought
*DELETE*: Remove a reaction from a thought
 

# Table of Contents
- [Installation](#installation)
- [Video-Demo](#video-demo)
- [Questions](#questions)
- [License](#license)

## Installation
**Requirements to use application: <a href="https://www.mongodb.com/try/download/community-kubernetes-operator">Mongoose</a>,
 <a href="https://nodejs.org/en/">NodeJs</a> and <a href="https://insomnia.rest/download">Instomina</a>(or another preferred server testing program of your choice)</a>.**

To use this application, one must first clone the repository from GitHub into their coding software. Once this is done, follow the commands/instructions:

Opening the terminal command window on the root server.js file:

1- `npm install`

This will install all the dependencies listed in for project's package.json file 

Now you are ready to start the application by opening the command terminal on
the root server.js file and run:

`node server.js` 

If you have nodemon installed, run:

`nodemon server.js`

If you wish to use Nodemon (optional), follow the instructions <a href="https://www.npmjs.com/package/nodemon">here</a>.

## Video-Demo
<a href="https://drive.google.com/file/d/1Ot3b1R9aBFOtxPNv86Hf8ehcIGCvOvAP/view?usp=sharing"> Video Demo /a>


## Features
<a href="https://expressjs.com/">ExpressJs</a>

<a href="https://nodejs.org/docs/latest/api/
">NodeJs</a>

<a href="https://www.npmjs.com/package/nodemon">Nodemon npm</a>


## Questions

<a href="https://github.com/tamerbekir">My GitHub</a>


If you have any questions or inquiries, feel free to contact me using my <a href="mailto:tamerbekir@yahoo.com">tamerbekir@yahoo.com</a>


This <a href="https://github.com/Tamerbekir/tamer-readme-generator">README.md</a> was generated by <a href="https://github.com/Tamerbekir">Tamer Bekir</a> using Node.js.

## License
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is covered under the [MIT License](https://opensource.org/blog/license/mit) License
