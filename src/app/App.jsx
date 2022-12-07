// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login2 from '../components/Login2'
// import Login from '../components/Login'
// import SignUp from '../components/Signup'
import SignUp2 from '../components/SignUp2'
import AppForm from '../app/AppForm'
import Reset from '../components/Reset'
import AppEnvios from '../app/AppEnvios';
import UserDetails from '../components/UserDetails';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            {/* <Route exact path="/" element={<Login />} /> */}
            <Route exact path="/" element={<Login2 />} />
            <Route path="/sign-in" element={<Login2 />} />
            {/* <Route path="/sign-in" element={<Login />} /> */}
            <Route path="/sign-up" element={<SignUp2 />} />
            <Route path="/userDetails" element={<AppForm />} />
            <Route path="/envios" element={<AppEnvios />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/userDetails/profile" element={<UserDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App
