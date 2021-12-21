import { initializeApp } from 'firebase/app';
import { delBasePath } from "next/dist/shared/lib/router/router";
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDLs5wdUDjUasN9zj1xjUziDrtVD6rrbnc",
  authDomain: "ecommerce-shop-b90ba.firebaseapp.com",
  projectId: "ecommerce-shop-b90ba",
  storageBucket: "ecommerce-shop-b90ba.appspot.com",
  messagingSenderId: "584372614712",
  appId: "1:584372614712:web:7222186120a49da29458cd",
};


const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app;

  const db= app.firestore(firebaseConfig);

  export default db;
  