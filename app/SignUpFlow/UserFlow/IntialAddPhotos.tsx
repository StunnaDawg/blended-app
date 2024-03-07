import { View, Text, ScrollView } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import UploadImage from "../../components/UploadImage"
import { Button } from "react-native-elements"
import UpdatePhotosUser from "./components/UpdatePhotosUser"
import { FIREBASE_AUTH } from "../../../firebase"

const IntialAddPhotos = () => {
  const [imageArray, setImageArray] = useState<string[]>([])
  const [uri, setUri] = useState<string>("")
  const navigation = useNavigation<NavigationType>()
  const userId = FIREBASE_AUTH.currentUser?.uid
  return (
    <ScrollView>
      <View>
        <Text>Add Photos</Text>
      </View>

      <UploadImage setUris={setImageArray} uris={imageArray} />

      <UpdatePhotosUser id={userId} imageArray={imageArray} />
    </ScrollView>
  )
}

export default IntialAddPhotos
