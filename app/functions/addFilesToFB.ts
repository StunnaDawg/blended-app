import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"

const addWorkoutsToFirebase = async () => {
  const workoutRef = collection(db, "activities") // Assuming 'workouts' is the name of your collection in Firestore

  const workouts = [
    "Running",
    "Swimming",
    "Cycling",
    "Weightlifting",
    "Yoga",
    "Pilates",
    "(HIIT)",
    "CrossFit",
    "Bodyweight exercises",
    "Rowing",
    "Hiking",
    "Rock climbing",
    "Boxing",
    "Jump rope",
    "Circuit training",
    "Barre workouts",
    "Functional training",
    "TRX suspension training",
    "Kettlebell workouts",
    "Tai Chi",
    "Bootcamp workouts",
    "Calisthenics",
    "Parkour",
    "Kickboxing",
    "Spinning",
    "Aerial yoga",
    "Stair climbing",
    "Water aerobics",
    "Fencing",
    "Slacklining",
    "Obstacle course racing",
    "Beach workouts",
    "Indoor climbing",
    "Skateboarding",
    "Surfing",
    "Snowboarding",
    "Golf",
    "Tennis",
    "Squash",
    "Handball",
    "Ultimate Frisbee",
    "Rugby",
    "American football",
    "Lacrosse",
    "Badminton",
    "Archery",
    "Table tennis",
    "CrossFit",
    "Oly lifting",
  ]
  for (const workout of workouts) {
    try {
      await setDoc(doc(workoutRef, workout), { name: workout })
      console.log(`Workout "${workout}" added to Firebase`)
    } catch (error) {
      console.error(`Error adding workout "${workout}" to Firebase:`, error)
    }
  }
}

export default addWorkoutsToFirebase
