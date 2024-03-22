import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Event } from "../../../@types/firestore"
import getEvents from "../../../functions/getAllEvents"
import EventCard from "./components/EventCard"
import { FIREBASE_AUTH } from "../../../../firebase"

const Events = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [events, setEvents] = useState<Event[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const currentId = FIREBASE_AUTH.currentUser?.uid

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    getEvents(setEvents, setLoading)
  }, [])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="m-4">
        <Text className="font-bold text-3xl">Events</Text>
      </View>
      <View className="flex flex-row flex-wrap justify-center m-2">
        {!loading && currentId ? (
          events.length > 0 &&
          events.map((element, index) => {
            return (
              <View className="m-3" key={element.id}>
                <EventCard event={element} id={currentId} />
              </View>
            )
          })
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ScrollView>
  )
}

export default Events
