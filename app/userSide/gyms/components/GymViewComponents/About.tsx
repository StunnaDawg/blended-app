import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { Event, GymProfile } from "../../../../@types/firestore"
import { FontAwesome6 } from "@expo/vector-icons"
import { NavigationType } from "../../../../@types/navigation"
import SinglePic from "../../../../components/Avatar"
import EventCard from "../../../Dashboard/Events/components/EventCard"

import getGymEvents from "../../../../functions/getGymEvents"
import { useNavigation } from "@react-navigation/native"
import ActivityTags from "../../../../components/ActivityTags"
import RequestToBeMember from "../RequestToBeMember"
import BackButton from "../../../../components/BackButton"

type About = {
  gymProfile: GymProfile
  gymId: string
}

const About = ({ gymProfile, gymId }: About) => {
  const [eventsArray, setEventsArray] = useState<Event[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    getGymEvents(gymId, setEventsArray, setLoading)
  }, [gymProfile])

  useEffect(() => {
    console.log("events array", eventsArray)
  }, [eventsArray])

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])
  return (
    <>
      {!loading ? (
        <ScrollView
          className="mb-20"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex flex-row mx-6 mt-1 mb-2 items-center">
            <BackButton />
            <Text className="font-bold text-3xl m-1">
              {gymProfile.gym_title}
            </Text>
            <ActivityTags activity={gymProfile.gym_style} />
          </View>

          <View className=" mx-6 mb-2">
            <View className="flex flex-row items-center justify-between">
              <Pressable
                onPress={() => {
                  navigation.navigate("ViewGymMembersScreen", {
                    gymId: gymId,
                  })
                }}
              >
                <View className="flex flex-row items-center">
                  <Text className="font-bold">
                    {gymProfile.members == undefined
                      ? 0
                      : gymProfile.members?.length}{" "}
                    Members
                  </Text>
                  <View className="mx-2">
                    <FontAwesome6 name="people-group" size={24} color="black" />
                  </View>
                </View>
              </Pressable>
              <View className="flex flex-row">
                <RequestToBeMember gym={gymProfile} gymId={gymId} />
              </View>
            </View>
          </View>

          <View className="mx-6">
            <Text className="font-bold text-xl">About</Text>
            <Text>{gymProfile.about}</Text>
          </View>

          {Array.isArray(eventsArray) && eventsArray ? (
            <View className="m-4">
              <View className="flex flex-row  items-center mb-1">
                <Text className="text-xl font-bold">Upcoming Events</Text>
                <View className="mx-2">
                  <FontAwesome6 name="calendar" size={24} color="black" />
                </View>
              </View>

              <ScrollView horizontal={true}>
                <View className="flex flex-row justify-center flex-wrap">
                  {eventsArray.map((event) => (
                    <EventCard key={event.id} event={event} id={event.id} />
                  ))}
                </View>
              </ScrollView>
            </View>
          ) : null}

          <View className="mt-2">
            <View className="flex flex-row items-center mx-6 mb-1">
              <Text className="text-xl font-bold">Photos</Text>
              <View className="mx-2">
                <FontAwesome6 name="camera" size={24} color="black" />
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              className="flex flex-row flex-wrap mx-5"
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
        </ScrollView>
      ) : (
        <View className="flex-1 flex-row justify-center items-center">
          <ActivityIndicator color="blue" />
        </View>
      )}
    </>
  )
}

export default About
