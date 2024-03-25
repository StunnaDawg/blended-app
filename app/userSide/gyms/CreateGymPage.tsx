import { View, Text } from "react-native"
import React from "react"
import BackButton from "../../components/BackButton"

const CreateGymPage = () => {
  return (
    <>
      <View className="flex flex-row items-center">
        <BackButton />
        <Text className="text-lg font-semibold">Cancel</Text>
      </View>
      <View>
        <Text>Create Gym</Text>
      </View>
    </>
  )
}

export default CreateGymPage
