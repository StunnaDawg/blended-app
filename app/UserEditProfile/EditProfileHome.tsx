import { View, Text, ScrollView } from "react-native"
import React, { useState } from "react"
import { FIREBASE_AUTH, db } from "../../firebase"
import ImageGrid from "../components/ImageGrid"
import About from "./components/About"
import Activities from "./components/Activities"
import Food from "./components/Food"
import Zodiac from "./components/Zodiac"
import Career from "./components/Career"
import Education from "./components/Education"
import PRsection from "./components/PRsection"
import RelationshipGoals from "./components/RelationshipGoals"
import School from "./components/School"
import SingleImage from "../components/SingleImage"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"

const EditProfileHome = () => {
  const [image, setImage] = useState<string>("")
  const id = FIREBASE_AUTH.currentUser?.uid
  const submitNewUserPhotos = async (downloadImage: string) => {
    try {
      if (id) {
        const userRef = doc(db, "user", id)

        await updateDoc(userRef, {
          userPhotos: arrayUnion(downloadImage),
        })

        setImage(downloadImage)
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <ScrollView className="mb-20">
      <View>
        <SingleImage index={0} />
        <SingleImage index={1} />
        <SingleImage index={2} />
        <SingleImage index={3} />
        <SingleImage index={4} />
        <SingleImage index={5} />
        <SingleImage index={6} />
      </View>

      <View>
        <About />
      </View>

      <View className="mt-4">
        <Activities />
      </View>

      <View className="mt-4">
        <PRsection />
      </View>

      <View className="mt-4">
        <RelationshipGoals />
      </View>

      <View className="mt-4">
        <Food />
      </View>

      <View className="mt-4">
        <Zodiac />
      </View>

      <View className="mt-4">
        <Education />
      </View>

      <View className="mt-4">
        <Career />
      </View>

      <View className="my-4">
        <School />
      </View>

      {/* <View>
        <Activities />
      </View>

      <View>
        <Activities />
      </View>

      <View>
        <Activities />
      </View>

      <View>
        <Activities />
      </View> */}
    </ScrollView>
  )
}

export default EditProfileHome
