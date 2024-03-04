import { View, Text, Pressable } from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { GymProfile } from "../../@types/firestore"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { collection, onSnapshot, query } from "firebase/firestore"

const HomeGym = () => {
  const [homeGym, setHomeGym] = useState<GymProfile>({} as GymProfile)
  const [gymSelection, setGymSelection] = useState<GymProfile[]>([])
  const currentUserId = FIREBASE_AUTH.currentUser?.uid
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["25%", "85%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "gyms")),
      (snapshot) => {
        const gymsData: GymProfile[] = snapshot.docs.map((doc) => ({
          ...(doc.data() as GymProfile),
        }))
        setGymSelection(gymsData)
      }
    )
    return unsubscribe
  }, [currentUserId])
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
          <View>
            {gymSelection.map((gym, index) => (
              <View key={gym.gym_id}>
                <Text className="text-xl font-bold">{gym.gym_title}</Text>
              </View>
            ))}
          </View>
        </BottomSheetModal>
      </View>
    </>
  )
}

export default HomeGym
