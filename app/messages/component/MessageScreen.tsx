import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../components/Avatar"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { RootStackParamList, RouteParamsType } from "../../@types/navigation"
import { FIREBASE_AUTH, db } from "../../../firebase"
import getUserProfile from "../../functions/getUserProfile"
import { UserProfile } from "../../@types/firestore"
import { ScrollView } from "react-native-gesture-handler"
import ViewUserProfile from "../../components/ViewUserProfile"
import ViewMessageUserProfile from "./ViewMessageUserProfile"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

const MessageScreen = () => {
  const [matchIdState, setMatchIdState] = useState<string>("")
  const [matchProfile, setMatchProfile] = useState<UserProfile>(
    {} as UserProfile
  )
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile>(
    {} as UserProfile
  )
  const [messageToSend, setMessageToSend] = useState<string>()
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, "MessagingScreen">>()
  const matchId = route.params?.id
  const currentId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    setMatchIdState(matchId)
  }, [currentId])

  useEffect(() => {
    getUserProfile(matchIdState, setMatchProfile)
  }, [matchIdState])

  useEffect(() => {
    getUserProfile(currentId, setCurrentUserProfile)
  }, [currentId])

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchIdState, "messages"), {
      timestamp: serverTimestamp(),
      userId: currentId,
      username: currentUserProfile.firstName,
      photoUrl: currentUserProfile.userPhotos[0],
      message: messageToSend,
    })
  }
  return (
    <View className="flex-1">
      <View className="flex flex-row justify-center border-b">
        <View className="items-center">
          <ViewMessageUserProfile id={matchIdState} />

          <Text className="font-bold text-md">{matchProfile.firstName}</Text>
        </View>
      </View>

      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex flex-row justify-center">
            <Text className="text-xs">You connected on...</Text>
          </View>

          <View className="flex flex-row justify-end mt-2 mx-1">
            <View>
              <View className="rounded-2xl border bg-blue-200 w-40 p-2">
                <Text className="text-xs">
                  HiddddddddddddddddddHidddddddddddddddddd
                </Text>
              </View>
              <View className="flex flex-row justify-end">
                <Text className="text-xs">Sent</Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row justify-start flex-wrap mt-2 items-center mx-1">
            <SinglePic
              size={50}
              id={matchIdState}
              picNumber={0}
              avatarRadius={150}
              noAvatarRadius={10}
              collection="user"
              photoType="userPhotos"
            />
            <View className="rounded-2xl border mx-1 bg-blue-200 w-40 p-2">
              <Text className="text-xs">
                HiddddddddddddddddddHidddddddddddddddddd
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <View className="flex flex-row mx-1 mb-14 items-center">
        <TextInput
          placeholder="Say hi!"
          className=" flex-1 border rounded-xl h-8 w-64 p-2 "
          value={messageToSend}
          onChangeText={(message) => setMessageToSend(message)}
        />
        <Pressable className="mx-2">
          <Text className="font-bold">Send</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default MessageScreen
