import { View, Text, TextInput } from "react-native"
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

  const genderData = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Other" },
  ]

  const intentionsData = [
    { key: "1", value: "Dating" },
    { key: "2", value: "Friends" },
    { key: "3", value: "Workout" },
  ]

  return (
    <View className="flex flex-col items-center">
      <View className="items-center">
        <Text className="text-2xl font-bold">First name</Text>
        <TextInput
          className="h-9 border-2 w-36 rounded p-1"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
        />
      </View>
      <View className="items-center">
        <Text className="text-2xl font-bold">Last Name</Text>
        <TextInput
          className="h-9 border-2 w-36 rounded p-1"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
        />
      </View>

      <View>
        <Text className="text-2xl font-bold">Gender</Text>
        <SelectList
          boxStyles={{ width: 100, padding: 2 }}
          search={false}
          setSelected={(val: string) => setGender(val)}
          data={genderData}
          save="value"
          placeholder="Male"
        />
      </View>

      <View>
        <Text className="text-2xl font-bold">Intentions</Text>
        <SelectList
          maxHeight={100}
          search={false}
          setSelected={(val: string) => setIntentions(val)}
          data={intentionsData}
          placeholder="Dating"
          save="value"
        />
      </View>

      <UpdateQuestionOne
        id={currentId}
        firstName={firstName}
        lastName={lastName}
        gender={gender}
        intentions={intentions}
      />
    </View>
  )
}

export default QuestionOne
