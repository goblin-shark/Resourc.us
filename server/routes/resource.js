const express = require('express');
const resourceController = require('../controllers/resourceController');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/create',
  resourceController.createResource,
  (req, res) => {
    console.log('create resource router is working');
    res.status(200).json(res.locals.response);
  }
);

router.post('/list',
  resourceController.listResources,
  (req, res) => {
    console.log('list resources router is working');
    res.status(200).json(res.locals.response);
  }
);

router.post('/listThree',
  resourceController.listThreeResources,
  (req, res) => {
    console.log('list 3 resources router is working');
    res.status(200).json(res.locals.response);
  }
);

router.get('/listAll',
  resourceController.listAllResources,
  (req, res) => {
    console.log('list all resources router is working');
    res.status(200).json(res.locals.response);
  }
);

router.post('/upvote',
  resourceController.upvoteResource,
  (req, res) => {
    console.log('upvote resource router is working');
    res.status(200).json(res.locals.response);
  }
);

router.post('/scrape',
  resourceController.urlScraper,
  (req, res) => {
    console.log('urlScraper resource router is working');
    res.status(200).json(res.locals.response);
  }
);

module.exports = router;