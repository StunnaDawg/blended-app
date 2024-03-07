export type GymProfile = {
  gym_id: string
  gym_title: string
  gym_style: string
  country: string
  province: string
  city: string
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
  homeGym: GymProfile | null
  userPhotos: string[]
  birthday?: Date
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
