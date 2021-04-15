import React from "react";
import { Link } from "react-router-dom";
import { SignupForm } from "../components/signup/SignupForm";

function SignupPage() {
  return (
    <div className="container formContainer">
      <h1>This is Signup.</h1>
      <SignupForm></SignupForm>
      <p>
        Have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default SignupPage;
