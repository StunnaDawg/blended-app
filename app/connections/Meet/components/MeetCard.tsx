import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { UserProfile } from "../../../@types/firestore"
import getUserProfile from "../../../functions/getUserProfile"
import { DocumentSnapshot, doc, getDoc, setDoc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import mergeIds from "../../../functions/mergeId"

type MeetCardProps = {
  id: string
}

const MeetCard = ({ id }: MeetCardProps) => {
  const [userData, setUserData] = useState<UserProfile>({} as UserProfile)
  const [currentUserData, setCurrentUserData] = useState<UserProfile>(
    {} as UserProfile
  )
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  useEffect(() => {
    getUserProfile(id, setUserData)
  }, [])

  useEffect(() => {
    getUserProfile(currentUser, setCurrentUserData)
  }, [])

  const passUser = async () => {
    try {
      if (currentUser) {
        await setDoc(
          doc(db, "user", currentUser, "passes", userData.id),
          userData
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  const swipeUser = async () => {
    try {
      if (currentUser) {
        getDoc(doc(db, "user", userData.id, "swipes", currentUser)).then(
          (documentSnapshot) => {
            console.log("trying")
            if (documentSnapshot.exists()) {
              setDoc(
                doc(db, "user", currentUser, "swipes", userData.id),
                userData
              )
              setDoc(doc(db, "matches", mergeIds(currentUser, userData.id)), {
                users: {
                  [currentUser]: currentUserData,
                  [userData.id]: userData,
                },
                usersMatched: [currentUser, userData.id],
              })

              console.log("User Matched first")
            } else {
              console.log("You matched first")
              setDoc(
                doc(db, "user", currentUser, "swipes", userData.id),
                userData
              )
            }
          }
        )
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
