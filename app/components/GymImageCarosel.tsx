import { View } from "react-native"
import Carousel from "pinar"
import SinglePic from "./Avatar"
import { GymProfile } from "../@types/firestore"

type CarouselProps = {
  id?: string
  profileType: GymProfile
}

const GymImageCarosel = ({ id, profileType }: CarouselProps) => {
  return (
    <View>
      <Carousel height={350} showsDots={false} autoplay={true}>
        {profileType.gymPhotos ? (
          profileType.gymPhotos?.map((item, index) => (
            <View key={index}>
              {/* Key should be unique for each element */}
              <SinglePic
                key={index} // Key for each SinglePic component
                id={id}
                size={350}
                picNumber={index}
                collection={"gyms"}
                photoType={"gymPhotos"}
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

export default GymImageCarosel
