import { View, Text } from "react-native"
import React from "react"
import { RootStackParamList } from "../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"

const ViewUserProfileScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ViewUserProfile">>()
  const userProfile = route.params.userProfile

  return (
    <View>
      <Text>{userProfile.firstName}</Text>
    </View>
  )
}

export default ViewUserProfileScreen
