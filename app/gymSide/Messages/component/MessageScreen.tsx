import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import ViewMessageUserProfile from "./ViewMessageUserProfile"
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore"
import useresMessage from "./UserMessage"
import UserMessage from "./GymMessages"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { Messages, UserProfile } from "../../../@types/firestore"
import { RootStackParamList } from "../../../@types/navigation"
import getUserProfile from "../../../functions/getUserProfile"

const GymMessageScreen = () => {
  const [userIdState, setuserIdState] = useState<string>("")
  const [userIdDocState, setuserIdDoc] = useState<string>("")
  const [userProfile, setuserProfile] = useState<UserProfile>({} as UserProfile)
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile>(
    {} as UserProfile
  )
  const [messageToSend, setMessageToSend] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<Messages[]>([])
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, "GymMessagingScreen">>()
  const userId = route.params?.id
  const userDocId = route.params?.userDocId
  const currentId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    setuserIdState(userId)
    console.log(messages)
  }, [currentId])

  useEffect(() => {
    getUserProfile(userIdState, setuserProfile, setLoading)
  }, [userIdState])

  useEffect(() => {
    setuserIdDoc(userDocId)
  }, [currentId])

  useEffect(() => {
    getUserProfile(currentId, setCurrentUserProfile, setLoading)
  }, [currentId])

  useEffect(() => {
    if (userIdDocState) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "gyms", userIdDocState, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          const messagesData: Messages[] = snapshot.docs.map((doc) => ({
            ...(doc.data() as Messages),
          }))
          setMessages(messagesData)
        }
      )
      return unsubscribe
    }
  }, [userIdDocState, db])

  const sendMessage = async () => {
    try {
      setLoading(true)
      await addDoc(collection(db, "useres", userIdDocState, "messages"), {
        timestamp: serverTimestamp(),
        userId: currentId,
        username: currentUserProfile.firstName,
        photoUrl: currentUserProfile.userPhotos[0],
        message: messageToSend,
      })

      setMessageToSend("")
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <View className="flex-1">
      <View className="flex flex-row justify-center border-b">
        <View className="items-center">
          <ViewMessageUserProfile matchProfile={userProfile} />

          <Text className="font-bold text-md">{userProfile.firstName}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            className="m-2"
            data={messages}
            inverted={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === currentId ? (
                <UserMessage
                  key={message.id}
                  id={currentUserProfile.id}
                  message={message.message}
                />
              ) : (
                <UserMessage
                  key={message.id}
                  id={userIdState}
                  message={message.message}
                />
              )
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View className="flex flex-row mx-1 mb-14 items-center">
        <TextInput
          placeholder={loading ? "sending..." : "Send a Message"}
          className=" flex-1 border rounded-xl h-8 w-64 p-2 "
          value={messageToSend}
          onChangeText={(message) => {
            setMessageToSend(message)
          }}
        />
        <Pressable
          className="mx-2"
          onPress={async () => {
            await sendMessage()
          }}
        >
          <Text className="font-bold">Send</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default GymMessageScreen
