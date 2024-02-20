import "react-native-url-polyfill/auto"
import { NavStack } from "./app/NavStack"
import { NavigationContainer } from "@react-navigation/native"
import { UserAuthContextProvider } from "./app/context/auth"

export default function App() {
  return (
    <UserAuthContextProvider>
      <NavigationContainer>
        <NavStack />
      </NavigationContainer>
    </UserAuthContextProvider>
  )
}
