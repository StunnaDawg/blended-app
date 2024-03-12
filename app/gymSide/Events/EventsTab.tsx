import { View, Text, Pressable, ScrollView } from "react-native"
import React from "react"
import EventCard from "./components/EventCard"
import DefaultButton from "../../components/DefaultButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const EventsTab = () => {
  const navigation = useNavigation<NavigationType>()
  return (
    <View>
      <View className="felx flex-row justify-end">
        <DefaultButton
          text="+ Add New Event"
          buttonFunction={() => navigation.navigate("CreateEvent")}
        />
      </View>
      <View className="flex flex-row justify-center">
        <Text>My Upcoming events</Text>
      </View>
      {/* <ScrollView>
        <EventCard />
      </ScrollView> */}
    </View>
  )
}

export default EventsTab
