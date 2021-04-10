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
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(resp => console.log(resp))
      .then(data => {
        // Enter something that stores or handles cookies or JWT
        history.push("/");
        login();
      })
      .catch(err => console.log('Auth Form won\'t fetch, error:', err));
    // alert(JSON.stringify(data))
    // redirect to Homepage after successful login
    // history.push('/')
  })

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    const valuesCopy = values;
    valuesCopy[id] = value;
    setValues(valuesCopy);
    console.log(values);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input className="form-control" type="email" placeholder="email" id="email" value={values.email} ref={register} onChange={handleChange} />
      </div>

      <div className="form-group">
        <input type="password" className="form-control" placeholder="password" id="password" ref={register} onChange={handleChange} />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary">Log In</button>
      </div>
    </form>
  )
}