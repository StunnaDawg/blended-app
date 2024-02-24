import { View, Text, Button } from "react-native"
import React, { useEffect, useState } from "react"
import ProfilePic from "../../components/Avatar"
import { FIREBASE_AUTH, db } from "../../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { id } from "date-fns/locale"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const UserProfile = () => {
  const [name, setName] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const navigation = useNavigation<NavigationType>()
  const currentId = FIREBASE_AUTH.currentUser?.uid

  const getUserNameAge = async () => {
    if (currentId) {
      const userRef = doc(db, "user", currentId)

      const docSnap = await getDoc(userRef)

      if (docSnap.exists()) {
        const userData = { ...docSnap.data() }

        setName(userData.first_name)
        setAge(userData.age)
      }
    }
  }

  useEffect(() => {
    getUserNameAge()
  }, [])
  return (
    <View>
      <ProfilePic
        size={200}
        id={FIREBASE_AUTH.currentUser?.uid}
        picNumber={0}
        avatarRadius={646}
        noAvatarRadius={646}
        collection="user"
      />
      <Text>
        {name}, {age}
      </Text>
      <Button
        title="edit profile"
        onPress={() => navigation.navigate("UserEditProfile")}
      />
    </View>
  )
}

export default UserProfile
