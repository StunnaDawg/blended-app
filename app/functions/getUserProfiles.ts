import { collection, getDocs, DocumentSnapshot } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"
import {
  EventsAttending,
  JoinedGymId,
  Reward,
  UserProfile,
} from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getUserProfiles = async (
  setUserProfileData: Dispatch<SetStateAction<UserProfile[]>>,
  collectionString: string,
  subCollectionString: string
) => {
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  try {
    if (currentUser) {
      const userCollection = collection(
        db,
        collectionString,
        currentUser,
        subCollectionString
      )
      const querySnapshot = await getDocs(userCollection)

      const profiles: UserProfile[] = []

      for (const doc of querySnapshot.docs) {
        if (doc.exists()) {
          const userFetchedData = doc.data()
          const userId = doc.id
          const rewardsRef = collection(db, `user/${userId}/earnedRewards`)
          const rewardsData = await getDocs(rewardsRef)
          const rewards = rewardsData.docs.map((doc) => doc.data() as Reward)

          const eventsRef = collection(db, `user/${userId}/eventsGoing`)
          const eventsData = await getDocs(eventsRef)
          const events = eventsData.docs.map(
            (doc) => doc.data() as EventsAttending
          )

          const gymRef = collection(db, `user/${currentUser}/gyms`)
          const gymData = await getDocs(gymRef)
          const gyms = gymData.docs.map((doc) => doc.data() as JoinedGymId)
          const userProfile: UserProfile = {
            ...userFetchedData,
            id: userId,
            firstName: userFetchedData.firstName,
            lastName: userFetchedData.lastName,
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
            gyms: gyms,
            eventsGoing: events,
            points: userFetchedData.points || null,
            earnedRewards: rewards || null,
            createdGym: userFetchedData.createdGym || null,
          }

          profiles.push(userProfile)
        }
      }

      setUserProfileData(profiles)
    }
  } catch (err) {
    console.error(err)
  }
}

export default getUserProfiles
