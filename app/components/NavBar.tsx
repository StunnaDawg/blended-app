import { View, Text, SafeAreaView, Button, Pressable } from "react-native"
import { FIREBASE_AUTH } from "../../firebase"
import { FontAwesome6 } from "@expo/vector-icons"
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
      <SafeAreaView className="flex flex-row justify-between items-center m-5">
        <Text
          className="text-2xl font-bold"
          onPress={() => navigation.navigate("Events")}
        >
          Train With Us
        </Text>
        <Pressable onPress={() => navigation.navigate("UserSettings")}>
          <FontAwesome6 name="user-gear" size={20} color="black" />
        </Pressable>
      </SafeAreaView>
    </>
  )
}

export default NavBar
