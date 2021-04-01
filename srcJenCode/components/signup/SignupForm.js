import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export const SignupForm = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  // 'data' is an object where the keys are the names of the form fields, 
  // and the values are the form input values
  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data))
    // redirect to Homepage after successful signup
    history.push('/')
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="firstname">First Name</label>
        <input type="text" name="firstname" id="firstname" ref={register}></input>
      </div>
      
      <div className="form-group">
        <label htmlFor="lastname">Last Name</label>
        <input type="text" name="lastname" id="lastname" ref={register}></input>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" ref={register}></input>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" ref={register}></input>
      </div>

      <div className="form-group">
        <button type="submit">Sign Up</button>
      </div>
    </form>
  )
}