import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { GymProfile } from "../../@types/firestore"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import getSingleGym from "../../functions/getSingleGym"
import BackButton from "../../components/BackButton"
import MemberCard from "../../userSide/gyms/components/GymViewComponents/MemberCard"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { FontAwesome6 } from "@expo/vector-icons"
import { deleteDoc, doc } from "firebase/firestore"

const ModerateUsers = () => {
  const [gym, setGym] = useState<GymProfile>({} as GymProfile)
  const [loading, setLoading] = useState<boolean>(false)
  const [gymIdState, setGymIdState] = useState<string>("")
  const currentId = FIREBASE_AUTH.currentUser?.uid
  const navigation = useNavigation<NavigationType>()

  const removeUser = async (memberId: string, memberType: string) => {
    const gymRef = doc(db, "gyms", gymIdState, memberType, memberId)
    const userRef = doc(db, "user", memberId, "gyms", gymIdState)
    try {
      setLoading(true)
      await deleteDoc(gymRef)
      await deleteDoc(userRef)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentId) {
      getSingleGym(currentId, setGym, setLoading)
      setGymIdState(currentId)
    }
  }, [currentId])

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
        <Text className=" font-bold text-xl">Owner</Text>
        {!loading ? (
          <MemberCard key={gym.gymOwner} userId={gym.gymOwner} />
        ) : (
          <ActivityIndicator />
        )}
      </View>

      <View className="m-2">
        <Text className=" font-bold text-xl">Coaches</Text>
        {!loading ? (
          gym.coaches?.map((coach) => {
            return (
              <>
                <View className="flex flex-row items-center" key={coach.id}>
                  <MemberCard userId={coach.id} />
                  <View className="mx-2">
                    <Pressable
                      onPress={() => {
                        removeUser(coach.id, "coaches")
                      }}
                    >
                      <FontAwesome6 name="user-xmark" size={20} color="black" />
                    </Pressable>
                  </View>
                </View>
              </>
            )
          })
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <View className="m-2">
        <Text className=" font-bold text-xl">Members</Text>
        {!loading ? (
          gym.members?.map((member) => {
            return (
              <View
                className="flex flex-row justify-between items-center"
                key={member.id}
              >
                <MemberCard userId={member.id} />
                <View className="mx-2">
                  <Pressable
                    onPress={() => {
                      removeUser(member.id, "members")
                    }}
                  >
                    <FontAwesome6 name="user-xmark" size={20} color="black" />
                  </Pressable>
                </View>
              </View>
            )
          })
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ScrollView>
  )
}

export default ModerateUsers
