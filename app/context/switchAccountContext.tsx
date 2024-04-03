import React, { createContext, useContext, useState, ReactNode } from "react"

// Define the shape of the context data
interface SwitchAccountContextType {
  isSwitchAccount: boolean
  switchAccount: () => void
}

// Create the context
const SwitchAccountContext = createContext<
  SwitchAccountContextType | undefined
>(undefined)

// Context provider component
const SwitchAccountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSwitchAccount, setIsSwitchAccount] = useState<boolean>(false)

  const switchAccount = () => {
    setIsSwitchAccount(!isSwitchAccount)
  }

  return (
    <SwitchAccountContext.Provider value={{ isSwitchAccount, switchAccount }}>
      {children}
    </SwitchAccountContext.Provider>
  )
}

// Custom hook to use the context
const useSwitchAccount = () => {
  const context = useContext(SwitchAccountContext)
  if (context === undefined) {
    throw new Error(
      "useSwitchAccount must be used within a SwitchAccountProvider"
    )
  }
  return context
}

export { SwitchAccountProvider, useSwitchAccount }
