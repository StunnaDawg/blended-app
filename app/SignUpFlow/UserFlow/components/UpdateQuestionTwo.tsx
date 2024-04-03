import { View, Text, Button, Pressable } from "react-native"
import React, { useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { doc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"

type QuestionTwoProps = {
  id?: string
  gender: string | null
}

const UpdateQuestionTwo = ({ id, gender }: QuestionTwoProps) => {
  const [pressed, setPressed] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const submitUserQuestions = async () => {
    try {
      if (id) {
        const userRef = doc(db, "user", id)

        await updateDoc(userRef, {
          gender: gender,
        })
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Pressable
      disabled={gender === null}
      className={`border-2 w-96 items-center ${
        gender === null ? "bg-gray-200" : pressed ? "bg-gray-light" : "bg-gray"
      }`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={async () => {
        await submitUserQuestions()
        navigation.navigate("UserQuestionThree")
      }}
    >
      <Text className="font-bold text-2xl">Next</Text>
    </Pressable>
  )
}

export default UpdateQuestionTwo
