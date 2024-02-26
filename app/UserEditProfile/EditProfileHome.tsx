import { View, Text, ScrollView } from "react-native"
import React from "react"
import { FIREBASE_AUTH } from "../../firebase"
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

const EditProfileHome = () => {
  return (
    <ScrollView className="mb-20">
      <View>
        <ImageGrid
          id={FIREBASE_AUTH.currentUser?.uid}
          size={125}
          collectionRef="user"
        />
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
