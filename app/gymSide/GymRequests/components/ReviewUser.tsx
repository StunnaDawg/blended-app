import { View, Text, Pressable } from "react-native"
import React from "react"
import { UserProfile } from "../../../@types/firestore"
import reviewRequest from "../../../functions/reviewRequest"

type ReviewUserProps = {
  profile: UserProfile
  requestType: string
  deleteFrom: string
}

const ReviewUser = ({ profile, requestType, deleteFrom }: ReviewUserProps) => {
  return (
    <View className="mt-24">
      <Text>{profile.firstName}</Text>
      <Pressable
        onPress={() => reviewRequest(profile.id, requestType, deleteFrom, true)}
      >
        <Text>Accept</Text>
      </Pressable>

      <Pressable
        onPress={() =>
          reviewRequest(profile.id, requestType, deleteFrom, false)
        }
      >
        <Text>Decline</Text>
      </Pressable>
    </View>
  )
}

export default ReviewUser
