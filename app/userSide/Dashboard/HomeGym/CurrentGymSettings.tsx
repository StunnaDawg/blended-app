import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import {
  NavigationType,
  RootStackParamList,
  TabNavigationType,
} from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { deleteDoc, doc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { FontAwesome6 } from "@expo/vector-icons"
import BackButton from "../../../components/BackButton"

const CurrentGymSettings = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [gymId, setGymId] = useState<string>("")
  const route = useRoute<RouteProp<RootStackParamList, "CurrentGymSettings">>()
  const gymProfile = route.params.gymProfile
  const gymIdParam = route.params.id
  const navigation = useNavigation<TabNavigationType>()
  const currentId = FIREBASE_AUTH.currentUser?.uid

  const leaveGym = async (userType: string) => {
    if (currentId) {
      console.log(gymIdParam)
      const gymRef = doc(db, "gyms", gymIdParam, userType, currentId)
      const userRef = doc(db, "user", currentId, "gyms", gymIdParam)
      try {
        setLoading(true)
        await deleteDoc(gymRef)
        await deleteDoc(userRef)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
        navigation.navigate("HomeGym")
      }
    }
  }

  return (
    <>
      <View className="m-1">
        <BackButton />
      </View>
      <View className="flex-1 justify-center items-center">
        <Pressable
          onPress={() => {
            if (gymProfile.members?.some((member) => member.id === currentId)) {
              leaveGym("members")
            } else {
              leaveGym("coaches")
            }
          }}
        >
          <View className="flex flex-row items-center">
            <Text className="mx-2 font-bold text-xl">Leave Gym</Text>
            <FontAwesome6 name="door-open" size={24} color="black" />
          </View>
        </Pressable>
      </View>
    </>
  )
}

export default CurrentGymSettings
