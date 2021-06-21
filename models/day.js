const mongoose = require("mongoose");
const roomSchema = require("./room").schema;

const daySchema = new mongoose.Schema({
  date: Date,
  rooms: [roomSchema],
});
const Day = mongoose.model("Day", daySchema);
module.exports.model = Day;
module.exports.schema = daySchema;
