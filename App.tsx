import "react-native-url-polyfill/auto"
import { NavStack } from "./app/NavStack"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { UserAuthContextProvider } from "./app/context/auth"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { LocationProvider } from "./app/context/LocationContext"
import { StyleSheet, View } from "react-native"

export default function App() {
  return (
    <UserAuthContextProvider>
      <LocationProvider>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <NavStack />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </LocationProvider>
    </UserAuthContextProvider>
  )
}
