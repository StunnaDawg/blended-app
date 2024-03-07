import { Button } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"

type QuestionFiveProps = {
  id?: string
  activityArray: string[]
}

const UpdateQuestionFive = ({ id, activityArray }: QuestionFiveProps) => {
  const navigation = useNavigation<NavigationType>()
  const submitUserQuestions = async () => {
    try {
      if (id) {
        const userRef = doc(db, "user", id)

        await updateDoc(userRef, {
          activities: activityArray,
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
        navigation.navigate("UserInitalAddPhoto")
      }}
    />
  )
}

export default UpdateQuestionFive
