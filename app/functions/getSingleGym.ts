import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { GymProfile, UserProfile } from "../@types/firestore"
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

      if (gymData.exists()) {
        const gymFetchedData = { ...gymData.data() }
        const gymId = gymFetchedData.id
        const gymProfile = {
          ...gymFetchedData,
          gymId: gymId,
          gym_title: gymFetchedData.gym_title,
          gym_style: gymFetchedData.gym_style,
          country: gymFetchedData.country,
          province: gymFetchedData.province,
          city: gymFetchedData.city,
          gymPhotos: gymFetchedData.gymPhotos,
          about: gymFetchedData.about,
          coaches: coaches,
          members: members,
        }
        setGymProfileData(gymProfile)
        setLoading(false)
      }
    } else {
      console.log("nothign returned")
    }
  } catch (err) {
    console.error(err)
  }
}

export default getSingleGym
