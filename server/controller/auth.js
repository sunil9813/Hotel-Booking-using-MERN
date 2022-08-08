import User from "../model/User.js"
import { createError } from "../utils/error.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)

  try {
    const newUser = new User({
      /*username: req.body.username,
      email: req.body.email,*/
      ...req.body,
      password: hash,
    })

    await newUser.save()
    res.status(200).send("User has beeb created.")
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, "User not found"))

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) return next(createError(404, "Wrong Password or username"))

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

    const { password, isAdmin, ...otherDetails } = user._doc

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin })
  } catch (err) {
    next(err)
  }
}
