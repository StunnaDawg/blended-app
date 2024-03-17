import { View, Text, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { Event, GymProfile } from "../../../@types/firestore"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import getSingleEvent from "../../../functions/getSingleEvent"
import DefaultButton from "../../../components/DefaultButton"
import getSingleGym from "../../../functions/getSingleGym"
import { format } from "date-fns"
import SinglePicNoArray from "../../../components/SingleImageNoArray"
import { doc } from "firebase/firestore"
import { db } from "../../../../firebase"

const ViewEvent = () => {
  const [event, setEvent] = useState<Event | null>({} as Event)
  const [loading, setLoading] = useState<boolean>(false)
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const [eventDate, setEventDate] = useState<string>("")
  const [eventTime, setEventTime] = useState<string>("")
  const route = useRoute<RouteProp<RootStackParamList, "ViewEvent">>()
  const eventId = route.params.eventId
  const navigation = useNavigation<NavigationType>()
  const eventRef = doc(db, "events", eventId)

  useEffect(() => {
    if (event) {
      getSingleGym(event.gymHost, setGymProfile, setLoading)
      if (event.date) {
        const readableDate = event.date.toDate()
        const eventDate = format(readableDate, "MMMM d")
        const eventTime = format(readableDate, "h:mm a")
        setEventDate(eventDate)
        setEventTime(eventTime)
      }
    }
  }, [event])

  useEffect(() => {
    getSingleEvent(eventId, setEvent, setLoading)
  }, [eventId])
  return (
    <View>
      {event !== null ? (
        !loading ? (
          <>
            <DefaultButton
              text="go back"
              buttonFunction={() => navigation.goBack()}
            />
            <Text>{event.eventTitle}</Text>

            <SinglePicNoArray
              id={event.id}
              size={100}
              avatarRadius={10}
              noAvatarRadius={10}
              docRef={eventRef}
            />

            <Text>{gymProfile.gym_title}</Text>
            <Text>{eventDate !== "" ? eventDate : "No Specified Date"}</Text>
            <Text>{eventTime !== "" ? eventTime : "No Specified Time"}</Text>
          </>
        ) : (
          <ActivityIndicator />
        )
      ) : (
        <>
          <DefaultButton
            text="go back"
            buttonFunction={() => navigation.goBack()}
          />
          <Text>Event Does Not exsist</Text>
        </>
      )}
    </View>
  )
}

export default ViewEvent
