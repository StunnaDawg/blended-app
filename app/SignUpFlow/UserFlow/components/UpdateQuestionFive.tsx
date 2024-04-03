import { Button, Pressable, Text } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"

type QuestionFiveProps = {
  id?: string
  activityArray: string[]
  disable: boolean
}

const UpdateQuestionFive = ({
  id,
  activityArray,
  disable,
}: QuestionFiveProps) => {
  const [pressed, setPressed] = useState<boolean>(false)
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
    <Pressable
      disabled={disable}
      className={`border-2 items-center w-20 ${
        disable === true ? "bg-gray-200" : pressed ? "bg-gray-light" : "bg-gray"
      }`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={async () => {
        await submitUserQuestions()
        navigation.navigate("UserInitalAddPhoto")
      }}
    >
      <Text>Next</Text>
    </Pressable>
  )
}

export default UpdateQuestionFive
