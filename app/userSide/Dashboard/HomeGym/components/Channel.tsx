import { View, Text, Pressable } from "react-native"
import React, { Dispatch, SetStateAction, useEffect } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import { GymChatChannel } from "../../../../@types/firestore"

type ChannelProps = {
  channelData: GymChatChannel
  setChannelData: Dispatch<SetStateAction<GymChatChannel>>
  setLoading: Dispatch<SetStateAction<boolean>>
  handlePresentModalPress: () => void
}

const Channel = ({
  channelData,
  setChannelData,
  setLoading,
  handlePresentModalPress,
}: ChannelProps) => {
  const setChannelDataFunc = async () => {
    setChannelData(channelData)
  }
  return (
    <Pressable
      className="flex flex-row items-center my-2"
      onPress={async () => {
        await setChannelDataFunc()
        handlePresentModalPress()
      }}
    >
      <FontAwesome6 name="hashtag" size={16} color="black" />
      <Text className="mx-2 font-semibold text-lg">
        {channelData.channelTitle}
      </Text>
    </Pressable>
  )
}

export default Channel
