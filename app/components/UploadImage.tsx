import { View, Image, Button, ScrollView } from "react-native"
import * as ImagePicker from "expo-image-picker"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

type UploadImageType = {
  setUris: Dispatch<SetStateAction<string[]>>
  uris: string[]
}

const UploadImage = ({ setUris, uris }: UploadImageType) => {
  const [image, setImage] = useState<string>("")
  const [uploading, setUploading] = useState<boolean>(false)

  const pushToImageArray = (imageUri: string) => {
    setUris((prev) => [...prev, imageUri])
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [9, 16],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 6,
    })

    if (!result.canceled) {
      pushToImageArray(result.assets[0].uri)
      console.log(result.assets[0].uri)
    }
  }

  return (
    <ScrollView>
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
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </ScrollView>
  )
}

export default UploadImage
