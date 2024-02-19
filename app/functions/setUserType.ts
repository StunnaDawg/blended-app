import { Session } from "@supabase/supabase-js"
import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { Alert } from "react-native"

const setUserType = async (isgym: boolean, session: Session) => {
  try {
    if (!session?.user) throw new Error("No user on the session!")

    const updates = {
      id: session?.user.id,
      is_gym: isgym,
      updated_at: new Date(),
    }

    const { error } = await supabase.from("profiles").upsert(updates)

    if (error) {
      throw error
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message)
    }
  }
}

export default setUserType
