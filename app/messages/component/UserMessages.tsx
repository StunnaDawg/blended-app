import { View, Text } from "react-native"
import React from "react"

type UserMessage = {
  id: string
  message: string
}

const UserMessage = ({ id, message }: UserMessage) => {
  return (
    <View className="flex flex-row justify-end mt-2 mx-1 my-2">
      <View>
        <View className="rounded-2xl border bg-blue-200 p-2">
          <Text className="text-xs">{message}</Text>
        </View>
        <View className="flex flex-row justify-end"></View>
      </View>
    </View>
  )
}

export default UserMessage
