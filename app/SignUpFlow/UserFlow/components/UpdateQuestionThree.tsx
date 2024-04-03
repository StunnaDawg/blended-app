import { View, Text, Button, Pressable } from "react-native"
import React, { useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"

type QuestionThreeProps = {
  id?: string
  intentions: string
}

const UpdateQuestionThree = ({ id, intentions }: QuestionThreeProps) => {
  const [pressed, setPressed] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const submitUserQuestions = async () => {
    try {
      if (id) {
        const userRef = doc(db, "user", id)

        await updateDoc(userRef, {
          intentions: intentions,
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
      disabled={intentions === ""}
      className={`border-2 w-96 items-center ${
        intentions === ""
          ? "bg-gray-200"
          : pressed
          ? "bg-gray-light"
          : "bg-gray"
      }`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={async () => {
        await submitUserQuestions()
        navigation.navigate("UserQuestionFour")
      }}
    >
      <Text className="font-bold text-2xl">Next</Text>
    </Pressable>
  )
}

export default UpdateQuestionThree
