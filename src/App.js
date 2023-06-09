import React, {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import ProductPage from "./views/ProductPage";
import SignUpPage from "./views/SignUpPage";
import LoginPage from "./views/LoginPage";
import MyCart from "./views/MyCart";

const localLoginString = 'user_react_ecommerce'
const getUserFromLocalStorage = () => {
  const found = localStorage.getItem(localLoginString)
  if (found) {
    return JSON.parse(found)
  }
  return {}
}

export default function App() {
  const [user,setUser] = useState(getUserFromLocalStorage)

  const logMeIn = (user) => {
    setUser(user)
    localStorage.setItem(localLoginString,JSON.stringify(user))
  }

  const logMeOut = () => {
    setUser({})
    localStorage.removeItem(localLoginString)
  }

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
