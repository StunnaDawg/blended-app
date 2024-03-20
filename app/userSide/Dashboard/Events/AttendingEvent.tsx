import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import getSingleEvent from "../../../functions/getSingleEvent"
import { Attendee, Event, UserProfile } from "../../../@types/firestore"
import getUserProfile from "../../../functions/getUserProfile"
import getEventAttendees from "../../../functions/getEventAttendees"

const AttendingEvent = () => {
  const [event, setEvent] = useState<Event | null>({} as Event)
  const [loading, setLoading] = useState<boolean>(false)
  const [attendee, setAttendee] = useState<UserProfile>({} as UserProfile)
  const [usersGoing, setUsersGoing] = useState<Attendee[]>([])
  const [eventIdState, setEventIdState] = useState<string>("")
  const route = useRoute<RouteProp<RootStackParamList, "AttendingEvent">>()
  const eventId = route.params.eventId

  useEffect(() => {
    if (event) {
      getSingleEvent(eventId, event?.gymHost, setEvent, setLoading)
      setEventIdState(eventId)
    }
  }, [eventId])

  useEffect(() => {
    getEventAttendees(setUsersGoing, eventIdState)
  }, [eventIdState])

  return (
    <View>
      {usersGoing ? (
        usersGoing.map((attendee) => {
          return (
            <View key={attendee.memberId}>
              <Text>{attendee.memberId}</Text>
            </View>
          )
        })
      ) : (
        <View>
          <Text>Null</Text>
        </View>
      )}
      <Text>AttendingEvent</Text>
    </View>
  )
}

export default AttendingEvent
