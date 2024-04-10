import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native"
import Message from "./Message"
import { TouchableWithoutFeedback } from "react-native"
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../../firebase"
import { Messages, UserProfile } from "../../../../@types/firestore"
import { useEffect, useState } from "react"
import getUserProfile from "../../../../functions/getUserProfile"
import UserMessage from "./UserMessage"
import { FontAwesome6 } from "@expo/vector-icons"

type ChannelMessageScreenProps = {
  gymId: string
  channelId: string
  channelName: string
  handleDismissModal: () => void
}

const ChannelMessageScreen = ({
  gymId,
  channelId,
  channelName,
  handleDismissModal,
}: ChannelMessageScreenProps) => {
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile>(
    {} as UserProfile
  )
  const [messageToSend, setMessageToSend] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<Messages[]>([])
  const currentId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    getUserProfile(currentId, setCurrentUserProfile, setLoading)
  }, [currentId])

  useEffect(() => {
    setLoading(true)
    if (channelId) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "gyms", gymId, "channels", channelId, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          const messagesData: Messages[] = snapshot.docs.map((doc) => ({
            ...(doc.data() as Messages),
          }))
          setMessages(messagesData)
        }
      )
      setLoading(false)
      return unsubscribe
    }
    setLoading(false)
  }, [db, channelId])

  const sendMessage = async () => {
    try {
      setLoading(true)
      const docRef = await addDoc(
        collection(db, "gyms", gymId, "channels", channelId, "messages"),
        {
          timestamp: serverTimestamp(),
          userId: currentId,
          username: currentUserProfile.firstName,
          photoUrl: currentUserProfile.userPhotos[0],
          message: messageToSend,
        }
      )

      await updateDoc(docRef, {
        docId: docRef.id,
      })
      setMessageToSend("")
    } catch (err) {
      setLoading(false)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <View className="flex-1">
      <View className="flex flex-row items-center">
        <Pressable
          className="m-6"
          onPress={() => {
            handleDismissModal()
          }}
        >
          <FontAwesome6 name="arrow-left" size={24} color="black" />
        </Pressable>
        <View className="flex flex-row items-center">
          <FontAwesome6 name="hashtag" size={20} color="black" />
          <Text className="text-xl font-bold mx-2">{channelName}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {!loading ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              className="m-2"
              data={messages}
              inverted={true}
              keyExtractor={(item) => {
                return item.id
              }}
              renderItem={({ item: message }) =>
                message.userId === currentId ? (
                  <View>
                    <UserMessage
                      id={currentUserProfile.id}
                      message={message.message}
                    />
                  </View>
                ) : (
                  <View>
                    <Message id={message.userId} message={message.message} />
                  </View>
                )
              }
            />
          </TouchableWithoutFeedback>
        ) : (
          <View className="mt-64">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </KeyboardAvoidingView>

      <View className="flex flex-row justify-center items-center mb-10">
        <TextInput
          placeholder={loading ? "sending..." : "Send a Message"}
          className=" border rounded-xl h-9 w-80 p-2 "
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
          <Text className=" text-xl font-bold">Send</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ChannelMessageScreen
