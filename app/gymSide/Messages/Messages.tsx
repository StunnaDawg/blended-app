import { View, Text, Pressable, Image, RefreshControl } from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Match, UserProfile } from "../../@types/firestore"
import { ScrollView } from "react-native-gesture-handler"
import { collection, doc, onSnapshot, query, where } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../firebase"
import SinglePic from "../../components/Avatar"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import ViewUserProfile from "../../components/ViewUserProfile"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const MessageTab = () => {
  const [messages, setMessages] = useState<Match[]>([])
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  const navigation = useNavigation<NavigationType>()

  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "gymMessaging"),
          where("gymUser", "array-contains", currentUser)
        ),
        (snapshot) => {
          const MessageData: Match[] = []
          snapshot.forEach((doc) => {
            const matchData = {
              id: doc.id,
              ...doc.data(),
              users: {
                user1: { ...doc.data().users.user1 },
                user2: { ...doc.data().users.user2 },
              },
            } as Match
            MessageData.push(matchData)
          })
          setMessages(MessageData)
        }
      )
      return unsubscribe
    }
  }, [currentUser])

  useEffect(() => {
    console.log("user matches", messages)
  }, [messages])

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="m-2">
          <Text>Messages</Text>

          <View className="flex flex-row items-center m-2">
            <View>
              {messages.length > 0 &&
                messages.map((match) => (
                  <View
                    key={match.id}
                    className="flex flex-row items-center mb-3"
                  >
                    <Pressable
                      className="rounded-3xl mx-2 border-black border w-12 h-12"
                      onPress={() => {
                        navigation.navigate("MessagingScreen", {
                          id: match.users.user2.id,
                          matchDocId: match.id,
                        })
                        console.log("match idddd", match.id)
                      }}
                    >
                      <SinglePic
                        size={45}
                        id={match.users.user2.id}
                        picNumber={0}
                        avatarRadius={150}
                        noAvatarRadius={10}
                        collection="user"
                        photoType="userPhotos"
                      />
                    </Pressable>
                    <View className="border-b w-80 pb-2">
                      <Pressable
                        onPress={() =>
                          navigation.navigate("MessagingScreen", {
                            id: match.users.user2.id,
                            matchDocId: match.id,
                          })
                        }
                      >
                        <Text className="font-bold text-xl">
                          {messages.length > 0 && match.users.user2.firstName}
                        </Text>
                        <Text className="px-2">Send a Message</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default MessageTab
