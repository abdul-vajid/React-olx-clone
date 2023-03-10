import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtY6UGLHfpwk--abgWQqKmxQy9lhAarIA",
  authDomain: "react-olx-clone-4556b.firebaseapp.com",
  projectId: "react-olx-clone-4556b",
  storageBucket: "react-olx-clone-4556b.appspot.com",
  messagingSenderId: "915947513011",
  appId: "1:915947513011:web:220a54ec489e122a433cc6"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
