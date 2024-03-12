import { doc, getDoc, setDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"

const requestToGym = async (gymId: string, requestType: string) => {
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  try {
    if (currentUser) {
      const userRef = doc(db, "user", currentUser)
      const userData = await getDoc(userRef)

      if (userData.exists()) {
        const userFetchedData = { ...userData.data() }
        const userId = userData.id
        await setDoc(doc(db, "gyms", gymId, requestType, currentUser), {
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
      }
    }
  } catch (err) {
    console.error(err)
  }
}

export default requestToGym
