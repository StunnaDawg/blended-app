import { View, Text, TextInput, Pressable, Platform } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import UploadImage from "../../components/UploadImage"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { ScrollView } from "react-native"
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore"
import { useLocation } from "../../context/LocationContext"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import uploadImage from "../../functions/uploadImage"
import useDebouncedValue from "../../functions/debounce"
import UploadEventImage from "../../components/UploadEventImage"
import { RootStackParamList, RouteParamsType } from "../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import getGymEvent from "../../functions/getGymEvent"
import { Event } from "../../@types/firestore"
import SingleImage from "../../components/SingleImage"
import EventEditImage from "./components/EventPhotoEdit"
import BackButton from "../../components/BackButton"
import DeleteEvent from "./components/DeleteEvent"

const updateEvent = async (
  currentGymId: string,
  eventId: string,
  valueToUpdate: string,
  updateValue: any,
  setSaving: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (currentGymId) {
      const batch = writeBatch(db)
      const gymRef = doc(db, "gyms", currentGymId, "events", eventId)
      batch.update(gymRef, {
        [valueToUpdate]: updateValue,
      })

      const eventCollectionRef = doc(db, "events", eventId)
      batch.update(eventCollectionRef, {
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
  const [eventToEdit, setEventToEdit] = useState<Event>({} as Event)
  const [saving, setSaving] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [description, setDescription] = useState<string>()
  const debounceDescription = useDebouncedValue(description, 1000)
  const [eventTitle, setEventTitle] = useState<string>()
  const debounceEventTitle = useDebouncedValue(eventTitle, 500)
  const [date, setDate] = useState<Date>()
  const debounceDate = useDebouncedValue(date, 500)
  const [price, setPrice] = useState<string>()
  const debouncePrice = useDebouncedValue(price, 500)
  const [eventPicture, setEventPicture] = useState<string>("")
  const route = useRoute<RouteProp<Record<string, RouteParamsType>, string>>()

  const { eventId } = route.params
  //   const route = useRoute<RouteProp<RootStackParamList, "EditEvent">>()
  //   const eventId = route.params?.eventId

  const currentGymId = FIREBASE_AUTH.currentUser?.uid

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
  }

  useEffect(() => {
    getGymEvent(currentGymId, eventId, setEventToEdit, setLoading)
  }, [eventId, currentGymId])

  useEffect(() => {
    if (eventToEdit) {
      setDescription(eventToEdit.description)
      setEventTitle(eventToEdit.eventTitle)

      setPrice(eventToEdit.price)
      setEventPicture(eventToEdit.eventPhoto || "")
      if (eventToEdit && eventToEdit.date) {
        const jsDate = eventToEdit.date.toDate()
        setDate(jsDate)
      }
    }
  }, [eventToEdit])

  useEffect(() => {
    setSaving(true)
    if (currentGymId) {
      updateEvent(currentGymId, eventId, "date", date, setSaving)
    }
  }, [debounceDate])

  useEffect(() => {
    setSaving(true)
    if (currentGymId) {
      updateEvent(currentGymId, eventId, "eventTitle", eventTitle, setSaving)
    }
  }, [debounceEventTitle])

  useEffect(() => {
    setSaving(true)
    if (currentGymId) {
      updateEvent(currentGymId, eventId, "description", description, setSaving)
    }
  }, [debounceDescription])

  useEffect(() => {
    setSaving(true)
    if (currentGymId) {
      updateEvent(currentGymId, eventId, "price", price, setSaving)
    }
  }, [debouncePrice])

  return (
    <ScrollView className="p-4 bg-white">
      <View className="flex flex-row items-center mb-8">
        <BackButton />
        <Text className="mx-1 text-3xl font-semibold text-gray">
          Edit Event
        </Text>
        <DeleteEvent gymId={currentGymId} eventId={eventId} />
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold text-gray">Title</Text>
        <TextInput
          value={eventTitle}
          onChangeText={setEventTitle}
          placeholder="Add a Title"
          className="border border-gray-300 p-2 rounded-lg"
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
          className="border border-gray-300 p-2 rounded-lg"
          multiline={true}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold text-gray">Date</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-lg font-semibold text-gray">Time</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
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
          className="border border-gray-300 p-2 rounded-lg"
          keyboardType="numeric"
        />
      </View>

      <View className="mb-8">
        <EventEditImage event={eventToEdit} />
      </View>
    </ScrollView>
  )
}

export default EditEvent
