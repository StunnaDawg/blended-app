import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase"
import { Dispatch, SetStateAction } from "react"

const uploadImage = async (
  uri: string,
  fileType: string,
  imageName: string,
  imageState: Dispatch<SetStateAction<string[]>>
) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  const min = 1 // Minimum value (inclusive)
  const max = 100 // Maximum value (exclusive)

  const randomInt = Math.floor(Math.random() * (max - min) + min)

  const fileName = imageName + randomInt.toString()
  const storageRef = ref(storage, fileName)
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

        imageState((prev) => [...prev, downloadUrl])
        console.log(imageState)
      })
    }
  )
}

export default uploadImage
