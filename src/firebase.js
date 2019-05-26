import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB9bXTmWcZN0Z3EtQD-qYxRRz4-QIaAmGs",
  authDomain: "online-classes-5b82d.firebaseapp.com",
  databaseURL: "https://online-classes-5b82d.firebaseio.com",
  projectId: "online-classes-5b82d",
  storageBucket: "",
  messagingSenderId: "103897125722"
};

var app = firebase.initializeApp(config);
export const db = firebase.firestore(app);
export const auth = firebase.auth();
export default firebase;
