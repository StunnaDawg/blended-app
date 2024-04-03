import { View, Text, Pressable, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import DefaultButton from "../../../components/DefaultButton"
import requestToGym from "../../../functions/requestToGym"
import { FontAwesome6 } from "@expo/vector-icons"
import { FIREBASE_AUTH } from "../../../../firebase"
import { GymProfile } from "../../../@types/firestore"

type RequestToBeMemberProps = {
  gymId: string
  gym: GymProfile
}

const RequestToBeMember = ({ gymId, gym }: RequestToBeMemberProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState(false)
  const currentId = FIREBASE_AUTH.currentUser?.uid

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <>
      {gymId !== currentId ? (
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={async () => {
            setLoading(true)
            await requestToGym(gymId, "memberRequests")
            setLoading(false)
          }}
        >
          <View
            className={`flex flex-row items-center border rounded-xl p-1 mx-1 ${
              isPressed ? "bg-gray-200" : "bg-white"
            }`}
          >
            <FontAwesome6 name="add" size={16} color="black" />
            <Text className="font-semibold mx-1">
              {!loading ? "Join" : <ActivityIndicator />}
            </Text>
          </View>
        </Pressable>
      ) : null}
    </>
  )
}

export default RequestToBeMember
