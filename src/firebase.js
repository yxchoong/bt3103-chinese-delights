import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAwQBOBucEWUie9Amh3oEZE1rkIaC_Abyc",
    authDomain: "bt3103-week-6-89942.firebaseapp.com",
    projectId: "bt3103-week-6-89942",
    storageBucket: "bt3103-week-6-89942.appspot.com",
    messagingSenderId: "307472717849",
    appId: "1:307472717849:web:950696b6d58756813ff288",
    measurementId: "G-P7X2PY2Y3J"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;