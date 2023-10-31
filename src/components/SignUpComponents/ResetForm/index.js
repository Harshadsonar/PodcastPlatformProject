import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

function ResetForm({ setFlag }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset link has been sent to your email");
        setLoading(false);
        setFlag("login");
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    } else {
      toast.error("Make sure email is not empty");
      setLoading(false);
    }
  };
  return (
    <>

<div className="branding"  >

<img className="logo" src="/LogoTrans.png" alt="Logo" />
</div>
      <h1>Reset Password</h1>
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Reset Password"}
        onClick={handleLogin}
        disabled={loading}
      />
    </>
  );
}

export default ResetForm;