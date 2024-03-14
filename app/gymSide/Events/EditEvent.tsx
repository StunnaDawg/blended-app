import { View, Text, TextInput, Pressable, Platform } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
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
import { useLocation } from "../../context/LocationContext"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import uploadImage from "../../functions/uploadImage"
import useDebouncedValue from "../../functions/debounce"
import UploadEventImage from "../../components/UploadEventImage"

const updateEvent = async (
  currentGymId: string,
  valueToUpdate: string,
  updateValue: any,
  setSaving: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (currentGymId) {
      const gymRef = collection(db, "gyms", currentGymId, "events")
      await addDoc(gymRef, {
        [valueToUpdate]: updateValue,
      })
      setSaving(false)
    } else {
      console.log("Gym does not exist")
    }
  } catch (err) {
    console.error(err)
  }
}

const EditEvent = () => {
  const [saving, setSaving] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")
  const debounceDescription = useDebouncedValue(description, 1000)
  const [eventTitle, setEventTitle] = useState<string>("")
  const debounceEventTitle = useDebouncedValue(eventTitle, 500)
  const [date, setDate] = useState<Date>(new Date())
  const debounceDate = useDebouncedValue(date, 500)
  const [price, setPrice] = useState<string>("")
  const debouncePrice = useDebouncedValue(price, 500)
  const [eventPicture, setEventPicture] = useState<string>("")
  const [newEventID, setNewEventID] = useState<string>("")

  const currentGymId = FIREBASE_AUTH.currentUser?.uid

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
  }

  useEffect(() => {
    setSaving(true)
    if (currentGymId) {
      updateEvent(currentGymId, "date", date, setSaving)
    }
  }, [debounceDate])

  useEffect(() => {
    setSaving(true)
    if (currentGymId) {
      updateEvent(currentGymId, "eventTitle", eventTitle, setSaving)
    }
  }, [debounceEventTitle])

  useEffect(() => {
    setSaving(true)
    if (currentGymId) {
      updateEvent(currentGymId, "description", description, setSaving)
    }
  }, [debounceDescription])

  useEffect(() => {
    setSaving(true)
    if (currentGymId) {
      updateEvent(currentGymId, "price", price, setSaving)
    }
  }, [debouncePrice])

  const submitUserPhotos = async (image: string, eventId: string) => {
    try {
      if (eventId && currentGymId) {
        const userRef = doc(db, "gyms", currentGymId, "events", eventId)

        await updateDoc(userRef, {
          eventPhoto: image,
        })
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  //   const uploadImagesArray = async (imageArray: string[]) => {
  //     imageArray.forEach((element) => {
  //       uploadImage(element, "image", currentGymId + "element", submitUserPhotos)
  //       console.log(element)
  //     })
  //   }

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

      {/* <Pressable
        onPress={async () => {
          uploadImagesArray(eventPicture)
        }}
      >
        <Text className="font-bold text-xl">Edit Event</Text>
      </Pressable> */}
    </ScrollView>
  )
}

export default EditEvent
