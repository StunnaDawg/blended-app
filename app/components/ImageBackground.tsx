import { DocumentReference, doc, getDoc } from "firebase/firestore"
import { Image } from "expo-image"
import { useState, useEffect, SetStateAction, Dispatch, ReactNode } from "react"
import { ImageBackground, StyleSheet, View } from "react-native"
import { db } from "../../firebase"
import getProfilePic from "../functions/getProfilePic"
import { Event, UserProfile } from "../@types/firestore"

type SinglePicProps = {
  id?: string
  height: number
  width: number
  avatarRadius: number
  noAvatarRadius: number
  docRef: DocumentReference
  children: ReactNode
  setLoading: Dispatch<SetStateAction<boolean>>
}

const getSinglePhoto = async (
  id: string,
  setProfilePic: Dispatch<SetStateAction<string>>,
  docRef: DocumentReference,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (id) {
      setLoading(true)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const userData = { ...docSnap.data() } as Event
        const photo = userData.eventPhoto

        setProfilePic(photo)
        setLoading(false)
      }
      setLoading(false)
    }

    setLoading(false)
  } catch (err) {
    setLoading(false)
    console.error(err)
  }
}
export default function SinglePicBackGround({
  id,
  height,
  width,
  avatarRadius,
  noAvatarRadius,
  docRef,
  children,
  setLoading,
}: SinglePicProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const avatarSize = { height: height, width: width }

  const styles = StyleSheet.create({
    avatar: {
      borderRadius: 0,
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
        await getSinglePhoto(id, setAvatarUrl, docRef, setLoading)
      }
    }

    fetchAvatar()
  }, [id])

  useEffect(() => {
    console.log("fetched photo", avatarUrl)
  }, [avatarUrl])

  return (
    <ImageBackground
      source={{ uri: avatarUrl || "your_default_image_uri_here" }}
      style={[avatarSize, styles.avatar]}
      imageStyle={styles.image}
    >
      {!avatarUrl && <View style={[avatarSize, styles.noImage]} />}
      {children}
    </ImageBackground>
  )
}
