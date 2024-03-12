import { View, Text, TextInput } from "react-native"
import { Event } from "../../@types/firestore"
import React, { useState } from "react"
import UploadImage from "../../components/UploadImage"
import UpdatePhotosUser from "../../SignUpFlow/UserFlow/components/UpdatePhotosUser"
import UpdateEventPhotosProps from "./components/UpdatePhotosUser"
import { FIREBASE_AUTH } from "../../../firebase"

const CreateEvent = () => {
  const [description, setDescription] = useState<string>("")
  const [date, setDate] = useState<Date>()
  const [location, setLocation] = useState<string>()
  const [price, setPrice] = useState<number>(0)
  const [eventPictures, setEventPictures] = useState<string[]>([])

  const currentGymId = FIREBASE_AUTH.currentUser?.uid

  return (
    <View>
      <View className="flex flex-row justify-center">
        <Text className="text-3xl font-semibold">Create Event</Text>
      </View>

      <View>
        <Text>Title</Text>
        <TextInput placeholder="Add a Title" />
      </View>
      <View>
        <Text>Description</Text>
        <TextInput placeholder="Add a Title" />
      </View>
      <View>
        <Text>When?</Text>
        <TextInput placeholder="Add a Title" />
      </View>
      <View>
        <Text>Price?</Text>
        <TextInput placeholder="Add a Title" />
      </View>
      <View>
        <Text>Where?</Text>
        <TextInput placeholder="Add a Title" />
      </View>
      <View>
        <UploadImage setUris={setEventPictures} uris={eventPictures} />

        <UpdateEventPhotosProps id={currentGymId} imageArray={eventPictures} />
      </View>
    </View>
  )
}

export default CreateEvent
