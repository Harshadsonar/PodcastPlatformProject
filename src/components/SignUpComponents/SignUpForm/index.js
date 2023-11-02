import React, { useState } from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { auth, db, storage} from "../../../firebase"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from "../../../slices/userSlice"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileInput from '../../common/Input/FileInput';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function SignUpForm() {
const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setpassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async ()=>{
    console.log("Handling Signup");
    setLoading(true);
    if(password===confirmPassword && password.length>=6 && fullName && email){
      try {
        //Creating users account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        console.log("User", user)

        //saving users details
        await setDoc(doc(db, "users", user.uid),{
          name: fullName,
          email: user.email,
          uid:user.uid,
          profileImage: profileImage,
          // profilePic: fileURL,
        });

        //Save data in redux, call the redux action
        dispatch(setUser({
          name : fullName,
          email : user.email,
          uid : user.uid,
           profileImage: profileImage,
        }));

        toast.success("User has been Created")
        setLoading(false);
        navigate("/profile");
      }catch(e){
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    }else{
      if(!fullName && !email && !password){
        toast.error("Please fill all details.");
      } else if(password !== confirmPassword) {
        toast.error("Password is not Matching.");
      }
      else if(password.length<6){
        toast.error("Password should atleast contain 6 Characters")
      }
      setLoading(false);
    }
    
  };
  const profileImageHandle = async (file) => {
    setLoading(true);
    console.log("Image: ", file);
    try{
      const imageRef = ref(storage, `userPhotos/${Date.now()}`);
      await uploadBytes(imageRef, file);

      const imageURL = await getDownloadURL(imageRef);
      setProfileImage(imageURL);
      toast.success("Image Uploaded");
      console.log("image url: ", imageURL);
      setLoading(false);
    }
    catch(e){
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <>
    <InputComponent
    state={fullName}
    setState={setFullName}
    placeholder="Full Name"
    type="text"
    required={true}
  />
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
  <InputComponent
    state={confirmPassword}
    setState={setConfirmPassword}
    placeholder="Confirm Password"
    type="password"
    required={true}
  />
  <FileInput
  text="Upload Profile Image"
  accept={"image/*"}
  id="Profile-image-input"
    fileHandleFnc={profileImageHandle}
    isSubmitted={isSubmitted}
    />
  <Button text={loading ? "Loading.." : "Sign Up"} disabled={loading} onClick={handleSignUp}/>
  </>
  )
}

export default SignUpForm;