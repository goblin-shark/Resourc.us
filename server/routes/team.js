const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();

router.get('/list',
  teamController.listTeams,
  (req, res) => {
    console.log('list teams router is working');
    res.status(200).json(res.locals.response);
  }
);

router.get('/list/:id',
  teamController.findTeam,
  (req, res) => {
    console.log('find teams router is working');
    res.status(200).json(res.locals.response);
  }
);

router.get('/listThree',
  teamController.listThreeTeams,
  (req, res) => {
    console.log('list 3 teams router is working');
    res.status(200).json(res.locals.response);
  }
);

router.post('/create',
  teamController.createTeam,
  (req, res) => {
    console.log('create team router is working');
    res.status(200).json(res.locals.response);
  }
);

router.post('/join',
  teamController.findTeam,
  teamController.addUserToTeam,
  (req, res) => {
    console.log('join team router is working');
    res.status(200).json(res.locals.response);
  }
);

module.exports = router;