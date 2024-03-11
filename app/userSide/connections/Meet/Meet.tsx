import { View, Text, ScrollView, RefreshControl } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import MeetCard from "./components/MeetCard"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"
import UserAuth from "../../../SignUpFlow/UserAuth"
import NoUsers from "./components/NoUsers"

const Meet = () => {
  const currentUserId = FIREBASE_AUTH.currentUser?.uid
  const [profiles, setProfiles] = useState<string[]>([])
  const [index, setIndex] = useState<number>(0)

  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    console.log(profiles)
  }, [profiles, index])

  const removeFirstProfile = () => {
    setProfiles(profiles.slice(1)) // Removes the first item from the profiles array
  }

  useEffect(() => {
    let unsub
    const fetchCards = async () => {
      try {
        if (currentUserId) {
          const passes = await getDocs(
            collection(db, "user", currentUserId, "passes")
          ).then((snapshot) => snapshot.docs.map((doc) => doc.id))
          const swipes = await getDocs(
            collection(db, "user", currentUserId, "swipes")
          ).then((snapshot) => snapshot.docs.map((doc) => doc.id))

          const passedUserIds = passes.length > 0 ? passes : ["test"]
          const swipedUserIds = passes.length > 0 ? swipes : ["test"]

          console.log("seen users", [...passedUserIds, ...swipedUserIds])
          //   // query(
          unsub = onSnapshot(
            query(
              collection(db, "user"),
              where("__name__", "not-in", [...passedUserIds, ...swipedUserIds])
            ),
            (snapshot) => {
              setProfiles(
                snapshot.docs
                  .filter((doc) => doc.id !== currentUserId)
                  .map((doc) => doc.id)
              )
            }
          )
          console.log("unsub", unsub)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchCards()
    return unsub
  }, [])

  useEffect(() => {
    let unsub
    const fetchCards = async () => {
      try {
        if (currentUserId) {
          const passes = await getDocs(
            collection(db, "user", currentUserId, "passes")
          ).then((snapshot) => snapshot.docs.map((doc) => doc.id))
          const swipes = await getDocs(
            collection(db, "user", currentUserId, "swipes")
          ).then((snapshot) => snapshot.docs.map((doc) => doc.id))

          const passedUserIds = passes.length > 0 ? passes : ["test"]
          const swipedUserIds = passes.length > 0 ? swipes : ["test"]

          console.log("seen users", [...passedUserIds, ...swipedUserIds])
          //   // query(
          unsub = onSnapshot(
            query(
              collection(db, "user"),
              where("__name__", "not-in", [...passedUserIds, ...swipedUserIds])
            ),
            (snapshot) => {
              setProfiles(
                snapshot.docs
                  .filter((doc) => doc.id !== currentUserId)
                  .map((doc) => doc.id)
              )
            }
          )
          console.log("unsub", unsub)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchCards()
    console.log("fetch", profiles)
    return unsub
  }, [index])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {profiles.length > 0 ? (
        <MeetCard
          id={profiles[index]}
          nextProfile={setIndex}
          index={index}
          removeFunction={removeFirstProfile}
        />
      ) : (
        <NoUsers />
      )}
    </ScrollView>
  )
}

export default Meet
