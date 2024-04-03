import { doc, getDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"
import updateUsersGyms from "./updateUserHomeGym"

const reviewRequest = async (
  requestId: string,
  requestType: string,
  deleteFrom: string,
  answer: boolean
) => {
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  try {
    if (currentUser && answer === true) {
      const userRef = doc(db, "user", requestId)
      const userData = await getDoc(userRef)

      if (userData.exists()) {
        const userId = userData.id
        await setDoc(doc(db, "gyms", currentUser, requestType, requestId), {
          id: userId,
        })
        await updateDoc(doc(db, "user", requestId), {
          homeGym: currentUser,
        })
        await setDoc(doc(db, "user", requestId, "gyms", currentUser), {
          gymId: currentUser,
        })
        await deleteDoc(doc(db, "gyms", currentUser, deleteFrom, requestId))
      }
    } else {
      if (currentUser)
        await deleteDoc(doc(db, "gyms", currentUser, deleteFrom, requestId))
    }
  } catch (err) {
    console.error(err)
  }
}

export default reviewRequest
