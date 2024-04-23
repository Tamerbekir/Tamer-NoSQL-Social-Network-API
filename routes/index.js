const router = require('express').Router();
const apiRoutes = require('./api')

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong Route! Please check your routes and try again.'));

module.exports = router;