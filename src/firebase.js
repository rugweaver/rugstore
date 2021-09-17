import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDOyvIGZj58jcDOUl-qbmB7b_38J0_e1K8",
  authDomain: "e-centaur-142613.firebaseapp.com",
  databaseURL: "https://e-centaur-142613-default-rtdb.firebaseio.com",
  projectId: "e-centaur-142613",
  storageBucket: "e-centaur-142613.appspot.com",
  messagingSenderId: "951741132016",
  appId: "1:951741132016:web:fd9a7ef8447f31d963a635",
  measurementId: "G-NNHX0YJHYF"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
