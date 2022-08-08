import express from "express"
import { deleteUser, getAllUser, getUser, updateUser } from "../controller/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

/*router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello user,you are login")
})
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("Hello user,you are login and you can delete acount")
})
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello admin,you are login and you can delete all acount")
}) 
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("Hello user,you are login and you can delete acount")
}) 
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello user,you are login")
})*/

//update
router.put("/:id", verifyUser, updateUser)
//delete
router.delete("/:id", verifyUser, deleteUser)
//get
router.get("/:id", verifyUser, getUser)
//get all
router.get("/", verifyAdmin, getAllUser)

export default router
