import { useEffect, useState } from "react"
import axios from "axios"

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(url)
        setData(res.data)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [url])

  // }, [url]) ==> yo rakhyo bhane chai search garda button ma click garnu pardina automatic update hunxa

  //}, []) ==> yo rakhyo bhane chai search button ma click garnu parxa
  const reFetch = async () => {
    setLoading(true)
    try {
      const res = await axios.get(url)
      setData(res.data)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }
  return { data, loading, error, reFetch }
}
export default useFetch
