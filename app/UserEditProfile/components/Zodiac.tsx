import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"
import { Feather } from "@expo/vector-icons"

const Zodiac = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  return (
    <View>
      <Pressable
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <View className="flex flex-row justify-between bg-slate-200 h-10 items-center">
          <View className="flex flex-row">
            <Text>Add Zodiac Sign</Text>
          </View>

          <Feather name="arrow-right" size={32} color="black" />
        </View>
      </Pressable>
    </View>
  )
}

export default Zodiac
