import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"
import UpdateQuestionThree from "./components/UpdateQuestionThree"
import { FIREBASE_AUTH } from "../../../firebase"

const QuestionThree = () => {
  const [intentions, setIntentions] = useState<string>("")
  const currentId = FIREBASE_AUTH.currentUser?.uid

  const getBgColorClass = (choice: string) =>
    intentions === choice ? "bg-blue" : "bg-white"
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <View className="items-center">
          <Text className="text-xl font-bold">Looking For...</Text>
          <Text>Don't worry you can change this later</Text>
        </View>

        <View className="flex flex-row justify-center m-10">
          <Pressable
            className={`justify-center items-center border h-24 mx-2 rounded w-24 ${getBgColorClass(
              "Social"
            )}`}
            onPress={async () => {
              setIntentions("Social")
            }}
          >
            <Text className="text-center">Social</Text>
          </Pressable>
          <Pressable
            className={`justify-center items-center border h-24 mx-2 rounded w-24 ${getBgColorClass(
              "Dating"
            )}`}
            onPress={async () => {
              setIntentions("Dating")
            }}
          >
            <Text className="text-center">Dating</Text>
          </Pressable>
          <Pressable
            className={`justify-center items-center border h-24 mx-2 rounded w-24 ${getBgColorClass(
              "Business"
            )}`}
            onPress={async () => {
              setIntentions("Business")
            }}
          >
            <Text className="text-center">Business</Text>
          </Pressable>
        </View>
        <View className="items-center">
          <UpdateQuestionThree id={currentId} intentions={intentions} />
        </View>
      </View>
    </>
  )
}

export default QuestionThree
