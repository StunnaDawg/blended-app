import "react-native-url-polyfill/auto"
import { NavStack } from "./app/NavStack"
import { NavigationContainer } from "@react-navigation/native"
import { UserAuthContextProvider } from "./app/context/auth"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

export default function App() {
  return (
    <UserAuthContextProvider>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavStack />
        </GestureHandlerRootView>
      </NavigationContainer>
    </UserAuthContextProvider>
  )
}
