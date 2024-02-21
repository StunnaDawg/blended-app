import { View, Text, TextInput, Button } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const QuestionTwo = () => {
  const [addActivity, setAddActivity] = useState<string>()
  const [activityArray, setActivityArray] = useState<string[]>([])
  const navigation = useNavigation<NavigationType>()

  const addToActivityArray = (newValue: string) => {
    setActivityArray((prev) => [...prev, newValue])
  }

  return (
    <View>
      <View>
        <Text>Choose Your Exercises of choice</Text>
        <TextInput
          placeholder="activity"
          onChangeText={setAddActivity}
          value={addActivity}
        />
        <Button
          title="Add activity"
          onPress={() => {
            if (addActivity) addToActivityArray(addActivity)
          }}
        />
      </View>
      <Button
        title="Next"
        onPress={() => navigation.navigate("UserInitalAddPhoto")}
      />
    </View>
  )
}

export default QuestionTwo
