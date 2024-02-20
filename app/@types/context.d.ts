import { Dispatch, SetStateAction } from "react"

export type UserAuth = {
  isSignedIn: boolean
}

export type UserAuthAction = {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>
}
