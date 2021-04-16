const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    image: { type: String },
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    userList: { type: Array, default: [] },
    resourceCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

var Team = mongoose.model("Team", teamSchema);

module.exports = { Team };
