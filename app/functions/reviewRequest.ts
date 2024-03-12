import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"

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
        const userFetchedData = { ...userData.data() }
        const userId = userData.id
        await setDoc(doc(db, "gyms", currentUser, requestType, requestId), {
          ...userFetchedData,
          id: userId,
          firstName: userFetchedData.first_name,
          lastName: userFetchedData.last_name,
          gender: userFetchedData.gender,
          about: userFetchedData.about || null,
          activities: userFetchedData.activities,
          personalRecords: userFetchedData.personalRecords || null,
          intentions: userFetchedData.intentions,
          diet: userFetchedData.diet || null,
          zodiac: userFetchedData.zodiac || null,
          education: userFetchedData.education || null,
          jobTitle: userFetchedData.jobTitle || null,
          school: userFetchedData.school || null,
          homeGym: userFetchedData.homeGym || null,
          userPhotos: userFetchedData.userPhotos,
          birthday: userFetchedData.birthday || null,
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
