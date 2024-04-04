import { ActivityIndicator, Text, View } from "react-native"
import SinglePic from "../../../../components/Avatar"
import { useEffect, useState } from "react"
import { UserProfile } from "../../../../@types/firestore"
import getUserProfile from "../../../../functions/getUserProfile"

type MessageProps = {
  id: string
  message: string
}

const Message = ({ id, message }: MessageProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)
  useEffect(() => {
    getUserProfile(id, setUserProfile, setLoading)
  }, [])
  return (
    <View>
      <View className="mx-3">
        <Text className="font-bold">
          {!loading ? userProfile.firstName : <ActivityIndicator />}
        </Text>
      </View>
      <View className="flex flex-row justify-start flex-wrap mt-2 items-center m-1 my-2">
        <SinglePic
          size={30}
          id={id}
          picNumber={0}
          avatarRadius={150}
          noAvatarRadius={10}
          collection="user"
          photoType="userPhotos"
        />
        <View className="rounded-2xl border mx-1 bg-slate-200 p-2">
          <Text className="text-xs">{message}</Text>
        </View>
      </View>
    </View>
  )
}

export default Message
