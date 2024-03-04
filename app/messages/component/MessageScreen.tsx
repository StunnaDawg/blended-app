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
import SinglePic from "../../components/Avatar"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { RootStackParamList, RouteParamsType } from "../../@types/navigation"
import { FIREBASE_AUTH, db } from "../../../firebase"
import getUserProfile from "../../functions/getUserProfile"
import { Messages, UserProfile } from "../../@types/firestore"
import { ScrollView } from "react-native-gesture-handler"
import ViewUserProfile from "../../components/ViewUserProfile"
import ViewMessageUserProfile from "./ViewMessageUserProfile"
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore"
import MatchesMessage from "./MatchesMessage"
import UserMessage from "./UserMessages"

const MessageScreen = () => {
  const [matchIdState, setMatchIdState] = useState<string>("")
  const [matchIdDocState, setMatchIdDoc] = useState<string>("")
  const [matchProfile, setMatchProfile] = useState<UserProfile>(
    {} as UserProfile
  )
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile>(
    {} as UserProfile
  )
  const [messageToSend, setMessageToSend] = useState<string>()
  const [messages, setMessages] = useState<Messages[]>([])
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, "MessagingScreen">>()
  const matchId = route.params?.id
  const matchDocId = route.params?.matchDocId
  const currentId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    setMatchIdState(matchId)
  }, [currentId])

  useEffect(() => {
    getUserProfile(matchIdState, setMatchProfile)
  }, [matchIdState])

  useEffect(() => {
    setMatchIdDoc(matchDocId)
  }, [currentId])

  useEffect(() => {
    getUserProfile(currentId, setCurrentUserProfile)
  }, [currentId])

  useEffect(() => {
    if (matchIdDocState) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "matches", matchIdDocState, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          const messagesData: Messages[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Messages),
          }))
          setMessages(messagesData)
        }
      )
      return unsubscribe
    }
  }, [matchIdDocState, db])

  const sendMessage = async () => {
    try {
      await addDoc(collection(db, "matches", matchIdDocState, "messages"), {
        timestamp: serverTimestamp(),
        userId: currentId,
        username: currentUserProfile.firstName,
        photoUrl: currentUserProfile.userPhotos[0],
        message: messageToSend,
      })
      setMessageToSend("")
      console.log("Message Sent")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <View className="flex-1">
      <View className="flex flex-row justify-center border-b">
        <View className="items-center">
          <ViewMessageUserProfile id={matchIdState} />

          <Text className="font-bold text-md">{matchProfile.firstName}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.userId}
            renderItem={({ item: message, index }) =>
              message.userId === currentId ? (
                <UserMessage
                  key={index}
                  id={currentUserProfile.id}
                  message={message.message}
                />
              ) : (
                <MatchesMessage
                  key={index}
                  id={matchIdState}
                  message={message.message}
                />
              )
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View className="flex flex-row mx-1 mb-14 items-center">
        <TextInput
          placeholder="Say hi!"
          className=" flex-1 border rounded-xl h-8 w-64 p-2 "
          value={messageToSend}
          onChangeText={(message) => setMessageToSend(message)}
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

export default MessageScreen

{
  /* <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex flex-row justify-center">
            <Text className="text-xs">You connected on...</Text>
          </View>
          <UserMessage id={currentUserProfile.id} message="hu" />

          <MatchesMessage id={matchIdState} message="Hi" />
        </KeyboardAvoidingView>
      </ScrollView> */
}
