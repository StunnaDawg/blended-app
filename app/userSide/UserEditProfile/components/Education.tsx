import { View, Text, Pressable } from "react-native"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import singleValueEdit from "../../../functions/singleValueEdit"

type EducationProp = {
  education: string | undefined | null
}

const Education = ({ education }: EducationProp) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["25%", "50%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const educationStatuses = [
    "High School",
    "Bachelors",
    "Masters",
    "Trade School",
    "Grad School",
    "PhD",
    "Other",
  ]
  return (
    <>
      <View className="mx-2">
        <Text className="font-bold text-xl">Eduction</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            handlePresentModalPress()
          }}
        >
          <View className="flex flex-row justify-between bg-slate-200 h-10 items-center px-2">
            <View className="flex flex-row">
              <Text>{education ? education : "Add Education"}</Text>
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
              What is your level of Education?
            </Text>
          </View>
          <View className="flex flex-row flex-wrap">
            {educationStatuses.map((status) => (
              <Pressable
                key={status}
                className="border-2 rounded-full bg-slate-300 p-2 m-1"
                onPress={async () => {
                  await singleValueEdit("user", "education", status)
                  dismiss()
                }}
              >
                <Text className="text-center">{status}</Text>
              </Pressable>
            ))}
          </View>
        </BottomSheetModal>
      </View>
    </>
  )
}

export default Education
