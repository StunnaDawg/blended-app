import { View, Text, Pressable, Alert } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import deleteImage from "../functions/deleteImage"
import uploadImage from "../functions/uploadImage"
import { FIREBASE_AUTH, db } from "../../firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

type UploadSingleImageProps = {
  setImageTrigger: Dispatch<SetStateAction<boolean>>
  imageTrigger: boolean
  setDownloadNewImage: Dispatch<SetStateAction<string>>
}

const UploadSingleImage = ({
  imageTrigger,
  setImageTrigger,
  setDownloadNewImage,
}: UploadSingleImageProps) => {
  //   const createTwoButtonAlert = () =>
  //     Alert.alert("Alert Title", "My Alert Msg", [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel",
  //       },
  //       { text: "Replace", onPress: () => uploadImageNOW() },
  //     ])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [9, 16],
      quality: 1,
      allowsEditing: true,
    })

    if (!result.canceled) {
      setDownloadNewImage(result.assets[0].uri)
      setImageTrigger(!imageTrigger)
    }
  }

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
