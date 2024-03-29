import { View, Text, Pressable, Button } from "react-native"
import React, { useCallback, useMemo, useRef } from "react"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { UserProfile } from "../../../@types/firestore"
import SinglePic from "../../../components/Avatar"

type MeetCardProps = {
  matchProfile: UserProfile
}

const ViewMessageUserProfile = ({ matchProfile }: MeetCardProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["25%", "100%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  return (
    <>
      <Pressable
        className="rounded-3xl mx-1 border-black border overflow-hidden"
        onPress={async () => {
          console.log(matchProfile)
          handlePresentModalPress()
        }}
      >
        <SinglePic
          size={50}
          id={matchProfile.id}
          picNumber={0}
          avatarRadius={10}
          noAvatarRadius={10}
          collection="user"
          photoType="userPhotos"
        />
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
              <Text className="font-bold text-xl">
                {matchProfile.firstName}
              </Text>
            </View>

            <SinglePic
              size={200}
              id={matchProfile.id}
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
                  <Text className="text-xs font-bold">Blended</Text>
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
                {matchProfile.about && (
                  <Text className="text-md font-bold">
                    {" "}
                    {matchProfile.about}
                  </Text>
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
                {matchProfile.activities?.length > 0 && (
                  <View className="flex flex-row">
                    {matchProfile.activities.map((activity, index) => (
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
                  {matchProfile.intentions && (
                    <Text className="text-xs font-bold">
                      {" "}
                      {matchProfile.intentions}
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
                  {matchProfile.diet && (
                    <View className="border border-black rounded-2xl bg-slate-300 p-2 mx-1">
                      <Text className="text-xs font-bold">
                        {matchProfile.diet}
                      </Text>
                    </View>
                  )}
                  {matchProfile.zodiac && (
                    <View className="border border-black rounded-2xl bg-slate-300 p-2 mx-1">
                      <Text className="text-xs font-bold">
                        {" "}
                        {matchProfile.zodiac}
                      </Text>
                    </View>
                  )}
                  {matchProfile.education && (
                    <View className="border border-black bg-slate-300 rounded-2xl p-2 mx-1">
                      <Text className="text-xs font-bold">
                        {matchProfile.education}
                      </Text>
                    </View>
                  )}
                  {matchProfile.jobTitle && (
                    <View className="border border-black rounded-2xl bg-slate-300 p-2 mx-1">
                      <Text className="text-xs font-bold">
                        {matchProfile.jobTitle}
                      </Text>
                    </View>
                  )}
                  {matchProfile.school && (
                    <View className="border border-black rounded-2xl bg-slate-300 p-2 mx-1">
                      <Text className="text-xs font-bold">
                        {matchProfile.school}
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

export default ViewMessageUserProfile
