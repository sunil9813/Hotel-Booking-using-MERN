import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
//import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import hotelsRoutes from "./routes/hotels.js"
import roomsRoutes from "./routes/rooms.js"

const app = express()
dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL)
    console.log("connected to mongodb")
  } catch (error) {
    throw error
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected")
})

app.get("/", (req, res) => {
  res.send("hello")
})

// middelewares
//app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/hotels", hotelsRoutes)
app.use("/api/rooms", roomsRoutes)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(5000, () => {
  connect()
  console.log("connected to backend")
})
