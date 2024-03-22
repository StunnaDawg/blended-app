import { View, Text, Pressable } from "react-native"
import React from "react"
import { FIREBASE_AUTH } from "../../firebase"
import BackButton from "../components/BackButton"

const UserSettings = () => {
  const handleSignOut = () => {
    try {
      FIREBASE_AUTH.signOut()
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (
    <>
      <View className="m-2">
        <BackButton />
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
