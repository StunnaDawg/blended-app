import { doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { StyleSheet, View, Image } from "react-native"
import { db } from "../../firebase"
import getProfilePic from "../functions/getProfilePic"
import { UserProfile } from "../@types/firestore"

type ProfilePicProps = {
  id?: string
  size: number
}

export default function ProfilePic({ id, size = 150 }: ProfilePicProps) {
  const [avatarUrl, setAvatarUrl] = useState<string[] | undefined>([])
  const avatarSize = { height: size, width: size }

  useEffect(() => {
    if (id) getProfilePic(id, setAvatarUrl)
  }, [])

  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl[0] }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      <View></View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 64,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 696,
  },
})
