 import firebase from 'firebase'
 import 'firebase/firestore'
 
  var firebaseConfig = {
    apiKey: "AIzaSyAQrU9yq3kv8xMaZ32AemPATUd9e696YA0",
    authDomain: "tercerparcial-7404c.firebaseapp.com",
    databaseURL: "https://tercerparcial-7404c.firebaseio.com",
    projectId: "tercerparcial-7404c",
    storageBucket: "tercerparcial-7404c.appspot.com",
    messagingSenderId: "445659208092",
    appId: "1:445659208092:web:14b8352e2a04c594581059"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();