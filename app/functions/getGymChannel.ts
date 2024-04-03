import { Dispatch, SetStateAction } from "react"
import { GymChatChannel } from "../@types/firestore"
import { db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"

const getGymChannel = async (
  gymId: string,
  channelId: string,
  setChannelData: Dispatch<SetStateAction<GymChatChannel>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const gymChannelRef = doc(db, "gyms", gymId, "channels", channelId)
    const channelDoc = await getDoc(gymChannelRef)

    if (channelDoc.exists()) {
      const channelData = { ...channelDoc.data() }
      const channelId = channelData.id
      const channelStateData = {
        channelId: channelId,
        channelTitle: channelData.channelTitle,
        channelDescription: channelData.channelDescription,
        channelMessages: channelData.channelMessages,
        channelMembers: channelData.channelMembers,
      } as GymChatChannel

      setChannelData(channelStateData)
    }

    setLoading(false)
  } catch (err) {
    console.error(err)
    setLoading(false)
  }
}

export default getGymChannel
