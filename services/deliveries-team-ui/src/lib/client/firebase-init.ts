import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD4BEPHZVuMGAfMqvZH0udLRO2-PgOzDmo',
  authDomain: 'deliveries-5eb11.firebaseapp.com',
  projectId: 'deliveries-5eb11',
  storageBucket: 'deliveries-5eb11.appspot.com',
  messagingSenderId: '514342782112',
  appId: '1:514342782112:web:e5e982014dff15ab1035c5',
  measurementId: 'G-WMVMCN6TKG',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
