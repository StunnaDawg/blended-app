import { Text, View } from "react-native"
import Carousel from "pinar"
import SinglePic from "./Avatar"
import { UserProfile } from "../@types/firestore"

type CarouselProps = {
  id?: string
  profileType: UserProfile
}

const UserImageCarosel = ({ id, profileType }: CarouselProps) => {
  return (
    <View>
      <Carousel height={500}>
        {profileType.userPhotos ? (
          profileType.userPhotos?.map((item, index) => (
            <View key={index}>
              <Text>Hi</Text>
              <SinglePic
                key={index} // Key for each SinglePic component
                id={id}
                size={500}
                picNumber={index}
                collection={"user"}
                photoType={"userPhotos"}
                avatarRadius={10}
                noAvatarRadius={10}
              />
            </View>
          ))
        ) : (
          <></> // or any other fallback JSX element
        )}
      </Carousel>
    </View>
  )
}

export default UserImageCarosel
