import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"
import DefaultButton from "../../../components/DefaultButton"
import requestToGym from "../../../functions/requestToGym"
import { FontAwesome6 } from "@expo/vector-icons"

type RequestToBeMemberProps = {
  gymId: string
}

const RequestToBeMember = ({ gymId }: RequestToBeMemberProps) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    setIsPressed(true)
    // You can add more functionality here if needed
  }

  const handlePressOut = () => {
    setIsPressed(false)
    // You can add more functionality here if needed
  }
  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        requestToGym(gymId, "memberRequests")
      }}
    >
      <View
        className={`flex flex-row items-center border rounded-xl p-1 mx-1 ${
          isPressed ? "bg-gray-200" : "bg-white"
        }`}
      >
        <FontAwesome6 name="add" size={16} color="black" />
        <Text className="font-semibold mx-1">Join</Text>
      </View>
    </Pressable>
  )
}

export default RequestToBeMember
