import React from 'react'
import './styles.css'
import { Link, useLocation } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';
import { clearUser } from "../../../slices/userSlice"
import { toast } from 'react-toastify';

const Header = ({flag}) => {

  const location = useLocation();
  const currentPath =location.pathname;
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    try{
      await signOut(auth);
      dispatch(clearUser());
    }
    catch(e){
      toast.error(e.message);
      console.log("error while logout ", e);
    }
  }

  return (
    <div className='navbar'>
      <div className='gradient'></div>
      <div className='links'>
        {!user && <Link to="/" className={currentPath==="/" ? "active" : ""}>{flag?"Login":"Signup"}</Link>}
        <Link to="/podcasts" className={currentPath==="/podcasts" ? "active" : ""}>Podcasts</Link>
        <Link to="/create-a-podcast" className={currentPath==="/create-a-podcast" ? "active" : ""}>Start A Podcast</Link>
        <Link to="/profile" className={currentPath==="/profile" ? "active" : ""}>{user && currentUser?`Profile of ${currentUser.name}`:"Profile"}</Link>
        {
          user &&
          (<Link to="#" onClick={handleLogout}>Logout</Link>)
        }
      </div>
    </div>
  )
}

export default Header;