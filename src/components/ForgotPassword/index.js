import React, { useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ trigger, setTrigger }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode);
        console.log("errorMessage", errorMessage);
      });
    setTrigger(false);
  };

  const handleCancel = () => {
    // Close the popup by setting trigger to false
    setTrigger(false);
  };

  return trigger ? (
    <div className="forgot-password-popup">
      <div className="popup-inner">
        <h2 className="forgotText">Forgot Password</h2>
        <input
          type="text"
          className="email-input"
          placeholder="Enter your email.."
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="btn">
        <button className="close-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="close-btn" onClick={handleCancel}>
          Cancel
        </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ForgotPassword;
