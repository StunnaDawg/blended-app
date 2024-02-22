import { View, Text, Button, Pressable, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"
import { Activities } from "../@types/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"

const ChooseActivity = () => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [activities, setActivities] = useState<string[]>([])
  const navigation = useNavigation<NavigationType>()
  const currentUser = FIREBASE_AUTH.currentUser?.uid

  const submitUserQuestions = async () => {
    try {
      if (currentUser) {
        const userRef = doc(db, "user", currentUser)

        await updateDoc(userRef, {
          activities: selectedActivities,
        })
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getSelectedActivities = async () => {
    if (currentUser) {
      const userRef = doc(db, "user", currentUser)
      const data = await getDoc(userRef)
      if (data.exists()) {
        const aboutData = { ...data.data() }

        if (aboutData.activities) {
          setSelectedActivities(aboutData.activities)
        }
      }
    }
  }

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

  useEffect(() => {
    getSelectedActivities()
  }, [])

  return (
    <>
      <View className="flex flex-row justify-between items-center">
        <Text className="font-bold text-2xl">Activities</Text>
        <Pressable
          className="text-2xl"
          onPress={async () => {
            await submitUserQuestions()
            navigation.goBack()
          }}
        >
          <Text className="text-xl font-bold">Save</Text>
        </Pressable>
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
    </>
  )
}

export default ChooseActivity
