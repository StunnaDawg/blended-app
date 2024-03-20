import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import * as Location from "expo-location"
import { LocationObject } from "expo-location"

type LocationContextType = {
  location: LocationObject | null
  errorMsg: string | null
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
)

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}

type LocationProviderProps = {
  children: ReactNode
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [location, setLocation] = useState<LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    let subscriber: Location.LocationSubscription | null = null

    const subscribe = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }

      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Low,
          distanceInterval: 1000,
        },
        (newLocation) => {
          setLocation(newLocation)
        }
      )
    }

    subscribe()

    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [])

  return (
    <LocationContext.Provider value={{ location, errorMsg }}>
      {children}
    </LocationContext.Provider>
  )
}
