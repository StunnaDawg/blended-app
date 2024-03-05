import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH, db } from "../../firebase"
import ImageGrid from "../components/ImageGrid"
import About from "./components/About"
import Activities from "./components/Activities"
import Food from "./components/Food"
import Zodiac from "./components/Zodiac"
import Career from "./components/Career"
import Education from "./components/Education"
import PRsection from "./components/PRsection"
import RelationshipGoals from "./components/RelationshipGoals"
import School from "./components/School"
import SingleImage from "../components/SingleImage"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import HomeGym from "./components/HomeGym"
import getUserProfile from "../functions/getUserProfile"
import { UserProfile } from "../@types/firestore"

const EditProfileHome = () => {
  const [userProfileValues, setUserProfileValues] = useState<UserProfile>(
    {} as UserProfile
  )
  const currentUserId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    getUserProfile(currentUserId, setUserProfileValues)
  }, [])

  return (
    <ScrollView className="mb-20">
      <View className="flex flex-row justify-center flex-wrap">
        <SingleImage key={0} index={0} />
        <SingleImage key={1} index={1} />
        <SingleImage key={2} index={2} />
        <SingleImage key={3} index={3} />
        <SingleImage key={4} index={4} />
        <SingleImage key={5} index={5} />
      </View>

      <View>
        <About />
      </View>

      <View className="mt-4">
        <HomeGym currentGym={userProfileValues.homeGym?.gym_title} />
      </View>

      <View className="mt-4">
        <Activities />
      </View>

      <View className="mt-4">
        <PRsection />
      </View>

      <View className="mt-4">
        <RelationshipGoals lookingFor={userProfileValues.intentions} />
      </View>

      <View className="mt-4">
        <Food preferance={userProfileValues.diet} />
      </View>

      <View className="mt-4">
        <Zodiac zodiac={userProfileValues.zodiac} />
      </View>

      <View className="mt-4">
        <Education education={userProfileValues.education} />
      </View>

      <View className="mt-4">
        <Career />
      </View>

      {/* <View className="my-4">
        <School  />
      </View> */}

      {/* <View>
        <Activities />
      </View>

      <View>
        <Activities />
      </View>

      <View>
        <Activities />
      </View>

      <View>
        <Activities />
      </View> */}
    </ScrollView>
  )
}

export default EditProfileHome
