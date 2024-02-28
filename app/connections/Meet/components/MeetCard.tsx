import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { UserProfile } from "../../../@types/firestore"
import getUserProfile from "../../../functions/getUserProfile"
import { doc, setDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"

type MeetCardProps = {
  id: string
}

const MeetCard = ({ id }: MeetCardProps) => {
  const [userData, setUserData] = useState<UserProfile>({} as UserProfile)
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  useEffect(() => {
    getUserProfile(id, setUserData)
  }, [])

  const passUser = async () => {
    try {
      if (currentUser) {
        await setDoc(
          doc(db, "user", currentUser, "passes", userData.id),
          userData
        )
        console.log("complete")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const swipeUser = async () => {
    try {
      if (currentUser) {
        await setDoc(
          doc(db, "user", currentUser, "swipes", userData.id),
          userData
        )
        console.log("complete")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View>
      <Text>{userData.firstName}</Text>
      <Pressable
        onPress={() => {
          passUser()
        }}
      >
        <Text className="font-bold">Pass</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          swipeUser()
        }}
      >
        <Text className="font-bold">Swipe</Text>
      </Pressable>
    </View>
  )
}

export default MeetCard
