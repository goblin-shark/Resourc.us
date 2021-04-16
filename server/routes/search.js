const { MongoClient, ObjectID } = require("mongodb");
const mongoData = require('../models/db');
const express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const router = express.Router();

const client = new MongoClient(mongoData.url, { useNewUrlParser: true, useUnifiedTopology: true});

router.use(BodyParser.json());
router.use(BodyParser.urlencoded({ extended: true }));
router.use(Cors());

let collection;

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
  response.status(200).send(responseObj);

} catch (e) {
      response.status(500).send({ message: e.message });
  }
});

router.get("/get/:id", async (request, response) => {
  try {
      let result = await collection.findOne({ "_id": ObjectID(request.params.id) });
      response.send(result);
  } catch (e) {
      response.status(500).send({ message: e.message });
  }
});

module.exports = router;
