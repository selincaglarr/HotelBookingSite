//get all rooms
//get all free rooms (which is not reserved)
//update rooms if someone reserved

//update customer if it is admin
//post new rooms if it is admin
// const auth = require("../middleware/auth");

const { Room, validate } = require("../models/room");
const { Reservation } = require("../models/reservation");
const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const rooms = await Room.find().sort("room_number");
  res.send(rooms);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const room = await Room.findById(req.body.roomId);
  if (!room) return res.status(400).send("Invalid room.");

  let room = new Room({
    reservation: {
      required: false,
      Reservation: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      },
    },
    reserved: [
      {
        from: String,
        to: String,
      },
    ],
  });
  await room.save();

  res.send(room);
});
