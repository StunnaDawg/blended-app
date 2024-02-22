import { View, Text, Button } from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { FIREBASE_APP, db } from "../../../../firebase"
import uploadImage from "../../../functions/uploadImage"

type GymPhotoProps = {
  id?: string
  imageArray: string[]
}

const GymUploadPhotos = ({ id, imageArray }: GymPhotoProps) => {
  const [downloadedImageArray, setDownloadedImageArray] = useState<string[]>([])
  const navigation = useNavigation<NavigationType>()

  const submitGymPhotos = async (downloadImage: string) => {
    try {
      if (id) {
        const GymRef = doc(db, "gyms", id)

        await updateDoc(GymRef, {
          gymPhotos: arrayUnion(downloadImage),
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
      uploadImage(element, "image", id + "element", submitGymPhotos)
    })
  }
  return (
    <Button
      title="Next"
      onPress={async () => {
        await uploadImagesArray()
        navigation.navigate("GymDashboard")
      }}
    />
  )
}

export default GymUploadPhotos
