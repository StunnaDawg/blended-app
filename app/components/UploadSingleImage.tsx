import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import deleteImage from "../functions/deleteImage"
import uploadImage from "../functions/uploadImage"
import { FIREBASE_AUTH, db } from "../../firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

type UploadSingleImageProps = {
  fileLocation: string
  index: number
}

const UploadSingleImage = ({ fileLocation, index }: UploadSingleImageProps) => {
  const [downloadImage, setDownloadImage] = useState<string>("")
  const currentUser = FIREBASE_AUTH.currentUser?.uid

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [9, 16],
      quality: 1,
      allowsEditing: true,
    })

    if (!result.canceled) {
      setDownloadImage(result.assets[0].uri)
      console.log(result.assets[0].uri)
    }
  }

  const submitNewUserPhotos = async (downloadImage: string) => {
    try {
      if (currentUser) {
        const userRef = doc(db, "user", currentUser)

        await updateDoc(userRef, {
          gymPhotos: arrayRemove(fileLocation),
        })
        await updateDoc(userRef, {
          gymPhotos: arrayUnion(downloadImage),
        })
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    console.log(downloadImage)
    if (downloadImage) {
      uploadImage(downloadImage, "image", downloadImage, submitNewUserPhotos)
    }
  }, [downloadImage])

  return (
    <Pressable
      className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2"
      onPress={async () => {
        await pickImage()
      }}
    >
      <Text>+</Text>
    </Pressable>
  )
}

export default UploadSingleImage
