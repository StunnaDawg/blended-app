import {
  ActivityIndicator,
  View,
  RefreshControl,
  ScrollView,
  Pressable,
} from "react-native"
import { useState, useEffect, useCallback } from "react"
import GymCard from "./components/GymCard"
import { GymProfile, UserProfile } from "../../@types/firestore"
import getGymProfiles from "../../functions/getAllGyms"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { FIREBASE_AUTH } from "../../../firebase"
import { Text } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import getUserProfile from "../../functions/getUserProfile"

const GymsTab = () => {
  const [gymProfiles, setGymProfiles] = useState<GymProfile[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  const isFocused = useIsFocused()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    setLoading(true)
    getGymProfiles(setGymProfiles, setLoading)
  }, [isFocused])

  useEffect(() => {
    setLoading(true)
    getGymProfiles(setGymProfiles, setLoading)
  }, [refreshing])

  useEffect(() => {
    if (currentUser) {
      getUserProfile(currentUser, setUserProfile, setLoading)
    }
  }, [])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="flex flex-row justify-between m-4 items-center">
        <Text className="font-bold text-3xl">Gyms</Text>
        <View className="flex flex-row items-center">
          {userProfile.createdGym ? (
            <Pressable
              onPress={() => {
                if (userProfile.createdGym) {
                  navigation.navigate("ViewGymScreen", {
                    gymId: userProfile.createdGym,
                  })
                }
              }}
            >
              <View className="flex flex-row items-center">
                <Text className="mx-1 font-semibold underline">My Gym</Text>
                <FontAwesome6 name="dumbbell" size={16} color="black" />
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                navigation.navigate("CreateGym")
              }}
            >
              <View className="flex flex-row items-center">
                <Text className="mx-1 font-semibold">Create Gym</Text>
                <FontAwesome6 name="add" size={20} color="black" />
              </View>
            </Pressable>
          )}
        </View>
      </View>
      {!loading ? (
        gymProfiles.length > 0 &&
        gymProfiles.map((gym) => (
          <View key={gym.gymId} className="m-2">
            <GymCard gymProfile={gym} id={currentUser} />
          </View>
        ))
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
  )
}

export default GymsTab
