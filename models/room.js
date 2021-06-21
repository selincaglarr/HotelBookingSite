const Joi = require("joi");
const mongoose = require("mongoose");
const { reservationSchema } = require("./reservation");

const roomSchema = new mongoose.Schema({
  room_number: Number,
  reservation: {
    required: false,
    type: reservationSchema,
  },
  reserved: [
    {
      from: String,
      to: String,
    },
  ],
});
const Room = mongoose.model("Room", roomSchema);

function validateRoom(room) {
  const schema = Joi.date().greater("now");
  const schema = Joi.object({
    room_number: Joi.string().min(3).required(),
    reservation: Joi.required(false),
    reserved: {
      from: Joi.date().required(),
      to: Joi.date().greater(Joi.ref("from")).required(),
    },
  });

  return schema.validate(room);
}

exports.roomSchema = roomSchema;
exports.Room = Room;
exports.validate = validateRoom;
