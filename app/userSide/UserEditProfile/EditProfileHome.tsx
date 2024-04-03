import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { FIREBASE_AUTH } from "../../../firebase"
import About from "./components/About"
import Activities from "./components/Activities"
import Food from "./components/Food"
import Zodiac from "./components/Zodiac"
import Career from "./components/Career"
import Education from "./components/Education"
import PRsection from "./components/PRsection"
import RelationshipGoals from "./components/RelationshipGoals"
import SingleImage from "../../components/SingleImage"
import getUserProfile from "../../functions/getUserProfile"
import { UserProfile } from "../../@types/firestore"
import BackButton from "../../components/BackButton"

const EditProfileHome = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userProfileValues, setUserProfileValues] = useState<UserProfile>(
    {} as UserProfile
  )
  const currentUserId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    getUserProfile(currentUserId, setUserProfileValues, setLoading)
  }, [currentUserId, loading])

  return (
    <KeyboardAvoidingView
      className="flex flex-1"
      keyboardVerticalOffset={100}
      behavior={"position"}
    >
      {!loading ? (
        <ScrollView className="mb-20">
          <BackButton />
          <View className="flex flex-row justify-center flex-wrap">
            <SingleImage key={0} index={0} />
            <SingleImage key={1} index={1} />
            <SingleImage key={2} index={2} />
            <SingleImage key={3} index={3} />
            <SingleImage key={4} index={4} />
            <SingleImage key={5} index={5} />
          </View>

          <About />

          <View className="mt-4">
            <Activities />
          </View>

          <View className="mt-4">
            <PRsection />
          </View>

          <View className="mt-4">
            <RelationshipGoals
              lookingFor={userProfileValues.intentions}
              setLoading={setLoading}
              loading={loading}
            />
          </View>

          <View className="mt-4">
            <Food
              preferance={userProfileValues.diet}
              setLoading={setLoading}
              loading={loading}
            />
          </View>

          <View className="mt-4">
            <Zodiac
              zodiac={userProfileValues.zodiac}
              setLoading={setLoading}
              loading={loading}
            />
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
      ) : (
        <ActivityIndicator />
      )}
    </KeyboardAvoidingView>
  )
}

export default EditProfileHome
