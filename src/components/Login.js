
import {auth, provider} from './firebase';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import Typed from 'react-typed';

export const Login = () => {
  
  const navigate = useNavigate();

  const signInWithGoogle = async () =>{
    const result = await signInWithPopup(auth, provider);
    navigate("/progress"); 
    window.location.reload();
  };
  return (
    <div className = "transition-fade" style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1 style = {{marginBottom: '10px'}}>Welcome to Hoop Tracker</h1>
      <h3 style = {{marginBottom: '40px'}}>track your stats today </h3>
      <Typed 
        strings = {[
            "Two Pointers",
            "Three Pointers",
            "Assists",
            "Layups",
            "Rebounds",
            "Similar NBA Players",
            "Tips for improvement"
          ]}
          typeSpeed = {100}
          backSpeerd = {100}
          loop
           style = {{marginBottom: '30px', fontSize: '25px', color: 'purple'}}
          />
 
      <p>Sign in with Google</p>
      <button className='login-button' onClick={signInWithGoogle}>Login</button>
    </div>
  )
}
