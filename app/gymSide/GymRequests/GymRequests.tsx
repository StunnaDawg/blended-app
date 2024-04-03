import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import getUserProfiles from "../../functions/getUserProfiles"
import { UserProfile } from "../../@types/firestore"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { FontAwesome6 } from "@expo/vector-icons"
import ReviewUser from "./components/ReviewUser"
import SinglePic from "../../components/Avatar"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const GymRequests = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [memberRequests, setMemberRequests] = useState<UserProfile[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [userToReview, setUserToReview] = useState<UserProfile>(
    {} as UserProfile
  )
  const [requestType, setRequestType] = useState<string>("")
  const [deleteFrom, setDeleteFrom] = useState<string>("")
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const navigation = useNavigation<NavigationType>()
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["1%", "100%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])
  const fetchUsers = async () => {
    setLoading(true)

    await getUserProfiles(setMemberRequests, "gyms", "memberRequests")
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("GymModerateMembers")
          }}
        >
          <View className="flex flex-row items-center">
            <Text className="text-xl font-semibold mx-1">Moderate Users</Text>
            <FontAwesome6 name="edit" size={24} color="black" />
          </View>
        </Pressable>
      </View>
      {!loading ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {memberRequests.length > 0 ? (
            memberRequests.map((memberRequest) => (
              <Pressable
                onPress={() => {
                  setUserToReview(memberRequest)
                  setRequestType("members")
                  setDeleteFrom("memberRequests")
                  handlePresentModalPress()
                }}
                className="flex flex-row justify-between p-2 border-b items-center"
                key={memberRequest.id}
              >
                <View className="flex flex-row items-center">
                  <Pressable
                    onPress={() => {
                      navigation.navigate("ViewUserProfile", {
                        userProfile: memberRequest,
                      })
                    }}
                  >
                    <View className="flex flex-row items-center">
                      <SinglePic
                        id={memberRequest.id}
                        size={50}
                        picNumber={0}
                        avatarRadius={100}
                        noAvatarRadius={100}
                        collection="user"
                        photoType="userPhotos"
                      />

                      <Text className="mx-1 font-bold text-xl">
                        {memberRequest.firstName}
                      </Text>
                    </View>
                  </Pressable>
                </View>

                <View className="flex flex-row items-center">
                  <Text className="text-sm font-semibold mx-1">
                    View Request
                  </Text>
                  <FontAwesome6
                    name="magnifying-glass"
                    size={16}
                    color="black"
                  />
                </View>
              </Pressable>
            ))
          ) : (
            <View className="flex flex-row justify-center mt-48">
              <Text className="font-bold text-xl">
                No Requests at the Moment!
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ReviewUser
          profile={userToReview}
          deleteFrom={deleteFrom}
          requestType={requestType}
          handleDismissModal={dismiss}
          setLoading={setLoading}
        />
      </BottomSheetModal>
    </>
  )
}

export default GymRequests
