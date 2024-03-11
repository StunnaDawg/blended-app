import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { GymProfile, UserProfile } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getSingleGym = async (
  id: string | undefined,
  setGymProfileData: Dispatch<SetStateAction<GymProfile>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (id) {
      const gymRef = doc(db, "gym", id)
      const gymData = await getDoc(gymRef)

      if (gymData.exists()) {
        const gymFetchedData = { ...gymData.data() }
        const gymId = gymFetchedData.id
        const gymProfile = {
          ...gymFetchedData,
          gym_id: gymId,
          gym_title: gymFetchedData.gym_title,
          gym_style: gymFetchedData.gym_style,
          country: gymFetchedData.country,
          province: gymFetchedData.province,
          city: gymFetchedData.city,
          gymPhotos: gymFetchedData.gymPhotos,
          about: gymFetchedData.about,
          coaches: gymFetchedData.coaches,
          members: gymFetchedData.members,
        }
        setGymProfileData(gymProfile)
        setLoading(false)
      }
    }
    console.log("nothign returned")
  } catch (err) {
    console.error(err)
  }
}

export default getSingleGym
