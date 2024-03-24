import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { EventsAttending, Reward, UserProfile } from "../@types/firestore"
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

      const eventsRef = collection(db, `user/${id}/eventsGoing`)
      const eventsData = await getDocs(eventsRef)
      const events = eventsData.docs.map((doc) => doc.data() as EventsAttending)

      const rewardsRef = collection(db, `user/${id}/earnedRewards`)
      const rewardsData = await getDocs(rewardsRef)
      const rewards = rewardsData.docs.map((doc) => doc.data() as Reward)

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
          eventsGoing: events,
          points: userFetchedData.points,
          earnedRewards: rewards,
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
