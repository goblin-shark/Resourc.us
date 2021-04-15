const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login',
    userController.validateUser,
    authController.generateAccessToken,
    (req, res) => {
        console.log('login User router is working');
        res.status(200).json({ token: res.locals.token, 
                                user: res.locals.user});
    }
);

router.post('/create',
    userController.createUser,
    (req, res) => {
        console.log('create User router is working');
        //console.log(res.locals.response);
        res.status(200).json(res.locals.response);
    }
);

router.post('/authenticate',
    authController.authenticateToken,
    (req, res) => {
        console.log('user.js: User is validated');
        res.status(200).json({});
    }
);

module.exports = router;