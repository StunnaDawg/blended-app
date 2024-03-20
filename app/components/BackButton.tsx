import { View, Text, Pressable } from "react-native"
import { Feather } from "@expo/vector-icons"

import React from "react"
import { NavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"

const BackButton = () => {
  const navigation = useNavigation<NavigationType>()
  return (
    <Pressable className="flex-1" onPress={() => navigation.goBack()}>
      <Feather name="arrow-left" size={32} color="black" />
    </Pressable>
  )
}

export default BackButton
