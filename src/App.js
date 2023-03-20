import React from 'react';
import addNotification from 'react-push-notification';
import logo from './logo.svg'

function App() {
  const toNotificate = () => {
    addNotification({
      title: "Tarea hecha",
      message: "Le toca a",
      duration: 4000,
      icon: logo,
      native: true
    })
  }

  return (
    <div >
      <header>
        Notification App | Pruebas Javier Albornoz
      </header>
      <button type='button' onClick={toNotificate()}>
        Done!
      </button>
    </div>
  );
}

export default App;
