import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TabNavigationProp } from "@react-navigation/native"

export type RootStackParamList = {
  Footer: undefined
  SignUp: undefined
  Login: undefined
  GymDashboard: undefined
  UserDashboard: undefined
  GymFooter: undefined
  UserEditProfile: undefined
  UserQuestionOne: undefined
  UserQuestionTwo: undefined
  UserQuestionThree: undefined
  UserInitalAddPhoto: undefined
  ChooseUserActivity: undefined
  GymQuestionOne: undefined
  GymQuestionTwo: undefined
  GymQuestionThree: undefined
  GymInitalAddPhoto: undefined
  GymEditProfile: undefined
}

export type NavigationType = NativeStackNavigationProp<RootStackParamList>

export type TabParamList = {
  Dashboard: undefined
  Profile: undefined
  Connections: undefined
}

export type TabNavigationType = TabNavigationProp<TabParamList>

export type RouteParamsType = {}
