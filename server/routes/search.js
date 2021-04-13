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

  //functionality to grab tags
  // collectionTags = client.db(mongoData.MONGO_DB).collection("resources");
  // let resultTags = await collectionTags.aggregate([
  //     {
  //       $unwind: "$tags"
  //     }
  //   ]).toArray()

  // function Equals(resourceTag, userQuery){
  //   resourceTag = resourceTag.toLowerCase()
  //   userQuery = userQuery.toLowerCase()

  //   if(resourceTag == userQuery) return true;
  //   return false
  // }

  
  // let resourceArray = [];
  // if(resultTags) {
  //   for(let resources of resultTags) {
  //     if(Equals(resources.tags, request.query.query)){
  //       resourceArray.push(resources)
  //     }
  //   }
  // }

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


  responseObj.tags = resourcesArr;
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
