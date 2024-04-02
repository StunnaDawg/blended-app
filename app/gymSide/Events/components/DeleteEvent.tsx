import { Pressable } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import { deleteDoc, doc, getDoc } from "firebase/firestore"
import { db } from "../../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import deleteImage from "../../../functions/deleteImage"
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

type DeleteEventProp = {
  eventId: string
  gymId: string | undefined | null
}
const DeleteEvent = ({ eventId, gymId }: DeleteEventProp) => {
  const [image, setImage] = useState("")
  const navigation = useNavigation<NavigationType>()
  const deleteEvent = async () => {
    if (gymId) {
      const eventRef = doc(db, "gyms", gymId, "events", eventId)
      await deleteDoc(eventRef)
    }
  }

  useEffect(() => {
    if (gymId) getSinglePhoto(gymId, eventId, setImage)
  }, [gymId, eventId])
  return (
    <Pressable
      onPress={async () => {
        if (image !== "") {
          await deleteImage(image)
        }
        await deleteEvent()
        navigation.goBack()
      }}
    >
      <FontAwesome6 name="trash-can" size={24} color="black" />
    </Pressable>
  )
}

export default DeleteEvent
