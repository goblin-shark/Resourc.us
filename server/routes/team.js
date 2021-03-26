const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();

router.get('/list',
    teamController.listTeams,
    (req, res) => {
        // console.log('newsletter router is working');
        res.status(200).json({});
    }
);

router.post('/create',
    teamController.createTeam,
    (req, res) => {
        console.log('team router is working');
        console.log(res.locals.response);
        res.status(200).json(res.locals.response);
    }
);

module.exports = router;