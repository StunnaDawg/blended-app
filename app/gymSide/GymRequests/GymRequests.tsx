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
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [isPressed2, setIsPressed2] = useState<boolean>(false)
  const [memberRequestsList, setShowMemberRequestList] = useState<boolean>(true)
  const [coachRequests, setCoachRequests] = useState<UserProfile[]>([])
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
  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const handlePressIn2 = () => {
    setIsPressed2(true)
  }

  const handlePressOut2 = () => {
    setIsPressed2(false)
  }
  const fetchUsers = async () => {
    setLoading(true)
    await getUserProfiles(setCoachRequests, "gyms", "coachRequests")
    await getUserProfiles(setMemberRequests, "gyms", "memberRequests")
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    console.log("coach requests", coachRequests)
    console.log("member requests", memberRequests)
  }, [loading])

  return (
    <>
      <View className="flex-row justify-center border-b-2">
        <View
          className={
            isPressed ? "p-5 border-r pl-20 bg-black" : "p-5 pl-20 border-r "
          }
        >
          <Pressable
            onPress={() => {
              setShowMemberRequestList(true)
            }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text className="font-bold text-lg">Member Requests</Text>
          </Pressable>
        </View>

        <View
          className={
            isPressed2 ? "p-5 border-l pr-20 bg-black" : "p-5 pr-20 border-l "
          }
        >
          <Pressable
            onPress={() => {
              setShowMemberRequestList(false)
            }}
            onPressIn={handlePressIn2}
            onPressOut={handlePressOut2}
          >
            <Text className="font-bold text-lg">Coaches Requests</Text>
          </Pressable>
        </View>
      </View>

      {!loading ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!memberRequestsList
            ? coachRequests.map((coachRequest) => (
                <Pressable
                  onPress={async () => {
                    setUserToReview(coachRequest)
                    setRequestType("coaches")
                    setDeleteFrom("coachRequests")
                    handlePresentModalPress()
                  }}
                  className="flex flex-row justify-between p-2 border-b"
                  key={coachRequest.id}
                >
                  <Text>{coachRequest.lastName}</Text>
                  <Text>View Request</Text>
                </Pressable>
              ))
            : memberRequests.map((memberRequest) => (
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
              ))}
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
        />
      </BottomSheetModal>
    </>
  )
}

export default GymRequests
