import { View, Text, Pressable } from "react-native"
import React from "react"
import { FIREBASE_AUTH } from "../../firebase"
import BackButton from "../components/BackButton"
import { Feather } from "@expo/vector-icons"
import { useSwitchAccount } from "../context/switchAccountContext"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"

const UserSettings = () => {
  const navigation = useNavigation<NavigationType>()
  const handleSignOut = () => {
    try {
      FIREBASE_AUTH.signOut()
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (
    <>
      <View className="flex flex-row justify-between m-2">
        <BackButton />
        <Pressable
          onPress={() => {
            navigation.goBack()
            navigation.navigate("GymScreens", {
              screen: "GymFooter",
              params: {
                screen: "GymDashboard",
              },
            })
          }}
        >
          <View className="flex flex-row items-center">
            <Text className="font-bold text-lg">Switch to Gym Profile</Text>
            <Feather name="arrow-right" size={24} color="black" />
          </View>
        </Pressable>
      </View>
      <View className="flex flex-row justify-center mt-64">
        <Pressable
          onPress={() => {
            handleSignOut()
          }}
        >
          <Text className="font-bold text-2xl">Log Out</Text>
        </Pressable>
      </View>
    </>
  )
}

export default UserSettings
