import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas",
  authDomain: "scheduler-demo-dev.firebaseapp.com",
  projectId: "scheduler-demo-dev",
  storageBucket: "scheduler-demo-dev.appspot.com",
  messagingSenderId: "581326886241",
  appId: "1:581326886241:web:c544ef563e789d5913920f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);