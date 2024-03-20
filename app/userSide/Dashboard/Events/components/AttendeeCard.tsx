import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { Attendee, UserProfile } from "../../../../@types/firestore"
import getUserProfile from "../../../../functions/getUserProfile"
import { ActivityIndicator } from "react-native"
import SinglePic from "../../../../components/Avatar"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../../@types/navigation"

type AttendeeCardProp = {
  attendeeId: Attendee
}

const AttendeeCard = ({ attendeeId }: AttendeeCardProp) => {
  const [user, setUser] = useState<UserProfile>({} as UserProfile)
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    getUserProfile(attendeeId.memberId, setUser, setLoading)
  }, [attendeeId])

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ViewUserProfile", {
          userProfile: user,
        })
      }
      className="flex flex-row items-center m-4"
    >
      {!loading ? (
        <>
          <SinglePic
            id={attendeeId.memberId}
            size={45}
            picNumber={0}
            avatarRadius={100}
            noAvatarRadius={100}
            collection="user"
            photoType="userPhotos"
          />
          <View>
            <Text className=" mx-4 font-semibold text-xl">
              {user ? user.firstName : "Error"}
            </Text>
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </Pressable>
  )
}

export default AttendeeCard
