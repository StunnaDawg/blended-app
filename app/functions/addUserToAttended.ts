import {
  arrayRemove,
  arrayUnion,
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
      const batch = writeBatch(db)
      const gymRef = doc(db, "gyms", gymId, "events", eventId)

      batch.update(gymRef, {
        attendees: arrayUnion(memberId),
      })
      const eventRef = doc(db, "events", eventId)
      batch.update(eventRef, {
        attendees: arrayUnion(memberId),
      })
      await batch.commit()
      console.log("I RVSP'd")
    } else {
      const batch = writeBatch(db)
      const gymRef = doc(db, "gyms", gymId, "events", eventId)

      batch.update(gymRef, {
        attendees: arrayRemove(memberId),
      })
      const eventRef = doc(db, "events", eventId)
      batch.update(eventRef, {
        attendees: arrayRemove(memberId),
      })
      await batch.commit()
      console.log("I canceled")
    }

    console.log("hello...?")
    setLoading(false)
  } catch (err) {
    console.error(err)
  }
}

export default updateEventAttendees