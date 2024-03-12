import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import getUserProfiles from "../../functions/getUserProfiles"
import { GymRequest, UserProfile } from "../../@types/firestore"

const GymRequests = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [isPressed2, setIsPressed2] = useState<boolean>(false)
  const [memberRequestsList, setShowMemberRequestList] = useState<boolean>(true)
  const [coachRequests, setCoachRequests] = useState<UserProfile[]>([])
  const [memberRequests, setMemberRequests] = useState<UserProfile[]>([])
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
  const fetchUsers = async () => {
    setLoading(true)
    await getUserProfiles(setCoachRequests, "gyms", "coachRequests")
    await getUserProfiles(setMemberRequests, "gyms", "memberRequests")
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    console.log("coach requests", coachRequests)
    console.log("member requests", memberRequests)
  }, [loading])

  return (
    <>
      <View className="flex-row justify-center border-b-2">
        <View
          className={
            isPressed ? "p-5 border-r pl-20 bg-black" : "p-5 pl-20 border-r "
          }
        >
          <Pressable
            onPress={() => {
              setShowMemberRequestList(true)
            }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text className="font-bold text-lg">Member Requests</Text>
          </Pressable>
        </View>

        <View
          className={
            isPressed2 ? "p-5 border-l pr-20 bg-black" : "p-5 pr-20 border-l "
          }
        >
          <Pressable
            onPress={() => {
              setShowMemberRequestList(false)
            }}
            onPressIn={handlePressIn2}
            onPressOut={handlePressOut2}
          >
            <Text className="font-bold text-lg">Coaches Requests</Text>
          </Pressable>
        </View>
      </View>

      {!loading ? (
        <ScrollView>
          {!memberRequestsList
            ? coachRequests.map((coachRequest) => (
                <View key={coachRequest.id}>
                  <Text>{coachRequest.lastName}</Text>
                </View>
              ))
            : memberRequests.map((memberRequest) => (
                <View key={memberRequest.id}>
                  <Text>{memberRequest.firstName}</Text>
                </View>
              ))}
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}
    </>
  )
}

export default GymRequests
