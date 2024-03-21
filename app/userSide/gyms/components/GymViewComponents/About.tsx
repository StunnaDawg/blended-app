import { View, Text, ScrollView } from "react-native"
import React from "react"
import { GymProfile } from "../../../../@types/firestore"
import RequestToBeMember from "../RequestToBeMember"
import RequestToBeCoach from "../RequestToBeCoach"
import TrainerProfile from "../../../../components/TrainerProfile"
import { RootStackParamList } from "../../../../@types/navigation"
import SinglePic from "../../../../components/Avatar"
import { Image } from "expo-image"
import EventCard from "../../../Dashboard/Events/components/EventCard"

type About = {
  gymProfile: GymProfile
  gymId: string
}

const About = ({ gymProfile, gymId }: About) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex flex-row justify-between mx-6">
        <Text className="font-bold text-3xl">{gymProfile.gym_title}</Text>
      </View>

      <View className="mx-6">
        <Text>{gymProfile.gym_style}</Text>
      </View>

      <View className="flex flex-row items-center justify-between mx-6">
        <Text className="font-bold">
          {gymProfile.members == undefined ? 0 : gymProfile.members?.length}{" "}
          Members
        </Text>
        {/* <GymMembersModal members={gymProfile.members} /> */}
        <RequestToBeMember gymId={gymProfile.gymId} />
      </View>

      <View className="mx-6">
        <Text className="font-bold text-xl">About</Text>
        <Text>
          Gym is your ultimate destination for fitness and wellness. Located in
          the heart of the city, our state-of-the-art facility offers a diverse
          range of equipment and programs tailored to meet your fitness goals,
          whether you're a beginner or a seasoned athlete. Our certified
        </Text>
      </View>

      {Array.isArray(gymProfile.events) ? (
        <View>
          <Text className="text-3xl font-bold">Going to</Text>

          <ScrollView horizontal={true}>
            <View className="flex flex-row justify-center flex-wrap">
              {gymProfile.events.map((event, index) => (
                <EventCard key={event.id} event={event} id={event.id} />
              ))}
            </View>
          </ScrollView>
        </View>
      ) : null}

      {gymProfile?.coaches && gymProfile?.coaches.length > 0 ? (
        <View className="mt-2">
          <View className="flex flex-row justify-between items-center mx-6">
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
            {gymProfile.coaches.map((coach) => (
              <View key={coach.id}>
                <TrainerProfile trainerId={coach.id} />
              </View>
            ))}
          </ScrollView>
        </View>
      ) : null}

      <View className="mt-2">
        <View className="flex flex-row justify-between items-center mx-6">
          <Text className="text-xl font-bold">Photos</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          className="flex flex-row flex-wrap"
        >
          {gymProfile?.gymPhotos && gymProfile?.gymPhotos.length > 0 ? (
            gymProfile?.gymPhotos.map((photo, index) => (
              <View key={index}>
                <SinglePic
                  id={gymId}
                  size={150}
                  picNumber={index}
                  avatarRadius={1}
                  noAvatarRadius={10}
                  photoType="gymPhotos"
                  collection="gyms"
                />
              </View>
            ))
          ) : (
            <View>
              <Text className="font-bold text-xl">No Photos</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <RequestToBeCoach gymId={gymProfile.gymId} />
    </ScrollView>
  )
}

export default About
