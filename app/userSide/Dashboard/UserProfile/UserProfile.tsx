import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import ProfilePic from "../../../components/Avatar"
import { FIREBASE_AUTH, db } from "../../../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import * as Location from "expo-location"
import { useLocation } from "../../../context/LocationContext"
import getSingleGym from "../../../functions/getSingleGym"
import { GymProfile, UserProfile } from "../../../@types/firestore"
import { getCity } from "../../../functions/getCity"
import getUserProfile from "../../../functions/getUserProfile"

const UserProfileHome = () => {
  const { location } = useLocation()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)
  const [homeGym, setHomeGym] = useState<GymProfile>({} as GymProfile)
  const [city, setCity] = useState<string | null>(null)
  const navigation = useNavigation<NavigationType>()
  const currentId = FIREBASE_AUTH.currentUser?.uid

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const callFuncs = async () => {
      setLoading(true)
      await getUserNameAge()
      await getCity(setCity, location)
      setLoading(false)
    }
    callFuncs()
  }, [location])

  useEffect(() => {
    if (userProfile.homeGym) {
      getSingleGym(userProfile.homeGym, setHomeGym, setLoading)
    }
  }, [userProfile])

  const getUserNameAge = async () => {
    if (currentId) {
      getUserProfile(currentId, setUserProfile, setLoading)
    }
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="flex items-center">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <ProfilePic
              size={200}
              id={FIREBASE_AUTH.currentUser?.uid}
              picNumber={0}
              avatarRadius={646}
              noAvatarRadius={646}
              collection="user"
              photoType="userPhotos"
            />
            <View className="m-2">
              <Text className="font-bold text-xl">
                {userProfile.firstName}, {city ? city : "no location"}
              </Text>
              <Text className="font-bold text-xl text-center">
                {homeGym.gym_title ? homeGym.gym_title : <ActivityIndicator />}
              </Text>
              <Text className="font-bold text-xl text-center">
                {("Points:", userProfile.points.toString())}
              </Text>
            </View>
            <Button
              title="edit profile"
              onPress={() => navigation.navigate("UserEditProfile")}
            />
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default UserProfileHome
