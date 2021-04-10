const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    link: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    teamId: { type: String, required: true },
    votes: { type: Number, default: 0 },
    category: { type: String, required: true },
    tags: { type: [String], default: [] }
}, { timestamps: true });

var Resource = mongoose.model('Resource', resourceSchema);

module.exports = { Resource };