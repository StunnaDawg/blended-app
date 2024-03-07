import { View, Text, Button } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"

type GymQuestionOneProps = {
  id?: string
  gymTitle: string
  gymStyle: string
}

const GymQuestionOneButton = ({
  id,
  gymTitle,
  gymStyle,
}: GymQuestionOneProps) => {
  const navigation = useNavigation<NavigationType>()
  const submitGymQuestions = async () => {
    try {
      if (id) {
        const userRef = doc(db, "gyms", id)

        await updateDoc(userRef, {
          gym_title: gymTitle,
          gym_style: gymStyle,
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
        await submitGymQuestions()
        navigation.navigate("GymInitalAddPhoto")
      }}
    />
  )
}

export default GymQuestionOneButton
