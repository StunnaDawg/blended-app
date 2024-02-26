import React, { useEffect, useState } from "react"
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Text,
  Pressable,
} from "react-native"
import { Button, Input } from "react-native-elements"
import { FIREBASE_AUTH, db } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import BouncyCheckbox from "react-native-bouncy-checkbox"

export default function UserAuth() {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const auth = FIREBASE_AUTH
  const [isGym, setIsGym] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  const handleSignUp = async () => {
    try {
      setLoading(true)
      if (isGym) {
        await createUserWithEmailAndPassword(auth, email, password)

        const gymId = FIREBASE_AUTH?.currentUser?.uid
        if (gymId) {
          const gymsCollectionRef = doc(db, "gyms", gymId)
          const newGymData = {
            email: email,
            gymId: FIREBASE_AUTH?.currentUser?.uid,
          }
          await setDoc(gymsCollectionRef, newGymData)
          navigation.navigate("GymQuestionOne")
        } else {
          console.log("no gym id to set")
        }
      } else {
        await createUserWithEmailAndPassword(auth, email, password)

        const userId = FIREBASE_AUTH?.currentUser?.uid

        if (userId) {
          const usersCollectionRef = doc(db, "user", userId)
          const newUserData = {
            email: email,
            userId: FIREBASE_AUTH?.currentUser?.uid,
          }
          await setDoc(usersCollectionRef, newUserData)
          navigation.navigate("UserQuestionOne")
        } else {
          console.log("no User id to set")
        }
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="mt-40 p-12 w-96">
      <View className="flex flex-row justify-center">
        <Text className="text-2xl font-bold text-center">Sign Up</Text>
      </View>
      <View className=" flex flex-col content-center items-center">
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
        </View>
        <View>
          <View className="flex flex-row justify-center items-center mb-2">
            <Text className="mx-2 font-bold">Gym Account?</Text>
            <BouncyCheckbox
              isChecked={isGym}
              onPress={() => {
                setIsGym(!isGym)
              }}
            />
          </View>
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title="Sign up"
            disabled={loading}
            onPress={async () => {
              await handleSignUp()
            }}
          />
        </View>

        <View className="flex flex-row justify-center">
          <Pressable
            disabled={loading}
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="underline mt-2">Already have an Account?</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
})
