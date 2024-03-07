import { ref, deleteObject, getStorage } from "firebase/storage"

const deleteImage = async (fileLocation: string) => {
  const storage = getStorage()
  const imageRef = ref(storage, fileLocation)

  try {
    deleteObject(imageRef)
      .then(() => {
        console.log("Deleted Image", imageRef)
      })
      .catch((error) => {
        console.log("Error", error)
      })
  } catch (err) {
    console.error(err)
  }
}

export default deleteImage
