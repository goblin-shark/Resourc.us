import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

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
    fetch('/user/', {
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
          <input type="text" className="form-control" placeholder="firstname" id="firstname" ref={register} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <input type="text" className="form-control" placeholder="lastname" id="lastname" ref={register} onChange={handleChange} />
        </div>

        <div className="form-group">
          <input type="email" className="form-control" placeholder="email" id="email" ref={register} onChange={handleChange} />
        </div>

        <div className="form-group">
          <input type="password" className="form-control" placeholder="password" id="password" ref={register} onChange={handleChange} />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
      </form>
  )
}