import {
  RootStackParamList,
  TabNavigationType,
  TabParamList,
} from "./@types/navigation"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Dashboard from "./userSide/Dashboard"
import GymChat from "./gymSide/GymDashboard/GymChat"
import { useUserAuth } from "./context/auth"
import { useState, useEffect } from "react"
import { FIREBASE_AUTH, db } from "../firebase"
import { doc, getDoc } from "@firebase/firestore"
import UserAuth from "./SignUpFlow/UserAuth"
import Login from "./components/Login"
import GymProfile from "./gymSide/GymEditProfile/GymProfile"
import UserProfile from "./userSide/Dashboard/UserProfile/UserProfile"
import NavBar from "./components/NavBar"
import QuestionOne from "./SignUpFlow/UserFlow/QuestionOne"
import QuestionTwo from "./SignUpFlow/UserFlow/QuestionTwo"
import IntialAddPhotos from "./SignUpFlow/UserFlow/IntialAddPhotos"
import GymQuestionTwo from "./SignUpFlow/GymFlow/GymQuestionTwo"
import GymInitialAddPhotos from "./SignUpFlow/GymFlow/InitialAddPhotos"
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
import ViewEvent from "./userSide/Dashboard/Events/ViewEvent"
import GymTopTabs from "./userSide/gyms/components/GymViewComponents/GymTopTabs"
import About from "./userSide/gyms/components/GymViewComponents/About"
import AttendingEvent from "./userSide/Dashboard/Events/AttendingEvent"
import ViewUserProfileScreen from "./components/ViewUserProfileScreen"
import ViewGymMembers from "./userSide/gyms/components/ViewGymMembers"
import UserSettings from "./userSide/UserSettings"
import { FontAwesome6 } from "@expo/vector-icons"
import { useSwitchAccount } from "./context/switchAccountContext"
import { useNavigation } from "@react-navigation/native"
import CreateGymPage from "./userSide/gyms/CreateGymPage"
import HomeGym from "./userSide/Dashboard/HomeGym/HomeGym"
import CreateNewChannel from "./gymSide/GymDashboard/CreateNewChannel"
import GymMembersModal from "./userSide/gyms/components/GymMembersModal"
import ModerateUsers from "./gymSide/GymRequests/ModerateUsers"
import CurrentGymSettings from "./userSide/Dashboard/HomeGym/CurrentGymSettings"

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()
const TopTab = createMaterialTopTabNavigator<TabParamList>()

const GymFooter = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="GymDashboard" component={GymChat} />
      <Tab.Screen name="GymEvents" component={EventsTab} />
      <Tab.Screen name="Profile" component={GymProfile} />
      <Tab.Screen name="Requests" component={GymRequests} />
    </Tab.Navigator>
  )
}

const GymScreens = () => {
  const { isSignedIn } = useUserAuth()
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GymFooter" component={GymFooter} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="EditEvent" component={EditEvent} />
        <Stack.Screen name="GymEditProfile" component={EditGymProfileHome} />
        <Stack.Screen name="UserSettings" component={UserSettings} />
        <Stack.Screen name="CreateNewChannel" component={CreateNewChannel} />
        <Stack.Screen name="GymQuestionTwo" component={GymQuestionTwo} />
        <Stack.Screen name="GymModerateMembers" component={ModerateUsers} />
        <Stack.Screen
          name="GymInitalAddPhoto"
          component={GymInitialAddPhotos}
        />
      </Stack.Navigator>
    </>
  )
}

const UserFooter = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: () => {
          let iconName

          if (route.name === "Events") {
            iconName = "calendar"
          } else if (route.name === "Gyms") {
            iconName = "dumbbell"
          } else if (route.name === "Profile") {
            iconName = "user-pen"
          } else if (route.name === "Connections") {
            iconName = "people-group"
          } else if (route.name === "Messages") {
            iconName = "message"
          }

          // You can return any component that you like here!
          return <FontAwesome6 name={iconName} size={20} color={"black"} />
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Gyms" component={GymsTab} />
      <Tab.Screen name="Profile" component={UserProfile} />
      <Tab.Screen name="Connections" component={Meet} />
      <Tab.Screen name="Messages" component={MessageTab} />
      <Tab.Screen name="HomeGym" component={HomeGym} />
    </Tab.Navigator>
  )
}

const NavStack = () => {
  const { isSignedIn } = useUserAuth()
  // const { isUser } = useisUser()
  const [isUser, setIsUser] = useState<boolean>()
  const [switchToGymAccount, setToGymAccount] = useState<boolean>(false)
  const navigation = useNavigation<TabNavigationType>()

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
        <>
          <Stack.Group>
            <Stack.Screen name="Footer" component={UserFooter} />
            <Stack.Screen name="ViewGymTopTabs" component={GymTopTabs} />
            <Stack.Screen name="UserDashboard" component={Dashboard} />
            <Stack.Screen name="AttendingEvent" component={AttendingEvent} />
            <Stack.Screen name="UserSettings" component={UserSettings} />

            <Stack.Screen name="CreateGym" component={CreateGymPage} />

            <Stack.Screen
              name="CurrentGymSettings"
              component={CurrentGymSettings}
            />

            <Stack.Screen
              name="ViewUserProfile"
              component={ViewUserProfileScreen}
            />
            <Stack.Screen
              name="ViewGymMembersScreen"
              component={ViewGymMembers}
            />
            <Stack.Screen
              name="ChooseUserActivity"
              component={ChooseActivity}
            />

            <Stack.Screen name="Meet" component={Meet} />

            <Stack.Screen name="UserEditProfile" component={EditProfileHome} />
            <Stack.Screen name="ViewGymScreen" component={ViewGymProfile} />
            <Stack.Screen name="ViewEvent" component={ViewEvent} />
            <Stack.Screen name="UserQuestionOne" component={QuestionOne} />
            <Stack.Screen name="UserQuestionTwo" component={QuestionTwo} />
            <Stack.Screen name="UserQuestionThree" component={QuestionThree} />
            <Stack.Screen name="UserQuestionFour" component={QuestionFour} />
            <Stack.Screen name="UserQuestionFive" component={QuestionFive} />
            <Stack.Screen
              name="UserInitalAddPhoto"
              component={IntialAddPhotos}
            />
            <Stack.Screen name="MessagingScreen" component={MessageScreen} />
            <Stack.Screen name="GymScreens" component={GymScreens} />
          </Stack.Group>

          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="MatchModal" component={MatchModal} />
            <Stack.Screen name="LoadModal" component={LoadModal} />
          </Stack.Group>
        </>
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
