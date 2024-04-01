import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native"
import React, { useEffect, useState } from "react"
import createNewChannelFunc from "../../functions/createNewChannel"
import { FIREBASE_AUTH } from "../../../firebase"
import getUserProfile from "../../functions/getUserProfile"
import { UserProfile } from "../../@types/firestore"
import BackButton from "../../components/BackButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const CreateNewChannel = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)
  const [channelTitle, setChannelTitle] = useState<string>("")
  const [channelDescription, setChannelDescription] = useState<string>("")
  const currentUserId = FIREBASE_AUTH.currentUser?.uid
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (currentUserId) {
      getUserProfile(currentUserId, setUserProfile, setLoading)
    }
  }, [currentUserId])

  const handleCreateChannel = () => {
    if (userProfile.createdGym) {
      setLoading(true)

      createNewChannelFunc(
        userProfile.createdGym,
        channelTitle,
        channelDescription
      )
        .then(() => {
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          console.error("Error creating channel:", error)
        })
    }
  }

  return (
    <View className="p-5 text-center">
      {loading ? (
        <ActivityIndicator className="mt-20" />
      ) : (
        <>
          <View className="flex flex-row items-center">
            <BackButton />
            <Text className="font-bold text-xl mx-2">
              Create New Community Channel
            </Text>
          </View>
          <TextInput
            placeholder="Channel Title"
            value={channelTitle}
            onChangeText={setChannelTitle}
            className="h-10 border-b mb-4 px-2"
          />
          <TextInput
            placeholder="Channel Description"
            value={channelDescription}
            onChangeText={setChannelDescription}
            className="h-10 border-b mb-6 px-2"
          />
          <Pressable
            onPress={() => {
              handleCreateChannel(), navigation.goBack()
            }}
            className="bg-blue p-3 rounded-md items-center"
          >
            <Text className="text-white font-semibold">Create New Channel</Text>
          </Pressable>
        </>
      )}
    </View>
  )
}

export default CreateNewChannel
