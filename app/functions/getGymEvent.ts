import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { Event } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getGymEvent = async (
  gymId: string | undefined,
  eventId: string | undefined,
  setEventData: Dispatch<SetStateAction<Event>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    console.log("starting")

    console.log("eventID", eventId)
    setLoading(true)

    if (gymId && eventId) {
      const eventDocRef = doc(db, "gyms", gymId, "events", eventId)
      const docSnap = await getDoc(eventDocRef)

      if (docSnap.exists()) {
        const eventFetchedData = docSnap.data()
        const eventData = {
          id: eventId,
          gymHost: eventFetchedData.gymHost,
          eventTitle: eventFetchedData.eventTitle,
          description: eventFetchedData.description,
          date: eventFetchedData.date,
          location: eventFetchedData.location,
          price: eventFetchedData.price,
          attendees: eventFetchedData.attendees || [],
          eventPhoto: eventFetchedData.eventPhoto,
        }

        setEventData(eventData)
      } else {
        console.log("No such document!")
      }
    } else {
      console.log("Gym ID or Event ID not provided")
    }
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

export default getGymEvent
