import { View, Text, Pressable } from "react-native"
import React, { Dispatch, SetStateAction, useEffect } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import { GymChatChannel } from "../../../../@types/firestore"

type ChannelProps = {
  channelData: GymChatChannel
  setChannelData: Dispatch<SetStateAction<GymChatChannel>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

const Channel = ({ channelData, setChannelData, setLoading }: ChannelProps) => {
  const setChannelDataFunc = () => {
    setChannelData(channelData)
  }
  return (
    <Pressable
      className="flex flex-row items-center my-2"
      onPress={() => {
        setChannelDataFunc()
      }}
    >
      <Text className="mx-2 font-semibold text-xs">
        {channelData.channelTitle}
      </Text>
      <FontAwesome6 name="hashtag" size={10} color="black" />
    </Pressable>
  )
}

export default Channel
