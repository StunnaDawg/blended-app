import { View, Text, Dimensions } from "react-native"
import React, { useEffect, useState } from "react"
import Carousel from "react-native-reanimated-carousel"
import getProfilePic from "../functions/getProfilePic"

type CarouselProps = {
  id?: string
  size: number
  picNumber: number
  avatarRadius: number
  collection: string
  photoType: string
}

const ImageCarosel = ({ id, collection, photoType }: CarouselProps) => {
  const [avatarUrls, setAvatarUrls] = useState<string[]>([])

  const width = Dimensions.get("window").width

  useEffect(() => {
    const fetchAvatar = async () => {
      if (id) {
        await getProfilePic(id, setAvatarUrls, collection, photoType)
      }
    }

    fetchAvatar()
  }, [id, collection, photoType])
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[avatarUrls]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default ImageCarosel
