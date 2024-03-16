import { View, Text, Pressable } from "react-native"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import singleValueEdit from "../../../functions/singleValueEdit"

type RelationshipGoalsProps = {
  lookingFor: string | null | undefined
}

const RelationshipGoals = ({ lookingFor }: RelationshipGoalsProps) => {
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
        <Text className="font-bold text-xl">Social Tag</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            handlePresentModalPress()
          }}
        >
          <View className="flex flex-row justify-between bg-slate-200 h-10 items-center px-2">
            <View className="flex flex-row">
              <Text>{lookingFor ? lookingFor : "Looking for..."}</Text>
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
          <View className="flex-1">
            <View className="flex flex-row justify-center mt-3">
              <Text className="text-xl font-bold">Looking For...</Text>
            </View>
            <View className="flex flex-row justify-center flex-wrap items-center my-2">
              <Pressable
                className=" flex justify-center border h-24 mx-2 rounded w-24"
                onPress={async () => {
                  {
                    await singleValueEdit("user", "intentions", "Social")
                    dismiss()
                  }
                }}
              >
                <Text className="text-center">Social</Text>
              </Pressable>
              <Pressable
                className=" flex justify-center border h-24 mx-2 rounded w-24"
                onPress={async () => {
                  {
                    singleValueEdit("user", "intentions", "Dating")
                    dismiss()
                  }
                }}
              >
                <Text className="text-center">Dating</Text>
              </Pressable>
              <Pressable
                className="flex justify-center border h-24 mx-2 rounded w-24"
                onPress={() => {
                  singleValueEdit("user", "intentions", "Business")
                }}
              >
                <Text className="text-center">Career</Text>
              </Pressable>
            </View>
          </View>
        </BottomSheetModal>
      </View>
    </>
  )
}

export default RelationshipGoals
