import Room from "../model/Room.js"
import Hotel from "../model/Hotel.js"
//import { createError } from "../utils/error.js"

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid
  const newRoom = new Room(req.body)

  try {
    const savedRoom = await newRoom.save()
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
    } catch (err) {
      next(err)
    }
    res.status(200).json(savedRoom)
  } catch (err) {
    next(err)
  }
}

export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(updateRoom)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const getRoom = async (req, res, next) => {
  try {
    const Room = await Room.findById(req.params.id)
    res.status(200).json(Room)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid

  try {
    await Room.findByIdAndDelete(req.params.id)
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
    } catch (err) {
      next(err)
    }
    res.status(200).json("Room has be deleted")
  } catch (err) {
    res.status(500).json(err)
  }
}

export const getAllRoom = async (req, res, next) => {
  try {
    const Rooms = await Room.find()
    res.status(200).json(Rooms)
  } catch (err) {
    next(err)
  }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        // nested data lai updated garnu xa bhane chai yasto methoda ma garxa
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    )
    res.status(200).json("Room status has be updated")
  } catch (err) {
    next(err)
  }
}
