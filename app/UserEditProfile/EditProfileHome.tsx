import { View, Text, ScrollView } from "react-native"
import React from "react"
import { FIREBASE_AUTH } from "../../firebase"
import ImageGrid from "../components/ImageGrid"

const EditProfileHome = () => {
  return (
    <ScrollView>
      <View>
        <ImageGrid id={FIREBASE_AUTH.currentUser?.uid} size={150} />
      </View>
    </ScrollView>
  )
}

export default EditProfileHome
