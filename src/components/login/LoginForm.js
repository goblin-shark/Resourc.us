import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

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
    fetch('/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(resp => console.log(resp))
      .then(data => {
        // Enter something that stores or handles cookies or JWT
        history.push("/");
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
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" ref={register} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" ref={register} onChange={handleChange} />
      </div>

      <div className="form-group">
        <button type="submit">Log In</button>
      </div>
    </form>
  )
}