import { View, Text, ScrollView } from "react-native"
import React from "react"
import { FIREBASE_AUTH } from "../../firebase"
import ImageGrid from "../components/ImageGrid"
import About from "./components/About"
import Activities from "./components/Activities"

const EditProfileHome = () => {
  return (
    <ScrollView>
      <View>
        <ImageGrid id={FIREBASE_AUTH.currentUser?.uid} size={125} />
      </View>

      <View>
        <About />
      </View>

      <View>
        <Activities />
      </View>
    </ScrollView>
  )
}

export default EditProfileHome
