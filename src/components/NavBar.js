import {auth} from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import { signOut } from 'firebase/auth';

export const NavBar = () => {
    const [user] = useAuthState(auth);

    const signUserOut = async () =>{
      await signOut(auth);
    }

  return (
    <div>
        <h1>Hoop Tracker</h1>
        <div className = "nav_bar">
            <p>By Andrew Kim</p>
              <ul style={{ display: 'flex', alignItems: 'flex-end' }}>
                    {user  && window.location.pathname !== "/login" ? <li><a href = "/progress">Progress</a></li>: <></>}
                    {user  && window.location.pathname !== "/login" ? <li><a href = "/details">Details</a></li> : <></>}
                    {user  && window.location.pathname !== "/login" ? <li><a href = "/tips">Tips</a></li> : <></>}
                    <li>{user  && window.location.pathname !== "/login"?  <a onClick = {signUserOut} href = "/">Logout</a> : <a href = "/">Login</a>}</li>
                    {window.location.pathname !== "/login" ? <li><p>{user?.displayName}</p></li>: <></>}
                </ul>
        </div>
        {user && window.location.pathname !== "/create" && window.location.pathname !== "/login" ? 
        
        <li>
          <button className="create_button">
            <a href = "/create">Add
            </a>
          </button>
          
        </li> 
        
        : <></>}
    </div>
  )
}
