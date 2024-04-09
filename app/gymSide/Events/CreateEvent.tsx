import {
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Platform,
} from "react-native"

import React, { useState } from "react"

import { FIREBASE_AUTH, db } from "../../../firebase"
import { ScrollView } from "react-native"
import { addDoc, collection, doc, setDoc, writeBatch } from "firebase/firestore"
import { useLocation } from "../../context/LocationContext"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import uploadImage from "../../functions/uploadImage"
import UploadEventImage from "../../components/UploadEventImage"
import BackButton from "../../components/BackButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const CreateEvent = () => {
  const { location, errorMsg } = useLocation()
  const [description, setDescription] = useState<string>("")
  const [eventTitle, setEventTitle] = useState<string>("")
  const [date, setDate] = useState<Date>(new Date())
  const [price, setPrice] = useState<string>("")
  const [eventPicture, setEventPicture] = useState<string>("")
  const [mode, setMode] = useState<any>("date")
  const [show, setShow] = useState(false)
  const [newEventID, setNewEventID] = useState<string>("")
  const navigation = useNavigation<NavigationType>()

  const currentGymId = FIREBASE_AUTH.currentUser?.uid

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios") // For iOS, keep the picker open
    setDate(currentDate)
  }

  const createEventInGymCollection = async () => {
    try {
      if (currentGymId) {
        const eventData = {
          gymHost: currentGymId,
          eventTitle: eventTitle,
          description: description,
          location: location,
          date: date,
          price: price,
        }

        const gymEventsRef = collection(db, "gyms", currentGymId, "events")

        const docRef = await addDoc(gymEventsRef, eventData)

        const eventRef = doc(db, "events", docRef.id)

        await setDoc(eventRef, eventData)

        const newDocId = docRef.id
        uploadImage(eventPicture, "image", currentGymId + "element", (image) =>
          submitUserPhotos(image, newDocId)
        )
        console.log("New document created with ID:", newDocId)
      } else {
        console.log("Gym does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }
  const submitUserPhotos = async (image: string, eventId: string) => {
    try {
      if (eventId && currentGymId) {
        const batch = writeBatch(db)
        const gymRef = doc(db, "gyms", currentGymId, "events", eventId)
        batch.update(gymRef, {
          eventPhoto: image,
        })

        const eventCollectionRef = doc(db, "events", eventId)
        batch.update(eventCollectionRef, {
          eventPhoto: image,
        })

        await batch.commit()
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ScrollView className=" p-4 bg-white">
      <View className="flex flex-row items-center mb-8">
        <BackButton />
        <Text className="mx-1 text-3xl font-semibold ">Create Event</Text>
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold text-gray">Title</Text>
        <TextInput
          value={eventTitle}
          onChangeText={setEventTitle}
          placeholder="Add a Title"
          className="border  p-2 rounded-lg"
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold text-gray">
          Description
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Event Description"
          className="border p-2 rounded-lg"
          multiline={true}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold text-gray">Date</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          className="mb-4"
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold text-gray">Time</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold text-gray">Price</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="Set a Price"
          className="border  p-2 rounded-lg"
          keyboardType="numeric"
        />
      </View>

      <View className="mb-8">
        <Text className="mb-2 text-lg font-semibold text-gray">
          Event Image
        </Text>
        <UploadEventImage setUri={setEventPicture} uri={eventPicture} />
      </View>

      <Pressable
        onPress={async () => {
          await createEventInGymCollection()
          setTimeout(() => {
            navigation.goBack()
          }, 2000)
        }}
        className="bg-blue p-4 rounded-lg items-center mb-20"
      >
        <Text className="text-white text-xl font-bold">Create Event</Text>
      </Pressable>
    </ScrollView>
  )
}

export default CreateEvent
