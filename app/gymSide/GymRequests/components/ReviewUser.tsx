import { View, Text, Pressable } from "react-native"
import React from "react"
import { UserProfile } from "../../../@types/firestore"
import reviewRequest from "../../../functions/reviewRequest"

type ReviewUserProps = {
  profile: UserProfile
  requestType: string
  deleteFrom: string
  handleDismissModal: () => void
}

const ReviewUser = ({
  profile,
  requestType,
  deleteFrom,
  handleDismissModal,
}: ReviewUserProps) => {
  return (
    <View className="mt-24">
      <Text>{profile.firstName}</Text>
      <Pressable
        onPress={async () => {
          await reviewRequest(profile.id, requestType, deleteFrom, true),
            handleDismissModal()
        }}
      >
        <Text>Accept</Text>
      </Pressable>

      <Pressable
        onPress={async () => {
          await reviewRequest(profile.id, requestType, deleteFrom, false),
            handleDismissModal()
        }}
      >
        <Text>Decline</Text>
      </Pressable>
    </View>
  )
}

export default ReviewUser
