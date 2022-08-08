import "./newRoom.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useState } from "react"
import { roomInputs } from "../../formSource"
import useFetch from "../../hooks/useFetch"
import axios from "axios"

const NewRoom = () => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(null)
  const [rooms, setRooms] = useState(null)
  const { data, loading, error } = useFetch("/hotels")

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const roomNumber = rooms.split(",").map((room) => ({ number: room }))

    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumber })
    } catch (error) {}
  }
  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>Add New Room</h1>
        </div>
        <div className='bottom'>
          <div className='right'>
            <form>
              {roomInputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
              <div className='formInput'>
                <label>Rooms</label>
                <textarea onChange={(e) => setRooms(e.target.value)} placeholder='Give Comma between room number.'></textarea>
              </div>
              <div className='formInput'>
                <label>Choose a Hotel</label>
                <select id='hotelId' onChange={(e) => setHotelId(e.target.value)}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel.id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRoom
