import { DocumentReference, doc, getDoc } from "firebase/firestore"
import { Image } from "expo-image"
import { useState, useEffect, SetStateAction, Dispatch, ReactNode } from "react"
import { ImageBackground, StyleSheet, View } from "react-native"
import { db } from "../../firebase"
import getProfilePic from "../functions/getProfilePic"
import { Event, UserProfile } from "../@types/firestore"
import getSinglePhoto from "../functions/getSinglePhoto"

type SinglePicProps = {
  photo: string
  height: number
  width: number
  avatarRadius: number
  noAvatarRadius: number
  docRef: DocumentReference
  children: ReactNode
  setLoading: Dispatch<SetStateAction<boolean>>
}

export default function SinglePicBackGround({
  photo,
  height,
  width,
  avatarRadius,
  noAvatarRadius,
  docRef,
  children,
  setLoading,
}: SinglePicProps) {
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

  // useEffect(() => {
  //   const fetchAvatar = async () => {
  //     if (id) {
  //       await getSinglePhoto(id, setAvatarUrl, docRef, setLoading)
  //     }
  //   }

  //   fetchAvatar()
  // }, [id])

  return (
    <ImageBackground
      source={{ uri: photo || "your_default_image_uri_here" }}
      style={[avatarSize, styles.avatar]}
      imageStyle={styles.image}
    >
      {!photo && <View style={[avatarSize, styles.noImage]} />}
      {children}
    </ImageBackground>
  )
}
