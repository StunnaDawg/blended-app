import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import {
  GymChatChannel,
  GymProfile,
  UserProfile,
} from "../../../@types/firestore"
import getSingleGym from "../../../functions/getSingleGym"
import getUserProfile from "../../../functions/getUserProfile"
import { FIREBASE_AUTH } from "../../../../firebase"
import Channel from "./components/Channel"
import getAllGymChannels from "../../../functions/getGymChannels"

const HomeGym = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [homeGym, setHomeGym] = useState<GymProfile>({} as GymProfile)
  const [currentUserProfile, setCurretUserProfile] = useState<UserProfile>(
    {} as UserProfile
  )
  const [currentChannel, setCurrentChannel] = useState<GymChatChannel>(
    {} as GymChatChannel
  )

  const [allChannels, setAllChannels] = useState<GymChatChannel[]>([])
  const currentUserId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    if (currentUserId) {
      getUserProfile(currentUserId, setCurretUserProfile, setLoading)
    }
  }, [currentUserId])

  useEffect(() => {
    if (currentUserProfile.homeGym) {
      getSingleGym(currentUserId, setHomeGym, setLoading)
    }
  }, [currentUserProfile])

  return (
    <>
      {!loading && homeGym ? (
        <>
          <View className="flex-1 flex flex-row">
            <View className="flex-1">
              <ScrollView className="flex flex-row bg-blue w-28">
                <Text className="p-3 font-bold underline">Channels</Text>
                {homeGym.gymChatChannels?.map((channel) => {
                  return (
                    <Channel
                      key={channel.channelId}
                      channelData={channel}
                      setChannelData={setCurrentChannel}
                    />
                  )
                })}
              </ScrollView>
            </View>
            <View className="flex-1 p-1">
              <ScrollView>
                <Text className="font-bold text-xl">{homeGym.gym_title}</Text>
                <Text>
                  {currentChannel.channelTitle !== null
                    ? currentChannel.channelTitle
                    : "Nada"}
                </Text>
              </ScrollView>
            </View>
          </View>
        </>
      ) : (
        <Text>Join a Gym?</Text>
      )}
    </>
  )
}

export default HomeGym
