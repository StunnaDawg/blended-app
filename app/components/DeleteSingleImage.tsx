import { View, Text, Pressable } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import deleteImage from "../functions/deleteImage"
import uploadImage from "../functions/uploadImage"
import { FIREBASE_AUTH, db } from "../../firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

type UploadSingleImageProps = {
  fileLocation: string
  setNewUrl: Dispatch<SetStateAction<string[]>>
  index: number
}

const DeleteSingleImage = ({
  fileLocation,
  setNewUrl,
  index,
}: UploadSingleImageProps) => {
  const [downloadImage, setDownloadImage] = useState<string>("")
  const currentUser = FIREBASE_AUTH.currentUser?.uid

  const deletePhotoFromFireStore = async (fileLocation: string) => {
    try {
      if (currentUser) {
        const userRef = doc(db, "user", currentUser)
        console.log(fileLocation)
        await updateDoc(userRef, {
          userPhotos: arrayRemove(fileLocation),
        })

        setNewUrl((prevArray) => {
          const newArray = [...prevArray] // Create a shallow copy of the previous array
          newArray[index] = "" // Update the element at the specified index with the new value
          return newArray // Return the updated array
        })
      } else {
        console.log("Photo does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    console.log(downloadImage)
  }, [downloadImage])

  return (
    <Pressable
      className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2"
      onPress={async () => {
        await deleteImage(fileLocation)
        await deletePhotoFromFireStore(fileLocation)
      }}
    >
      <Text>+</Text>
    </Pressable>
  )
}

export default DeleteSingleImage
