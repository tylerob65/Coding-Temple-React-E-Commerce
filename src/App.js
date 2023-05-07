import React, {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@mui/material";
import ProductPage from "./views/ProductPage";

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
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/product' element={<ProductPage user={user} />} />
      </Routes>
    </div>
  );
}
