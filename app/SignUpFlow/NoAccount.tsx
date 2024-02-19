import { View, Text, AppState, StyleSheet, Pressable } from "react-native"
import React from "react"
import { Button } from "react-native-elements"
import { supabase } from "../../lib/supabase"
import { Link } from "expo-router"
import UserAuth from "./UserAuth"

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const NoAccount = () => {
  return (
    <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <Link href="SignUpFlow/UserAuth" asChild>
          <Pressable>
            <Text>User Sign Up</Text>
          </Pressable>
        </Link>
        <Button title="Gym" />
        <Button title="Already have an Account?" />
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

export default NoAccount
