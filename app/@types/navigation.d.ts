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
  ViewGymProfile: undefined
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
}

export type TabNavigationType = TabNavigationProp<TabParamList>

export type RouteParamsType = {
  id?: string
  matchDocId: string
}
