import { DocumentReference, doc, getDoc } from "firebase/firestore"
import { Image } from "expo-image"
import { useState, useEffect, SetStateAction, Dispatch } from "react"
import { StyleSheet, View } from "react-native"
import { db } from "../../firebase"
import getProfilePic from "../functions/getProfilePic"
import { Event, UserProfile } from "../@types/firestore"

type SinglePicProps = {
  id?: string
  size: number
  avatarRadius: number
  noAvatarRadius: number
  docRef: DocumentReference
}

const getSinglePhoto = async (
  id: string,
  setProfilePic: Dispatch<SetStateAction<string>>,
  docRef: DocumentReference
) => {
  try {
    if (id) {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const userData = { ...docSnap.data() } as Event
        const photo = userData.eventPhoto

        setProfilePic(photo)
      }
    }
  } catch (err) {
    console.error(err)
  }
}
export default function SinglePicNoArray({
  id,
  size = 150,
  avatarRadius,
  noAvatarRadius,
  docRef,
}: SinglePicProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("")
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
        await getSinglePhoto(id, setAvatarUrl, docRef)
      }
    }

    fetchAvatar()
  }, [id])

  useEffect(() => {
    console.log("fetched photo", avatarUrl)
  }, [avatarUrl])

  return (
    <View>
      {avatarUrl && avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
    </View>
  )
}
