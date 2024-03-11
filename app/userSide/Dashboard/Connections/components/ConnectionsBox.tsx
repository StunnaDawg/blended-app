import { View, Text, Pressable } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType, RouteParamsType } from "../../../@types/navigation"

type BoxProps = {
  title: string
}

const ConnectionsBox = ({ title }: BoxProps) => {
  const navigation = useNavigation<NavigationType>()
  return (
    <View className="m-2">
      <Pressable
        className="border w-32 h-48 flex justify-center items-center"
        onPress={() => {
          navigation.navigate("Meet")
        }}
      >
        <Text>{title}</Text>
      </Pressable>
    </View>
  )
}

export default ConnectionsBox
