import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { UserProfile } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getUserProfile = async (
  id: string | undefined,
  setUserProfileData: Dispatch<SetStateAction<UserProfile>>
) => {
  try {
    if (id) {
      const userRef = doc(db, "user", id)
      const userData = await getDoc(userRef)

      if (userData.exists()) {
        const userFetchedData = { ...userData.data() }
        const userId = userData.id
        const userProfile = {
          ...userFetchedData,
          id: userId,
          firstName: userFetchedData.first_name,
          lastName: userFetchedData.last_name,
          gender: userFetchedData.gender,
          about: userFetchedData?.about,
          activities: userFetchedData.activities,
          personalRecords: userFetchedData?.personalRecords,
          intentions: userFetchedData.intentions,
          food: userFetchedData?.food,
          zodiac: userFetchedData?.zodiac,
          education: userFetchedData?.education,
          career: userFetchedData?.career,
          school: userFetchedData?.school,
          homeGym: userFetchedData?.homeGym,
          userPhotos: userFetchedData.userPhotos,
        }
        console.log(userProfile)
        setUserProfileData(userProfile)
      }
    }
  } catch (err) {
    console.error(err)
  }
}

export default getUserProfile
