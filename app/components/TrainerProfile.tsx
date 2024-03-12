import { View, Text, ActivityIndicator, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import getUserProfile from "../functions/getUserProfile"
import { UserProfile } from "../@types/firestore"
import SinglePic from "./Avatar"

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
        <View className="items-center">
          <Text>{trainerProfile.firstName}</Text>
          <SinglePic
            id={trainerProfile.id}
            size={100}
            picNumber={0}
            avatarRadius={10}
            noAvatarRadius={10}
            collection="user"
            photoType="userPhotos"
          />
          <Pressable>
            <Text>View Profile</Text>
          </Pressable>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

export default TrainerProfile
