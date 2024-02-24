import { View, Text, Pressable, Modal, Dimensions } from "react-native"
import { Feather } from "@expo/vector-icons"
import React, { useState } from "react"
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet"

const Food = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  return (
    <>
      {/* <View className="flex flex-1 justify-center items-center mt-22">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View>
            <Text>Food</Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </Modal>
      </View> */}
      <Pressable
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <View className="flex flex-row justify-between bg-slate-200 h-10 items-center">
          <View className="flex flex-row">
            <Text>Add Food</Text>
          </View>

          <Feather name="arrow-right" size={32} color="black" />
        </View>
      </Pressable>
    </>
  )
}

export default Food
