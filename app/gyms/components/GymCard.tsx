import { View, Text, Pressable } from "react-native"
import React from "react"
import SinglePic from "../../components/Avatar"
import { GymProfile } from "../../@types/firestore"

type GymCardProp = {
  gymProfile: GymProfile
}

const GymCard = ({ gymProfile }: GymCardProp) => {
  return (
    <View className=" flex flex-row border-t-2 border-b">
      <View className="border-r-2">
        <SinglePic />
      </View>

      <View className=" flex flex-col justify-between">
        <View className="p-1">
          <Text className="font-bold text-xl">Blended Athletics</Text>
          <Text className="text-xs">10km away</Text>
        </View>

        <View className="flex flex-row">
          <Pressable className="border rounded-full bg-slate-300 p-1 m-1">
            <Text className=" text-xs text-center">Crossfit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default GymCard
