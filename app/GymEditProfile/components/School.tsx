import { View, Text, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

const School = () => {
  const [addSchool, setAddSchool] = useState<string>()
  const currentUser = FIREBASE_AUTH.currentUser?.uid

  const updateSchool = async () => {
    if (currentUser) {
      const userRef = doc(db, "user", currentUser)
      await updateDoc(userRef, {
        school: addSchool,
      })
    }
  }

  const getSchool = async () => {
    if (currentUser) {
      const userRef = doc(db, "user", currentUser)
      const data = await getDoc(userRef)
      if (data.exists()) {
        const schoolData = { ...data.data() }

        if (schoolData.school) {
          setAddSchool(schoolData.school)
        }
      }
    }
  }

  useEffect(() => {
    getSchool()
  }, [])
  useEffect(() => {
    updateSchool()
  }, [addSchool])
  return (
    <>
      <View className="mx-2">
        <Text className="font-bold text-xl">School</Text>
      </View>
      <View className="flex flex-row justify-between bg-slate-200 h-10 items-center px-2">
        <View className="flex flex-row">
          <TextInput
            placeholder="Add School"
            onChangeText={(text) => setAddSchool(text)}
            value={addSchool}
          />
        </View>
      </View>
    </>
  )
}

export default School
