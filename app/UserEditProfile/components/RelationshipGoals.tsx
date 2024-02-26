import { View, Text, Pressable } from "react-native"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import singleValueEdit from "../../functions/singleValueEdit"

const RelationshipGoals = () => {
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
        <Text className="font-bold text-xl">Relationship Goals</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            handlePresentModalPress()
          }}
        >
          <View className="flex flex-row justify-between bg-slate-200 h-10 items-center px-2">
            <View className="flex flex-row">
              <Text>Looking for...</Text>
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
            <Text className="text-xl font-bold">I am looking for...</Text>
          </View>
          <View className="flex flex-row justify-center flex-wrap items-center my-2">
            <Pressable
              className=" flex justify-center border h-24 mx-2 rounded w-24"
              onPress={async () => {
                {
                  await singleValueEdit(
                    "user",
                    "intentions",
                    "Long-term Partner"
                  )
                  dismiss()
                }
              }}
            >
              <Text className="text-center">Long-term Partner</Text>
            </Pressable>
            <Pressable
              className=" flex justify-center border h-24 mx-2 rounded w-24"
              onPress={async () => {
                {
                  singleValueEdit("user", "intentions", "Short-term Partner")
                  dismiss()
                }
              }}
            >
              <Text className="text-center">Short-term Partner</Text>
            </Pressable>
            <Pressable
              className="flex justify-center border h-24 mx-2 rounded w-24"
              onPress={() => {
                singleValueEdit("user", "intentions", "Workout Partner")
              }}
            >
              <Text className="text-center">Workout Partner</Text>
            </Pressable>
            <Pressable
              className="flex justify-center border h-24 mx-2 my-2 rounded w-24"
              onPress={async () => {
                {
                  await singleValueEdit("user", "intentions", "New Friends")
                  dismiss()
                }
              }}
            >
              <Text className="text-center">New Friends</Text>
            </Pressable>
            <Pressable
              className="flex justify-center border px-1 h-24 mx-2 my-2 h-30 rounded w-24"
              onPress={async () => {
                {
                  await singleValueEdit(
                    "user",
                    "intentions",
                    "Still Figuring it Out"
                  )
                  dismiss()
                }
              }}
            >
              <Text className="text-center">Still Figuring it Out</Text>
            </Pressable>
            <Pressable
              className="flex justify-center border h-24 mx-2 my-2 rounded w-24"
              onPress={async () => {
                {
                  await singleValueEdit("user", "intentions", "One day Workout")
                  dismiss()
                }
              }}
            >
              <Text className="text-center">One day Workout</Text>
            </Pressable>
          </View>
        </BottomSheetModal>
      </View>
    </>
  )
}

export default RelationshipGoals
{
  /*  <Pressable className="flex justify-center border h-24 mx-2 rounded text-ellipsis">
              <Text>Short-term Partner</Text>
            </Pressable>
          </View>
          <View className="flex flex-row justify-center flex-wrap items-center">
            <Pressable className="flex justify-center border h-24 mx-2 rounded text-ellipsis">
              <Text>Workout Partner</Text>
            </Pressable>
            <Pressable className="flex justify-center border h-24 mx-2 rounded text-ellipsis">
              <Text>Dunno</Text>
            </Pressable> */
}
