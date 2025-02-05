const router = require("express").Router();
const authRoute = require('./auth-route');
const userRoute = require('./user-route');
const chatRoute = require('./chat-route');
const bikeRoute = require('./bike-route');

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/chat', chatRoute);
router.use('/bike', bikeRoute);

module.exports = router;
