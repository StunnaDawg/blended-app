import { addDoc, collection, updateDoc } from "firebase/firestore"
import { GymChatChannel } from "../@types/firestore"
import { db } from "../../firebase"
import { Dispatch, SetStateAction } from "react"

const createNewChannelFunc = async (
  gymId: string,
  channelName: string,
  channelDescription: string
) => {
  try {
    const gymChannelsRef = collection(db, "gyms", gymId, "channels")
    const addChannel = await addDoc(gymChannelsRef, {
      channelTitle: channelName,
      channelDescription: channelDescription,
    })

    await updateDoc(addChannel, {
      channelId: addChannel.id,
    })
  } catch (err) {
    console.error(err)
  }
}

export default createNewChannelFunc
