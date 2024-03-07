import { View, Text, ScrollView } from "react-native"
import React from "react"
import ImageGrid from "../components/ImageGrid"
import { FIREBASE_AUTH } from "../../firebase"
import About from "../UserEditProfile/components/About"
import FitnessStyle from "./components/FitnessStyle"
import SingleImage from "../components/SingleImage"

const EditGymProfileHome = () => {
  return (
    <ScrollView>
      <View className="flex flex-row justify-center flex-wrap">
        <SingleImage index={0} />
        <SingleImage index={1} />
        <SingleImage index={2} />
        <SingleImage index={3} />
        <SingleImage index={4} />
        <SingleImage index={5} />
      </View>

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
