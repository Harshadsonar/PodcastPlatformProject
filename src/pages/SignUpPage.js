import React, { useState } from 'react';
import Header from '../components/common/Header';
import SignUpForm from '../components/SignUpComponents/SignUpForm';
import LogInForm from '../components/SignUpComponents/LoginForm';
import ResetForm from '../components/SignUpComponents/ResetForm';



const SignUpPage = () => {
  const [flag, setFlag] = useState(true);

  return (
    <div>
      <Header flag={flag}/>
      <div className="input-wrapper">
      <span className="TitleOfProject">SoundCloud ~ A Pocast Platform</span>
        {flag ? <h1>Login</h1> : <h1>Signup</h1>}
        {flag ? <LogInForm /> : <SignUpForm /> }
        {!flag ? (
          <p className="login-signup-msg" onClick={() => setFlag(!flag)} >
            Already have an Account? <span className="msg">Click here to Login.</span>
          </p>
        ) : (
          <p className="login-signup-msg" onClick={() => setFlag(!flag)} >
            Want a new Account? <span className="msg">Click here to Signup.</span>
          </p>
        )}
        {flag === "login" && (
          <p className="helpText">
            Forgot password? Click here to{" "}
            <span onClick={() => setFlag("reset")}>reset.</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;