import { View, Text } from "react-native"
import React from "react"
import { FontAwesome6 } from "@expo/vector-icons"

const NoUsers = () => {
  return (
    <View className="flex flex-1 items-center justify-center p-2 pt-64">
      <Text className="text-xl font-semibold text-center">
        No Users check back later!
      </Text>
      <FontAwesome6 name="clock" size={24} color="black" />
    </View>
  )
}

export default NoUsers
