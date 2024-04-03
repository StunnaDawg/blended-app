import {
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore"
import { db } from "../../firebase"
import { Event } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getUserEvent = async (
  setEventDataArray: Dispatch<SetStateAction<Event[]>>,
  userId: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)

    const eventsGoingRef = collection(db, "user", userId, "eventsGoing")
    const querySnapshot = await getDocs(eventsGoingRef)

    const events: Event[] = []

    for (const eventDoc of querySnapshot.docs) {
      console.log("event doc", eventDoc)
      if (eventDoc.exists()) {
        const eventId = eventDoc.id
        const eventRef = doc(db, "events", eventId)
        const eventSnapshot = await getDoc(eventRef)

        if (eventSnapshot.exists()) {
          const eventFetchedData = eventSnapshot.data()
          const gymEvent: Event = {
            ...eventFetchedData,
            id: eventId,
            gymHost: eventFetchedData.gymHost,
            eventTitle: eventFetchedData.eventTitle,
            description: eventFetchedData.description,
            date: eventFetchedData.date,
            location: eventFetchedData.location,
            price: eventFetchedData.price,
            attendees: eventFetchedData.attendees || [],
            eventPhoto: eventFetchedData.eventPhoto,
          } as Event
          events.push(gymEvent)
        }
      }
    }

    setEventDataArray(events)
    setLoading(false)
  } catch (err) {
    console.error(err)
    setLoading(false)
  }
}

export default getUserEvent
