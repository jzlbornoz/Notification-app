import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging"

const firebaseConfig = {
    apiKey: "AIzaSyBX9v8BqDIpCyUJm6e8kTOaGsgxKZYrsuU",
    authDomain: "notify-app-c9387.firebaseapp.com",
    projectId: "notify-app-c9387",
    storageBucket: "notify-app-c9387.appspot.com",
    messagingSenderId: "212226154824",
    appId: "1:212226154824:web:ca1888e0f48eb89eaad37d",
    measurementId: "G-XRF0PGVP1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const Message = getMessaging(app);