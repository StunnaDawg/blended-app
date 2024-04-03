import { View, Text, Button, Pressable } from "react-native"
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
}

const UpdateQuestionOne = ({ id, firstName, lastName }: QuestionOneProps) => {
  const [pressed, setPressed] = useState<boolean>(false)
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
    <Pressable
      disabled={firstName === "" || lastName === ""}
      className={`border-2 w-96 items-center ${
        firstName === "" || lastName === ""
          ? "bg-gray-200"
          : pressed
          ? "bg-gray-light"
          : "bg-gray"
      }`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={async () => {
        await submitUserQuestions()
        await enableLocation()
        navigation.navigate("UserQuestionTwo")
      }}
    >
      <Text className="font-bold text-2xl">Next</Text>
    </Pressable>
  )
}

export default UpdateQuestionOne
