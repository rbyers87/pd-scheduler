import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';

export async function initializeTestData() {
  try {
    // Create admin user
    const adminCredential = await createUserWithEmailAndPassword(auth, 'admin@work.com', 'test123');
    await setDoc(doc(db, 'users', adminCredential.user.uid), {
      email: 'admin@work.com',
      name: 'Admin User',
      role: 'admin',
      group: 'Management',
      benefits: {
        vacation: 80,
        sick: 40,
        comp: 20
      }
    });

    // Create regular user
    const userCredential = await createUserWithEmailAndPassword(auth, 'user@work.com', 'test123');
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: 'user@work.com',
      name: 'Regular User',
      role: 'user',
      group: 'Day Shift',
      benefits: {
        vacation: 40,
        sick: 20,
        comp: 10
      }
    });

    console.log('Test data initialized successfully');
  } catch (error) {
    console.error('Error initializing test data:', error);
  }
}