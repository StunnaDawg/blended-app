import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase"
import { Dispatch, SetStateAction } from "react"

const uploadImage = async (
  uri: string,
  fileType: string,
  imageName: string,
  handleImageUpload: (imageDownload: string) => void
) => {
  console.log("prop", uri)
  const response = await fetch(uri)
  console.log("the response before upload", response)
  const blob = await response.blob()
  const min = 1 // Minimum value (inclusive)
  const max = 100 // Maximum value (exclusive)

  const randomInt = Math.floor(Math.random() * (max - min) + min)

  const fileName = imageName + randomInt.toString()
  const storageRef = ref(storage, fileName)
  console.log("storageRef", storageRef)
  const uploadTask = uploadBytesResumable(storageRef, blob)

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log("Progress", progress, "% done")
    },
    (err) => {
      console.error(err)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
        console.log("file avalible at", downloadUrl)
        handleImageUpload(downloadUrl)
      })
    }
  )
}

export default uploadImage
