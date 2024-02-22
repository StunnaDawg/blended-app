import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH, db } from "../../firebase"
import SinglePic from "../components/Avatar"
import { doc, getDoc } from "firebase/firestore"

const GymProfile = () => {
  const [gymTitle, setGymTitle] = useState<string>("")
  const [gymStyle, setGymStyle] = useState<string>("")

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
      />
      <Text>
        {gymTitle}, {gymStyle}
      </Text>
    </View>
  )
}

export default GymProfile
