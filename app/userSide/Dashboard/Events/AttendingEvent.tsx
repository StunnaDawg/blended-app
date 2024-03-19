import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import getSingleEvent from "../../../functions/getSingleEvent"
import { Event, UserProfile } from "../../../@types/firestore"
import getUserProfile from "../../../functions/getUserProfile"
import { User } from "firebase/auth"

const AttendingEvent = () => {
  const [event, setEvent] = useState<Event | null>({} as Event)
  const [loading, setLoading] = useState<boolean>(false)
  const [attendee, setAttendee] = useState<UserProfile>({} as UserProfile)
  const [usersGoing, setUsersGoing] = useState<UserProfile[]>([])
  const [eventIdState, setEventIdState] = useState<string>("")
  const route = useRoute<RouteProp<RootStackParamList, "AttendingEvent">>()
  const eventId = route.params.eventId

  const getAttendees = async () => {
    if (event) {
      event.attendees.forEach((element) => {
        getUserProfile(element.id, setAttendee, setLoading)
        const updateGoing = [...usersGoing, attendee]
        setUsersGoing(updateGoing)
      })
    }
  }

  useEffect(() => {
    if (event) {
      getSingleEvent(eventId, event?.gymHost, setEvent, setLoading)
      setEventIdState(eventId)
    }
  }, [eventId])

  useEffect(() => {
    getAttendees()
  }, [event])

  return (
    <View>
      {usersGoing.length > 0 ? (
        usersGoing.map((attendee) => {
          return (
            <View key={attendee.id}>
              <Text>{attendee.firstName}</Text>
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
