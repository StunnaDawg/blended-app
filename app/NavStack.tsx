import { RootStackParamList, TabParamList } from "./@types/navigation"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Dashboard from "./userSide/Dashboard"
import GymDashboard from "./gymSide/GymDashboard"
import { useUserAuth } from "./context/auth"
import { useState, useEffect } from "react"
import { FIREBASE_AUTH, db } from "../firebase"
import { doc, getDoc } from "@firebase/firestore"
import UserAuth from "./SignUpFlow/UserAuth"
import Login from "./components/Login"
import GymProfile from "./gymSide/GymDashboard/GymProfile"
import UserProfile from "./userSide/Dashboard/UserProfile/UserProfile"
import NavBar from "./components/NavBar"
import QuestionOne from "./SignUpFlow/UserFlow/QuestionOne"
import QuestionTwo from "./SignUpFlow/UserFlow/QuestionTwo"
import IntialAddPhotos from "./SignUpFlow/UserFlow/IntialAddPhotos"
import GymQuestionTwo from "./SignUpFlow/GymFlow/GymQuestionTwo"
import GymInitialAddPhotos from "./SignUpFlow/GymFlow/InitialAddPhotos"
import GymQuestionOne from "./SignUpFlow/GymFlow/GymQuestionOne"
import EditProfileHome from "./userSide/UserEditProfile/EditProfileHome"
import ChooseActivity from "./components/ChooseActivity"
import EditGymProfileHome from "./gymSide/GymEditProfile/EditProfileHome"
import Meet from "./userSide/connections/Meet/Meet"
import MatchModal from "./components/MatchModal"
import LoadModal from "./components/LoadModal"
import MessageTab from "./userSide/messages/MessageTab"
import MessageScreen from "./userSide/messages/component/MessageScreen"
import QuestionThree from "./SignUpFlow/UserFlow/QuestionThree"
import QuestionFive from "./SignUpFlow/UserFlow/QuestionFive"
import QuestionFour from "./SignUpFlow/UserFlow/QuestionFour"
import GymsTab from "./userSide/gyms/GymsTab"
import ViewGymProfile from "./userSide/gyms/components/ViewGymProfile"
import GymRequests from "./gymSide/GymRequests/GymRequests"
import EventsTab from "./gymSide/Events/EventsTab"
import CreateEvent from "./gymSide/Events/CreateEvent"
import EditEvent from "./gymSide/Events/EditEvent"
import Events from "./userSide/Dashboard/Events/Events"

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
      <Tab.Screen name="GymEvents" component={EventsTab} />
      <Tab.Screen name="Profile" component={GymProfile} />
      <Tab.Screen name="Requests" component={GymRequests} />
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
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Gyms" component={GymsTab} />
      <Tab.Screen name="Profile" component={UserProfile} />
      <Tab.Screen name="Connections" component={Meet} />
      <Tab.Screen name="Messages" component={MessageTab} />
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
            <Stack.Group>
              <Stack.Screen name="Footer" component={UserFooter} />
              <Stack.Screen name="UserDashboard" component={Dashboard} />
              <Stack.Screen
                name="ChooseUserActivity"
                component={ChooseActivity}
              />

              <Stack.Screen name="Meet" component={Meet} />

              <Stack.Screen
                name="UserEditProfile"
                component={EditProfileHome}
              />
              <Stack.Screen name="UserQuestionOne" component={QuestionOne} />
              <Stack.Screen name="UserQuestionTwo" component={QuestionTwo} />
              <Stack.Screen
                name="UserQuestionThree"
                component={QuestionThree}
              />
              <Stack.Screen name="UserQuestionFour" component={QuestionFour} />
              <Stack.Screen name="UserQuestionFive" component={QuestionFive} />
              <Stack.Screen
                name="UserInitalAddPhoto"
                component={IntialAddPhotos}
              />
              <Stack.Screen name="MessagingScreen" component={MessageScreen} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
              <Stack.Screen name="MatchModal" component={MatchModal} />
              <Stack.Screen name="LoadModal" component={LoadModal} />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Screen name="GymFooter" component={GymFooter} />
            <Stack.Screen name="CreateEvent" component={CreateEvent} />
            <Stack.Screen name="EditEvent" component={EditEvent} />
            <Stack.Screen
              name="GymEditProfile"
              component={EditGymProfileHome}
            />
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
