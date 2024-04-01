import { Dispatch, SetStateAction } from "react"
import { GymChatChannel } from "../@types/firestore"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../../firebase"

const getAllGymChannels = async (
  gymId: string,
  setChannelsData: Dispatch<SetStateAction<GymChatChannel[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    console.log("getting gym channels", gymId)
    const channelsCollectionRef = collection(db, "gyms", gymId, "channels")
    const channelsQuery = query(channelsCollectionRef)
    const querySnapshot = await getDocs(channelsQuery)

    const channels: GymChatChannel[] = []

    querySnapshot.forEach((doc) => {
      const channelData = doc.data()
      console.log("trying for", channelData)
      const channel: GymChatChannel = {
        channelId: doc.id,
        channelTitle: channelData.channelTitle,
        channelDescription: channelData.channelDescription,
        channelMessages: channelData.channelMessages,
        channelMembers: channelData.channelMembers,
      }
      channels.push(channel)
    })

    setChannelsData(channels)

    setLoading(false)
  } catch (err) {
    console.log("Error here")
    console.error(err)
    setLoading(false)
  }
}

export default getAllGymChannels
