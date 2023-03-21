/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts(
    "https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js"
)

importScripts(
    "https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js"
)


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
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);


// Para cuando la app esta cerrada
messaging.onBackgroundMessage(payload => {
    console.log("recibiste mensaje en ausencia");
    console.log(payload);

    // Previo a la muestra de la notificacion
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './logo192.png'
    }

    return self.registration.showNotification(notificationTitle, notificationOptions);
})