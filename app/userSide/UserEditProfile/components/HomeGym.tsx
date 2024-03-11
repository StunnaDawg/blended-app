import { View, Text, Pressable } from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { GymProfile } from "../../../@types/firestore"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore"
type UserHomeGymProps = {
  currentGym: string | null | undefined
}
const HomeGym = ({ currentGym }: UserHomeGymProps) => {
  const [homeGym, setHomeGym] = useState<GymProfile>({} as GymProfile)
  const [gymSelection, setGymSelection] = useState<GymProfile[]>([])
  const currentUserId = FIREBASE_AUTH.currentUser?.uid
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const setHomeGymToUser = async () => {
    try {
      if (currentUserId) {
        const docRef = doc(db, "user", currentUserId)

        await updateDoc(docRef, {
          homeGym: homeGym,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

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
              <Text>{currentGym ? currentGym : "Choose"} </Text>
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
            <View className="items-center">
              <Text className="text-xl font-bold">Find Home Gym</Text>
              <Pressable
                onPress={() => {
                  if (homeGym) setHomeGymToUser()
                  dismiss()
                }}
              >
                <Text className="underline">Save</Text>
              </Pressable>
            </View>
          </View>
          <View>
            {gymSelection.map((gym) => (
              <View key={gym.gym_id}>
                <Pressable
                  onPress={() => {
                    setHomeGym(gym)
                  }}
                >
                  <Text className="text-xl font-bold">{gym.gym_title}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </BottomSheetModal>
      </View>
    </>
  )
}

export default HomeGym
