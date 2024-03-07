import { doc, getDoc } from "firebase/firestore"
import { Image } from "expo-image"
import { useState, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { db } from "../../firebase"
import getProfilePic from "../functions/getProfilePic"
import { UserProfile } from "../@types/firestore"

type SinglePicProps = {
  id?: string
  size: number
  picNumber: number
  avatarRadius: number
  noAvatarRadius: number
  collection: string
  photoType: string
}

export default function SinglePic({
  id,
  size = 150,
  picNumber,
  avatarRadius,
  noAvatarRadius,
  collection,
  photoType,
}: SinglePicProps) {
  const [avatarUrl, setAvatarUrl] = useState<string[]>([])
  const avatarSize = { height: size, width: size }

  const styles = StyleSheet.create({
    avatar: {
      borderRadius: avatarRadius,
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
      borderRadius: noAvatarRadius,
    },
  })

  useEffect(() => {
    const fetchAvatar = async () => {
      if (id) {
        await getProfilePic(id, setAvatarUrl, collection, photoType)
      }
    }

    fetchAvatar()
  }, [id, collection, photoType])

  useEffect(() => {
    console.log("fetched photo", avatarUrl)
  }, [avatarUrl])

  return (
    <View>
      {avatarUrl && avatarUrl ? (
        <Image
          source={{ uri: avatarUrl[picNumber] }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
    </View>
  )
}
