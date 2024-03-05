import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import ProfilePic from "../../components/Avatar"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import * as Location from "expo-location"

const UserProfile = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
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
      await getLocation()
      await getCity()
      setLoading(false)
    }
    callFuncs()
  }, [])

  const getUserNameAge = async () => {
    setLoading(true)
    if (currentId) {
      const userRef = doc(db, "user", currentId)

      const docSnap = await getDoc(userRef)

      if (docSnap.exists()) {
        const userData = { ...docSnap.data() }

        setName(userData.first_name)
        setAge(userData.age)
      }
      setLoading(false)
    }
  }
  const getLocation = async () => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)
    } catch (err) {
      console.error(err)
    }
  }

  const getCity = async () => {
    try {
      if (location) {
        let currentCity = await Location.reverseGeocodeAsync({
          latitude: location?.coords.latitude,
          longitude: location?.coords.latitude,
        })
        if (currentCity.length > 0) {
          // Extract the city from the address
          setCity(currentCity[0].city)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ScrollView
      style={{ flex: 1 }} // Ensure the ScrollView takes up all available space
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
                {name}, {city ? city : "no location"}
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

export default UserProfile
