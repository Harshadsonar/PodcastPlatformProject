import React, { useState } from 'react'
import Header from '../components/common/Header'
import InputComponent from '../components/common/Input'
import Button from '../components/common/Button';
import SignUpForm from '../components/SignUpComponents/SignUpForm';
import LogInForm from '../components/SignUpComponents/LoginForm';

function SignUpPage() {
  const[flag,setFlag] = useState(false);

  return (
    <div>
      <Header/>
      <div className='input-wrapper'>
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignUpForm/> : <LogInForm/>}
        {!flag ? <p style={{cursor:'pointer'}} onClick={()=>setFlag(!flag)}>Already have an Account? Click here to Login.</p> 
        : <p style={{cursor:'pointer'}} onClick={()=>setFlag(!flag)}>Don't have an account? Click here to Signup.</p>}
        
      </div>
    </div>
  )
}

export default SignUpPage