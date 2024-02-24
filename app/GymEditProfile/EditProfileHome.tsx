import { View, Text, ScrollView } from "react-native"
import React from "react"
import ImageGrid from "../components/ImageGrid"
import { FIREBASE_AUTH } from "../../firebase"
import About from "../UserEditProfile/components/About"

const EditGymProfileHome = () => {
  return (
    <ScrollView>
      <View>
        <ImageGrid id={FIREBASE_AUTH.currentUser?.uid} size={125} />
      </View>

      <View>
        <About />
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
