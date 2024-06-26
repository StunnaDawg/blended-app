import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import {
  Event,
  GymChatChannel,
  GymProfile,
  Reward,
  UserProfile,
} from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getSingleGym = async (
  id: string | undefined,
  setGymProfileData: Dispatch<SetStateAction<GymProfile>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (id) {
      console.log("getting gym", id)
      const gymRef = doc(db, "gyms", id)
      const gymData = await getDoc(gymRef)

      const membersRef = collection(db, `gyms/${id}/members`)
      const membersData = await getDocs(membersRef)
      const members = membersData.docs.map((doc) => doc.data() as UserProfile)

      const coachesRef = collection(db, `gyms/${id}/coaches`)
      const coachesData = await getDocs(coachesRef)
      const coaches = coachesData.docs.map((doc) => doc.data() as UserProfile)

      const eventsRef = collection(db, `gyms/${id}/events`)
      const eventsData = await getDocs(eventsRef)
      const events = eventsData.docs.map((doc) => doc.data() as Event)

      const rewardsRef = collection(db, `gyms/${id}/rewards`)
      const rewardsData = await getDocs(rewardsRef)
      const rewards = rewardsData.docs.map((doc) => doc.data() as Reward)

      const channelRef = collection(db, `gyms/${id}/channels`)
      const channelData = await getDocs(channelRef)
      const channel = channelData.docs.map(
        (doc) => doc.data() as GymChatChannel
      )

      if (gymData.exists()) {
        const gymFetchedData = { ...gymData.data() }
        const gymId = gymFetchedData.id
        const gymProfile = {
          ...gymFetchedData,
          gymId: gymId,
          gymOwner: gymFetchedData.gymOwner,
          gym_title: gymFetchedData.gym_title,
          gym_style: gymFetchedData.gym_style,
          country: gymFetchedData.country,
          province: gymFetchedData.province,
          city: gymFetchedData.city,
          gymPhotos: gymFetchedData.gymPhotos,
          about: gymFetchedData.about,
          coaches: coaches,
          members: members,
          events: events,
          rewards: rewards,
          gymChatChannels: channel,
        }
        setGymProfileData(gymProfile)
        setLoading(false)
      }
    } else {
      console.log("id undefined")
    }
  } catch (err) {
    console.log("failed")
    console.error(err)
    if (err instanceof Error) {
      console.error(err.stack)
    }
  }
}

export default getSingleGym
