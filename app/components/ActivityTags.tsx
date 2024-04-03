import { View, Text } from "react-native"
import React from "react"

type ActivityTagProps = {
  activity: string
}

const ActivityTags = ({ activity }: ActivityTagProps) => {
  return (
    <View className="border-2 rounded-full bg-slate-300 p-1 text-center mx-1">
      <Text className="text-xs font-semibold">{activity}</Text>
    </View>
  )
}

export default ActivityTags
