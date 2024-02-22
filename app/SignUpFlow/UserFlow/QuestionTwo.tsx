import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Pressable,
} from "react-native"
import React, { useEffect, useState } from "react"
import UpdateQuestionTwo from "./components/UpdateQuestionTwo"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { collection, getDocs } from "firebase/firestore"

const QuestionTwo = () => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [activities, setActivities] = useState<string[]>([])
  const currentId = FIREBASE_AUTH.currentUser?.uid

  const fetchActivities = async () => {
    try {
      const activitiesRef = collection(db, "activities")
      const querySnapshot = await getDocs(activitiesRef)

      querySnapshot.forEach((doc) => {
        const check = doc.data().name
        console.log(check)
        setActivities((prev) => [...prev, check])
      })
    } catch (error) {
      console.error("Error getting activities:", error)
      setActivities([])
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return (
    <View>
      <Text>Choose Your Exercises of choice</Text>
      <View className="flex flex-row justify-between items-center">
        <Text className="font-bold text-2xl">Activities</Text>
        <UpdateQuestionTwo id={currentId} activityArray={selectedActivities} />
      </View>
      <View>
        <View>
          <ScrollView
            className="flex flex-row h-10 border-b-2"
            horizontal={true}
          >
            {selectedActivities?.map((activity, index) => (
              <Pressable
                className="border-2 rounded-full bg-slate-300 p-2 text-center mx-1"
                key={index}
                onPress={() =>
                  setSelectedActivities((prev) =>
                    prev.filter((item) => item !== activity)
                  )
                }
              >
                <Text>{activity}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <ScrollView>
          <View className="flex flex-row flex-wrap">
            {activities?.map((activity, index) => (
              <View key={index} className="flex flex-row">
                <Pressable
                  className="border-2 rounded-full bg-slate-300 p-2 m-1"
                  onPress={() =>
                    setSelectedActivities((prev) => [...prev, activity])
                  }
                >
                  <Text className="text-center">{activity}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default QuestionTwo
