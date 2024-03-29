import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { Event } from "../../../@types/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import SinglePicNoArray from "../../../components/SingleImageNoArray"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { doc } from "firebase/firestore"

type EventCardProp = {
  event: Event
  id: string
}

const EventCard = ({ event, id }: EventCardProp) => {
  const navigation = useNavigation<NavigationType>()
  const eventRef = doc(db, "gyms", id, "events", event.id)
  return (
    <View className="w-full border-t border-b h-36">
      <View className="flex flex-row justify-center">
        <Text className="font-bold text-xl">{event.eventTitle}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("EditEvent", {
              eventId: event.id,
            })
          }}
        >
          <Text>Edit Event</Text>
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
          <Text className="font-bold text-xl">Host</Text>
          <Text className="font-bold text-xl">date</Text>
          <Text className="font-bold text-xl">location</Text>
          <Text className="font-bold text-md">9 Attending</Text>
        </View>
      </View>
    </View>
  )
}

export default EventCard
