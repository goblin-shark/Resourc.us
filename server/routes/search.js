const { MongoClient } = require("mongodb");
const mongoData = require('../models/db');
const express = require("express");
const router = express.Router();

const client = new MongoClient(mongoData.url, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (request, response) => {
  try {
    let responseObj = {};

    await client.connect();
    let collectionTeam = client.db(mongoData.MONGO_DB).collection("teams");
    let teamResult = await collectionTeam.aggregate([
      {
        "$search": {
          "index": "ind1",
          "autocomplete": {
            "query": `${request.query.query}`,
            "path": "description",
            "fuzzy": {
              "maxEdits": 2,
              "prefixLength": 3
            }
          }
        }
      }
    ]).toArray();
    responseObj.team = teamResult;

    let collectionRes = client.db(mongoData.MONGO_DB).collection("resources");
    let resourcesArr = await collectionRes.aggregate([
      {
        "$search": {
          "autocomplete": {
            "query": `${request.query.query}`,
            "path": "title",
            "fuzzy": {
              "maxEdits": 2,
              "prefixLength": 3
            }
          }
        }
      }
    ]).toArray();


    responseObj.resourceSearch = resourcesArr;
    console.log("teamResult: ", teamResult)
    response.status(200).send(responseObj);

  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

module.exports = router;