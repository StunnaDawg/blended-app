import React, { useState } from "react"
import { NavigationType, TabNavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Button, Pressable, Text } from "react-native"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"
import uploadImage from "../../../functions/uploadImage"

type UpdatePhotosUserProps = {
  id?: string
  imageArray: string[]
  disable: boolean
}

const UpdatePhotosUser = ({
  id,
  imageArray,
  disable,
}: UpdatePhotosUserProps) => {
  const [pressed, setPressed] = useState<boolean>(false)

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
    <Pressable
      disabled={disable}
      className={`border-2 w-96 items-center ${
        disable === true ? "bg-gray-200" : pressed ? "bg-gray-light" : "bg-gray"
      }`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={async () => {
        await uploadImagesArray()
        navigation.navigate("Events")
      }}
    >
      <Text className="font-bold text-2xl">Finish</Text>
    </Pressable>
  )
}

export default UpdatePhotosUser
