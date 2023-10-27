import React, { useState } from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function LogInForm() {

  const [email,setEmail] = useState("");
  const [password,setpassword] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  

  const handleLogin = async ()=>{
    console.log("Handling Login");
    setLoading(true);
    if(email && password){
    try{
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      dispatch(
        setUser({
          name : userData.name,
          email : user.email,
          uid : user.uid,
          // profilePic:userData.profilePic
        })
      );
      toast.success("Login Successfull!")
      setLoading(false);
      // toHaveStyle.success("User Login Successful");
      navigate("/profile")

    }catch(e){
      console.log("error", e);
      setLoading(false);
      toast.error(e.message)
    }

  }else{
    toast.error("Fill the Required Fields");
    setLoading(false);
  }
}

  return (
    <>
  <InputComponent
    state={email}
    setState={setEmail}
    placeholder="Email"
    type="text"
    required={true}
  />
  <InputComponent
    state={password}
    setState={setpassword}
    placeholder="Password"
    type="password"
    required={true}
  />
  <Button text={loading ? "Loading.." : "Log In"} disabled={loading} onClick={handleLogin}/>
  </>
  )
}

export default LogInForm