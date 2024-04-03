import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

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
      <View className="flex flex-row mx-2">
        <Pressable
          className="flex flex-row mx-2 items-center"
          onPress={() => navigation.navigate("ChooseUserActivity")}
        >
          <Text className="font-bold text-xl">Activities</Text>
          <Feather name="plus" size={24} color="black" />
        </Pressable>
      </View>
      <View className="flex flex-row bg-slate-200 h-10 items-center px-4 mt-1">
        <View className="flex flex-row flex-wrap">
          {activities?.map((activity, index) => (
            <>
              <View key={index}>
                <Text className="text-sm">{activity}, </Text>
              </View>
            </>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Activities
