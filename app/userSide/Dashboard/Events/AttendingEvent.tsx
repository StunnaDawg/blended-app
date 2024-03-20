import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import getSingleEvent from "../../../functions/getSingleEvent"
import { Attendee, Event, UserProfile } from "../../../@types/firestore"
import getUserProfile from "../../../functions/getUserProfile"
import getEventAttendees from "../../../functions/getEventAttendees"
import AttendeeCard from "./components/AttendeeCard"
import DefaultButton from "../../../components/DefaultButton"
import { Feather } from "@expo/vector-icons"
import BackButton from "../../../components/BackButton"

const AttendingEvent = () => {
  const [event, setEvent] = useState<Event | null>({} as Event)
  const [loading, setLoading] = useState<boolean>(false)
  const [attendee, setAttendee] = useState<UserProfile>({} as UserProfile)
  const [usersGoing, setUsersGoing] = useState<Attendee[]>([])
  const [eventIdState, setEventIdState] = useState<string>("")
  const route = useRoute<RouteProp<RootStackParamList, "AttendingEvent">>()
  const eventId = route.params.eventId
  const navigation = useNavigation<NavigationType>()

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
    <ScrollView>
      <View className="flex flex-row items-center justify-start">
        <BackButton />
        <Text className=" font-bold text-3xl">Attendees</Text>
        <View className="flex-1"></View>
        {/* This empty View acts as a spacer */}
      </View>

      {usersGoing ? (
        usersGoing.map((attendee) => {
          return <AttendeeCard key={attendee.memberId} attendeeId={attendee} />
        })
      ) : (
        <View>
          <Text>Null</Text>
        </View>
      )}
    </ScrollView>
  )
}

export default AttendingEvent
