import { View, Text, Pressable, Image, ScrollView, Button } from "react-native"
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { UserProfile } from "../@types/firestore"
import { FIREBASE_AUTH, db } from "../../firebase"
import { NavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import getUserProfile from "../functions/getUserProfile"
import { doc, getDoc, setDoc } from "firebase/firestore"
import mergeIds from "../functions/mergeId"
import SinglePic from "./Avatar"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"

type MeetCardProps = {
  id: string
}

const ViewUserProfile = ({ id }: MeetCardProps) => {
  const [userData, setUserData] = useState<UserProfile>({} as UserProfile)
  const [currentUserData, setCurrentUserData] = useState<UserProfile>(
    {} as UserProfile
  )
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  const otherUser = userData.id
  const navigation = useNavigation<NavigationType>()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["25%", "100%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  useEffect(() => {
    getUserProfile(id, setUserData)
  }, [])

  useEffect(() => {
    getUserProfile(currentUser, setCurrentUserData)
  }, [])

  return (
    <>
      <Pressable
        className="rounded mx-1 border-black border w-24 h-32 overflow-hidden"
        onPress={() => {
          handlePresentModalPress()
        }}
      >
        <SinglePic
          size={125}
          id={id}
          picNumber={0}
          avatarRadius={10}
          noAvatarRadius={10}
          collection="user"
          photoType="userPhotos"
        />
        {/* <Image
              source={{ uri: userImage }}
              onError={(error) => console.error("Image loading error:", error)}
            /> */}
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View className="flex flex-row justify-center items-center">
          <View className="flex flex-col items-center">
            <Button title="dismiss" onPress={() => dismiss()} />
            <View>
              <Text className="font-bold text-xl">{userData.firstName}</Text>
            </View>

            <SinglePic
              size={200}
              id={otherUser}
              picNumber={0}
              avatarRadius={10}
              noAvatarRadius={10}
              collection="user"
              photoType="userPhotos"
            />

            <View className="border rounded-3xl bg-slate-200 px-4 py-3 m-2 w-96">
              <View className="my-1 ">
                <Text className="text-black/50 text-xs font-bold">
                  Trains at...
                </Text>
              </View>
              <View className="flex flex-row">
                <View className="border border-black bg-slate-300 rounded-2xl p-2 mx-1">
                  <Text className="text-xs font-bold"> Blended Athletics</Text>
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
                  {userData.food && (
                    <View className="border border-black rounded-2xl bg-slate-300 p-2 mx-1">
                      <Text className="text-xs font-bold">{userData.food}</Text>
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
          </View>
        </View>
      </BottomSheetModal>
    </>
  )
}

export default ViewUserProfile
