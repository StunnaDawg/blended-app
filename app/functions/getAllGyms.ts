import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { GymProfile, UserProfile } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getGymProfiles = async (
  setGymProfileData: Dispatch<SetStateAction<GymProfile[]>>
) => {
  try {
    const gymRef = collection(db, "gym")
    const gymData = await getDocs(gymRef)
    const gymProfiles: GymProfile[] = []

    gymData.forEach((doc) => {
      const gymFetchedData = doc.data()
      const gymId = doc.id
      const gymProfile: GymProfile = {
        gym_id: gymId,
        gym_title: gymFetchedData.gym_title,
        gym_style: gymFetchedData.gym_style,
        country: gymFetchedData.country,
        province: gymFetchedData.province,
        city: gymFetchedData.city,
        gymPhotos: gymFetchedData.gymPhotos,
      }
      gymProfiles.push(gymProfile)
    })

    console.log(gymProfiles)
    setGymProfileData(gymProfiles)
  } catch (err) {
    console.error(err)
  }
}

export default getGymProfiles
