import { doc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"

const singleValueEdit = async (
  collectionRef: string,
  valueToUpdate: string,
  updateValue: string
) => {
  const currentUserId = FIREBASE_AUTH.currentUser?.uid
  try {
    if (currentUserId) {
      const docRef = doc(db, collectionRef, currentUserId)

      await updateDoc(docRef, {
        [valueToUpdate]: updateValue,
      })
    }
  } catch (err) {
    console.error(err)
  }
}

export default singleValueEdit
