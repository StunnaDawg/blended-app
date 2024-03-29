import {
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Platform,
} from "react-native"
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
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore"
import { Calendar } from "react-native-calendars"
import { format, parseISO } from "date-fns"
import { useLocation } from "../../context/LocationContext"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import uploadImage from "../../functions/uploadImage"
import UploadSingleImage from "../../components/UploadSingleImage"
import UploadEventImage from "../../components/UploadEventImage"

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
        <View>
          <Text>{date.toLocaleString()}</Text>

          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        </View>
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={onChangeDate}
      />

      <View>
        <Text>Price?</Text>
        <TextInput
          value={price}
          onChangeText={(price) => setPrice(price)}
          placeholder="Add a Title"
        />
      </View>

      <View>
        <UploadEventImage setUri={setEventPicture} uri={eventPicture} />
      </View>

      <Pressable
        onPress={async () => {
          await createEventInGymCollection()
        }}
      >
        <Text className="font-bold text-xl">Create Event</Text>
      </Pressable>
    </ScrollView>
  )
}

export default CreateEvent
