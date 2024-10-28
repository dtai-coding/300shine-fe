import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD3guzVc9kZ2QR8hrYLND6iuGRX6X3YAt4',
  authDomain: 'shine-71c56.firebaseapp.com',
  projectId: 'shine-71c56',
  storageBucket: 'shine-71c56.appspot.com',
  messagingSenderId: '329336043095',
  appId: '1:329336043095:web:49525cd5b3761ba5b6d512',
  measurementId: 'G-WS7VHFHZ89',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { app, analytics, storage };
