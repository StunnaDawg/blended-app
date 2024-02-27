import { View, Text, Image, Button } from "react-native"
import React, { useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import getProfilePic from "../functions/getProfilePic"
import { FIREBASE_AUTH, db } from "../../firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import getSinglePhoto from "../functions/getSinglePhoto"
import deleteImage from "../functions/deleteImage"
import uploadImage from "../functions/uploadImage"

type SingleImageProp = {
  index: number
}

const SingleImage = ({ index }: SingleImageProp) => {
  const [image, setImage] = useState<string>("")
  const avatarSize = { height: 150, width: 150 }
  const [uploading, setUploading] = useState<boolean>(false)
  const id = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    if (id) getSinglePhoto(id, setImage, "user", "userPhotos", index)
  }, [])

  const submitNewUserPhotos = async (downloadImage: string) => {
    try {
      if (id) {
        const userRef = doc(db, "user", id)

        await updateDoc(userRef, {
          userPhotos: arrayUnion(downloadImage),
        })

        setImage(downloadImage)
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }
  const deletePhotoFromFireStore = async (fileLocation: string) => {
    try {
      if (id) {
        const userRef = doc(db, "user", id)
        console.log(fileLocation)
        await updateDoc(userRef, {
          userPhotos: arrayRemove(fileLocation),
        })
      } else {
        console.log("Photo does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [9, 16],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      uploadImage(
        result.assets[0].uri,
        "image",
        image + id,
        submitNewUserPhotos
      )
    }
  }

  return (
    <View>
      {image ? (
        <View>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Button
            title="Pick an image from camera roll"
            onPress={async () => {
              await pickImage()
              await deleteImage(image)
              await deletePhotoFromFireStore(image)
              await uploadImage(image, "image", image + id, submitNewUserPhotos)
            }}
          />
        </View>
      ) : (
        <View
          className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-600 border-1 border-solid border-gray-200 border-r-10"
          key={index}
          style={[avatarSize]}
        >
          <Button
            title="Pick an image from camera roll"
            onPress={async () => {
              await pickImage()

              //   await uploadImage(image, "image", image + id, submitNewUserPhotos)
            }}
          />
        </View>
      )}
    </View>
  )
}

export default SingleImage
