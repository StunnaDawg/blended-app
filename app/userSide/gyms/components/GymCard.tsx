import { View, Text, Pressable } from "react-native"
import React, { useCallback, useMemo, useRef } from "react"
import SinglePic from "../../../components/Avatar"
import { GymProfile } from "../../../@types/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import ViewGymProfile from "./ViewGymProfile"

type GymCardProp = {
  gymProfile: GymProfile
}

const GymCard = ({ gymProfile }: GymCardProp) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["1%", "100%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  return (
    <>
      <Pressable
        onPress={() => {
          handlePresentModalPress()
        }}
      >
        <View className=" flex flex-row border-t-2 border-b">
          <View className="border-r-2">
            <SinglePic
              id={gymProfile.gym_id}
              size={125}
              picNumber={0}
              avatarRadius={10}
              noAvatarRadius={10}
              photoType="gymPhotos"
              collection="gyms"
            />
          </View>

          <View className=" flex flex-col justify-between">
            <View className="p-1">
              <Text className="font-bold text-xl">{gymProfile.gym_title}</Text>
              <Text className="text-xs">10km away</Text>
            </View>

            <View className="flex flex-row">
              <Pressable className="border rounded-full bg-slate-300 p-1 m-1">
                <Text className=" text-xs text-center">
                  {gymProfile.gym_style}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ViewGymProfile gymProfile={gymProfile} dismiss={dismiss} />
      </BottomSheetModal>
    </>
  )
}

export default GymCard
