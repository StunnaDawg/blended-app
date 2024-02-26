import {
  View,
  Text,
  Pressable,
  Modal,
  Dimensions,
  StyleSheet,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import React, { useCallback, useMemo, useRef, useState } from "react"
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet"
import singleValueEdit from "../../functions/singleValueEdit"

const Food = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["25%", "50%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const dietaryPreferences = [
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Halal",
    "Keto",
    "Paleo",
    "Omnivore",
    "Other",
  ]
  return (
    <>
      <View className="mx-2">
        <Text className="font-bold text-xl">Dietary Preferances</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            handlePresentModalPress()
          }}
        >
          <View className="flex flex-row justify-between bg-slate-200 h-10 items-center px-2">
            <View className="flex flex-row">
              <Text>Add Dietary Preferences</Text>
            </View>

            <Feather name="arrow-right" size={32} color="black" />
          </View>
        </Pressable>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View className="flex flex-row justify-center my-2 pt-2 border-t">
            <Text className="text-xl font-bold">
              What is your Dietary Preferences?
            </Text>
          </View>
          <View className="flex flex-row flex-wrap">
            {dietaryPreferences.map((diet) => (
              <Pressable
                key={diet}
                className="border-2 rounded-full bg-slate-300 p-2 m-1"
                onPress={async () => {
                  await singleValueEdit("user", "diet", diet)
                  dismiss()
                }}
              >
                <Text className="text-center">{diet}</Text>
              </Pressable>
            ))}
          </View>
        </BottomSheetModal>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
})

export default Food
