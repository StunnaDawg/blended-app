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
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { FIREBASE_AUTH } from "../../../firebase"
import getGymEvents from "../../functions/getGymEvents"
import { Event } from "../../@types/firestore"

const EventsTab = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [eventsArray, setEventsArray] = useState<Event[]>([])
  const navigation = useNavigation<NavigationType>()
  const currentId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    getGymEvents(currentId, setEventsArray, setLoading)
  }, [])

  useEffect(() => {
    console.log([...eventsArray])
  }, [eventsArray])
  return (
    <View>
      <View className="flex flex-row justify-end">
        <DefaultButton
          text="+ Add New Event"
          buttonFunction={() => navigation.navigate("CreateEvent")}
        />
      </View>
      <View className="flex flex-row justify-center">
        <Text>My Upcoming events</Text>
      </View>
      <ScrollView>
        {!loading ? (
          eventsArray.map((event) => (
            <View key={event.id}>
              <EventCard event={event} />
            </View>
          ))
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </View>
  )
}

export default EventsTab
