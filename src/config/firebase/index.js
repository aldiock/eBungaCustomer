import firebase from  'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCaE593RMnC-lbq5EapX92AKud4r7YJhUs",
  authDomain: "e-bunga.firebaseapp.com",
  databaseURL: "https://e-bunga-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-bunga",
  storageBucket: "e-bunga.appspot.com",
  messagingSenderId: "996912274374",
  appId: "1:996912274374:web:dcb3b6c2a9aaec8caa70c7",
  measurementId: "G-QX11F1FNFN"
};

firebase.initializeApp(firebaseConfig);
export default firebase;