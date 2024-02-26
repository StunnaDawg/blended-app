import { View, Text, Pressable } from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import singleValueEdit from "../../functions/singleValueEdit"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { doc, getDoc } from "firebase/firestore"

const FitnessStyle = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const [fitnessStyles, setFitnessStyles] = useState<string[]>([])
  const [setStyles, setSetStyles] = useState<string[]>([])
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["25%", "40%"], [])

  const addToFitnessArray = (newItem: string) => {
    setFitnessStyles([newItem, ...fitnessStyles])
  }

  const removeFromFitnessArray = (itemToRemove: string) => {
    setFitnessStyles(fitnessStyles.filter((item) => item !== itemToRemove))
  }

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const gymStyles = [
    "Traditional Gym",
    "CrossFit",
    "Functional Training",
    "Bodybuilding",
    "Powerlifting",
    "Cardio-focused Gym",
    "Boxing/MMA Gym",
    "Yoga/Pilates Studio",
    "Circuit Training",
    "Outdoor Fitness",
    "Group Fitness Classes",
    "HIIT (High-Intensity Interval Training)",
    "Bootcamp",
    "Calisthenics",
    "Barre",
    "Dance Fitness Studio",
    "Aquatic Fitness Center",
    "Mind-Body Fitness Studio",
  ]

  const currentId = FIREBASE_AUTH.currentUser?.uid
  const getGymStyle = async () => {
    if (currentId) {
      const userRef = doc(db, "gyms", currentId)

      const docSnap = await getDoc(userRef)

      if (docSnap.exists()) {
        const gymData = { ...docSnap.data() }

        setSetStyles(gymData.gym_style)
      }
    }
  }
  useEffect(() => {
    getGymStyle()
  }, [])
  return (
    <>
      <View className="mx-2">
        <Text className="font-bold text-xl">Fitness Style</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            handlePresentModalPress()
          }}
        >
          <View className="flex flex-row justify-between bg-slate-200 h-10 items-center px-2">
            <View className="flex flex-row">
              <Text>
                {setStyles ? setStyles : "What is the Fitness Style?"}
              </Text>
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
            <Text className="text-xl font-bold">What is the gym style</Text>
            <Pressable
              className="border-2 rounded-full bg-slate-300 p-2 m-1"
              onPress={async () => {
                await singleValueEdit("gyms", "gym_style", fitnessStyles)
                await getGymStyle()
                dismiss()
              }}
            >
              <Text className="text-center">Save</Text>
            </Pressable>
          </View>
          <View className="flex flex-row flex-wrap">
            {gymStyles.map((style) => (
              <Pressable
                key={style}
                className={`border-2 rounded-full p-2 m-1 ${
                  fitnessStyles.includes(style) ? "bg-blue-500" : "bg-slate-300"
                }`}
                onPress={async () => {
                  {
                    fitnessStyles.includes(style)
                      ? removeFromFitnessArray(style)
                      : addToFitnessArray(style)
                  }
                }}
              >
                <Text className="text-center">{style}</Text>
              </Pressable>
            ))}
          </View>
        </BottomSheetModal>
      </View>
    </>
  )
}

export default FitnessStyle
