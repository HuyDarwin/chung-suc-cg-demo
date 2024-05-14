            // Import the functions you need from the SDKs you need
            import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
            import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries
          
            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            const firebaseConfig = {
              apiKey: "AIzaSyCpDjDLyYbwi_WRAb8_WoLlR2xO61lcfuw",
              authDomain: "chung-suc-cg.firebaseapp.com",
              databaseURL: "https://chung-suc-cg-default-rtdb.asia-southeast1.firebasedatabase.app",
              projectId: "chung-suc-cg",
              storageBucket: "chung-suc-cg.appspot.com",
              messagingSenderId: "156138502717",
              appId: "1:156138502717:web:22798f09dd2fc66b760854",
              measurementId: "G-GMH95M39JS"
            };
          
            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const analytics = getAnalytics(app);