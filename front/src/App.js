import React from 'react';
import { useForm } from "react-hook-form";
const credentials = require('../credentials.json');

const hunters_io = async () => { 
  // hunters.io: https://hunter.io/search
  // fetch() on email-verifier endpoint -> ok
  const email = "patrick@stripe.com";
  // const key = credentials.hunters.api_key;
  const key = "";
  let url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${key}`;
  let options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };
  fetch(url, options)
      .then(response => {
          console.log("hunters_io response:", response);
      })
      .catch(error => {
        console.log("hunters_io error:", error);
      });
};

const captain_verify = async () => { 
    // CaptainVerify: https://dashboard.captainverify.com/fr/api.html
    // fetch() on verify endpoint -> doesn't work
    const email = "patrick@stripe.com";
    const key = credentials.captain_verify.api_key;
    let url = `https://api.captainverify.com/verify?email=${email}&apikey=${key}`;
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    };
    fetch(url, options)
      .then(response => {
        console.log("captain_verify response:", response);
      })
      .catch(error => {
        console.log("captain_verify error:", error);
      });
};

const verify = async () => { 
  await hunters_io();
  await captain_verify();
};

const App = () => {

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(JSON.stringify(data));
    verify();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>site-url</label>
      <input name="site-url" ref={register} />
      <input type="submit" />
    </form>
  );
};

export default App;