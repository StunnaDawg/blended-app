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

const updateEvent = async (
  currentGymId: string,
  eventId: string,
  valueToUpdate: string,
  updateValue: any,
  setSaving: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (currentGymId) {
      const gymRef = doc(db, "gyms", currentGymId, "events", eventId)
      await updateDoc(gymRef, {
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
        <Text className="text-3xl font-semibold">Edit Event</Text>
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
          <Text>{date ? date.toLocaleString() : "No date set"}</Text>

          <DateTimePicker
            testID="dateTimePicker"
            value={date || new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        </View>

        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      </View>
      <View>
        <Text>Price?</Text>
        <TextInput
          value={price}
          onChangeText={(price) => setPrice(price)}
          placeholder="Add a Title"
        />
      </View>

      <EventEditImage event={eventToEdit} />
    </ScrollView>
  )
}

export default EditEvent
