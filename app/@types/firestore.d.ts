export type GymProfile = {
  id: string
  title: string
  fitnessStyle: string
  country: string
  province: string
  city: string
  photosUri?: string[]
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
  food: string | null
  zodiac: string | null
  education: string | null
  career: string | null
  school: string | null
  homeGym: GymProfile | null
  userPhotos: string[]
}

export type Activities = {
  name: string
}
