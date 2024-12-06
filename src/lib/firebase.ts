import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCpoL1D2ucn2VX8KAmyK2KZauHlQMDvb78",
    authDomain: "papd-scheduler.firebaseapp.com",
    projectId: "papd-scheduler",
    storageBucket: "papd-scheduler.firebasestorage.app",
    messagingSenderId: "637036264358",
    appId: "1:637036264358:web:eb4d00fc3e9d4c051a2d67"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable persistence for offline support
import { enableIndexedDbPersistence } from 'firebase/firestore';
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
        console.warn('The current browser doesn\'t support persistence.');
    }
});