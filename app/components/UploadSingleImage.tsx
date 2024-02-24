import { View, Text, Pressable, Alert } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import deleteImage from "../functions/deleteImage"
import uploadImage from "../functions/uploadImage"
import { FIREBASE_AUTH, db } from "../../firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

type UploadSingleImageProps = {
  setNewUrl: Dispatch<SetStateAction<string[]>>
  index: number
}

const UploadSingleImage = ({ setNewUrl, index }: UploadSingleImageProps) => {
  const [downloadImage, setDownloadImage] = useState<string>("")
  const [newDownloadImage, setNewDownloadImage] = useState<string>()
  const currentUser = FIREBASE_AUTH.currentUser?.uid

  const createTwoButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Replace", onPress: () => uploadImageNOW() },
    ])

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
          userPhotos: arrayUnion(downloadImage),
        })

        setNewUrl((prevArray) => {
          const newArray = [...prevArray] // Create a shallow copy of the previous array
          newArray[index] = downloadImage // Update the element at the specified index with the new value
          return newArray // Return the updated array
        })
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const setNewDownloadImageFunction = async (imageUrl: string) => {
    if (imageUrl !== undefined) {
      setNewDownloadImage(imageUrl)
      console.log(imageUrl)
    }
  }

  const uploadImageNOW = async () => {
    await setNewDownloadImageFunction(downloadImage)
    if (newDownloadImage)
      uploadImage(
        newDownloadImage,
        currentUser + "image",
        "downloadImage" + downloadImage,
        submitNewUserPhotos
      )
  }
  return (
    <Pressable
      className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2"
      onPress={async () => {
        await pickImage()
        createTwoButtonAlert()
      }}
    >
      <Text>+</Text>
    </Pressable>
  )
}

export default UploadSingleImage
