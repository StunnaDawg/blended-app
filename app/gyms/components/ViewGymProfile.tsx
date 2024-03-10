import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native"
import { GymProfile } from "../../@types/firestore"
import GymImageCarosel from "../../components/GymImageCarosel"

type GymProfileProps = {
  gymProfile: GymProfile
  dismiss: (key?: string | undefined) => boolean
}

const ViewGymProfile = ({ gymProfile, dismiss }: GymProfileProps) => {
  return (
    <ScrollView className="mt-10 mx-6">
      <View className="flex flex-row justify-between">
        <Text className="font-bold text-3xl">{gymProfile.gym_title}</Text>
        <Pressable onPress={() => dismiss()}>
          <Text className="underline">Dismiss</Text>
        </Pressable>
      </View>
      <View>
        <GymImageCarosel id={gymProfile.gym_id} profileType={gymProfile} />
      </View>
    </ScrollView>
  )
}

export default ViewGymProfile
