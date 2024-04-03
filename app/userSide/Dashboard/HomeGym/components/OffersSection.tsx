import { View, Text } from "react-native"
import React from "react"

const OffersSection = () => {
  return (
    <View>
      <View className="flex flex-row justify-center">
        <Text className="font-bold text-xl">Offers Section</Text>
      </View>
      <View className="flex flex-row justify-center mt-20">
        <Text className="font-bold text-sm">Coming soon!</Text>
      </View>
    </View>
  )
}

export default OffersSection
