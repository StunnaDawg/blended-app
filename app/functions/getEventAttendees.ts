import { collection, getDocs, DocumentSnapshot } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"
import { Attendee, UserProfile } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getEventAttendees = async (
  setUserProfileData: Dispatch<SetStateAction<Attendee[]>>,
  eventId: string
) => {
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  try {
    if (currentUser && eventId) {
      const userCollection = collection(db, "events", eventId, "attendees")
      const querySnapshot = await getDocs(userCollection)

      const profiles: Attendee[] = []

      querySnapshot.forEach((doc: DocumentSnapshot) => {
        if (doc.exists()) {
          const userFetchedData = doc.data()
          const userId = doc.id
          const userProfile: Attendee = {
            ...userFetchedData,
            memberId: userId,
          }
          profiles.push(userProfile)
        }
      })

      setUserProfileData(profiles)
    }
  } catch (err) {
    console.error(err)
  }
}

export default getEventAttendees
