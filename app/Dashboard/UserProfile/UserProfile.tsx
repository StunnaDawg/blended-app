import { View, Text } from "react-native"
import React from "react"
import ProfilePic from "../../components/Avatar"
import { FIREBASE_AUTH } from "../../../firebase"

const UserProfile = () => {
  return (
    <View>
      <Text>Hi</Text>
      <ProfilePic size={200} id={FIREBASE_AUTH.currentUser?.uid} />
    </View>
  )
}

export default UserProfile
