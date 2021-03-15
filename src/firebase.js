import firebase from "firebase";


  const firebaseApp=firebase.initializeApp({

    apiKey: "AIzaSyCJfkzv437dz4hCQUzr7ops554zf1NfYuM",
    authDomain: "todo-app-5a6ee.firebaseapp.com",
    databaseURL: "https://todo-app-5a6ee.firebaseio.com",
    projectId: "todo-app-5a6ee",
    storageBucket: "todo-app-5a6ee.appspot.com",
    messagingSenderId: "403233490049",
    appId: "1:403233490049:web:67dec89c7408ae04963980",
    measurementId: "G-HLTQ7RE2R8"

  });

  const db=firebaseApp.firestore();

  export default db;