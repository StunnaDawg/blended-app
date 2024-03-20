import { View, Text } from "react-native"
import React from "react"

type ActivityTagProps = {
  activity: string
}

const ActivityTags = ({ activity }: ActivityTagProps) => {
  return (
    <View className="border-2 rounded-full bg-slate-300 p-2 text-center mx-1">
      <Text className="text-xs font-bold">{activity}</Text>
    </View>
  )
}

export default ActivityTags
