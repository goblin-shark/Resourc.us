const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    // TODO: Determine all resource information we want to store
    title: { type: String },
    link: { type: String, required: true },
}, { timestamps: true });

var Resource = mongoose.model('Resource', resourceSchema);

module.exports = { Resource };