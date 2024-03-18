import { View, Text, Pressable, Image, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../../@types/navigation"
import { FIREBASE_AUTH, db } from "../../../../../firebase"
import SinglePicNoArray from "../../../../components/SingleImageNoArray"
import { Event, GymProfile } from "../../../../@types/firestore"
import { doc } from "firebase/firestore"
import getSingleGym from "../../../../functions/getSingleGym"
import { format } from "date-fns"

type EventCardProp = {
  event: Event
  id: string
}

const EventCard = ({ event, id }: EventCardProp) => {
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const eventRef = doc(db, "events", event.id)
  const readableDate = event.date.toDate()
  const eventDate = format(readableDate, "MMMM d")
  const eventTime = format(readableDate, "h:mm a")

  useEffect(() => {
    getSingleGym(event.gymHost, setGymProfile, setLoading)
  }, [])
  return (
    <View className="w-full border-t border-b h-36">
      {!loading ? (
        <>
          <View className="flex flex-row justify-center">
            <Text className="font-bold text-lg">{event.eventTitle}</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("ViewEvent", {
                  eventId: event.id,
                  id: id,
                })
              }}
            >
              <Text>View Event</Text>
            </Pressable>
          </View>
          <SinglePicNoArray
            id={event.id}
            size={100}
            avatarRadius={10}
            noAvatarRadius={10}
            docRef={eventRef}
          />
          <View className="flex flex-row justify-end">
            <View>
              <Text className="font-bold text-lg">{gymProfile.gym_title}</Text>
              <Text className="font-bold text-lg">
                {event.price ? event.price : "Free"}
              </Text>
              <Text className="font-bold text-lg">{eventDate}</Text>
              <Text className="font-bold text-lg">{eventTime}</Text>
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

export default EventCard
