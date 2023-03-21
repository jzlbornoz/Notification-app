## Configuracion de firebase

- Se crea el nuevo proyecto
- Se habilita GA
- Se habilita el login anonimo en auth
- Se registra la app web en participation/Messaging

### Enlace REACT-FIREBASE

- Se instala firebase `npm install firebase`
- Se crea el archivo 'firebase.js' en el directorio /src y se pegan los SDK proporcionados en el registro.
- Se importa el getMessaging `import { getMessaging } from "firebase/messaging"`.

## Firebase Service Worker

- Se crea el worker en la carpeta public `firebase-messaging-sw.js` y se agrega el mismo codigo del firebase.js
- Debido a que los workers no pueden procesar modulos Js, se modifican los imports de la siguiente manera:

```
importScripts(
    "https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js"
)

importScripts(
    "https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js"
)

```

- La url se obtiene configuracion del proyecto/configuracion SDK
- Se agregan la configuracion para cuando la ap este cerrada:

```
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
```

## Configuracion de App

- Firebase exige una autenticacion, la manera mas facil es hacerla anonima.
- Se importan los siguientes modulos:

```
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getToken, onMessage } from 'firebase/messaging'
import { Message } from './firebase';
```

- Se crea la funcion de logIn:

```
 const logIn = () => {
    signInAnonymously(getAuth()).then(usuario => console.log(usuario));
  }
```

## VAP ID

- El vap id es lo que permite que el servicio encuentre la aplicacion y asi poder enviar la notificacion
- Se genera desde la pagina, configuracion del proyecto, cloud Messaging, configuracion web. (debe estar habilitado la API de Firebase Cloud Messaging ).
- Se crea la funcion para activar los mensajes en la app

```
  const activateMessage = async () => {
    const token = await getToken(Message, {
      vapidKey: "BI7aD9TNevn5V-sMO6vKqcFJBLIQBUpCkSpgljoGkGk8W9LyrrfDFtf05iwZ-a5eO1GHw7m5StJrtfIatyjRdpU"
    }).catch(error => console.log("hubo un problema con la key"));

    if (token) console.log("Token obtenido", token);
    if (!token) console.log(" Sin token");
  }
```

## onMessage

- Se crea el efecto que escucha mientras la app esta activa:

```
 useEffect(() => {
    onMessage(Message, Message => {
      console.log(Message);
      toast(Message.notification.title);
    })
  }, []);
```
- Se agregan las funciones a los botones
```
import React, { useEffect } from 'react';
import logo from './logo.svg'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getToken, onMessage } from 'firebase/messaging'
import { Message } from './firebase';

import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from 'react-toastify';

function App() {

  const logIn = () => {
    signInAnonymously(getAuth()).then(usuario => console.log(usuario));
  }

  const activateMessage = async () => {
    const token = await getToken(Message, {
      vapidKey: "BI7aD9TNevn5V-sMO6vKqcFJBLIQBUpCkSpgljoGkGk8W9LyrrfDFtf05iwZ-a5eO1GHw7m5StJrtfIatyjRdpU"
    }).catch(error => console.log("hubo un problema con la key"));

    if (token) console.log("Token obtenido", token);
    if (!token) console.log(" Sin token");
  }

  // escucha cuando la app esta activa
  useEffect(() => {
    onMessage(Message, Message => {
      console.log(Message);
      toast(Message.notification.title);
    })
  }, []);

  return (
    <div >
      <header>
        Notification App | Pruebas Javier Albornoz
      </header>
      <ToastContainer />
      <button type='button' onClick={logIn}>
        logIn
      </button>
      <button type='button' onClick={activateMessage}>
        Token
      </button>
    </div>
  );
}

export default App;

```