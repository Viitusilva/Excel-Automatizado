import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCR89bsuKU76e8tAAcw1rXO49_rSMhogXY",
  authDomain: "compras-de-soro.firebaseapp.com",
  databaseURL: "https://compras-de-soro-default-rtdb.firebaseio.com",
  projectId: "compras-de-soro",
  storageBucket: "compras-de-soro.appspot.com",
  messagingSenderId: "300710916986",
  appId: "1:300710916986:web:234905b7464b595f081cc3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);