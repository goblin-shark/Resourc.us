import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserProvider } from '../UserContext';

export const SignupForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  const { register, handleSubmit } = useForm()
  const history = useHistory()

  // 'data' is an object where the keys are the names of the form fields, 
  // and the values are the form input values
  const onSubmit = handleSubmit((data) => {
    fetch('http://localhost:3000/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(resp => resp.json())
      .then(data => {
        alert("Signup Success!")
        history.push("/");
        userLogin();
      })
      .catch(err => {
        alert("Signup Failed!")
      });
  })

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    const valuesCopy = values;
    valuesCopy[id] = value;
    setValues(valuesCopy);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="firstname" name="firstname" id="firstname" ref={register} onChange={handleChange} />
      </div>

      <div className="form-group">
        <input type="text" className="form-control" placeholder="lastname" name="lastname" id="lastname" ref={register} onChange={handleChange} />
      </div>

      <div className="form-group">
        <input type="email" className="form-control" placeholder="email" name="email" id="email" ref={register} onChange={handleChange} />
      </div>

      <div className="form-group">
        <input type="password" className="form-control" placeholder="password" name="password" id="password" ref={register} onChange={handleChange} />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </div>
    </form>
  )
}