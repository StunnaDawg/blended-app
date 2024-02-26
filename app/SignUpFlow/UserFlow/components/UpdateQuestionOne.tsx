import { View, Text, Button } from "react-native"
import React, { useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { doc, updateDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import * as Location from "expo-location"

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
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
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

  const enableLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied")
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    let text = "Waiting.."
    if (errorMsg) {
      text = errorMsg
    } else if (location) {
      text = JSON.stringify(location)
    }
  }

  return (
    <Button
      title="Next"
      onPress={async () => {
        await submitUserQuestions()
        await enableLocation()
        navigation.navigate("UserQuestionTwo")
      }}
    />
  )
}

export default UpdateQuestionOne
