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
import updateEventAttendees from "../../../../functions/addUserToAttended"

type EventProps = {
  event: Event
  eventId: string
}

const ViewEventDetail = ({ event, eventId }: EventProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (event && currentUser) {
      getSingleGym(event.gymHost, setGymProfile, setLoading)
    }
  }, [event])

  return (
    <View className="flex-1 flex-col items-start justify-end">
      {event !== null ? (
        !loading ? (
          <>
            <Text className="text-3xl font-bold text-white">
              {event.eventTitle}
            </Text>

            <Text className="text-3xl font-bold text-white">
              Hosted by {gymProfile.gym_title}
            </Text>
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
  )
}

export const EventCardDetails = ({ event, eventId }: EventProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentAttendee, setCurrentAttendee] = useState<boolean>(false)
  const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [eventDate, setEventDate] = useState<string>("")
  const [eventTime, setEventTime] = useState<string>("")
  const eventRef = doc(db, "events", eventId)
  const currentUser = FIREBASE_AUTH.currentUser?.uid
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  useEffect(() => {
    if (event.attendees && currentUser) {
      const isUserInAttendees = event.attendees.includes(currentUser)
      if (isUserInAttendees) {
        setCurrentAttendee(true)
        console.log("user is an attendee")
      } else {
        setCurrentAttendee(false)
      }
    } else {
      setCurrentAttendee(false)
    }
    if (event.date) {
      const readableDate = event.date.toDate()
      const eventDate = format(readableDate, "MMMM d")
      const eventTime = format(readableDate, "h:mm a")
      setEventDate(eventDate)
      setEventTime(eventTime)
    }
  }, [event])
  return (
    <View>
      <SinglePicBackGround
        id={event.id}
        height={400}
        width={400}
        avatarRadius={10}
        noAvatarRadius={10}
        docRef={eventRef}
        children={<ViewEventDetail event={event} eventId={eventId} />}
      />
      <View>
        <Text className="font-bold text-lg">
          {" "}
          {eventDate !== ""
            ? `${eventDate}, ${eventTime}`
            : "No Specified Date"}
        </Text>
        <Text className="font-bold text-lg">
          {Number(event.price) > 0 ? `$${event.price}` : "Free"}
        </Text>
        <Text className="font-bold text-lg">
          {event.attendees && event.attendees.length > 0
            ? event.attendees.length
            : "No Attendees Yet!"}
        </Text>
      </View>

      <View className="mx-2">
        <Text className="font-bold text-2xl">About</Text>
        <Text>
          {event.description} Join For a fun night out, with Blended Athletics!
          Join For a fun night out, with Blended Athletics! Join For a fun night
          out, with Blended Athletics! Join For a fun night out, with Blended
          Athletics! Join For a fun night out, with Blended Athletics!
        </Text>
      </View>
    </View>
  )
}
