import React, { useEffect, useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getToken, onMessage } from 'firebase/messaging'
import { Message } from './firebase';

import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from 'react-toastify';

function App() {

  const [tokenCopy, setTokenCopy] = useState('')

  const logIn = () => {
    signInAnonymously(getAuth()).then(usuario => console.log(usuario));
  }

  const activateMessage = async () => {
    const token = await getToken(Message, {
      vapidKey: "BI7aD9TNevn5V-sMO6vKqcFJBLIQBUpCkSpgljoGkGk8W9LyrrfDFtf05iwZ-a5eO1GHw7m5StJrtfIatyjRdpU"
    }).catch(error => console.log("hubo un problema con la key"));

    if (token) {
      console.log("Token obtenido", token);
      setTokenCopy(token);
    }
    if (!token) console.log(" Sin token");
  }

  // escucha cuando la app esta activa
  useEffect(() => {
    onMessage(Message, Message => {
      console.log(Message);
      toast(Message.notification.title);
    })
  }, []);


  // image handler
  const [image, setImage] = useState("");

  const [uploadedImage, setUploadedImage] = useState("");

  const submitImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "appDemo");
    data.append("cloud_name", "dsdrcuojk");

    fetch("https://api.cloudinary.com/v1_1/dsdrcuojk/image/upload", {
      method: "post",
      body: data
    })
      .then((res) => res.json())
      .then((dta) => {
        setUploadedImage(dta);
        console.log("DATA", dta);
        //console.log("IMAGE", uploadedImage);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  console.log("IIMAGE URL" , uploadedImage.url);
  // --
  return (
    <div >
      <header>
        Notification App / Image Handler | Pruebas Javier Albornoz
      </header>
      <>
        <ToastContainer />
        <p>Token: {tokenCopy}</p>
        <button type='button' onClick={logIn}>
          logIn
        </button>
        <button type='button' onClick={activateMessage}>
          Token
        </button>
      </>
      <>
        <div>
          <input type='file' onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={submitImage}>upload</button>
        </div>
      <img src={uploadedImage.url} alt='s' /> 
      </>
    </div>
  );
}

export default App;
