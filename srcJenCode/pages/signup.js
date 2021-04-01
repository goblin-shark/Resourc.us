import React from 'react';
import { Link } from 'react-router-dom';
import { SignupForm } from '../components/signup/signupForm';


export const SignupPage = () => {
  return (
    <div>
      <h1>This is Signup.</h1>
      <SignupForm></SignupForm>
      <p>Have an account? <Link to="/login">Log In</Link></p>
    </div>
  )
}