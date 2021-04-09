const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login',
    userController.validateUser,
    (req, res) => {
        console.log('login User router is working');
        res.status(200).json({});
    }
);

router.post('/create',
    userController.createUser,
    (req, res) => {
        console.log('create User router is working');
        console.log(res.locals.response);
        res.status(200).json(res.locals.response);
    }
);

module.exports = router;