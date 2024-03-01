import { View, Text, Pressable } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../@types/navigation"

const MatchModal = () => {
  const navigation = useNavigation<TabNavigationType>()
  return (
    <View className="flex flex-1 flex-row justify-center items-center bg-red-200/80">
      <View>
        <Text className="font-bold text-3xl text-center">Connection Made!</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Messages")
          }}
        >
          <Text className="text-center font-bold text-2xl">Message!</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text className="text-center text-xl">Continue Swiping</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default MatchModal
