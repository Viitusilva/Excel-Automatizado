const firebaseConfig = {
  apiKey: "AIzaSyCR89bsuKU76e8tAAcw1rXO49_rSMhogXY",
  authDomain: "compras-de-soro.firebaseapp.com",
  databaseURL: "https://compras-de-soro-default-rtdb.firebaseio.com",
  projectId: "compras-de-soro",
  storageBucket: "compras-de-soro.appspot.com",
  messagingSenderId: "300710916986",
  appId: "1:300710916986:web:234905b7464b595f081cc3"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const ref = db.ref("compradores_soro");

const auth = firebase.auth();
