import { View, Text, Button } from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH, db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import SinglePic from "../components/Avatar"

const GymProfile = () => {
  const [gymTitle, setGymTitle] = useState<string>("")
  const [gymStyle, setGymStyle] = useState<string>("")

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
        collection="user"
      />
      <Text>
        {gymTitle}, {gymStyle}
      </Text>
      <Button
        title="edit profile"
        onPress={() => navigation.navigate("GymEditProfile")}
      />
    </View>
  )
}

export default GymProfile
