const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    link: { type: String, required: true },
    teamId: { type: String, required: true },
    votes: { type: Number, default: 0 }
}, { timestamps: true });

var Resource = mongoose.model('Resource', resourceSchema);

module.exports = { Resource };