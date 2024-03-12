import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"

const updateUsersGyms = async (memberId: string, gymId: string) => {
  const currentUserId = FIREBASE_AUTH.currentUser?.uid
  try {
    if (currentUserId) {
      const docRef = doc(db, "user", memberId)

      await updateDoc(docRef, {
        gyms: arrayUnion(gymId),
      })
    }
  } catch (err) {
    console.error(err)
  }
}

export default updateUsersGyms
