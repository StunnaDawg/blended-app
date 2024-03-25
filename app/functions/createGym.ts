import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { GymProfile } from "../@types/firestore"

const createGym = async (
  id: string,
  gym_title: string,
  gym_style: string,
  country: string,
  province: string,
  city: string,
  gymPhotos: string[]
) => {
  const gymDocRef = doc(collection(db, "gyms"), id)

  await setDoc(gymDocRef, {
    gymId: id,
    gymOwner: id,
    gym_title: gym_title,
    gym_style: gym_style,
    country: country,
    province: province,
    city: city,
    gymPhotos: gymPhotos,
  } as GymProfile)
}

export default createGym
