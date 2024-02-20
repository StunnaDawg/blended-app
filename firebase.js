// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtmhFQMNVxgvBgDibysvjePBKTrciyJrw",
  authDomain: "blended-app-c4ccc.firebaseapp.com",
  projectId: "blended-app-c4ccc",
  storageBucket: "blended-app-c4ccc.appspot.com",
  messagingSenderId: "19332528610",
  appId: "1:19332528610:web:f9029af8cb757c2d3221bb",
  measurementId: "G-0B8GL3F9H6",
}

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const storage = getStorage(FIREBASE_APP)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const db = getFirestore(FIREBASE_APP)
