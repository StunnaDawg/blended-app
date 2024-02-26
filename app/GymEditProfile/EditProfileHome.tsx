import { View, Text, ScrollView } from "react-native"
import React from "react"
import ImageGrid from "../components/ImageGrid"
import { FIREBASE_AUTH } from "../../firebase"
import About from "../UserEditProfile/components/About"
import FitnessStyle from "./components/FitnessStyle"

const EditGymProfileHome = () => {
  return (
    <ScrollView>
      <ImageGrid
        id={FIREBASE_AUTH.currentUser?.uid}
        size={125}
        collectionRef="gyms"
      />

      <View>
        <About />
      </View>

      <View>
        <FitnessStyle />
      </View>

      {/* <View>
        <Activities />
      </View> */}

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

export default EditGymProfileHome
