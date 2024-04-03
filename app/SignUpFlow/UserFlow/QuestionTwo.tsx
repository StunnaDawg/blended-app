import { View, Text, TextInput } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import UpdateQuestionTwo from "./components/UpdateQuestionTwo"
import { FIREBASE_AUTH } from "../../../firebase"

const CheckBox = ({
  gender,
  input,
  isSelected,
  onSelect,
}: {
  gender: string
  input: boolean
  isSelected: boolean
  onSelect: () => void
}) => {
  return (
    <>
      <View className="flex flex-row justify-between items-center p-2">
        <Text className="text-lg font-semibold">{gender}</Text>
        <BouncyCheckbox isChecked={isSelected} onPress={onSelect} />
      </View>
      {input && (
        <View className="items-center">
          <TextInput
            placeholder="Specify your gender here..."
            className="h-9 border-2 w-96 rounded p-1"
          />
        </View>
      )}
    </>
  )
}

type GenderOption = "Male" | "Female" | "Non-Binary" | "Specify other..." | null

const QuestionTwo: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<GenderOption>("Male")
  const [specifyInput, setSpecifyInput] = useState<string>("")

  const currentId = FIREBASE_AUTH.currentUser?.uid

  const handleSelectGender = (gender: GenderOption) => {
    // Toggle gender selection off if the same gender is selected again
    setSelectedGender(selectedGender === gender ? null : gender)
  }

  // A simplified array to manage gender options
  const genderOptions: GenderOption[] = [
    "Male",
    "Female",
    "Non-Binary",
    "Specify other...",
  ]

  useEffect(() => {
    console.log(selectedGender)
  }, [selectedGender])
  return (
    <View>
      <Text className="font-bold text-2xl">Specify your Gender...</Text>
      {genderOptions.map((gender, index) => (
        <View
          key={index}
          className="flex flex-row justify-between items-center p-2"
        >
          <Text className="text-lg font-semibold">{gender}</Text>
          <BouncyCheckbox
            disableBuiltInState={true}
            isChecked={selectedGender === gender}
            onPress={() => handleSelectGender(gender)}
          />
          {gender === "Specify other..." &&
            selectedGender === "Specify other..." && (
              <TextInput
                value={specifyInput}
                onChangeText={setSpecifyInput}
                placeholder="Specify your gender here..."
                className="h-9 border-2 w-48 rounded p-1"
              />
            )}
        </View>
      ))}

      <UpdateQuestionTwo id={currentId} gender={selectedGender} />
    </View>
  )
}

export default QuestionTwo
