import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { Attendee, GymProfile, UserProfile } from "../../../../@types/firestore"
import getUserProfile from "../../../../functions/getUserProfile"
import { ActivityIndicator } from "react-native"
import SinglePic from "../../../../components/Avatar"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../../@types/navigation"

type MemberCardProp = {
  userId: string
}

const MemberCard = ({ userId }: MemberCardProp) => {
  const [user, setUser] = useState<UserProfile>({} as UserProfile)
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    getUserProfile(userId, setUser, setLoading)
  }, [userId])

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
            id={userId}
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

export default MemberCard
