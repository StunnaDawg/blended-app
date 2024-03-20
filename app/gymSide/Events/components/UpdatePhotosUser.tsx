import React, { useState } from "react"
import { NavigationType, TabNavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"
import uploadImage from "../../../functions/uploadImage"

type UpdateEventPhotosProps = {
  id?: string
  imageArray: string[]
}

const UpdateEventPhotosProps = ({ id, imageArray }: UpdateEventPhotosProps) => {
  const navigation = useNavigation<TabNavigationType>()
  const submitUserPhotos = async (image: string) => {
    try {
      if (id) {
        const userRef = doc(db, "gyms", id, "events")

        await updateDoc(userRef, {
          userPhotos: arrayUnion(image),
        })
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const uploadImagesArray = async () => {
    imageArray.forEach((element) => {
      uploadImage(element, "image", id + "element", submitUserPhotos)
      console.log(element)
    })
  }
  return (
    <Button
      title="Next"
      onPress={async () => {
        await uploadImagesArray()
        navigation.navigate("Dashboard")
      }}
    />
  )
}

export default UpdateEventPhotosProps
