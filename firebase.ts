// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDfcVqyA4-K_G8B4V2Yd8NBoAOJ1KZFagI',
  authDomain: 'streaming-clone-82acd.firebaseapp.com',
  projectId: 'streaming-clone-82acd',
  storageBucket: 'streaming-clone-82acd.appspot.com',
  messagingSenderId: '635578471847',
  appId: '1:635578471847:web:803accebbe6471019cd282',
  measurementId: 'G-C3TB01WXWZ',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

//const analytics = getAnalytics(app);

export default app;
export { auth, db };
