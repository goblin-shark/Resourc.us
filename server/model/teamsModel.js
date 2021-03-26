const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://goblinshark:goblinshark@cluster0.2j9ni.mongodb.net/';

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'resourcus'
})
    .then(() => console.log('Connected to Resourcus DB.'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    image: { type: String },
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

var Team = mongoose.model('Team', teamSchema);

module.exports = { Team };