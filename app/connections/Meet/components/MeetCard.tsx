import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { UserProfile } from "../../../@types/firestore"
import getUserProfile from "../../../functions/getUserProfile"

type MeetCardProps = {
  id: string
}

const MeetCard = ({ id }: MeetCardProps) => {
  const [userData, setUserData] = useState<UserProfile>({} as UserProfile)
  useEffect(() => {
    getUserProfile(id, setUserData)
  }, [])

  return (
    <View>
      <Text>{userData.firstName}</Text>
    </View>
  )
}

export default MeetCard
