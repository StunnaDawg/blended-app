import { View, Text, Pressable, Image, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { Event, GymProfile } from "../../../@types/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { db } from "../../../../firebase"
import { doc } from "firebase/firestore"
import SinglePicBackGround from "../../../components/ImageBackground"
import { format } from "date-fns"
import getSingleGym from "../../../functions/getSingleGym"

type EventCardProp = {
  event: Event
  id: string
}

const EventCardData = ({ event, id }: EventCardProp) => {
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const [eventDate, setEventDate] = useState<string>("")
  const [eventTime, setEventTime] = useState<string>("")

  useEffect(() => {
    if (event.date) {
      console.log(event.date)
      const readableDate = event.date.toDate()
      const eventDate = format(readableDate, "MMMM d")
      const eventTime = format(readableDate, "h:mm a")
      setEventDate(eventDate)
      setEventTime(eventTime)
    }
  }, [event])

  useEffect(() => {
    getSingleGym(event.gymHost, setGymProfile, setLoading)
  }, [])
  return (
    <>
      {!loading ? (
        <>
          <View className="m-1">
            <Text className="font-bold text-md text-white">
              {event.price ? `$${event.price}` : "Free"}
            </Text>
          </View>
          <Pressable
            className="flex-1 flex-col items-start justify-end"
            onPress={() => {
              navigation.navigate("EditEvent", {
                eventId: event.id,
              })
            }}
          >
            <Text className="font-bold text-lg text-white">
              {eventDate},{eventTime}
            </Text>
            <Text className="font-bold text-2xl text-white">
              {event.eventTitle}
            </Text>

            <Text className="font-bold text-lg text-shadow text-white">
              {gymProfile.gym_title}
            </Text>
          </Pressable>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </>
  )
}

const EventCard = ({ event, id }: EventCardProp) => {
  const eventRef = doc(db, "events", event.id)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    console.log("event card", event)
  }, [])
  return (
    <SinglePicBackGround
      id={event.id}
      height={200}
      width={160}
      avatarRadius={10}
      noAvatarRadius={10}
      docRef={eventRef}
      children={<EventCardData event={event} id={id} />}
      setLoading={setLoading}
    />
  )
}

export default EventCard
