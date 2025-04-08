// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';
// import Admin from '../pages/Homepage.jsx';  

// function App() {
//   return (
//     <div className="App">
//       <Admin />  {/* Call the Admin component */}
//     </div>
//   );
// }

// export default App;



import { Routes, Route } from "react-router-dom";
import "./App.css";
import Admin from "../pages/Homepage.jsx";  
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx"; 
import Inventory from "../pages/inventory.jsx"; 
import Tracking from "../pages/Tracking.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Features from  "../pages/Feature.jsx";
import Contact from "../pages/Contact.jsx"; 
import HowItWorks from "../pages/Howitworks.jsx";
import Pricing from "../pages/Pricing.jsx";
import Profile from "../pages/profile.jsx";
import { UserProvider } from "../context/usercontext.jsx";

function App() {
  return (
    <UserProvider>
    <div className="App">
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/features' element={<Features />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/how-it-works' element={<HowItWorks />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
    </UserProvider>
  );
}

export default App;
