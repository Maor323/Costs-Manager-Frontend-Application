import './App.css';
import React from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom'; //instead of Switch
import Form from './pages/form';
import DetailsReport from './pages/report';
import About from './pages/about';

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Form />} />
                    <Route path='/report' element={<DetailsReport />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;