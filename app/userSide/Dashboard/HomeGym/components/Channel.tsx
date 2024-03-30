import { View, Text, Pressable } from "react-native"
import React, { Dispatch, SetStateAction, useEffect } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import { GymChatChannel } from "../../../../@types/firestore"

type ChannelProps = {
  channelData: GymChatChannel
  setChannelData: Dispatch<SetStateAction<GymChatChannel>>
}

const Channel = ({ channelData, setChannelData }: ChannelProps) => {
  const setChannelDataFunc = () => {
    setChannelData(channelData)
  }
  return (
    <Pressable
      className="flex flex-row items-center"
      onPress={() => {
        setChannelDataFunc()
      }}
    >
      <Text className="mx-2 font-semibold text-sm">
        {channelData.channelTitle}
      </Text>
      <FontAwesome6 name="hashtag" size={16} color="black" />
    </Pressable>
  )
}

export default Channel
