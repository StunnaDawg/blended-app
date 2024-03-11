import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native"
import { GymProfile } from "../../@types/firestore"
import GymImageCarosel from "../../components/GymImageCarosel"
import TrainerProfile from "../../components/TrainerProfile"
import EventsCard from "../../components/EventsCard"

type GymProfileProps = {
  gymProfile: GymProfile
  dismiss: (key?: string | undefined) => boolean
}

const ViewGymProfile = ({ gymProfile, dismiss }: GymProfileProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className="mt-10"
    >
      <View className="flex flex-row justify-between mx-6">
        <Text className="font-bold text-3xl">{gymProfile.gym_title}</Text>
        <Pressable onPress={() => dismiss()}>
          <Text className="underline">Dismiss</Text>
        </Pressable>
      </View>
      <View>
        <GymImageCarosel id={gymProfile.gym_id} profileType={gymProfile} />
      </View>

      <View className="mx-6">
        <Text>Location</Text>
      </View>

      <View className="mx-6">
        <Text>Crossfit</Text>
      </View>

      <View className="mx-6">
        <Text>500 Members</Text>
      </View>

      <View className="mx-6">
        <Text>About</Text>
        <Text>
          Gym is your ultimate destination for fitness and wellness. Located in
          the heart of the city, our state-of-the-art facility offers a diverse
          range of equipment and programs tailored to meet your fitness goals,
          whether you're a beginner or a seasoned athlete. Our certified
          trainers provide personalized training sessions, ensuring you get the
          guidance and support you need to succeed. With spacious workout areas,
          group fitness classes, and cutting-edge amenities such as sauna and
          steam rooms, Gym provides an unparalleled fitness experience. Join us
          today and embark on your journey to a healthier, stronger you at Gym!
        </Text>
      </View>

      <View className="mt-2">
        <View className="mx-6">
          <Text className="text-xl font-bold">Upcoming Events</Text>
        </View>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          className="flex flex-row flex-wrap"
        >
          <EventsCard />
        </ScrollView>
      </View>

      <View className="mt-2">
        <View className="mx-6">
          <Text className="text-xl font-bold">
            {gymProfile.gym_title} Trainers
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          className="flex flex-row flex-wrap"
        >
          <TrainerProfile />
          <TrainerProfile />
          <TrainerProfile />
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default ViewGymProfile
