import { View, Text, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import getSingleGym from "../../functions/getSingleGym"
import { GymProfile } from "../../@types/firestore"
import { FIREBASE_AUTH } from "../../../firebase"

type GymProfileProps = {
  gymProfile: GymProfile
}

const ViewGymProfile = ({ gymProfile }: GymProfileProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <View>
      <Text>{gymProfile.gym_title}</Text>
    </View>
  )
}

export default ViewGymProfile
