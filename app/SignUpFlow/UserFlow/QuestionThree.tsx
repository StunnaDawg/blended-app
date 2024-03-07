import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"
import UpdateQuestionThree from "./components/UpdateQuestionThree"
import { FIREBASE_AUTH } from "../../../firebase"

const QuestionThree = () => {
  const [intentions, setIntentions] = useState<string>("")
  const currentId = FIREBASE_AUTH.currentUser?.uid
  return (
    <View className="flex flex-row justify-center  items-center">
      <View>
        <Text className="text-3xl">What are you here for?</Text>
        <View>
          <Pressable
            className="border-2"
            onPress={() => setIntentions("Dating")}
          >
            <Text>Dating</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            className="border-2"
            onPress={() => setIntentions("Workout Buddy")}
          >
            <Text>Workout Buddy</Text>
          </Pressable>
        </View>
        <UpdateQuestionThree id={currentId} intentions={intentions} />
      </View>
    </View>
  )
}

export default QuestionThree
