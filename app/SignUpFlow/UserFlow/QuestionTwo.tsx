import { View, Text, TextInput, Button } from "react-native"
import React, { useState } from "react"
import UpdateQuestionTwo from "./components/UpdateQuestionTwo"
import { FIREBASE_AUTH } from "../../../firebase"

const QuestionTwo = () => {
  const [addActivity, setAddActivity] = useState<string>()
  const [activityArray, setActivityArray] = useState<string[]>([])
  const currentId = FIREBASE_AUTH.currentUser?.uid

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
      <UpdateQuestionTwo id={currentId} activityArray={activityArray} />
    </View>
  )
}

export default QuestionTwo
