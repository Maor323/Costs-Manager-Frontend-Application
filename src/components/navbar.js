import React, { useState } from 'react'
// import { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbarstyle.css'


function Navbar() {
    //CONST VARIABLES:
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        }
        else {
            setButton(true);
        }
    };

    window.addEventListener('resize', showButton);

    //CONST FUNCTIONS:
    const handleClick = () => {
        setClick(!click);
    }
    const closeMenuOnMobile = () => {
        setClick(false);
    }

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    {/* <Link to='/' className='navbar-logo'>
                        <h1 className="logo"><span class="text-primary">COST</span> MANAGEMENT <i className='fas fa-dollar-sign' /></h1>
                    </Link> */}
                    <Link to='/' className='logo' onClick={closeMenuOnMobile}>
                        <span className="text-primary">COST</span> MANAGEMENT <i className='fas fa-dollar-sign' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMenuOnMobile}>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/report' className='nav-links' onClick={closeMenuOnMobile}>Details Report</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/about' className='nav-links' onClick={closeMenuOnMobile}>About Us</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar