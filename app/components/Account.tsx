import { useState, useEffect } from "react"
import { StyleSheet, View, Alert, Text } from "react-native"
import { Button, Input } from "react-native-elements"
import Avatar from "./Avatar"

export default function Account() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [website, setWebsite] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  // async function updateProfile({
  //   username,
  //   website,
  //   avatar_url,
  // }: {
  //   username: string
  //   website: string
  //   avatar_url: string
  // }) {
  //   try {
  //     setLoading(true)
  //     if (!session?.user) throw new Error("No user on the session!")

  //     const updates = {
  //       id: session?.user.id,
  //       username,
  //       website,
  //       avatar_url,
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
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <View style={styles.container}>
      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url)
            // updateProfile({ username, website, avatar_url: url })
          }}
        />
      </View>
      <View></View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={"email"} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Website"
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          // onPress={() =>
          //   // updateProfile({ username, website, avatar_url: avatarUrl })
          // }
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => console.log("sign out")} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
})
