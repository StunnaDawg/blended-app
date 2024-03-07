import React, { useState } from "react"
import { NavigationType, TabNavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"
import uploadImage from "../../../functions/uploadImage"

type UpdatePhotosUserProps = {
  id?: string
  imageArray: string[]
}

const UpdatePhotosUser = ({ id, imageArray }: UpdatePhotosUserProps) => {
  const [downloadedImageArray, setDownloadedImageArray] = useState<string[]>([])
  const navigation = useNavigation<TabNavigationType>()
  const submitUserPhotos = async (image: string) => {
    try {
      if (id) {
        const userRef = doc(db, "user", id)

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

export default UpdatePhotosUser
