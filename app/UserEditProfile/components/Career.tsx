import { View, Text, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

const Career = () => {
  const [addJobTitle, setAddJobTitle] = useState<string>()
  const currentUser = FIREBASE_AUTH.currentUser?.uid

  const updateJobTitle = async () => {
    if (currentUser) {
      const userRef = doc(db, "user", currentUser)
      await updateDoc(userRef, {
        jobTitle: addJobTitle,
      })
    }
  }

  const getJobTitle = async () => {
    if (currentUser) {
      const userRef = doc(db, "user", currentUser)
      const data = await getDoc(userRef)
      if (data.exists()) {
        const jobData = { ...data.data() }

        if (jobData.jobTitle) {
          setAddJobTitle(jobData.jobTitle)
        }
      }
    }
  }

  useEffect(() => {
    getJobTitle()
  }, [])
  useEffect(() => {
    updateJobTitle()
  }, [addJobTitle])

  return (
    <View className="flex flex-row justify-between bg-slate-200 h-10 items-center">
      <View className="flex flex-row">
        <TextInput
          placeholder="Add Job Title"
          onChangeText={(text) => setAddJobTitle(text)}
          value={addJobTitle}
        />
      </View>
    </View>
  )
}

export default Career
