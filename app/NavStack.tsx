import { RootStackParamList, TabParamList } from "./@types/navigation"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Dashboard from "./Dashboard"
import GymDashboard from "./GymDashboard"
import { useUserAuth } from "./context/auth"
import { useState, useEffect } from "react"
import { FIREBASE_AUTH, db } from "../firebase"
import { doc, getDoc } from "@firebase/firestore"
import UserAuth from "./SignUpFlow/UserAuth"
import Login from "./components/Login"
import GymProfile from "./GymDashboard/GymProfile"
import UserProfile from "./Dashboard/UserProfile/UserProfile"
import NavBar from "./components/NavBar"
import Account from "./components/Account"
import QuestionOne from "./SignUpFlow/UserFlow/QuestionOne"
import QuestionTwo from "./SignUpFlow/UserFlow/QuestionTwo"
import IntialAddPhotos from "./SignUpFlow/UserFlow/IntialAddPhotos"
import GymQuestionTwo from "./SignUpFlow/GymFlow/GymQuestionTwo"
import GymInitialAddPhotos from "./SignUpFlow/GymFlow/InitialAddPhotos"
import GymQuestionOne from "./SignUpFlow/GymFlow/GymQuestionOne"

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

const GymFooter = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={GymDashboard} />
      <Tab.Screen name="Profile" component={GymProfile} />
    </Tab.Navigator>
  )
}

const UserFooter = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  )
}

const NavStack = () => {
  const { isSignedIn } = useUserAuth()
  // const { isUser } = useisUser()
  const [isUser, setIsUser] = useState<boolean>()

  useEffect(() => {
    const id = FIREBASE_AUTH.currentUser?.uid
    if (id) {
      const userRef = doc(db, "users", id)
      const getFunction = async () => {
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          setIsUser(true)
        } else {
          setIsUser(false)
        }
      }
      getFunction()
    }
  }, [])

  useEffect(() => {
    const id = FIREBASE_AUTH.currentUser?.uid
    if (id) {
      const userRef = doc(db, "user", id)
      const getFunction = async () => {
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          setIsUser(true)
        } else {
          setIsUser(false)
        }
      }
      getFunction()
    }
  }, [isSignedIn])

  //   UserQuestionOne: undefined
  //   UserQuestionTwo: undefined
  //   UserQuestionThree: undefined
  //   UserInitalAddPhoto: undefined
  //   GymQuestionOne: undefined
  //   GymQuestionTwo: undefined
  //   GymQuestionThree: undefined
  //   GymInitalAddPhoto: undefined
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => (isSignedIn ? <NavBar /> : null),
      }}
    >
      {isSignedIn ? (
        isUser ? (
          <>
            <Stack.Screen name="Footer" component={UserFooter} />
            <Stack.Screen name="UserDashboard" component={Dashboard} />
            <Stack.Screen name="UserQuestionOne" component={QuestionOne} />
            <Stack.Screen name="UserQuestionTwo" component={QuestionTwo} />
            <Stack.Screen
              name="UserInitalAddPhoto"
              component={IntialAddPhotos}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="GymFooter" component={GymFooter} />
            <Stack.Screen name="GymDashboard" component={GymDashboard} />
            <Stack.Screen name="GymQuestionOne" component={GymQuestionOne} />
            <Stack.Screen name="GymQuestionTwo" component={GymQuestionTwo} />
            <Stack.Screen
              name="GymInitalAddPhoto"
              component={GymInitialAddPhotos}
            />
          </>
        )
      ) : (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={UserAuth}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export { NavStack }
