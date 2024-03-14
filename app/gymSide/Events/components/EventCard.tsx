import { View, Text, Pressable } from "react-native"
import React from "react"
import { Event } from "../../../@types/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type EventCardProp = {
  event: Event
}

const EventCard = ({ event }: EventCardProp) => {
  const navigation = useNavigation<NavigationType>()
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
