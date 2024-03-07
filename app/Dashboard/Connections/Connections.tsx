import { View, Text, Pressable } from "react-native"
import React from "react"
import ConnectionsBox from "./components/ConnectionsBox"

const Connections = () => {
  return (
    <View className="flex flex-row flex-wrap justify-center">
      <ConnectionsBox title="Meet" />
      <ConnectionsBox title="Community" />
      <ConnectionsBox title="Find a Workout" />
    </View>
  )
}

export default Connections
