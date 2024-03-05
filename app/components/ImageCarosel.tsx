import { View, Text, Dimensions, Image } from "react-native"
import React, { useEffect, useState } from "react"
import Carousel from "pinar"
import getProfilePic from "../functions/getProfilePic"
import SinglePic from "./Avatar"

type CarouselProps = {
  id?: string
  collection: string
  photoType: string
}

const ImageCarosel = ({ id, collection, photoType }: CarouselProps) => {
  const width = Dimensions.get("window").width

  return (
    <View>
      <Carousel height={500}>
        <View>
          <SinglePic
            id={id}
            size={500}
            picNumber={0}
            collection="user"
            photoType="userPhotos"
            avatarRadius={10}
            noAvatarRadius={10}
          />
        </View>

        <View>
          <SinglePic
            id={id}
            size={500}
            picNumber={1}
            collection="user"
            photoType="userPhotos"
            avatarRadius={10}
            noAvatarRadius={10}
          />
        </View>
      </Carousel>
    </View>
  )
}

export default ImageCarosel
