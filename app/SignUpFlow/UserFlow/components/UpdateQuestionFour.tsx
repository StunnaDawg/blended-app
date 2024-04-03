import { Text, Pressable } from "react-native"
import React, { useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"

type QuestionFourProps = {
  id?: string
  birthday: Date
  disable: boolean
}

const UpdateQuestionFour = ({ id, birthday, disable }: QuestionFourProps) => {
  const [pressed, setPressed] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const submitUserQuestions = async () => {
    try {
      if (id) {
        const userRef = doc(db, "user", id)

        await updateDoc(userRef, {
          birthday: birthday,
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
      disabled={disable}
      className={`border-2 w-96 items-center ${
        disable === true ? "bg-gray-200" : pressed ? "bg-gray-light" : "bg-gray"
      }`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={async () => {
        await submitUserQuestions()
        navigation.navigate("UserQuestionFive")
      }}
    >
      <Text className="font-bold text-2xl">Next</Text>
    </Pressable>
  )
}

export default UpdateQuestionFour
