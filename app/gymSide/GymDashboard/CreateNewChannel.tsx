import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import createNewChannelFunc from "../../functions/createNewChannel"
import { FIREBASE_AUTH } from "../../../firebase"
import getUserProfile from "../../functions/getUserProfile"
import { UserProfile } from "../../@types/firestore"

const CreateNewChannel = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)
  const currentUserId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    if (currentUserId) {
      getUserProfile(currentUserId, setUserProfile, setLoading)
    }
  }, [currentUserId])
  return (
    <View>
      <Pressable
        onPress={() => {
          if (userProfile.createdGym !== null) {
            createNewChannelFunc(
              setLoading,
              userProfile.createdGym,
              "Waka",
              "wakekawak"
            )
          }
        }}
      >
        <Text>Create New Channel</Text>
      </Pressable>
    </View>
  )
}

export default CreateNewChannel
