import "react-native-url-polyfill/auto"
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import NoAccount from "./SignUpFlow/NoAccount"
import Account from "./components/Account"
import { Alert, View } from "react-native"
import { Session } from "@supabase/supabase-js"
import UserAuth from "./SignUpFlow/UserAuth"

export default function AppStart() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isGym, setIsGym] = useState<boolean>(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  async function getUserType() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error("No user on the session!")

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`is_gym`)
        .eq("id", session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setIsGym(data.is_gym)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <UserAuth />
      )}
    </View>
  )
}
