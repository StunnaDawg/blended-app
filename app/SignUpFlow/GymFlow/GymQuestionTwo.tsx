import { View, Text, Button, TextInput } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import * as Location from "expo-location"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { doc, updateDoc } from "firebase/firestore"

const GymQuestionTwo = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [storeLocatio, setStoreLocation] = useState<string | null>()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [addActivity, setAddActivity] = useState<string>()
  const [activityArray, setActivityArray] = useState<string[]>([])
  const navigation = useNavigation<NavigationType>()
  const id = FIREBASE_AUTH.currentUser?.uid

  const addToActivityArray = (newValue: string) => {
    setActivityArray((prev) => [...prev, newValue])
  }

  const submitGymQuestions = async (
    gym_city: string | null,
    gym_province: string | null
  ) => {
    try {
      if (id) {
        const gymRef = doc(db, "gyms", id)

        await updateDoc(gymRef, {
          city: gym_city,
          province: gym_province,
        })
      } else {
        console.log("Gym does not exist")
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
      let currentCity = await Location.reverseGeocodeAsync({
        latitude: location?.coords.latitude,
        longitude: location?.coords.latitude,
      })
      if (currentCity.length > 0) {
        // Extract the city from the address
        await submitGymQuestions(currentCity[0].city, currentCity[0].district)
        navigation.navigate("GymInitalAddPhoto")
      }
    }
  }
  return (
    <View>
      <View>
        <Text>Choose Your Exercises of choice</Text>
        <TextInput
          placeholder="activity"
          onChangeText={setAddActivity}
          value={addActivity}
        />
        <Button
          title="Add activity"
          onPress={() => {
            if (addActivity) addToActivityArray(addActivity)
          }}
        />
      </View>
      <Button title="Next" onPress={async () => await enableLocation()} />
    </View>
  )
}

export default GymQuestionTwo
