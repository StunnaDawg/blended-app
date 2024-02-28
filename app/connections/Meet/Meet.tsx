import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import MeetCard from "./components/MeetCard"
import { FIREBASE_AUTH, db } from "../../../firebase"
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"
import UserAuth from "../../SignUpFlow/UserAuth"

const Meet = () => {
  const currentUserId = FIREBASE_AUTH.currentUser?.uid
  const [profiles, setProfiles] = useState<string[]>([])

  useEffect(() => {
    console.log(profiles)
  }, [profiles])

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

          // console.log([...passedUserIds, ...swipedUserIds])
          //   where("id", "not-in", [...passedUserIds, ...swipedUserIds])// query(
          unsub = onSnapshot(collection(db, "user"), (snapshot) => {
            setProfiles(
              snapshot.docs
                .filter((doc) => doc.id !== currentUserId)
                .map((doc) => doc.id)
            )
          })
          console.log("unsub", unsub)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchCards()
    return unsub
  }, [])
  return (
    <View>
      <Text>Meet</Text>
      {profiles.length > 0 && <MeetCard id={profiles[2]} />}
    </View>
  )
}

export default Meet
