import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBIrF6qMfs9ATP3SaoAFdo1OExi5WOf2wI",
  authDomain: "audiophile-117.firebaseapp.com",
  databaseURL: "https://audiophile-117.firebaseio.com",
  projectId: "audiophile-117",
  storageBucket: "audiophile-117.appspot.com",
  messagingSenderId: "539200705149"
  }

const fire = firebase.initializeApp(config);

export default fire;
