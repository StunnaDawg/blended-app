import { View, Text, SafeAreaView, Button } from "react-native"
import { FIREBASE_AUTH } from "../../firebase"

import { useNavigation } from "@react-navigation/native"
import { TabNavigationType } from "../@types/navigation"
const NavBar = () => {
  const navigation = useNavigation<TabNavigationType>()
  const handleSignOut = () => {
    try {
      FIREBASE_AUTH.signOut()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <>
      <SafeAreaView>
        <Text onPress={() => navigation.navigate("Dashboard")}>title</Text>
        <View>
          <Text>Hello {FIREBASE_AUTH.currentUser?.email}</Text>
          <Button title="Sign out" onPress={handleSignOut} />
        </View>
      </SafeAreaView>
    </>
  )
}

export default NavBar
