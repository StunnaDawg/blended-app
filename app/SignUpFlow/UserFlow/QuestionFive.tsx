import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Pressable,
} from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { collection, getDocs } from "firebase/firestore"
import UpdateQuestionFive from "./components/UpdateQuestionFive"

const QuestionFive = () => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [activities, setActivities] = useState<string[]>([])
  const [pressedActivity, setPressedActivity] = useState<string | null>(null)
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

  const handleSelectActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities((prev) => prev.filter((item) => item !== activity))
    } else if (selectedActivities.length < 5) {
      setSelectedActivities((prev) => [...prev, activity])
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return (
    <View>
      <Text className="font-semibold">Choose Your favourite activities</Text>
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          <Text className="font-bold text-2xl mx-1">Activities</Text>
          <Text className="font-semibold text-xs">
            {selectedActivities.length}/5
          </Text>
        </View>
        <UpdateQuestionFive
          disable={selectedActivities.length < 1}
          id={currentId}
          activityArray={selectedActivities}
        />
      </View>
      <ScrollView className="flex flex-row h-10 border-b-2" horizontal={true}>
        {selectedActivities.map((activity, index) => (
          <Pressable
            className={`border-2 rounded-full p-2 text-center mx-1 ${
              pressedActivity === activity ? "bg-blue" : "bg-gray-light"
            }`}
            key={index}
            onPressIn={() => setPressedActivity(activity)}
            onPressOut={() => setPressedActivity(null)}
            onPress={() => handleSelectActivity(activity)}
          >
            <Text>{activity}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView className="mb-28">
        <View className="flex flex-row flex-wrap">
          {activities.map((activity, index) => (
            <Pressable
              className={`border-2 rounded-full p-2 m-1 ${
                selectedActivities.includes(activity)
                  ? "bg-blue"
                  : "bg-gray-light"
              }`}
              key={index}
              onPress={() => handleSelectActivity(activity)}
            >
              <Text className="text-center">{activity}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default QuestionFive
