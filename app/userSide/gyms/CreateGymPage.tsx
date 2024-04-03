import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useState } from "react"
import BackButton from "../../components/BackButton"
import { FIREBASE_AUTH } from "../../../firebase"
import { TextInput } from "react-native-gesture-handler"
import UploadImage from "../../components/UploadImage"
import { Feather } from "@expo/vector-icons"
import createGym from "../../functions/createGym"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const CreateGymPage = () => {
  const [imageArray, setImageArray] = useState<string[]>([])
  const [gymTitle, setGymTitle] = useState<string>("")
  const [gymStyle, setGymStyle] = useState<string>("")
  const [province, setProvince] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const currentId = FIREBASE_AUTH.currentUser?.uid
  const navigation = useNavigation<NavigationType>()
  return (
    <>
      <ScrollView>
        <View className="flex flex-row items-center">
          <BackButton />
          <Text className="text-lg font-semibold">Cancel</Text>
        </View>
        <View className="flex flex-row justify-center">
          <Text className="text-2xl font-bold">Create New Community</Text>
        </View>
        <View className="flex flex-col items-center">
          <View className="items-center">
            <Text className="text-2xl font-bold">Gym Title</Text>
            <TextInput
              className="h-9 border-2 w-36 rounded p-1"
              value={gymTitle}
              onChangeText={setGymTitle}
              placeholder="Gym title"
            />
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold">Fitness Style</Text>
            <TextInput
              className="h-9 border-2 w-36 rounded p-1"
              value={gymStyle}
              onChangeText={setGymStyle}
              placeholder="fitness style"
            />
          </View>

          <View className="items-center">
            <Text className="text-2xl font-bold">Province</Text>
            <TextInput
              className="h-9 border-2 w-36 rounded p-1"
              value={province}
              onChangeText={setProvince}
              placeholder="Location"
            />
          </View>

          <View className="items-center">
            <Text className="text-2xl font-bold">City</Text>
            <TextInput
              className="h-9 border-2 w-36 rounded p-1"
              value={city}
              onChangeText={setCity}
              placeholder="City"
            />
          </View>
        </View>
        <View className="mt-5">
          <UploadImage setUris={setImageArray} uris={imageArray} />
        </View>

        <View className="flex flex-row justify-center mt-5 mb-20">
          <Pressable
            onPress={async () => {
              if (currentId) {
                await createGym(
                  currentId,
                  gymTitle,
                  gymStyle,
                  "country",
                  province,
                  city,
                  imageArray
                )
                navigation.goBack()
              }
            }}
          >
            <View className="flex flex-row items-center">
              <Text className="font-bold text-xl">Create Gym</Text>
              <Feather name="plus" size={32} color="black" />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </>
  )
}

export default CreateGymPage
