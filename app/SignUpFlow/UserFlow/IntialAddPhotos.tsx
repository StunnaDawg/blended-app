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
      <View className="flex flex-row justify-center m-10">
        <View>
          <Text className="font-bold text-xl text-center">
            Add a Profile Pic!
          </Text>
          <Text className="font-semibold text-sm">
            You can change these later...
          </Text>
        </View>
      </View>

      <UploadImage setUris={setImageArray} uris={imageArray} />

      <View className="flex flex-row justify-center m-4">
        <UpdatePhotosUser
          disable={imageArray.length < 1}
          id={userId}
          imageArray={imageArray}
        />
      </View>
    </ScrollView>
  )
}

export default IntialAddPhotos
