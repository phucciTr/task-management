import React, { useState } from 'react';
import axios from 'axios';


const Login = ({ setStep, submitForm, setLoginError }) => {
  const [user, setUser] = useState({ name: '', password: '' });

  const handleFormChange = (e) => {
    setUser(({...user, [e.target.name] : e.target.value }));
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    setLoginError('');
    setStep(0);
  }

  return (
    <div>
      <h1>Please Log In</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        if (user.name.includes('</script>' || user.password.includes('</script>'))) { return window.alert('Please enter valid infos'); }
        if (!user.name || !user.password) { return window.alert('Please fill out all infos'); }
        setUser({ name: '', password: '' });
        submitForm(e, 'login', user)
      }}>
          <label>
            Name: <input type="text" name="name" value={user.name} onChange={handleFormChange} />
           <br/>

            Password: <input type="password" name="password" value={user.password} onChange={handleFormChange} />
           <br/>
          </label>

          <input type="submit" value="Login"/>
          <br/>
          <br/>

          <a href='' onClick={handleLinkClick} >Sign Up</a>
        </form>
    </div>

  )
};

export default Login;