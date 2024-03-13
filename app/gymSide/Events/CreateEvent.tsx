import { View, Text, TextInput, Pressable } from "react-native"
import { Event } from "../../@types/firestore"
import React, { useState } from "react"
import UploadImage from "../../components/UploadImage"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { ScrollView } from "react-native"
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore"

const CreateEvent = () => {
  const [description, setDescription] = useState<string>("")
  const [eventTitle, setEventTitle] = useState<string>("")
  const [date, setDate] = useState<Date>()
  const [location, setLocation] = useState<string>()
  const [price, setPrice] = useState<string>("")
  const [eventPictures, setEventPictures] = useState<string[]>([])

  const currentGymId = FIREBASE_AUTH.currentUser?.uid
  const submitUserPhotos = async (image: string[]) => {
    try {
      if (currentGymId) {
        const gymRef = doc(db, "gyms", currentGymId, "events")

        await updateDoc(gymRef, {
          eventPictures: arrayUnion(image),
        })
      } else {
        console.log("Gym does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }
  const createEvent = async () => {
    try {
      if (currentGymId) {
        const gymRef = collection(db, "gyms", currentGymId, "events")
        await addDoc(gymRef, {
          gymHost: currentGymId,
          eventTitle: eventTitle,
          description: description,
          location: location,
          date: date,
          price: price,
        })
      } else {
        console.log("Gym does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ScrollView>
      <View className="flex flex-row justify-center">
        <Text className="text-3xl font-semibold">Create Event</Text>
      </View>

      <View>
        <Text>Title</Text>
        <TextInput
          value={eventTitle}
          onChangeText={(title) => setEventTitle(title)}
          placeholder="Add a Title"
        />
      </View>
      <View>
        <Text>Description</Text>
        <TextInput
          value={description}
          onChangeText={(description) => setDescription(description)}
          placeholder="Add a Title"
        />
      </View>
      <View>
        <Text>When?</Text>
        <TextInput placeholder="Add a Title" />
      </View>
      <View>
        <Text>Price?</Text>
        <TextInput
          value={price}
          onChangeText={(price) => setPrice(price)}
          placeholder="Add a Title"
        />
      </View>
      <View>
        <Text>Where?</Text>
        <TextInput
          value={location}
          onChangeText={(location) => setLocation(location)}
          placeholder="Add a Title"
        />
      </View>
      <View>
        <UploadImage setUris={setEventPictures} uris={eventPictures} />
      </View>

      <Pressable
        onPress={() => {
          createEvent()
          submitUserPhotos(eventPictures)
        }}
      >
        <Text className="font-bold text-xl">Create Event</Text>
      </Pressable>
    </ScrollView>
  )
}

export default CreateEvent
