import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native"
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
import getUserJoinedGym from "../../../functions/getAllUserGyms"
import { FontAwesome6 } from "@expo/vector-icons"
import OtherGyms from "./components/OtherGyms"
import { useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../../../@types/navigation"

const HomeGym = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [homeGym, setHomeGym] = useState<GymProfile>({} as GymProfile)
  const [currentGymId, setCurrentGymId] = useState<string>("")
  const [joinedGyms, setJoinedGyms] = useState<GymProfile[] | null>([])
  const [currentUserProfile, setCurretUserProfile] = useState<UserProfile>(
    {} as UserProfile
  )
  const [currentChannel, setCurrentChannel] = useState<GymChatChannel>(
    {} as GymChatChannel
  )

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const tabNavigate = useNavigation<TabNavigationType>()

  const navigation = useNavigation<NavigationType>()

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
    const unsubscribe = navigation.addListener("focus", () => {
      // Your update logic here, e.g., refetching user profile
      if (currentUserId) {
        getUserProfile(currentUserId, setCurretUserProfile, setLoading)
      }
    })

    return unsubscribe
  }, [navigation, currentUserId])

  useEffect(() => {
    if (currentUserId) {
      getUserProfile(currentUserId, setCurretUserProfile, setLoading)
    }
  }, [currentUserId])

  useEffect(() => {
    if (currentUserProfile.homeGym) {
      getSingleGym(currentUserProfile.homeGym, setHomeGym, setLoading)
    }
  }, [currentUserProfile])

  useEffect(() => {
    if (currentUserProfile.gyms?.length) {
      getUserJoinedGym(setJoinedGyms, setLoading, currentUserProfile.gyms)
    }
  }, [currentUserProfile])

  useEffect(() => {
    if (homeGym.gymChatChannels && homeGym.gymChatChannels.length > 0) {
      setCurrentChannel(homeGym.gymChatChannels[0])
    }
  }, [homeGym])

  return (
    <>
      {!loading ? (
        <>
          <View className="flex-1 flex flex-row">
            <View>
              <ScrollView className="flex flex-row bg-blue w-16">
                {joinedGyms?.map((gym, index) => (
                  <View key={gym.gymId}>
                    <OtherGyms
                      gym={gym}
                      setCurrentGym={setHomeGym}
                      setGymId={setCurrentGymId}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
            <View className="flex-1 p-1 underline">
              <View className="mb-4 border-b-2">
                <View className="flex flex-row justify-between items-center">
                  <Text className="font-bold text-xl my-2 mx-2">
                    {homeGym.gym_title}
                  </Text>
                  <View className="mx-2">
                    <Pressable
                      onPress={() => {
                        console.log(currentGymId)
                        if (currentUserId && currentGymId !== undefined) {
                          navigation.navigate("CurrentGymSettings", {
                            gymProfile: homeGym,
                            id: currentChannel.gymId,
                          })
                        }
                      }}
                    >
                      <FontAwesome6 name="gear" size={20} color="black" />
                    </Pressable>
                  </View>
                </View>
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
      ) : homeGym ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Pressable
            onPress={() => {
              tabNavigate.navigate("Gyms")
            }}
          >
            <View className="flex flex-row">
              <FontAwesome6 name="person-running" size={24} color="black" />
              <Text className="text-xl mx-1">Join a Gym!</Text>
            </View>
          </Pressable>
        </View>
      )}
    </>
  )
}

export default HomeGym
