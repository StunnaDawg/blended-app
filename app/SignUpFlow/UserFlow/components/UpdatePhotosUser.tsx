import React, { useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"
import uploadImage from "../../../functions/uploadImage"

type UpdatePhotosUserProps = {
  id?: string
  imageArray: string[]
}

const UpdatePhotosUser = ({ id, imageArray }: UpdatePhotosUserProps) => {
  const [downloadedImageArray, setDownloadedImageArray] = useState<string[]>([])
  const navigation = useNavigation<NavigationType>()
  const submitUserPhotos = async () => {
    try {
      if (id) {
        const userRef = doc(db, "user", id)

        await updateDoc(userRef, {
          userPhotos: downloadedImageArray,
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
      uploadImage(element, "image", id + "element", setDownloadedImageArray)
    })
  }
  return (
    <Button
      title="Next"
      onPress={async () => {
        await uploadImagesArray()
        await submitUserPhotos()
        navigation.navigate("UserDashboard")
      }}
    />
  )
}

export default UpdatePhotosUser
