import { TimeStamp } from "firebase/firestore"

export type GymProfile = {
  gym_id: string
  gym_title: string
  gym_style: string
  country: string
  province: string
  city: string
  about?: string
  members?: UserProfile[]
  coaches?: UserProfile[]
  gymPhotos?: string[]
}

export type UserProfile = {
  id: string
  firstName: string
  lastName: string
  gender: string
  about: string | null
  activities: string[]
  personalRecords?: string[]
  intentions: string
  diet: string | null
  zodiac: string | null
  education: string | null
  jobTitle: string | null
  school: string | null
  homeGym: string | null
  userPhotos: string[]
  birthday: TimeStamp
  gyms: string[]
}

export type Activities = {
  name: string
}

export type Match = {
  id: string
  users: {
    user1: UserProfile
    user2: UserProfile
  }
  usersMatched: string[]
}

export type Messages = {
  id: string
  message: string
  userId: string
  photoUrl: string
  timeStamp: string
  userName: string
}

export type Event = {
  id: string
  gymHost: string
  eventTitle: string
  description: string
  date: Date | Timestamp
  location: string
  price: string
  attendees: UserProfile[]
  eventPhoto: string
}

export type GymRequest = {
  userProfile: UserProfile
}
