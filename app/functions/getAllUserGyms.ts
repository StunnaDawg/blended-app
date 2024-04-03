import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import {
  Event,
  GymChatChannel,
  GymProfile,
  JoinedGymId,
  Reward,
  UserProfile,
} from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getUserJoinedGym = async (
  setGymProfileData: Dispatch<SetStateAction<GymProfile[] | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  gymIds: JoinedGymId[]
) => {
  setLoading(true)

  try {
    const gymProfilesPromises = gymIds.map(async (joinedGymIdObj) => {
      const gymId = joinedGymIdObj.gymId
      const gymRef = doc(db, "gyms", gymId)
      const gymSnap = await getDoc(gymRef)

      if (!gymSnap.exists()) {
        console.log(`No gym found with ID ${gymId}`)
        return null
      }

      const gymFetchedData = gymSnap.data()

      // Fetch members
      const membersRef = collection(db, `gyms/${gymId}/members`)
      const membersSnap = await getDocs(membersRef)
      const members = membersSnap.docs.map((doc) => doc.data() as UserProfile)

      // Fetch coaches
      const coachesRef = collection(db, `gyms/${gymId}/coaches`)
      const coachesSnap = await getDocs(coachesRef)
      const coaches = coachesSnap.docs.map((doc) => doc.data() as UserProfile)

      // Fetch events
      const eventsRef = collection(db, `gyms/${gymId}/events`)
      const eventsSnap = await getDocs(eventsRef)
      const events = eventsSnap.docs.map((doc) => doc.data() as Event)

      // Fetch rewards
      const rewardsRef = collection(db, `gyms/${gymId}/rewards`)
      const rewardsSnap = await getDocs(rewardsRef)
      const rewards = rewardsSnap.docs.map((doc) => doc.data() as Reward)

      // Fetch channels
      const channelRef = collection(db, `gyms/${gymId}/channels`)
      const channelSnap = await getDocs(channelRef)
      const channels = channelSnap.docs.map(
        (doc) => doc.data() as GymChatChannel
      )

      // Construct the GymProfile object
      const gymProfile: GymProfile = {
        gymId: gymId,
        gymOwner: gymFetchedData.gymOwner,
        gym_title: gymFetchedData.gym_title,
        gym_style: gymFetchedData.gym_style,
        country: gymFetchedData.country,
        province: gymFetchedData.province,
        city: gymFetchedData.city,
        gymPhotos: gymFetchedData.gymPhotos,
        about: gymFetchedData.about,
        members: members,
        coaches: coaches,
        events: events,
        rewards: rewards,
        gymChatChannels: channels,
      }

      return gymProfile
    })

    const gymProfiles = (await Promise.all(gymProfilesPromises)).filter(
      (profile): profile is GymProfile => profile !== null
    ) as GymProfile[]
    setGymProfileData(gymProfiles)
  } catch (err) {
    console.error("Failed to fetch gym profiles:", err)
  } finally {
    setLoading(false)
  }
}

export default getUserJoinedGym
