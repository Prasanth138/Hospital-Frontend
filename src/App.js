import React,{useContext} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import {AuthContext} from './context/AuthContext'
import NavbarHeader from './components/Navbar';
import Hospital from './pages/Hospital';


const App = () => {
    const { user} = useContext(AuthContext);

  return (
<BrowserRouter>
<NavbarHeader/>
<Routes>
    {!user ?(<><Route path='/' element={<Login/>}/>
<Route path='/register' element={<Register/>}/></>):(<>
<Route path='/' element={<Hospital/>} />
</>)}


</Routes>
</BrowserRouter>

  )
}

export default App;