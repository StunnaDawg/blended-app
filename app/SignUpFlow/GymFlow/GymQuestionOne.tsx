import { View, Text, TextInput, Button } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import GymQuestionOneButton from "./components/GymQuestionOneButton"
import { FIREBASE_AUTH } from "../../../firebase"

const GymQuestionOne = () => {
  const [gymTitle, setGymTitle] = useState<string>("")
  const [gymStyle, setGymStyle] = useState<string>("")
  const [province, setProvince] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const currentId = FIREBASE_AUTH.currentUser?.uid
  const navigation = useNavigation<NavigationType>()

  return (
    <View className="flex flex-col items-center">
      <View className="items-center">
        <Text className="text-2xl font-bold">Gym Title</Text>
        <TextInput
          className="h-9 border-2 w-36 rounded p-1"
          value={gymTitle}
          onChangeText={setGymTitle}
          placeholder="Gym title"
        />
      </View>
      <View className="items-center">
        <Text className="text-2xl font-bold">Fitness Style</Text>
        <TextInput
          className="h-9 border-2 w-36 rounded p-1"
          value={gymStyle}
          onChangeText={setGymStyle}
          placeholder="fitness style"
        />
      </View>

      <View className="items-center">
        <Text className="text-2xl font-bold">Province</Text>
        <TextInput
          className="h-9 border-2 w-36 rounded p-1"
          value={province}
          onChangeText={setProvince}
          placeholder="Location"
        />
      </View>

      <View className="items-center">
        <Text className="text-2xl font-bold">City</Text>
        <TextInput
          className="h-9 border-2 w-36 rounded p-1"
          value={city}
          onChangeText={setCity}
          placeholder="City"
        />
      </View>

      <GymQuestionOneButton
        id={currentId}
        gymStyle={gymStyle}
        gymTitle={gymTitle}
        province={province}
        city={city}
      />
    </View>
  )
}

export default GymQuestionOne
