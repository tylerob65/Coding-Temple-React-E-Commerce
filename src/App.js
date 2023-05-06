import React, {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import Navbar from "./components/Navbar";

export default function App() {
  const [user,setUser] = useState({})

  const logMeIn = (user) => {
    setUser(user)
  }

  const logMeOut = () => {
    setUser({})
  }

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home user={user} />} />
      </Routes>
    </div>
  );
}
