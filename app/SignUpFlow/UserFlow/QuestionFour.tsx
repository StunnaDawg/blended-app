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
    <View>
      <Text>Age: {age}</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="spinner"
        onChange={(_, newDate) => {
          if (newDate) setDate(newDate)
        }}
      />
      <UpdateQuestionFour id={currentId} birthday={date} />
    </View>
  )
}

export default QuestionFour
