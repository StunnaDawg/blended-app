import { View, Text, Pressable, Image } from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Match, UserProfile } from "../@types/firestore"
import { ScrollView } from "react-native-gesture-handler"
import { collection, doc, onSnapshot, query, where } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"
import SinglePic from "../components/Avatar"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import ViewUserProfile from "../components/ViewUserProfile"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"

const MessageTab = () => {
  const [userMatches, setUserMatches] = useState<Match[]>([])
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", currentUser)
        ),
        (snapshot) => {
          const matchesData: Match[] = []
          snapshot.forEach((doc) => {
            const matchData = {
              id: doc.id,
              ...doc.data(),
              users: {
                user1: { ...doc.data().users.user1 },
                user2: { ...doc.data().users.user2 },
              },
            } as Match
            matchesData.push(matchData)
          })
          setUserMatches(matchesData)
        }
      )
      return unsubscribe
    }
  }, [currentUser])

  return (
    <>
      <ScrollView>
        <View>
          <Text className="font-bold text-2xl text-center">
            Made Connections
          </Text>
        </View>
        <View className="mx-2">
          <Text className="font-bold">New Connections</Text>
        </View>
        <View className=" flex flex-row border-b p-1">
          <ViewUserProfile
            id={userMatches[0]?.users.user2.id}
            size={120}
            radius={10}
          />
        </View>

        <View className="m-2">
          <Text>Messages</Text>

          <View className="flex flex-row items-center m-2">
            {userMatches.map((match, index) => (
              <View key={index} className="flex flex-row items-center">
                <Pressable
                  className="rounded-3xl mx-2 border-black border w-12 h-12"
                  onPress={() =>
                    navigation.navigate("MessagingScreen", {
                      id: match.users.user2.id,
                    })
                  }
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
                      })
                    }
                  >
                    <Text className="font-bold text-xl">
                      {userMatches.length > 0 && match.users.user2.firstName}
                    </Text>
                    <Text className="px-2">Hello hello hello hell</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default MessageTab
