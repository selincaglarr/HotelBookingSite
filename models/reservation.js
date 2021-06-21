const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});
const Reservation = mongoose.model("Reservation", reservationSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: myCustomJoi.string().phoneNumber().validate("+32494567324"),
    email: Joi.string().min(5).max(255).required().email(),
  });

  return schema.validate(customer);
}

exports.Reservation = Reservation;
exports.validate = validateCustomer;
