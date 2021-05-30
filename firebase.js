import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAu1D7fA-wM8hcvNulSY37K6mCg4SmajLg",
    authDomain: "e-nextjs-5bf2d.firebaseapp.com",
    projectId: "e-nextjs-5bf2d",
    storageBucket: "e-nextjs-5bf2d.appspot.com",
    messagingSenderId: "1006502739031",
    appId: "1:1006502739031:web:dee17671bd772221f2b712"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  const db = app.firestore();

  export default db;