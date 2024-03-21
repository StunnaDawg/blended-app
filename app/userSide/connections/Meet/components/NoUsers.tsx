import { View, Text } from "react-native"
import React from "react"

const NoUsers = () => {
  return (
    <View className="flex flex-1 items-center justify-center p-2 pt-64">
      <Text className="text-3xl font-extrabold text-center">
        No Users check back later!
      </Text>
    </View>
  )
}

export default NoUsers
