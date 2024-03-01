import { View, Text, Pressable, Image } from "react-native"
import React, { useEffect, useState } from "react"
import { Match, UserProfile } from "../@types/firestore"
import { ScrollView } from "react-native-gesture-handler"
import { collection, doc, onSnapshot, query, where } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"

const MessageTab = () => {
  const [userMatches, setUserMatches] = useState<Match[]>([])
  const currentUser = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", currentUser)
        ),
        (snapshot) => {
          setUserMatches(
            snapshot.docs.map(
              (doc) =>
                ({
                  id: doc.id,
                  ...doc.data(),
                  users: {
                    // Spread out the data of the user with key user1's ID
                    user1: {
                      ...doc.data().users[Object.keys(doc.data().users)[0]],
                    },
                    // Spread out the data of user2
                    user2: {
                      ...doc.data().users[Object.keys(doc.data().users)[1]],
                    },
                  },
                } as Match)
            )
          )
        }
      )
      return unsubscribe
    }
  }, [currentUser])

  useEffect(() => {
    console.log(userMatches, userMatches[0]?.users)
  }, [userMatches])

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
          <Pressable className="rounded mx-1 border-black border w-24 h-32">
            <Image />
          </Pressable>
        </View>

        <View className="m-2">
          <Text>Messages</Text>
          <View className="flex flex-row items-center m-2">
            <Pressable className="rounded-3xl mx-2 border-black border w-12 h-12">
              <Image />
            </Pressable>
            <View className="border-b w-80 pb-2">
              <Pressable>
                <Text className="font-bold text-xl">Malena</Text>
                <Text className="px-2">Hello hello hello hello</Text>
              </Pressable>
            </View>
          </View>
          <View className="flex flex-row items-center m-2">
            <Pressable className="rounded-3xl mx-2 border-black border w-12 h-12">
              <Image />
            </Pressable>
            <View className="border-b w-80 pb-2">
              <Pressable>
                <Text className="font-bold text-xl">
                  {userMatches.length > 0 &&
                    userMatches[0]?.users.user2.firstName}
                </Text>
                <Text className="px-2">Hello hello hello hello</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default MessageTab
