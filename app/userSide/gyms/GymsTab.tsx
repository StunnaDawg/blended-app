import {
  ActivityIndicator,
  View,
  RefreshControl,
  ScrollView,
} from "react-native"
import { useState, useEffect, useCallback } from "react"
import GymCard from "./components/GymCard"
import { GymProfile } from "../../@types/firestore"
import getGymProfiles from "../../functions/getAllGyms"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { FIREBASE_AUTH } from "../../../firebase"

const GymsTab = () => {
  const [gymProfiles, setGymProfiles] = useState<GymProfile[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const currentUser = FIREBASE_AUTH.currentUser?.uid

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    setLoading(true)
    getGymProfiles(setGymProfiles, setLoading)
  }, [])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
