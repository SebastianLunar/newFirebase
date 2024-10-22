import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGGlYwdHVDLvHPU_XwRV483XT1oqY9JBQ",
  authDomain: "new-firebase-77e7d.firebaseapp.com",
  projectId: "new-firebase-77e7d",
  storageBucket: "new-firebase-77e7d.appspot.com",
  messagingSenderId: "661586142711",
  appId: "1:661586142711:web:f58ac0130f673660cf3af2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
export const database = getFirestore()

export default app;