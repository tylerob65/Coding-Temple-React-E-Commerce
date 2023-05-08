import React, {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@mui/material";
import ProductPage from "./views/ProductPage";
import SignUpPage from "./views/SignUpPage";
import LoginPage from "./views/LoginPage";
import MyCart from "./views/MyCart";

export default function App() {
  const [user,setUser] = useState({})

  const logMeIn = (user) => {
    setUser(user)
  }

  const logMeOut = () => {
    setUser({})
  }

  // const theme = ()

  return (
    <div>
      <Navbar user={user} logMeOut={logMeOut}/>
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/product' element={<ProductPage user={user} />} />
        <Route path='/signup' element={<SignUpPage user={user} />} />
        <Route path='/login' element={<LoginPage user={user} logMeIn={logMeIn} />} />
        <Route path='/product/:productId' element={<ProductPage user={user} />} />
        <Route path='/mycart' element={<MyCart user={user} />} />
      </Routes>
    </div>
  );
}
