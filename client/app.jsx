import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TaskList from './components/TaskList.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import axios from 'axios';


const App = () => {
  const [step, setStep] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState({ name: '', userId: '', accessToken: '' });
  const [loginError, setLoginError] = useState('');

  const submitForm = async (authType, user) => {
    try {
      if (authType === 'signup') {
        const signedRes = await axios.post(('/user'), user);
        setStep(1);
        setLoginError('');
      }
      if (authType === 'login') {
        const loggedRes = await axios.post(('/user/login'), user);
        setLoggedInUser({name: loggedRes.data.name, userId: loggedRes.data.id, accessToken: loggedRes.data.accessToken });
        setStep(2);
        setLoginError('');
      }

    } catch(e) {
      console.log('error authenticating = ', e.response.data);
      setLoginError(e.response.data);
    }
  }


  const pages = [
    <SignUp setStep={setStep} submitForm={submitForm} setLoginError={setLoginError} />,
    <Login setStep={setStep} submitForm={submitForm} setLoginError={setLoginError}/>,
    <TaskList user={loggedInUser} setStep={setStep}/>
  ];

  return (
    <div>
      {pages.map((page, i) => step === i && page)}
      {loginError === 'incorrect' && <h2>Please enter correct information</h2>}
      {loginError === 'taken' && <h2>Username taken. Please choose a different name</h2>}
    </div>
  )
}

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App/>);