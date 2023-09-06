import './App.css';
import { HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {Create} from './components/Create';
import {Error404} from './components/Error404';
import {Details} from './components/Details';
import {Login} from './components/Login';
import {Progress} from './components/Progress';
import {Register} from './components/Register';
import {NavBar} from './components/NavBar';
import {NoAccess} from './components/NoAccess'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { auth} from './components/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Tips } from './components/Tips';



function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {

    return <div>Loading...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        
            <NavBar/>

            
              <Routes>
                <Route path = "/" element = {<Navigate to="/login"></Navigate>}></Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={user ? <Register/>: <NoAccess/>}/>
                <Route path="/create" element={user ? <Create/> : <NoAccess/>}/>
                <Route path="/details" element={user ? <Details/>: <NoAccess/>}/>
                <Route path="/progress" element={user ? <Progress/>: <NoAccess/>}/>
                <Route path = "/tips" element = {user ? <Tips/> : <NoAccess/>}/>
                <Route path="*" element={<Error404/>}/>
              </Routes>
            
      </div>
    </LocalizationProvider>
  );
}

export default App;
