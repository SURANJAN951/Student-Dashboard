// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo30Xk5izlK8noCQbRGMMDMg2nwkcbvNE",
  authDomain: "student-dashboard-17f25.firebaseapp.com",
  projectId: "student-dashboard-17f25",
  storageBucket: "student-dashboard-17f25.firebasestorage.app",
  messagingSenderId: "213091476106",
  appId: "1:213091476106:web:2ee4c111fe98de698a4373",
  measurementId: "G-WKJZND6R80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Export auth for direct import
export { auth };

// Default export
export default {
  auth
};