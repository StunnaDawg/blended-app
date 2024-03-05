import { View, Text, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

const About = () => {
  const [aboutMe, setAboutMe] = useState<string>()
  const currentUser = FIREBASE_AUTH.currentUser?.uid

  const updateAboutMe = async () => {
    if (currentUser) {
      const userRef = doc(db, "user", currentUser)
      await updateDoc(userRef, {
        aboutMe: aboutMe,
      })
    }
  }

  const getAboutMe = async () => {
    if (currentUser) {
      const userRef = doc(db, "user", currentUser)
      const data = await getDoc(userRef)
      if (data.exists()) {
        const aboutData = { ...data.data() }

        if (aboutData.aboutMe) {
          console.log(aboutMe)
          setAboutMe(aboutData.aboutMe)
        }
      }
    }
  }

  return (
    <>
      <View className="mx-2">
        <Text className="text-xl font-bold">About Me</Text>
      </View>
      <TextInput
        value={aboutMe}
        className="border-2 border-black m-2 h-40"
        placeholder="About me!"
        multiline={true}
      />
    </>
  )
}

export default About
