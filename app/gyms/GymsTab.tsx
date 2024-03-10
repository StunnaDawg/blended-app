import { ScrollView, View } from "react-native"
import { useState, useEffect } from "react"
import GymCard from "./components/GymCard"
import { GymProfile } from "../@types/firestore"
import getGymProfiles from "../functions/getAllGyms"

const GymsTab = () => {
  const [gymProfiles, setGymProfiles] = useState<GymProfile[]>([])

  useEffect(() => {
    getGymProfiles(setGymProfiles)
  }, [])

  return (
    <ScrollView>
      {gymProfiles.length > 0 &&
        gymProfiles.map((gym) => (
          <View key={gym.gym_id}>
            <GymCard gymProfile={gym} />
          </View>
        ))}
    </ScrollView>
  )
}

export default GymsTab
