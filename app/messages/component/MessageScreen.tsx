import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../components/Avatar"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { RootStackParamList, RouteParamsType } from "../../@types/navigation"

const MessageScreen = () => {
  const [matchIdState, setMatchIdState] = useState<string>()
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, "MessagingScreen">>()
  const matchId = route.params?.id

  useEffect(() => {
    setMatchIdState(matchId)
  }, [])
  return (
    <View>
      <View>
        <Text>hi {matchIdState}</Text>
      </View>
    </View>
  )
}

export default MessageScreen
