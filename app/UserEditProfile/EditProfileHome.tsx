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

      <View>
        <PRsection />
      </View>

      <View>
        <RelationshipGoals />
      </View>

      <View>
        <Food />
      </View>

      <View>
        <Zodiac />
      </View>

      <View>
        <Career />
      </View>

      <View>
        <Education />
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
