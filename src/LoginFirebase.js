import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDDHb5v27wUVMWmXxG05tjLWa1WcC03uJI',
  authDomain: 'sanctityquestions.firebaseapp.com',
  databaseURL: 'https://sanctityquestions-default-rtdb.firebaseio.com',
  projectId: 'sanctityquestions',
  storageBucket: 'sanctityquestions.appspot.com',
  messagingSenderId: '244877541675',
  appId: '1:244877541675:web:c0cc9e335b43528940c56e',
  measurementId: 'G-912HTTHYVB',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)

firebase.initializeApp(firebaseConfig)
export const dbms = firebase.database()

setPersistence(auth, browserLocalPersistence)
export default app
