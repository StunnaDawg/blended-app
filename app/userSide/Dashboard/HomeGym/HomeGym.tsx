import { View, Text, ScrollView } from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  GymChatChannel,
  GymProfile,
  UserProfile,
} from "../../../@types/firestore"
import getSingleGym from "../../../functions/getSingleGym"
import getUserProfile from "../../../functions/getUserProfile"
import { FIREBASE_AUTH } from "../../../../firebase"
import Channel from "./components/Channel"
import ChannelMessageScreen from "./components/ChannelMessageScreen"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import OffersSection from "./components/OffersSection"

const HomeGym = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [homeGym, setHomeGym] = useState<GymProfile>({} as GymProfile)
  const [currentUserProfile, setCurretUserProfile] = useState<UserProfile>(
    {} as UserProfile
  )
  const [currentChannel, setCurrentChannel] = useState<GymChatChannel>(
    {} as GymChatChannel
  )

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["1%", "100%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
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

  useEffect(() => {
    if (homeGym.gymChatChannels && homeGym.gymChatChannels.length > 0) {
      setCurrentChannel(homeGym.gymChatChannels[0])
    }
  }, [homeGym])

  return (
    <>
      {!loading && homeGym ? (
        <>
          <View className="flex-1 flex flex-row">
            <View>
              <ScrollView className="flex flex-row bg-blue w-16"></ScrollView>
            </View>
            <View className="flex-1 p-1 underline">
              <View className="mb-4 border-b-2">
                <Text className="font-bold text-xl my-2">
                  {homeGym.gym_title}
                </Text>
                <Text className="font-bold">Chat Channels</Text>
                {homeGym.gymChatChannels?.map((channel) => {
                  return (
                    <Channel
                      key={channel.channelId}
                      channelData={channel}
                      setLoading={setLoading}
                      setChannelData={setCurrentChannel}
                      handlePresentModalPress={handlePresentModalPress}
                    />
                  )
                })}
              </View>

              <View>
                <OffersSection />
              </View>
            </View>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
            >
              {currentChannel.channelId !== undefined && !loading ? (
                <View className="flex-1">
                  <ChannelMessageScreen
                    channelId={currentChannel.channelId}
                    gymId={currentChannel.gymId}
                    handleDismissModal={dismiss}
                    channelName={currentChannel.channelTitle}
                  />
                </View>
              ) : (
                <View>
                  <Text>No Channel Selected</Text>
                </View>
              )}
            </BottomSheetModal>
          </View>
        </>
      ) : (
        <Text>Join a Gym?</Text>
      )}
    </>
  )
}

export default HomeGym
