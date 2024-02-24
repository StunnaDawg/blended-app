import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"
import { Feather } from "@expo/vector-icons"

const RelationshipGoals = () => {
  const [modalVisible, setModalVisible] = useState<boolean>()
  return (
    <Pressable
      onPress={() => {
        setModalVisible(true)
      }}
    >
      <View className="flex flex-row justify-between bg-slate-200 h-10 items-center">
        <View className="flex flex-row">
          <Text>Add Relationship goal</Text>
        </View>

        <Feather name="arrow-right" size={32} color="black" />
      </View>
    </Pressable>
  )
}

export default RelationshipGoals
