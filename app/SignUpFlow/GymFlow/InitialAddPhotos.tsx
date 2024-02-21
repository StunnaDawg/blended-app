import { View, Text, ScrollView, Button } from "react-native"
import React, { useState } from "react"
import UploadImage from "../../components/UploadImage"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const GymInitialAddPhotos = () => {
  const [imageArray, setImageArray] = useState<string[]>([])
  const [uri, setUri] = useState<string>("")
  const navigation = useNavigation<NavigationType>()
  return (
    <ScrollView>
      <View>
        <Text>Add Phot</Text>
      </View>
      <View>
        <UploadImage setUris={setImageArray} uris={imageArray} />
      </View>
      <Button
        title="Next"
        onPress={() => navigation.navigate("GymDashboard")}
      />
    </ScrollView>
  )
}

export default GymInitialAddPhotos
