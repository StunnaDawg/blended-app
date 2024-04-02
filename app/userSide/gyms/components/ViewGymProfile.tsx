import { View, ActivityIndicator, ScrollView } from "react-native"
import { GymProfile } from "../../../@types/firestore"

import { useEffect, useState } from "react"
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import getSingleGym from "../../../functions/getSingleGym"

import About from "./GymViewComponents/About"

const ViewGymProfile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const [gymIdState, setGymIdState] = useState<string>("")
  const route = useRoute<RouteProp<RootStackParamList, "ViewGymScreen">>()
  const gymId = route.params.gymId

  useEffect(() => {
    getSingleGym(gymId, setGymProfile, setLoading)
    setGymIdState(gymId)
  }, [gymId])

  return (
    <>
      {!loading && gymId ? (
        <>
          <ScrollView>
            <View className="flex-1 flex-grow flex-row justify-between">
              <View>
                <About gymProfile={gymProfile} gymId={gymIdState} />
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </>
  )
}

export default ViewGymProfile
