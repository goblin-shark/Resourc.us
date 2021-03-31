const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    title: { type: String },
    teamId: { type: Number, required: true },
}, { timestamps: true });

var Resource = mongoose.model('Resource', resourceSchema);

module.exports = { Resource };