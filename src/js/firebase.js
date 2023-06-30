// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAWL009d3fIg7FDNeFa1MpQ8vcCju1UWEQ",
  authDomain: "project-js-fson82.firebaseapp.com",
  projectId: "project-js-fson82",
  storageBucket: "project-js-fson82.appspot.com",
  messagingSenderId: "729076020797",
  appId: "1:729076020797:web:e3a2da2c14a169a281dc54"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//  const db = getFirestore(app);

// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }



// export { getCities };