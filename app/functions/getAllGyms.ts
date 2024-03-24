import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { Event, GymProfile, Reward, UserProfile } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getGymProfiles = async (
  setGymProfileData: Dispatch<SetStateAction<GymProfile[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const gymRef = collection(db, "gyms")
    const gymData = await getDocs(gymRef)
    const gymProfilesPromises = gymData.docs.map(async (doc) => {
      const gymFetchedData = doc.data()
      const gymId = doc.id

      const membersRef = collection(db, `gyms/${gymId}/members`)
      const membersData = await getDocs(membersRef)
      const members = membersData.docs.map((doc) => doc.data() as UserProfile)

      const coachesRef = collection(db, `gyms/${gymId}/coaches`)
      const coachesData = await getDocs(coachesRef)
      const coaches = coachesData.docs.map((doc) => doc.data() as UserProfile)

      const eventsRef = collection(db, `gyms/${gymId}/events`)
      const eventsData = await getDocs(eventsRef)
      const events = eventsData.docs.map((doc) => doc.data() as Event)

      const rewardsRef = collection(db, `gyms/${gymId}/rewards`)
      const rewardsData = await getDocs(rewardsRef)
      const rewards = rewardsData.docs.map((doc) => doc.data() as Reward)

      const gymProfile: GymProfile = {
        gymId: gymId,
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
      }
      return gymProfile
    })

    const gymProfiles = await Promise.all(gymProfilesPromises)

    console.log("gym profiles", gymProfiles)
    setGymProfileData(gymProfiles)
    setLoading(false)
  } catch (err) {
    console.error(err)
    setLoading(false)
  }
}

export default getGymProfiles
