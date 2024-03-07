import { View, Text, Button, Pressable } from "react-native"
import React, { useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"

type QuestionFourProps = {
  id?: string
  birthday: Date
}

const UpdateQuestionFour = ({ id, birthday }: QuestionFourProps) => {
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
      className="border-2 w-96 items-center bg-red-500"
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
