import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TabNavigationProp } from "@react-navigation/native"

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
  UserEditProfile: undefined
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
  GymEditProfile: undefined
  MatchModal: undefined
  LoadModal: undefined
  CreateEvent: undefined
  EditEvent: {
    eventId: string
  }
  MessagingScreen: {
    id: string
    matchDocId: string
  }
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
}

export type TabNavigationType = TabNavigationProp<TabParamList>

export type RouteParamsType = {
  id?: string
  matchDocId: string
  eventId: string
}
