import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { doc, getDoc } from "firebase/firestore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const Activities = () => {
  const [activities, setActivities] = useState<string[]>()
  const navigation = useNavigation<NavigationType>()

  const currentUser = FIREBASE_AUTH.currentUser?.uid
  const getActivities = async () => {
    if (currentUser) {
      const userRef = doc(db, "user", currentUser)
      const data = await getDoc(userRef)
      if (data.exists()) {
        const aboutData = { ...data.data() }

        if (aboutData.activities) {
          setActivities(aboutData.activities)
        }
      }
    }
  }

  useEffect(() => {
    getActivities()
  })
  return (
    <View>
      <Text className="font-bold text-xl">Activities</Text>
      <View className="flex flex-row justify-between bg-slate-200 h-10 items-center">
        <View className="flex flex-row">
          {activities?.map((activity, index) => (
            <>
              <Text className="text-lg" key={index}>
                {activity},
              </Text>
            </>
          ))}
        </View>
        <Pressable
          className=""
          onPress={() => navigation.navigate("ChooseUserActivity")}
        >
          <Feather name="arrow-right" size={32} color="black" />
        </Pressable>
      </View>
    </View>
  )
}

export default Activities
