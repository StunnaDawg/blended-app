import { View, Text, TextInput, Button } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const GymQuestionOne = () => {
  const [gymTitle, setGymTitle] = useState<string>("")
  const [gymStyle, setGymStyle] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [city, setCity] = useState<string>("")
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
        <Text>Location</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Location"
        />
      </View>

      <View>
        <Text>City</Text>
        <TextInput value={city} onChangeText={setCity} placeholder="City" />
      </View>

      <Button
        title="Next"
        onPress={() => navigation.navigate("GymInitalAddPhoto")}
      />
    </View>
  )
}

export default GymQuestionOne
