import { doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { StyleSheet, View, Image, Button, Pressable, Text } from "react-native"
import { db } from "../../firebase"
import getProfilePic from "../functions/getProfilePic"
import { UserProfile } from "../@types/firestore"
import UploadSingleImage from "./UploadSingleImage"
import DeleteSingleImage from "./DeleteSingleImage"

type ImageGridProps = {
  id?: string
  size: number
}

export default function ImageGrid({ id, size = 150 }: ImageGridProps) {
  const [avatarUrl, setAvatarUrl] = useState<string[]>([])
  const avatarSize = { height: size, width: size }
  const placeholdersCount = Math.max(6 - (avatarUrl?.length || 0), 0)
  const placeholderArray = new Array(placeholdersCount).fill("")

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
            <>
              <View
                className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-800 border-1 border-solid border-gray-200 border-r-10"
                key={index}
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
              <UploadSingleImage fileLocation={url} index={index} />
            </View>
          )
        )}
    </View>
  )
}
