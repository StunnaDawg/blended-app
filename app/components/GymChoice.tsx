import { View, Text, Button } from "react-native"
import React, { useEffect, useState } from "react"
import setUserType from "../functions/setUserType"
import { supabase } from "../../lib/supabase"
import { Session } from "@supabase/supabase-js"
import { router } from "expo-router"

const GymChoice = () => {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      <Button
        title="Gym?"
        onPress={() => {
          if (session) setUserType(false, session)
          router.navigate("components/Account")
        }}
      />
      <Button
        title="User"
        onPress={() => {
          if (session) setUserType(true, session)
          router.navigate("components/Account")
        }}
      />
    </View>
  )
}

export default GymChoice
