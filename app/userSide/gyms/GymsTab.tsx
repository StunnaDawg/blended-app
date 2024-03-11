import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native"
import { useState, useEffect, useCallback } from "react"
import GymCard from "./components/GymCard"
import { GymProfile } from "../../@types/firestore"
import getGymProfiles from "../../functions/getAllGyms"

const GymsTab = () => {
  const [gymProfiles, setGymProfiles] = useState<GymProfile[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)

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
          <View key={gym.gym_id}>
            <GymCard gymProfile={gym} />
          </View>
        ))
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
  )
}

export default GymsTab
