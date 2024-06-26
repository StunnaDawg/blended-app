import { View, Button, ScrollView, Pressable, Text } from "react-native"
import { Image } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"

type UploadImageType = {
  setUri: Dispatch<SetStateAction<string>>
  uri: string
}

const UploadEventImage = ({ setUri, uri }: UploadImageType) => {
  const [image, setImage] = useState<string>("")
  const [uploading, setUploading] = useState<boolean>(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [9, 16],
      quality: 1,
      allowsEditing: true,
    })

    if (!result.canceled) {
      setUri(result.assets[0].uri)
    }
  }

  return (
    <ScrollView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <View className="items-center mb-4">
          <Image source={{ uri: uri }} style={{ width: 200, height: 200 }} />
        </View>
        <Pressable onPress={pickImage} className="flex flex-row items-center">
          <Text className="text-lg font-bold underline">Pick an Image</Text>
          <FontAwesome6 name="add" size={20} color="black" />
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default UploadEventImage
