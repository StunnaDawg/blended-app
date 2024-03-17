import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { Event } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getSingleEvent = async (
  eventId: string,
  setEventData: Dispatch<SetStateAction<Event | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const eventDocRef = doc(db, "events", eventId)
    const docSnapshot = await getDoc(eventDocRef)

    if (docSnapshot.exists()) {
      const eventFetchedData = docSnapshot.data()
      const gymEvent: Event = {
        ...eventFetchedData,
        id: docSnapshot.id,
        gymHost: eventFetchedData.gymHost,
        eventTitle: eventFetchedData.eventTitle,
        description: eventFetchedData.description,
        date: eventFetchedData.date,
        location: eventFetchedData.location,
        price: eventFetchedData.price,
        attendees: eventFetchedData.attendees || [],
        eventPhoto: eventFetchedData.eventPhoto,
      }

      setEventData(gymEvent)
      setLoading(false)
    } else {
      setEventData(null)
      setLoading(false)
    }
  } catch (err) {
    console.error(err)
    setLoading(false)
  }
}

export default getSingleEvent
