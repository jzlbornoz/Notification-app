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
