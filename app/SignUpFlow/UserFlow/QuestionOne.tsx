import { View, Text, TextInput, ScrollView } from "react-native"
import React, { useState } from "react"
import { NavigationType } from "../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native-elements"
import UpdateQuestionOne from "./components/UpdateQuestionOne"
import { FIREBASE_AUTH } from "../../../firebase"
import { SelectList } from "react-native-dropdown-select-list"

const QuestionOne = () => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [gender, setGender] = useState<string>("")
  const [intentions, setIntentions] = useState<string>("")

  const navigation = useNavigation<NavigationType>()
  const currentId = FIREBASE_AUTH.currentUser?.uid

  return (
    <ScrollView
      style={{ flex: 1 }} // Ensure the ScrollView takes up all available space
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="items-center">
        <Text className="text-4xl font-bold">Welcome!</Text>
        <Text className="text-3xl font-bold">What's your name?</Text>
      </View>
      <View className="flex mb-7">
        <Text className="text-lg mb-2 font-semibold">First name</Text>
        <TextInput
          className="h-9 border-2 w-96 rounded p-1"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
        />
      </View>
      <View>
        <Text className="text-lg mb-2 font-semibold">Last Name</Text>
        <TextInput
          className="h-9 border-2 w-96 rounded p-1"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
        />
      </View>

      <View className="flex-1 mt-8">
        <UpdateQuestionOne
          id={currentId}
          firstName={firstName}
          lastName={lastName}
        />
      </View>
    </ScrollView>
  )
}

export default QuestionOne
