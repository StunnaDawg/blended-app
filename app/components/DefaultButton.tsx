import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"

type DefaultButtonProps = {
  text: string
  buttonFunction?: () => void
}

const DefaultButton = ({ text, buttonFunction }: DefaultButtonProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false)

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }
  return (
    <Pressable
      onPress={buttonFunction}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={
        isPressed
          ? "w-28 border p-1 rounded bg-white"
          : "w-28 border p-1 rounded bg-slate-200"
      }
    >
      <Text className="text-center text-lg font-semibold">{text}</Text>
    </Pressable>
  )
}

export default DefaultButton
