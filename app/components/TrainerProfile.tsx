import { View, Text, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import getUserProfile from "../functions/getUserProfile"
import { UserProfile } from "../@types/firestore"

type TrainerProfileProps = {
  trainerId: string
}

const TrainerProfile = ({ trainerId }: TrainerProfileProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [trainerProfile, setTrainerProfile] = useState<UserProfile>(
    {} as UserProfile
  )

  const getTrainer = async () => {
    setLoading(true)
    await getUserProfile(trainerId, setTrainerProfile, setLoading)
  }

  useEffect(() => {
    getTrainer()
  }, [])

  return (
    <View className="border flex h-48 w-48 mx-3 mt-4">
      {!loading ? (
        <Text>{trainerProfile.firstName}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

export default TrainerProfile
