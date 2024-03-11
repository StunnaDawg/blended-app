import DefaultButton from "../../../components/DefaultButton"
import requestToGym from "../../../functions/requestToGym"

type RequestToBeCoachProps = {
  gymId: string
}

const RequestToBeCoach = ({ gymId }: RequestToBeCoachProps) => {
  return (
    <DefaultButton
      text={"Request to be a Coach"}
      buttonFunction={() => requestToGym(gymId, "coachRequests")}
    />
  )
}

export default RequestToBeCoach
