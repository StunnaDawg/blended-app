import { View, Text, Pressable } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import SinglePic from "../../../../components/Avatar"
import { GymProfile } from "../../../../@types/firestore"
import getSingleGym from "../../../../functions/getSingleGym"

type OtherGymProps = {
  gym: GymProfile
  setCurrentGym: Dispatch<SetStateAction<GymProfile>>
  setGymId: Dispatch<SetStateAction<string>>
}

const OtherGyms = ({ gym, setCurrentGym, setGymId }: OtherGymProps) => {
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getSingleGym(gym.gymId, setGymProfile, setLoading)
  }, [])

  const setCurrentChannel = async () => {
    console.log(gym.gymId)
    if (gymProfile.gymId !== "") {
      setCurrentGym(gymProfile)
      setGymId(gym.gymId)
    }
  }

  return (
    <Pressable
      className="m-1"
      key={gym.gymId}
      onPress={() => {
        setCurrentChannel()
      }}
    >
      <SinglePic
        id={gym.gymId}
        size={50}
        avatarRadius={100}
        collection="gyms"
        photoType="gymPhotos"
        picNumber={0}
        noAvatarRadius={100}
      />
    </Pressable>
  )
}

export default OtherGyms
