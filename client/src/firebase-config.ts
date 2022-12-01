import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDFoFcjHhEwyelpHs7grzi6Iymibh3QaQU',
  authDomain: 'sotatek-login.firebaseapp.com',
  projectId: 'sotatek-login',
  storageBucket: 'sotatek-login.appspot.com',
  messagingSenderId: '476035656789',
  appId: '1:476035656789:web:4d1e200b5f92271761f8dc',
  measurementId: 'G-KW3D167J3T',
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);