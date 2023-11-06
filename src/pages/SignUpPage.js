// import React, { useState } from 'react';
// import Header from '../components/common/Header';
// import SignUpForm from '../components/SignUpComponents/SignUpForm';
// import LogInForm from '../components/SignUpComponents/LoginForm';



// const SignUpPage = () => {
//   const [flag, setFlag] = useState(true);

//   return (
//     <div>
//       <Header flag={flag}/>
//       <div className="input-wrapper">
//       <span className="TitleOfProject"><img src="./IconParkOutlineMicrophone.svg" alt="IconParkOutlineMicrophone" /> SoundCloud ~ A Podcast Platform </span>
//         {flag ? <h1>Login</h1> : <h1>Signup</h1>}
//         {flag ? <LogInForm /> : <SignUpForm /> }
//         {!flag ? (
//           <p className="login-signup-msg" onClick={() => setFlag(!flag)} >
//             Already have an Account? <span className="msg">Click here to Login.</span>
//           </p>
//         ) : (
//           <p className="login-signup-msg" onClick={() => setFlag(!flag)} >
//             Create a new Account? <span className="msg">Click here to Signup.</span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpComponents/SignUpForm"
import LoginForm from "../components/SignUpComponents/LoginForm";
import ResetForm from "../components/SignUpComponents/ResetForm";
import Header from "../components/common/Header";

const Home = () => {
  const [flag, setFlag] = useState("login");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/podcasts");
    }
  }, [navigate, user]);

  return (
    <div>
      <Header flag={flag}/>
      <div className="input-wrapper">
      <span className="TitleOfProject"><img src="./IconParkOutlineMicrophone.svg" alt="IconParkOutlineMicrophone" /> SoundCloud ~ A Podcast Platform </span>
        {flag === "login" ? (
          <LoginForm />
        ) : flag === "signup" ? (
          <SignUpForm />
        ) : (
          <ResetForm setFlag={setFlag} />
        )}
        {flag === "signup" ? (
          <p className="helpText">
            Already have an Account? Click here to{" "}
            <span onClick={() => setFlag("login")}>login.</span>
          </p>
        ) : (
          <p className="helpText">
            Don't have an account? Click here to{" "}
            <span onClick={() => setFlag("signup")}>signup</span>
          </p>
        )}
        {flag === "login" && (
          <p className="helpText">
            Forgot password? Click here to{" "}
            <span onClick={() => setFlag("reset")}>reset</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;