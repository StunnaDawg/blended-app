import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native"
import { GymProfile } from "../../../@types/firestore"
import RequestToBeCoach from "./RequestToBeCoach"
import RequestToBeMember from "./RequestToBeMember"
import GymMembersModal from "./GymMembersModal"
import { useEffect, useState } from "react"
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import getSingleGym from "../../../functions/getSingleGym"
import GymTopTabs from "./GymViewComponents/GymTopTabs"

import About from "./GymViewComponents/About"

const ViewGymProfile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [isPressed2, setIsPressed2] = useState<boolean>(false)
  const [aboutSection, setAboutSection] = useState<boolean>(true)
  const [membersSection, setMembersSection] = useState<boolean>(true)
  const [photoSection, setPhotoSection] = useState<boolean>(true)
  const [gymIdState, setGymIdState] = useState<string>("")
  const route = useRoute<RouteProp<RootStackParamList, "ViewGymScreen">>()
  const gymId = route.params.gymId
  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const handlePressIn2 = () => {
    setIsPressed2(true)
  }

  const handlePressOut2 = () => {
    setIsPressed2(false)
  }

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
