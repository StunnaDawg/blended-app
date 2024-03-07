import { View, Text, Button } from "react-native"
import { useState } from "react"
import DateTimePicker from "@react-native-community/datetimepicker"

const QuestionFour = () => {
  const [date, setDate] = useState(new Date())

  return (
    <View>
      <Text>selected: {date.toLocaleString()}</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(_, newDate) => {
          if (newDate) setDate(newDate)
        }}
      />
    </View>
  )
}

export default QuestionFour
