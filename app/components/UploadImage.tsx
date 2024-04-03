import { View, Button, ScrollView, Pressable, Text } from "react-native"
import { Image } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

type UploadImageType = {
  setUris: Dispatch<SetStateAction<string[]>>
  uris: string[]
}

const UploadImage = ({ setUris, uris }: UploadImageType) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [9, 16],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 6,
      allowsEditing: true,
    })

    if (!result.canceled) {
      const imageUris = result.assets.map((asset) => asset.uri)
      setUris((prevUris) => [...prevUris, ...imageUris])
    }
  }

  return (
    <ScrollView>
      <View className="flex flex-row">
        {uris.length > 0 &&
          uris?.map((value, index) => {
            return (
              <View key={index}>
                <Image
                  source={{ uri: value }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            )
          })}
      </View>
      <View className="flex flex-row justify-center">
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#D1D5DB" : "#F3F4F6",
              padding: 4,
              borderWidth: 1,
              borderColor: "#D1D5DB",
            },
          ]}
          onPress={pickImage}
        >
          <Text className="font-bold text-lg">Upload 1-6 images</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default UploadImage
