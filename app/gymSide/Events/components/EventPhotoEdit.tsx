import { View, Text, Button, Pressable } from "react-native"
import { Image } from "expo-image"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import getProfilePic from "../../../functions/getProfilePic"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import deleteImage from "../../../functions/deleteImage"
import uploadImage from "../../../functions/uploadImage"
import { Event } from "../../../@types/firestore"

const getSinglePhoto = async (
  id: string,
  eventId: string,
  setProfilePic: Dispatch<SetStateAction<string>>
) => {
  try {
    if (id) {
      const eventRef = doc(db, "gyms", id, "events", eventId)
      const docSnap = await getDoc(eventRef)

      if (docSnap.exists()) {
        const userData = { ...docSnap.data() } as Event
        const photo = userData.eventPhoto

        setProfilePic(photo)
      }
    }
  } catch (err) {
    console.error(err)
  }
}

type EventPicProps = {
  event: Event
}

const EventEditImage = ({ event }: EventPicProps) => {
  const [image, setImage] = useState<string>("")
  const avatarSize = { height: 150, width: 150 }
  const id = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    if (id) getSinglePhoto(id, event.id, setImage)
  }, [id, event])

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
    <View className="flex flex-row justify-center flex-wrap">
      {image ? (
        <View>
          <Image
            className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-800 border-1 border-solid border-gray-200 border-r-10"
            source={{ uri: image }}
            style={{ width: 150, height: 150 }}
          />
          <Pressable
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2"
            onPress={async () => {
              await pickImage()
              await deleteImage(image)
              await deletePhotoFromFireStore(image)
              await uploadImage(image, "image", image + id, submitNewUserPhotos)
            }}
          >
            <Text>+</Text>
          </Pressable>
        </View>
      ) : (
        <View
          className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-600 border-1 border-solid border-gray-200 border-r-10"
          style={[avatarSize]}
        >
          <Pressable
            onPress={async () => {
              await pickImage()

              //   await uploadImage(image, "image", image + id, submitNewUserPhotos)
            }}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2"
          >
            <Text>+</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default EventEditImage
