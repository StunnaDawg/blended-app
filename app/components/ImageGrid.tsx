import { doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { StyleSheet, View, Image } from "react-native"
import { db } from "../../firebase"
import getProfilePic from "../functions/getProfilePic"
import { UserProfile } from "../@types/firestore"

type ImageGridProps = {
  id?: string
  size: number
}

export default function ImageGrid({ id, size = 100 }: ImageGridProps) {
  const [avatarUrl, setAvatarUrl] = useState<string[] | undefined>([
    "",
    "",
    "",
    "",
    "",
    "",
  ])
  const avatarSize = { height: size, width: size }
  const placeholdersCount = Math.max(6 - (avatarUrl?.length || 0), 0)
  const placeholderArray = new Array(placeholdersCount).fill("")
  const styles = StyleSheet.create({
    avatar: {
      borderRadius: 10,
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
      borderRadius: 10,
    },
  })

  useEffect(() => {
    if (id) getProfilePic(id, setAvatarUrl, "user")
  }, [])

  return (
    <View className="flex flex-row justify-center flex-wrap">
      {avatarUrl
        ?.concat(placeholderArray)
        .slice(0, 6)
        .map((url, index) =>
          url !== "" ? (
            <View
              key={index}
              style={[avatarSize, styles.avatar, styles.noImage]}
            >
              <Image
                key={index}
                source={{ uri: url }}
                accessibilityLabel="Avatar"
                style={[avatarSize, styles.avatar, styles.image]}
              />
            </View>
          ) : (
            <View
              key={index}
              style={[avatarSize, styles.avatar, styles.noImage]}
            />
          )
        )}
    </View>
  )
}
