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
import { GymRequest, UserProfile } from "../../@types/firestore"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import MeetCard from "../../userSide/connections/Meet/components/MeetCard"
import ReviewUser from "./components/ReviewUser"

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
                className="flex flex-row justify-between p-2 border-b"
                key={memberRequest.id}
              >
                <Text>{memberRequest.firstName}</Text>
                <Text>View Request</Text>
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
        />
      </BottomSheetModal>
    </>
  )
}

export default GymRequests
