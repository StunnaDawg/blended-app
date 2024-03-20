import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import BackButton from "./BackButton"
import SinglePicBackGround from "./ImageBackground"
import { doc } from "firebase/firestore"
import { db } from "../../firebase"
import { GymProfile, UserProfile } from "../@types/firestore"
import SinglePicBackGroundUser from "./ImageBackgroundUser"
import getUserProfile from "../functions/getUserProfile"
import ActivityTags from "./ActivityTags"
import getSingleGym from "../functions/getSingleGym"
import SinglePicBackGroundGym from "./ImageBackgroundGym"

type PicDetailsProps = {
  profile: UserProfile
}

type GymCardProps = {
  profile: UserProfile
  gymProfile: string | null
}

type PicBackgroundProps = {
  profile: UserProfile
  setLoading: Dispatch<SetStateAction<boolean>>
}

const PicDetails = ({ profile }: PicDetailsProps) => {
  return (
    <>
      <>
        <BackButton />
        <View className=" m-1 flex-1 flex-col items-start justify-end">
          <Text className="font-bold text-3xl text-shadow text-black">
            {profile.firstName} {profile.lastName}
          </Text>
        </View>
      </>
    </>
  )
}

const ViewUserProfileScreen = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userProfileState, setUserProfileState] = useState<UserProfile>(
    {} as UserProfile
  )
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const route = useRoute<RouteProp<RootStackParamList, "ViewUserProfile">>()
  const userProfile = route.params.userProfile

  useEffect(() => {
    if (userProfile && userProfile.id) {
      getUserProfile(userProfile.id, setUserProfileState, setLoading)
    }
  }, [userProfile])

  useEffect(() => {
    if (userProfileState.homeGym) {
      console.log("home gym ID", userProfileState.homeGym)
      getSingleGym(userProfileState.homeGym, setGymProfile, setLoading)
      console.log("gym id", gymProfile.gymId)
    } else {
      console.log("nogym")
    }
  }, [userProfileState])

  return (
    <ScrollView>
      <View>
        <UserImageCard profile={userProfile} setLoading={setLoading} />
      </View>
      <View className="mt-5 mx-3">
        <Text className="text-3xl font-bold">About</Text>
        <Text className=" text-lg font-bold">{userProfileState.about}</Text>
      </View>
      <ScrollView horizontal={true} className="p-5">
        {userProfileState.activities &&
          Array.isArray(userProfileState.activities) &&
          userProfileState.activities.map((activity) => (
            <ActivityTags key={activity} activity={activity} />
          ))}
      </ScrollView>

      {!loading && userProfile.homeGym ? (
        <View>
          <Text className="text-3xl font-bold">Home Gym</Text>

          <GymCard
            profile={userProfileState}
            gymProfile={userProfileState.homeGym}
          />
        </View>
      ) : null}
    </ScrollView>
  )
}

const UserImageCard = ({ profile, setLoading }: PicBackgroundProps) => {
  const eventRef = doc(db, "user", profile.id)
  return (
    <SinglePicBackGroundUser
      id={profile.id}
      height={400}
      width={400}
      avatarRadius={10}
      noAvatarRadius={10}
      docRef={eventRef}
      children={<PicDetails profile={profile} />}
      setLoading={setLoading}
    />
  )
}

const GymCardData = ({ profile, gymProfile }: GymCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [gymProfileState, setGymProfileState] = useState<GymProfile>(
    {} as GymProfile
  )
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (gymProfile) {
      getSingleGym(gymProfile, setGymProfileState, setLoading)
    }
  }, [gymProfile])

  return (
    <>
      <View className=" m-1 flex-1 flex-col items-start justify-end">
        <Text className="font-bold text-3xl text-shadow text-black">
          {gymProfileState.gym_title}
        </Text>
      </View>
    </>
  )
}

const GymCard = ({ profile, gymProfile }: GymCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <View>
      {gymProfile ? (
        <SinglePicBackGroundGym
          id={gymProfile}
          height={200}
          width={160}
          avatarRadius={10}
          noAvatarRadius={10}
          docRef={doc(db, "gyms", gymProfile)}
          children={<GymCardData profile={profile} gymProfile={gymProfile} />}
          setLoading={setLoading}
        />
      ) : null}
    </View>
  )
}

export default ViewUserProfileScreen
