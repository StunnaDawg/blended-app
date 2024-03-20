import { View, Text, Pressable } from "react-native"
import React, { useCallback, useMemo, useRef } from "react"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { UserProfile } from "../../../@types/firestore"

type GymMembersModalProps = {
  members: UserProfile[] | undefined
}

const GymMembersModal = ({ members }: GymMembersModalProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["1%", "100%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  return (
    <>
      <Pressable
        onPress={() => {
          handlePresentModalPress()
        }}
      >
        <Text>Open</Text>
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <Pressable
          onPress={() => {
            dismiss()
          }}
        >
          <Text>Dismiss</Text>
        </Pressable>
        <View>
          {members !== undefined ? (
            members.length > 0 &&
            members.map((member) => (
              <View key={member.id}>
                <Text>Name: {member.firstName}</Text>
              </View>
            ))
          ) : (
            <View>No Members</View>
          )}
        </View>
      </BottomSheetModal>
    </>
  )
}

export default GymMembersModal
