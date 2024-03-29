import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TabNavigationProp } from "@react-navigation/native"
import { UserProfile } from "./firestore"

export type RootStackParamList = {
  Footer: undefined
  SignUp: undefined
  Login: undefined
  GymDashboard: undefined
  UserDashboard: undefined
  Meet: undefined
  Community: undefined
  FindWorkout: undefined
  GymFooter: undefined
  ViewEvent: {
    id: string
    eventId: string
  }
  UserEditProfile: undefined
  ViewUserProfile: {
    userProfile: UserProfile
  }
  UserQuestionOne: undefined
  UserQuestionTwo: undefined
  UserQuestionThree: undefined
  UserQuestionFour: undefined
  UserQuestionFive: undefined
  UserInitalAddPhoto: undefined
  ChooseUserActivity: undefined
  GymQuestionOne: undefined
  GymQuestionTwo: undefined
  GymQuestionThree: undefined
  GymInitalAddPhoto: undefined
  GymMessages: undefined
  GymEditProfile: undefined
  MatchModal: undefined
  LoadModal: undefined
  CreateEvent: undefined
  AttendingEvent: {
    eventId: string
  }
  EditEvent: {
    eventId: string
  }
  MessagingScreen: {
    id: string
    matchDocId: string
  }
  GymMessagingScreen: {
    id: string
    userDocId: string
  }
  ViewGymScreen: {
    id?: string
    gymId: string
  }
  ViewGymTopTabs: undefined
}

export type NavigationType = NativeStackNavigationProp<RootStackParamList>

export type TabParamList = {
  Dashboard: undefined
  Profile: undefined
  Connections: undefined
  Messages: undefined
  Gyms: undefined
  Requests: undefined
  GymEvents: undefined
  Events: undefined
  AboutGym: undefined
  GymMembers: undefined
  GymPhotos: undefined
}

export type TabNavigationType = TabNavigationProp<TabParamList>

export type RouteParamsType = {
  id?: string
  matchDocId: string
  eventId: string
  gymId: string
}
