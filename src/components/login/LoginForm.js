import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { login } from '../utility';

export const LoginForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  // 'data' is an object where the keys are the names of the form fields, 
  // and the values are the form input values
  const onSubmit = handleSubmit((data) => {
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(data => {
        // Enter something that stores or handles cookies or JWT
        alert("Login Success!")
        history.push("/");
        login();
      })
      .catch(err => alert("Login Failed!"));
  })

  const handleEmail = (e) => {
    const value = e.target.value;
    const valuesCopy = values;
    valuesCopy.email = value;
    setValues(valuesCopy);
  }

  const handlePassword = (e) => {
    const value = e.target.value;
    const valuesCopy = values;
    valuesCopy.password = value;
    setValues(valuesCopy);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input className="form-control" type="email" placeholder="email" id="email" ref={register} onChange={handleEmail} />
      </div>

      <div className="form-group">
        <input type="password" className="form-control" placeholder="password" id="password" ref={register} onChange={handlePassword} />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary">Log In</button>
      </div>
    </form>
  )
}