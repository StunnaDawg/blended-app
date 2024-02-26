import { View, Text, Button, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH, db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import SinglePic from "../components/Avatar"

const GymProfile = () => {
  const [gymTitle, setGymTitle] = useState<string>("")
  const [gymStyle, setGymStyle] = useState<string[]>([])

  const navigation = useNavigation<NavigationType>()
  const currentId = FIREBASE_AUTH.currentUser?.uid
  const getUserNameAge = async () => {
    if (currentId) {
      const userRef = doc(db, "gyms", currentId)

      const docSnap = await getDoc(userRef)

      if (docSnap.exists()) {
        const gymData = { ...docSnap.data() }

        setGymTitle(gymData.gym_title)

        setGymStyle(gymData.gym_style)
      }
    }
  }

  useEffect(() => {
    getUserNameAge()
  }, [])
  return (
    <View>
      <SinglePic
        size={200}
        id={FIREBASE_AUTH.currentUser?.uid}
        picNumber={0}
        avatarRadius={646}
        noAvatarRadius={646}
        collection="gyms"
        photoType="gymPhotos"
      />
      <View className="flex flex-row justify-center">
        <Text className="text-xl font-bold">{gymTitle}</Text>
      </View>
      <View className="flex flex-row">
        {Array.isArray(gymStyle) &&
          gymStyle?.map((style, index) => (
            <View key={style}>
              <Pressable className="border-2 rounded-full p-2 m-1 bg-slate-300">
                <Text className="text-center">{gymStyle[index]}</Text>
              </Pressable>
            </View>
          ))}
      </View>
      <Button
        title="edit profile"
        onPress={() => navigation.navigate("GymEditProfile")}
      />
    </View>
  )
}

export default GymProfile
