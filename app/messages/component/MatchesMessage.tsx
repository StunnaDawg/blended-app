import { View, Text } from "react-native"
import React from "react"
import SinglePic from "../../components/Avatar"

type MatchesMessageProps = {
  id: string
  message: string
}

const MatchesMessage = ({ id, message }: MatchesMessageProps) => {
  return (
    <View>
      <View className="flex flex-row justify-start flex-wrap mt-2 items-center mx-1">
        <SinglePic
          size={50}
          id={id}
          picNumber={0}
          avatarRadius={150}
          noAvatarRadius={10}
          collection="user"
          photoType="userPhotos"
        />
        <View className="rounded-2xl border mx-1 bg-blue-200 w-40 p-2">
          <Text className="text-xs">
            {message}
            HiddddddddddddddddddHidddddddddddddddddd
          </Text>
        </View>
      </View>
    </View>
  )
}

export default MatchesMessage
