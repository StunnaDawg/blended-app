import { DocumentSnapshot, collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { Event } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getGymEvents = async (
  gymId: string | undefined,
  setEventDataArray: Dispatch<SetStateAction<Event[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (gymId) {
      const eventCollection = collection(db, "gyms", gymId, "events")
      const querySnapshot = await getDocs(eventCollection)

      const events: Event[] = []

      querySnapshot.forEach((doc: DocumentSnapshot) => {
        if (doc.exists()) {
          const eventFetchedData = doc.data()
          const eventId = doc.id
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
            eventPictures: eventFetchedData.eventPictures || [],
          }
          events.push(gymEvent)
        }
      })

      setEventDataArray(events)
      console.log("achieved")
      setLoading(false)
    } else {
      console.log("Gym ID not provided")
    }
  } catch (err) {
    console.error(err)
    setLoading(false) // Ensure loading is set to false in case of an error as well
  }
}

export default getGymEvents
