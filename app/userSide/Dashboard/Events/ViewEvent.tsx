import { View, Text, ActivityIndicator, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { Event, GymProfile } from "../../../@types/firestore"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import getSingleEvent from "../../../functions/getSingleEvent"
import { EventCardDetails } from "./components/ViewEventDetail"

const ViewEvent = () => {
  const [event, setEvent] = useState<Event | null>({} as Event)
  const [eventIdState, setEventIdState] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "ViewEvent">>()
  const eventId = route.params.eventId

  useEffect(() => {
    getSingleEvent(eventId, setEvent, setLoading)
    setEventIdState(eventId)
  }, [eventId])
  return (
    <View>
      {event && eventIdState !== "" && !loading ? (
        <EventCardDetails event={event} eventId={eventIdState} />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

export default ViewEvent
