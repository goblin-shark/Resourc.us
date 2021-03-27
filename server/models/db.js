const mongoose = require('mongoose');

const MONGO_USERNAME = 'goblinshark';
const MONGO_PASSWORD = 'goblinshark';
const MONGO_HOSTNAME = 'cluster0.2j9ni.mongodb.net/';
// const MONGO_PORT = '27017';
const MONGO_DB = 'resourcus';

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/`;

mongoose.connect(url, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: MONGO_DB
})
    .then(() => console.log('Connected to Resourcus DB.'))
    .catch(err => console.log(err));