import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"

const updateEventAttendees = async (
  memberId: string,
  gymId: string,
  eventId: string,
  newAttendee: boolean
) => {
  try {
    if (newAttendee) {
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
    }
  } catch (err) {
    console.error(err)
  }
}

export default updateEventAttendees
