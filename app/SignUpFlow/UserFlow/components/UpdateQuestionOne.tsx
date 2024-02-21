import { View, Text, Button } from "react-native"
import React from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { doc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"

type QuestionOneProps = {
  id?: string
  firstName: string
  lastName: string
  gender: string
  intentions: string
}

const UpdateQuestionOne = ({
  id,
  firstName,
  lastName,
  gender,
  intentions,
}: QuestionOneProps) => {
  const navigation = useNavigation<NavigationType>()
  const submitUserQuestions = async () => {
    try {
      if (id) {
        const userRef = doc(db, "user", id)

        await updateDoc(userRef, {
          first_name: firstName,
          last_name: lastName,
          gender: gender,
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
    <Button
      title="Next"
      onPress={async () => {
        await submitUserQuestions()
        navigation.navigate("UserQuestionTwo")
      }}
    />
  )
}

export default UpdateQuestionOne
