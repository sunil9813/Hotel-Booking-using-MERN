import Hotel from "../model/Hotel.js"
import Room from "../model/Room.js"

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body)
  try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  } catch (err) {
    next(err)
  }
}

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(updateHotel)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json("Hotel has be deleted")
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAllHotel = async (req, res, next) => {
  const { min, max, ...other } = req.query
  try {
    const hotels = await Hotel.find({ ...other, cheapestPrice: { $gt: min | 1, $lt: max || 999 } }).limit(req.query.limit)
    res.status(200).json(hotels)
  } catch (error) {
    next(error)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city })
      })
    )
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}
export const countByType = async (req, res, next) => {
  try {
    const hotelConut = await Hotel.countDocuments({ type: "hotel" })
    const resortConut = await Hotel.countDocuments({ type: "resort" })
    const villaConut = await Hotel.countDocuments({ type: "villa" })
    const cabinConut = await Hotel.countDocuments({ type: "cabin" })

    res.status(200).json([
      { type: "hotel", count: hotelConut },
      { type: "resort", count: resortConut },
      { type: "villa", count: villaConut },
      { type: "cabin", count: cabinConut },
    ])
  } catch (error) {
    next(error)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )
    res.status(200).json(list)
  } catch (err) {
    console.log(err)
  }
}
