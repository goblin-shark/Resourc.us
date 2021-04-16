import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../UserContext'

export const LoginForm = () => {
  const { userLogin } = useContext(UserContext)
  const { register } = useForm()
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

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
    <form onSubmit={(e) => userLogin(e, values)}>
      <div className="form-group">
        <input className="form-control" type="email" placeholder="email" name="email" id="email" ref={register} onChange={handleEmail} />
      </div>

      <div className="form-group">
        <input type="password" className="form-control" placeholder="password" name="password" id="password" ref={register} onChange={handlePassword} />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary">Log In</button>
      </div>
    </form>
  )
}