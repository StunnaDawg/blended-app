import { View, Text, Pressable } from "react-native"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

const PRsection = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

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
        <Text className="font-bold text-xl">Personal Records</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            handlePresentModalPress()
          }}
        >
          <View className="flex flex-row justify-between bg-slate-200 h-10 items-center px-2">
            <View className="flex flex-row">
              <Text>Add PRs</Text>
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
          <View>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </View>
    </>
  )
}

export default PRsection
