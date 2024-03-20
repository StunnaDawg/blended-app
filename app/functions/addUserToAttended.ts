import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore"
import { db } from "../../firebase"
import { Dispatch, SetStateAction } from "react"

const updateEventAttendees = async (
  memberId: string,
  gymId: string,
  eventId: string,
  newAttendee: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (!newAttendee) {
      const gymRef = collection(
        db,
        "gyms",
        gymId,
        "events",
        eventId,
        "attendees"
      )
      const eventRef = collection(db, "events", eventId, "attendees")
      const memberRef = doc(gymRef, memberId)
      const memberEventRef = doc(eventRef, memberId)
      await setDoc(memberRef, { memberId: memberId })
      await setDoc(memberEventRef, { memberId: memberId })

      setLoading(false)
    } else {
      const gymRef = doc(
        db,
        "gyms",
        gymId,
        "events",
        eventId,
        "attendees",
        memberId
      )

      const eventRef = doc(db, "events", eventId, "attendees", memberId)
      await deleteDoc(gymRef)
      await deleteDoc(eventRef)

      console.log("I canceled")
      setLoading(false)
    }
  } catch (err) {
    console.error(err)
    setLoading(false)
  }
}

export default updateEventAttendees
