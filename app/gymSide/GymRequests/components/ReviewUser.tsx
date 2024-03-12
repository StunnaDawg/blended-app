import { View, Text } from "react-native"
import React from "react"
import { UserProfile } from "../../../@types/firestore"

type ReviewUserProps = {
  profile: UserProfile
}

const ReviewUser = ({ profile }: ReviewUserProps) => {
  return (
    <View>
      <Text>{profile.id}</Text>
    </View>
  )
}

export default ReviewUser
