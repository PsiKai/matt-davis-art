import { useEffect, useContext } from "react"
import axios from "axios"
import AppContext from "../context/AppContext"

export const useArtRefresh = () => {
  const { dispatch } = useContext(AppContext)

  async function refreshArt() {
    const res = await axios.get("/api/artwork/refresh")
    dispatch({
      type: "GET_ART",
      payload: res.data,
    })
  }

  return refreshArt
}

export const useArtApi = () => {
  const { dispatch, prints, gallery } = useContext(AppContext)

  useEffect(() => {
    async function getArt() {
      const res = await axios.get("/api/artwork")
      dispatch({
        type: "GET_ART",
        payload: res.data,
      })
    }
    if (!prints || !gallery) getArt()
  }, [gallery, prints, dispatch])
}
