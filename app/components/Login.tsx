import { View, Text, Alert, StyleSheet, Pressable } from "react-native"
import React, { useState } from "react"
import { Button, Input } from "react-native-elements"
import { signInWithEmailAndPassword } from "firebase/auth"
import { FIREBASE_AUTH } from "../../firebase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../@types/navigation"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationType>()
  const auth = FIREBASE_AUTH

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="mt-40 p-12 w-96">
      <View className=" flex flex-col content-center items-center">
        <View className="flex flex-row justify-center">
          <Text className="text-2xl font-bold text-center">Log In</Text>
        </View>
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
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => handleLogin()}
          />
        </View>

        <View className="flex flex-row justify-center">
          <Pressable
            disabled={loading}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text className="underline mt-2">New here?</Text>
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
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
})
export default Login
