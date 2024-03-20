import { View, Text, Pressable, ActivityIndicator } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import updateEventAttendees from "../../../../functions/addUserToAttended"
import { Event } from "../../../../@types/firestore"
import { FIREBASE_AUTH } from "../../../../../firebase"

type RVSPButtonProps = {
  event: Event | null
  eventId: string
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const RVSPButton = ({
  event,
  eventId,
  setLoading,
  loading,
}: RVSPButtonProps) => {
  const [currentAttendee, setCurrentAttendee] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const currentUser = FIREBASE_AUTH.currentUser?.uid

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  useEffect(() => {
    if (event && event.attendees && currentUser) {
      const isUserInAttendees = event.attendees.some(
        (attendee) => attendee.memberId === currentUser
      )
      if (isUserInAttendees) {
        setCurrentAttendee(true)
        console.log("user is an attendee")
      } else {
        setCurrentAttendee(false)
      }
    } else {
      setCurrentAttendee(false)
    }
  }, [event])
  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={
        isPressed
          ? "w-28 border p-2 rounded bg-white"
          : "w-28 border p-2 rounded bg-slate-200"
      }
      onPress={() => {
        if (currentUser && event) {
          setLoading(true)
          updateEventAttendees(
            currentUser,
            event.gymHost,
            eventId,
            currentAttendee,
            setLoading
          )
          setCurrentAttendee(!currentAttendee)
        }
      }}
    >
      {!loading ? (
        <Text className="text-center">
          {currentAttendee ? "Cancel" : "RVSP"}
        </Text>
      ) : (
        <View className="flex flex-row justify-center items-center">
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}
    </Pressable>
  )
}

export default RVSPButton
