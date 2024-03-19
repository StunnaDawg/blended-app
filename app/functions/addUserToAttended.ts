import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
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
    setLoading(true)
    if (!newAttendee) {
      const gymRef = collection(
        db,
        "gyms",
        gymId,
        "events",
        eventId,
        "attendees"
      )

      await addDoc(gymRef, {
        memberId: memberId,
      })
      const eventRef = collection(db, "events")
      await addDoc(eventRef, {
        memberId: memberId,
      })

      console.log("I RVSP'd")
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
      deleteDoc(gymRef)
      deleteDoc(eventRef)

      console.log("I canceled")
    }

    console.log("hello...?")
    setLoading(false)
  } catch (err) {
    console.error(err)
  }
}

export default updateEventAttendees
