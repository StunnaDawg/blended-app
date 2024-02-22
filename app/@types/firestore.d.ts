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
  exerciseChoices: string[]
  intentions: string
  homeGym?: GymProfile
  userPhotos?: string[]
}

export type Activities = {
  name: string
}
