import { collection, getDocs, DocumentSnapshot } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"
import { EventsAttending, UserProfile } from "../@types/firestore"
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

      querySnapshot.forEach((doc: DocumentSnapshot) => {
        if (doc.exists()) {
          const userFetchedData = doc.data()
          const userId = doc.id

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
            gyms: userFetchedData.gyms || null,
            eventsGoing: null,
          }
          console.log(subCollectionString, userProfile)
          profiles.push(userProfile)
        }
      })

      setUserProfileData(profiles)
    }
  } catch (err) {
    console.error(err)
  }
}

export default getUserProfiles
