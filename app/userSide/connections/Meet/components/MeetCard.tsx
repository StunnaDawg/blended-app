import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TextInput,
} from "react-native"
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { UserProfile } from "../../../../@types/firestore"
import getUserProfile from "../../../../functions/getUserProfile"
import {
  DocumentSnapshot,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  serverTimestamp,
  addDoc,
  collection,
} from "firebase/firestore"
import { FIREBASE_AUTH, db, FIREBASE_APP } from "../../../../../firebase"
import mergeIds from "../../../../functions/mergeId"
import SingleImage from "../../../../components/SingleImage"
import SinglePic from "../../../../components/Avatar"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../../@types/navigation"
import ImageCarosel from "../../../../components/GymImageCarosel"
import UserImageCarosel from "../../../../components/UserProfileCarousel"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"

type RemoveFirstItem = () => void

type MeetCardProps = {
  id: string
  index: number
  nextProfile: Dispatch<SetStateAction<number>>
  removeFunction: RemoveFirstItem
}

const MeetCard = ({
  id,
  nextProfile,
  index,
  removeFunction,
}: MeetCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [matchesAge, setMatchesAge] = useState<number>()
  const [userData, setUserData] = useState<UserProfile>({} as UserProfile)
  const [currentUserData, setCurrentUserData] = useState<UserProfile>(
    {} as UserProfile
  )
  const [matchIdState, setMatchIdState] = useState<string>("")
  const [message, setMessageToSend] = useState<string>("")
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["25%", "50%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  const otherUser = userData.id
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    setLoading(true)
    getUserProfile(id, setUserData, setLoading)
    setLoading(false)
  }, [])

  useEffect(() => {
    getUserProfile(currentUser, setCurrentUserData, setLoading)
  }, [])

  useEffect(() => {
    console.log("Age", matchesAge)
  }, [matchesAge])

  useEffect(() => {
    setLoading(true)
    getUserProfile(id, setUserData, setLoading)
    setLoading(false)
  }, [index])

  const passUser = async () => {
    try {
      if (currentUser) {
        await setDoc(
          doc(db, "user", currentUser, "passes", userData.id),
          userData
        )
        nextProfile(index + 1)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const swipeUser = async () => {
    try {
      if (currentUser) {
        setDoc(doc(db, "user", currentUser, "messaged", userData.id), userData)
        setDoc(
          doc(db, "user", userData.id, "messaged", currentUser),
          currentUserData
        )
        setDoc(doc(db, "matches", mergeIds(currentUser, userData.id)), {
          users: {
            user1: currentUserData,
            user2: userData,
          },
          usersMatched: [currentUser, userData.id],
        })
        setMatchIdState(mergeIds(currentUser, userData.id))

        handlePresentModalPress()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const sendMessage = async () => {
    try {
      setLoading(true)
      await addDoc(collection(db, "matches", matchIdState, "messages"), {
        timestamp: serverTimestamp(),
        userId: currentUser,
        username: currentUserData.firstName,
        photoUrl: currentUserData.userPhotos[0],
        message: message,
      })

      setMessageToSend("")
      setLoading(false)
      dismiss()
      nextProfile(index + 1)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <ScrollView className="mb-20">
        <View className="flex flex-row justify-center items-center">
          <View className="flex flex-col items-center">
            <View>
              <Text className="font-bold text-xl">{userData.firstName}</Text>
            </View>

            <UserImageCarosel id={otherUser} profileType={userData} />

            <View className="border rounded-3xl bg-slate-200 px-4 py-3 m-2 w-96">
              <View className="my-1 ">
                {/* <Text>{birthdayDate ? birthdayDate : "No Age on Profile"}</Text> */}
                <Text className="text-black/50 text-xs font-bold">
                  Trains at...
                </Text>
              </View>
              <View className="flex flex-row">
                <View className="border border-black bg-slate-300 rounded-2xl p-2 mx-1">
                  <Text className="text-xs font-bold">
                    {" "}
                    {"Blended Athletics"}
                  </Text>
                </View>
              </View>
            </View>

            <View className="border rounded-3xl bg-slate-200 px-4 py-3 m-2 w-96">
              <View className="my-1">
                <Text className="text-black/50 text-xs font-bold">
                  About Me
                </Text>
              </View>
              <View>
                {userData.about && (
                  <Text className="text-md font-bold"> {userData.about}</Text>
                )}
              </View>
            </View>

            <View className="border rounded-3xl bg-slate-200 px-4 py-3 m-2 w-96">
              <View className="my-1">
                <Text className="text-black/50 text-xs font-bold">
                  Activites
                </Text>
              </View>
              <View className="my-1">
                {userData.activities?.length > 0 && (
                  <View className="flex flex-row">
                    {userData.activities.map((activity, index) => (
                      <View
                        key={index}
                        className="border border-black bg-slate-300 rounded-2xl p-2 mx-1"
                      >
                        <Text className="text-xs font-bold">{activity}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View className="border rounded-3xl bg-slate-200 px-4 py-3 m-2 w-96">
              <View className="my-1 ">
                <Text className="text-black/50 text-xs font-bold">
                  I am looking for...
                </Text>
              </View>
              <View className="flex flex-row">
                <View className="border border-black rounded-2xl bg-slate-300 p-2 mx-1">
                  {userData.intentions && (
                    <Text className="text-xs font-bold">
                      {" "}
                      {userData.intentions}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View className="flex flex-row border rounded-3xl bg-slate-200 px-4 py-3 m-2 w-96 ">
              <View>
                <View className="my-1">
                  <Text className="text-black/50 text-xs font-bold">
                    Essentials
                  </Text>
                </View>
                <View className="flex flex-row flex-wrap">
                  {userData.diet && (
                    <View className="border border-black rounded-2xl bg-slate-300 p-2 mx-1">
                      <Text className="text-xs font-bold">{userData.diet}</Text>
                    </View>
                  )}
                  {userData.zodiac && (
                    <View className="border border-black rounded-2xl bg-slate-300 p-2 mx-1">
                      <Text className="text-xs font-bold">
                        {" "}
                        {userData.zodiac}
                      </Text>
                    </View>
                  )}
                  {userData.education && (
                    <View className="border border-black bg-slate-300 rounded-2xl p-2 mx-1">
                      <Text className="text-xs font-bold">
                        {userData.education}
                      </Text>
                    </View>
                  )}
                  {userData.jobTitle && (
                    <View className="border border-black rounded-2xl bg-slate-300 p-2 mx-1">
                      <Text className="text-xs font-bold">
                        {userData.jobTitle}
                      </Text>
                    </View>
                  )}
                  {userData.school && (
                    <View className="border border-black rounded-2xl bg-slate-300 p-2 mx-1">
                      <Text className="text-xs font-bold">
                        {userData.school}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View className="flex flex-row">
              <View className="mx-2">
                <Pressable
                  className="border rounded-3xl bg-red-700 p-3"
                  onPress={async () => {
                    await passUser()
                  }}
                >
                  <Text className="font-bold">Pass</Text>
                </Pressable>
              </View>
              <View className="mx-2">
                <Pressable
                  className="border rounded-3xl p-3"
                  onPress={async () => {
                    await swipeUser()
                  }}
                >
                  <Text className="font-bold">Message!</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View className="flex flex-row justify-center my-2 pt-2 border-t">
          <TextInput
            placeholder={loading ? "sending..." : "Send a Message"}
            className=" flex-1 border rounded-xl h-8 w-64 p-2 "
            value={message}
            onChangeText={(message: string) => {
              setMessageToSend(message)
            }}
          />
          <Pressable
            className="mx-2"
            onPress={async () => {
              await sendMessage()
            }}
          >
            <Text className="font-bold">Send</Text>
          </Pressable>
        </View>
      </BottomSheetModal>
    </>
  )
}

export default MeetCard
