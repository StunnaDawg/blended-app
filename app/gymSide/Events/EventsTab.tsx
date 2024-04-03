import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import EventCard from "./components/EventCard"
import DefaultButton from "../../components/DefaultButton"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { FIREBASE_AUTH } from "../../../firebase"
import getGymEvents from "../../functions/getGymEvents"
import { Event } from "../../@types/firestore"
import { FontAwesome6 } from "@expo/vector-icons"

const EventsTab = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [eventsArray, setEventsArray] = useState<Event[]>([])
  const navigation = useNavigation<NavigationType>()
  const currentId = FIREBASE_AUTH.currentUser?.uid
  const isFocused = useIsFocused()

  useEffect(() => {
    getGymEvents(currentId, setEventsArray, setLoading)
  }, [isFocused, currentId])

  return (
    <View>
      <View className=" p-3 flex flex-row justify-between my-2 items-center">
        <Text className="font-bold text-xl">My Upcoming events</Text>
        <Pressable
          className="flex flex-row  items-center mx-2"
          onPress={() => navigation.navigate("CreateEvent")}
        >
          <Text className="mx-1 font-semibold underline">New Event</Text>
          <FontAwesome6 name="add" size={16} color="black" />
        </Pressable>
      </View>
      <ScrollView className="h-full p-1">
        <View className="flex flex-row flex-wrap items-center">
          {!loading && currentId ? (
            eventsArray.map((event) => (
              <View className="mx-3" key={event.id}>
                <EventCard event={event} id={currentId} />
              </View>
            ))
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default EventsTab
