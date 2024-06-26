import { View, Text, Pressable, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePicBackGround from "../../../../components/ImageBackground"
import { doc } from "firebase/firestore"
import { FIREBASE_AUTH, db } from "../../../../../firebase"
import DefaultButton from "../../../../components/DefaultButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../../@types/navigation"
import { Event, GymProfile } from "../../../../@types/firestore"
import getSingleGym from "../../../../functions/getSingleGym"
import { format } from "date-fns"
import { FontAwesome6 } from "@expo/vector-icons"
import updateEventAttendees from "../../../../functions/addUserToAttended"
import BackButton from "../../../../components/BackButton"

type EventProps = {
  event: Event
  eventId: string
}

const ViewEventDetail = ({ event, eventId }: EventProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const [gymIdState, setGymIdState] = useState<string>("")
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (event && currentUser) {
      getSingleGym(event.gymHost, setGymProfile, setLoading)
      setGymIdState(event.gymHost)
    }
  }, [event])

  return (
    <>
      <View>
        <BackButton />
      </View>
      <View className="flex-1 flex-col items-start justify-end mx-2">
        {event !== null ? (
          !loading ? (
            <>
              <Text className="text-3xl font-bold text-white">
                {event.eventTitle}
              </Text>

              <Pressable
                onPress={() =>
                  navigation.navigate("ViewGymScreen", {
                    gymId: gymIdState,
                  })
                }
              >
                <Text className="text-3xl font-bold text-white">
                  Hosted by {gymProfile.gym_title}
                </Text>
              </Pressable>
            </>
          ) : (
            <ActivityIndicator />
          )
        ) : (
          <>
            <DefaultButton
              text="go back"
              buttonFunction={() => navigation.goBack()}
            />
            <Text>Event Does Not exsist</Text>
          </>
        )}
      </View>
    </>
  )
}

export const EventCardDetails = ({ event, eventId }: EventProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const [eventDate, setEventDate] = useState<string>("")
  const [eventTime, setEventTime] = useState<string>("")
  const eventRef = doc(db, "events", eventId)
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (event.date) {
      console.log(event.date)
      const readableDate = event.date.toDate()
      const eventDate = format(readableDate, "MMMM d")
      const eventTime = format(readableDate, "h:mm a")
      setEventDate(eventDate)
      setEventTime(eventTime)
    }

    console.log(event.attendees)
  }, [event])
  return (
    <View>
      <SinglePicBackGround
        photo={event.eventPhoto}
        height={400}
        width={400}
        avatarRadius={10}
        noAvatarRadius={10}
        docRef={eventRef}
        children={<ViewEventDetail event={event} eventId={eventId} />}
        setLoading={setLoading}
      />
      <View className="m-1">
        <View className="flex flex-row justify-between items-center m-2">
          <FontAwesome6 name="calendar" size={20} color="black" />
          <Text className="font-bold text-sm m-2">
            {" "}
            {eventDate !== "" && eventDate && eventTime
              ? `${eventDate}, ${eventTime}`
              : "No Specified Date"}
          </Text>
        </View>

        <View>
          <Pressable
            onPress={() =>
              navigation.navigate("AttendingEvent", {
                eventId: eventId,
              })
            }
          >
            <View className="flex flex-row justify-between items-center m-2">
              <FontAwesome6 name="person-running" size={20} color="black" />
              <Text className="font-bold text-sm">
                {event.attendees && event.attendees.length > 0
                  ? `${event.attendees.length} Person Going!`
                  : "No Attendees Yet!"}
              </Text>
            </View>
          </Pressable>
        </View>
        <View className="flex flex-row justify-between items-center m-2">
          <FontAwesome6 name="money-bill" size={20} color="black" />
          <Text className="font-bold text-sm">
            {Number(event.price) > 0 ? `$${event.price}` : "It's Free!"}
          </Text>
        </View>
      </View>

      <View className="mx-2">
        <Text className="font-bold text-2xl">About</Text>
        <Text className="text-xs">{event.description}</Text>
      </View>

      <View className="flex flex-row justify-center"></View>
    </View>
  )
}
