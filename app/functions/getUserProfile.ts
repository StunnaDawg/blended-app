import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { UserProfile } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getUserProfile = async (
  id: string | undefined,
  setUserProfileData: Dispatch<SetStateAction<UserProfile>>,
  setLoading: Dispatch<SetStateAction<boolean>>
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
          about: userFetchedData.about || null,
          activities: userFetchedData.activities,
          personalRecords: userFetchedData.personalRecords || null,
          intentions: userFetchedData.intentions,
          diet: userFetchedData.diet || null,
          zodiac: userFetchedData.zodiac || null,
          education: userFetchedData.education || null,
          jobTitle: userFetchedData.jobTitle || null,
          school: userFetchedData.school || null,
          homeGym: userFetchedData.homeGym || null,
          userPhotos: userFetchedData.userPhotos,
          birthday: userFetchedData.birthday || null,
          gyms: userFetchedData.gyms || null,
        }
        console.log(userProfile)
        setUserProfileData(userProfile)
        setLoading(false)
      }
    }
  } catch (err) {
    console.error(err)
    setLoading(false)
  }
}

export default getUserProfile
