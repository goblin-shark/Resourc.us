const mongoose = require('mongoose');
// testing
const MONGO_USERNAME = 'goblinshark';
const MONGO_PASSWORD = 'goblinshark';
const MONGO_HOSTNAME = 'cluster0.2j9ni.mongodb.net/';
// const MONGO_PORT = '27017';
const MONGO_DB = 'resourcus';

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/`;

//error in concsole noting that collection.ensureIndex is deprecated, the following corrects the error per the new update and their docs
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(url, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: MONGO_DB
})
  .then(() => console.log('Connected to Resourcus DB.'))
  .catch(err => console.log(err));

module.exports = {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DB,
  url
}
