import { View, Text } from "react-native"
import React from "react"

type UserMessage = {
  id: string
  message: string
}

const UserMessage = ({ id, message }: UserMessage) => {
  return (
    <View className="flex flex-row justify-end mt-2 mx-1">
      <View>
        <View className="rounded-2xl border bg-blue-200 w-40 p-2">
          <Text className="text-xs">
            {message}
            HiddddddddddddddddddHidddddddddddddddddd
          </Text>
        </View>
        <View className="flex flex-row justify-end">
          <Text className="text-xs">Sent</Text>
        </View>
      </View>
    </View>
  )
}

export default UserMessage
