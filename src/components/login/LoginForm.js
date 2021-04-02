import React from 'react';
// import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export const LoginForm = () => {
  // const { register, handleSubmit } = useForm()
  const history = useHistory()

  // 'data' is an object where the keys are the names of the form fields, 
  // and the values are the form input values
  // const onSubmit = handleSubmit((data) => {
  //   alert(JSON.stringify(data))
  //   history.push('/')
  // })

  return (
    <form>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email"></input>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"></input>
      </div>

      <div className="form-group">
        <button type="submit">Log In</button>
      </div>
    </form>
  )
}