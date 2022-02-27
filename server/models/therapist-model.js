const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Therapist = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("therapist", Therapist);
