import { View, Text, TextInput } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import UpdateQuestionTwo from "./components/UpdateQuestionTwo"
import { FIREBASE_AUTH } from "../../../firebase"

type CheckBoxProps = {
  gender: string
  input: boolean
  genderState: Dispatch<SetStateAction<boolean>>
  genderBool: boolean
  otherState: Dispatch<SetStateAction<boolean>>
  otherStateBool: boolean
  otherState2: Dispatch<SetStateAction<boolean>>
  otherStateBool2: boolean
  otherState3: Dispatch<SetStateAction<boolean>>
  otherStateBool3: boolean
}

const CheckBox = ({
  gender,
  input,
  genderState,
  genderBool,
  otherState,
  otherStateBool,
  otherState2,
  otherStateBool2,
  otherState3,
  otherStateBool3,
}: CheckBoxProps) => {
  useEffect(() => {
    console.log(otherState, otherState2, otherState3)
  }, [genderState])
  return (
    <>
      {input ? (
        <>
          <View className="flex flex-row justify-between items-center p-2">
            <Text className="text-lg font-semibold">{gender}</Text>
            <BouncyCheckbox
              isChecked={genderBool}
              onPress={() => {
                genderState(!genderBool)
                otherState(false)
                otherState2(false)
                otherState3(false)
              }}
            />
          </View>
          <View className="items-center">
            <TextInput
              placeholder="Specify your gender here..."
              className="h-9 border-2 w-96 rounded p-1"
            />
          </View>
        </>
      ) : (
        <View className="flex flex-row justify-between items-center border-b p-2">
          <Text className="text-lg font-semibold">{gender}</Text>
          <BouncyCheckbox
            isChecked={genderBool}
            onPress={() => {
              genderState(!genderBool)
              otherState(false)
              otherState2(false)
              otherState3(false)
            }}
          />
        </View>
      )}
    </>
  )
}

const QuestionTwo = () => {
  const [male, setMale] = useState<boolean>(false)
  const [female, setFemale] = useState<boolean>(false)
  const [nonBinary, setNonBinary] = useState<boolean>(false)
  const [specify, setSpecify] = useState<boolean>(false)
  const [specifyInput, setSpecifyInput] = useState<string>("")
  const currentId = FIREBASE_AUTH.currentUser?.uid

  useEffect(() => {
    console.log(male, female, nonBinary, specify)
  }, [male])
  return (
    <View>
      <View>
        <Text className="font-bold text-2xl">Specifiy your Gender...</Text>
      </View>
      <CheckBox
        gender="Male"
        input={false}
        genderState={setMale}
        genderBool={male}
        otherState={setFemale}
        otherStateBool={female}
        otherState2={setNonBinary}
        otherStateBool2={nonBinary}
        otherState3={setSpecify}
        otherStateBool3={specify}
      />
      <CheckBox
        gender="Female"
        input={false}
        genderState={setFemale}
        genderBool={female}
        otherState={setMale}
        otherStateBool={male}
        otherState2={setNonBinary}
        otherStateBool2={nonBinary}
        otherState3={setSpecify}
        otherStateBool3={specify}
      />
      <CheckBox
        gender="Non-Binary"
        input={false}
        genderState={setNonBinary}
        genderBool={nonBinary}
        otherState={setFemale}
        otherStateBool={female}
        otherState2={setMale}
        otherStateBool2={male}
        otherState3={setSpecify}
        otherStateBool3={specify}
      />
      <CheckBox
        gender="Specify other..."
        input={true}
        genderState={setSpecify}
        genderBool={specify}
        otherState={setFemale}
        otherStateBool={female}
        otherState2={setNonBinary}
        otherStateBool2={nonBinary}
        otherState3={setMale}
        otherStateBool3={male}
      />

      <UpdateQuestionTwo
        id={currentId}
        gender={
          male
            ? "Male"
            : female
            ? "Female"
            : nonBinary
            ? "Non-Binary"
            : specify
            ? specifyInput
            : ""
        }
      />
    </View>
  )
}

export default QuestionTwo
