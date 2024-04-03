import { View, Text, Button } from "react-native"
import { useState } from "react"
import DateTimePicker from "@react-native-community/datetimepicker"
import UpdateQuestionFour from "./components/UpdateQuestionFour"
import { FIREBASE_AUTH } from "../../../firebase"

const QuestionFour = () => {
  const [date, setDate] = useState(new Date())
  const currentDate: Date = new Date()
  const currentId = FIREBASE_AUTH.currentUser?.uid

  // Calculate the difference in years
  let age: number = currentDate.getFullYear() - date.getFullYear()

  // Adjust for cases where the birthday hasn't occurred yet this year
  if (
    currentDate.getMonth() < date.getMonth() ||
    (currentDate.getMonth() === date.getMonth() &&
      currentDate.getDate() < date.getDate())
  ) {
    age--
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex flex-row justify-center m-2">
        <View>
          <Text className="font-semibold text-xl">You must be 18 or Older</Text>
          <Text className="text-center text-sm">Age: {age}</Text>
        </View>
      </View>
      <DateTimePicker
        value={date}
        mode="date"
        display="spinner"
        onChange={(_, newDate) => {
          if (newDate) setDate(newDate)
        }}
      />
      <UpdateQuestionFour disable={age < 18} id={currentId} birthday={date} />
    </View>
  )
}

export default QuestionFour
