import firebase from 'firebase/compat';

const firebaseConfig = {
  apiKey: 'AIzaSyBLAiH10tHrI6HCZSznzFUw3KKwONqrZbU',
  authDomain: 'memory-game-d841b.firebaseapp.com',
  projectId: 'memory-game-d841b',
  storageBucket: 'memory-game-d841b.appspot.com',
  messagingSenderId: '189495771690',
  appId: '1:189495771690:web:c354609deb5a2d4500f953'
};

firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase.firestore();

export default firebaseApp;