const express = require('express');
const resourceController = require('../controllers/resourceController');
const router = express.Router();

router.post('/create',
    resourceController.createResource,
    (req, res) => {
        console.log('create resource router is working');
        console.log(res.locals.response);
        res.status(200).json(res.locals.response);
    }
);

module.exports = router;