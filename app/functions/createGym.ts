import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { db } from "../../firebase"
import { GymProfile } from "../@types/firestore"
import uploadImage from "./uploadImage"

const createGym = async (
  id: string,
  gym_title: string,
  gym_style: string,
  country: string,
  province: string,
  city: string,
  imageArray: string[]
) => {
  const gymDocRef = doc(collection(db, "gyms"), id)
  const userRef = doc(db, "user", id)

  await setDoc(gymDocRef, {
    gymId: id,
    gymOwner: id,
    gym_title: gym_title,
    gym_style: gym_style,
    country: country,
    province: province,
    city: city,
  } as GymProfile)

  const submitGymPhotos = async (downloadImage: string) => {
    try {
      if (id) {
        const GymRef = doc(db, "gyms", id)

        await updateDoc(GymRef, {
          gymPhotos: arrayUnion(downloadImage),
        })
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }
  imageArray.forEach((element) => {
    uploadImage(element, "image", id + "element", submitGymPhotos)
  })

  await updateDoc(userRef, {
    createdGym: id,
  })
}

export default createGym
