import firebase from 'firebase/app';
import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_APIKEY,
//   authDomain: process.env.VUE_APP_AUTHDOMAIN,
//   databaseURL: process.env.VUE_APP_DATABASEURL,
//   projectId: process.env.VUE_APP_PROJECTID,
//   storageBucket: process.env.VUE_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
//   appId: process.env.VUE_APP_APPID,
//   measurementId: process.env.VUE_APP_MEASUREMENTID
// };

const firebaseConfig = process.env.FIREBASE_CONFIG;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
