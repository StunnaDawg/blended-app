import { View, Text, Button } from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType, TabNavigationType } from "../../../@types/navigation"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { FIREBASE_APP, db } from "../../../../firebase"
import uploadImage from "../../../functions/uploadImage"
import * as Location from "expo-location"

type GymPhotoProps = {
  id?: string
  imageArray: string[]
}

const GymUploadPhotos = ({ id, imageArray }: GymPhotoProps) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [storeLocatio, setStoreLocation] = useState<string | null>()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [downloadedImageArray, setDownloadedImageArray] = useState<string[]>([])
  const navigation = useNavigation<TabNavigationType>()

  const submitGymPhotos = async (downloadImage: string) => {
    try {
      if (id) {
        const GymRef = doc(db, "gyms", id)

        await updateDoc(GymRef, {
          gymPhotos: arrayUnion(downloadImage),
        })
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const uploadImagesArray = async () => {
    imageArray.forEach((element) => {
      uploadImage(element, "image", id + "element", submitGymPhotos)
    })
  }

  const submitGymQuestions = async (
    gym_city: string | null,
    gym_province: string | null
  ) => {
    try {
      if (id) {
        const gymRef = doc(db, "gyms", id)

        await updateDoc(gymRef, {
          city: gym_city,
          province: gym_province,
        })
      } else {
        console.log("Gym does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const enableLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied")
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    let text = "Waiting.."
    if (errorMsg) {
      text = errorMsg
    } else if (location) {
      text = JSON.stringify(location)
      let currentCity = await Location.reverseGeocodeAsync({
        latitude: location?.coords.latitude,
        longitude: location?.coords.latitude,
      })
      if (currentCity.length > 0) {
        // Extract the city from the address
        await submitGymQuestions(currentCity[0].city, currentCity[0].district)
        navigation.navigate("Dashboard")
      }
    }
  }
  return (
    <Button
      title="Next"
      onPress={async () => {
        await uploadImagesArray()
        await enableLocation()
      }}
    />
  )
}

export default GymUploadPhotos
