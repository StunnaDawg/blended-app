import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { RootStackParamList } from "../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import BackButton from "./BackButton"
import SinglePicBackGround from "./ImageBackground"
import { doc } from "firebase/firestore"
import { db } from "../../firebase"
import { UserProfile } from "../@types/firestore"
import SinglePicBackGroundUser from "./ImageBackgroundUser"

type PicDetailsProps = {
  profile: UserProfile
}

type PicBackgroundProps = {
  profile: UserProfile
  setLoading: Dispatch<SetStateAction<boolean>>
}

const PicDetails = ({ profile }: PicDetailsProps) => {
  return (
    <>
      <>
        <View className="m-1">
          <Text className="font-bold text-lg text-shadow text-white">
            {profile.firstName} {profile.lastName}
          </Text>
        </View>
      </>
    </>
  )
}

const ViewUserProfileScreen = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "ViewUserProfile">>()
  const userProfile = route.params.userProfile

  return (
    <ScrollView>
      <View className="flex flex-row items-center">
        <BackButton />
        <Text>{userProfile.firstName}</Text>
      </View>
      <View>
        <UserImageCard profile={userProfile} setLoading={setLoading} />
      </View>
    </ScrollView>
  )
}

const UserImageCard = ({ profile, setLoading }: PicBackgroundProps) => {
  const eventRef = doc(db, "user", profile.id)
  return (
    <SinglePicBackGroundUser
      id={profile.id}
      height={200}
      width={160}
      avatarRadius={10}
      noAvatarRadius={10}
      docRef={eventRef}
      children={<PicDetails profile={profile} />}
      setLoading={setLoading}
    />
  )
}

export default ViewUserProfileScreen
