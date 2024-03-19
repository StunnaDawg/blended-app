import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native"
import React, { useEffect, useState } from "react"
import { Event, GymProfile } from "../../../@types/firestore"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import getSingleEvent from "../../../functions/getSingleEvent"
import { EventCardDetails } from "./components/ViewEventDetail"
import RVSPButton from "./components/RVSPButton"

const ViewEvent = () => {
  const [event, setEvent] = useState<Event | null>({} as Event)
  const [eventIdState, setEventIdState] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "ViewEvent">>()
  const eventId = route.params.eventId

  useEffect(() => {
    if (event) {
      getSingleEvent(eventId, event.gymHost, setEvent, setLoading)
      setEventIdState(eventId)
    }
  }, [eventId])

  useEffect(() => {
    if (event) {
      getSingleEvent(eventId, event?.gymHost, setEvent, setLoading)
    }
  }, [loading])
  return (
    <>
      <ScrollView>
        <View className="flex-1 flex-grow flex-row justify-between">
          <View>
            {event && eventIdState !== "" && !loading ? (
              <EventCardDetails event={event} eventId={eventIdState} />
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>
      </ScrollView>
      <View className="items-center mb-10">
        <RVSPButton
          event={event}
          eventId={eventIdState}
          loading={loading}
          setLoading={setLoading}
        />
      </View>
    </>
  )
}

export default ViewEvent
