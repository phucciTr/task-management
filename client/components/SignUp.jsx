import React, { useState } from 'react';
import axios from 'axios';


const SignUp = ({ setStep, submitForm, setLoginError }) => {
  const [user, setUser] = useState({ name: '', password: '' });

  const handleFormChange = (e) => {
    setUser(({...user, [e.target.name] : e.target.value }));
  }

  const handleLinkClick = (e) => {
    e.preventDefault();
    setLoginError('');
    setStep(1);
  }

  return (
    <div>
      <h1>Please Sign Up</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        if (user.name.includes('</script>' || user.password.includes('</script>'))) { return window.alert('Please enter valid infos'); }
        if (!user.name || !user.password) { return window.alert('Please fill out all infos') }
        setUser({ name: '', password: '' });
        submitForm('signup', user)
      }}>
          <label>
            Name: <input type="text" name="name" value={user.name} onChange={handleFormChange} />
           <br/>

            Password: <input type="password" name="password" value={user.password} onChange={handleFormChange} />
           <br/>
          </label>

          <input type="submit" value="Sign Up"/>
          <br/>
          <br/>

          <a href='' onClick={handleLinkClick}>Login</a>
        </form>
    </div>
  )
};

export default SignUp;