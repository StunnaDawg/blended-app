import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Image,
  Button,
  Pressable,
  Text,
  Alert,
} from "react-native"
import { FIREBASE_AUTH, db } from "../../firebase"
import getProfilePic from "../functions/getProfilePic"
import UploadSingleImage from "./UploadSingleImage"
import DeleteSingleImage from "./DeleteSingleImage"
import uploadImage from "../functions/uploadImage"

type ImageGridProps = {
  id?: string
  size: number
  collectionRef: string
  photoType: string
}

export default function ImageGrid({
  id,
  size = 150,
  collectionRef,
  photoType,
}: ImageGridProps) {
  const [avatarUrl, setAvatarUrl] = useState<string[]>([])
  const [imagePicked, setImagepicked] = useState<boolean>(false)
  const [newDownloadImage, setNewDownloadImage] = useState<string>("")
  const avatarSize = { height: size, width: size }
  const placeholdersCount = Math.max(6 - (avatarUrl?.length || 0), 0)
  const placeholderArray = new Array(placeholdersCount).fill("")
  const currentId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    uploadImageNOW()
  }, [imagePicked])

  const submitNewUserPhotos = async (downloadImage: string) => {
    try {
      if (currentId) {
        const userRef = doc(db, "user", currentId)

        await updateDoc(userRef, {
          userPhotos: arrayUnion(downloadImage),
        })
      } else {
        console.log("User does not exist")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const uploadImageNOW = async () => {
    console.log("try")
    if (newDownloadImage) {
      console.log("made it through")
      uploadImage(
        newDownloadImage,
        currentId + "image",
        newDownloadImage,
        submitNewUserPhotos
      )
    }
  }

  useEffect(() => {
    if (id) getProfilePic(id, setAvatarUrl, collectionRef, photoType)
  }, [])

  return (
    <View className="flex flex-row justify-center flex-wrap">
      {/* {avatarUrl
        ?.concat(placeholderArray)
        .slice(0, 6)
        .map((url, index) =>
          url !== "" ? (
            <>
              <View
                className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-800 border-1 border-solid border-gray-200 border-r-10"
                key={url}
                style={[avatarSize]}
              >
                <Image
                  className="overflow-hidden max-w-full rounded-lg object-cover pt-0"
                  key={index}
                  source={{ uri: url }}
                  accessibilityLabel="Avatar"
                  style={[avatarSize]}
                />
                <DeleteSingleImage
                  fileLocation={url}
                  setNewUrl={setAvatarUrl}
                  index={index}
                />
              </View>
            </>
          ) : (
            <View
              className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-600 border-1 border-solid border-gray-200 border-r-10"
              key={index}
              style={[avatarSize]}
            >
              <UploadSingleImage
                setImageTrigger={setImagepicked}
                imageTrigger={imagePicked}
                setDownloadNewImage={setNewDownloadImage}
              />
            </View>
          )
        )} */}
    </View>
  )
}
