import { View, Text, ScrollView } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import UploadImage from "../../components/UploadImage"
import { Button } from "react-native-elements"

const IntialAddPhotos = () => {
  const [imageArray, setImageArray] = useState<string[]>([])
  const [uri, setUri] = useState<string>("")
  const navigation = useNavigation<NavigationType>()
  return (
    <ScrollView>
      <View>
        <Text>Add Phot</Text>
      </View>

      <UploadImage setUris={setImageArray} uris={imageArray} />

      <Button
        title="Next"
        onPress={() => navigation.navigate("UserDashboard")}
      />
    </ScrollView>
  )
}

export default IntialAddPhotos
