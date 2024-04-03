import { View, Text, Pressable } from "react-native"
import React, { Dispatch, SetStateAction, useState } from "react"
import { UserProfile } from "../../../@types/firestore"
import reviewRequest from "../../../functions/reviewRequest"
import SinglePic from "../../../components/Avatar"
import { FontAwesome6 } from "@expo/vector-icons"

type ReviewUserProps = {
  profile: UserProfile
  requestType: string
  deleteFrom: string
  handleDismissModal: () => void
  setLoading: Dispatch<SetStateAction<boolean>>
}

const ReviewUser = ({
  profile,
  requestType,
  deleteFrom,
  handleDismissModal,
  setLoading,
}: ReviewUserProps) => {
  const [isAcceptPressed, setIsAcceptPressed] = useState(false)
  const [isDeclinePressed, setIsDeclinePressed] = useState(false)
  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex flex-row items-center">
        <SinglePic
          id={profile.id}
          size={50}
          picNumber={0}
          avatarRadius={100}
          noAvatarRadius={100}
          collection="user"
          photoType="userPhotos"
        />

        <Text className="mx-2 text-2xl font-semibold">{profile.firstName}</Text>
      </View>
      <Pressable
        onPressIn={() => setIsAcceptPressed(true)}
        onPressOut={() => setIsAcceptPressed(false)}
        onPress={async () => {
          setLoading(true)
          await reviewRequest(profile.id, requestType, deleteFrom, true)
          handleDismissModal()
          setLoading(false)
        }}
        className={`border-2 rounded-full p-2 m-1 ${
          isAcceptPressed ? "bg-white" : "bg-green"
        }`}
      >
        <View className="flex flex-row items-center">
          <Text className="text-center font-bold text-xl mx-1">Accept</Text>
          <FontAwesome6 name="user-check" size={20} color="black" />
        </View>
      </Pressable>

      <Pressable
        onPressIn={() => setIsDeclinePressed(true)}
        onPressOut={() => setIsDeclinePressed(false)}
        onPress={async () => {
          setLoading(true)
          await reviewRequest(profile.id, requestType, deleteFrom, false)
          handleDismissModal()
          setLoading(false)
        }}
        className={`border-2 rounded-full p-2 m-1 ${
          isDeclinePressed ? "bg-white" : "bg-red"
        }`}
      >
        <View className="flex flex-row items-center">
          <Text className="text-center font-bold text-sm mx-1">Decline</Text>
          <FontAwesome6 name="user-xmark" size={20} color="black" />
        </View>
      </Pressable>
    </View>
  )
}

export default ReviewUser
