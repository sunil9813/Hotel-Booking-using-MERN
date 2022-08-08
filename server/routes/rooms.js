import express from "express"
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from "../controller/room.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

//create
router.post("/:hotelid", verifyAdmin, createRoom)
//update
router.put("/:id", verifyAdmin, updateRoom)

//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)
//get
router.get("/:id", getRoom)
//get all
router.get("/", getAllRoom)

// update date of room
router.put("/availability/:id", updateRoomAvailability)
export default router
