// import { useState } from "react"
// import { Alert } from "react-native"

// const setUserType = async () => {
//   try {
//     if (!session?.user) throw new Error("No user on the session!")

//     const updates = {
//       id: session?.user.id,
//       is_gym: isgym,
//       updated_at: new Date(),
//     }

//     const { error } = await supabase.from("profiles").upsert(updates)

//     if (error) {
//       throw error
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       Alert.alert(error.message)
//     }
//   }
// }

// export default setUserType
