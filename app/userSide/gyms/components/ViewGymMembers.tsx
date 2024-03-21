import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

import { Attendee, GymProfile, UserProfile } from "../../../@types/firestore"
import BackButton from "../../../components/BackButton"
import MemberCard from "./GymViewComponents/MemberCard"
import getSingleGym from "../../../functions/getSingleGym"

const ViewGymMembers = () => {
  const [gym, setGym] = useState<GymProfile>({} as GymProfile)
  const [loading, setLoading] = useState<boolean>(false)
  const [attendee, setAttendee] = useState<UserProfile>({} as UserProfile)
  const [usersGoing, setUsersGoing] = useState<Attendee[]>([])
  const [gymIdState, setGymIdState] = useState<string>("")
  const route =
    useRoute<RouteProp<RootStackParamList, "ViewGymMembersScreen">>()
  const gymId = route.params.gymId
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (gym) {
      getSingleGym(gymId, setGym, setLoading)
      setGymIdState(gymId)
    }
  }, [gymId])

  return (
    <ScrollView>
      <View className="flex flex-row items-center justify-start">
        <View className="flex-1">
          <BackButton />
        </View>
        <Text className=" font-bold text-3xl">Attendees</Text>
        <View className="flex-1"></View>
        {/* This empty View acts as a spacer */}
      </View>

      <View className="m-2">
        <Text className=" font-bold text-xl">Coaches</Text>
        {gym ? (
          gym.coaches?.map((coach) => {
            return <MemberCard key={coach.id} userId={coach.id} />
          })
        ) : (
          <View>
            <Text>Null</Text>
          </View>
        )}
      </View>
      <View className="m-2">
        <Text className=" font-bold text-xl">Members</Text>
        {gym ? (
          gym.members?.map((member) => {
            return <MemberCard key={member.id} userId={member.id} />
          })
        ) : (
          <View>
            <Text>Null</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default ViewGymMembers
