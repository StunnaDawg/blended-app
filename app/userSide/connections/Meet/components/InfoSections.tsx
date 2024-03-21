import { View, Text } from "react-native"
import React from "react"
import { Activities } from "../../../../@types/firestore"
import ActivityTags from "../../../../components/ActivityTags"

type InfoSectionProps = {
  title: string
  content: string | null
  content2: string | null
  content3: string | null
  boldness: string | null
  tags: boolean
  activities: string[] | null
}

const InfoSection = ({
  title,
  content,
  content2,
  content3,
  tags,
  activities,
}: InfoSectionProps) => {
  return (
    <View className="w-full m-1 h-18 p-4 bg-blue items-start rounded-xl">
      <View className="flex flex-row justify-start pb-2">
        <Text className="text-xs font-semibold">{title}</Text>
      </View>
      {!tags ? (
        <View className="flex flex-row justify-start">
          <View>
            {content ? (
              <View className="mb-1">
                <Text className="text-xs">{content}</Text>
              </View>
            ) : null}
            {content2 ? (
              <View className="mb-1">
                <Text className="text-xs">{content2}</Text>
              </View>
            ) : null}
            {content3 ? (
              <View className="mb-1">
                <Text className="text-xs">{content3}</Text>
              </View>
            ) : null}
          </View>
        </View>
      ) : null}

      {tags && activities ? (
        <View className="flex flex-row flex-wrap justify-start">
          {activities.map((activity) => {
            return (
              <View key={activity}>
                <View className="mt-1">
                  <ActivityTags activity={activity} />
                </View>
              </View>
            )
          })}
        </View>
      ) : null}
    </View>
  )
}

export default InfoSection
