import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export const SignupPage = () => {
  const [values, setValues] = useState({
		firstname: '',
    lastname: '',
    email: '',
		password: ''
	});
  // const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submit fired')
    fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp => console.log(resp))
    .then(data => {
      console.log(data)
      // history.push('/')
    })
    .catch(err => console.log('Auth Form won\'t fetch, error:', err));
  };

  const handleChange = (e) => {
    console.log(e);
  }

  return (
    <div>
      <h1>This is Signup.</h1>
      <form>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input type="text" name="firstname" id="firstname" value={values.firstname || ''} onChange={handleChange}/>
        </div>
        
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" name="lastname" id="lastname" value={values.lastname || ''} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={values.email || ''} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={values.password || ''} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <button type="submit" onSubmit={handleSubmit}>Sign Up</button>
        </div>
      </form>
      <p>Have an account? <Link to="/login">Log In</Link></p>
    </div>
  )
}