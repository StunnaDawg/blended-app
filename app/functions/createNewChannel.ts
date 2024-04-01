import { addDoc, collection, updateDoc } from "firebase/firestore"
import { GymChatChannel } from "../@types/firestore"
import { db } from "../../firebase"
import { Dispatch, SetStateAction } from "react"

const createNewChannelFunc = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  gymId: string,
  channelName: string,
  channelDescription: string
) => {
  try {
    setLoading(true)
    const gymChannelsRef = collection(db, "gyms", gymId, "channels")
    const addChannel = await addDoc(gymChannelsRef, {
      channelTitle: channelName,
      channelDescription: channelDescription,
    })

    await updateDoc(addChannel, {
      channelId: addChannel.id,
    })
  } catch (err) {
    setLoading(false)
    console.error(err)
  } finally {
    console.log("gym Created")
    setLoading(false)
  }
}

export default createNewChannelFunc
