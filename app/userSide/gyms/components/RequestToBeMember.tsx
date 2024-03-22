import { View, Text, Pressable } from "react-native"
import React from "react"
import DefaultButton from "../../../components/DefaultButton"
import requestToGym from "../../../functions/requestToGym"
import { FontAwesome6 } from "@expo/vector-icons"

type RequestToBeMemberProps = {
  gymId: string
}

const RequestToBeMember = ({ gymId }: RequestToBeMemberProps) => {
  return (
    <Pressable
      onPress={() => {
        requestToGym(gymId, "memberRequests")
      }}
    >
      <View className="flex flex-row items-center border rounded-xl p-1 mx-1">
        <FontAwesome6 name="add" size={16} color="black" />
        <Text className="font-semibold mx-1">Join</Text>
      </View>
    </Pressable>
  )
}

export default RequestToBeMember
