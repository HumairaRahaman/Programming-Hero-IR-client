
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import {Routes, Route, Navigate} from 'react-router-dom'
import { useEffect, useState } from "react";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) setAuth(true)
    console.log(token)
  }, [])

  return (
    <Routes>
      <Route path="/" element={auth ? <Home /> : <Navigate to={'/login'} />}></Route>
      <Route path="/login" element={!auth ? <Login /> : <Navigate to={'/'} />}></Route>
      <Route path="/register" element={!auth ? <Register /> : <Navigate to={'/'} />}></Route>
    </Routes>
  );
}

export default App;
