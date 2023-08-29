import './App.css'
import React from 'react'
// import { useState } from 'react';
// import { nanoid } from "nanoid";
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'; //instead of Switch

import Form from './pages/form'

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Form />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;


// function Header() {
//     return (
//         <nav id="navbar">
//             <div className="container">
//                 <h1 className="logo"><span class="text-primary">COST</span> MANAGEMENT</h1>
//                 <ul>
//                     {/* <li><a className="home-link" onClick={ }>Home</a></li>
//                     <li><a className="report-link" onClick={ }>Detailed Report </a></li>
//                     <li><a className="about-link" onClick={ }>About Us</a></li> */}
//                     <li><a className="home-link" >Home</a></li>
//                     <li><a className="report-link" >Detailed Report </a></li>
//                     <li><a className="about-link" >About Us</a></li>
//                 </ul>
//             </div>
//         </nav>
//     )
// }

// export default Header;