const { MongoClient, ObjectID } = require("mongodb");
const mongoData = require('../models/db');
const express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const router = express.Router();

const client = new MongoClient(mongoData.url);

router.use(BodyParser.json());
router.use(BodyParser.urlencoded({ extended: true }));
router.use(Cors());

let collection;

router.get('/', async (request, response) => {
  try {
    const test = 'codesmith'
    await client.connect();
    collection = client.db(mongoData.MONGO_DB).collection("teams");
    let result = await collection.aggregate([
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
  console.log('retrieving search queries', result)
  response.status(200).send(result);
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