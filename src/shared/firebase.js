import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from '@firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCbHrPNI-CbQbVal3mK16Sa-fe2n3Vrz3E',
  authDomain: 'yalolja-e5abf.firebaseapp.com',
  projectId: 'yalolja-e5abf',
  storageBucket: 'yalolja-e5abf.appspot.com',
  messagingSenderId: '228272462596',
  appId: '1:228272462596:web:fb1d86bf9bc436001f8e51',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);
