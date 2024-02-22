import { View, Text, Button, Pressable, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { collection, doc, getDocs, setDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { Activities } from "../@types/firestore"

const ChooseActivity = () => {
  const [activities, setActivities] = useState<string[]>([])

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
    <ScrollView>
      {activities?.map((activity, index) => (
        <Pressable key={index}>
          <Text>{activity}</Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}

export default ChooseActivity
