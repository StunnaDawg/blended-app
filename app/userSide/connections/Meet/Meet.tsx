import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native"
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
import NoUsers from "./components/NoUsers"

const Meet = () => {
  const currentUserId = FIREBASE_AUTH.currentUser?.uid
  const [loading, setLoading] = useState<boolean>(false)
  const [profiles, setProfiles] = useState<string[]>([])
  const [index, setIndex] = useState<number>(0)

  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = useCallback(() => {
    setLoading(true)
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setLoading(false)
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
        setLoading(true)
        if (currentUserId) {
          const passes = await getDocs(
            collection(db, "user", currentUserId, "passes")
          ).then((snapshot) => snapshot.docs.map((doc) => doc.id))
          const messaged = await getDocs(
            collection(db, "user", currentUserId, "messaged")
          ).then((snapshot) => snapshot.docs.map((doc) => doc.id))

          const passedUserIds = passes.length > 0 ? passes : ["test"]
          const messagedUserIds = messaged.length > 0 ? messaged : ["test"]

          console.log("seen users", [...passedUserIds, ...messagedUserIds])
          //   // query(
          unsub = onSnapshot(
            query(
              collection(db, "user"),
              where("__name__", "not-in", [
                ...passedUserIds,
                ...messagedUserIds,
              ])
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
        setLoading(false)
      } catch (err) {
        setLoading(false)
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
        setLoading(true)
        if (currentUserId) {
          const passes = await getDocs(
            collection(db, "user", currentUserId, "passes")
          ).then((snapshot) => snapshot.docs.map((doc) => doc.id))
          const messaged = await getDocs(
            collection(db, "user", currentUserId, "messaged")
          ).then((snapshot) => snapshot.docs.map((doc) => doc.id))

          const passedUserIds = passes.length > 0 ? passes : ["test"]
          const messagedUserIds = messaged.length > 0 ? messaged : ["test"]

          console.log("seen users", [...passedUserIds, ...messagedUserIds])
          //   // query(
          unsub = onSnapshot(
            query(
              collection(db, "user"),
              where("__name__", "not-in", [
                ...passedUserIds,
                ...messagedUserIds,
              ])
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
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error(err)
      }
    }
    fetchCards()
    console.log("fetch", profiles)
    return unsub
  }, [index])

  useEffect(() => {
    let unsub
    const fetchCards = async () => {
      try {
        setLoading(true)
        if (currentUserId) {
          const passes = await getDocs(
            collection(db, "user", currentUserId, "passes")
          ).then((snapshot) => snapshot.docs.map((doc) => doc.id))
          const messaged = await getDocs(
            collection(db, "user", currentUserId, "messaged")
          ).then((snapshot) => snapshot.docs.map((doc) => doc.id))

          const passedUserIds = passes.length > 0 ? passes : ["test"]
          const messagedUserIds = messaged.length > 0 ? messaged : ["test"]

          console.log("seen users", [...passedUserIds, ...messagedUserIds])
          //   // query(
          unsub = onSnapshot(
            query(
              collection(db, "user"),
              where("__name__", "not-in", [
                ...passedUserIds,
                ...messagedUserIds,
              ])
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
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error(err)
      }
    }
    fetchCards()
    console.log("fetch", profiles)
    return unsub
  }, [refreshing])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Customize the ActivityIndicator as needed
      ) : profiles.length > 0 ? (
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
