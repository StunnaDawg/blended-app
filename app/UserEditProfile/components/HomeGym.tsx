import { View, Text, Pressable } from "react-native"
import React, { useCallback, useMemo, useRef } from "react"
import { Feather } from "@expo/vector-icons"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"

const HomeGym = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["25%", "50%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  return (
    <>
      <View className="mx-2">
        <Text className="font-bold text-xl">Home Gym</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            handlePresentModalPress()
          }}
        >
          <View className="flex flex-row justify-between bg-slate-200 h-10 items-center px-2">
            <View className="flex flex-row">
              <Text>Choose </Text>
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
          <View className="flex flex-row justify-center mt-3">
            <Text className="text-xl font-bold">Find Home Gym</Text>
          </View>
        </BottomSheetModal>
      </View>
    </>
  )
}

export default HomeGym
