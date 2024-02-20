import React, { createContext, useContext, useEffect, useState } from "react"
import { UserAuth, UserAuthAction } from "../@types/context"
import { FIREBASE_AUTH } from "../../firebase"

export type UserAuthContextType = UserAuth & UserAuthAction

type UserAuthContextProviderProps = {
  children: React.ReactNode
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
)

export const UserAuthContextProvider = ({
  children,
}: UserAuthContextProviderProps) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      setIsSignedIn(!!user)
    })
    return unsubscribe
  }, [])

  return (
    <UserAuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export const useUserAuth = (): UserAuthContextType => {
  const context = useContext(UserAuthContext)
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthContextProvider")
  }
  return context
}
