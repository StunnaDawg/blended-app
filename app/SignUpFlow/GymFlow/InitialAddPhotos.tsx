import { View, Text, ScrollView, Button } from "react-native"
import React, { useState } from "react"
import UploadImage from "../../components/UploadImage"
import GymUploadPhotos from "./components/GymUploadPhotos"
import { FIREBASE_AUTH } from "../../../firebase"

const GymInitialAddPhotos = () => {
  const [imageArray, setImageArray] = useState<string[]>([])
  const currentId = FIREBASE_AUTH.currentUser?.uid
  return (
    <ScrollView>
      <View>
        <Text>Add Photo</Text>
      </View>
      <View>
        <UploadImage setUris={setImageArray} uris={imageArray} />
      </View>

      <GymUploadPhotos id={currentId} imageArray={imageArray} />
    </ScrollView>
  )
}

export default GymInitialAddPhotos
