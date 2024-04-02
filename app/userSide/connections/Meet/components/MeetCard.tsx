import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
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
import { GymProfile, UserProfile } from "../../../../@types/firestore"
import getUserProfile from "../../../../functions/getUserProfile"
import {
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  collection,
} from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../../firebase"
import mergeIds from "../../../../functions/mergeId"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../../@types/navigation"
import UserImageCarosel from "../../../../components/UserProfileCarousel"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import getSingleGym from "../../../../functions/getSingleGym"
import InfoSection from "./InfoSections"

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
  const [homeGym, setHomeGym] = useState<GymProfile>({} as GymProfile)
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

  useEffect(() => {
    setLoading(true)
    getUserProfile(id, setUserData, setLoading)
    setLoading(false)
  }, [])

  useEffect(() => {
    getUserProfile(currentUser, setCurrentUserData, setLoading)
  }, [])

  useEffect(() => {
    setLoading(true)
    getUserProfile(id, setUserData, setLoading)
    setLoading(false)
  }, [index])

  useEffect(() => {
    if (userData.homeGym) {
      getSingleGym(userData.homeGym, setHomeGym, setLoading)
    }
  }, [userData])

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
      <View className="flex-1">
        <View className="m-2 border-2">
          <UserImageCarosel id={otherUser} profileType={userData} />
        </View>
        <View className="flex flex-row justify-start items-center m-3">
          <Text className="font-bold text-3xl text-black">
            {userData.firstName}
          </Text>
        </View>
        <InfoSection
          title="Essentials"
          boldness={"font-semibold"}
          content="Dalhousie"
          content2="Foodie"
          content3={null}
          tags={false}
          activities={null}
        />

        {homeGym.gym_title ? (
          <InfoSection
            title="Trains At.."
            boldness={"font-semibold"}
            content={homeGym.gym_title}
            content2={null}
            content3={null}
            tags={false}
            activities={null}
          />
        ) : null}

        {userData.intentions ? (
          <InfoSection
            title="Looking"
            boldness={"font-semibold"}
            content={userData.intentions}
            content2={null}
            content3={null}
            tags={false}
            activities={null}
          />
        ) : null}

        {userData.activities?.length > 0 && userData.activities ? (
          <InfoSection
            title="Activity Interests"
            boldness={"font-semibold"}
            content={null}
            content2={null}
            content3={null}
            tags={true}
            activities={userData.activities}
          />
        ) : null}
      </View>

      <View className="flex flex-row justify-center">
        <View className="mx-2">
          <Pressable
            className="border bg-red rounded-3xl bg-red-700 p-3"
            onPress={async () => {
              await passUser()
            }}
          >
            <Text className="font-bold text-black">Pass</Text>
          </Pressable>
        </View>
        <View className="mx-2">
          <Pressable
            className="border border-orange rounded-3xl p-3"
            onPress={async () => {
              await swipeUser()
            }}
          >
            <Text className="font-bold">Message!</Text>
          </Pressable>
        </View>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Needed for absolute positioning of children
  },
  overlayContent: {
    position: "absolute", // Keep the content positioned absolutely
    left: 0,
    right: 0,
    bottom: 0, // Anchor the content to the bottom
    flexDirection: "row",
    justifyContent: "flex-end", // Align content to the bottom
    alignItems: "center", // Center content horizontally
    // Add padding or a specific height if needed to control the overlay size
    padding: 10, // Example padding, adjust as needed
    // height: 100, // Optional: If you want a specific height for your overlay
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add a background color to enhance readability
  },
  text: {
    // Styling for the text
    color: "#fff", // White color for better visibility
    fontSize: 20,
    // Add more styling as needed
  },
})
