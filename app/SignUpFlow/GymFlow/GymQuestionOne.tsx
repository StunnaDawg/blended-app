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
    <View>
      <View>
        <Text>Gym Title</Text>
        <TextInput
          value={gymTitle}
          onChangeText={setGymTitle}
          placeholder="Gym title"
        />
      </View>
      <View>
        <Text>Fitness Style</Text>
        <TextInput
          value={gymStyle}
          onChangeText={setGymStyle}
          placeholder="fitness style"
        />
      </View>

      <View>
        <Text>Province</Text>
        <TextInput
          value={province}
          onChangeText={setProvince}
          placeholder="Location"
        />
      </View>

      <View>
        <Text>City</Text>
        <TextInput value={city} onChangeText={setCity} placeholder="City" />
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
