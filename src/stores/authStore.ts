import { create } from 'zustand';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', credential.user.uid));
    if (userDoc.exists()) {
      set({ user: { id: credential.user.uid, ...userDoc.data() } as User });
    }
  },
  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null });
  }
}));

// Setup auth listener
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (userDoc.exists()) {
      useAuthStore.setState({ 
        user: { id: firebaseUser.uid, ...userDoc.data() } as User,
        loading: false 
      });
    }
  } else {
    useAuthStore.setState({ user: null, loading: false });
  }
});