import { View, Text, Button } from "react-native"
import React, { useEffect, useState } from "react"
import ProfilePic from "../../components/Avatar"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import * as Location from "expo-location"

const UserProfile = () => {
  const [name, setName] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const navigation = useNavigation<NavigationType>()
  const currentId = FIREBASE_AUTH.currentUser?.uid
  useEffect(() => {
    getUserNameAge()
  }, [])

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    getCity()
  }, [])

  const getUserNameAge = async () => {
    if (currentId) {
      const userRef = doc(db, "user", currentId)

      const docSnap = await getDoc(userRef)

      if (docSnap.exists()) {
        const userData = { ...docSnap.data() }

        setName(userData.first_name)
        setAge(userData.age)
      }
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
    <View>
      <ProfilePic
        size={200}
        id={FIREBASE_AUTH.currentUser?.uid}
        picNumber={0}
        avatarRadius={646}
        noAvatarRadius={646}
        collection="user"
        photoType="userPhotos"
      />
      <Text>
        {name}, {city ? city : "no location"}
      </Text>
      <Button
        title="edit profile"
        onPress={() => navigation.navigate("UserEditProfile")}
      />
    </View>
  )
}

export default UserProfile
