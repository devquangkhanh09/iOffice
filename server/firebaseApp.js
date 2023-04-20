const { initializeApp } = require('firebase-admin/app');

const firebaseConfig = {
    apiKey: "AIzaSyCNdlMvOsGN5ylGV_wSrGMlbJU9TO3hqx4",
    authDomain: "smart-office-eb912.firebaseapp.com",
    projectId: "smart-office-eb912",
    storageBucket: "smart-office-eb912.appspot.com",
    messagingSenderId: "1033617253391",
    appId: "1:1033617253391:web:8a269e9118bf06998f6f7a",
    measurementId: "G-KELS4W6G8Z"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export default app;