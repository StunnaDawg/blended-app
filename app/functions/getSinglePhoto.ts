import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { UserProfile } from "../@types/firestore"
import { Dispatch, SetStateAction } from "react"

const getSinglePhoto = async (
  id: string,
  setProfilePic: Dispatch<SetStateAction<string>>,
  docType: string,
  photoType: string,
  index: number
) => {
  try {
    if (id) {
      const userRef = doc(db, docType, id)
      const docSnap = await getDoc(userRef)

      if (docSnap.exists()) {
        const userData = { ...docSnap.data() }

        setProfilePic(userData[photoType][index])
      }
    }
  } catch (err) {
    console.error(err)
  }
}

export default getSinglePhoto
