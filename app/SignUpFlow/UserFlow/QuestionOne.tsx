import { View, Text, TextInput } from "react-native"
import React, { useState } from "react"
import { NavigationType } from "../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native-elements"
import UpdateQuestionOne from "./components/UpdateQuestionOne"
import { FIREBASE_AUTH } from "../../../firebase"

const QuestionOne = () => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [gender, setGender] = useState<string>("")
  const [intentions, setIntentions] = useState<string>("")
  const navigation = useNavigation<NavigationType>()
  const currentId = FIREBASE_AUTH.currentUser?.uid

  return (
    <View>
      <View>
        <Text>First name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="first name"
        />
      </View>
      <View>
        <Text>Last Name</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="last name"
        />
      </View>

      <View>
        <Text>Gender</Text>
        <TextInput
          value={gender}
          onChangeText={setGender}
          placeholder="Gender"
        />
      </View>

      <View>
        <Text>Intentions</Text>
        <TextInput
          value={intentions}
          onChangeText={setIntentions}
          placeholder="Intentions"
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
