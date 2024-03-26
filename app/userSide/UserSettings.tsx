import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH } from "../../firebase"
import BackButton from "../components/BackButton"
import { Feather } from "@expo/vector-icons"
import { useSwitchAccount } from "../context/switchAccountContext"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import { UserProfile } from "../@types/firestore"
import getUserProfile from "../functions/getUserProfile"

const UserSettings = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const currentId = FIREBASE_AUTH.currentUser?.uid
  const handleSignOut = () => {
    try {
      FIREBASE_AUTH.signOut()
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (currentId) {
      getUserProfile(currentId, setUserProfile, setLoading)
    }
  }, [currentId])
  return (
    <>
      <View className="flex flex-row justify-between m-2">
        <BackButton />
        <Pressable
          onPress={() => {
            if (currentId && !loading && userProfile.createdGym === currentId) {
              navigation.navigate("GymScreens", {
                screen: "GymFooter",
                params: {
                  screen: "GymDashboard",
                },
              })
            }
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
