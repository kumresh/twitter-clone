import { FirebaseApp, getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCxc3kG7GdLhHx0HyC0ryHz1SudX8cszlQ",
  authDomain: "tweeter-clone-af770.firebaseapp.com",
  projectId: "tweeter-clone-af770",
  storageBucket: "tweeter-clone-af770.appspot.com",
  messagingSenderId: "912767657725",
  appId: "1:912767657725:web:4e0593f0729a28c92d8094"
};

let firebase: FirebaseApp;

if (process.env.NODE_ENV === 'production') {
  firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} else {
  const globalWithFirebase = global as typeof globalThis & {
    firebase: FirebaseApp;
  };
  if (!globalWithFirebase.firebase) {
    globalWithFirebase.firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
}

// Initialize Firebase
firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { firebase };
