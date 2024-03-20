import { Dispatch, SetStateAction } from "react"
import * as Location from "expo-location"
import { useLocation } from "../context/LocationContext"

export const getCity = async (
  setCity: Dispatch<SetStateAction<string | null>>,
  location: Location.LocationObject | null
) => {
  try {
    if (location && location.coords) {
      const { latitude, longitude } = location.coords
      console.log(latitude, longitude)
      let currentCity = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      })

      if (currentCity.length > 0 && currentCity[0].city) {
        setCity(currentCity[0].city)
      } else {
        console.log("City not found in the geocoded results")
      }
    } else {
      console.log("didn't call")
    }
  } catch (err) {
    console.error(err)
  }
}
