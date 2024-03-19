import { View, Text } from "react-native"
import React from "react"
import DefaultButton from "../../../components/DefaultButton"
import requestToGym from "../../../functions/requestToGym"

type RequestToBeMemberProps = {
  gymId: string
}

const RequestToBeMember = ({ gymId }: RequestToBeMemberProps) => {
  return (
    <View>
      <DefaultButton
        text={"Request to Join"}
        buttonFunction={() => requestToGym(gymId, "memberRequests")}
      />
    </View>
  )
}

export default RequestToBeMember
