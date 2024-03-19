import { View, Text, Pressable } from "react-native"
import React, { useCallback, useMemo, useRef } from "react"
import SinglePic from "../../../components/Avatar"
import { GymProfile } from "../../../@types/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import ViewGymProfile from "./ViewGymProfile"
import GymMembersModal from "./GymMembersModal"

type GymCardProp = {
  id?: string
  gymProfile: GymProfile
}

const GymCard = ({ gymProfile, id }: GymCardProp) => {
  const navigation = useNavigation<NavigationType>()

  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("ViewGymScreen", {
            id: id,
            gymId: gymProfile.gym_id,
          })
        }}
      >
        <View className="flex flex-row items-center">
          <View className="m-2">
            <SinglePic
              id={gymProfile.gym_id}
              size={50}
              picNumber={0}
              avatarRadius={100}
              noAvatarRadius={10}
              photoType="gymPhotos"
              collection="gyms"
            />
          </View>

          <View className="flex-1 flex-col border-b">
            <View className="flex-1 flex-row items-center">
              <Text className="font-bold text-xl">{gymProfile.gym_title}</Text>
            </View>

            <View className="flex-1 flex-row items-center">
              <Text className="text-xs">10km away</Text>
            </View>
          </View>
          {/* <View className="flex flex-row">
              <Pressable className="border rounded-full bg-slate-300 p-1 m-1">
                <Text className=" text-xs text-center">
                  {gymProfile.gym_style}
                </Text>
              </Pressable>
            </View> */}
        </View>
      </Pressable>
    </>
  )
}

export default GymCard
