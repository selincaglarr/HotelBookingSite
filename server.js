const config = require("config");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const Joi = require("joi");
const rooms = require("./routes/room");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/booking", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

//middlewares
app.use(express.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(express.json());
app.use("/api/rooms", rooms);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
